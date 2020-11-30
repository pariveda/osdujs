export = OsduR2UpdateByQueryTask;
/**
 * Simple task to update records in batches based on a query and a transform functions
 * @class
 * @category Tasks
 * @subcategory R2
 */
declare class OsduR2UpdateByQueryTask extends OsduR2BaseTask {
    /**
     * @constructor
     * @param {OsduR2BaseService} osdu_service - An implementation of the OSDU service class to broker communication with the OSDU API services
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_service: any, data_partition: string);
    _queryParams: any;
    /**
     * Set the query parameters to be used for batched query requests
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduR2UpdateByQueryTask} Itself to allow chaining
     */
    setQuery(query_params: any): OsduR2UpdateByQueryTask;
    /**
     * Execute the task, querying and updating in batches based on the set query parameters and the provided transform function
     * @param {Function<Object, OsduR2BaseService, Promise<Object>>} transform_function - Function that accepts an OSDU record and the OSDU service and asynchronously returns the transformed record
     * @returns {Object} A summary of the performed task, including a list of the ids of transformed records `transformedRecords`, the total count of records for the query `totalCount`, the number of batches that succeeded `batches`, the last cursor used (if an error was encountered) `lastCursor`, and the error that was thrown (if encountered) `error`
     */
    execute(transform_function: Function): any;
}
import OsduR2BaseTask = require("./base");
