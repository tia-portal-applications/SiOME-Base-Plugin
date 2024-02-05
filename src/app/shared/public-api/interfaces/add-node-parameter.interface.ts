import { NodeClass } from "../enums/node-classes";

export interface IAddNodeParameter {
    name: string;
    nodeClass: NodeClass;
    referenceType: string;
    namespaceIndex: number;

    nodeId?: string;
}
