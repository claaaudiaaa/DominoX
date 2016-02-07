/// <reference path="../Interfaces.ts"/>
var dominox;
(function (dominox) {
    var SimpleAlertHelper = (function () {
        function SimpleAlertHelper() {
        }
        SimpleAlertHelper.prototype.displayOkAlertWithMessage = function (message, callbackWhenDone) {
            alert(message);
            callbackWhenDone();
        };
        return SimpleAlertHelper;
    })();
    dominox.SimpleAlertHelper = SimpleAlertHelper;
})(dominox || (dominox = {}));
//# sourceMappingURL=SimpleAlertHelper.js.map