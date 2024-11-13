import { DataType } from "../opcua-types/enums/data-type";
import { VariantArrayType } from "../opcua-types/enums/variant-array-type";

export interface IOnlineMethodArguments {
    dataType: DataType;
    arrayType: VariantArrayType;
    value: any;
}
