const { OsduR2BaseService } = require('./base');

class OsduR2QueryService extends OsduR2BaseService {
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }

    async query(query_params) {
        if (!query_params.offset) {
            query_params.offset = 0;
        }
        return await this._client.post(`/api/search/v2/query`, query_params, this._dataPartition);
    }
    async queryAll(query_params, batch_size) {
        var batchSize = 100;
        if (batch_size > 0) {
            batchSize = batch_size;
        }
        query_params.offset = 0;
        query_params.limit = batchSize;
        var output = {
            results: [],
            totalCount: 0,
            batches: 0
        };
        var response;
        do {
            response = await this._client.post(`/api/search/v2/query`, query_params, this._dataPartition);
            output.results.push(...response.results);
            output.totalCount = response.totalCount;
            output.batches++;
            query_params.offset += batchSize;
        } while (response.results.length == batchSize);
        return output;
    }
}

module.exports.OsduR2QueryService = OsduR2QueryService;