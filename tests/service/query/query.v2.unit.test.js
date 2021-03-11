const {
    OsduService,
    OsduQueryExpression,
    OsduQueryBuilder
} = require('../../../src');
const assert = require('assert').strict;

describe("OsduV2QueryService tests", function() {
    it("Can perform a query with a complex expression", async function() {
        // Assemble
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const dataPartition = `opendes`;
        var client = {
            post: async (path, query_params, data_partition) => {
                assert.strictEqual(path, `/api/search/v2/query`, `Must use correct query path`);
                assert.strictEqual(query_params.kind, kind, `Must use correct kind on query params`);
                assert.strictEqual(query_params.query, `(data.ResourceID:\"${resourceID1}\" OR data.ResourceID:\"${resourceID2}\")`, `Must use correct query statement`);
                assert.strictEqual(data_partition, dataPartition, `Mast use correct data partition`);
                return {
                    results: [
                        { kind: kind },
                        { kind: kind }
                    ]
                };
            }
        };
        var osduService = new OsduService(client, 'opendes');

        // Act
        var queryResults = await osduService.QueryService.V2.query(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID1}\"`),
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID2}\"`)
                    )
                )
                .build()
        );

        // Assert
        assert.strictEqual(queryResults.results.length, 2, `Returned exactly the correct amount of records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
    });

    it("Can perform query with paging and no cursor", async function() {
        // Assemble
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const dataPartition = `opendes`;
        var client = {
            post: async (path, query_params, data_partition) => {
                assert.strictEqual(path, `/api/search/v2/query_with_cursor`, `Must use correct query path`);
                assert.strictEqual(query_params.kind, kind, `Must use correct kind on query params`);
                assert.strictEqual(query_params.limit, 1, `Must use correct limit on query params`);
                assert.strictEqual(query_params.cursor, undefined, `Must not use a cursor`);
                assert.strictEqual(query_params.query, `(data.ResourceID:\"${resourceID1}\" OR data.ResourceID:\"${resourceID2}\")`, `Must use correct query statement`);
                assert.strictEqual(data_partition, dataPartition, `Mast use correct data partition`);
                return {
                    results: [
                        { kind: kind }
                    ],
                    cursor: "ONE"
                };
            }
        };
        var osduService = new OsduService(client, 'opendes');

        // Act
        var queryResults = await osduService.QueryService.V2.queryWithPaging(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID1}\"`),
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID2}\"`)
                    )
                )
                .limit(1)
                .build()
        );

        // Assert
        assert.strictEqual(queryResults.results.length, 1, `Returned all expected records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
    });

    it("Can perform query with paging and provided cursor", async function() {
        // Assemble
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const dataPartition = `opendes`;
        const cursor = "TWO";
        var client = {
            post: async (path, query_params, data_partition) => {
                assert.strictEqual(path, `/api/search/v2/query_with_cursor`, `Must use correct query path`);
                assert.strictEqual(query_params.kind, kind, `Must use correct kind on query params`);
                assert.strictEqual(query_params.limit, 1, `Must use correct limit on query params`);
                assert.strictEqual(query_params.cursor, cursor, `Must use specified cursor`);
                assert.strictEqual(query_params.query, `(data.ResourceID:\"${resourceID1}\" OR data.ResourceID:\"${resourceID2}\")`, `Must use correct query statement`);
                assert.strictEqual(data_partition, dataPartition, `Mast use correct data partition`);
                return {
                    results: [
                        { kind: kind }
                    ],
                    cursor: cursor + "_MODIFIED"
                };
            }
        };
        var osduService = new OsduService(client, 'opendes');

        // Act
        var queryResults = await osduService.QueryService.V2.queryWithPaging(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID1}\"`),
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID2}\"`)
                    )
                )
                .limit(1)
                .build(),
            cursor
        );

        // Assert
        assert.strictEqual(queryResults.results.length, 1, `Returned all expected records`);
        assert.strictEqual(queryResults.results[0].kind, kind, `Returned exactly the kind specified in the query`);
        assert.strictEqual(queryResults.cursor, `${cursor}_MODIFIED`, `Returned next cursor`);
    });

    it("Can perform query all", async function() {
        // Assemble
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const dataPartition = `opendes`;
        var client = {
            post: async (path, query_params, data_partition) => {
                assert.strictEqual(path, `/api/search/v2/query_with_cursor`, `Must use correct query path`);
                assert.strictEqual(query_params.kind, kind, `Must use correct kind on query params`);
                assert.strictEqual(query_params.limit, 1, `Must use correct limit on query params`);
                assert.strictEqual(query_params.query, `(data.ResourceID:\"${resourceID1}\" OR data.ResourceID:\"${resourceID2}\")`, `Must use correct query statement`);
                assert.strictEqual(data_partition, dataPartition, `Mast use correct data partition`);
                switch(query_params.cursor) {
                    case undefined:
                        return {
                            results: [
                                { kind: kind }
                            ],
                            cursor: "ONE"
                        };
                    case "ONE":
                        return {
                            results: [
                                { kind: kind }
                            ],
                            cursor: "TWO"
                        };
                    case "TWO": 
                        return {
                            results: []
                        };
                    default:
                        assert.fail(`Unexpected cursor value ${query_params.cursor}`);
                }
            }
        };
        var osduService = new OsduService(client, 'opendes');

        // Act
        var queryResults = await osduService.QueryService.V2.queryAll(
            (new OsduQueryBuilder())
                .kind(kind)
                .query(
                    OsduQueryExpression.FromOperator('OR', 
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID1}\"`),
                        new OsduQueryExpression(`data.ResourceID:\"${resourceID2}\"`)
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
});

