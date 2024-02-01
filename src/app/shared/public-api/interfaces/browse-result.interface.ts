import { IExpandedNodeId } from '../opcua-types/interfaces/expanded-node-id.interface';
import { IReferenceDescription } from '../opcua-types/interfaces/reference-description.interface';

export declare interface IBrowseResult {
  possibleFields: string[];
  dataTypeNodeId: IExpandedNodeId;
  encodingDefaultBinary: IExpandedNodeId;
  encodingDefaultXml: IExpandedNodeId;
  encodingDefaultJson: IExpandedNodeId;
  statusCode: any;
  continuationPoint: any;
  references: IReferenceDescription[] | null;
}
