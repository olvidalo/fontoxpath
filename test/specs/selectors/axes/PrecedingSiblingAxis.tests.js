define([
	'fontoxml-selectors/selectors/Specificity',
	'fontoxml-selectors/selectors/axes/PrecedingSiblingAxis'
], function (
	Specificity,
	PrecedingSiblingAxis
) {
	'use strict';

	describe('PrecedingSiblingAxis.equals()', function () {
		it('returns true if compared with itself', function () {
			var precedingSibling1 = new PrecedingSiblingAxis({
					specificity: new Specificity({}),
					equals: sinon.stub().returns(true)
				}),
				precedingSibling2 = precedingSibling1;

			var result1 = precedingSibling1.equals(precedingSibling2),
				result2 = precedingSibling2.equals(precedingSibling1);

			chai.expect(result1).to.equal(true);
			chai.expect(result2).to.equal(true);
		});

		it('returns true if compared with an equal other PrecedingSiblingAxis', function () {
			var precedingSibling1 = new PrecedingSiblingAxis({
					specificity: new Specificity({}),
					equals: sinon.stub().returns(true)
				}),
				precedingSibling2 = new PrecedingSiblingAxis({
					specificity: new Specificity({}),
					equals: sinon.stub().returns(true)
				});

			var result1 = precedingSibling1.equals(precedingSibling2),
				result2 = precedingSibling2.equals(precedingSibling1);

			chai.expect(result1).to.equal(true);
			chai.expect(result2).to.equal(true);
		});

		it('returns false if compared with an unequal other PrecedingSiblingAxis', function () {
			var precedingSibling1 = new PrecedingSiblingAxis({
					specificity: new Specificity({}),
					equals: sinon.stub().returns(false)
				}),
				precedingSibling2 = new PrecedingSiblingAxis({
					specificity: new Specificity({}),
					equals: sinon.stub().returns(false)
				});

			var result1 = precedingSibling1.equals(precedingSibling2),
				result2 = precedingSibling2.equals(precedingSibling1);

			chai.expect(result1).to.equal(false);
			chai.expect(result2).to.equal(false);
		});
	});
});