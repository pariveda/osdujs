declare const _exports: {
    OsduR2Tasks: {
        UpdateByQuery: typeof import("./task/R2/updateByQuery");
        DeliverByQuery: typeof import("./task/R2/deliverByQuery");
    };
    OsduService: typeof import("./service/service");
    OsduSchemaQueryBuilder: typeof import("./models/schema/osduSchemaQueryBuilder");
    OsduQueryBuilder: typeof import("./models/query/osduQueryBuilder");
    OsduQueryExpression: typeof import("./models/query/osduQueryExpression");
    AWSOsduClient: typeof import("./client/aws/aws");
    AWSOsduSimpleCredentialProvider: typeof import("./client/aws/simpleCredentialProvider");
    AWSOsduSSMCredentialProvider: typeof import("./client/aws/ssmCredentialProvider");
    SimpleOsduClient: typeof import("./client/simple");
};
export = _exports;
