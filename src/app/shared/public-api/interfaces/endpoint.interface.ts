import { IEndpointIdentityToken } from "./endpoint-identity-token.interface";
import { IEndpointCertificate } from "./endpoint-certificate.interface";
import { SecurityMode } from "../enums/security-mode";

export interface IEndpoint {
  applicationName: string;
  endpointUrl: string;
  serverCertificate: IEndpointCertificate;
  securityMode: SecurityMode;
  securityPolicyUri: string;
  transportProfileUri: string;
  securityLevel: number;
  userIdentityTokens: IEndpointIdentityToken[];
  applicationUri: string;
}
