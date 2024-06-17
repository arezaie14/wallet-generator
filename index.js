// Import necessary libraries
const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");
const { Web3 } = require("web3");
const fs = require("fs"); // File system module

// Connect to the Binance Smart Chain
const web3 = new Web3("https://bsc-dataseed.binance.org/");

// Function to generate a wallet
const generateWallet = async () => {
  //   const wallets = [];
  const mnemonic = bip39.generateMnemonic();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdWallet = hdkey.fromMasterSeed(seed);

  fs.appendFileSync(
    "./wallets.txt",
    `Mnemonic: ${mnemonic}\n-----------------------------------\n`
  );

  for (let i = 0; i < 500000; i++) {
    const key = hdWallet.derivePath(`m/44'/60'/0'/0/${i}`);
    const wallet = key.getWallet();
    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();

    const walletData = `WalletNum:${i}\nAddress: ${address}\nPrivate Key: ${privateKey}\n-----------------------------------\n`;
    fs.appendFileSync("./wallets.txt", walletData);
    // wallets.push({ number: i, address, privateKey });
  }
  //   return { wallets, mnemonic };
};

// async function saveToFile(wallets, mnemonic) {
//   wallets.map((wallet) => {});
//   console.log("Wallets have been saved to wallets.txt");
// }
generateWallet().then(({ wallets, mnemonic }) => {
  //   saveToFile(wallets, mnemonic);
});

// Generate wallets and output the details
