export = OsduR2EntitlementsService;
declare const OsduR2EntitlementsService_base: typeof import("./base");
/**
 * Class that provides named access to OSDU R2 Entitlements endpoints
 * - Not yet supported
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/Services/Entitlements/Tutorial}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/Services/Entitlements/Swagger}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2EntitlementsService extends OsduR2EntitlementsService_base {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
}
