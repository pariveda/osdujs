export = OsduBaseTask;
/**
 * Abstract class that provides the common bones for OSDU common task patterns
 * - Provides the framework for accepting an OSDU service
 * - Agnostic to hosting framework (AWS/Azure/GCP/etc.) of the OSDU API
 * @class
 * @abstract
 * @category Tasks
 */
declare class OsduBaseTask {
    /**
     * @constructor
     * @param {OsduBaseService} osdu_service - An implementation of the OSDU service class to broker communication with the OSDU API services
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_service: any, data_partition: string);
    _service: any;
    _dataPartition: string;
}
