export = OsduR2QueryService;
/**
 * Class that provides named access to OSDU R2 Query endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/tutorial/SearchService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/api/search_openapi.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2QueryService extends OsduR2BaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    /**
     * Get OSDU records that match the given query constraints
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {Object} The API Response
     */
    query(query_params: any): any;
    /**
     * Get OSDU records that match the given query constraints
     * - Allow specification of a cursor for paged queries
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {Object} The API Response
     */
    queryWithPaging(query_params: any, cursor: any): any;
    /**
     * Get all OSDU records that match the given query constraints
     * - Will page internally and aggregate results until no more pages are found
     * - Note that this may make multiple network requests if multiple pages are found
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {Object} The API Response
     */
    queryAll(query_params: any): any;
}
import OsduR2BaseService = require("./base");
