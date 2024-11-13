import { SupportedFileFormat } from "../enums/supported-file-format";
import { ModellingRules } from "../enums/modelling-rules";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { INamespaceChange } from "./namespace-change.interface";
import { IImportFile } from "./import-file.interface";
import { IConnectParams } from "./connect-params.interface";
import { BrowseOrAll } from "../enums/browse-or-all";
import { AttributeId } from "../enums/attribute-ids";
import { ITiaNode } from "./tia-node.interface";
import { IOpcReference } from "./opc-reference.interface";
import { IProjectNode } from "./project-node.interface";
import { IOpcNode } from "./opc-node.interface";
import { IEndpoint } from "./endpoint.interface";
import { IReadResult } from "./read-result.interface";
import { IBrowseResult } from "./browse-result.interface";
import { IBaseAttributeData } from "./base-attribute-data.interface";
import { IQualifiedName } from "../opcua-types/interfaces/qualified-name.interface";
import { ILocalizedText } from "../opcua-types/interfaces/localized-text.interface";
import { IAddStructurItemParameter } from "./add-structure-item-parameter.interface";
import { IMethodArguments } from "./method-arguments.interface";
import { ISchemas } from "./schemas.interface";
import { IOnlineMethodArguments } from "./online-method-arguments.interface";
import { NamespaceAttributeId } from "../enums/namespace-attribute-ids";
import { IAddVariableParameter } from "./add-variable-parameter";
import { IAddVariableTypeParameter } from "./add-variable-type-parameter";
import { IAddObjectParameter } from "./add-object-parameter";
import { IAddObjectTypeParameter } from "./add-object-type-parameter";
import { IAddReferenceTypeParameter } from "./add-reference-type-parameter";
import { IAddDataTypeParameter } from "./add-data-type-parameter";
import { ArgumentType } from "../enums/argument-type";
import { IOpenProjectError } from "./open-project-error.interface";
import {IAddEnumeration} from "./add-enumeration";
import { IValidationConflict } from "./validation-conflict.interface";

export interface ISiomeApi {
    //#region OPC UA Methods

    /**
     * Activates or deactivates the type defined reference
     * @category OPC UA
     * @param sourceId The NodeId of the source of the TypeReference
     * @param targetBrowseName
     * @param referenceType  The NodeId of the ReferenceType of the TypeReference
     * @returns the status of the isActivated property
     * @throws ISiomeApiError
     */
    activateTypeReference(sourceId: string, targetBrowseName: string, referenceType?: string): Promise<boolean>;

    /**
     * Return a string array containing the current namespace uris
     * @category OPC UA
     */
    getNamespaceArray(): Promise<string[]>;

    /**
     * Check whether a specific namespace is available and loaded in SiOME.
     * @category OPC UA
     * @param namespaceUri Entry to be searched for e.g. "http://opcfoundation.org/UA/".
     * @returns
     */
    checkNamespaceAvailable(namespaceUri: string): Promise<boolean>;

    /**
     * Returns the current namespace index.
     * @category OPC UA
     * @throws ISiomeApiError
     */
    currentNamespaceIndex(): Promise<number>;

    /**
     * sets the provided namespace index or namespaceUri as current namespace
     * @param namespace namespace index or namespaceUri
     * @category General
     */
    setCurrentNamespace(namespace: number | string): Promise<void>;

    /**
     * Save the current state of the application.
     * @param path The path where to save.
     * @category General
     */
    saveSiOME(path: string): Promise<void>;

    /**
     * Open a dialog to unlock or add a new namespace.
     * @category OPC UA
     */
    unlockOrCreateNamespace(): Promise<void>;

    /**
     * Lock a namespace.
     * @category OPC UA
     * @param namespaceUri
     */
    lockNamespace(namespaceUri: string): Promise<void>;

    /**
     * Unlock a namespace.
     * @category OPC UA
     * @param namespaceUri
     */
    unlockNamespace(namespaceUri: string): Promise<void>;

    /**
     * Change the order of the namespaces.
     * @category OPC UA
     * @param newNamespaceOrder The uris in the new order seperated by "," (e.g.: "http://ns2, http://ns1")
     */
    changeNamespaceOrder(newNamespaceOrder: string): Promise<void>

    /**
     * Check the dependencies between namespaces.
     * @category OPC UA
     */
    checkDependencies(): Promise<IProjectNode[]>

    /**
     * Show how many nodes a namespace has.
     * @category OPC UA
     * @param namespaceUri
     */
    countNumberOfNodes(namespaceUri: string): Promise<number>

    /**
     * @param parentId The NodeId of the DataType.
     * @param params The definition of the new structure item.
     * @category OPC UA
     */
    addStructureItem(parentId: string, params: IAddStructurItemParameter): Promise<void>;

    /**
     * Add a new namespace with a given URI and version
     * @category OPC UA
     * @param newNs
     * @param version
     */
    createNamespaceImplicit(newNs: string, version: string): Promise<void>;

    /**
     * The method tries to find a node in the information model using its BrowseName.
     * @category OPC UA
     * @param parentId Search under this parent nodeId inside the information model.
     * @param searchTerm The BrowseName with or without its NamespaceIndex (e.g.: "1:BrowseName", "BrowseName"). If the NamespaceIndex is not provided, the method returns the first node with the given BrowseName.
     * @returns The IOpcNode with this BrowseName or SiOMEApiError.
     * @throws ISiomeApiError
     */
    searchNode(parentId: string, searchTerm: string): Promise<IOpcNode>;

    /**
     * Search for the given nodeId within all available nodes in the information model.
     * @category OPC UA
     * @param nodeId
     * @throws ISiomeApiError
     */
    getOpcNode(nodeId: string): Promise<IOpcNode>;

    /**
     * Add a new entry to the current information model.
     * @category OPC UA
     * @param parentNodeId Add the new entry below this parent node.
     * @param params The parameters for the newly created node.
     * @returns The newly created IOpcReference or SiOMEApiError.
     */
    addChild(
        parentNodeId: string,
        params:
            | IAddVariableParameter
            | IAddEnumeration
            | IAddVariableTypeParameter
            | IAddObjectParameter
            | IAddObjectTypeParameter
            | IAddReferenceTypeParameter
            | IAddDataTypeParameter
    ): Promise<IOpcReference>;

    /**
     * Add a new reference from the sourceNode to the targetNode.
     * @category OPC UA
     * @param sourceId The NodeId of the source node in string representation.
     * @param targetId The NodeId of the target node in string representation.
     * @param referenceTypeId The NodeId of the reference type in string representation.
     * @param isForward The direction of the reference.
     * @returns The newly created IOpcReference.
     * @throws ISiomeApiError
     */
    addReference(sourceId: string, targetId: string, referenceTypeId: string, isForward: boolean): Promise<IOpcReference>;

    /**
     * Remove a reference. If it is the last hierarchical reference to the target node, the node will be deleted.
     * @category OPC UA
     * @param sourceId The NodeId of the source node in string representation.
     * @param targetId The NodeId of the target node in string representation.
     * @param referenceTypeId The NodeId of the reference type in string representation.
     * @throws ISiomeApiError
     */
    removeReference(sourceId: string, targetId: string, referenceTypeId: string): Promise<void>;

    /**
     * Delete a node.
     * @category OPC UA
     * @param nodeId The NodeId of the node in string representation.
     * @throws ISiomeApiError
     */
    deleteNode(nodeId: string): Promise<void>;

    /**
     * Move a node to a new parent.
     * @category OPC UA
     * @param nodeId The NodeId of the node in string representation.
     * @param currentParentId The NodeId of the current node in string representation.
     * @param newParentId The NodeId of the new parent node in string representation.
     * @throws ISiomeApiError
     */
    moveNode(nodeId: string, currentParentId: string, newParentId: string): Promise<void>;

    /**
     * Add a new variable type of a given DataType to the current information model.
     * @category OPC UA
     * @param dataTypeNodeId The NodeId of the DataType from which a VariableType should be created.
     * @returns The newly created VariableType or SiOMEApiError.
     * @throws ISiomeApiError
     */
    createVariableTypeFromDataType(dataTypeNodeId: string): Promise<IOpcNode>;

    /**
     * Add a new method to the current information model.
     * @category OPC UA
     * @param parentNodeId Add the new method below this parent node.
     * @param methodName The new method name.
     * @param namespaceIndex The namespace index to be used when creating the method.
     * @param inputArgs The input parameter for the new method.
     * @param outputArgs The output parameter for the new method.
     * @throws ISiomeApiError
     */
    addMethod(
        parentNodeId: string,
        methodName: string,
        namespaceIndex: number,
        inputArgs: IMethodArguments[],
        outputArgs: IMethodArguments[]
    ): Promise<IOpcReference>;

    /**
     * Add a new argument to the input or output arguments of a method.
     * @category OPC UA
     * @param methodNodeId Add a new argument underneath this method node.
     * @param argumentType Input or Output argument
     * @param params The parameters required for creating new argument.
     * @throws ISiomeApiError
     */

    addMethodArgument(methodNodeId: string, argumentType: ArgumentType, params: IMethodArguments): Promise<void>;

    /**
     * Get all the input or output arguments of the method.
     * @category OPC UA
     * @param methodNodeId  The nodeId of the method.
     * @param argumentType Type of the argument - Input or Output argument
     * @throws ISiomeApiError
     */

    getAllMethodArguments(methodNodeId: string, argumentType: ArgumentType): Promise<IMethodArguments[]>;

    /**
     * Get a specific input or output argument of the method.
     * @category OPC UA
     * @param methodNodeId  The nodeId of the method.
     * @param argumentType Type of the argument - Input or Output argument
     * @param argumentName Name of the argument
     * @throws ISiomeApiError
     */

    getMethodArgument(
        methodNodeId: string,
        argumentType: ArgumentType,
        argumentName: string
    ): Promise<IMethodArguments>;

    /**
     * Edit the input or output argument of a method.
     * @category OPC UA
     * @param methodNodeId The nodeId of the method
     * @param argumentType Type of the argument - Input or Output argument
     * @param argumentName The name of the argument which needs to be edited
     * @param params
     * @throws ISiomeApiError
     */

    editMethodArgument(
        methodNodeId: string,
        argumentType: ArgumentType,
        argumentName: string,
        params: IMethodArguments
    ): Promise<void>;

    /**
     * Delete the input or output argument of the method.
     * @category OPC UA
     * @param methodNodeId  The nodeId of the method.
     * @param argumentType Type of the argument - Input or Output argument
     * @param argumentName
     * @throws ISiomeApiError
     */

    deleteMethodArgument(methodNodeId: string, argumentType: ArgumentType, argumentName: string): Promise<void>;

    /**
     * Set the attributes of a node
     * @category OPC UA
     * @param attributeId The id of the attribute to be set
     * @param nodeId The nodeId whose properties need to be set.
     * @param options The required options to set the attribute
     * attributeId:1  options: string
     * attributeId:3  options: IQualifiedName | string (e.g. 1:Name)
     * attributeId:4  options: ILocalizedText | string (e.g. en;text)
     * attributeId:5  options: ILocalizedText | string (e.g. en;text)
     * attributeId:10 options: ILocalizedText | string (e.g. en;text)
     * attributeId:13 options: value of the simple dataTypes
     * attributeId:14 options: string (e.g. ns=0;i=1)
     * attributeId:15 options: number (e.g.  1 for Dimension ) | string (e.g. Scalar or Dimension)
     * attributeId:16 options: number[] | string
     * attributeId:17 options: string | number
     * attributeId:18 options: string | number
     * attributeId:19 options: string | number
     * attributeId:20 options: boolean | string
     */
    setAttribute(
        attributeId: AttributeId,
        nodeId: string,
        options: IQualifiedName | ILocalizedText | string | number | boolean | number[]
    ): Promise<void>;

    /**
     * Set the namespace attributes
     * @category OPC UA
     * @param attributeId The attribute#s id that needs to be modified
     * @param namespaceIndex namespace index.
     * @param value The new value
     */
    setNamespaceAttribute(attributeId: NamespaceAttributeId, namespaceIndex: number, value: string): Promise<void>;

    /**
     * Retrieve the internal IProjectNode belonging to a specific namespace uri.
     * @category OPC UA
     * @param namespaceUri to be searched for e.g. "http://opcfoundation.org/UA/".
     * @throws ISiomeApiError
     */
    getNamespace(namespaceUri: string): Promise<IProjectNode>;

    /**
     * The method checks if the provided child is a descendant of the provided node
     * @category OPC UA
     * @param childNodeId
     * @param nodeId
     */
    isDescendantFrom(childNodeId: string, nodeId: string): Promise<boolean>;

    /**
     * Set the modelling rule for a given reference
     * @category OPC UA
     * @param nodeId
     * @param rule
     */
    setModellingRule(nodeId: string, rule: ModellingRules): Promise<void>;

    /**
     * Set mapping for a given node
     * @category OPC UA
     * @param nodeId
     * @param mapping
     */
    setMapping(nodeId: string, mapping: string): Promise<void>;

    /**
     * Get all active type references of the given node
     * @category OPC UA
     * @param nodeId
     */
    activeTypeReferences(nodeId: string): Promise<IOpcReference[]>;

    /**
     * @category OPC UA
     */
    monitorNamespace(): BehaviorSubject<INamespaceChange>;

    /**
     * Get attribute data of a OPC node
     * @category OPC UA
     * @param nodeId
     * @param attributeId
     */
    getAttributeData(nodeId: string, attributeId: AttributeId): Promise<IBaseAttributeData>;
    //#endregion

    //#region UI Methods
    /**
     * Open a dialog in SiOME to select a directory.
     * @category UI
     * @param title Title of the dialog
     * @throws ISiomeApiError
     */
    openSelectDirectoryDialog(title?: string): Promise<string>;

    /**
     * The method adds a context menu for each node in the information model.
     * @category UI
     * @param text The name of the context menu.
     * @param execute The callback executed after clicking the context menu.
     * @param disabled
     * @param visible
     */
    addBasicContextMenu(
        text: string,
        execute: (node: IOpcNode) => void,
        disabled?: (node: IOpcNode) => boolean,
        visible?: (node: IOpcNode) => boolean
    ): Promise<void>;

    /**
     * The method adds a context menu in the mapping area for each node in the information model.
     * @category UI
     * @param text The name of the context menu.
     * @param execute The callback executed after clicking the context menu.
     * @param disabled
     * @param visible
     */
    addMappingContextMenu(
        text: string,
        execute: (node: IOpcNode) => void,
        disabled?: (node: IOpcNode) => boolean,
        visible?: (node: IOpcNode) => boolean
    ): Promise<void>;

    /**
     * Open an alert dialog in SiOME
     * @category UI
     * @param headline
     * @param message
     */
    openAlertDialog(headline: string, message: string): Promise<void>;

    /**
     * Open a dialog in SiOME to select one or multiple file(s).
     * @category UI
     * @param defaultPath
     * @param fileExtension
     * @param multiSelect
     * @throws ISiomeApiError
     */
    openSelectFileDialog(defaultPath?: string, fileExtension?: string, multiSelect?: boolean): Promise<string[]>;

    /**
     * Jump to a specific node in the information model tree
     * @category UI
     * @param nodeId
     */
    jumpToNode(nodeId: string): Promise<void>;

    /**
     * Open the default dialog in SiOME to export nodesets
     * @category UI
     */
    openExportXMLDialog(): Promise<void>;

    /**
     * Highlight and select the specific node in the information model.
     * @category UI
     * @param nodeId
     */
    activateOpcNode(nodeId: string): Promise<void>;
    //#endregion

    //#region General Methods

    /**
     * Import one or multiple xml-like files through a dialog.
     * @category General
     * @param fileFormat The file format you want to import.
     * @param supportMultipleFiles Allow multiple files to import.
     * @returns The retrieved data from the file(s) as concatenated string, or an empty string if an error occurred.
     */
    importFile(fileFormat: SupportedFileFormat, supportMultipleFiles: boolean): Promise<IImportFile>;

    /**
     * Create a root log node.
     * @category General
     * @param name The description for the parent log node.
     */
    createLogNode(name: string): Promise<void>;

    /**
     * Add a new entry with the specific type under the current parent log node.
     * @category General
     * @param logEntry The entry to be added.
     * @param type Available types are "info", "error", "warning".
     */
    newLogEntry(logEntry: string, type: string): Promise<void>;

    /**
     * The method returns the current SiOME settings
     * @category General
     * @returns An object containing all current settings
     * ```
     * {
     *     actualNodeChildrenAmountOnline: 100,
     *     checkCyclesOnImport: false,
     *     connectedServerAddresses: [],
     *     defaultDelimiterNodeId: ""."",
     *     defaultNodeIdType: 1,
     *     defaultPlaceholder: 0,
     *     defaultPostfixNodeId: """,
     *     defaultPrefixNodeId: """,
     *     defaultStartNodeIds: {
     *          dataType: 3000,
     *          methodInstance: 7000,
     *          objectInstance: 5000,
     *          objectType: 1000,
     *          referenceType: 4000,
     *          variableInstance: 6000,
     *          variableType: 2000
     *     },
     *     defaultValueRank: -1,
     *     isLoggingEnabled: true,
     *     logDebugMessages: false,
     *     logDirectory: "C:\Users\johndoe\Documents\projects\siome\log",
     *     mainWindowSettings: {
     *          height: 1056,
     *          isMaximized: true,
     *          width: 1936,
     *          x: -1928,
     *          y: -224
     *     },
     *     pluginsFolder: "C:\Users\johndoe\Desktop\plugins",
     *     selectedNodeChildrenAmountOffline: 100,
     *     selectedNodeChildrenAmountOnline: 100,
     *     selectedNodeChildrenAmountOnlineDisabled: false,
     *     showDataTypesForVariablesInOpcTree: false,
     *     showDisplayName: true,
     *     sortNodesAlphabeticalInOpcTree: true,
     *     sortOrderStateMachine: "tb",
     * }
     * ```
     */
    getSiOMESettings(): Promise<any>;

    /**
     * The setting for sorting the nodes alphabetically.
     * @category General
     */
    toggleSortNodesAlphabetically(): Promise<void>;

    /**
     * The setting for showing data types of nodes.
     * @category General
     * @throws ISiomeApiError
     */
    toggleShowDataTypes(): Promise<void>;

    /**
     * The setting for showing display or browse name of the nodes.
     * @category General
     * @throws ISiomeApiError
     */
    toggleShowDisplayName(): Promise<void>;

    /**
     * The setting for displaying the nodeID either as string or as numeric.
     * @category General
     * @throws ISiomeApiError
     */
    toggleDefaultNodeID(): Promise<void>;

    /**
     * The setting for validating against the UANodeset.xsd.
     * @category General
     * @param val
     * @throws ISiomeApiError
     */
    validateUANodeSet(val: boolean): Promise<void>

    /**
     * The setting for selecting default placeholder value at nodes.
     * @category General
     * @param defaultPlaceholder
     * @throws ISiomeApiError
     */
    startValueForPlaceholder(defaultPlaceholder: number): Promise<void>

    /**
     * The setting for the maximum allowed nodes in the project.
     * @category General
     * @param maxNodeLimit
     * @throws ISiomeApiError
     */
    changeMaxNodeLimit(maxNodeLimit: number): Promise<void>

    /**
     * The method  closes the SiOME.
     * @category General
     */
    closeSiOME(): Promise<void>;

    /**
     * The method returns the current SiOME version
     * @category General
     * @returns version string
     */
    getSiOMEVersion(): Promise<string>;

    /**
     * Exports the nodeset in xml format
     * @category General
     * @param namespaceUris The namespace uris to export
     * @param includeMappings Should mappings be exported
     * @param includeValues Should values be exported
     * @param exportPath Path where to export to
     * @param exportName Name of the exported file
     * @throws ISiomeApiError
     */
    exportXML(namespaceUris: string[], includeMappings: boolean, includeValues: boolean,
              exportPath: string, exportName: string): Promise<void>;

    /**
     * Return the nodeset as a string created by the given namespace uris
     * @category General
     * @param namespaceUris The namespace uris to export
     * @param includeMappings Should mappings be exported
     * @param includeValues Should values be exported
     * @throws ISiomeApiError
     */
    getNodesetAsString(namespaceUris: string[], includeMappings: boolean, includeValues: boolean): Promise<string>;

    /**
     * Load a namespace with a given path but without a dialog
     * @category General
     * @param path
     */
    importNodeSet(path: string): Promise<boolean>;
    //#endregion

    //#region TIA Portal Methods

    /**
     * Gets a list of open TIA-Portal projects
     * @category TIA Portal
     */
    getListOfOpenProjectsInTIA(): Promise<string[]>;

    /**
     * Check if SiOME is currently attached to a TIA Portal project.
     * @category TIA Portal
     */
    isAttachedToTIA(): Promise<boolean>;

    /**
     * Check if SiOME is currently connected to a TIA Portal project.
     * @category TIA Portal
     */
    isConnectedToTIA(): Promise<boolean>;

    /**
     * Get the current TIA Portal project path.
     * @category TIA Portal
     */
    getTIAProjectPath(): Promise<string>;

    /**
     * Open a dialog in SiOME to attach to a TIA Portal project.
     * @category TIA Portal
     */
    openTIAProjectDialog(): Promise<void>;

    /**
     * connect to a TIA Portal project.
     * @category TIA Portal
     * @param attach {boolean} true is attach and false is open by using the path provided
     * @param attach
     * @param disableTimeout
     * @param path {string} required when attach is false and multiple TIA instances are open
     * @param plcName required when multiple PLCs are present in the TIA project
     * @param userName
     * @param password
     */
    connectToTIAImplicit(
        attach: boolean,
        disableTimeout: boolean,
        path?: string,
        plcName?: string,
        userName?: string,
        password?: string
    ): Promise<void | IOpenProjectError>;

    /**
     * Close the TIA Portal project attached in SiOME
     * @category TIA Portal
     */
    closeTIAProject(): Promise<void>;

    /**
     * Initiate a compile in the TIA Portal.
     * @category TIA Portal
     */
    compileTia(): Promise<void>;

    /**
     * Retrieve the specific block details from the TIA Portal.
     * @category TIA Portal
     * @param blockName
     */
    getBlockDetails(blockName: string): Promise<ITiaNode>;

    /**
     * Retrieve the specific udt details from the TIA Portal.
     * @category TIA Portal
     * @param udtName
     */
    getUdtDetails(udtName: string): Promise<ITiaNode>;

    /**
     * Retrieve the specific tag table details from the TIA Portal.
     * @category TIA Portal
     * @param tagTableName
     */
    getTagTableDetails(tagTableName: string): Promise<ITiaNode>;

    /**
     * Retrieve all available db names in current TIA Portal project
     * @category TIA Portal
     */
    getAllBlockNames(): Promise<string[]>;

    /**
     * Retrieve all available udt names in current TIA Portal project
     * @category TIA Portal
     */
    getAllUdtNames(): Promise<string[]>;

    /**
     * Retrieve all available tag tables in current TIA Portal project
     * @category TIA Portal
     */
    getAllTagTableNames(): Promise<string[]>;

    /**
     * Open a dialog in SiOME to choose the server interface export options to the TIA Portal.
     * @category TIA Portal
     * @param isReferenceNamespace
     */
    addSimaticServerInterface(isReferenceNamespace: boolean): Promise<void>;

    /**
     * Implicitly adds the Simatic server interface to the TIA-Portal.
     * @category TIA Portal
     * @param isReferenceNamespace
     * @param namespaceIndices
     * @param serverInterfaceName
     */
    addSimaticServerInterfaceImplicit(
        isReferenceNamespace: boolean,
        namespaceIndices: number[] | string,
        serverInterfaceName: string
    ): Promise<void>;

    /**
    * Load a node set from TIA.
    * @category TIA Portal
    * @param nodesetName
    */
    importFromTIA(nodesetName: string): Promise<void>;

    //#endregion

    //#region Validation Methods

    /**
     * Validate the corresponding file with the provided schemas
     * @category Validation
     * @param filePath
     * @param providedSchemas
     * @throws ISiomeApiError
     */
    validateSchema(filePath: string, providedSchemas: ISchemas[]): Promise<boolean>;

    /**
     * Validate the mapping for a given node and its children
     * @category Validation
     * @param nodeId
     */
    validateMappings(nodeId: string): Promise<Array<{ node: IOpcNode; conflict: string }>>;

    /**
     * Validate the nodeset with rules.
     * @category Validation
     * @param commonRules
     * @param mappingRules
     * @param addIns
     * @param isOnline
     */
    validateNodeSet(commonRules: boolean,
                    mappingRules: boolean,
                    addIns: boolean,
                    isOnline: boolean): Promise<IValidationConflict[]>


    //#endregion

    //#region Client Methods

    /**
     * Return a BehaviorSubject to check the current online status
     * @category Client
     */
    getOnlineStatusSubscription(): BehaviorSubject<boolean>;

    /**
     * Open the default dialog in SiOME to connect to an opc ua server
     * @category Client
     */
    openConnectOpcServerDialog(): Promise<void>;

    /**
     * Open the default dialog in SiOME to disconnect from current opc ua server
     * @category Client
     */
    openDisconnectOpcServerDialog(): Promise<void>;

    /**
     * Connect to an opc ua server without showing a dialog
     * @category Client
     * @param connectParams
     * @param browseOrAll
     *
     * Example connectParams
     * {
     address: "opc.tcp://192.168.1.50:4840"
     allowExpiredTokens: false
     applicationName: "SIMATIC.S7-1500.OPC-UA.Application:PLC_1"
     certificateKeyPathClient: "C:\\Users\\johndoe\Desktop\\certificates\\SiOME_client_key.pem"
     certificatePathClient: "C:\\Users\\johndoe\Desktop\\certificates\\SiOME_client_cert.der"
     overrideEndpointUrl: ""
     password: "mySecretPassword"
     securityMode: 3
     securityPolicy: "http://opcfoundation.org/UA/SecurityPolicy#Basic256Sha256"
     session: "SiOME_Plugin_Session"
     username: "myUsername"
     * }
     */
    connectImplicit(connectParams: IConnectParams, browseOrAll: BrowseOrAll): Promise<boolean>;

    /**
     * Disconnect from current opc ua server without showing a dialog
     * @category Client
     */
    disconnectImplicit(): Promise<void>;

    /**
     * Find an opc ua server through a given address
     * @category Client
     * @param address
     * @param certificateFilePath
     * @param privateKeyFilePath
     * @throws ISiomeApiError
     */
    findGateway(
        address: string,
        certificateFilePath: string,
        privateKeyFilePath: string
    ): Promise<Map<string, IEndpoint[]>>;

    /**
     * Browse the online information model for a specific nodeId
     * @category Client
     * @param nodeId
     * @throws ISiomeApiError
     */
    browse(nodeId: string): Promise<IBrowseResult>;

    /**
     * Read a node in the online information model
     * @category Client
     * @param nodeId
     * @throws ISiomeApiError
     */
    read(nodeId: string): Promise<IReadResult>;

    /**
     * Call a specific online method with given input arguments
     * @category Client
     * @param methodNodeId
     * @param inputArguments
     * @throws ISiomeApiError
     */
    callMethod(methodNodeId: string, inputArguments: IOnlineMethodArguments[]): Promise<any>;

    /**
     * Set the value of an online variable
     * @category Client
     * @param nodeId The node which value should be changed.
     * @param value The new value
     * @throws ISiomeApiError
     */
    write(nodeId: string, value: any): Promise<void>
    //#endregion

    //#region PubSub Methods

    /**
     * Create Pubsub connection
     * @category PubSub
     * @param newName The name of the connection
     * @param address The address of the connection
     * @param network The network of the connection
     * @param publisherId The publisher id of the connection
     */
    addPubSubConnection(newName: string, address: string, network: string, publisherId: number): Promise<IOpcNode>;

    /**
     * Create Pubsub Dataset Simple
     * @category PubSub
     * @param datasetName The name of the Dataset
     * @param connectionId The nodeId of the connection
     * @param interval The interval in ms
     * @param headerLayoutUri
     * @param isUnicast
     * @param listenPort
     */
    addPubSubPublishedDatasetSimple(
        datasetName: string,
        connectionId: string,
        interval: number,
        headerLayoutUri: string,
        isUnicast: boolean,
        listenPort: string
    ): Promise<void>;

    /**
     * Create Pubsub connection
     * @category PubSub
     * @param newName The name of the Published Dataset
     * @param description The description of the Published Dataset
     */
    addPubSubPublishedDataset(newName: string, description: string): Promise<IOpcNode>;

    /**
     * Create Pubsub Published Dataset Writer
     * @category PubSub
     * @param datasetName The name of the Dataset Writer
     * @param newPublishedDatasetId The nodeId of the Published Dataset
     */
    addPubSubDatasetWriter(datasetName: string, newPublishedDatasetId: string): Promise<IOpcNode>;

    /**
     * Create Pubsub Dataset Writer Group
     * @category PubSub
     * @param datasetName The name of the Dataset Writer Group
     * @param connectionId The nodeId of the connection
     * @param interval The interval in ms
     * @param headerLayoutUri
     * @param isUnicast
     * @param listenPort
     * @param newDatasetWriterId The nodeId of the Dataset Writer
     */
    addPubSubWriterGroup(
        datasetName: string,
        connectionId: string,
        interval: number,
        headerLayoutUri: string,
        isUnicast: boolean,
        listenPort: string,
        newDatasetWriterId: string
    ): Promise<IOpcNode>;

    /**
     * Add Variables to a Pubsub Dataset
     * @category PubSub
     * @param pubSubDatasetNodeId The nodeId of the dataset to add the variables
     * @param nodeIds The nodeIds of the nodes to add
     */
    addPubSubVariables(pubSubDatasetNodeId: string, nodeIds: string[]): Promise<void>;

    /**
     * Add Pubsub Subscribed Dataset
     * @category PubSub
     * @param datasetNodeId The nodeId of the published dataset
     * @param isStandaloneSubscribedDataset Is Stand alone Subscribed Dataset
     * @param targetNodeIds The target nodeIds of the contained variables of the dataset
     */
    addPubSubSubscribedDataset(
        datasetNodeId: string,
        isStandaloneSubscribedDataset: boolean,
        targetNodeIds: string[]
    ): Promise<void>;

    /**
     * Add Pubsub Subscriber Dataset from Published XML Path
     * @category PubSub
     * @param fileNames The XML Path oft teh Published Dataset
     */
    addPubSubAvailablePublishedDataset(fileNames: string[]): Promise<void>;

    /**
     * Gets all published DataSets
     * @category PubSub
     */
    getAllPublishedDatasets(): Promise<IOpcNode[]>;

    /**
     * Check if Namespace up to date
     * @category PubSub
     */
    isNamespaceZeroUpdateNecessary(): Promise<boolean>;

    /**
     * update namespace
     * @category PubSub
     */
    updateNamespaceZero(): Promise<void>;
    //#endregion
}
