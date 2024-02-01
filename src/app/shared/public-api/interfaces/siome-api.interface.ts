import { SupportedFileFormat } from '../enums/supported-file-format';
import { ModellingRules } from '../enums/modelling-rules';
import { ISiomeApiError } from './siome-api-error.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { INamespaceChange } from './namespace-change.interface';
import { IImportFile } from './import-file.interface';
import { IConnectParams } from './connect-params.interface';
import { BrowseOrAll } from '../enums/browse-or-all';
import { AttributeId } from '../enums/attribute-ids';
import { ITiaNode } from './tia-node.interface';
import { IOpcReference } from './opc-reference.interface';
import { IProjectNode } from './project-node.interface';
import { IOpcNode } from './opc-node.interface';
import { IEndpoint } from './endpoint.interface';
import { IReadResult } from './read-result.interface';
import { IBrowseResult } from './browse-result.interface';
import { IBaseAttributeData } from './base-attribute-data.interface';
import { IQualifiedName } from '../opcua-types/interfaces/qualified-name.interface';
import { ILocalizedText } from '../opcua-types/interfaces/localized-text.interface';
import { IAddStructurItemParameter } from './add-structure-item-parameter.interface';
import { IMethodArguments } from './method-arguments.interface';
import { ISchemas } from './schemas.interface';
import { IOnlineMethodArguments } from './online-method-arguments.interface';
import { NamespaceAttributeId } from '../enums/namespace-attribute-ids';
import { IAddVariableParameter } from './add-variable-parameter';
import { IAddVariableTypeParameter } from './add-variable-type-parameter';
import { IAddObjectParameter } from './add-object-parameter';
import { IAddObjectTypeParameter } from './add-object-type-parameter';
import { IAddReferenceTypeParameter } from './add-reference-type-parameter';
import { IAddDataTypeParameter } from './add-data-type-parameter';
import { ArgumentType } from '../enums/argument-type';
import { IOpenProjectError } from './open-project-error.interface';

export interface ISiomeApi {
  //#region OPC UA Methods

  /**
   * Activates or deactivates the type defined reference
   * @category OPC UA
   * @param sourceId The NodeId of the source of the TypeReference
   * @param targetId  The BrowseName of the target of the TypeReference
   * @param referenceType  The NodeId of the ReferenceType of the TypeReference
   * @returns the status of the isActivated property
   */
  activateTypeReference(
    sourceId: string,
    targetBrowseName: string,
    referenceType?: string,
  ): Promise<boolean | ISiomeApiError>;

  /**
   * Return a string array containing the current namespace uris
   * @category OPC UA
   */
  getNamespaceArray(): string[];

  /**
   * Check whether a specific namespace is available and loaded in SiOME.
   * @category OPC UA
   * @param namespaceUri Entry to be searched for e.g. "http://opcfoundation.org/UA/".
   * @returns
   */
  checkNamespaceAvailable(namespaceUri: string): boolean;

  /**
   * Returns the current namespace index.
   * @category OPC UA
   */
  currentNamespaceIndex(): number | ISiomeApiError;

  /**
   * sets the provided namespaceindex or namespaceUri as current namespace
   * @param namespace namespaceindex or namespaceUri
   * @category General
   */
  setCurrentNamespace(namespace: number | string): void;

  /**
   * Open a dialog to unlock or add a new namespace.
   * @category OPC UA
   */
  unlockOrCreateNamespace(): Promise<void>;

  /**
   * @param parentId The NodeId of the DataType.
   * @param params The definition of the new structure item.
   * @category OPC UA
   */
  addStructureItem(parentId: string, params: IAddStructurItemParameter): void;

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
   */
  searchNode(parentId: string, searchTerm: string): IOpcNode | ISiomeApiError;

  /**
   * Search for the given nodeId within all available nodes in the information model.
   * @category OPC UA
   * @param nodeId
   */
  getOpcNode(nodeId: string): IOpcNode | ISiomeApiError;

  /**
   * Add a new entry to the current information model.
   * @category OPC UA
   * @param parentNodeId Add the new entry below this parent node.
   * @param params The parameters for the newly created node.
   * @param updateReferences Should the references be updated after creation.
   * @returns The newly created IOpcReference or SiOMEApiError.
   */
  addChild(
    parentNodeId: string,
    params:
      IAddVariableParameter
      | IAddVariableTypeParameter
      | IAddObjectParameter
      | IAddObjectTypeParameter
      | IAddReferenceTypeParameter
      | IAddDataTypeParameter,
  ): Promise<IOpcReference | ISiomeApiError>;

  /**
   * Add a new variable type of a given DataType to the current information model.
   * @category OPC UA
   * @param dataTypeNodeId The NodeId of the DataType from which a VariableType should be created.
   * @returns The newly created VariableType or SiOMEApiError.
   */
  createVariableTypeFromDataType(
    dataTypeNodeId: string,
  ): Promise<IOpcNode | ISiomeApiError>;

  /**
   * Add a new method to the current information model.
   * @category OPC UA
   * @param parentNodeId Add the new method below this parent node.
   * @param methodName The new method name.
   * @param namespaceIndex The namespace index to be used when creating the method.
   * @param inputArgs The input parameter for the new method.
   * @param outputArgs The output parameter for the new method.
   */
  addMethod(
    parentNodeId: string,
    methodName: string,
    namespaceIndex: number,
    inputArgs: IMethodArguments[],
    outputArgs: IMethodArguments[],
  ): Promise<IOpcReference | ISiomeApiError>;

  /**
   * Add a new argument to the input or output arguments of a method.
   * @category OPC UA
   * @param methodNodeId Add a new argument underneath this method node.
   * @param argumentType Input or Output argument
   * @param params The parameters required for creating new argument.
   */

  addMethodArgument(
    methodNodeId: string,
    argumentType: ArgumentType,
    params: IMethodArguments,
  ): Promise<void | ISiomeApiError>;

  /**
   * Get all the input or output arguments of the method.
   * @category OPC UA
   * @param methodNodeId  The nodeId of the method.
   * @param argumentType Type of the argument - Input or Output argument
   */

  getAllMethodArguments(
    methodNodeId: string,
    argumentType: ArgumentType,
  ): Promise<IMethodArguments[] | ISiomeApiError>;

  /**
   * Get a specific input or output argument of the method.
   * @category OPC UA
   * @param methodNodeId  The nodeId of the method.
   * @param argumentType Type of the argument - Input or Output argument
   * @param argumentName Name of the argument
   */

  getMethodArgument(
    methodNodeId: string,
    argumentType: ArgumentType,
    argumentName: string,
  ): Promise<IMethodArguments | ISiomeApiError>;

  /**
   * Edit the input or output argument of a method.
   * @category OPC UA
   * @param methodNodeId The nodeId of the method
   * @param argumentType Type of the argument - Input or Output argument
   * @param argumentName The name of the argument which needs to be edited
   * @param params
   */

  editMethodArgument(
    methodNodeId: string,
    argumentType: ArgumentType,
    argumentName: string,
    params: IMethodArguments,
  ): Promise<void | ISiomeApiError>;

  /**
   * Delete the input or output argument of the method.
   * @category OPC UA
   * @param methodNodeId  The nodeId of the method.
   * @param argumentType Type of the argument - Input or Output argument
   */

  deleteMethodArgument(
    methodNodeId: string,
    argumentType: ArgumentType,
    argumentName: string,
  ): Promise<void | ISiomeApiError>;

  /**
   * Set the attributes of a node
   * @category OPCUA
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
    options:
      IQualifiedName
      | ILocalizedText
      | string
      | number
      | boolean
      | number[],
  ): Promise<void>;

  /**
   * Set the namespace attributes
   * @category OPC UA
   * @param attributeId The attribute#s id that needs to be modified
   * @param namespaceIndex namespace index.
   * @param value The new value
   */
  setNamespaceAttribute(
    attributeId: NamespaceAttributeId,
    namespaceIndex: number,
    value: string,
  ): void;

  /**
   * Retrieve the internal IProjectNode belonging to a specific namespace uri.
   * @category OPC UA
   * @param namespaceUri to be searched for e.g. "http://opcfoundation.org/UA/".
   */
  getNamespace(namespaceUri: string): IProjectNode | ISiomeApiError;

  /**
   * The method checks if the provided child is a descendant of the provided node
   * @category OPC UA
   * @param childNodeId
   * @param nodeID
   */
  isDescendantFrom(childNodeId: string, nodeId: string): boolean;

  /**
   * Set the modelling rule for a given reference
   * @category OPC UA
   * @param nodeId
   * @param rule
   */
  setModellingRule(nodeId: string, rule: ModellingRules): void;

  /**
   * Set mapping for a given node
   * @category OPC UA
   * @param nodeId
   * @param mapping
   */
  setMapping(nodeId: string, mapping: string): void;

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
  getAttributeData(
    nodeId: string,
    attributeId: AttributeId,
  ): Promise<IBaseAttributeData>;
  //#endregion

  //#region UI Methods
  /**
   * Open a dialog in SiOME to select a directory.
   * @category UI
   * @param title Title of the dialog
   */
  openSelectDirectoryDialog(title?: string): Promise<string | ISiomeApiError>;

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
    visible?: (node: IOpcNode) => boolean,
  ): void;

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
    visible?: (node: IOpcNode) => boolean,
  ): void;

  /**
   * Open an alert dialog in SiOME
   * @category UI
   * @param headline
   * @param message
   */
  openAlertDialog(headline: string, message: string): void;

  /**
   * Open a dialog in SiOME to select one or multiple file(s).
   * @category UI
   * @param defaultPath
   * @param fileExtension
   * @param multiSelect
   */
  openSelectFileDialog(
    defaultPath?: string,
    fileExtension?: string,
    multiSelect?: boolean,
  ): Promise<string[] | ISiomeApiError>;

  /**
   * Jump to a specific node in the information model tree
   * @category UI
   * @param nodeId
   */
  jumpToNode(nodeId: string): void;

  /**
   * Open the default dialog in SiOME to export nodesets
   * @category UI
   */
  openExportXMLDialog(): Promise<void>;

  /**
   * Highlight and select the specific node in the information model.
   * @category UI
   * @param node The node which should be highlighted and selected.
   */
  activateOpcNode(nodeId: string): void;
  //#endregion

  //#region General Methods

  /**
   * Return the http module of Node.js
   * @category General
   */
  getHttpModule(): any;

  /**
   * Return the https module of Node.js
   * @category General
   */
  getHttpsModule(): any;

  /**
   * Return the fs module of Node.js
   * @category General
   */
  getFsModule(): any;

  /**
   * Import one or multiple xml-like files through a dialog.
   * @category General
   * @param fileFormat The file format you want to import.
   * @param supportMultipleFiles Allow multiple files to import.
   * @returns The retrieved data from the file(s) as concatenated string, or an empty string if an error occurred.
   */
  importFile(
    fileFormat: SupportedFileFormat,
    supportMultipleFiles: boolean,
  ): Promise<IImportFile>;

  /**
   * Create a root log node.
   * @category General
   * @param name The description for the parent log node.
   */
  createLogNode(name: string): void;

  /**
   * Add a new entry with the specific type under the current parent log node.
   * @category General
   * @param logEntry The entry to be added.
   * @param type Available types are "info", "error", "warning".
   */
  newLogEntry(logEntry: string, type: string): void;

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
  getSiOMESettings(): any;

  /**
   * The method  closes the SiOME.
   * @category General
   */
  closeSiOME(): void;

  /**
   * The method returns the current SiOME version
   * @category General
   * @returns version string
   */
  getSiOMEVersion(): string;

  /**
   * Return the nodeset as a string created by the given namespace uris
   * @category General
   * @param namespaceUris
   */
  exportXML(
    namespaceUris: string[],
    includeMappings: boolean,
    includeValues: boolean,
  ): Promise<string | ISiomeApiError>;

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
  isAttachedToTIA(): boolean;

  /**
   * Get the current TIA Portal project path.
   * @category TIA Portal
   */
  getTIAProjectPath(): string;

  /**
   * Open a dialog in SiOME to attach to a TIA Portal project.
   * @category TIA Portal
   */
  openTIAProjectDialog(): Promise<void>;

  /**
     * connect to a TIA Portal project.
     * @category TIA Portal
<    * @param attach {boolean} true is attach and false is open by using the path provided
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
    password?: string,
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
  getAllBlockNames(): string[];

  /**
   * Retrieve all available udt names in current TIA Portal project
   * @category TIA Portal
   */
  getAllUdtNames(): string[];

  /**
   * Retrieve all available tag tables in current TIA Portal project
   * @category TIA Portal
   */
  getAllTagTableNames(): string[];

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
   * @param namespaces indices of the namespaces to be exported number[] | string (e.g. 1,2)
   * @param serverInterfaceName
   */
  addSimaticServerInterfaceImplicit(
    isReferenceNamespace: boolean,
    namespaceIndices: number[] | string,
    serverInterfaceName: string,
  ): Promise<void>;

  //#endregion

  //#region Validation Methods

  /**
   * Validate the corresponding file with the provided schemas
   * @category Validation
   * @param filePath
   * @param providedSchemas
   */
  validateSchema(
    filePath: string,
    providedSchemas: ISchemas[],
  ): Promise<boolean | ISiomeApiError>;

  /**
   * Validate the mapping for a given node and its children
   * @category Validation
   * @param nodeId
   */
  validateMappings(
    nodeId: string,
  ): Promise<Array<{ node: IOpcNode; conflict: string }>>;

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
  connectImplicit(
    connectParams: IConnectParams,
    browseOrAll: BrowseOrAll,
  ): Promise<boolean>;

  /**
   * Disconnect from current opc ua server without showing a dialog
   * @category Client
   */
  disconnectImplicit(): void;

  /**
   * Find an opc ua server through a given address
   * @category Client
   * @param address
   * @param certificateFilePath
   * @param privateKeyFilePath
   */
  findGateway(
    address: string,
    certificateFilePath: string,
    privateKeyFilePath: string,
  ): Promise<Map<string, IEndpoint[]>>;

  /**
   * Browse the online information model for a specific nodeId
   * @category Client
   * @param nodeId
   */
  browse(nodeId: string): Promise<IBrowseResult | ISiomeApiError>;

  /**
   * Read a node in the online information model
   * @category Client
   * @param nodeId
   */
  read(nodeId: string): Promise<IReadResult | ISiomeApiError>;

  /**
   * Call a specific online method with given input arguments
   * @category Client
   * @param methodNodeId
   * @param inputArguments
   */
  callMethod(
    methodNodeId: string,
    inputArguments: IOnlineMethodArguments[],
  ): Promise<any>;

  /**
   * Set the value of a online varibale
   * @category Client
   * @param nodeId The node which value should be changed.
   * @param options The new value
   */
  setOnlineVariableValue(nodeId: string, value: any): Promise<void>;
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
  addPubSubConnection(
    newName: string,
    address: string,
    network: string,
    publisherId: number,
  ): Promise<IOpcNode>;

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
    listenPort: string,
  ): void;

  /**
   * Create Pubsub connection
   * @category PubSub
   * @param newName The name of the Published Dataset
   * @param description The description of the Published Dataset
   */
  addPubSubPublishedDataset(
    newName: string,
    description: string,
  ): Promise<IOpcNode>;

  /**
   * Create Pubsub Published Dataset Writer
   * @category PubSub
   * @param datasetName The name of the Dataset Writer
   * @param newPublishedDatasetId The nodeId of the Published Dataset
   */
  addPubSubDatasetWriter(
    datasetName: string,
    newPublishedDatasetId: string,
  ): Promise<IOpcNode>;

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
    newDatasetWriterId: string,
  ): Promise<IOpcNode>;

  /**
   * Add Variables to a Pubsub Dataset
   * @category PubSub
   * @param pubSubDatasetNodeId The nodeId of the dataset to add the variables
   * @param nodeIds The nodeIds of the nodes to add
   */
  addPubSubVariables(pubSubDatasetNodeId: string, nodeIds: string[]): void;

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
    targetNodeIds: string[],
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
  getAllPublishedDatasets(): IOpcNode[];

  /**
   * Check if Namespace up to date
   * @category PubSub
   */
  isNamespaceZeroUpdateNecessary(): boolean;

  /**
   * update namespace
   * @category PubSub
   */
  updateNamespaceZero(): void;
  //#endregion
}
