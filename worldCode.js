TTimers = {};
{
  const k = (c) => api.broadcastMessage(c, { color: "#ff9d87" }),
    s = TTimers;
  let m = 1,
    l = 0,
    f = 0,
    T = 0,
    o = 1 / 0,
    a;
  (setTickTimeout = (c, i = 0) => {
    const e = m++,
      t = l + i;
    if (
      ((s[e] = [c, t, T, 0]),
      T ? (s[T][3] = e) : (f = e),
      (T = e),
      t < o && (o = t),
      (a = !0),
      !i)
    ) {
      try {
        c();
      } catch (r) {
        k("TTI: " + r);
      }
      clearTickTimeout(e);
    }
    return e;
  }),
    (clearTickInterval = clearTickTimeout =
      (c) => {
        const i = s[c];
        if (i) {
          const e = i[2],
            t = i[3];
          e ? (s[e][3] = t) : (f = t), t ? (s[t][2] = e) : (T = e), delete s[c];
        }
      }),
    (setTickInterval = (c, i) => {
      const e = setTickTimeout(c, (i ||= 1));
      return (s[e][4] = i), e;
    }),
    (tick = (c, i) => {
      if (i || ++l >= o) {
        a = !1;
        let e = 1 / 0,
          t = f;
        for (; t; ) {
          const r = s[t];
          if (r[1] <= l) {
            try {
              r[0]();
            } catch (n) {
              k("TT: " + n);
            }
            if (r[4]) {
              const n = l + r[4];
              (r[1] = n), n < e && (e = n);
            } else clearTickTimeout(t);
          } else r[1] < e && (e = r[1]);
          t = r[3];
        }
        (o = e), a && tick(1, !0);
      }
    });
}
function styTxt(l) {
  let n = styTxt;
  if (
    (n.e ||
      ((n.e = {
        c: "color",
        w: "fontWeight",
        st: "fontStyle",
        s: "fontSize",
        o: "opacity",
      }),
      (n.t = /(\\\<)|<(st|[cworis]) *([^>]+)?>/g)),
    l == "")
  )
    return [""];
  const r = [],
    e = new Map();
  let t = "",
    c = 0;
  for (let { index: f, 0: u, 1: a, 2: o, 3: i } of [
    ...l.matchAll(n.t),
    { index: l.length },
  ]) {
    if (((t += l.slice(c, f)), (c = f + (u?.length ?? 0)), a)) {
      t += "<";
      continue;
    }
    if (
      (t &&
        (r.push(e.size ? { str: t, style: Object.fromEntries(e) } : t),
        (t = "")),
      f != l.length)
    )
      if (o == "r") e.clear();
      else if (o == "i" && i) {
        const s = Object.fromEntries(e);
        delete s.fontStyle, r.push({ icon: i, style: s });
      } else {
        let s = n.e[o];
        i ? e.set(s, o == "o" ? Number(i) : i) : e.delete(s);
      }
  }
  return r;
} /* Props to _frostycaveman (discord) for making setTickTimeout and customized custom text styling!*/
var valuableItems = {
  Gold_Antlers: 5500,
  Messy_Stone: 20,
  Gold_Watermelon_Slice: 300,
  Gold_Fragment: 200,
  Coal: 245,
  Raw_Iron: 650,
  Iron_Bar: 750,
  Gold_Bar: 1225,
  Raw_Gold: 1125,
  Diamond: 1350,
  Moonstone: 2300,
  Maple_Log: 100,
  Apple: 120,
  Raw_Porkchop: 250,
  Cooked_Porkchop: 350,
  Golem_Eye: 450,
  Raw_Beef: 300,
  Cooked_Beef: 400,
  Raw_Mutton: 350,
  Cooked_Mutton: 450,
  Leather: 500,
  Raw_Venison: 400,
  Cooked_Venison: 500,
  Fur: 550,
  Knight_Heart: 1000,
  Bone_Antlers: 600,
  Rice: 25,
  Fat_Cactus: 300,
  Dry_Fat_Cactus: 250,
  Cranberries: 55,
  Corn: 60,
  Cotton: 65,
  Chili_Pepper: 70,
  Wheat: 50,
  Watermelon: 65,
  Watermelon_Slice: 13,
  Melon: 75,
  Melon_Slice: 15,
  Pumpkin: 71,
};
function onInventoryUpdated(id) {
  updateUi(id);
}
function actuallyGeneratingTheIsland(nDN, nDN2) {
  api.setBlockRect([nDN, -150, 429], [nDN2, -150, 424], "Bedrock");
  api.setBlockRect([nDN, -149, 429], [nDN2, -147, 424], "Dirt");
  api.setBlockRect([nDN, -146, 429], [nDN2, -146, 424], "Grass Block");
  api.setBlockRect([nDN - 3, -150, 426], [nDN2, -146, 424], "Air");
}
function sell(id, mode) {
  let coins = Number(
    api.getMoonstoneChestItemSlot(id, 0).attributes.customDisplayName
  );
  let heldItem = api.getHeldItem(id);
  if (!heldItem) {
    api.sendMessage(id, "You're not holding anything!", {
      color: "red",
    });
    return;
  }
  let itemName = heldItem.name.replace(" ", "_");
  if (!valuableItems[itemName]) {
    api.sendMessage(id, "This item cannot be sold.", { color: "red" });
    return;
  }
  if (mode === "sell1Same") {
    api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: String(coins + valuableItems[itemName]),
    });
    api.playSound(id, "cashRegister", 1, 1, undefined);
    let slotIndex = api.getSelectedInventorySlotI(id);
    let slotItem = api.getItemSlot(id, slotIndex);
    api.removeItemName(id, heldItem.name, 1);
    api.sendMessage(
      id,
      `You sold 1 ${itemName} for $${valuableItems[itemName]} Note: The sold item can be from anywhere in your inventory.`,
      { color: "green" }
    );
  } else if (mode === "sellAllSame") {
    let slotIndex = api.getSelectedInventorySlotI(id);
    let slotItem = api.getItemSlot(id, slotIndex);
    let totalValue = valuableItems[itemName] * slotItem.amount;
    api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: String(coins + totalValue),
    });
    api.sendMessage(
      id,
      `You sold all ${itemName}(s) for $${totalValue} Note: The sold item can be from anywhere in your inventory.`,
      { color: "green" }
    );
    api.setItemSlot(id, slotIndex, "Air", 0, {}, true);
  }
  updateUi(id);
}
function updateUi(id) {
  api.setClientOptions(id, {
    RightInfoText: styTxt(
      `<w bold><s 20px>✨SkyBloxd🌎🌳\n <w><s><c gray><i wrench><c> Owner - BloxdMasterYT_LT5 \n <c yellow><i coins><c> Coins - $${
        api.getMoonstoneChestItemSlot(id, 0).attributes.customDisplayName
      }\n <i award> Level - ${
        api.getMoonstoneChestItemSlot(id, 2).attributes.customDisplayName
      } \n <s 10px>v1.00`
    ),
  });
  api.setTargetedPlayerSettingForEveryone(
    id,
    "nameTagInfo",
    {
      subtitle: [
        {
          str:
            "$" +
            api.getMoonstoneChestItemSlot(id, 0).attributes.customDisplayName,
        },
      ],
      subtitleBackgroundColor: "#4BE74F",
    },
    true
  );
}
function shop(id, item, price) {
  let coins = Number(
    api.getMoonstoneChestItemSlot(id, 0).attributes.customDisplayName
  );
  if (coins >= price) {
    api.playSound(id, "cashRegister", 1, 1, undefined);
    api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: String(coins - price),
    });
    api.giveItem(id, item);
    api.sendMessage(id, `You bought ${item} for $${price}`, { color: "green" });
    updateUi(id);
  } else {
    api.playSound(id, "beep", 1, 1, undefined);
    api.sendMessage(id, `ur too broke lol 💀`, {
      color: "red",
    });
  }
}
function gamble(id, price, min, max) {
  let coins = Number(
    api.getMoonstoneChestItemSlot(id, 0).attributes.customDisplayName
  );
  if (coins >= price) {
    api.playSound(id, "cashRegister", 1, 1, undefined);
    api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: String(coins - price),
    });
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    api.sendMessage(
      id,
      `You gambled and ${result > 0 ? "won" : "lost"} $${Math.abs(result)}`,
      {
        color: result > 0 ? "green" : "red",
      }
    );
    api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: String(coins - price + result),
    });
    updateUi(id);
  } else {
    api.playSound(id, "beep", 1, 1, undefined);
    api.sendMessage(id, `ur too broke lol 💀`, {
      color: "red",
    });
  }
}
function generateIsland(id) {
  let nDN =
    Number(
      api.getStandardChestItemSlot([-346, 6, -433], 0).attributes
        .customDisplayName
    ) + 512;
  let nDN2 = nDN - 5;
  let awoefhd = String(nDN - 1);

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
  try {
    setTickTimeout(() => {
      actuallyGeneratingTheIsland(nDN, nDN2);
    }, 10);
  } catch (stupidError) {
    api.sendMessage(
      id,
      "There was an error while generating your island: " +
        stupidError +
        ". Please use !resetEverything and try again.",
      { color: "red" }
    );
  }
  if (api.getBlock(nDN, -150, 429) == "Bedrock") {
    api.sendMessage(id, "Island generated successfully!", { color: "green" });
  } else {
    api.sendMessage(
      id,
      "There was an error generating your island. Please use !resetEverything to try again.",
      { color: "red" }
    );
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
    api.setPosition(id, -346.5, 8, -433.5);
    api.setMoonstoneChestItemSlot(id, 2, "Messy Stone", 1, {
      customDisplayName: "1",
    });
    api.setMoonstoneChestItemSlot(id, 3, "Messy Stone", 1, {
      customDisplayName: "1",
    });
    api.setMoonstoneChestItemSlot(id, 0, "Gold Coin", 1, {
      customDisplayName: "100",
    });
    api.sendMessage(
      id,
      "Welcome " +
        api.getEntityName(id) +
        " to this skyblock server! \n Use !help to view all avaliable commands.",
      {}
    );
    updateUi(id);
    setTickTimeout(() => {
      generateIsland(id);
    }, 100);

    return true;
  } else {
    api.sendMessage(
      id,
      "Welcome back " +
        api.getEntityName(id) +
        "! \n Use !help to see all avaliable commands",
      {}
    );
    updateUi(id);
  }
}
var resetConfirm = false;
var nDN;
function onPlayerChat(id, message) {
  if (message.startsWith("!")) {
    if (message == "!help") {
      api.sendMessage(
        id,
        "Here are some commands you can use:\n!island - Go to your island \n!resetEverything - Reset your island\n!sellables - Show sellable items\n!help - Show this help message",
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
    if (message == "!sellables") {
      api.sendMessage(
        id,
        "Here are the items you can sell:\n" +
          Object.keys(valuableItems)
            .map((item) => `${item}: $${valuableItems[item]}`)
            .join("\n"),
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
    if (message == "!island") {
      api.sendMessage(id, "Teleporting...", {});
      api.setPosition(id, [-346.5, 2, -431.5]);
    }
    if (api.getEntityName(id) == "BloxdMasterYT_LT5") {
      if (message == "!help") {
        api.sendMessage(id, "!log !yell", {});
      }
      if (message.includes("!log")) {
        api.sendMessage(id, String(eval(message.replace("!log ", ""))), {});
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
// Called when player steps on smth
function onBlockStand(id, blockX, blockY, blockZ, blockName) {
  if (blockName == "Block of Emerald") {
    api.sendMessage(id, "Teleporting...", {});
    api.setPosition(id, [
      Number(
        api.getMoonstoneChestItemSlot(id, 1).attributes.customDisplayName
      ) + 1,
      -146,
      428,
    ]);
  }
  if (blockName == "Beacon") {
    api.sendMessage(id, "Teleporting...", {});
    api.setPosition(id, [1000.5, -450, 1000.5]);
  }
}
function levelUp(id) {
  let currentLvl = api.getMoonstoneChestItemSlot(id, 2).attributes
    .customDisplayName;
  let currentXp = Number(
    api.getMoonstoneChestItemSlot(id, 3).attributes.customDisplayName
  );
  let newXp = currentXp + 1;
  if (currentXp == 100 * currentLvl) {
    api.setMoonstoneChestItemSlot(id, 2, "Messy Stone", 1, {
      customDisplayName: String(Number(currentLvl + 1)),
    });
    api.setMoonstoneChestItemSlot(id, 3, "Messy Stone", 1, {
      customDisplayName: "0",
    });
    api.sendMessage(
      id,
      "You leveled up to level " + Number(String(currentLvl + 1)) + "!",
      { color: "green" }
      
    );
    updateUi(id);
    return;
  }
  api.setMoonstoneChestItemSlot(id, 3, "Messy Stone", 1, {
    customDisplayName: String(newXp),
  });
}
function mSBR(id,x,y,z){
   let currentLvl = api.getMoonstoneChestItemSlot(id, 2).attributes
    .customDisplayName;
    let block;
    let chances =Math.round(Math.random()*currentLvl)
    let blocks = {'Messy Stone':0.8*currentLvl,'Coal Ore':0.1*currentLvl,'Iron Ore':0.05*currentLvl,'Gold Ore':0.03*currentLvl,'Diamond Ore':0.015*currentLvl,'Moonstone Ore':0.005*currentLvl}
if(blocks['Moonstone Ore']>chances){
  block = 'Moonstone Ore';
}else if(blocks['Diamond Ore']>chances){
api.setBlock(x,y,z,)
}else if(blocks['Gold Ore']>chances){
api.setBlock(x,y,z,)
}else if(blocks['Iron Ore']>chances){
api.setBlock(x,y,z,)
}else if(blocks['Coal Ore']>chances){
api.setBlock(x,y,z,)
}
}
onPlayerChangeBlock = (
  id,
  x,
  y,
  z,
  a,
  toBlock,
  e,
  i,
  o
) => {
  if (
    toBlock == "Lava" &&
    api.getBlock(x + 2, y, z) == "Water" &&
    api.getBlock(x + 1, y, z) == "Air"
  ) {
    api.setBlock(x + 1, y, z, "Messy Stone");
  }
  if (
    toBlock == "Lava" &&
    api.getBlock(x - 2, y, z) == "Water" &&
    api.getBlock(x - 1, y, z) == "Air"
  ) {
    api.setBlock(x - 1, y, z, "Messy Stone");
  }
  if (
    toBlock == "Lava" &&
    api.getBlock(x, y, z + 2) == "Water" &&
    api.getBlock(x, y, z + 1) == "Air"
  ) {
    api.setBlock(x, y, z + 1, "Messy Stone");
  }
  if (
    toBlock == "Lava" &&
    api.getBlock(x, y, z - 2) == "Water" &&
    api.getBlock(x, y, z - 1) == "Air"
  ) {
    api.setBlock(x, y, z - 1, "Messy Stone");
  }
  if (
    toBlock == "Water" &&
    api.getBlock(x + 2, y, z) == "Lava" &&
    api.getBlock(x + 1, y, z) == "Air"
  ) {
    api.setBlock(x + 1, y, z, "Messy Stone");
  }
  if (
    toBlock == "Water" &&
    api.getBlock(x - 2, y, z) == "Lava" &&
    api.getBlock(x - 1, y, z) == "Air"
  ) {
    api.setBlock(x - 1, y, z, "Messy Stone");
  }
  if (
    toBlock == "Water" &&
    api.getBlock(x, y, z + 2) == "Lava" &&
    api.getBlock(x, y, z + 1) == "Air"
  ) {
    api.setBlock(x, y, z + 1, "Messy Stone");
  }
  if (
    toBlock == "Water" &&
    api.getBlock(x, y, z - 2) == "Lava" &&
    api.getBlock(x, y, z - 1) == "Air"
  ) {
    api.setBlock(x, y, z - 1, "Messy Stone");
  }
  if (
    toBlock == "Air" &&
    api.getBlock(x - 1, y, z) == "Lava" &&
    api.getBlock(x + 1, y, z) == "Water"
  ) {
    mSBR(id,x,y,z);
    levelUp(id);
  }
  if (
    toBlock == "Air" &&
    api.getBlock(x + 1, y, z) == "Lava" &&
    api.getBlock(x - 1, y, z) == "Water"
  ) {
   mSBR(id,x,y,z);
    levelUp(id);
  }
  if (
    toBlock == "Air" &&
    api.getBlock(x, y, z + 1) == "Lava" &&
    api.getBlock(x, y, z - 1) == "Water"
  ) {
    levelUp(id);
    mSBR(id,x,y,z);
  }
  if (
    toBlock == "Air" &&
    api.getBlock(x, y, z - 1) == "Lava" &&
    api.getBlock(x, y, z + 1) == "Water"
  ) {
    mSBR(id,x,y,z);
    levelUp(id);
  }
};
onWorldSpawnMob = (mobId, mobType, x, y, z, mobHerdId, playSoundOnSpawn) => {
  api.setMobSetting(mobId, "baseWalkingSpeed", 0);
  api.setMobSetting(mobId, "baseRunningSpeed", 0);
  api.setMobSetting(mobId, "walkingSpeedMultiplier", 0);
  api.setMobSetting(mobId, "runningSpeedMultiplier", 0);
  api.setMobSetting(mobId, "jumpMultiplier", 0);
  api.setMobSetting(mobId, "attackInterval", 1e9);
  api.setMobSetting(mobId, "attackDamage", 0);
  api.setMobSetting(mobId, "hostilityRadius", 0);
  api.setMobSetting(mobId, "attackImpulse", 0);
  api.setMobSetting(mobId, "secondaryAttackImpulse", 0);
  api.setMobSetting(mobId, "secondaryAttackDamage", 0);
};
