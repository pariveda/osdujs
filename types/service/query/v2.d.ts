export = OsduV2QueryService;
/**
 * Class that provides named access to OSDU V2 Query endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/tutorial/SearchService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/api/search_openapi.yaml}
 * @class
 * @category Services
 * @subcategory Query
 */
declare class OsduV2QueryService extends OsduBaseService {
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
import OsduBaseService = require("../base");
