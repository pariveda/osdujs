const { AWSOsduBaseCredentialProvider } = require('./baseCredentialProvider');
const AWS = require('aws-sdk');

class AWSOsduSSMCredentialProvider extends AWSOsduBaseCredentialProvider {
    constructor(params) {
        super();
        this._usernameParameter = params.username_parameter;
        this._passwordParameter = params.password_parameter;
        this._awsRegion = params.aws_region;
        this._profile = params.aws_profile;
    }

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

module.exports.AWSOsduSSMCredentialProvider = AWSOsduSSMCredentialProvider;