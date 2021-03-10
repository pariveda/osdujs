const OsduBaseService = require('../base');

/**
 * Class that provides named access to OSDU V2 Storage endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/tutorial/StorageService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/api/storage_openapi.yaml}
 * @class
 * @category Services
 * @subcategory Storage
 */
class OsduV2StorageService extends OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }

    // Records
    /**
     * Get OSDU records for the specified ids
     * @param {string[]} record_ids - Record identifiers of the OSDU records to retrieve
     * @returns {Object} The API Response
     */
    async getRecords(record_ids) {
        return await this._client.post(`/api/storage/v2/query/records`, {
            records: record_ids
        }, this._dataPartition)
    }
    /**
     * Get OSDU records for the specified id
     * @param {string} record_id - Record identifier of the OSDU record to retrieve
     * @returns {Object} The API Response
     */
    async getRecord(record_id) {
        return await this._client.get(`/api/storage/v2/records/${record_id}`, this._dataPartition);
    }
    /**
     * Get OSDU record versions for the specified id
     * @param {string} record_id - Record identifier of the OSDU record to retrieve version data
     * @returns {Object} The API Response
     */
    async getRecordVersions(record_id) {
        return await this._client.get(`/api/storage/v2/records/versions/${record_id}`, this._dataPartition);
    }
    /**
     * Get OSDU record for the specified id at the specified version
     * @param {string} record_id - Record identifier of the OSDU record to retrieve
     * @param {string} version - Version id to retrieve
     * @returns {Object} The API Response
     */
    async getRecordVersion(record_id, version) {
        return await this._client.get(`/api/storage/v2/records/${record_id}/${version}`, this._dataPartition);
    }
    /**
     * Upsert the provided records
     * @param {Object[]} records - List of JSON representations of the records to upsert
     * @returns {Object} The API Response
     */
    async storeRecords(records) {
        return await this._client.put(`/api/storage/v2/records`, records, this._dataPartition)
    }
    /**
     * Delete OSDU record
     * @param {string} record_id - Record identifier of the OSDU record to delete
     * @returns {Object} The API Response
     */
    async deleteRecord(record_id) {
        return await this._client.delete(`/api/storage/v2/records/${record_id}`, this._dataPartition);
    }

    // Manifest
    /**
     * Ingest a manifest containing linked records
     * @param {Object} manifest - JSON representation of the manifest to process and ingest
     * @returns {Object} The API Response
     */
    async ingestManifest(manifest) {
        return await this._client.post(`/api/storage/v2/manifest`, manifest, this._dataPartition);
    }

    // Schemas
    /**
     * Retrieve a list of all supported record kinds
     * @returns {Object} The API Response
     */
    async queryAllKinds() {
        return await this._client.get(`/api/storage/v2/query/kinds`, this._dataPartition);
    }
    /**
     * Get OSDU schema for a given kind
     * @param {string} kind - Name of the kind to retrieve the schema
     * @returns {Object} The API Response
     */
    async getSchema(kind) {
        return await this._client.get(`/api/storage/v2/schemas/${kind}`, this._dataPartition);
    }
    /**
     * Create a new schema to register a new kind
     * @param {string} kind - Name of the new kind to create
     * @param {Object} schema - JSON representation of the kind's schema
     * @param {Object} ext - JSON representation of the schema extensions
     * @returns {Object} The API Response
     */
    async createSchema(kind, schema, ext) {
        return await this._client.post(`/api/storage/v2/schemas`, { kind, schema, ext }, this._dataPartition);
    }
    /**
     * Delete a kind and it's associated schema
     * @param {string} kind - Name of the kind to delete
     * @returns {Object} The API Response
     */
    async deleteSchema(kind) {
        return await this._client.delete(`/api/storage/v2/schemas/${kind}`, this._dataPartition);
    }
}

module.exports = OsduV2StorageService;