
const AttachmentsController = require('../../controllers/AttachmentsController').AUTH;

function attachmentsRoute(apiRouter) {
    apiRouter.route('/attachments/listTemplateCV').get(AttachmentsController.listTemplateCV);
    apiRouter.route('/attachments/createTemplateCV').post(AttachmentsController.createTemplateCV);
    apiRouter.route('/attachments/delete').delete(AttachmentsController.delete);
}
module.exports = attachmentsRoute;
