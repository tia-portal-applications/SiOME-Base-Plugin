export interface IAddStructurItemParameter {
    name: string;
    dataType: string;
    isOptional: boolean;
    valueRank: number;
    allowSubTypes: boolean;
    description?: string;
    maxStringLength?: string;
    arrayDimensions?: string;
}
