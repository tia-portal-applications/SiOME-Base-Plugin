export interface IRevocationListData {
    local: boolean,
    number: string,
    validFrom: string,
    nextUpdate: string,
    organization: string,
    organizationUnit: string,
    locality: string,
    state: string,
    country: string,
    serialNumbers: string[]
}
