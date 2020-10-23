const { OsduR2BaseService } = require('./base');

/**
 * Class that provides named access to OSDU R2 Entitlements endpoints
 * - Not yet supported
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/Services/Entitlements/Tutorial}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/Services/Entitlements/Swagger}
 * @class
 * @category Services
 * @subcategory R2
 */
class OsduR2EntitlementsService extends OsduR2BaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }
    
    // TODO: Implement Entitlements
}

module.exports.OsduR2EntitlementsService = OsduR2EntitlementsService;