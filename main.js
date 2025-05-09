var gameData = {
  beans: 0,
  beansPerSecond: 0,
  previousBeans: 0,
  beansPerClick: 1,
  }
var upgrades = {
  Upgrade1Cost: 10,
  ShopUpgrade1Cost: 10000,
  shopUpgrade1: 0
}
var generators = {
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
  beans: false,
  ClickUpgrade1: false,
  Gen1Buy: false,
  Gen2Buy: false,
  Gen3Buy: false,
  Shop: false,
  Upgrades: false
}
function beansASecond() {
  return (generators.Gen1 * generators.Gen1Mult) * 2 ** upgrades.shopUpgrade1
}
function formatNumber(num) {
if (num%1 == 0) {
  return num >= 1e9 ? num.toExponential(2) : num
}else {
  return num >= 1e9 ? num.toExponential(2) : num.toFixed(2);
}
}
function clickButton() {
  gameData.beans += gameData.beansPerClick
  document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " beans collected"
  const bean = document.createElement('img');
  bean.src = 'bean.jpg';
  bean.className = 'falling-image';
  bean.style.left = Math.random() * 90 + '%';

  document.body.appendChild(bean);
  setTimeout(() => {
    document.body.removeChild(bean);
  }, 3000);
  }
function buybeansPerClick() {
  if (gameData.beans >= upgrades.Upgrade1Cost) {
    gameData.beans -= upgrades.Upgrade1Cost
    gameData.beansPerClick += 1
    upgrades.Upgrade1Cost *= 2
    document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans Collected"
    document.getElementById("perClickUpgrade").innerHTML = "Increase beans per click (Currently " + gameData.beansPerClick + ") Cost: " + formatNumber(upgrades.Upgrade1Cost)
  }
}
function BuyGen1() {
if (gameData.beans >= generators.Gen1Cost) {
  gameData.beans -= generators.Gen1Cost
  generators.Gen1 += 1
  generators.Gen1Cost += 10
  document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans Collected"
  document.getElementById("BuyGen1Button").innerHTML = "Cost: " + formatNumber(generators.Gen1Cost) + " beans"
  document.getElementById("Gen1").innerHTML = "Bean Generators: " + formatNumber(generators.Gen1)
  if (!unlocks.beans) {
  document.getElementById("b/s").classList.remove('hidden')
  unlocks.beans=true
  }
}
}
function BuyGen2() {
if (gameData.beans >= generators.Gen2Cost) {
  gameData.beans -= generators.Gen2Cost
  generators.Gen2 += 1
  generators.Gen2Cost *= 1.75
  document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans Collected"
  document.getElementById("BuyGen2Button").innerHTML = "Cost: " + formatNumber(generators.Gen2Cost) + " beans"
  document.getElementById("Gen2").innerHTML = "Bean Factories: " + formatNumber(generators.Gen2)
}
}
function BuyUpgrade1() {
if (gameData.beans >= upgrades.ShopUpgrade1Cost) {
  gameData.beans -= upgrades.ShopUpgrade1Cost
  upgrades.shopUpgrade1 += 1
  upgrades.ShopUpgrade1Cost *= 10
  document.getElementById("shopUpgrade1").innerHTML = "Double Production of beans <br><br><strong> Cost: " + formatNumber(upgrades.ShopUpgrade1Cost)
  document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans Collected"
}
}
function GenTick() {
gameData.beansPerSecond = beansASecond()
gameData.beans += beansASecond() / 10
generators.Gen1 += generators.Gen2 * generators.Gen2Mult / 10
document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans collected"
document.getElementById("Gen1").innerHTML = "Bean Generators: " + formatNumber(generators.Gen1)
document.getElementById("Gen2").innerHTML = "Bean Factories: " + formatNumber(generators.Gen2)
if (unlocks.beans) {
  document.getElementById("b/s").innerHTML = formatNumber(gameData.beansPerSecond) + " beans per second"
}
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
    unlocks.Gen2Buy = true
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
