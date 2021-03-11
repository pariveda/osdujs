/**
 * Abstract class that provides the common bones for OSDU API services
 * - Provides the framework for accepting an OSDU client and setting a data partition
 * - Agnostic to hosting framework (AWS/Azure/GCP/etc.) of the OSDU API
 * @class
 * @abstract
 * @category Services
 */
class OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        if (!osdu_client) {
            throw new Error(`Must provide an OSDU client to power the OSDU service`);
        }
        this._client = osdu_client;
        this._dataPartition = data_partition;
    }
}

module.exports = OsduBaseService;