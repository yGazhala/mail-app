'use strict';

let mailBoxComponent = {
    bindings: {},
    template: `<section ng-if="$ctrl.operationResult" class="mailBox_operationResultContainer">
                   <div>{{$ctrl.operationResult}}</div>
               </section>
               <ui-view></ui-view>`,
    controller: MailBoxController
};

function MailBoxController(MailDataService, $timeout) {
    this.operationResult = 'Your message has been moved to sent mail';

    this.showOperationResult = function(message) {
        this.operationResult = message;

        // Hide the message after timeout
        $timeout(() => this.operationResult = null, 8000);
    };

    this.moveMessageToTrash = function(message) {

        return MailDataService.removeMessage(message)
            .then(() => MailDataService.addMessageToTrash(message));
    };

    this.moveMessageToOriginalBox = function(message) {

        return MailDataService.removeMessageFromTrash(message)
            .then(() => MailDataService.addMessage(message));
    };
}

export default mailBoxComponent;