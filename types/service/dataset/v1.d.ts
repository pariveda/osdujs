export = OsduV1DatasetService;
/**
 * Class that provides named access to OSDU Dataset endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * @class
 * @category Services
 * @subcategory Dataset
 */
declare class OsduV1DatasetService extends OsduBaseService {
    /**
     * Get dataset registry object for the given dataset registry ID
     * @param {string} registryId - Identifier for the dataset registry you wish to retrieve
     * @returns {Object} The API Response
     */
    getDatasetRegistry(registryId: string): any;
    /**
     * Get dataset registry objects for the given list dataset registry IDs
     * @param {string[]} registryIds - Identifiers for the dataset registries you wish to retrieve
     * @returns {Object} The API Response
     */
    getDatasetRegistries(registryIds: string[]): any;
    /**
     * Register a list of datasets
     * @param {object[]} datasetRegistries - List of dataset registry objects to register
     * @returns {Object} The API Response
     */
    registerDatasets(datasetRegistries: object[]): any;
    /**
     * Get instructions on how to store a given dataset sub type
     * @param {string} kindSubType - Identifier for the kind of dataset you wish to store source data for
     * @returns {Object} The API Response
     */
    getStorageInstructions(kindSubType: string): any;
    /**
     * Get instructions on how to retrieve a given dataset registry
     * @param {string} registryId - Identifier for the dataset registry you wish to retrieve source data for
     * @returns {Object} The API Response
     */
    getRetrievalInstructions(registryId: string): any;
    /**
     * Get instructions on how to retrieve a given dataset registry
     * @param {string[]} registryIds - Identifiers for the dataset registries you wish to retrieve source data for
     * @returns {Object} The API Response
     */
    getMultipleRetrievalInstructions(registryIds: string[]): any;
}
import OsduBaseService = require("../base");
