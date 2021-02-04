/**
 * Access control list for OSDU records
 */
type OsduAccessControlList = {
    /**
     * - Users and groups that can view the record
     */
    viewers: string[];
    /**
     * - Users and groups that own the record
     */
    owners: string[];
};
/**
 * Legal information for OSDU records
 */
type OsduLegalInformation = {
    /**
     * - Legal tags associated with the record
     */
    legaltags: string[];
    /**
     * - Other countries associated with the data that are legally relevant
     */
    otherRelevantDataCountries: string[];
    /**
     * - The legal status of the record's data
     */
    status: string;
};
/**
 * Single record returned by a query result
 */
type OsduRecord = {
    /**
     * - Freeform data for the record. Refer to schema definitions for available properties
     */
    data: {
        [x: string]: string;
    };
    /**
     * - Schema that the record conforms to
     */
    kind: string;
    /**
     * - Grouping that schema comes from
     */
    namespace: string;
    /**
     * - Legal information for the record. Refer to schema definitions for available properties
     */
    legal: OsduLegalInformation;
    /**
     * - Record identifier
     */
    id: string;
    /**
     * - Access control list
     */
    acl: OsduAccessControlList;
    /**
     * - Record type
     */
    type: string;
    /**
     * - The version of this record
     */
    version: number;
};
