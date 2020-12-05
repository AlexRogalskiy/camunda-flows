
let messagesMap = new Map([
    ["signals.startFlow", "Start"],
    ["signals.stepForward", "Next"],
    ["signals.resolved", "Resolved"],
    ["signals.notResolved", "Not Resolved"],
    ["signals.quitFlow", "Quit Flow"],
    ["signals.terminateFlow", "Terminate Flow"],
    ["signals.submitRequest", "Submit Request"],
    ["signals.GoToProcessTransfer", "To Sub-Process"],
    ["signals.GoToSubTransfer", "To Sub-Flow"],
    ["common.processCompleted", "Process completed."],
    ["noInternet", "No Internet"],
    ["slowSpeedIssue", "slowSpeedIssue"],
    ["wifiSettings", "wifiSettings"],
    ["broadcastIssue", "broadcastIssue"],
    ["loginIssue", "loginIssue"],
    ["remoteControllerIssue", "remoteControllerIssue"],
    ["diagram1", "Sample Flow"]
]); 

export const get = (message:string) => {
    let resultMessage = messagesMap.get(message);
    if(resultMessage !== null && resultMessage !== undefined){
       return resultMessage;
    }
    return message;
}