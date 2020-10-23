const { OsduR2DeliveryService } = require('./delivery');
const { OsduR2EntitlementsService }  = require('./entitlements');
const { OsduR2LegalService } = require('./legal');
const { OsduR2QueryService } = require('./query');
const { OsduR2StorageService } = require('./storage');

/**
 * Housing class that provides named access to all OSDU R2 endpoints via child services
 * @class
 * @category Services
 * @subcategory R2
 */
class OsduR2Service {
    /**
     * Sets up the sub-component services
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        this._dataPartition = data_partition;
        this.DeliveryService = new OsduR2DeliveryService(osdu_client, data_partition);
        this.EntitlementsService = new OsduR2EntitlementsService(osdu_client, data_partition);
        this.LegalService = new OsduR2LegalService(osdu_client, data_partition);
        this.QueryService = new OsduR2QueryService(osdu_client, data_partition);
        this.StorageService = new OsduR2StorageService(osdu_client, data_partition);
    }
}

module.exports.OsduR2Service = OsduR2Service;