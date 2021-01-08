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
    DeliveryService: OsduR2DeliveryService;
    EntitlementsService: OsduR2EntitlementsService;
    LegalService: OsduR2LegalService;
    QueryService: OsduR2QueryService;
    StorageService: OsduR2StorageService;
}
import OsduR2DeliveryService = require("./delivery");
import OsduR2EntitlementsService = require("./entitlements");
import OsduR2LegalService = require("./legal");
import OsduR2QueryService = require("./query");
import OsduR2StorageService = require("./storage");
