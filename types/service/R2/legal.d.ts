export = OsduR2LegalService;
/**
 * Class that provides named access to OSDU R2 Legal endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/tutorial/ComplianceService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/api/compliance_openapi.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2LegalService extends OsduR2BaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    /**
     * Get all supported legal tags in the given data partition
     * @returns {Object} The API Response
     */
    listLegalTags(): any;
    /**
     * Get requested legal tags in the given data partition
     * @param {string[]} names - The list of tag names you wish to retrieve
     * @returns {Object} The API Response
     */
    getLegalTags(names: string[]): any;
    /**
     * Validate requested legal tags in the given data partition
     * @param {string[]} names - The list of tag names you wish to validate
     * @returns {Object} The API Response
     */
    validateLegalTags(names: string[]): any;
    /**
     * Retrieve a specific legal tag in the given data partition
     * @param {string} name - The name of the tag you wish to retrieve
     * @returns {Object} The API Response
     */
    getLegalTag(name: string): any;
    /**
     * List the allowed legal tag properties and values in the given data partition
     * @returns {Object} The API Response
     */
    getLegalTagProperties(): any;
    /**
     * Create a new legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to create
     * @returns {Object} The API Response
     */
    createLegalTag(tagData: any): any;
    /**
     * Update an existing legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to update
     * @returns {Object} The API Response
     */
    updateLegalTag(tagData: any): any;
    /**
     * Delete an existing legal tag in the given data partition
     * @param {string} tagData - The name of the tag you wish to delete
     * @returns {Object} The API Response
     */
    deleteLegalTag(name: any): any;
}
import OsduR2BaseService = require("./base");
