export = OsduR2StorageService;
/**
 * Class that provides named access to OSDU R2 Storage endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/tutorial/StorageService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/api/storage_openapi.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2StorageService extends OsduR2BaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    /**
     * API response for GetRecords
     * @typedef {Object} OsduGetRecordsResponse
     * @property {OsduRecord[]} records - List of valid records
     * @property {string[]} invalidRecords - List of IDs for invalid records
     * @property {string[]} retryRecords - List of records that failed to retrieve and should be retried
     */
    /**
     * Get OSDU records for the specified ids
     * @param {string[]} record_ids - Record identifiers of the OSDU records to retrieve
     * @returns {OsduGetRecordsResponse} The API Response
     */
    getRecords(record_ids: string[]): {
        /**
         * - List of valid records
         */
        records: OsduRecord[];
        /**
         * - List of IDs for invalid records
         */
        invalidRecords: string[];
        /**
         * - List of records that failed to retrieve and should be retried
         */
        retryRecords: string[];
    };
    /**
     * Get OSDU records for the specified id
     * @param {string} record_id - Record identifier of the OSDU record to retrieve
     * @returns {OsduRecord} The API Response
     */
    getRecord(record_id: string): OsduRecord;
    /**
     * API response for GetRecordVersions
     * @typedef {Object} GetRecordVersionsResponse
     * @property {string} recordId - The id of the record requested
     * @property {number[]} versions - Available versions for this record
     */
    /**
     * Get OSDU record versions for the specified id
     * @param {string} record_id - Record identifier of the OSDU record to retrieve version data
     * @returns {GetRecordVersionsResponse} The API Response
     */
    getRecordVersions(record_id: string): {
        /**
         * - The id of the record requested
         */
        recordId: string;
        /**
         * - Available versions for this record
         */
        versions: number[];
    };
    /**
     * Get OSDU record for the specified id at the specified version
     * @param {string} record_id - Record identifier of the OSDU record to retrieve
     * @param {string} version - Version id to retrieve
     * @returns {OsduRecord} The API Response
     */
    getRecordVersion(record_id: string, version: string): OsduRecord;
    /**
     * API response for StoreRecords
     * @typedef {Object} OsduStoreRecordsResponse
     * @property {number} recordCount - Number of records stored
     * @property {string[]} recordIds - IDs of the records stored
     * @property {string[]} skippedRecordIds - IDs of records skipped and not stored
     */
    /**
     * Upsert the provided records
     * @param {Object[]} records - List of JSON representations of the records to upsert
     * @returns {OsduStoreRecordsResponse} The API Response
     */
    storeRecords(records: any[]): {
        /**
         * - Number of records stored
         */
        recordCount: number;
        /**
         * - IDs of the records stored
         */
        recordIds: string[];
        /**
         * - IDs of records skipped and not stored
         */
        skippedRecordIds: string[];
    };
    /**
     * Delete OSDU record
     * @param {string} record_id - Record identifier of the OSDU record to delete
     * @returns {number} The API Response
     */
    deleteRecord(record_id: string): number;
    /**
     * API response to QueryAllKinds
     * @typedef {Object} OsduQueryAllKindsResponse
     * @property {string|null} cursor - Marker to resume query for all kinds from end of this query
     * @property {string[]} results - List of available kinds
     */
    /**
     * Retrieve a list of all supported record kinds
     * @returns {Object} The API Response
     * @param {number} [limit=100] - The maximum number of kinds to return (up to 100)
     * @param {string} [cursor=""] - Marker to resume query for all kinds from end of previous query
     */
    queryAllKinds(limit?: number, cursor?: string): any;
    /**
     * Property definition for an OSDU schema
     * @typedef {Object} OsduSchemaProperty
     * @property {string} path - Flat path to access the property
     * @property {string} kind - Type of the property
     * @property {Object} ext - Extensions
     */
    /**
     * API response to GetSchema
     * @typedef {Object} OsduGetSchemaResponse
     * @property {string} kind - Name of the kind for this schema
     * @property {OsduSchemaProperty[]} schema - List of schema properties
     * @property {OsduSchemaProperty[]|null} ext - List of extension properties
     */
    /**
     * Get OSDU schema for a given kind
     * @param {string} kind - Name of the kind to retrieve the schema
     * @returns {OsduGetSchemaResponse} The API Response
     */
    getSchema(kind: string): {
        /**
         * - Name of the kind for this schema
         */
        kind: string;
        /**
         * - List of schema properties
         */
        schema: {
            /**
             * - Flat path to access the property
             */
            path: string;
            /**
             * - Type of the property
             */
            kind: string;
            /**
             * - Extensions
             */
            ext: any;
        }[];
        /**
         * - List of extension properties
         */
        ext: {
            /**
             * - Flat path to access the property
             */
            path: string;
            /**
             * - Type of the property
             */
            kind: string;
            /**
             * - Extensions
             */
            ext: any;
        }[];
    };
    /**
     * Create a new schema to register a new kind
     * @param {string} kind - Name of the new kind to create
     * @param {OsduSchemaProperty[]} schema - JSON representation of the kind's schema
     * @param {OsduSchemaProperty[]|null} ext - JSON representation of the schema extensions
     * @returns {number} The API Response. 201 for successful creation
     */
    createSchema(kind: string, schema: {
        /**
         * - Flat path to access the property
         */
        path: string;
        /**
         * - Type of the property
         */
        kind: string;
        /**
         * - Extensions
         */
        ext: any;
    }[], ext: {
        /**
         * - Flat path to access the property
         */
        path: string;
        /**
         * - Type of the property
         */
        kind: string;
        /**
         * - Extensions
         */
        ext: any;
    }[]): number;
    /**
     * Delete a kind and it's associated schema
     * @param {string} kind - Name of the kind to delete
     * @returns {number} The API Response. 204 for successful deletion
     */
    deleteSchema(kind: string): number;
}
import OsduR2BaseService = require("./base");
