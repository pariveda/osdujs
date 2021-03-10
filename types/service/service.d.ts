export = OsduService;
/**
 * Housing class that provides named access to all OSDU endpoints via child services
 * @class
 * @category Services
 */
declare class OsduService {
    /**
     * Sets up the sub-component services
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    _dataPartition: string;
    DeliveryService: OsduDeliveryService;
    EntitlementsService: OsduEntitlementsService;
    LegalService: OsduLegalService;
    QueryService: OsduQueryService;
    StorageService: OsduStorageService;
}
import OsduDeliveryService = require("./delivery");
import OsduEntitlementsService = require("./entitlements");
import OsduLegalService = require("./legal");
import OsduQueryService = require("./query");
import OsduStorageService = require("./storage");
