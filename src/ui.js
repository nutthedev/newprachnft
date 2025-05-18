import logo from '/logo.png';

const appLinks = /*html*/`
  <a target="_self" href="/">Home</a>
  <a target="_self" href="/nft">NFT</a>
`;

export const navbar = /*html*/`
  <nav>
    <div class="title">
      <img src="${logo}" class="logo">
      <div class="menu">
        ${appLinks}
      </div>
    </div>
    <div>
      <appKit-button balance="false"></appKit-button>
    </div>
  </nav>
`;