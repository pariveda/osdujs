const {
    ServiceConnectionOsduClient,
    OsduR2Service,
    OsduQueryExpression,
    OsduQueryBuilder
} = require('../../src');
const assert = require('assert').strict;
require('dotenv').config();

const createOSDUClient = () => {
    return new ServiceConnectionOsduClient({
        api_url: process.env.OSDU_API_URL,
        oauth_client_id: process.env.OSDU_CLIENT_SECRET_ID,
        oauth_client_secret: process.env.OSDU_CLIENT_SECRET,
        oauth_url: process.env.OSDU_OAUTH_URL
    });
}

describe("ServiceConnectionOsduClient tests", function() {
    this.timeout(60000); 
    it("Can get authentication and refresh tokens", async function() {
        // Assemble
        var osduClient = createOSDUClient();

        // Act
        await osduClient._refreshAccessToken();
        const firstAccessToken = osduClient.accessToken;
        await osduClient._refreshAccessToken();

        // Assert
        assert.notStrictEqual(firstAccessToken, undefined, "First access token undefined");
        assert.notStrictEqual(osduClient.accessToken, undefined, "Second access token undefined");
        assert.notStrictEqual(firstAccessToken, osduClient.accessToken, "Access token not refreshed");
    });

    it("Can perform general query", async function() {
        // Assemble
        var awsClient = createOSDUClient();
        var osduService = new OsduR2Service(awsClient, 'opendes');
        const kind = `opendes:osdu:file:0.2.0`;
        const limit = 2;

        // Act
        var queryResults = await osduService.QueryService.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .limit(limit)
                .build()
        );

        // Assert
        assert.strictEqual(queryResults.results.length, limit, `Returned exactly the limit amount of records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
    });
});

