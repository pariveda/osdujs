const {
    OsduQueryExpression,
    OsduQueryBuilder,
    OsduR2Tasks
} = require('../../../src');
const assert = require('assert').strict;

describe("OsduR2Tasks.DeliverByQuery tests", function() {
    it("Can deliver via query", async function() {
        // Assemble
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const dataPartition = `opendes`;
        var service = {
            QueryService: {
                V2: {
                    queryWithPaging: async (query_params, cursor) => {
                        assert.strictEqual(query_params.kind, kind, `Must use correct kind on query params: ${query_params.kind} != ${kind}`);
                        assert.strictEqual(query_params.query, `(data.ResourceID:\"${resourceID1}\" OR data.ResourceID:\"${resourceID2}\")`, `Must use correct query statement`);
                        if (cursor) {
                            return {
                                results: [
                                    {
                                        id: resourceID2,
                                        kind,
                                        data: {
                                            ResourceID: resourceID2
                                        }
                                    }
                                ],
                                totalCount: 2,
                                cursor: undefined
                            }
                        }
                        else {
                            return {
                                results: [
                                    {
                                        id: resourceID1,
                                        kind,
                                        data: {
                                            ResourceID: resourceID1
                                        }
                                    }
                                ],
                                totalCount: 2,
                                cursor: "cursor_value"
                            }
                        }
                    }
                }
            },
            DeliveryService: {
                V2: {
                    getSignedUrls: async (srns) => {
                        const output = {
                            unprocessed: [],
                            processed: {}
                        };
                        srns.forEach((srn) => {
                            output.processed[srn] = {
                                signedUrl: "signed_url",
                                unsignedUrl: "unsigned_url",
                                kind: kind
                            };
                        });
                        return output;
                    }
                }
            }
        }
        var task = new OsduR2Tasks.DeliverByQuery(service, dataPartition);
        task.setQuery((new OsduQueryBuilder())
            .kind(kind)
            .query(
                OsduQueryExpression.FromOperator('OR', 
                    new OsduQueryExpression(`data.ResourceID:\"${resourceID1}\"`),
                    new OsduQueryExpression(`data.ResourceID:\"${resourceID2}\"`)
                )
            )
            .build());

        // Act
        var taskOutput = await task.execute();

        // Assert
        assert.strictEqual(taskOutput.error, undefined, `No error thrown: ${taskOutput.error}`);
        assert.strictEqual(Object.keys(taskOutput.deliveredRecords).length, 2, `Delivered all of the records`);
        assert.strictEqual(taskOutput.deliveredRecords[resourceID1].signedUrl, "signed_url", `Delivered record ID 1`);
        assert.strictEqual(taskOutput.deliveredRecords[resourceID2].signedUrl, "signed_url", `Delivered record ID 2`);
        assert.strictEqual(taskOutput.batches, 2, `Worked in correct batch size`);
        assert.strictEqual(taskOutput.totalCount, 2, `Passed on correct total count`);
        assert.strictEqual(taskOutput.cursor, undefined, `No cursor returned as no error thrown`);
    });

    it("Can handle query error", async function() {
        // Assemble
        const errorMessage = `Message`;
        const dataPartition = `opendes`;
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const cursorExpected = "cursor_value";
        var service = {
            QueryService: {
                V2: {
                    queryWithPaging: async (query_params, cursor) => {
                        if (cursor) {
                            throw new Error(errorMessage);
                        }
                        else {
                            return {
                                results: [
                                    {
                                        id: resourceID1,
                                        kind,
                                        data: {
                                            ResourceID: resourceID1
                                        }
                                    }
                                ],
                                totalCount: 2,
                                cursor: cursorExpected
                            }
                        }
                    }
                }
            },
            DeliveryService: {
                V2: {
                    getSignedUrls: async (srns) => {
                        const output = {
                            unprocessed: [],
                            processed: {}
                        };
                        srns.forEach((srn) => {
                            output.processed[srn] = {
                                signedUrl: "signed_url",
                                unsignedUrl: "unsigned_url",
                                kind: kind
                            };
                        });
                        return output;
                    }
                }
            }
        }
        var task = new OsduR2Tasks.DeliverByQuery(service, dataPartition);

        // Act
        var taskOutput = await task.execute();

        // Assert
        assert.notEqual(taskOutput.error, undefined, `Error should be defined`);
        assert.strictEqual(taskOutput.error.message, errorMessage, `Error should have correct message`);
        assert.strictEqual(Object.keys(taskOutput.deliveredRecords).length, 1, `Delivered retrieved records`);
        assert.strictEqual(taskOutput.deliveredRecords[resourceID1].signedUrl, "signed_url", `Delivered record ID 1`);
        assert.strictEqual(taskOutput.batches, 1, `Handled batch before error`);
        assert.strictEqual(taskOutput.totalCount, 2, `Passed on correct total count`);
        assert.strictEqual(taskOutput.lastCursor, cursorExpected, `Returns last cursor retrieved`);
    });

    it("Can handle storage error", async function() {
        // Assemble
        const errorMessage = `Message`;
        const dataPartition = `opendes`;
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const cursorExpected = "cursor_value";
        var service = {
            QueryService: {
                V2: {
                    queryWithPaging: async (query_params, cursor) => {
                        if (cursor) {
                            return {
                                results: [
                                    {
                                        id: resourceID2,
                                        kind,
                                        data: {
                                            ResourceID: resourceID2
                                        }
                                    }
                                ],
                                totalCount: 2,
                                cursor: undefined
                            }
                        }
                        else {
                            return {
                                results: [
                                    {
                                        id: resourceID1,
                                        kind,
                                        data: {
                                            ResourceID: resourceID1
                                        }
                                    }
                                ],
                                totalCount: 2,
                                cursor: cursorExpected
                            }
                        }
                    }
                }
            },
            DeliveryService: {
                V2: {
                    getSignedUrls: async (srns) => {
                        if (srns[0] == resourceID2) {
                            throw new Error(errorMessage);
                        }
                        const output = {
                            unprocessed: [],
                            processed: {}
                        };
                        srns.forEach((srn) => {
                            output.processed[srn] = {
                                signedUrl: "signed_url",
                                unsignedUrl: "unsigned_url",
                                kind: kind
                            };
                        });
                        return output;
                    }
                }
            }
        }
        var task = new OsduR2Tasks.DeliverByQuery(service, dataPartition);

        // Act
        var taskOutput = await task.execute();

        // Assert
        assert.notEqual(taskOutput.error, undefined, `Error should be defined`);
        assert.strictEqual(taskOutput.error.message, errorMessage, `Error should have correct message`);
        assert.strictEqual(Object.keys(taskOutput.deliveredRecords).length, 1, `Delivered retrieved records`);
        assert.strictEqual(taskOutput.deliveredRecords[resourceID1].signedUrl, "signed_url", `Delivered record ID 1`);
        assert.strictEqual(taskOutput.batches, 1, `Handled batch before error`);
        assert.strictEqual(taskOutput.totalCount, 2, `Passed on correct total count`);
        assert.strictEqual(taskOutput.lastCursor, cursorExpected, `Returns last cursor retrieved`);
    });
});

