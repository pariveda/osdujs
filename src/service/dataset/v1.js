const OsduBaseService = require('../base');

/**
 * Class that provides named access to OSDU Dataset endpoints
 * - [Service Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * - [API Documentation]{@link https://community.opengroup.org/osdu/platform/system/dataset/-/blob/master/docs/dataset.swagger.yaml}
 * @class
 * @category Services
 * @subcategory Dataset
 */
class OsduV1DatasetService extends OsduBaseService {
    /**
     * @constructor
     * @param {BaseOsduClient} osdu_client - An implementation of the OSDU client class to broker communication with the OSDU API
     * @param {string} data_partition - The data partition against which requests will be made
     */
    constructor(osdu_client, data_partition) {
        super(osdu_client, data_partition);
    }
    
    /**
     * Get dataset registry object for the given dataset registry ID
     * @param {string} registryId - Identifier for the dataset registry you wish to retrieve
     * @returns {Object} The API Response
     */
    async getDatasetRegistry(registryId) {
        return await this._client.get(`/api/dataset/v1/getDatasetRegistry?id=${registryId}`, this._dataPartition);
    }
    
    /**
     * Get dataset registry objects for the given list dataset registry IDs
     * @param {string[]} registryIds - Identifiers for the dataset registries you wish to retrieve
     * @returns {Object} The API Response
     */
    async getDatasetRegistries(registryIds) {
        return await this._client.post(`/api/dataset/v1/getDatasetRegistry`, { datasetRegistryIds: registryIds }, this._dataPartition);
    }
    
    /**
     * Register a list of datasets
     * @param {object[]} datasetRegistries - List of dataset registry objects to register
     * @returns {Object} The API Response
     */
    async registerDatasets(datasetRegistries) {
        return await this._client.put(`/api/dataset/v1/registerDataset`, { datasetRegistries }, this._dataPartition);
    }
    
    /**
     * Get instructions on how to store a given dataset sub type
     * @param {string} kindSubType - Identifier for the kind of dataset you wish to store source data for
     * @returns {Object} The API Response
     */
    async getStorageInstructions(kindSubType) {
        return await this._client.get(`/api/dataset/v1/getStorageInstructions?kindSubType=${kindSubType}`, this._dataPartition);
    }
    
    /**
     * Get instructions on how to retrieve a given dataset registry
     * @param {string} registryId - Identifier for the dataset registry you wish to retrieve source data for
     * @returns {Object} The API Response
     */
    async getRetrievalInstructions(registryId) {
        return await this._client.get(`/api/dataset/v1/getRetrievalInstructions?datasetRegistryId=${registryId}`, this._dataPartition);
    }
    
    /**
     * Get instructions on how to retrieve a given dataset registry
     * @param {string[]} registryIds - Identifiers for the dataset registries you wish to retrieve source data for
     * @returns {Object} The API Response
     */
    async getMultipleRetrievalInstructions(registryIds) {
        return await this._client.post(`/api/dataset/v1/getRetrievalInstructions`, { datasetRegistryIds: registryIds }, this._dataPartition);
    }
}

module.exports = OsduV1DatasetService;