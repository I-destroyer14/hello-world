var gameData = {
    beans: 0,
    previousBeans: 0,
    beansPerClick: 1,
    Upgrade1Cost: 10,
    Gen1Cost: 100,
    Gen1: 0,
    Gen1Mult: 10
    }
var unlocks = {
    boolean clickUpgrade: False
}
function getBeans() {
    gameData.beans += gameData.beansPerClick
    document.getElementById("beansCollected").innerHTML = gameData.beans + " beans collected"
    }
function buybeansPerClick() {
    if (gameData.beans >= gameData.Upgrade1Cost) {
      gameData.beans -= gameData.Upgrade1Cost
      gameData.beansPerClick += 1
      gameData.Upgrade1Cost *= 2
      document.getElementById("beansCollected").innerHTML = gameData.beans + " Beans Collected"
      document.getElementById("perClickUpgrade").innerHTML = "Increase beans per click (Currently " + gameData.beansPerClick + ") Cost: " + gameData.Upgrade1Cost
    }
  }
function BuyGen1() {
  if (gameData.beans >= gameData.Gen1Cost) {
    gameData.beans -= gameData.Gen1Cost
    gameData.Gen1 += 1
    gameData.Gen1Cost += 10
    document.getElementById("beansCollected").innerHTML = gameData.beans + " Beans Collected"
    document.getElementById("BuyGen1Button").innerHTML = "Buy a genarator that makes beans (Currently " + gameData.Gen1 + ") Cost: " + gameData.Gen1Cost + " beans"
  }
}
function GenTick() {
  gameData.beans += gameData.Gen1 * gameData.Gen1Mult
  document.getElementById("beansCollected").innerHTML = gameData.beans + " beans collected"
}
function Unlocker() {
    if gameData.beans != gameData.previousBeans {
        if gameData.beans >= 10 && unlocks.clickUpgrade == False {
            unlocks.clickUpgrade = True
            document.GetElementById("perClickUpgrade");
            perClickUpgrade.classList.remove('hidden');
        }
    }
}
            
var mainGameLoop = window.setInterval(function() {
    GenTick();
    Unlocker()
  }, 1000)
