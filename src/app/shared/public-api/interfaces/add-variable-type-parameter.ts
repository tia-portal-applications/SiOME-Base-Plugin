import { IAddNodeParameter } from "./add-node-parameter.interface";

export interface IAddVariableTypeParameter extends IAddNodeParameter {
    dataType: string;
    isAbstract: boolean;
}
