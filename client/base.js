const axios = require('axios');

class BaseOsduClient {
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
    _refreshAccessToken() {
        throw new Error(`_refreshAccessToken is not implemented in BaseOsduClient`);
    }

    // HTTP Requests
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

    async _makeRequest(data_partition, method, args, iteration = 1) {
        // Set up configuration such as headers
        if (!args.config) {
            args.config = {};
        }
        if (!this.accessToken) {
            await this._refreshAccessToken();
        }
        args.config.headers = this._getHeaders(data_partition);

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

    post(path, body, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.post, { path, body });
    }

    async put(path, body, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.put, { path, body });
    }

    async get(path, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.get, { path });
    }

    async delete(path, data_partition) {
        return this._makeRequest(data_partition, this.axiosClient.delete, { path });
    }
}

module.exports.BaseOsduClient = BaseOsduClient;