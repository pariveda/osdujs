const { OsduR2BaseService } = require('./base');

class OsduR2StorageService extends OsduR2BaseService {
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }

    // Records
    async getRecords(record_ids) {
        return await this._client.post(`/api/storage/v2/query/records`, {
            records: record_ids
        }, this._dataPartition)
    }
    async getRecord(record_id) {
        return await this._client.get(`/api/storage/v2/records/${record_id}`, this._dataPartition);
    }
    async getRecordVersions(record_id) {
        return await this._client.get(`/api/storage/v2/records/versions/${record_id}`, this._dataPartition);
    }
    async storeRecords(records) {
        return await this._client.post(`/api/storage/v2/records`, records, this._dataPartition)
    }
    async deleteRecord(record_id) {
        return await this._client.delete(`/api/storage/v2/records/${record_id}`, this._dataPartition);
    }

    // Manifest
    async ingestManifest(manifest) {
        return await this._client.post(`/api/storage/v2/manifest`, manifest, this._dataPartition);
    }

    // Schemas
    async queryAllKinds() {
        return await this._client.get(`/api/storage/v2/query/kinds`, this._dataPartition);
    }
    async getSchema(kind) {
        return await this._client.get(`/api/storage/v2/schemas/${kind}`, this._dataPartition);
    }
    async createSchema(kind, schema, ext) {
        return await this._client.post(`/api/storage/v2/schemas`, { kind, schema, ext }, this._dataPartition);
    }
    async deleteSchema(kind) {
        return await this._client.delete(`/api/storage/v2/schemas/${kind}`, this._dataPartition);
    }
}

module.exports.OsduR2StorageService = OsduR2StorageService;