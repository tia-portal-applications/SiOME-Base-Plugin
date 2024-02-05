import { MappingState } from "../enums/mapping-state";
import { IOpcReference } from "./opc-reference.interface";
import { ISpecialNodeClasses } from "./special-node-classes.interface";
import { NodeClass } from "../enums/node-classes";
import { INodeId } from "../opcua-types/interfaces/node-id.interface";
import { IQualifiedName } from "../opcua-types/interfaces/qualified-name.interface";

export interface IOpcNode {
    readonly id: string;
    readonly nodeId: INodeId;
    readonly name: string;
    readonly namespaceIndex: number;
    readonly browseName: IQualifiedName;
    readonly browseNameIndex: number;
    readonly browseNameWithoutIndex: string;
    readonly hasChildren: boolean;
    readonly children: INodeId[];
    readonly childReferences: IOpcReference[];
    readonly parents: INodeId[];
    readonly dataType: INodeId;
    readonly dataTypeString: string;
    readonly hasTypeDefinition: boolean;
    readonly isAbstract: boolean;
    readonly isDeclarationInstance: boolean;
    readonly isProperty: boolean;
    readonly isSelected: boolean;
    readonly mapping: string;
    readonly mappingState: MappingState;
    readonly nodeClass: NodeClass;
    readonly specialNodeClass: ISpecialNodeClasses;
    readonly typeDefinition: INodeId;
    readonly virtualChildReferences: Promise<IOpcReference[]>;
    readonly arrayDimension: number[];
}
