const AWSOsduBaseCredentialProvider = require('./baseCredentialProvider');

/**
 * Simple credenial provider class that provides Cognito username and password from memory
 * @class
 * @category Clients
 * @subcategory AWS
 */
class AWSOsduSimpleCredentialProvider extends AWSOsduBaseCredentialProvider {
    /**
     * @constructor
     * @param {string} username - Cognito username
     * @param {string} password - Cognito password
     */
    constructor(username, password) {
        super();
        this._username = username;
        this._password = password;
    }

    /**
     * Serve credentials from memory
     * @returns {Promise<Object>} credentials - Promise resolving with Cognito username and password
     * @returns {string} credentials.username - Cognito username
     * @returns {string} credentials.password - Cognito password
     */
    async GetCredentials() {
        return {
            username: this._username,
            password: this._password
        };
    }
}

module.exports = AWSOsduSimpleCredentialProvider;