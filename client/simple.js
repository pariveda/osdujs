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

    updateAccessToken(access_token) {
        this.accessToken = access_token;
    }
}

module.exports.SimpleOsduClient = SimpleOsduClient;