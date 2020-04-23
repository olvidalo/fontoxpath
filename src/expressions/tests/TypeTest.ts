import isSubtypeOf from '../dataTypes/isSubtypeOf';
import Specificity from '../Specificity';
import TestAbstractExpression from './TestAbstractExpression';
import DynamicContext from '../DynamicContext';
import Value from '../dataTypes/Value';
import ExecutionParameters from '../ExecutionParameters';

class TypeTest extends TestAbstractExpression {
	public _type: { localName: string; namespaceURI: string; prefix: string };

	constructor(type: { localName: string; namespaceURI: string | null; prefix: string }) {
		super(new Specificity({}));
		this._type = type;
	}

	public evaluateToBoolean(
		_dynamicContext: DynamicContext,
		item: Value,
		_executionParameters: ExecutionParameters
	) {
		return isSubtypeOf(
			item.type,
			this._type.prefix
				? this._type.prefix + ':' + this._type.localName
				: this._type.localName
		);
	}
}
export default TypeTest;
