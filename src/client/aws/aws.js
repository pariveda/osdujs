const { BaseOsduClient } = require('../base.js');
const AWS = require('aws-sdk');

/**
 * Class that provides an AWS implementation for OSDU API clients. 
 * - Communicates with AWS Cognito directly to obtain access tokens but does not use the OAuth protocol.
 * - Will attempt to refresh access token through Cognito when an unauthorized response is received.
 * - Utilizes a credential provider to dynamically obtain Cognito credentials
 * @class
 * @category Clients
 * @subcategory AWS
 */
class AWSOsduClient extends BaseOsduClient {
    /**
     * @constructor
     * @param {Object} params - The configuration parameters defined below
     * @param {string} params.api_url - The url for the OSDU API, with or without a trailing `/`
     * @param {string} params.cognito_client_id - The client id (non-secret) for the OSDU Cognito user pool
     * @param {string} params.aws_region - The AWS region in which the OSDU application is deployed
     * @param {AWSOsduBaseCredentialProvider} params.credential_provider - A credential provider used to dynamically retrieve auth tokens
     * @param {string} [params.profile] - The AWS credential profile to use when making requests to Cognito (typically only for local development)
     */
    constructor(params) {
        super(params.api_url);
        this._cognitoClientId = params.cognito_client_id;
        this._awsRegion = params.aws_region;
        this._profile = params.profile;
        this._credentialProvider = params.credential_provider;
    }

    // Auth
    /**
     * Internal access token refresh method
     * - Configures AWS SDK to use provided credentials for local development or automatic credentials for hosted applications
     * - Utilizes credential provider to dynamically fetch updated credentials
     * - Brokers communication with AWS Cognito to perform Username/Password authentication and retrieve a new access token for the OSDU Application
     * @protected
     * @returns {Promise<void>} Promise resolving after the access token on the client has been updated
     */
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