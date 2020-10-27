/**
 * Access control list for OSDU records
 * @typedef {Object} OsduAccessControlList 
 * @property {string[]} viewers - Users and groups that can view the record
 * @property {string[]} owners - Users and groups that own the record
 */

/**
 * Legal information for OSDU records
 * @typedef {Object} OsduLegalInformation 
 * @property {string[]} legaltags - Legal tags associated with the record
 * @property {string[]} otherRelevantDataCountries - Other countries associated with the data that are legally relevant
 * @property {string} status - The legal status of the record's data
 */

/**
 * Single record returned by a query result
 * @typedef {Object} OsduRecord
 * @property {Object.<string,string>} data - Freeform data for the record. Refer to schema definitions for available properties
 * @property {string} kind - Schema that the record conforms to
 * @property {string} namespace - Grouping that schema comes from
 * @property {OsduLegalInformation} legal - Legal information for the record. Refer to schema definitions for available properties
 * @property {string} id - Record identifier
 * @property {OsduAccessControlList} acl - Access control list
 * @property {string} type - Record type
 * @property {number} version - The version of this record
 */