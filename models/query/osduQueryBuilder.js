const OsduQueryExpression = require('./osduQueryExpression');

class OsduQueryBuilder {
    constructor() {
    }

    // Setters
    //// Search Terms
    kind(kind) {
        this._kind = kind;
        return this;
    }

    query(query_expression) {
        if (!(query_expression instanceof OsduQueryExpression)) {
            throw new Error(`OsduQueryBuilder query statement must be of type OsduQueryExpressions`);
        }
        this._query = query_expression.toString();
        return this;
    }

    spacialFilter(spacial_filter) {
        throw new Error(`OsduQueryBuilder spacial filters not yet supported`);
    }

    //// Filter Result Data
    offset(offset) {
        this._offset = offset;
        return this;
    }

    limit(limit) {
        this._limit = limit;
        return this;
    }

    returnedFields(returned_fields) {
        if (!Array.isArray(returned_fields) || returned_fields.length == 0) {
            throw new Error(`OsduQueryBuilder returned fields must be of type Array[String] with minimum length 1`);
        }
        this._returnedFields = returned_fields;
        return this;
    }

    //// Organization
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

    aggregateBy(field) {
        this._aggregateBy = field;
        return this;
    }

    // Build
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