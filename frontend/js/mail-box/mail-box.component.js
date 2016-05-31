'use strict';

let mailBoxComponent = {
    bindings: {},
    template: `<section ng-if="$ctrl.statusMessage" class="mailBox_statusMessageContainer">
                   <div>{{$ctrl.statusMessage}}</div>
               </section>
               <ui-view></ui-view>`,
    controller: MailBoxController
};

/*@ngInject*/
function MailBoxController(MailDataService, $timeout) {
    this.statusMessage = null;

    this.showStatusMessage = function(message) {
        this.statusMessage = message;

        // Hide the message after timeout
        $timeout(() => this.statusMessage = null, 5000);
    };

    this.moveMessageToTrash = function(message) {

        return MailDataService.removeMessage(message)
            .then(MailDataService.addMessageToTrash(message))
            .then(this.showStatusMessage('The message has been moved to the Trash'));
    };

    this.moveMessageToOriginalBox = function(message) {

        return MailDataService.removeMessageFromTrash(message)
            .then(MailDataService.addMessage(message))
            .then(this.showStatusMessage('The message has been restored'));
    };
}

export default mailBoxComponent;