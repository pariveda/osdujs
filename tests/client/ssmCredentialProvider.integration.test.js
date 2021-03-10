const {
    AWSOsduClient,
    AWSOsduSSMCredentialProvider
} = require('../../src');
const assert = require('assert').strict;
require('dotenv').config();

const createAWSOSDUClient = () => {
    return new AWSOsduClient({
        api_url: process.env.OSDU_API_URL, 
        cognito_client_id: process.env.OSDU_CLIENT_ID, 
        aws_region: process.env.AWS_REGION, 
        aws_profile: process.env.AWS_PROFILE,
        credential_provider: new AWSOsduSSMCredentialProvider({
            username_parameter: '/osdu/osdur3m3/admin-user', 
            password_parameter: '/osdu/osdur3m3/admin-password',
            aws_region: process.env.AWS_REGION,
            aws_profile: process.env.AWS_PROFILE
        })
    });
}

describe("AWSOsduSSMCredentialProvider tests", function() {
    this.timeout(60000); 
    it("Can get authentication and refresh tokens", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();

        // Act
        await awsClient._refreshAccessToken();

        // Assert
        assert.notStrictEqual(awsClient.accessToken, undefined, "Access token undefined");
        assert.notStrictEqual(awsClient.refreshToken, undefined, "Refresh token undefined");
    });
});

