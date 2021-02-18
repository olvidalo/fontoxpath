import ISequence from './dataTypes/ISequence';
import DynamicContext from './DynamicContext';
import ExecutionParameters from './ExecutionParameters';
import { FunctionProperties } from './functions/functionRegistry';

export default interface IContext {
	registeredDefaultFunctionNamespace: string;
	registeredVariableBindingByHashKey: any[];
	registeredVariableDeclarationByHashKey: {
		[hash: string]: (
			dynamicContext: DynamicContext,
			executionParameters: ExecutionParameters
		) => ISequence;
	};
	lookupFunction(
		namespaceURI: string,
		localName: string,
		arity: number,
		skipExternal?: boolean
	): FunctionProperties | null;
	lookupVariable(namespaceURI: string | null, localName: string): string | null;
	resolveNamespace(prefix: string): string | null;
}
