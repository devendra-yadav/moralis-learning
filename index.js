
const serverUrl="https://a0powj1kc1ts.usemoralis.com:2053/server";
const appId="ddH7sF6jHF8CmBwfzY9wZiVOGA6DxfIuQ0eSeVEd";

Moralis.start({serverUrl,appId});


async function login(){
    try{

        let user=await Moralis.User.current();
        if(!user){
            let user=await Moralis.User.current();
            let options={
                signingMessage: "Login using Metamask (Moralis learning)."
            }
            user=await Moralis.authenticate(options)
            console.log("USer logged in : "+user.get("ethAddress"));
            document.getElementById("header-eth-address").innerHTML="ETH ADDRESS : "+user.get("ethAddress")
           
        }else{
            console.log("Already logged in "+user.get("ethAddress"));
            document.getElementById("header-eth-address").innerHTML="ETH ADDRESS : "+user.get("ethAddress")
        }
        document.getElementById("login-options").hidden="hidden";
        document.getElementById("logged-in-body").hidden="";
    }catch(error){
        console.log(error)
    }
}

async function loginWalletConnect(){
    try{

        let user=await Moralis.User.current();
        if(!user){
            let user=await Moralis.User.current();
            let options={
                provider: "walletconnect",
                chainId: 56
            }
            user=await Moralis.authenticate(options)
            console.log("USer logged in : "+user.get("ethAddress"));
            document.getElementById("header-eth-address").innerHTML="ETH ADDRESS : "+user.get("ethAddress")
            
        }else{
            console.log("Already logged in "+user.get("ethAddress"));
            
        }
        document.getElementById("login-options").hidden="hidden";
        document.getElementById("logged-in-body").hidden="";
    }catch(error){
        console.log(error)
    }

}

async function logout(){
    await Moralis.User.logOut();
    console.log("logged out ");
    
    document.getElementById("login-options").hidden="";
    document.getElementById("logged-in-body").hidden="hidden";
    
}

async function checkUser(){
    let user=await Moralis.User.current();
    if(!user){
        document.getElementById("login-options").hidden="";
        document.getElementById("logged-in-body").hidden="hidden";
    }else{
        document.getElementById("login-options").hidden="hidden";
        document.getElementById("logged-in-body").hidden="";
    }
}

document.getElementById("btn-login").onclick=login;
document.getElementById("btn-login-wallet-connect").onclick=loginWalletConnect;
document.getElementById("btn-logout").onclick=logout;
