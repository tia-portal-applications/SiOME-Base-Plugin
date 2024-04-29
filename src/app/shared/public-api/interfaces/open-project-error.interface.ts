import { ISiomeApiError } from "./siome-api-error.interface";

export interface IOpenProjectError extends ISiomeApiError{
    multiplePLCs: string[];
    multipleTIAProjects: string[];
}
