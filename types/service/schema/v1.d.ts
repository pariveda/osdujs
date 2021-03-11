export = OsduV1SchemaService;
/**
 * Class that provides named access to OSDU V1 Schema endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/schema-service/-/blob/master/docs/api/schema.yaml}
 * @class
 * @category Services
 * @subcategory Schema
 */
declare class OsduV1SchemaService extends OsduBaseService {
    apiEndpoint: string;
    /**
     * Adds a schema to the schema repository
     * @param {Object} schema - The schema to create
     * @param {Object} schemaInfo - The schema info including the schema identity that uniquely identifies the schema and the status of the schema
     * @returns {Object} The API Response
     */
    createSchema(schema: any, schemaInfo: any): any;
    /**
     * Updates a schema in the schema repository
     * The schema must be in DEVELOPMENT status
     * @param {Object} schema - The schema to create
     * @param {Object} schemaInfo - The schema info including the schema identity that uniquely identifies the schema and the status of the schema
     * @returns {Object} The API Response
     */
    updateSchema(schema: any, schemaInfo: any): any;
    /**
     * Find a schema in the schema repository
     * @param {String} query_params - Query parameters built using the [OsduSchemaQueryBuilder]{@link OsduSchemaQueryBuilder}
     * @returns {Object} The API Response
     */
    listSchemasByFilter(query_params: string): any;
    /**
     * Get a schema in the schema repository
     * @param {String} schemaId - The system id of the schema
     * @returns {Object} The API Response
     */
    getSchema(schemaId: string): any;
}
import OsduBaseService = require("../base");
