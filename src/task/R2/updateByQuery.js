const OsduBaseTask = require('../base');
const {
    OsduQueryBuilder
} = require('../../models/query');

/**
 * Simple task to update records in batches based on a query and a transform functions
 * @class
 * @category Tasks
 * @subcategory R2
 */
class OsduR2UpdateByQueryTask extends OsduBaseTask {
    /**
     * @constructor
     * @param {OsduR2BaseService} osdu_service - An implementation of the OSDU service class to broker communication with the OSDU API services
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_service, data_partition) {
        super(osdu_service, data_partition);
        this._queryParams = (new OsduQueryBuilder()).build();
    }

    /**
     * Set the query parameters to be used for batched query requests
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduR2UpdateByQueryTask} Itself to allow chaining
     */
    setQuery(query_params) {
        this._queryParams = query_params;
        return this;
    }

    /**
     * Function that accepts an OSDU record and the OSDU service and asynchronously returns the transformed record
     *
     * @callback TransformFunction
     * @param {Object} osduRecord - The OSDU record in its original state
     * @param {OsduR2BaseService} OsduR2BaseService - The OSDU service in order to perform any additional operations
     * @returns {Object} The transformed OSDU record
     */
    /**
     * Execute the task, querying and updating in batches based on the set query parameters and the provided transform function
     * @param {TransformFunction} transform_function - Function that accepts an OSDU record and the OSDU service and asynchronously returns the transformed record
     * @returns {Object} A summary of the performed task, including a list of the ids of transformed records `transformedRecords`, the total count of records for the query `totalCount`, the number of batches that succeeded `batches`, the last cursor used (if an error was encountered) `lastCursor`, and the error that was thrown (if encountered) `error`
     */
    async execute(transform_function) {
        var output = {
            transformedRecords: [],
            totalCount: 0,
            batches: 0,
            error: undefined,
            lastCursor: undefined
        };
        var response;
        var cursor = undefined;
        try {
            do {
                var transformedRecords = [];
                response = await this._service.QueryService.queryWithPaging(this._queryParams, cursor);
                output.totalCount = response.totalCount;
                const updatedRecords = [];
                for (let index = 0; index < response.results.length; index++) {
                    updatedRecords.push(
                        await transform_function(
                            response.results[index], 
                            this._service
                        )
                    );
                    transformedRecords.push(response.results[index].id);
                }
                await this._service.StorageService.storeRecords(updatedRecords);
                cursor = response.cursor;
                output.batches++;
                output.transformedRecords.push(...transformedRecords);
            } while (cursor);
        }
        catch (err) {
            output.error = err;
            output.lastCursor = cursor;
        }
        return output;
    }
}

module.exports = OsduR2UpdateByQueryTask;