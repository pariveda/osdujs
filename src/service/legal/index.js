const OsduV1LegalService = require('./v1');

/**
 * Class that provides named access to OSDU Legal endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/tutorial/ComplianceService.md}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/security-and-compliance/legal/-/blob/master/docs/api/compliance_openapi.yaml}
 * @class
 * @category Services
 * @subcategory Legal
 */
class OsduLegalService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        this.V1 = new OsduV1LegalService(osdu_client, data_partition);
    }
}

module.exports = OsduLegalService;