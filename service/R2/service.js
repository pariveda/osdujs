const { OsduR2DeliveryService } = require('./delivery');
const { OsduR2EntitlementsService }  = require('./entitlements');
const { OsduR2LegalService } = require('./legal');
const { OsduR2QueryService } = require('./query');
const { OsduR2StorageService } = require('./storage');

class OsduR2Service {
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