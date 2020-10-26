export = OsduR2Service;
/**
 * Housing class that provides named access to all OSDU R2 endpoints via child services
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2Service {
    /**
     * Sets up the sub-component services
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    _dataPartition: string;
    DeliveryService: import("./delivery");
    EntitlementsService: import("./entitlements");
    LegalService: import("./legal");
    QueryService: import("./query");
    StorageService: import("./storage");
}
