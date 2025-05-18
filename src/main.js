import './css/main.css';
import './componants/walletconnect';

import { navbar } from './ui';
import { loadHome } from './page/home';
import { loadNFT } from './page/nft';

const app = document.querySelector('#app');

app.innerHTML = /*html*/`
  ${navbar}
  <div id="content"></div>
`;

const path = window.location.pathname;

if (path == `/`) { loadHome(); }
if (path == `/nft`) { loadNFT(); }