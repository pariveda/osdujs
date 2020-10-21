const { OsduR2BaseService } = require('./base');

class OsduR2DeliveryService extends OsduR2BaseService {
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }
    
    async getSignedUrls(srns) {
        return await this._client.post(`/api/delivery/v2/GetFileSignedUrl`, { srns }, this._dataPartition);
    }
}

module.exports.OsduR2DeliveryService = OsduR2DeliveryService;