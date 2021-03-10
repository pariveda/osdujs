export = OsduR2DeliverByQueryTask;
/**
 * Simple task to deliver records in batches based on a query and a transform functions
 * @class
 * @category Tasks
 * @subcategory R2
 */
declare class OsduR2DeliverByQueryTask extends OsduBaseTask {
    _queryParams: any;
    /**
     * Set the query parameters to be used for batched query requests. Query params must have a file kind
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduR2UpdateByQueryTask} Itself to allow chaining
     */
    setQuery(query_params: any): any;
    /**
     * Execute the task, querying and delivering in batches based on the set query parameters
     * @returns {Object} A summary of the performed task, including a map of delivered records `deliveredRecords`, the total count of records for the query `totalCount`, the number of batches that succeeded `batches`, the last cursor used (if an error was encountered) `lastCursor`, and the error that was thrown (if encountered) `error`
     */
    execute(): any;
}
import OsduBaseTask = require("../base");
