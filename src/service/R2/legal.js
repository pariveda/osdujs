const OsduR2BaseService = require('./base');

/**
 * Class that provides named access to OSDU R2 Legal endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/tutorial/ComplianceService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/api/compliance_openapi.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
class OsduR2LegalService extends OsduR2BaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }

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
    
    // TODO: Define response types
    /**
     * Get all supported legal tags in the given data partition
     * @returns {LegalTagList} The API Response
     */
    async listLegalTags() {
        return await this._client.get(`/api/legal/v1/legaltags`, this._dataPartition);
    }
    /**
     * Get requested legal tags in the given data partition
     * @param {string[]} names - The list of tag names you wish to retrieve
     * @returns {LegalTagList} The API Response
     */
    async getLegalTags(names) {
        return await this._client.post(`/api/legal/v1/legaltags:batchRetrieve`, { names }, this._dataPartition);
    }
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
    async validateLegalTags(names) {
        return await this._client.post(`/api/legal/v1/legaltags:validate`, { names }, this._dataPartition);
    }
    /**
     * Retrieve a specific legal tag in the given data partition
     * @param {string} name - The name of the tag you wish to retrieve
     * @returns {LegalTag} The API Response
     */
    async getLegalTag(name) {
        return await this._client.get(`/api/legal/v1/legaltags/${name}`, this._dataPartition);
    }
    /**
     * List the allowed legal tag properties and values in the given data partition
     * @returns {Object.<string,Object.<string,string>|string>} The API Response
     */
    async getLegalTagProperties() {
        return await this._client.get(`/api/legal/v1/legaltags:properties`, this._dataPartition);
    }
    /**
     * Create a new legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to create
     * @returns {LegalTag} The API Response
     */
    async createLegalTag(tagData) {
        return await this._client.get(`/api/legal/v1/legaltags`, tagData, this._dataPartition);
    }
    /**
     * Update an existing legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to update
     * @returns {LegalTag} The API Response
     */
    async updateLegalTag(tagData) {
        return await this._client.put(`/api/legal/v1/legaltags`, tagData, this._dataPartition);
    }
    /**
     * Delete an existing legal tag in the given data partition
     * @param {string} tagData - The name of the tag you wish to delete
     * @returns {number} The API Response
     */
    async deleteLegalTag(name) {
        return await this._client.delete(`/api/legal/v1/legaltags/${name}`, this._dataPartition);
    }
}

module.exports = OsduR2LegalService;