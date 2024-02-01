import { ModellingRules } from '../enums/modelling-rules';
import { INodeId } from '../opcua-types/interfaces/node-id.interface';

export interface IOpcReference {
  readonly isActive: boolean;
  readonly isForward: boolean;
  readonly isInterfaceReference: boolean; // is only set correctly after setReferences()
  readonly isPlaceHolderInstance: boolean;
  readonly isTypeReference: boolean; // is only set correctly after setReferences()
  readonly modellingRule: ModellingRules;
  readonly originalTargetInTypes: INodeId;
  readonly source: INodeId;
  readonly target: INodeId;
  readonly referenceType: INodeId;
}
