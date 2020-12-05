import TreeNode from "primereact/components/treenode/TreeNode";

export const workflowTreeList:TreeNode [] = [
    {
        key: "internetIssues",
        label: "Internet Issues",
        data: "category",
        children: [
            {
                key: "noInternet",
                label: "No Internet",
                data: "subcategory",
                children:[]
            },
            {
                key: "slowSpeedIssue",
                label: "Slow Speed",
                data: "subcategory",
                children:[]
            },
            {
                key: "wifiSettings",
                label: "Wifi Settings",
                data: "subcategory",
                children:[]
            }
        ]
    },
    {
        key: "tvIssues",
        label: "TV Issues",
        data: "category",
        children: [
            {
                key: "broadcastIssue",
                label: "Broadcast Issue",
                data: "subcategory",
                children:[]
            },
            {
                key: "loginIssue",
                label: "Login Issue",
                data: "subcategory",
                children:[]
            },
            {
                key: "remoteControllerIssue",
                label: "Remote Controller Issue",
                data: "subcategory",
                children:[]
            }
        ]
    },
    {
        key: "diagram1",
        label: "Sample Flow",
        data: "category",
        children:[]
    }
];