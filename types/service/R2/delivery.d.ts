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
     * Individual processed file
     * @typedef {Object} ProcessedFile
     * @property {string} signedUrl - The signed url to retrieve this file
     * @property {string} unsignedUrl - The storage url for the file that does not have presigned permissions
     * @property {string} kind - The kind for this file
     */
    /**
     * Response to delivery of requested files
     * @typedef {Object} SignedUrls
     * @property {Object.<string,ProcessedFile>} processed - Dictionary of processed file
     * @property {string[]} unprocessed - List of srns for the files that have not been processed
     */
    /**
     * Get signed urls for the data file underlying the specified OSDU File records
     * @param {string[]} srns - SRN identifiers of the files for which you wish to retrieve signed urls
     * @returns {SignedUrls} The API Response
     */
    getSignedUrls(srns: string[]): {
        /**
         * - Dictionary of processed file
         */
        processed: {
            [x: string]: {
                /**
                 * - The signed url to retrieve this file
                 */
                signedUrl: string;
                /**
                 * - The storage url for the file that does not have presigned permissions
                 */
                unsignedUrl: string;
                /**
                 * - The kind for this file
                 */
                kind: string;
            };
        };
        /**
         * - List of srns for the files that have not been processed
         */
        unprocessed: string[];
    };
}
import OsduR2BaseService = require("./base");
