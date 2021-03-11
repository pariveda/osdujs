/**
 * Class to build OSDU schema query bodies with friendly names for each available option
 * - Note that querys built with this builder must at minimum specify the [kind]{@link OsduQueryBuilder#kind}
 * 
 * @class
 * @category Models
 * @subcategory Schema
 */
class OsduSchemaQueryBuilder {
    /** @constructor */
    constructor() {
    }

    // Setters
    /**
     * Pass an optional string to search for a specific authority
     * - Accepts wildcards `*`
     * @param {string} authority - The OSDU authority with which to filter the search
     */
    authority(authority) {
        this._authority = authority;
        return this;
    }

    /**
     * Pass an optional string to search for a specific source
     * - Accepts wildcards `*`
     * @param {string} source - The OSDU source with which to filter the search
     */
    source(source) {
        this._source = source;
        return this;
    }

    /**
     * Pass an optional string to search for a specific entityType
     * - Accepts wildcards `*`
     * @param {string} entityType - The OSDU entityType with which to filter the search
     */
    entityType(entityType) {
        this._entityType = entityType;
        return this;
    }

    /**
     * Pass an optional string to search for a specific schemaVersionMajor
     * - Accepts wildcards `*`
     * @param {string|number} schemaVersionMajor - The OSDU schemaVersionMajor with which to filter the search
     */
    schemaVersionMajor(schemaVersionMajor) {
        this._schemaVersionMajor = schemaVersionMajor;
        return this;
    }

    /**
     * Pass an optional string to search for a specific schemaVersionMinor
     * - Accepts wildcards `*`
     * @param {string|number} schemaVersionMinor - The OSDU schemaVersionMinor with which to filter the search
     */
    schemaVersionMinor(schemaVersionMinor) {
        this._schemaVersionMinor = schemaVersionMinor;
        return this;
    }

    /**
     * The schema status specification
     * - Accepts only valid status `PUBLISHED`, `DEVELOPMENT`, or `OBSOLETE`
     * @param {('PUBLISHED'|'DEVELOPMENT'|'OBSOLETE')} status - The OSDU status with which to filter the search
     */
    status(status) {
        if (![
            "PUBLISHED",
            "DEVELOPMENT",
            "OBSOLETE"
        ].contains(status)) {
            throw new Error(`Invalid status type ${status} in Osdu Schema Query Builder`);
        }
        this._status = status;
        return this;
    }

    /**
     * The scope or schema visibility specification
     * - Accepts only valid status `INTERNAL` or `SHARED`
     * @param {('INTERNAL'|'SHARED')} status - The OSDU scope with which to filter the search
     */
    scope(scope) {
        if (![
            "SHARED",
            "INTERNAL"
        ].contains(scope)) {
            throw new Error(`Invalid scope type ${scope} in Osdu Schema Query Builder`);
        }
        this._scope = scope;
        return this;
    }

    /**
     * If True, only return the latest version
     * @param {boolean} latestVersion - Whether to retrieve only the latest version
     */
    latestVersion(latestVersion) {
        this._latestVersion = !!latestVersion ? "True" : "False";
        return this;
    }

    /**
     * Maximum number of schema records to return
     * @param {number} limit - The integer number of records to return
     */
    limit(limit) {
        this._limit = limit;
        return this;
    }

    /**
     * Number of records to skip for pagination
     * @param {number} offset - The integer number of records to skip
     */
    offset(offset) {
        this._offset = offset;
        return this;
    }

    // Build
    /**
     * Construct the query request query string based on the attributes set
     * @returns {string} The query string that is passed to the schema query request
     */
    build() {
        var queryString = "?";

        if (this._authority) {
            queryString += `&authority=${this._authority}`;
        }
        if (this._source) {
            queryString += `&source=${this._source}`;
        }
        if (this._entityType) {
            queryString += `&entityType=${this._entityType}`;
        }
        if (this._schemaVersionMajor) {
            queryString += `&schemaVersionMajor=${this._schemaVersionMajor}`;
        }
        if (this._schemaVersionMinor) {
            queryString += `&schemaVersionMinor=${this._schemaVersionMinor}`;
        }
        if (this._status) {
            queryString += `&status=${this._status}`;
        }
        if (this._scope) {
            queryString += `&scope=${this._scope}`;
        }
        if (this._latestVersion) {
            queryString += `&latestVersion=${this._latestVersion}`;
        }
        if (this._limit) {
            queryString += `&limit=${this._limit}`;
        }
        if (this._offset) {
            queryString += `&offset=${this._offset}`;
        }

        queryString = queryString.substr(0, queryString.count-1);

        return queryString;
    }
}

module.exports = OsduSchemaQueryBuilder;