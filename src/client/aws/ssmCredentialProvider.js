const AWSOsduBaseCredentialProvider = require('./baseCredentialProvider');
const AWS = require('aws-sdk');

/**
 * Credenial provider class that provides Cognito username and password from AWS SSM parameters
 * @class
 * @category Clients
 * @subcategory AWS
 */
class AWSOsduSSMCredentialProvider extends AWSOsduBaseCredentialProvider {
    /**
     * @param {Object} params - AWS configuration and SSM parameters
     * @param {string} params.aws_region - The AWS region in which the OSDU application is deployed
     * @param {string} [params.aws_profile] - The AWS credential profile to use when making requests to SSM (typically only for local development)
     * @param {string} params.username_parameter - SSM parameter identifier where the Cognito username is stored
     * @param {string} params.password_parameter - SSM parameter identifier where the Cognito password is stored
     */
    constructor(params) {
        super();
        this._usernameParameter = params.username_parameter;
        this._passwordParameter = params.password_parameter;
        this._awsRegion = params.aws_region;
        this._profile = params.aws_profile;
    }

    /**
     * Fetch credentials from SSM and serve dynamically
     * - Configures AWS SDK to use provided credentials for local development or automatic credentials for hosted applications
     * - Brokers communication with AWS SSM to retrieve Username/Password parameters
     * @returns {Promise<Object>} credentials - Promise resolving with Cognito username and password
     * @returns {string} credentials.username - Cognito username
     * @returns {string} credentials.password - Cognito password
     */
    GetCredentials() {
        if (!this._ssm) {
            var config = {
                region: this._awsRegion
            };
            if (this._profile) {
                var credentials = new AWS.SharedIniFileCredentials({profile: this._profile});
                config.credentials = credentials;
            }
            this._ssm = new AWS.SSM(config);
        }

        return new Promise((resolve, reject) => {
            this._ssm.getParameters({
                Names: [
                    this._usernameParameter,
                    this._passwordParameter
                ],
                WithDecryption: true
            }, (err, data) => {
                if (err){
                    reject(err);
                }
                else {
                    var output = {};
                    var unexpectedParameters = [];
                    var failure = false;
                    for (var i = 0; i < data.Parameters.length; i++) {
                        var parameter = data.Parameters[i];
                        switch (parameter.Name) {
                            case this._usernameParameter:
                                output.username = parameter.Value;
                                break;
                            case this._passwordParameter:
                                output.password = parameter.Value;
                                break;
                            default:
                                failure = true;
                                unexpectedParameters.push(parameter);
                                break;
                        }
                    }
                    if (failure) {
                        reject(new Error(`AWSOsduSSMCredentialProvider Received unexpected parameter(s) from SSM: ${JSON.stringify(unexpectedParameters)}`));
                    }
                    else {
                        resolve(output);
                    }
                }
            });
        });
    }
}

module.exports = AWSOsduSSMCredentialProvider;