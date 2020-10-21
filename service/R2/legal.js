const { OsduR2BaseService } = require('./base');

class OsduR2LegalService extends OsduR2BaseService {
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }
    
    async listLegalTags() {
        return await this._client.get(`/api/legal/v1/legaltags`, this._dataPartition);
    }
    async getLegalTags(names) {
        return await this._client.post(`/api/legal/v1/legaltags:batchRetrieve`, { names }, this._dataPartition);
    }
    async validateLegalTags(names) {
        return await this._client.post(`/api/legal/v1/legaltags:validate`, { names }, this._dataPartition);
    }
    async getLegalTag(name) {
        return await this._client.get(`/api/legal/v1/legaltags/${name}`, this._dataPartition);
    }
    async getLegalTagProperties() {
        return await this._client.get(`/api/legal/v1/legaltags:properties`, this._dataPartition);
    }
    async createLegalTag(tagData) {
        return await this._client.get(`/api/legal/v1/legaltags`, tagData, this._dataPartition);
    }
    async updateLegalTag(tagData) {
        return await this._client.put(`/api/legal/v1/legaltags`, tagData, this._dataPartition);
    }
    async deleteLegalTag(name) {
        return await this._client.delete(`/api/legal/v1/legaltags/${name}`, this._dataPartition);
    }
}

module.exports.OsduR2LegalService = OsduR2LegalService;