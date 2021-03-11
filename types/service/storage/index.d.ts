export = OsduStorageService;
/**
 * Class that provides named access to OSDU Storage endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/tutorial/StorageService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/api/storage_openapi.yaml}
 * @class
 * @category Services
 * @subcategory Storage
 */
declare class OsduStorageService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    V2: OsduV2StorageService;
}
import OsduV2StorageService = require("./v2");
