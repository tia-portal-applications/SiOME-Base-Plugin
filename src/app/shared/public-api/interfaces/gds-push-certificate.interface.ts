export interface IGdsPushCertificateInterface {
    algorithm?: number, //Sha256
    domainNames?: [],
    formatCert?: string, // "DER"
    ips?: string[],
    keyStrength?: number, //2048
    validFor?: number // 365
}
