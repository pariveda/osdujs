export = OsduR2UpdateByQueryTask;
/**
 * Simple task to update records in batches based on a query and a transform functions
 * @class
 * @category Tasks
 * @subcategory R2
 */
declare class OsduR2UpdateByQueryTask extends OsduBaseTask {
    _queryParams: any;
    /**
     * Set the query parameters to be used for batched query requests
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduR2UpdateByQueryTask} Itself to allow chaining
     */
    setQuery(query_params: any): OsduR2UpdateByQueryTask;
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
    execute(transform_function: TransformFunction): any;
}
declare namespace OsduR2UpdateByQueryTask {
    export { TransformFunction };
}
import OsduBaseTask = require("../base");
/**
 * Function that accepts an OSDU record and the OSDU service and asynchronously returns the transformed record
 */
type TransformFunction = (osduRecord: any, OsduR2BaseService: any) => any;
