export interface ISiOMESettings {
    actualNodeChildrenAmountOnline: number;
    checkCyclesOnImport: boolean;
    connectedServerAddresses: string[];
    defaultValueRank: number;
    defaultPlaceholder: number;
    defaultNodeIdType: number;
    defaultPrefixNodeId: string;
    defaultDelimiterNodeId: string;
    defaultPostfixNodeId: string;
    defaultStartNodeIds: any;
    prefixObjectType: string;
    postfixObjectType: string;
    prefixVariableType: string;
    postfixVariableType: string;
    prefixDataType: string;
    postfixDataType: string;
    isLoggingEnabled: boolean;
    logDirectory: string;
    logDebugMessages: boolean;
    mainWindowSettings: { height: number; width: number;
                          x: number; y: number; isMaximized: boolean};
    pluginsFolder: string;
    selectedNodeChildrenAmountOffline: number;
    selectedNodeChildrenAmountOnline: number;
    selectedNodeChildrenAmountOnlineDisabled: boolean;
    selectedNodeLimitNamespaceGlobal: number;
    showDataTypesForVariablesInOpcTree: boolean;
    sortNodesAlphabeticalInOpcTree: boolean;
    sortOrderStateMachine: string;
    showDisplayName: boolean;
    validateAgainstSchema: boolean;
    disableAnimations: boolean;

}
