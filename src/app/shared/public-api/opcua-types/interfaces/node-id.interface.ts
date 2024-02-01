import { NodeIdType } from '../enums/node-id-type';

export declare interface INodeId {
  identifierType: NodeIdType;
  value: number | string;
  namespace: number;
}
