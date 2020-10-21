class AWSOsduBaseCredentialProvider {
    constructor() {
    }

    async GetCredentials() {
        throw new Error(`AWSOsduBaseCredentialProvider:GetCredentials is not implemented`);
    }
}

module.exports.AWSOsduBaseCredentialProvider = AWSOsduBaseCredentialProvider;