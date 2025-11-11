import {IEndpointIdentityToken} from "./endpoint-identity-token.interface";
import {ICertificate} from "./certificate.interface";
import {SecurityMode} from "../enums/security-mode";

export interface IEndpoint {
    applicationName: string;
    endpointUrl: string;
    serverCertificate: ICertificate;
    securityMode: SecurityMode;
    securityPolicyUri: string;
    transportProfileUri: string;
    securityLevel: number;
    userIdentityTokens: IEndpointIdentityToken[];
    applicationUri: string;
}
