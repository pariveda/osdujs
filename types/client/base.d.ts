export = BaseOsduClient;
/**
 * Abstract class that provides the common bones for OSDU API clients.
 * - Provides the framework for managing authentication and appending required headers to API requests.
 * @class
 * @abstract
 * @category Clients
 */
declare class BaseOsduClient {
    /**
     * @constructor
     * @param {string} api_url - The url for the OSDU API, with or without a trailing `/`
     */
    constructor(api_url: string);
    apiUrl: string;
    axiosClient: any;
    /**
     * Refresh the access token used to authenticate API Requests
     * - Not implemented in the base class
     * @protected
     * @throws Error
     */
    protected _refreshAccessToken(): void;
    /**
     * Generate the HTTP headers needed to interact with the OSDU API
     * @protected
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Object} The common headers required to communicate with the OSDU API
     */
    protected _getHeaders(data_partition: string): any;
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
    protected _makeRequest(data_partition: string, method: Function, args: {
        path: string;
        body: any;
        config: any;
    }, iteration?: number): Promise<any>;
    /**
     * Convenience method for invoking HTTP POST requests
     * @param {string} path - The url path for the HTTP POST request (I.E. `/path`)
     * @param {Object} body - The JSON body to send with the HTTP POST request
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<Object>} The response data from the Axios client
     */
    post(path: string, body: any, data_partition: string): Promise<any>;
    /**
     * Convenience method for invoking HTTP PUT requests
     * @param {string} path - The url path for the HTTP PUT request (I.E. `/path`)
     * @param {Object} body - The JSON body to send with the HTTP PUT request
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<Object>} The response data from the Axios client
     */
    put(path: string, body: any, data_partition: string): Promise<any>;
    /**
     * Convenience method for invoking HTTP GET requests
     * @param {string} path - The url path for the HTTP GET request (I.E. `/path`)
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<Object>} The response data from the Axios client
     */
    get(path: string, data_partition: string): Promise<any>;
    /**
     * Convenience method for invoking HTTP DELETE requests
     * @param {string} path - The url path for the HTTP DELETE request (I.E. `/path`)
     * @param {string} data_partition - The data partition against which the request is being made
     * @returns {Promise<string>} The response data from the Axios client
     */
    delete(path: string, data_partition: string): Promise<string>;
}
