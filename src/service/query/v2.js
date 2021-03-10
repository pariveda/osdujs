const OsduBaseService = require('../base');

/**
 * Class that provides named access to OSDU V2 Query endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/tutorial/SearchService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/api/search_openapi.yaml}
 * @class
 * @category Services
 * @subcategory Query
 */
class OsduV2QueryService extends OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }

    /**
     * Get OSDU records that match the given query constraints
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {Object} The API Response
     */
    async query(query_params) {
        if (!query_params.offset) {
            query_params.offset = 0;
        }
        return await this._client.post(`/api/search/v2/query`, query_params, this._dataPartition);
    }
    /**
     * Get OSDU records that match the given query constraints
     * - Allow specification of a cursor for paged queries
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {Object} The API Response
     */
    async queryWithPaging(query_params, cursor) {
        if (!query_params.limit) {
            query_params.limit = 1000;
        }
        query_params.offset = undefined;
        if (cursor) {
            query_params.cursor = cursor;
        }
        return await this._client.post(`/api/search/v2/query_with_cursor`, query_params, this._dataPartition);
    }
    /**
     * Get all OSDU records that match the given query constraints
     * - Will page internally and aggregate results until no more pages are found
     * - Note that this may make multiple network requests if multiple pages are found
     * @param {Object} query_params - Query parameters built using the [OsduQueryBuilder]{@link OsduQueryBuilder}
     * @returns {Object} The API Response
     */
    async queryAll(query_params) {
        var output = {
            results: [],
            totalCount: 0,
            batches: 0
        };
        var response;
        var cursor = undefined;
        do {
            response = await this.queryWithPaging(query_params, cursor);
            output.results.push(...response.results);
            output.totalCount = response.totalCount;
            output.batches++;
            cursor = response.cursor;
        } while (cursor);
        return output;
    }
}

module.exports = OsduV2QueryService;