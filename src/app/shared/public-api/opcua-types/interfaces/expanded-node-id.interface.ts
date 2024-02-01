import { INodeId } from './node-id.interface';

export declare interface IExpandedNodeId extends INodeId {
  nullExpandedNodeId: IExpandedNodeId;
  namespaceUri: null | string;
  serverIndex: number;
}
