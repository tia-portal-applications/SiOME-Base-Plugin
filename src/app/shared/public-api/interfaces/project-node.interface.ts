export interface IProjectNode {
    readonly children: string[];
    readonly dependsOn: string[];
    readonly filename: string;
    readonly isLocked: boolean;
    readonly namespaceIndex: number;
    readonly namespaceUri: string;
    readonly publicationDate: string;
    readonly version: string;
}
