
export declare interface ITrustListDataType {
    specifiedLists?: number ;
    trustedCertificates?: Uint8Array [] | null;
    trustedCrls?: Uint8Array [] | null;
    issuerCertificates?: Uint8Array [] | null;
    issuerCrls?: Uint8Array [] | null;
}
