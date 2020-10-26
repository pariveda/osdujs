/**
 * Abstract class that provides the common bones for AWS credential providers
 * @class
 * @abstract
 * @category Clients
 * @subcategory AWS
 */
class AWSOsduBaseCredentialProvider {
    /** @constructor */
    constructor() {
    }

    /**
     * Shell method to define the credential provider interface for retrieving credentials
     * @returns {Promise<Object>} credentials - Promise resolving with Cognito username and password
     * @returns {string} credentials.username - Cognito username
     * @returns {string} credentials.password - Cognito password
     * @throws Error
     */
    async GetCredentials() {
        throw new Error(`AWSOsduBaseCredentialProvider:GetCredentials is not implemented`);
    }
}

module.exports = AWSOsduBaseCredentialProvider;