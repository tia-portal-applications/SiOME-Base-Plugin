export interface IConnectParams {
  address: string;
  allowExpiredTokens: boolean;
  applicationName: string;
  certificateKeyPathClient: string;
  certificatePathClient: string;
  overrideEndpointUrl: string;
  securityMode: number;
  securityPolicy: string;
  session: string;
  password?: string;
  username?: string;
}
