export class CreateControllerTemplate
{
    _content: string;
    constructor(modelName: String, modelNameWithoutModel: String)
    {
        this._content = `
        const ${modelName} = require('../../src/models/${modelName}');
        
        // Display a list of all ${modelNameWithoutModel}s.
        exports.${modelNameWithoutModel}_list = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} list');
        };
        
        // Display a specific ${modelNameWithoutModel}.
        exports.${modelNameWithoutModel}_detail = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} detail: ' + req.params.id);
        };
        
        // Display ${modelNameWithoutModel} create form on GET.
        exports.${modelNameWithoutModel}_create_get = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} create GET');
        };
        
        // Handle ${modelNameWithoutModel} create on POST.
        exports.${modelNameWithoutModel}_create_post = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} create POST');
        };
        
        // Display ${modelNameWithoutModel} delete form on GET.
        exports.${modelNameWithoutModel}_delete_get = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} delete GET');
        };
        
        // Handle ${modelNameWithoutModel} delete on POST.
        exports.${modelNameWithoutModel}_delete_post = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} delete POST');
        };
        
        // Display ${modelNameWithoutModel} update form on GET.
        exports.${modelNameWithoutModel}_update_get = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} update GET');
        };
        
        // Handle ${modelNameWithoutModel} update on POST.
        exports.${modelNameWithoutModel}_update_post = function(req, res) {
            res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} update POST');
        };
        
        `;
    }

    getContent = () : string => {
        return this._content;
    }

}