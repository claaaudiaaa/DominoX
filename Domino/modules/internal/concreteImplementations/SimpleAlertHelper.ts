/// <reference path="../Interfaces.ts"/>

module dominox
{
    export class SimpleAlertHelper implements dominox.AlertHelper
    {
        public displayOkAlertWithMessage(message: String, callbackWhenDone: dominox.VoidCallback)
        {
            alert(message);
            callbackWhenDone();
        }
    }
}