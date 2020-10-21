const { BaseOsduClient } = require('../base.js');
const AWS = require('aws-sdk');

class AWSOsduClient extends BaseOsduClient {
    constructor(params) {
        super(params.api_url);
        this._cognitoClientId = params.cognito_client_id;
        this._awsRegion = params.aws_region;
        this._profile = params.profile;
        this._credentialProvider = params.credential_provider;
    }

    // Auth
    _refreshAccessToken() {
        if (!this.cognito) {
            var config = {
                region: this._awsRegion
            };
            if (this._profile) {
                var credentials = new AWS.SharedIniFileCredentials({profile: this._profile});
                config.credentials = credentials;
            }
            this.cognito = new AWS.CognitoIdentityServiceProvider(config);
        }

        return new Promise(async (resolve, reject) => {
            const userCredentials = await this._credentialProvider.GetCredentials();

            this.cognito.initiateAuth({
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this._cognitoClientId,
                AuthParameters: {
                    USERNAME: userCredentials.username,
                    PASSWORD: userCredentials.password
                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.accessToken = data.AuthenticationResult.AccessToken;
                    this.refreshToken = data.AuthenticationResult.RefreshToken;
                    resolve();
                }
            });
        });
    }
}

module.exports.AWSOsduClient = AWSOsduClient;