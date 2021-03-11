export = AWSOsduSSMCredentialProvider;
/**
 * Credenial provider class that provides Cognito username and password from AWS SSM parameters
 * @class
 * @category Clients
 * @subcategory AWS
 */
declare class AWSOsduSSMCredentialProvider extends AWSOsduBaseCredentialProvider {
    /**
     * @param {Object} params - AWS configuration and SSM parameters
     * @param {string} params.aws_region - The AWS region in which the OSDU application is deployed
     * @param {string} [params.aws_profile] - The AWS credential profile to use when making requests to SSM (typically only for local development)
     * @param {string} params.username_parameter - SSM parameter identifier where the Cognito username is stored
     * @param {string} params.password_parameter - SSM parameter identifier where the Cognito password is stored
     */
    constructor(params: {
        aws_region: string;
        aws_profile?: string;
        username_parameter: string;
        password_parameter: string;
    });
    _usernameParameter: string;
    _passwordParameter: string;
    _awsRegion: string;
    _profile: string;
    _ssm: AWS.SSM;
}
import AWSOsduBaseCredentialProvider = require("./baseCredentialProvider");
import AWS = require("aws-sdk");
