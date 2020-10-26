export = SimpleOsduClient;
declare const SimpleOsduClient_base: typeof import("./base.js");
/**
 * Class that provides a simple BYOT (Bring your own token) implementation for OSDU API clients.
 * - Utilizes the provided access token but does not attempt to safeguard against token expiration
 * @class
 * @abstract
 * @category Clients
 * @subcategory Simple
 */
declare class SimpleOsduClient extends SimpleOsduClient_base {
    /**
     * @constructor
     * @param {string} api_url - The url for the OSDU API, with or without a trailing `/`
     * @param {string} access_token - The OSDU access token (obtained via OAuth) with which to authenticate all requests
     */
    constructor(api_url: string, access_token: string);
    accessToken: string;
    /**
     * Mechanism for updating the access token used to authenticate all OSDU API requests
     * @param {string} access_token - The OSDU access token (obtained via OAuth) with which to authenticate all requests
     */
    updateAccessToken(access_token: string): void;
}
