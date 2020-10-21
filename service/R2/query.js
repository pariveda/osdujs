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
    async queryWithPaging(query_params, cursor) {
        if (!query_params.limit) {
            query_params.limit = 1000;
        }
        query_params.offset = undefined;
        if (cursor) {
            query_params.cursor = cursor;
        }
        return await this._client.post(`/api/search/v2/query_with_cursor`, query_params, this._dataPartition);
    }
    async queryAll(query_params) {
        var output = {
            results: [],
            totalCount: 0,
            batches: 0
        };
        var response;
        var cursor = undefined;
        do {
            response = await this.queryWithPaging(query_params, cursor);
            output.results.push(...response.results);
            output.totalCount = response.totalCount;
            output.batches++;
            cursor = response.cursor;
        } while (cursor);
        return output;
    }
}

module.exports.OsduR2QueryService = OsduR2QueryService;