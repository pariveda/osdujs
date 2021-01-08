const {
    OsduQueryExpression,
    OsduQueryBuilder,
    OsduR2Tasks
} = require('../../../src');
const assert = require('assert').strict;

describe("OsduR2Tasks.UpdateByQuery tests", function() {
    it("Can modify via query", async function() {
        // Assemble
        const transformFunction = (record) => {
            record.modified = true;
            return record;
        };
        var savedCount = 0;
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const dataPartition = `opendes`;
        var service = {
            QueryService: {
                queryWithPaging: async (query_params, cursor) => {
                    assert.strictEqual(query_params.kind, kind, `Must use correct kind on query params`);
                    assert.strictEqual(query_params.query, `(data.ResourceID:\"${resourceID1}\" OR data.ResourceID:\"${resourceID2}\")`, `Must use correct query statement`);
                    if (cursor) {
                        return {
                            results: [
                                {
                                    id: resourceID2,
                                    kind
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
                                    kind
                                }
                            ],
                            totalCount: 2,
                            cursor: "cursor_value"
                        }
                    }
                }
            },
            StorageService: {
                storeRecords: async (records) => {
                    records.forEach((record) => {
                        assert.strictEqual(record.modified, true, `Record must be marked as modified`);
                        savedCount++;
                    });
                }
            }
        }
        var task = new OsduR2Tasks.UpdateByQuery(service, dataPartition);
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
        var taskOutput = await task.execute(transformFunction);

        // Assert
        assert.strictEqual(taskOutput.transformedRecords.length, 2, `Transformed all of the records`);
        assert.strictEqual(taskOutput.transformedRecords[0], resourceID1, `Modified record ID 1`);
        assert.strictEqual(taskOutput.transformedRecords[1], resourceID2, `Modified record ID 2`);
        assert.strictEqual(taskOutput.batches, 2, `Worked in correct batch size`);
        assert.strictEqual(taskOutput.totalCount, 2, `Passed on correct total count`);
        assert.strictEqual(savedCount, 2, `All records were passed to storage service to be saved`);
        assert.strictEqual(taskOutput.error, undefined, `No error thrown`);
        assert.strictEqual(taskOutput.cursor, undefined, `No cursor returned as no error thrown`);
    });

    it("Can handle query error", async function() {
        // Assemble
        const transformFunction = (record) => {
            record.modified = true;
            return record;
        };
        const errorMessage = `Message`;
        var savedCount = 0;
        const dataPartition = `opendes`;
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const cursorExpected = "cursor_value";
        var service = {
            QueryService: {
                queryWithPaging: async (query_params, cursor) => {
                    if (cursor) {
                        throw new Error(errorMessage);
                    }
                    else {
                        return {
                            results: [
                                {
                                    id: resourceID1,
                                    kind
                                }
                            ],
                            totalCount: 2,
                            cursor: cursorExpected
                        }
                    }
                }
            },
            StorageService: {
                storeRecords: async (records) => {
                    records.forEach((record) => {
                        savedCount++;
                    });
                }
            }
        }
        var task = new OsduR2Tasks.UpdateByQuery(service, dataPartition);

        // Act
        var taskOutput = await task.execute(transformFunction);

        // Assert
        assert.notEqual(taskOutput.error, undefined, `Error should be defined`);
        assert.strictEqual(taskOutput.error.message, errorMessage, `Error should have correct message`);
        assert.strictEqual(taskOutput.transformedRecords.length, 1, `Transformed retrieved records`);
        assert.strictEqual(taskOutput.transformedRecords[0], resourceID1, `Modified record ID 1`);
        assert.strictEqual(taskOutput.batches, 1, `Handled batch before error`);
        assert.strictEqual(taskOutput.totalCount, 2, `Passed on correct total count`);
        assert.strictEqual(savedCount, 1, `Handled batch was saved`);
        assert.strictEqual(taskOutput.lastCursor, cursorExpected, `Returns last cursor retrieved`);
    });

    it("Can handle storage error", async function() {
        // Assemble
        const transformFunction = (record) => {
            record.modified = true;
            return record;
        };
        const errorMessage = `Message`;
        var savedCount = 0;
        const dataPartition = `opendes`;
        const kind = `opendes:osdu:file:0.2.0`;
        const resourceID1 = `srn:file/csv:78903363466313001857976:`;
        const resourceID2 = `srn:file/csv:040769811445061947276214:`;
        const cursorExpected = "cursor_value";
        var service = {
            QueryService: {
                queryWithPaging: async (query_params, cursor) => {
                    if (cursor) {
                        return {
                            results: [
                                {
                                    id: resourceID2,
                                    kind
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
                                    kind
                                }
                            ],
                            totalCount: 2,
                            cursor: cursorExpected
                        }
                    }
                }
            },
            StorageService: {
                storeRecords: async (records) => {
                    records.forEach((record) => {
                        if (record.id == resourceID2) {
                            throw new Error(errorMessage);
                        }
                        savedCount++;
                    });
                }
            }
        }
        var task = new OsduR2Tasks.UpdateByQuery(service, dataPartition);

        // Act
        var taskOutput = await task.execute(transformFunction);

        // Assert
        assert.notEqual(taskOutput.error, undefined, `Error should be defined`);
        assert.strictEqual(taskOutput.error.message, errorMessage, `Error should have correct message`);
        assert.strictEqual(taskOutput.transformedRecords.length, 1, `Transformed retrieved records`);
        assert.strictEqual(taskOutput.transformedRecords[0], resourceID1, `Modified record ID 1`);
        assert.strictEqual(taskOutput.batches, 1, `Handled batch before error`);
        assert.strictEqual(taskOutput.totalCount, 2, `Passed on correct total count`);
        assert.strictEqual(savedCount, 1, `Handled batch was saved`);
        assert.strictEqual(taskOutput.lastCursor, cursorExpected, `Returns last cursor retrieved`);
    });
});

