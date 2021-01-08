const OsduR2BaseTask = require('./base');
const {
    OsduQueryBuilder
} = require('../../models/query');

/**
 * Simple task to deliver records in batches based on a query and a transform functions
 * @class
 * @category Tasks
 * @subcategory R2
 */
class OsduR2DeliverByQueryTask extends OsduR2BaseTask {
    /**
     * @constructor
     * @param {OsduR2BaseService} osdu_service - An implementation of the OSDU service class to broker communication with the OSDU API services
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_service, data_partition) {
        super(osdu_service, data_partition);
        this._queryParams = (new OsduQueryBuilder()).kind(`${data_partition}:*:file:*`).build();
    }

    /**
     * Set the query parameters to be used for batched query requests. Query params must have a file kind
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduR2UpdateByQueryTask} Itself to allow chaining
     */
    setQuery(query_params) {
        const splitQueryParams = query_params.kind.split(':');
        if (splitQueryParams.length != 4 || !splitQueryParams[2].includes('file')) {
            throw new Error(`Query kind in DeliverByQuery must be a file type`);
        }
        this._queryParams = query_params;
        return this;
    }

    /**
     * Execute the task, querying and delivering in batches based on the set query parameters
     * @returns {Object} A summary of the performed task, including a map of delivered records `deliveredRecords`, the total count of records for the query `totalCount`, the number of batches that succeeded `batches`, the last cursor used (if an error was encountered) `lastCursor`, and the error that was thrown (if encountered) `error`
     */
    async execute() {
        var output = {
            deliveredRecords: {},
            unprocessedRecords: [],
            totalCount: 0,
            batches: 0,
            error: undefined,
            lastCursor: undefined
        };
        var response;
        var cursor = undefined;
        try {
            do {
                var srns = [];
                response = await this._service.QueryService.queryWithPaging(this._queryParams, cursor);
                output.totalCount = response.totalCount;
                for (let index = 0; index < response.results.length; index++) {
                    srns.push(response.results[index].data.ResourceID);
                }
                const deliveredRecords = await this._service.DeliveryService.getSignedUrls(srns);
                cursor = response.cursor;
                output.batches++;
                output.deliveredRecords = Object.assign(output.deliveredRecords, deliveredRecords.processed);
                output.unprocessedRecords.push(...deliveredRecords.unprocessed);
            } while (cursor);
        }
        catch (err) {
            output.error = err;
            output.lastCursor = cursor;
        }
        return output;
    }
}

module.exports = OsduR2DeliverByQueryTask;