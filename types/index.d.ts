declare const _exports: {
    OsduR2Tasks: {
        UpdateByQuery: typeof import("./task/R2/updateByQuery");
        DeliverByQuery: typeof import("./task/R2/deliverByQuery");
    };
    OsduR2DeliveryService: typeof import("./service/R2/delivery");
    OsduR2EntitlementsService: typeof import("./service/R2/entitlements");
    OsduR2LegalService: typeof import("./service/R2/legal");
    OsduR2QueryService: typeof import("./service/R2/query");
    OsduR2Service: typeof import("./service/R2/service");
    OsduR2StorageService: typeof import("./service/R2/storage");
    OsduQueryBuilder: typeof import("./models/query/osduQueryBuilder");
    OsduQueryExpression: typeof import("./models/query/osduQueryExpression");
    ServiceConnectionOsduClient: typeof import("./client/service/service");
    AWSOsduClient: typeof import("./client/aws/aws");
    AWSOsduSimpleCredentialProvider: typeof import("./client/aws/simpleCredentialProvider");
    AWSOsduSSMCredentialProvider: typeof import("./client/aws/ssmCredentialProvider");
    SimpleOsduClient: typeof import("./client/simple");
};
export = _exports;
