import { ILocalizedText } from "../opcua-types/interfaces/localized-text.interface";

export interface IMethodArguments {
    name: string;
    valueRank: number;
    dataType: string;
    arrayDimensions?: number[];
    description?: ILocalizedText;
}
