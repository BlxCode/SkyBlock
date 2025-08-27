TTimers={};{const k=c=>api.broadcastMessage(c,{color:"#ff9d87"}),s=TTimers;let m=1,l=0,f=0,T=0,o=1/0,a;setTickTimeout=(c,i=0)=>{const e=m++,t=l+i;if(s[e]=[c,t,T,0],T?s[T][3]=e:f=e,T=e,t<o&&(o=t),a=!0,!i){try{c()}catch(r){k("TTI: "+r)}clearTickTimeout(e)}return e},clearTickInterval=clearTickTimeout=c=>{const i=s[c];if(i){const e=i[2],t=i[3];e?s[e][3]=t:f=t,t?s[t][2]=e:T=e,delete s[c]}},setTickInterval=(c,i)=>{const e=setTickTimeout(c,i||=1);return s[e][4]=i,e},tick=(c,i)=>{if(i||++l>=o){a=!1;let e=1/0,t=f;for(;t;){const r=s[t];if(r[1]<=l){try{r[0]()}catch(n){k("TT: "+n)}if(r[4]){const n=l+r[4];r[1]=n,n<e&&(e=n)}else clearTickTimeout(t)}else r[1]<e&&(e=r[1]);t=r[3]}o=e,a&&tick(1,!0)}}} /* Props to _frostycaveman (discord) for making setTickTimeout!*/
function actuallyGeneratingTheIsland(nDN,nDN2){
  api.setBlockRect([nDN, -150, 429], [nDN2, -150, 424], "Bedrock");
  api.setBlockRect([nDN, -149, 429], [nDN2, -147, 424], "Dirt");
  api.setBlockRect([nDN, -146, 429], [nDN2, -146, 424], "Grass Block");
  api.setBlockRect([nDN - 3, -150, 426], [nDN2, -146, 424], "Air");
}
function generateIsland(id) {
    let nDN =
    Number(
      api.getStandardChestItemSlot([-346, 6, -433], 0).attributes
        .customDisplayName
    ) + 500;
  let nDN2 = nDN - 5;
  let awoefhd = String(nDN - 1);
  //le.log(awoefhd);
  //le.log(nDN2);
  api.setMoonstoneChestItemSlot(id, 1, "Dirt", 1, {
    customDisplayName: awoefhd,
  });
   api.setPosition(id, [
    Number(api.getMoonstoneChestItemSlot(id, 1).attributes.customDisplayName),
    -136,
    428,
  ]);
  api.clearInventory(id);
  api.giveItem(id, "Water Bucket");
  api.giveItem(id, "Lava Bucket");
  api.giveItem(id, "Bone Meal");  
  api.giveItem(id, "Protector");
  api.giveItem(id, "Maple Sapling");
    //le.log(nDN);
  //le.log(api.getMoonstoneChestItemSlot(id, 1));
  try{
    
    setTickTimeout(() => {
    actuallyGeneratingTheIsland(nDN,nDN2)
}, 10);
  }catch(stupidError){
  api.sendMessage(id,"There was an error while generating your island: " + stupidError+". Please use !resetEverything and try again.",{color:"red"});
  }
  if(api.getBlock(nDN, -150, 424)=='Bedrock'){
    api.sendMessage(id,"Island generated successfully!",{color:"green"});
  }else{
api.sendMessage(id,"There was an error generating your island. Please use !resetEverything to try again.",{color:"red"});
  }
  api.setStandardChestItemSlot([-346, 6, -433], 0, "Dirt", 1, undefined, {
    customDisplayName: awoefhd,
  });
  api.setPosition(id, [
    Number(api.getMoonstoneChestItemSlot(id, 1).attributes.customDisplayName),
    -136,
    428,
  ]);
}
function onPlayerJoin(id) {
  if (api.getMoonstoneChestItemSlot(id, 0) == null) {
    api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: "100",
    });
    api.sendMessage(
      id,
      "Welcome " +
        api.getEntityName(id) +
        " to this skyblock server! I see you're new here. To get started, first use the bone meal on the sapling, chop down the tree to collect some essential resources. Remember to regrow your tree! Next, in your hotbar, you should see a Water Bucket, and a Lava Bucket. Use them to create a messy stone generator by placing the water and lava in a 3x1x1 area. The liquids should be at opposite sides. Dont lose your lava to obsidian! Once you have some cobblestone, you can sell it, and start expanding your island. Good luck and have fun! \n Use !help to view all avaliable commands.",
      {}
    );
    generateIsland(id);
    api.sendMessage(
      id,
      "If you are falling to your death and you see an error, use !resetEverything to reset your island and hopefully fix the issue. If you are on a skyblock island please ignore this message."
    );
    return true;
  } else {
    api.sendMessage(id, "Welcome back " + api.getEntityName(id) + "! \n Use !help to see all avaliable commands", {});
  }
}
var resetConfirm = false;
var nDN;
function onPlayerChat(id, message) {
  if (message.startsWith("!")) {
    if (message == "!help") {
      api.sendMessage(
        id,
        "Here are some commands you can use:\n!resetEverything - Reset your island\n!help - Show this help message",
        {}
      );
    }
    if (message == "!resetEverything") {
        api.setPosition(id, [-346, 7, -433]);
      api.sendMessage(
        id,
        "Are you sure you want to reset everything? !y/!n",
        {}
      );
      resetConfirm = true;
    }
    if (message == "!y" && resetConfirm) {
       api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: "100",
    });
      api.sendMessage(id, "Resetting...", {});
      api.clearInventory(id);
      generateIsland(id);
    } else if (message == "!n" && resetConfirm) {
      api.sendMessage(id, "Reset canceled.", {});
      resetConfirm = false;
      api.setPosition(id, [-346, 3, -431]);
    }
    if(message == "!island"){
      api.sendMessage(id,"Teleporting...",{});
      api.setPosition(id, [-346, 3, -431]);
    }
    if (api.getEntityName(id) == "BloxdMasterYT_LT5") {
      if (message == "!help") {
        api.sendMessage(id, "!log !yell", {});
      }
      if (message.includes("!log")) {
        api.sendMessage(id,String(eval(message.replace("!log ", ""))), {});
      }
      if (message.includes("!yell")) {
        eval(
          api.broadcastMessage(message.replace("!yell ", ""), {
            color: "lightblue",
          })
        );
      }
    }
  } else {
    api.broadcastMessage([
      { str: api.getEntityName(id), style: { color: "lightblue" } },
      { str: ": ", style: { color: "lightblue" } },
      { str: message },
    ]);
  }
  return false;
}
// Called when player tries to go back to island
function onBlockStand(id, blockX, blockY, blockZ, blockName) {
  if (blockName == "Block of Emerald") {
    if (blockX == -346 && blockY == 2 && blockZ == -430)
      api.sendMessage(id, "Teleporting...", {});
    api.setPosition(id, [
      Number(
        api.getMoonstoneChestItemSlot(id, 1).attributes.customDisplayName
      ) + 1,
      -146,
      428,
    ]);
  }
}
