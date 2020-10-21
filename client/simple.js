const { BaseOsduClient } = require('./base.js');

class SimpleOsduClient extends BaseOsduClient {
    constructor(api_url, access_token) {
        super(api_url);
        this.accessToken = access_token;
    }

    // Auth
    _refreshAccessToken() {
        return new Promise((resolve, _) => {
            resolve();
        });
    }
}

module.exports.SimpleOsduClient = SimpleOsduClient;