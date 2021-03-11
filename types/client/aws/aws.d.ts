export = AWSOsduClient;
/**
 * Class that provides an AWS implementation for OSDU API clients.
 * - Communicates with AWS Cognito directly to obtain access tokens but does not use the OAuth protocol.
 * - Will attempt to refresh access token through Cognito when an unauthorized response is received.
 * - Utilizes a credential provider to dynamically obtain Cognito credentials
 * @class
 * @category Clients
 * @subcategory AWS
 */
declare class AWSOsduClient extends BaseOsduClient {
    /**
     * @constructor
     * @param {Object} params - The configuration parameters defined below
     * @param {string} params.api_url - The url for the OSDU API, with or without a trailing `/`
     * @param {string} params.cognito_client_id - The client id (non-secret) for the OSDU Cognito user pool
     * @param {string} params.aws_region - The AWS region in which the OSDU application is deployed
     * @param {AWSOsduBaseCredentialProvider} params.credential_provider - A credential provider used to dynamically retrieve auth tokens
     * @param {string} [params.aws_profile] - The AWS credential profile to use when making requests to Cognito (typically only for local development)
     */
    constructor(params: {
        api_url: string;
        cognito_client_id: string;
        aws_region: string;
        credential_provider: any;
        aws_profile?: string;
    });
    _cognitoClientId: string;
    _awsRegion: string;
    _profile: string;
    _credentialProvider: any;
    cognito: AWS.CognitoIdentityServiceProvider;
    accessToken: string;
    refreshToken: string;
}
import BaseOsduClient = require("../base.js");
import AWS = require("aws-sdk");
