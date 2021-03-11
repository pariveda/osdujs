const OsduDeliveryService = require('./delivery');
const OsduEntitlementsService  = require('./entitlements');
const OsduLegalService = require('./legal');
const OsduQueryService = require('./query');
const OsduStorageService = require('./storage');
const OsduDatasetService = require('./dataset');
const OsduSchemaService = require('./schema');

/**
 * Housing class that provides named access to all OSDU endpoints via child services
 * @class
 * @category Services
 */
class OsduService {
    /**
     * Sets up the sub-component services
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        this._dataPartition = data_partition;
        this.DeliveryService = new OsduDeliveryService(osdu_client, data_partition);
        this.EntitlementsService = new OsduEntitlementsService(osdu_client, data_partition);
        this.LegalService = new OsduLegalService(osdu_client, data_partition);
        this.QueryService = new OsduQueryService(osdu_client, data_partition);
        this.StorageService = new OsduStorageService(osdu_client, data_partition);
        this.DatasetService = new OsduDatasetService(osdu_client, data_partition);
        this.SchemaService = new OsduSchemaService(osdu_client, data_partition);
    }
}

module.exports = OsduService;