import { NamespaceChangeType } from "../enums/namespace-change-type";

export interface INamespaceChange {
  type: NamespaceChangeType;
  message: string;
}
