
//Initialize Moralis.
(async function(){
  const serverUrl="https://a0powj1kc1ts.usemoralis.com:2053/server";
  const appId="ddH7sF6jHF8CmBwfzY9wZiVOGA6DxfIuQ0eSeVEd";
  await Moralis.start({serverUrl, appId});
  console.log("Moralis initated")

  const user=await Moralis.User.current();
 
  if(typeof user === "undefined"){
    document.getElementById("btn-metamask-connect").hidden="";
    document.getElementById("btn-logout").hidden="hidden";
    document.getElementById("wallet-address").hidden="hidden";
  }else{
    
    await Moralis.enableWeb3()
    console.log("User "+user.attributes.ethAddress)
    document.getElementById("btn-metamask-connect").hidden="hidden";
    document.getElementById("btn-logout").hidden="";
    
    document.getElementById("wallet-address").innerHTML="WalletAddress : "+user.attributes.ethAddress;
    document.getElementById("wallet-address").hidden="";
  }

})()

//login
async function login(){
  const user=await Moralis.authenticate();
  document.getElementById("btn-metamask-connect").hidden="hidden";
  document.getElementById("btn-logout").hidden="";
  document.getElementById("wallet-address").innerHTML="WalletAddress : "+user.attributes.ethAddress;
  document.getElementById("wallet-address").hidden="";
}

//Transfer native tokens
async function transferCrypto(){
  document.getElementById("crypto-transfer-success").hidden="hidden";
  document.getElementById("crypto-transfer-failure").hidden="hidden";
  document.getElementById("processing-crypto-transfer").hidden="hidden";
  document.getElementById("crpto-transfer-failure-message").hidden="hidden";
  


  const amountValue=document.getElementById("crypto-amount-to-send").value;
  const address=document.getElementById("receiver-address").value;
  const cryptoType=document.getElementById("crypto-type").value;
  console.log(`${cryptoType} ${amountValue} to send to ${address}`)
  document.getElementById("processing-crypto-transfer").hidden="";
  let amount;

  
  try{

    if(cryptoType === "ETH"){
      amount=Moralis.Units.ETH(amountValue)
    }else if(cryptoType === "BNB"){
      amount=Moralis.Units.BNB(amountValue)
    }else if(cryptoType === "MATIC"){
      amount=Moralis.Units.MATIC(amountValue)
    }
  
    const options = {
      type: "native",
      amount: amount,
      receiver: address,
    };
    let result = await Moralis.transfer(options);
    document.getElementById("crypto-transfer-success").hidden="";

  }catch(error){
    console.log("Error transferring crypto. "+error);
    document.getElementById("crypto-transfer-failure").hidden="";
    document.getElementById("crpto-transfer-failure-message").innerHTML=error;
    document.getElementById("crpto-transfer-failure-message").hidden="";
  }
  
  document.getElementById("processing-crypto-transfer").hidden="hidden";
}

//transfer ERC20 tokens
async function transferERC20Crypto(){
  document.getElementById("erc20-crypto-transfer-success").hidden="hidden";
  document.getElementById("erc20-crypto-transfer-failure").hidden="hidden";
  document.getElementById("erc20-processing-crypto-transfer").hidden="hidden";
  document.getElementById("erc20-crpto-transfer-failure-message").hidden="hidden";
  


  const amountValue=document.getElementById("erc20-crypto-amount-to-send").value;
  const address=document.getElementById("erc20-receiver-address").value;
  const cryptoType=document.getElementById("erc20-crypto-type").value;
  console.log(`${cryptoType} ${amountValue} to send to ${address}`)
  document.getElementById("erc20-processing-crypto-transfer").hidden="";
  let amount;

  
  try{

    if(cryptoType === "AYT"){
      amount=Moralis.Units.Token(amountValue,"18")
      contractAddress="0x31331D61F2049cB51262EC0D6061321D96C52376";
    }else if(cryptoType === "AMD"){
      amount=Moralis.Units.Token(amountValue,"18")
      contractAddress="0x2CCA4ebB77781D59c5A0E58d204eC53c4e9D7520";
    }
  
    const options = {
      type: "erc20",
      amount: amount,
      receiver: address,
      contractAddress: contractAddress
    };
    let result = await Moralis.transfer(options);
    document.getElementById("erc20-crypto-transfer-success").hidden="";

  }catch(error){
    console.log("Error transferring crypto. "+error);
    document.getElementById("erc20-crypto-transfer-failure").hidden="";
    document.getElementById("erc20-crpto-transfer-failure-message").innerHTML=error;
    document.getElementById("erc20-crpto-transfer-failure-message").hidden="";
  }
  
  document.getElementById("erc20-processing-crypto-transfer").hidden="hidden";
}


//Search a transaction hash on a blockchain
async function searchTransaction(){

  document.getElementById("processing-search-transaction").hidden="";
  document.getElementById("search-transaction-success").hidden="hidden";
  document.getElementById("search-transaction-failure").hidden="hidden";


  const blockChainType = document.getElementById("blockchain-type").value;
  const transactionHash = document.getElementById("transaction-hash").value;

  try{
    const options = {
      chain: blockChainType,
      transaction_hash: transactionHash
    }

    const transactionData=await Moralis.Web3API.native.getTransaction(options);

    console.log("Data "+JSON.stringify(transactionData, null, '\t'))
    document.getElementById("search-transaction-success").innerHTML="<pre>"+JSON.stringify(transactionData, null, 2)+"</pre>";

    document.getElementById("processing-search-transaction").hidden="hidden";
    document.getElementById("search-transaction-success").hidden="";

  }catch(error){
    console.log(error);
    document.getElementById("processing-search-transaction").hidden="hidden";
    document.getElementById("search-transaction-failure-message").innerHTML=error;
    document.getElementById('search-transaction-failure').hidden="";
  }

}


//logout
async function logout(){
  await Moralis.User.logOut();
  document.getElementById("btn-metamask-connect").hidden="";
  document.getElementById("btn-logout").hidden="hidden";
  document.getElementById("wallet-address").hidden="hidden";
  document.getElementById("wallet-address").innerHTML="";
}

//show erc20 token send form
async function showErc20transferTokenForm(){
  //send-native-tokens
  document.getElementById("send-native-tokens").hidden="hidden";
  document.getElementById("send-erc20-tokens").hidden="";
  document.getElementById("search-transaction").hidden="hidden";
}

async function showNativetransferTokenForm(){
  document.getElementById("send-native-tokens").hidden="";
  document.getElementById("send-erc20-tokens").hidden="hidden";
  document.getElementById("search-transaction").hidden="hidden";
}


async function showSearchTransactionForm(){
  document.getElementById("search-transaction").hidden="";
  document.getElementById("send-native-tokens").hidden="hidden";
  document.getElementById("send-erc20-tokens").hidden="hidden";
}

//add the onclick function to the login/logout buttons
document.getElementById("btn-metamask-connect").onclick=login;
document.getElementById("btn-logout").onclick=logout;
document.getElementById("btn-send-crypto").onclick=transferCrypto;
document.getElementById("show-form-send-erc20-tokens").onclick=showErc20transferTokenForm;
document.getElementById("show-form-send-native-tokens").onclick=showNativetransferTokenForm;
document.getElementById("erc20-btn-send-crypto").onclick=transferERC20Crypto;
document.getElementById("show-form-search-transaction").onclick=showSearchTransactionForm;

document.getElementById("btn-search-transaction").onclick=searchTransaction;


//Old bootstrap code
(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

 
})()
