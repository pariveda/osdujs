const BaseOsduClient = require('../base.js');
const request = require('request-promise');

/**
 * Class that provides a service connection (OAuth client credentials) implementation for OSDU API clients. 
 * - Uses the OAuth client credentials protocol for service connections not associated with a specific user
 * - Will attempt to refresh access token through OAuth client credentials when an unauthorized response is received.
 * @class
 * @category Clients
 * @subcategory Service
 */
class ServiceConnectionOsduClient extends BaseOsduClient {
    /**
     * @constructor
     * @param {Object} params - The configuration parameters defined below
     * @param {string} params.api_url - The url for the OSDU API, with or without a trailing `/`
     * @param {string} params.oauth_client_id - The client id (client-credentials) for the OSDU OAuth client
     * @param {string} params.oauth_client_secret - The client secret (client-credentials) for the OSDU OAuth client
     * @param {string} params.oauth_url - The url for the OSDU OAuth
     */
    constructor(params) {
        super(params.api_url);
        this._oauthAuthHeader = `Basic ${Buffer.from(params.oauth_client_id + ':' + params.oauth_client_secret).toString('base64')}`;
        this._oauthUrl = params.oauth_url;
    }

    // Auth
    /**
     * Internal access token refresh method
     * - Brokers communication with OAuth domain to perform service authentication and retrieve a new access token for the OSDU Application
     * @protected
     * @returns {Promise<void>} Promise resolving after the access token on the client has been updated
     */
    async _refreshAccessToken() {
        // Request new OAuth access token
        var response;
        try {
            response = await request.post(`${this._oauthUrl}/oauth2/token`, {
                form: {
                  grant_type: 'client_credentials',
                  scope: 'osduOnAws/osduOnAWSService'
                },
                headers: {
                    Authorization: this._oauthAuthHeader
                }
            });
            if (response) {
                response = JSON.parse(response);
            }
        }
        catch (error) {
            throw new Error(`Unable to retrieve access token from OSDU OAuth: ${error.message}`);
        }

        // Handle response
        if (response && response['access_token']) {
            this.accessToken = response['access_token'];
        }
        else {
            throw new Error(`Unable to retrieve access token from OSDU OAuth: Unknown error`);
        }
    }
}

module.exports = ServiceConnectionOsduClient;