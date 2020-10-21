const {
    AWSOsduClient,
    OsduR2Service,
    OsduQueryExpression,
    OsduQueryBuilder,
    AWSOsduSimpleCredentialProvider
} = require('../..');
const assert = require('assert').strict;
require('dotenv').config();

const createAWSOSDUClient = () => {
    return new AWSOsduClient({
        api_url: process.env.OSDU_API_URL, 
        cognito_client_id: process.env.OSDU_CLIENT_ID, 
        aws_region: process.env.AWS_REGION, 
        aws_profile: process.env.AWS_PROFILE,
        credential_provider: new AWSOsduSimpleCredentialProvider(process.env.OSDU_USERNAME, process.env.OSDU_PASSWORD)
    });
}

describe("AWSOsduClient tests", function() {
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

    it("Can perform general query", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
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

    it("Can perform a query with an expression", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
        var osduService = new OsduR2Service(awsClient, 'opendes');
        const kind = `opendes:osdu:file:0.2.0`;

        // Act
        var queryResults = await osduService.QueryService.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    new OsduQueryExpression(`data.ResourceID:\"srn:file/csv:78903363466313001857976:\"`)
                )
                .build()
        );

        // Assert
        assert.strictEqual(queryResults.results.length, 1, `Returned exactly the correct amount of records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
    });

    it("Can perform a query with a more complex expression", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
        var osduService = new OsduR2Service(awsClient, 'opendes');
        const kind = `opendes:osdu:file:0.2.0`;

        // Act
        var queryResults = await osduService.QueryService.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`data.ResourceID:\"srn:file/csv:78903363466313001857976:\"`),
                        new OsduQueryExpression(`data.ResourceID:\"srn:file/csv:040769811445061947276214:\"`)
                    )
                )
                .build()
        );

        // Assert
        assert.strictEqual(queryResults.results.length, 2, `Returned exactly the correct amount of records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
    });

    it("Can perform query all", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
        var osduService = new OsduR2Service(awsClient, 'opendes');
        const kind = `opendes:osdu:file:0.2.0`;

        // Act
        var queryResults = await osduService.QueryService.queryAll(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`data.ResourceID:\"srn:file/csv:78903363466313001857976:\"`),
                        new OsduQueryExpression(`data.ResourceID:\"srn:file/csv:040769811445061947276214:\"`)
                    )
                )
                .build(),
            1
        );

        // Assert
        assert.strictEqual(queryResults.results.length, 2, `Returned all expected records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
        assert.strictEqual(queryResults.batches, 3, `Query All used 3 batches to retrieve 2 records at a batch size of 1`);
    });

    it("Can get a record", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
        var osduService = new OsduR2Service(awsClient, 'opendes');
        const recordId = `opendes:doc:ce7c6d2e9c81433c929d803735282bef`;

        // Act
        var record = await osduService.StorageService.getRecord(recordId);

        // Assert
        assert.strictEqual(record.id, recordId, `Returned exactly the record specified in the request`);
    });

    it("Can get multiple records", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
        var osduService = new OsduR2Service(awsClient, 'opendes');
        const recordIds = [
            `opendes:doc:ce7c6d2e9c81433c929d803735282bef`, 
            `opendes:doc:351e1a406fad404eb1ed7d0e5c2c6c30`
        ];

        // Act
        var records = await osduService.StorageService.getRecords(recordIds);

        // Assert
        assert.strictEqual(records.records[0].id, recordIds[0], `Returned exactly the records specified in the request`);
        assert.strictEqual(records.records[1].id, recordIds[1], `Returned exactly the records specified in the request`);
    });
});

