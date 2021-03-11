const OsduBaseService = require('../base');

/**
 * Class that provides named access to OSDU V1 Schema endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * @class
 * @category Services
 * @subcategory Schema
 */
class OsduV1SchemaService extends OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
        this.apiEndpoint = `/api/schema-service/v1`;
    }

    /**
     * Adds a schema to the schema repository
     * @param {Object} schema - The schema to create
     * @param {Object} schemaInfo - The schema info including the schema identity that uniquely identifies the schema and the status of the schema
     * @returns {Object} The API Response
     */
    async createSchema(schema, schemaInfo) {
        var requestBody = {
            schema,
            schemaInfo
        };
        return await this._client.post(`${this.apiEndpoint}/schema`, requestBody, this._dataPartition)
    }

    /**
     * Updates a schema in the schema repository
     * The schema must be in DEVELOPMENT status
     * @param {Object} schema - The schema to create
     * @param {Object} schemaInfo - The schema info including the schema identity that uniquely identifies the schema and the status of the schema
     * @returns {Object} The API Response
     */
    async updateSchema(schema, schemaInfo) {
        var requestBody = {
            schema,
            schemaInfo
        };
        return await this._client.put(`${this.apiEndpoint}/schema`, requestBody, this._dataPartition)
    }

    /**
     * Find a schema in the schema repository
     * @param {String} query_params - Query parameters built using the [OsduSchemaQueryBuilder]{@link OsduSchemaQueryBuilder}
     * @returns {Object} The API Response
     */
    async listSchemasByFilter(query_params) {
        var endpoint = `${this.apiEndpoint}/schema`;
        if (query_params) {
            endpoint += query_params;
        }
        return await this._client.get(endpoint, this._dataPartition)
    }

    /**
     * Get a schema in the schema repository
     * @param {String} schemaId - The system id of the schema
     * @returns {Object} The API Response
     */
    async getSchema(schemaId) {
        return await this._client.get(`${this.apiEndpoint}/schema/${schemaId}`, this._dataPartition)
    }
}

module.exports = OsduV1SchemaService;