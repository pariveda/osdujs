export = AWSOsduSimpleCredentialProvider;
declare const AWSOsduSimpleCredentialProvider_base: typeof import("./baseCredentialProvider");
/**
 * Simple credenial provider class that provides Cognito username and password from memory
 * @class
 * @category Clients
 * @subcategory AWS
 */
declare class AWSOsduSimpleCredentialProvider extends AWSOsduSimpleCredentialProvider_base {
    /**
     * @constructor
     * @param {string} username - Cognito username
     * @param {string} password - Cognito password
     */
    constructor(username: string, password: string);
    _username: string;
    _password: string;
}
