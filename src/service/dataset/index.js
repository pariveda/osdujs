const OsduV1DatasetService = require('./v1');

/**
 * Class that provides named access to OSDU Dataset endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * @class
 * @category Services
 * @subcategory Dataset
 */
class OsduDatasetService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        this.V1 = new OsduV1DatasetService(osdu_client, data_partition);
    }
}

module.exports = OsduDatasetService;