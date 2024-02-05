import { IAddNodeParameter } from "./add-node-parameter.interface";

export interface IAddObjectTypeParameter extends IAddNodeParameter {
    isAbstract: boolean;
}
