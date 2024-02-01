import { NodeClass } from '../../enums/node-classes';
import { IExpandedNodeId } from './expanded-node-id.interface';
import { ILocalizedText } from './localized-text.interface';
import { INodeId } from './node-id.interface';
import { IQualifiedName } from './qualified-name.interface';

export declare interface IReferenceDescription {
  dataTypeNodeId: IExpandedNodeId;
  referenceTypeId: INodeId;
  isForward: boolean;
  nodeId: IExpandedNodeId;
  browseName: IQualifiedName;
  displayName: ILocalizedText;
  nodeClass: NodeClass;
  typeDefinition: IExpandedNodeId;
}
