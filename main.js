var gameData = {
    beans: 0,
    previousBeans: 0,
    beansPerClick: 1,
    Upgrade1Cost: 10,
    Gen1Cost: 100,
    Gen1: 0,
    SelfBought1: 0,
    Gen1Mult: 10,
    Gen2Cost: 1000,
    Gen2: 0,
    SelfBought2: 0,
    Gen2Mult: 1,
    }
var unlocks = {
    ClickUpgrade1: false,
    Gen1Buy: false,
    Gen2Buy: false,
    Gen3Buy: false,
    Shop: false,
    Upgrades: false
}
function genCalc(gen) {

}
function formatNumber(num) {
  if (num%1 == 0) {
    return num >= 1e9 ? num.toExponential(2) : num
  }else {
    return num >= 1e9 ? num.toExponential(2) : num.toFixed(2);
  }
}
function getBeans() {
    gameData.beans += gameData.beansPerClick
    document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " beans collected"
    }
function buybeansPerClick() {
    if (gameData.beans >= gameData.Upgrade1Cost) {
      gameData.beans -= gameData.Upgrade1Cost
      gameData.beansPerClick += 1
      gameData.Upgrade1Cost *= 2
      document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans Collected"
      document.getElementById("perClickUpgrade").innerHTML = "Increase beans per click (Currently " + gameData.beansPerClick + ") Cost: " + formatNumber(gameData.Upgrade1Cost)
    }
  }
function BuyGen1() {
  if (gameData.beans >= gameData.Gen1Cost) {
    gameData.beans -= gameData.Gen1Cost
    gameData.Gen1 += 1
    gameData.Gen1Cost += 10
    document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans Collected"
    document.getElementById("BuyGen1Button").innerHTML = "Cost: " + formatNumber(gameData.Gen1Cost) + " beans"
    document.getElementById("Gen1").innerHTML = "Bean Generators: " + formatNumber(gameData.Gen1)
  }
}
function BuyGen2() {
  if (gameData.beans >= gameData.Gen2Cost) {
    gameData.beans -= gameData.Gen2Cost
    gameData.Gen2 += 1
    gameData.Gen2Cost *= 1.75
    document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans Collected"
    document.getElementById("BuyGen2Button").innerHTML = "Cost: " + formatNumber(gameData.Gen2Cost) + " beans"
    document.getElementById("Gen2").innerHTML = "Bean Factories: " + formatNumber(gameData.Gen2)
  }
}
function GenTick() {
  gameData.beans += gameData.Gen1 * gameData.Gen1Mult / 10
  gameData.Gen1 += gameData.Gen2 * gameData.Gen2Mult / 10
  document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " beans collected"
  document.getElementById("Gen1").innerHTML = "Bean Generators: " + formatNumber(gameData.Gen1)
  document.getElementById("Gen2").innerHTML = "Bean Factories: " + formatNumber(gameData.Gen2)
}
function unlock() {
  if (gameData.beans != gameData.previousBeans) {
    gameData.previousBeans = gameData.beans
    if (gameData.beans >= 10 && !unlocks.ClickUpgrade1){
      document.getElementById("perClickUpgrade").classList.remove('hidden')
      unlocks.ClickUpgrade1 = true
    }
    if (gameData.beans >= 100 && !unlocks.Gen1Buy){
      document.getElementById("BuyGen1Button").classList.remove('hidden')
      document.getElementById("Gen1").classList.remove('hidden')
      unlocks.Gen1Buy = true
    }
    if (gameData.beans >= 500 && !unlocks.Gen2Buy){
      document.getElementById("BuyGen2Button").classList.remove('hidden')
      document.getElementById("Gen2").classList.remove('hidden')
      unlocks.Gen2Buy = True
    }
    if (gameData.beans >= 3000 && !unlocks.Shop){
      unlocks.Shop = true
      document.getElementById("Shop").classList.remove('hidden')
      document.getElementById("Motivation").classList.remove('hidden')
    }
    if (gameData.beans >= 10000 && !unlocks.Upgrades) {
      document.getElementById("Motivation").classList.add('hidden')
      document.getElementById("BEAN").classList.remove('hidden')
      unlocks.Upgrades = true
    }
  }
}
var mainGameLoop = window.setInterval(function() {
    GenTick();
    unlock()
  }, 100)
