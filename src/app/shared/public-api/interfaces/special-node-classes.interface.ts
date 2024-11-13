export interface ISpecialNodeClasses {
    readonly isBaseDataType: boolean;
    readonly isBuildInDataType: boolean;
    readonly isAbstractBuildInDataType: boolean;
    readonly isSimpleDataType: boolean;
    readonly isEnumeration: boolean;
    readonly isEnumStringsOrValuesNode: boolean;
    readonly isOptionSetValuesNode: boolean;
    readonly isEventType: boolean;
    readonly isInterfaceType: boolean;
    readonly isAddInType: boolean;
    readonly isStructuredDataType: boolean;
    readonly isFiniteStateMachineType: boolean;
    readonly isStateType: boolean;
    readonly isTransitionType: boolean;
    readonly isGuardType: boolean;
    readonly isElseGuardType: boolean;
    readonly isExpressionGuardType: boolean;
    readonly isUnionDataType: boolean;
    readonly isOptionSetDataType: boolean;
}
