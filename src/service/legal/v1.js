const OsduBaseService = require('../base');

/**
 * Class that provides named access to OSDU V1 Legal endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/tutorial/ComplianceService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/api/compliance_openapi.yaml}
 * @class
 * @category Services
 * @subcategory Legal
 */
class OsduV1LegalService extends OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }
    
    // TODO: Define response types
    /**
     * Get all supported legal tags in the given data partition
     * @returns {Object} The API Response
     */
    async listLegalTags() {
        return await this._client.get(`/api/legal/v1/legaltags`, this._dataPartition);
    }
    /**
     * Get requested legal tags in the given data partition
     * @param {string[]} names - The list of tag names you wish to retrieve
     * @returns {Object} The API Response
     */
    async getLegalTags(names) {
        return await this._client.post(`/api/legal/v1/legaltags:batchRetrieve`, { names }, this._dataPartition);
    }
    /**
     * Validate requested legal tags in the given data partition
     * @param {string[]} names - The list of tag names you wish to validate
     * @returns {Object} The API Response
     */
    async validateLegalTags(names) {
        return await this._client.post(`/api/legal/v1/legaltags:validate`, { names }, this._dataPartition);
    }
    /**
     * Retrieve a specific legal tag in the given data partition
     * @param {string} name - The name of the tag you wish to retrieve
     * @returns {Object} The API Response
     */
    async getLegalTag(name) {
        return await this._client.get(`/api/legal/v1/legaltags/${name}`, this._dataPartition);
    }
    /**
     * List the allowed legal tag properties and values in the given data partition
     * @returns {Object} The API Response
     */
    async getLegalTagProperties() {
        return await this._client.get(`/api/legal/v1/legaltags:properties`, this._dataPartition);
    }
    /**
     * Create a new legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to create
     * @returns {Object} The API Response
     */
    async createLegalTag(tagData) {
        return await this._client.get(`/api/legal/v1/legaltags`, tagData, this._dataPartition);
    }
    /**
     * Update an existing legal tag in the given data partition
     * @param {Object} tagData - The JSON representation of the tag you wish to update
     * @returns {Object} The API Response
     */
    async updateLegalTag(tagData) {
        return await this._client.put(`/api/legal/v1/legaltags`, tagData, this._dataPartition);
    }
    /**
     * Delete an existing legal tag in the given data partition
     * @param {string} tagData - The name of the tag you wish to delete
     * @returns {Object} The API Response
     */
    async deleteLegalTag(name) {
        return await this._client.delete(`/api/legal/v1/legaltags/${name}`, this._dataPartition);
    }
}

module.exports = OsduV1LegalService;