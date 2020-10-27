export = OsduR2LegalService;
declare const OsduR2LegalService_base: typeof import("./base");
/**
 * Class that provides named access to OSDU R2 Legal endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/tutorial/ComplianceService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/api/compliance_openapi.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2LegalService extends OsduR2LegalService_base {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    /**
     * Legal tag properties
     * @typedef {Object} LegalTagProperties
     * @property {string[]} countryOfOrigin
     * @property {string} contractId
     * @property {string} expirationDate
     * @property {string} originator
     * @property {string} dataType
     * @property {string} securityClassification
     * @property {string} personalData
     * @property {string} exportClassification
     */
    /**
     * Legal tag model
     * @typedef {Object} LegalTag
     * @property {string} name - Name identifier for the legal tag
     * @property {string} description - Brief description of what the legal tag represents
     * @property {LegalTagProperties} properties - Properties of the legal tag
     */
    /**
     * Response to retieval of multiple legal tags
     * @typedef {Object} LegalTagList
     * @property {LegalTag[]} legalTags - List of available legal tags
     */
    /**
     * Get all supported legal tags in the given data partition
     * @returns {LegalTagList} The API Response
     */
    listLegalTags(): {
        /**
         * - List of available legal tags
         */
        legalTags: {
            /**
             * - Name identifier for the legal tag
             */
            name: string;
            /**
             * - Brief description of what the legal tag represents
             */
            description: string;
            /**
             * - Properties of the legal tag
             */
            properties: {
                countryOfOrigin: string[];
                contractId: string;
                expirationDate: string;
                originator: string;
                dataType: string;
                securityClassification: string;
                personalData: string;
                exportClassification: string;
            };
        }[];
    };
    /**
     * Get requested legal tags in the given data partition
     * @param {string[]} names - The list of tag names you wish to retrieve
     * @returns {LegalTagList} The API Response
     */
    getLegalTags(names: string[]): {
        /**
         * - List of available legal tags
         */
        legalTags: {
            /**
             * - Name identifier for the legal tag
             */
            name: string;
            /**
             * - Brief description of what the legal tag represents
             */
            description: string;
            /**
             * - Properties of the legal tag
             */
            properties: {
                countryOfOrigin: string[];
                contractId: string;
                expirationDate: string;
                originator: string;
                dataType: string;
                securityClassification: string;
                personalData: string;
                exportClassification: string;
            };
        }[];
    };
    /**
     * Legal tag model
     * @typedef {Object} InvalidLegalTag
     * @property {string} name - Name identifier for the legal tag
     * @property {string} reason - Reason why the legal tag is invalid
     */
    /**
     * Response to retieval of multiple legal tags
     * @typedef {Object} ValidateLegalTagsResponse
     * @property {InvalidLegalTag[]} invalidLegalTags - List of invalid legal tags
     */
    /**
     * Validate requested legal tags in the given data partition
     * @param {string[]} names - The list of tag names you wish to validate
     * @returns {ValidateLegalTagsResponse} The API Response
     */
    validateLegalTags(names: string[]): {
        /**
         * - List of invalid legal tags
         */
        invalidLegalTags: {
            /**
             * - Name identifier for the legal tag
             */
            name: string;
            /**
             * - Reason why the legal tag is invalid
             */
            reason: string;
        }[];
    };
    /**
     * Retrieve a specific legal tag in the given data partition
     * @param {string} name - The name of the tag you wish to retrieve
     * @returns {LegalTag} The API Response
     */
    getLegalTag(name: string): {
        /**
         * - Name identifier for the legal tag
         */
        name: string;
        /**
         * - Brief description of what the legal tag represents
         */
        description: string;
        /**
         * - Properties of the legal tag
         */
        properties: {
            countryOfOrigin: string[];
            contractId: string;
            expirationDate: string;
            originator: string;
            dataType: string;
            securityClassification: string;
            personalData: string;
            exportClassification: string;
        };
    };
    /**
     * List the allowed legal tag properties and values in the given data partition
     * @returns {Object.<string,Object.<string,string>|string>} The API Response
     */
    getLegalTagProperties(): {
        [x: string]: {
            [x: string]: string;
        } | string;
    };
    /**
     * Create a new legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to create
     * @returns {LegalTag} The API Response
     */
    createLegalTag(tagData: any): {
        /**
         * - Name identifier for the legal tag
         */
        name: string;
        /**
         * - Brief description of what the legal tag represents
         */
        description: string;
        /**
         * - Properties of the legal tag
         */
        properties: {
            countryOfOrigin: string[];
            contractId: string;
            expirationDate: string;
            originator: string;
            dataType: string;
            securityClassification: string;
            personalData: string;
            exportClassification: string;
        };
    };
    /**
     * Update an existing legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to update
     * @returns {LegalTag} The API Response
     */
    updateLegalTag(tagData: any): {
        /**
         * - Name identifier for the legal tag
         */
        name: string;
        /**
         * - Brief description of what the legal tag represents
         */
        description: string;
        /**
         * - Properties of the legal tag
         */
        properties: {
            countryOfOrigin: string[];
            contractId: string;
            expirationDate: string;
            originator: string;
            dataType: string;
            securityClassification: string;
            personalData: string;
            exportClassification: string;
        };
    };
    /**
     * Delete an existing legal tag in the given data partition
     * @param {string} tagData - The name of the tag you wish to delete
     * @returns {number} The API Response
     */
    deleteLegalTag(name: any): number;
}
