export = ServiceConnectionOsduClient;
/**
 * Class that provides a service connection (OAuth client credentials) implementation for OSDU API clients.
 * - Uses the OAuth client credentials protocol for service connections not associated with a specific user
 * - Will attempt to refresh access token through OAuth client credentials when an unauthorized response is received.
 * @class
 * @category Clients
 * @subcategory Service
 */
declare class ServiceConnectionOsduClient extends BaseOsduClient {
    /**
     * @constructor
     * @param {Object} params - The configuration parameters defined below
     * @param {string} params.api_url - The url for the OSDU API, with or without a trailing `/`
     * @param {string} params.oauth_client_id - The client id (client-credentials) for the OSDU OAuth client
     * @param {string} params.oauth_client_secret - The client secret (client-credentials) for the OSDU OAuth client
     * @param {string} params.oauth_url - The url for the OSDU OAuth
     */
    constructor(params: {
        api_url: string;
        oauth_client_id: string;
        oauth_client_secret: string;
        oauth_url: string;
    });
    _oauthAuthHeader: string;
    _oauthUrl: string;
    accessToken: any;
}
import BaseOsduClient = require("../base.js");
