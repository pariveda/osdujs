export = OsduR2StorageService;
declare const OsduR2StorageService_base: typeof import("./base");
/**
 * Class that provides named access to OSDU R2 Storage endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/tutorial/StorageService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/storage/-/blob/master/docs/api/storage_openapi.yaml}
 * @class
 * @category Services
 * @subcategory R2
 */
declare class OsduR2StorageService extends OsduR2StorageService_base {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client: any, data_partition: string);
    /**
     * Get OSDU records for the specified ids
     * @param {string[]} record_ids - Record identifiers of the OSDU records to retrieve
     * @returns {Object} The API Response
     */
    getRecords(record_ids: string[]): any;
    /**
     * Get OSDU records for the specified id
     * @param {string} record_id - Record identifier of the OSDU record to retrieve
     * @returns {Object} The API Response
     */
    getRecord(record_id: string): any;
    /**
     * Get OSDU record versions for the specified id
     * @param {string} record_id - Record identifier of the OSDU record to retrieve version data
     * @returns {Object} The API Response
     */
    getRecordVersions(record_id: string): any;
    /**
     * Get OSDU record for the specified id at the specified version
     * @param {string} record_id - Record identifier of the OSDU record to retrieve
     * @param {string} version - Version id to retrieve
     * @returns {Object} The API Response
     */
    getRecordVersion(record_id: string, version: string): any;
    /**
     * Upsert the provided records
     * @param {Object[]} records - List of JSON representations of the records to upsert
     * @returns {Object} The API Response
     */
    storeRecords(records: any[]): any;
    /**
     * Delete OSDU record
     * @param {string} record_id - Record identifier of the OSDU record to delete
     * @returns {Object} The API Response
     */
    deleteRecord(record_id: string): any;
    /**
     * Ingest a manifest containing linked records
     * @param {Object} manifest - JSON representation of the manifest to process and ingest
     * @returns {Object} The API Response
     */
    ingestManifest(manifest: any): any;
    /**
     * Retrieve a list of all supported record kinds
     * @returns {Object} The API Response
     */
    queryAllKinds(): any;
    /**
     * Get OSDU schema for a given kind
     * @param {string} kind - Name of the kind to retrieve the schema
     * @returns {Object} The API Response
     */
    getSchema(kind: string): any;
    /**
     * Create a new schema to register a new kind
     * @param {string} kind - Name of the new kind to create
     * @param {Object} schema - JSON representation of the kind's schema
     * @param {Object} ext - JSON representation of the schema extensions
     * @returns {Object} The API Response
     */
    createSchema(kind: string, schema: any, ext: any): any;
    /**
     * Delete a kind and it's associated schema
     * @param {string} kind - Name of the kind to delete
     * @returns {Object} The API Response
     */
    deleteSchema(kind: string): any;
}
