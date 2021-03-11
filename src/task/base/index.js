/**
 * Abstract class that provides the common bones for OSDU common task patterns
 * - Provides the framework for accepting an OSDU service 
 * - Agnostic to hosting framework (AWS/Azure/GCP/etc.) of the OSDU API
 * @class
 * @abstract
 * @category Tasks
 */
class OsduBaseTask {
    /**
     * @constructor
     * @param {OsduBaseService} osdu_service - An implementation of the OSDU service class to broker communication with the OSDU API services
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_service, data_partition) {
        if (!osdu_service) {
            throw new Error(`Must provide an OSDU service to power the OSDU task`);
        }
        this._service = osdu_service;
        this._dataPartition = data_partition;
    }
}

module.exports = OsduBaseTask;