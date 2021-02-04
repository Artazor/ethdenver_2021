const JsonRpc = require("node-jsonrpc-client");

const rpcClient = new JsonRpc("http://ethdenver.parsiq.net:8549");
const contractAddress = '0x384BFB7Db2e58c02DD68c8d584bA639FE4308704';

rpcClient.call('eth_parsiqContractInfoByAddress', [contractAddress]).then(
    function success(result) {
        console.log("contractInfo:", JSON.stringify(result, null, 8));
        if (result.result.length > 0) {
            let resp = result.result[0];
            getContractData("deploymentCode", resp.deploymentCodeHash);
            getContractData("deployedCode", resp.deployedCodeHash);
        }
    },
    function failure(err) {
        console.error("Error code " + err.code + ": " + err.message);
    }
);

function getContractData(name, contractHash) {
    rpcClient.call('eth_parsiqContractDataByHash', [contractHash]).then(
        function success(result) {
            console.log(name + " First(100)bytes:", JSON.stringify(result.result.substring(0, 100), null, 8) + "...");
        },
        function failure(err) {
            console.error("Error code " + err.code + ": " + err.message);
        }
    );
}
