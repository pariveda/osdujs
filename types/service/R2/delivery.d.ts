export = OsduR2DeliveryService;
/**
 * Class that provides named access to OSDU R2 Delivery endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/OSDU-(C)/Design-and-Implementation/Ingestion-and-Enrichment-Detail/R2-Delivery}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/delivery/-/blob/master/docs/api/delivery.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2DeliveryService extends OsduR2BaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    /**
     * Get signed urls for the data file underlying the specified OSDU File records
     * @param {string[]} srns - SRN identifiers of the files for which you wish to retrieve signed urls
     * @returns {Object} The API Response
     */
    getSignedUrls(srns: string[]): any;
}
import OsduR2BaseService = require("./base");
