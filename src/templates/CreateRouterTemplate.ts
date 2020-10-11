export class CreateRouterTemplate
{
    _content: string;
    constructor(modelName: String, modelNameWithoutModel: String)
    {
        this._content = `
        var routerModule = require("../../src/server")
        const router = routerModule.router;
        // Require controller modules.
        const ${modelNameWithoutModel}_controller = require('../../src/controllers/${modelNameWithoutModel}Controller');

        /// ${modelNameWithoutModel} ROUTES ///

        // GET request for one ${modelNameWithoutModel}.
        router.get('/:id', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_detail);

        // GET request for a list of all ${modelNameWithoutModel} items.
        router.get('/getall', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_list);

        // GET request for creating a ${modelNameWithoutModel}. NOTE ${modelNameWithoutModel} (uses id).
        router.get('/create', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_create_get);

        // POST request for creating a ${modelNameWithoutModel}.
        router.post('/create', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_create_post);

        // GET request to delete ${modelNameWithoutModel}.
        router.get('/:id/delete', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_delete_get);

        // POST request to delete ${modelNameWithoutModel}.
        router.post('/:id/delete', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_delete_post);

        // GET request to update ${modelNameWithoutModel}.
        router.get('/:id/update', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_update_get);

        // POST request to update ${modelNameWithoutModel}.
        router.post('/:id/update', ${modelNameWithoutModel}_controller.${modelNameWithoutModel}_update_post);
        
        module.exports = router;
            `;
    }

    getContent = () : string => {
        return this._content;
    }

}