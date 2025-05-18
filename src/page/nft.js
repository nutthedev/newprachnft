import '../css/holding.css';

import { CA_NFTs } from "../componants/contract";
import { box, delay, getChainRPC, chain } from "../componants/walletconnect";

function renderNFTsContent(params) {
    return /*html*/`
        <div class="nftcard">
            <span>#ID 0</span>
            <img src="/nft.png" class="">
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