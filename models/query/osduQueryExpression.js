class OsduQueryExpression {
    constructor(statement) {
        if (!(typeof statement === 'string' || statement instanceof String)) {
            throw new Error(`OsduQueryExpression with statement must pass a string`);
        }
        this.statement = statement;
    }

    static FromOperator(boolean_operator, left_expression, right_expression) {
        if (!(left_expression instanceof OsduQueryExpression) || !(right_expression instanceof OsduQueryExpression)) {
            throw new Error(`OsduQueryExpression with boolean operator must contain both left and right OsduQueryExpressions`);
        }
        var statement = "";
        switch(boolean_operator) {
            case "AND":
                statement = `(${left_expression.toString()} AND ${right_expression.toString()})`;
                break;
            case "OR":
                statement = `(${left_expression.toString()} OR ${right_expression.toString()})`;
                break;
            default:
                throw new Error(`Unknown boolean operator in OsduQueryExpression: ${boolean_operator}`);
        }
        return new OsduQueryExpression(statement);
    }

    toString() {
        return this.statement;
    }
}

module.exports = OsduQueryExpression;