const OsduQueryExpression = require('./osduQueryExpression');

/**
 * Class to build OSDU query bodies with friendly names for each available option
 * - Note that querys built with this builder must at minimum specify the [kind]{@link OsduQueryBuilder#kind}
 * - Follows the [OSDU Query Syntax]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/OSDU-Query-Syntax}
 * 
 * @class
 * @category Models
 * @subcategory Query
 */
class OsduQueryBuilder {
    /** @constructor */
    constructor() {
        this._kind = "*:*:*:*";
    }

    // Setters
    //// Search Terms
    /**
     * Set the OSDU kind to filter the scope of the search.
     * - Accepts wildcards `*` within kind sections. (I.E. `*:osdu:*:0.2.0`)
     * @param {string} kind - The OSDU kind with which to filter the search
     */
    kind(kind) {
        this._kind = kind;
        return this;
    }

    /**
     * Set the OSDU compliant query expression to narrow the search results
     * - OSDU query syntax can be found in [OSDU documentation here]{@link https://community.opengroup.org/osdu/documentation/-/wikis/Releases/R2.0/OSDU-Query-Syntax}
     * - Note that the passed in expression must be an instance of the [Osdu Query Expression class]{@link OsduQueryExpression}
     * @param {OsduQueryExpression} query_expression - The query expression used to narrow search results based on the available OSDU data
     */
    query(query_expression) {
        if (!(query_expression instanceof OsduQueryExpression)) {
            throw new Error(`OsduQueryBuilder query statement must be of type OsduQueryExpressions`);
        }
        this._query = query_expression.toString();
        return this;
    }

    /**
     * Set the spacial filter on the OSDU query
     * - Not yet supported.
     * @throws Error
     * @param {undefined} spacial_filter 
     */
    spacialFilter(spacial_filter) {
        throw new Error(`OsduQueryBuilder spacial filters not yet supported`);
    }

    //// Filter Result Data
    /**
     * Set the offset value representing how many records should be skipped before collecting records to return
     * @deprecated Recommended to use the [paged query]{@link OsduR2QueryService#queryWithPaging} rather than attempting to page via offset
     * @param {number} offset - The number of records (positive integer) to skip before collecting records to return
     */
    offset(offset) {
        this._offset = offset;
        return this;
    }

    /**
     * Set the maximum limit of records to return within the query results
     * - In paged queries, this sets the page size
     * @param {number} limit - The maximum number of records (positive integer) to return
     */
    limit(limit) {
        this._limit = limit;
        return this;
    }

    /**
     * Set the fields to include on the returned records
     * - Will include these fields where found, but does not guarantee that all records will contain these fields
     * @param {sring[]} returned_fields 
     */
    returnedFields(returned_fields) {
        if (!Array.isArray(returned_fields) || returned_fields.length == 0) {
            throw new Error(`OsduQueryBuilder returned fields must be of type Array[String] with minimum length 1`);
        }
        this._returnedFields = returned_fields;
        return this;
    }

    //// Organization
    /**
     * Set the sort order of results prior to paging
     * @param {string[]} fields - The fields by which to order the results
     * @param {string[]} order - The order (Ascending/Descending) in which to sort the results on each field. Only accepts "ASC" and "DESC"
     */
    sort(fields, order) {
        if (!Array.isArray(fields) || fields.length == 0) {
            throw new Error(`OsduQueryBuilder sort fields must be of type Array[String] with minimum length 1`);
        }
        else if (!Array.isArray(order) || order.length == 0) {
            throw new Error(`OsduQueryBuilder sort order must be of type Array[String] with minimum length 1`);
        }
        else if (fields.length != order.length) {
            throw new Error(`OsduQueryBuilder sort fields and sort order must have matching length`);
        }
        this._sort = {
            fields,
            order
        }
        return this;
    }

    /**
     * Set the field by which to aggregate results if aggregation is requested
     * @param {string} field - The OSDU record field by which to aggregate results
     */
    aggregateBy(field) {
        this._aggregateBy = field;
        return this;
    }

    // 
    /**
     * Construct the query request body based on the attributes set
     * @returns {Object} The JSON object that is passed into the body of the OSDU API Search request
     */
    build() {
        var queryObject = {};

        if (this._kind) {
            queryObject.kind = this._kind;
        }
        if (this._query) {
            queryObject.query = this._query;
        }

        if (this._offset) {
            queryObject.offset = this._offset;
        }
        if (this._limit) {
            queryObject.limit = this._limit;
        }
        if (this._returnedFields) {
            queryObject.returnedFields = this._returnedFields;
        }

        if (this._sort) {
            queryObject.sort = this._sort;
        }
        if (this._aggregateBy) {
            queryObject.aggregateBy = this._aggregateBy;
        }

        return queryObject;
    }
}

module.exports = OsduQueryBuilder;