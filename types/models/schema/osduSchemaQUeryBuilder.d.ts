export = OsduSchemaQueryBuilder;
/**
 * Class to build OSDU schema query bodies with friendly names for each available option
 * - Note that querys built with this builder must at minimum specify the [kind]{@link OsduQueryBuilder#kind}
 *
 * @class
 * @category Models
 * @subcategory Schema
 */
declare class OsduSchemaQueryBuilder {
    /**
     * Pass an optional string to search for a specific authority
     * - Accepts wildcards `*`
     * @param {string} authority - The OSDU authority with which to filter the search
     */
    authority(authority: string): OsduSchemaQueryBuilder;
    _authority: string;
    /**
     * Pass an optional string to search for a specific source
     * - Accepts wildcards `*`
     * @param {string} source - The OSDU source with which to filter the search
     */
    source(source: string): OsduSchemaQueryBuilder;
    _source: string;
    /**
     * Pass an optional string to search for a specific entityType
     * - Accepts wildcards `*`
     * @param {string} entityType - The OSDU entityType with which to filter the search
     */
    entityType(entityType: string): OsduSchemaQueryBuilder;
    _entityType: string;
    /**
     * Pass an optional string to search for a specific schemaVersionMajor
     * - Accepts wildcards `*`
     * @param {string|number} schemaVersionMajor - The OSDU schemaVersionMajor with which to filter the search
     */
    schemaVersionMajor(schemaVersionMajor: string | number): OsduSchemaQueryBuilder;
    _schemaVersionMajor: string | number;
    /**
     * Pass an optional string to search for a specific schemaVersionMinor
     * - Accepts wildcards `*`
     * @param {string|number} schemaVersionMinor - The OSDU schemaVersionMinor with which to filter the search
     */
    schemaVersionMinor(schemaVersionMinor: string | number): OsduSchemaQueryBuilder;
    _schemaVersionMinor: string | number;
    /**
     * The schema status specification
     * - Accepts only valid status `PUBLISHED`, `DEVELOPMENT`, or `OBSOLETE`
     * @param {('PUBLISHED'|'DEVELOPMENT'|'OBSOLETE')} status - The OSDU status with which to filter the search
     */
    status(status: ('PUBLISHED' | 'DEVELOPMENT' | 'OBSOLETE')): OsduSchemaQueryBuilder;
    _status: "PUBLISHED" | "DEVELOPMENT" | "OBSOLETE";
    /**
     * The scope or schema visibility specification
     * - Accepts only valid status `INTERNAL` or `SHARED`
     * @param {('INTERNAL'|'SHARED')} status - The OSDU scope with which to filter the search
     */
    scope(scope: any): OsduSchemaQueryBuilder;
    _scope: any;
    /**
     * If True, only return the latest version
     * @param {boolean} latestVersion - Whether to retrieve only the latest version
     */
    latestVersion(latestVersion: boolean): OsduSchemaQueryBuilder;
    _latestVersion: string;
    /**
     * Maximum number of schema records to return
     * @param {number} limit - The integer number of records to return
     */
    limit(limit: number): OsduSchemaQueryBuilder;
    _limit: number;
    /**
     * Number of records to skip for pagination
     * @param {number} offset - The integer number of records to skip
     */
    offset(offset: number): OsduSchemaQueryBuilder;
    _offset: number;
    /**
     * Construct the query request query string based on the attributes set
     * @returns {string} The query string that is passed to the schema query request
     */
    build(): string;
}
