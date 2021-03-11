const OsduV1SchemaService = require('./v1');

/**
 * Class that provides named access to OSDU Schema endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * @class
 * @category Services
 * @subcategory Schema
 */
class OsduSchemaService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        this.V1 = new OsduV1SchemaService(osdu_client, data_partition);
    }
}

module.exports = OsduSchemaService;