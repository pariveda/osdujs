const {
    AWSOsduClient,
    OsduService,
    OsduQueryExpression,
    OsduQueryBuilder,
    AWSOsduSimpleCredentialProvider
} = require('../../src');
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
        var osduService = new OsduService(awsClient, 'opendes');
        const kind = `opendes:wks:dataset--File.Generic:1.0.0`;
        const limit = 2;

        // Act
        var queryResults = await osduService.QueryService.V2.query(
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
        var osduService = new OsduService(awsClient, 'opendes');
        const kind = `opendes:wks:dataset--File.Generic:1.0.0`;

        // Act
        var queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .limit(1)
                .build()
        );
        queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    new OsduQueryExpression(`id:\"${queryResults.results[0].id}\"`)
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
        var osduService = new OsduService(awsClient, 'opendes');
        const kind = `opendes:wks:dataset--File.Generic:1.0.0`;

        // Act
        var queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .limit(2)
                .build()
        );
        queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`id:\"${queryResults.results[0].id}\"`),
                        new OsduQueryExpression(`id:\"${queryResults.results[1].id}\"`)
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
        var osduService = new OsduService(awsClient, 'opendes');
        const kind = `opendes:wks:dataset--File.Generic:1.0.0`;

        // Act
        var queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .limit(2)
                .build()
        );
        queryResults = await osduService.QueryService.V2.queryAll(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`id:\"${queryResults.results[0].id}\"`),
                        new OsduQueryExpression(`id:\"${queryResults.results[1].id}\"`)
                    )
                )
                .limit(1)
                .build()
        );

        // Assert
        assert.strictEqual(queryResults.results.length, 2, `Returned all expected records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
        assert.strictEqual(queryResults.batches, 3, `Query All used 3 batches to retrieve 2 records at a batch size of 1`);
    });

    it("Can get a record", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
        var osduService = new OsduService(awsClient, 'opendes');

        // Act
        var queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind('*:*:*:*')
                .limit(1)
                .build()
        );
        const recordId = queryResults.results[0].id;
        var record = await osduService.StorageService.V2.getRecord(recordId);

        // Assert
        assert.strictEqual(record.id, recordId, `Returned exactly the record specified in the request`);
    });

    it("Can get multiple records", async function() {
        // Assemble
        var awsClient = createAWSOSDUClient();
        var osduService = new OsduService(awsClient, 'opendes');

        // Act
        var queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind('*:*:*:*')
                .limit(2)
                .build()
        );
        const recordIds = [
            queryResults.results[0].id,
            queryResults.results[1].id
        ];
        var records = await osduService.StorageService.V2.getRecords(recordIds);

        // Assert
        assert.strictEqual(records.records[0].id, recordIds[0], `Returned exactly the records specified in the request`);
        assert.strictEqual(records.records[1].id, recordIds[1], `Returned exactly the records specified in the request`);
    });
});

