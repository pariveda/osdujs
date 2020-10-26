const BaseOsduClient = require('./base.js');

/**
 * Class that provides a simple BYOT (Bring your own token) implementation for OSDU API clients.
 * - Utilizes the provided access token but does not attempt to safeguard against token expiration
 * @class
 * @abstract
 * @category Clients
 * @subcategory Simple
 */
class SimpleOsduClient extends BaseOsduClient {
    /**
     * @constructor
     * @param {string} api_url - The url for the OSDU API, with or without a trailing `/`
     * @param {string} access_token - The OSDU access token (obtained via OAuth) with which to authenticate all requests
     */
    constructor(api_url, access_token) {
        super(api_url);
        this.accessToken = access_token;
    }

    // Auth
    /**
     * No need to document implementation. Solely a passthrough to override the abstract implementation of the base class
     * @private
     */
    _refreshAccessToken() {
        return new Promise((resolve, _) => {
            resolve();
        });
    }

    /**
     * Mechanism for updating the access token used to authenticate all OSDU API requests
     * @param {string} access_token - The OSDU access token (obtained via OAuth) with which to authenticate all requests
     */
    updateAccessToken(access_token) {
        this.accessToken = access_token;
    }
}

module.exports = SimpleOsduClient;