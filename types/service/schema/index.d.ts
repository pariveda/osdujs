export = OsduSchemaService;
/**
 * Class that provides named access to OSDU Schema endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * @class
 * @category Services
 * @subcategory Schema
 */
declare class OsduSchemaService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    V1: OsduV1SchemaService;
}
import OsduV1SchemaService = require("./v1");
