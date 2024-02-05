export interface IEndpointCertificate {
    issuerCommonName: string;
    issuerCountryName: string;
    issuerLocalityName: string;
    issuerOrganizationName: string;
    issuerOrganizationUnit: string;
    issuerStateOrProvinceName: string;

    subjectCommonName: string;
    subjectCountryName: string;
    subjectLocalityName: string;
    subjectOrganizationName: string;
    subjectOrganizationUnit: string;
    subjectStateOrProvinceName: string;

    notAfter: string;
    notBefore: string;

    applicationUri: string;
    ip: string;
    domainName: string;

    serial: string;
    originalServerCertificate: string;
    serverCertificateBuffer: Uint8Array;
}
