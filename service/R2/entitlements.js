const { OsduR2BaseService } = require('./base');

class OsduR2EntitlementsService extends OsduR2BaseService {
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }
    
    // TODO: Implement Entitlements
}

module.exports.OsduR2EntitlementsService = OsduR2EntitlementsService;