# SkyBloxd Server Script

This project contains the main JavaScript code for a Skyblock-style game mode in Bloxd.io. The script handles custom island generation, economy features, item selling, shops, leveling, and gameplay events.

# Features
## ⛏ Gameplay

Island Generation – Players automatically get their own floating island when joining.

Cobblestone Generator (Messy Stone) – Lava + water interactions generate ores based on player level.

Leveling System – Breaking generated ores increases XP; levels unlock higher ore chances.

Custom Mob Spawns – Neutralizes mobs (zero speed, no damage).

## 💰 Economy

Valuable Items – Predefined list of items that can be sold for coins.

Selling System –

sell1Same: Sell one of the held item.

sellAllSame: Sell all of the held item from inventory.

Shop – Players can buy items if they have enough coins.

Gambling – Random chance to win or lose coins.

## 🧑 Player Interaction

Custom UI – Displays owner info, coins, and level in a styled right-hand panel.

Welcome Messages – New and returning players get unique messages.

### Chat Commands –

!help – Show all commands.

!island – Teleport to your island.

!resetEverything – Reset island & inventory.

!sellables – Show list of sellable items.

!xp – Show current XP and level progress.

### 🛠 Admin Commands (Owner Only)

!log <expr> – Evaluates JavaScript expression and prints result.

!yell <msg> – Broadcasts a message to all players.

## How It Works

Tick System (setTickTimeout, setTickInterval, tick) – Custom timer implementation for delayed/repeated events. (Made By _frostycaveman (discord))

Styling System (styTxt) – Parses inline tags for styled in-game text. (Made By _frostycaveman (discord))

Event Hooks – Responds to onPlayerJoin, onPlayerChat, onInventoryUpdated, onBlockStand, onPlayerChangeBlock, and onWorldSpawnMob.

## Setup

Copy the script into your Bloxd.io world’s worldCode.js file.

Save and restart the world.

Players joining the world will automatically be assigned their island and starter kit.

## Notes

Owner Username is set as BloxdMasterYT_LT5. Change it in the code if you want a different admin.

This code was minified for performance — a formatted version is recommended if you plan to extend it.

All console logs and comments were removed in this build.
