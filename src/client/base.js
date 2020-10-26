const axios = require('axios');

/**
 * Abstract class that provides the common bones for OSDU API clients.
 * - Provides the framework for managing authentication and appending required headers to API requests.
 * @class
 * @abstract
 * @category Clients
 */
class BaseOsduClient {
    /**
     * @constructor
     * @param {string} api_url - The url for the OSDU API, with or without a trailing `/`
     */
    constructor(api_url) {
        if (!api_url) {
            throw new Error(`Must provide an API url for the OSDU application`);
        }
        this.apiUrl = api_url;
        if (this.apiUrl[this.apiUrl.length-1] == '/') {
            this.apiUrl = this.apiUrl.substr(0, this.apiUrl.length-1);
        }
        this.axiosClient = axios.create({
            baseURL: this.apiUrl
        });
    }

    // Auth
    /**
     * Refresh the access token used to authenticate API Requests
     * - Not implemented in the base class
     * @protected
     * @throws Error
     */
    _refreshAccessToken() {
        throw new Error(`_refreshAccessToken is not implemented in BaseOsduClient`);
    }

    // HTTP Requests
    /**
     * Generate the HTTP headers needed to interact with the OSDU API
     * @protected
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Object} The common headers required to communicate with the OSDU API
     */
    _getHeaders(data_partition) {
        if (!this.accessToken) {
            throw new Error(`OSDU client does not have an access token`);
        }
        return {
            "Content-Type": "application/json",
            "data-partition-id": data_partition,
            "Authorization": `Bearer ${this.accessToken}`
        };
    }

    /**
     * Common logic to all HTTP requests made to the OSDU API
     * - For internal client use only
     * - Handles the automatic generation of common headers, authentication, and retries (up to 3) on error conditions
     * @protected
     * @param {string} data_partition - The data partition against which the request is being made
     * @param {Function} method - The axios method reference to call when sending the request (`get`, `post`, etc.)
     * @param {Object} args - The arguments used to invoke the API request
     * @param {string} args.path - The url path to reach out to on the OSDU API (I.E. `/path`)
     * @param {Object} [args.body] - The JSON HTTP body to include with the request
     * @param {Object} [args.config] - Any additional Axios config to provide with the request. Note that `Content-Type`, `data-partition-id`, and `Authorization` headers will be overwritten
     * @param {number} [iteration=1] - The iteration of this request. Used for internal recursion and should not be passed in by an external caller
     * @returns {Promise<AxiosResponse>} The response from the Axios client
     */
    async _makeRequest(data_partition, method, args, iteration = 1) {
        // Set up configuration such as headers
        if (!args.config) {
            args.config = { headers: {} };
        }
        if (!this.accessToken) {
            await this._refreshAccessToken();
        }
        args.config.headers = Object.assign(
            args.config.headers, 
            this._getHeaders(data_partition)
        );

        // Make axios request
        var response;
        try {
            if (args.body) {
                response = await method(args.path, args.body, args.config);
            }
            else {
                response = await method(args.path, args.config);
            }
        }
        catch (error) {
            if (error.response) {
                response = error.response;
            }
            else {
                throw error;
            }
        }

        // Handle response
        switch(response.status) {
            case 200:
                return response.data;
            case 401:
            case 403:
                await this._refreshAccessToken();
            case 500:
                // Validate iteration and retry
                const maxAttempts = 3;
                if (iteration > maxAttempts) {
                    throw new Error(`Failed retrying method with the OSDU API: [${response.status}] ${response.statusText}`);
                }
                else {
                    return this._makeRequest(data_partition, method, args, iteration+1);
                }
                break;
            default:
                throw new Error(`Invalid response code from the OSDU API: [${response.status}] ${response.statusText}`);
        }
    }

    /**
     * Convenience method for invoking HTTP POST requests
     * @param {string} path - The url path for the HTTP POST request (I.E. `/path`)
     * @param {Object} body - The JSON body to send with the HTTP POST request
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<Object>} The response data from the Axios client
     */
    post(path, body, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.post, { path, body });
    }

    /**
     * Convenience method for invoking HTTP PUT requests
     * @param {string} path - The url path for the HTTP PUT request (I.E. `/path`)
     * @param {Object} body - The JSON body to send with the HTTP PUT request
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<Object>} The response data from the Axios client
     */
    put(path, body, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.put, { path, body });
    }

    /**
     * Convenience method for invoking HTTP GET requests
     * @param {string} path - The url path for the HTTP GET request (I.E. `/path`)
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<Object>} The response data from the Axios client
     */
    get(path, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.get, { path });
    }

    /**
     * Convenience method for invoking HTTP DELETE requests
     * @param {string} path - The url path for the HTTP DELETE request (I.E. `/path`)
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<string>} The response data from the Axios client
     */
    delete(path, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.delete, { path });
    }
}

module.exports = BaseOsduClient;