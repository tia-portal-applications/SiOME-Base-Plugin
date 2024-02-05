import { IAddNodeParameter } from "./add-node-parameter.interface";

export interface IAddDataTypeParameter extends IAddNodeParameter {
    isAbstract: boolean;
}
