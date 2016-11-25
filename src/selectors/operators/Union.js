define([
	'../isSameSetOfSelectors',
	'../Specificity',
	'../Selector',
	'../dataTypes/Sequence',
	'../dataTypes/sortNodeValues'
], function (
	isSameSetOfSelectors,
	Specificity,
	Selector,
	Sequence,
	sortNodeValues
) {
	'use strict';

	/**
	 * The 'union' combining selector, or when matching, concats otherwise.
	 * order is undefined.
	 * @param  {Selector[]}  selectors
	 */
	function Union (selectors) {
		Selector.call(
			this,
			selectors.reduce(function (maxSpecificity, selector) {
				if (maxSpecificity.compareTo(selector.specificity) > 0) {
					return maxSpecificity;
				}
				return selector.specificity;
			}, new Specificity({})),
			Selector.RESULT_ORDER_UNSORTED);

		this._subSelectors = selectors;
	}

	Union.prototype = Object.create(Selector.prototype);
	Union.prototype.constructor = Union;

	/**
	 * @param  {Node}       node
	 * @param  {Blueprint}  blueprint
	 */
	Union.prototype.matches = function (node, blueprint) {
		return this._subSelectors.some(function (subSelector) {
			return subSelector.matches(node, blueprint);
		});
	};

	Union.prototype.equals = function (otherSelector) {
		if (this === otherSelector) {
			return true;
		}

		return otherSelector instanceof Union &&
			isSameSetOfSelectors(this._subSelectors, otherSelector._subSelectors);
	};

	Union.prototype.evaluate = function (dynamicContext) {
		var nodeSet = this._subSelectors.reduce(function (resultingNodeSet, selector) {
				var results = selector.evaluate(dynamicContext);
				var allItemsAreNode = results.value.every(function (valueItem) {
						return valueItem.instanceOfType('node()');
					});

				if (!allItemsAreNode) {
					throw new Error('ERRXPTY0004: The sequences to union are not of type node()*');
				}
				results.value.forEach(function (nodeValue) {
					resultingNodeSet.add(nodeValue);
				});
				return resultingNodeSet;
			}, new Set());

		var sortedValues = sortNodeValues(dynamicContext.domFacade, Array.from(nodeSet.values()));
		return new Sequence(sortedValues);
	};
	return Union;
});
