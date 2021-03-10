export = OsduBaseService;
/**
 * Abstract class that provides the common bones for OSDU API services
 * - Provides the framework for accepting an OSDU client and setting a data partition
 * - Agnostic to hosting framework (AWS/Azure/GCP/etc.) of the OSDU API
 * @class
 * @abstract
 * @category Services
 */
declare class OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    _client: any;
    _dataPartition: string;
}
