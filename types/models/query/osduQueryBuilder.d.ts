export = OsduQueryBuilder;
/**
 * Class to build OSDU query bodies with friendly names for each available option
 * - Note that querys built with this builder must at minimum specify the [kind]{@link OsduQueryBuilder#kind}
 * - Follows the [OSDU Query Syntax]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/OSDU-Query-Syntax}
 *
 * @class
 * @category Models
 * @subcategory Query
 */
declare class OsduQueryBuilder {
    _kind: string;
    /**
     * Set the OSDU kind to filter the scope of the search.
     * - Accepts wildcards `*` within kind sections. (I.E. `*:osdu:*:0.2.0`)
     * @param {string} kind - The OSDU kind with which to filter the search
     */
    kind(kind: string): OsduQueryBuilder;
    /**
     * Set the OSDU compliant query expression to narrow the search results
     * - OSDU query syntax can be found in [OSDU documentation here]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/OSDU-Query-Syntax}
     * - Note that the passed in expression must be an instance of the [Osdu Query Expression class]{@link OsduQueryExpression}
     * @param {OsduQueryExpression} query_expression - The query expression used to narrow search results based on the available OSDU data
     */
    query(query_expression: OsduQueryExpression): OsduQueryBuilder;
    _query: string;
    /**
     * Set the spacial filter on the OSDU query
     * - Not yet supported.
     * @throws Error
     * @param {undefined} spacial_filter
     */
    spacialFilter(spacial_filter: undefined): void;
    /**
     * Set the offset value representing how many records should be skipped before collecting records to return
     * @deprecated Recommended to use the [paged query]{@link OsduR2QueryService#queryWithPaging} rather than attempting to page via offset
     * @param {number} offset - The number of records (positive integer) to skip before collecting records to return
     */
    offset(offset: number): OsduQueryBuilder;
    _offset: number;
    /**
     * Set the maximum limit of records to return within the query results
     * - In paged queries, this sets the page size
     * @param {number} limit - The maximum number of records (positive integer) to return
     */
    limit(limit: number): OsduQueryBuilder;
    _limit: number;
    /**
     * Set the fields to include on the returned records
     * - Will include these fields where found, but does not guarantee that all records will contain these fields
     * @param {sring[]} returned_fields
     */
    returnedFields(returned_fields: any[]): OsduQueryBuilder;
    _returnedFields: any[];
    /**
     * Set the sort order of results prior to paging
     * @param {string[]} fields - The fields by which to order the results
     * @param {string[]} order - The order (Ascending/Descending) in which to sort the results on each field. Only accepts "ASC" and "DESC"
     */
    sort(fields: string[], order: string[]): OsduQueryBuilder;
    _sort: {
        fields: string[];
        order: string[];
    };
    /**
     * Set the field by which to aggregate results if aggregation is requested
     * @param {string} field - The OSDU record field by which to aggregate results
     */
    aggregateBy(field: string): OsduQueryBuilder;
    _aggregateBy: string;
    /**
     * Construct the query request body based on the attributes set
     * @returns {Object} The JSON object that is passed into the body of the OSDU API Search request
     */
    build(): any;
}
import OsduQueryExpression = require("./osduQueryExpression");
