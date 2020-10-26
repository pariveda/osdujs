export = AWSOsduBaseCredentialProvider;
/**
 * Abstract class that provides the common bones for AWS credential providers
 * @class
 * @abstract
 * @category Clients
 * @subcategory AWS
 */
declare class AWSOsduBaseCredentialProvider {
    /**
     * Shell method to define the credential provider interface for retrieving credentials
     * @returns {Promise<Object>} credentials - Promise resolving with Cognito username and password
     * @returns {string} credentials.username - Cognito username
     * @returns {string} credentials.password - Cognito password
     * @throws Error
     */
    GetCredentials(): Promise<any>;
}
