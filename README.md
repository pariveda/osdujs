# osdujs

A simple node client/service for the [OSDU](https://community.opengroup.org/osdu) data platform.

[![npm version](https://badge.fury.io/js/osdujs.svg)](https://www.npmjs.com/package/osdujs) ![Tests](https://github.com/pariveda/osdujs/workflows/Tests/badge.svg)

## Contents

- [Service](#service)
  * [OsduR2Service](#osdur2service)
    + [Currently supported methods](#r2-currently-supported-methods)
- [Clients](#clients)
  * [SimpleOsduClient](#simpleosduclient)
  * [AwsOsduClient](#awsosduclient)
- [Installation](#installation)
- [Usage](#usage)
  * [Instantiating the SimpleOsduClient](#instantiating-the-simpleosduclient)
  * [Instantiating the AwsOsduClient](#instantiating-the-awsosduclient)
  * [Using the OsduR2Service](#using-the-osdur2service)
    + [Search for records by query](#search-for-records-by-query)
    + [Search with paging](#search-with-paging)
    + [Search for all](#search-for-all)
    + [Get a record](#get-a-record)
    + [Upsert records](#upsert-records)
- [Release Notes](release-notes.md)

## Service

Choose the service that matches your OSDU application instance version.

### OsduR2Service

Service to encapsulate the OSDU R2 application endpoints. Provides
named access to the below supported OSDU methods, all in an async
manner.

#### R2 currently supported methods

- [search](service/R2/query.js)
  - query
  - queryWithPaging
  - queryAll
- [storage](service/R2/storage.js)
  - getRecords
  - getRecord
  - getRecordVersions
  - getRecordVersion
  - storeRecords
  - deleteRecord
  - ingestManifest
  - queryAllKinds
  - getSchema
  - createSchema
  - deleteSchema
- [delivery](service/R2/delivery.js)
  - getSignedUrls
- [legal](service/R2/legal.js)
  - listLegalTags
  - getLegalTags
  - validateLegalTags
  - getLegalTag
  - getLegalTagProperties
  - createLegalTag
  - updateLegalTag
  - deleteLegalTag
- [entitlements](service/R2/entitlements.js)

## Clients

Choose the client that best meets your needs. The same methods are all supported for each.

### SimpleOsduClient

BYOT: Bring your own token. Great for business logic that supplements a
front-end application.

This client assumes you are obtaining a token yourself (e.g. via your application's
login form or otheer mechanism. With this SimpleOsduClient, you simply provide that token.
With this simplicity, you are also then respnsible for refreshing the token as needed and
either updating or re-instantiating the client with the new token.

### AwsOsduClient

Good for batch tasks that don't have an interactive front-end or back-end applications. Only works with AWS
hosted OSDU applications. Token management is handled with the AWS SDK directly through the Cognito service.
You have to supply additional arguments for this.

```javascript
new AWSOsduClient({
    api_url: process.env.OSDU_API_URL, 
    cognito_client_id: process.env.OSDU_CLIENT_ID, 
    aws_region: process.env.AWS_REGION, 
    aws_profile: process.env.AWS_PROFILE, // Note that this is not required and will default to default AWS creds
    credential_provider: new AWSOsduSimpleCredentialProvider(process.env.OSDU_USERNAME, process.env.OSDU_PASSWORD)
});
```

#### AWS Credential Providers

The `AwsOsduClient` relies upon a credential provider to dynamically retrieve the username and password
combination used to authenticate with Cognito. These credential providers adhere to a consistent interface
to `GetCredentials`. The credential provider pattern allows the `AwsOsduClient` to dynamically refresh
its access token, meaning that your application does not need to worry about expired sessions.

Choose the credential provider that best meets your needs.

##### AwsOsduSimpleCredentialProvider

Good for local development or user-provided credentials where the client is ephemeral. Accepts username and
password upon instantiation and holds the values in memory to be reused.

##### AwsOsduSSMCredentialProvider

Good for service connections in back-end applications. Accepts AWS SSM parameter store paths for username and
password and dynamically retrieves the values via the AWS SDK when requested by the client.
By default, the OSDU admin user credentials are stored in SSM as follows:
- username: `/osdu/osduonaws/admin-user`
- password: `/osdu/osduonaws/admin-password`
Note that this credential provider requires AWS permissions to read the specified SSM parameters (and underlying
KMS keys if encrypted).

## Installation

```bash
npm install osdujs
```

## Usage

### Instantiating the SimpleOsduClient

Requires passing the OSDU API url and OSDU access token in the constructor

```javascript
const { SimpleOsduClient } = require('osdujs');

var osduClient = new SimpleOsduClient(process.env.OSDU_API_URL, process.env.OSDU_ACCESS_TOKEN);
```

### Instantiating the AwsOsduClient

Requires passing the OSDU API url and supporting AWS information:
- Cognito Client ID: The identifier for the non-secret AWS Cognito client to authenticate with
- AWS Region: The AWS Region in which the Cognito user pool exists

Also requires a credential provider to provide the username and password with which to authenticate against
Cognito. See [Credential Providers](#aws-credential-providers) for more information.

Optionally accepts AWS profile to specify a local AWS credentials profile to use to authenticate with AWS.
Used for local development or stored credentials on an EC2 machine, but recommended not to provide on back-end
applications to default to permissions specified in the back-end compute instance's IAM Role. 

Using the simple credential provider:

```javascript
const {
    AWSOsduClient,
    AWSOsduSimpleCredentialProvider
} = require('osdujs');

var osduClient = new AWSOsduClient({
    api_url: process.env.OSDU_API_URL, 
    cognito_client_id: process.env.OSDU_CLIENT_ID, 
    aws_region: process.env.AWS_REGION, 
    aws_profile: process.env.AWS_PROFILE, // Optional
    credential_provider: new AWSOsduSimpleCredentialProvider(process.env.OSDU_USERNAME, process.env.OSDU_PASSWORD)
});
```

Using the AWS SSM credential provider:

```javascript
const {
    AWSOsduClient,
    AWSOsduSSMCredentialProvider
} = require('osdujs');

var osduClient = new AWSOsduClient({
    api_url: process.env.OSDU_API_URL, 
    cognito_client_id: process.env.OSDU_CLIENT_ID, 
    aws_region: process.env.AWS_REGION, 
    aws_profile: process.env.AWS_PROFILE, // Optional
    credential_provider: new AWSOsduSSMCredentialProvider({
        username_parameter: process.env.OSDU_USERNAME_SSM_PARAMETER, 
        password_parameter: process.env.OSDU_PASSWORD_SSM_PARAMETER,
        aws_region: process.env.AWS_REGION,
        aws_profile: process.env.AWS_PROFILE
    })
});
```

### Using the OsduR2Service

Below are just a few usage examples using the OsduR2Service. See [integration and unit tests](tests) for more copmrehensive usage examples.

Instantiating the service is as simple as passing in the client and the data partition you wish to operate on. For
more information regarding creating an OSDU client, please see [Instantiating the SimpleOsduClient](#instantiating-the-simpleosduclient) or [Instantiating the AwsOsduClient](#instantiating-the-awsosduclient)

```javascript
const { OsduR2Service } = require('osdujs');

var client = createOSDUClient();
var osduService = new OsduR2Service(client, 'opendes');
```

#### Search for records by query

```javascript
var queryResults = await osduService.QueryService.query(
    (new OsduQueryBuilder())
        .kind('opendes:osdu:*:*')
        .build()
);
// { results: [ {...}, .... ], totalCount: ##### }
```

#### Search with paging

For result sets larger than 1,000 records, use the query with paging method to pull a page with an iterator (cursor).

Initially:

```javascript
var queryResults = await osduService.QueryService.queryWithPaging(
    (new OsduQueryBuilder())
        .kind('opendes:osdu:*:*')
        .build()
);
// { results: [ {...}, .... ], cursor: "...", totalCount: ##### }
```

With an existing cursor:

```javascript
const cursor = "cursor";
var queryResults = await osduService.QueryService.queryWithPaging(
    (new OsduQueryBuilder())
        .kind('opendes:osdu:*:*')
        .build(),
    cursor
);
// { results: [ {...}, .... ], cursor: "...", totalCount: ##### }
```

#### Search for all

For result sets larger than 1,000 records, use the query all method to pull all records.

```javascript
var queryResults = await osduService.QueryService.queryAll(
    (new OsduQueryBuilder())
        .kind('opendes:osdu:*:*')
        .build()
);
// { results: [ {...}, .... ], batches: #####, totalCount: ##### }
```

#### Get a record

```javascript
const record_id = 'opendes:doc:123456789';
var record = await osduService.StorageService.getRecord(record_id);
// { id: 'opendes:doc:123456789', kind: ..., data: {...}, acl: {...}, .... }
```

#### Upsert records

```javascript
const fs = require('fs');
const new_or_updated_record = JSON.parse(
    fs.readFileSync('./record-123.json').toString()
);
var record = await osduService.StorageService.storeRecords([new_or_updated_record]);
// { recordCount: 1, recordIds: [...], skippedRecordIds: [] }
```