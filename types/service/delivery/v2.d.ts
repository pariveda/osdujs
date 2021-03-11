export = OsduV2DeliveryService;
/**
 * Class that provides named access to OSDU V2 Delivery endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/OSDU-(C)/Design-and-Implementation/Ingestion-and-Enrichment-Detail/R2-Delivery}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/delivery/-/blob/master/docs/api/delivery.yaml}
 * @class
 * @category Services
 * @subcategory Delivery
 */
declare class OsduV2DeliveryService extends OsduBaseService {
    /**
     * Get signed urls for the data file underlying the specified OSDU File records
     * @param {string[]} srns - SRN identifiers of the files for which you wish to retrieve signed urls
     * @returns {Object} The API Response
     */
    getSignedUrls(srns: string[]): any;
}
import OsduBaseService = require("../base");
