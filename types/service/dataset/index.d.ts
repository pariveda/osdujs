export = OsduDatasetService;
/**
 * Class that provides named access to OSDU Dataset endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * @class
 * @category Services
 * @subcategory Dataset
 */
declare class OsduDatasetService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    V1: OsduV1DatasetService;
}
import OsduV1DatasetService = require("./v1");
