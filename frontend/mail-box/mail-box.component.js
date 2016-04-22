'use strict';

let mailBoxComponent = {
    bindings: {},
    template: '<ui-view></ui-view>',
    controller: MailBoxController
};

function MailBoxController(MailDataService) {

    this.moveMessageToTrash = function(message) {

        return MailDataService.removeMessage(message)
            .then(() => MailDataService.addMessageToTrash(message));
    };

    this.moveMessageToOriginalBox = function(message) {

        return MailDataService.removeMessageFromTrash(message)
            .then(() => MailDataService.addMessage(message));
    }
}

export default mailBoxComponent;