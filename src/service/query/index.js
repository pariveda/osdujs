const OsduV2QueryService = require('./v2');

/**
 * Class that provides named access to OSDU Query endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/tutorial/SearchService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/search-service/-/blob/master/docs/api/search_openapi.yaml}
 * @class
 * @category Services
 * @subcategory Query
 */
class OsduQueryService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        this.V2 = new OsduV2QueryService(osdu_client, data_partition);
    }
}

module.exports = OsduQueryService;