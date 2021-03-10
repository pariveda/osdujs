export = OsduDeliveryService;
/**
 * Class that provides named access to OSDU Delivery endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/OSDU-(C)/Design-and-Implementation/Ingestion-and-Enrichment-Detail/R2-Delivery}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/delivery/-/blob/master/docs/api/delivery.yaml}
 * @class
 * @category Services
 * @subcategory Delivery
 */
declare class OsduDeliveryService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    V2: OsduV2DeliveryService;
}
import OsduV2DeliveryService = require("./v2");
