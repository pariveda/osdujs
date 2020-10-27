export = OsduR2QueryService;
declare const OsduR2QueryService_base: typeof import("./base");
/**
 * Class that provides named access to OSDU R2 Query endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/tutorial/SearchService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/api/search_openapi.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2QueryService extends OsduR2QueryService_base {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    /**
     * Results for particular aggregation grouping within the given query
     * @typedef {Object} OsduAggregationItem
     * @property {string} key - Identifier for the aggregation
     * @property {number} count - Number of items that match this aggregation key
     */
    /**
     * Response to OSDU query
     * @typedef {Object} OsduQueryResults
     * @property {OsduRecord[]} results - List of query result records
     * @property {OsduAggregationItem[]|null} aggregations - List of aggregated records
     * @property {number} totalCount - Total number of records matched by the query
     * @property {string} [cursor] - Page marker to resume query at next page
     */
    /**
     * Get OSDU records that match the given query constraints
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduQueryResults} The API Response
     */
    query(query_params: any): {
        /**
         * - List of query result records
         */
        results: OsduRecord[];
        /**
         * - List of aggregated records
         */
        aggregations: {
            /**
             * - Identifier for the aggregation
             */
            key: string;
            /**
             * - Number of items that match this aggregation key
             */
            count: number;
        }[];
        /**
         * - Total number of records matched by the query
         */
        totalCount: number;
        /**
         * - Page marker to resume query at next page
         */
        cursor?: string;
    };
    /**
     * Get OSDU records that match the given query constraints
     * - Allow specification of a cursor for paged queries
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduQueryResults} The API Response
     */
    queryWithPaging(query_params: any, cursor: any): {
        /**
         * - List of query result records
         */
        results: OsduRecord[];
        /**
         * - List of aggregated records
         */
        aggregations: {
            /**
             * - Identifier for the aggregation
             */
            key: string;
            /**
             * - Number of items that match this aggregation key
             */
            count: number;
        }[];
        /**
         * - Total number of records matched by the query
         */
        totalCount: number;
        /**
         * - Page marker to resume query at next page
         */
        cursor?: string;
    };
    /**
     * Get all OSDU records that match the given query constraints
     * - Will page internally and aggregate results until no more pages are found
     * - Note that this may make multiple network requests if multiple pages are found
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {OsduQueryResults} The API Response
     */
    queryAll(query_params: any): {
        /**
         * - List of query result records
         */
        results: OsduRecord[];
        /**
         * - List of aggregated records
         */
        aggregations: {
            /**
             * - Identifier for the aggregation
             */
            key: string;
            /**
             * - Number of items that match this aggregation key
             */
            count: number;
        }[];
        /**
         * - Total number of records matched by the query
         */
        totalCount: number;
        /**
         * - Page marker to resume query at next page
         */
        cursor?: string;
    };
}
