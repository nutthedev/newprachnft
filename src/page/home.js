import { CA_NFTs, CA_ROUTER } from "../componants/contract";
import { box, delay, getChainRPC, chain, shortAddress } from "../componants/walletconnect";

import { postAPI } from "../componants/request";

window.mintNFT = async () => {
    try {
        await mintNFT();
    } catch (error) {
        console.error(error);
    }
};

async function mintNFT() {
    console.log("Waiting Signed Tx...");

    const wallet = await box.getCurrentState();

    const data = {
        "types": {
            "EIP712Domain": [
                { "name": "name", "type": "string" },
                { "name": "version", "type": "string" },
                { "name": "chainId", "type": "uint256" },
                { "name": "verifyingContract", "type": "address" }
            ],
            "mintExt": [
                { "name": "to", "type": "address" },
            ]
        },
        domain: {
            name: 'PrachApp',
            version: String(1),
            chainId: String(56),
            verifyingContract: String(CA_ROUTER.address)
        },
        primaryType: "mintExt",
        message: {
            to: wallet.address
        }
    }

    const signature = await box.signEIP712(data);

    const r = "0x" + signature.slice(2, 66);
    const s = "0x" + signature.slice(66, 130);
    const v = parseInt(signature.slice(130, 132), 16);

    const signedTx = { ...data.message, v, r, s };
    console.log(signedTx);

    console.log("Waiting Transaction Send...");

    const validator = 'https://api.bluewolfchain.com';
    const permiTransfer = await postAPI(validator + '/testmint', { signedTx });
    
    if (permiTransfer.error) { throw Error(permiTransfer.error); }

    console.log("Transaction Submit!");
}

function renderHome(params) {
    console.log({ params });

    const shortWalletAddress = shortAddress(params.address);

    const app = document.querySelector('#content');
    app.innerHTML = /*html*/`
        <h1>Home Page</h1>
        <hr>
        <h2>Account: ${shortWalletAddress}</h2>
        <h2>NFTs Holding: ${params.balance}</h2>
        <h2>Metal: ${params.totalAsset.metal}</h2>
        <h2>Gear: ${params.totalAsset.gear}</h2>
        <hr>
        <button class="button-primary" onclick="mintNFT()">Mint New</button>
    `;
}

export async function loadHome() {
    await delay(700);

    const wallet = await box.getCurrentState();
    const account = wallet?.address || box.ZERO;

    const nft = await box.createWeb3Contract(CA_NFTs, getChainRPC(chain.gnosis));
    const router = await box.createWeb3Contract(CA_ROUTER, getChainRPC(chain.gnosis));

    const [ balance, totalAsset ] = await Promise.all([
        nft.methods.balanceOf(account).call(),
        router.methods.getAccountTotalAsset(account).call()
    ]);

    const dataToRender = {
        address: wallet.address,
        balance: balance,
        totalAsset
    }

    renderHome(dataToRender);
}