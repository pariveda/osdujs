class OsduR2BaseService {
    constructor(osdu_client, data_partition) {
        if (!osdu_client) {
            throw new Error(`Must provide an OSDU client to power the OSDU service`);
        }
        this._client = osdu_client;
        this._dataPartition = data_partition;
    }
}

module.exports.OsduR2BaseService = OsduR2BaseService;