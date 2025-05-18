import '../css/holding.css';

import { CA_NFTs } from "../componants/contract";
import { box, delay, getChainRPC, chain, shortAddress } from "../componants/walletconnect";

function getNftNameFromHash(hash) {
    const percentage = (hash % 10000n) / 100n;

    if (percentage < 100/7) {
        return "Space Jamer";
    } else if (percentage < 100/6) {
        return "Booster Gear";
    } else if (percentage < 100/5) {
        return "Shock Absorber";
    } else if (percentage < 100/4) {
        return "Plasma Core";
    } else if (percentage < 100/3) {
        return "Red Order";
    } else if (percentage < 100/2) {
        return "Refine Gear";
    } else if (percentage < 100/1) {
        return "Relic รูปประแจ";
    }
}

function renderNFTsContent(params) {
    return /*html*/`
        <div class="nftcard">
            <span>#ID ${params.id}</span>
            <img src="/nft.png" class="">
            <br>
            <span style="text-align: start">Minter: ${shortAddress(params.minter)}</span>
            <span style="text-align: start"># ${getNftNameFromHash(params.hash)}</span>
            <br>
        </div>
    `;
}

function renderNFTs(params) {
    console.log({ params });

    const app = document.querySelector('#content');
    app.innerHTML = /*html*/`
        <h1>NFTs Page</h1>
        <hr>
        <div id="nftList"></div>
    `;

    params.forEach(element => {
        const list = document.querySelector('#nftList');
        list.innerHTML += renderNFTsContent(element);
    });
}

export async function loadNFT() {
    await delay(700);

    const wallet = await box.getCurrentState();
    const account = wallet?.address || box.ZERO;

    const nft = await box.createWeb3Contract(CA_NFTs, getChainRPC(chain.gnosis));

    const [ ownerNfts ] = await Promise.all([
        nft.methods.getOwnerNfts(account).call()
    ]);

    renderNFTs(ownerNfts);
}