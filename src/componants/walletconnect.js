import { kitbox, chain, utils } from "kitbox";

const projectId = import.meta.env.VITE_ProjectId;

const box = new kitbox();
const modal = box.createModal(projectId, [ chain.bsc ], 'dark', "#646cff");
const { shortAddress, formNumber, timestampToUTC, delay } = utils;

export function getChainMulticallAddress(network) {
    return network.contracts.multicall3.address;
}

export function getChainRPC(network) {
    return network.rpcUrls.default.http[0]
}

export function getChainExplorer(network) {
    return network.blockExplorers.default.url
}

export { box, modal, chain, shortAddress, formNumber, timestampToUTC, delay }