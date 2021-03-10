const OsduBaseService = require('../base');

/**
 * Class that provides named access to OSDU V2 Delivery endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/OSDU-(C)/Design-and-Implementation/Ingestion-and-Enrichment-Detail/R2-Delivery}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/delivery/-/blob/master/docs/api/delivery.yaml}
 * @class
 * @category Services
 * @subcategory Delivery
 */
class OsduV2DeliveryService extends OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }
    
    /**
     * Get signed urls for the data file underlying the specified OSDU File records
     * @param {string[]} srns - SRN identifiers of the files for which you wish to retrieve signed urls
     * @returns {Object} The API Response
     */
    async getSignedUrls(srns) {
        return await this._client.post(`/api/delivery/v2/GetFileSignedUrl`, { srns }, this._dataPartition);
    }
}

module.exports = OsduV2DeliveryService;