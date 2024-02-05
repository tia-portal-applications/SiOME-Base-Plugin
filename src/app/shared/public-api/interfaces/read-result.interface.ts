import { NodeClass } from "../enums/node-classes";
import { ILocalizedText } from "../opcua-types/interfaces/localized-text.interface";
import { INodeId } from "../opcua-types/interfaces/node-id.interface";
import { IQualifiedName } from "../opcua-types/interfaces/qualified-name.interface";

export interface IReadResult {
    readonly browseName: IQualifiedName;
    readonly description: ILocalizedText;
    readonly displayName: ILocalizedText;
    readonly nodeId: INodeId;
    readonly statusCode: any;
    readonly eventNotifier: number;
    readonly nodeClass: NodeClass;
}
