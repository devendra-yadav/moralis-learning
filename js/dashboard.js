
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
    }else{
      transferERC20Crypto(cryptoType,amountValue, address)
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

async function transferERC20Crypto(cryptoType, amountValue, receiverAddress){
  console.log(`ERC20 token came: ${cryptoType} ${amountValue} ${receiverAddress}`)
}

//logout
async function logout(){
  await Moralis.User.logOut();
  document.getElementById("btn-metamask-connect").hidden="";
  document.getElementById("btn-logout").hidden="hidden";
  document.getElementById("wallet-address").hidden="hidden";
  document.getElementById("wallet-address").innerHTML="";
}

//add the onclick function to the login/logout buttons
document.getElementById("btn-metamask-connect").onclick=login;
document.getElementById("btn-logout").onclick=logout;
document.getElementById("btn-send-crypto").onclick=transferCrypto;


//Old bootstrap code
(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

 
})()
