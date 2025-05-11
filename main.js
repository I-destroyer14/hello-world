var gameData = {
  beans: 0,
  highestBeans: 0,
  beansPerSecond: 0,
  previousBeans: 0,
  beansPerClick: 1,
  BeanstiegeMult: 1,
  NextBeanstiegeMult: 1
  }
var upgrades = {
  Upgrade1Cost: 10,
  ShopUpgrade1Cost: 10000,
  shopUpgrade1: 0,
  ShopUpgrade2Cost: 100000,
  shopUpgrade2: 0,
  shopUpgrade3: 0,
  ShopUpgrade3Cost: 1e+12,
  shopUpgrade4: 0,
  shopUpgrade4Increase: 1,
  shopUpgrade4Cost: 1e+25
}
var beanType = {
  JellyBean: false,
  BlackBean: false,
  Pea: false,
  SpaceBean: false,
  AIBean: false,
  EarthBean: false
}
var generators = {
  Gen1Cost: 100,
  Gen1: 0,
  Gen1Mult: 10,
  Gen2Cost: 1000,
  Gen2: 0,
  Gen2Mult: 1,
  Gen3Cost: 100000,
  Gen3: 0,
  Gen3Mult: 1,
  Gen4Cost: 1e+9,
  Gen4: 0,
  Gen4Mult: 1,
  Gen5Cost: 1e+16,
  Gen5: 0,
  Gen5Mult: 1,
  Gen6Cost: 1e+30,
  Gen6: 0,
  Gen6Mult: .1,
  Gen7Cost: 1e+30,
  Gen7: 0,
  Gen7Mult: .1,
  Gen7Multi: 1
}
var unlocks = {
  beans: false,
  ClickUpgrade1: false,
  Gen1Buy: false,
  Gen2Buy: false,
  Gen3Buy: false,
  Gen4Buy: false,
  Beanstiege: false,
  Shop: false,
  Upgrades: false,
  Upgrade2: false,
  Upgrade3: false,
  Upgrade4: false
}
function getRandomBeanImage() {
  const options = ["bean.jpg"];
  for (const type in beanType) {
    if (beanType[type]) {
      options.push(`${type}.jpg`);
    }
  }
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
function updateBeans() {
  document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans collected";
}
function updateAll() {
  document.getElementById("BuyGen1Button").innerHTML = "Cost: " + formatNumber(generators.Gen1Cost) + " beans"
  document.getElementById("Gen1").innerHTML = "Bean Generators: " + formatNumber(generators.Gen1)
  document.getElementById("BuyGen2Button").innerHTML = "Cost: " + formatNumber(generators.Gen2Cost) + " beans"
  document.getElementById("Gen2").innerHTML = "Bean Machines: " + formatNumber(generators.Gen2)
  document.getElementById("BuyGen3Button").innerHTML = "Cost: " + formatNumber(generators.Gen3Cost) + " beans"
  document.getElementById("Gen3").innerHTML = "Bean Factories: " + formatNumber(generators.Gen3)
  document.getElementById("BuyGen4Button").innerHTML = "Cost: " + formatNumber(generators.Gen4Cost) + " beans"
  document.getElementById("Gen4").innerHTML = "Bean Companies: " + formatNumber(generators.Gen4)
  document.getElementById("BuyGen5Button").innerHTML = "Cost: " + formatNumber(generators.Gen5Cost) + " beans"
  document.getElementById("Gen5").innerHTML = "Bean Cities: " + formatNumber(generators.Gen5)
  document.getElementById("BuyGen6Button").innerHTML = "Cost: " + formatNumber(generators.Gen6Cost) + " beans"
  document.getElementById("Gen6").innerHTML = "Bean Countries: " + formatNumber(generators.Gen6)
  document.getElementById("BuyGen7Button").innerHTML = "Cost: " + formatNumber(generators.Gen7Cost) + " beans"
  document.getElementById("Gen7").innerHTML = "Bean Planets: " + formatNumber(generators.Gen7)
  document.getElementById("beansCollected").innerHTML = formatNumber(gameData.beans) + " Beans collected";
  if (unlocks.beans) {
  document.getElementById("b/s").innerHTML = formatNumber(gameData.beansPerSecond) + " beans per second"
}
document.getElementById("beanReset").innerHTML = "Perform a Beinstiege<br>(Reset all buildings and beans but get) <br> <b>" + formatNumber(gameData.NextBeanstiegeMult/gameData.BeanstiegeMult) + "x ALL BUILDINGS</b></button>"
}
function beansASecond() {
  gameData.beansPerSecond = ((generators.Gen7Multi*upgrades.shopUpgrade4Increase*gameData.BeanstiegeMult*generators.Gen1 * generators.Gen1Mult) * 2 ** upgrades.shopUpgrade1)
}
function formatNumber(num) {
if (num%1 == 0) {
  return num >= 1e6 ? num.toExponential(2) : num
}else {
  return num >= 1e6 ? num.toExponential(2) : num.toFixed(2);
}
}
function clickButton() {
  gameData.beans += gameData.beansPerClick
  updateBeans()
  const bean = document.createElement('img');
  if (beanType.JellyBean) {
    GenTick()
  }
  bean.src = getRandomBeanImage();
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
    updateBeans()
    document.getElementById("perClickUpgrade").innerHTML = "Increase beans per click (Currently " + gameData.beansPerClick + ") Cost: " + formatNumber(upgrades.Upgrade1Cost)
  }
}
function BuyGen1() {
if (gameData.beans >= generators.Gen1Cost) {
  gameData.beans -= generators.Gen1Cost
  generators.Gen1 += 1
  generators.Gen1Cost += 10
  updateBeans()
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
  generators.Gen2Cost *= 1.50
  updateBeans()
  document.getElementById("BuyGen2Button").innerHTML = "Cost: " + formatNumber(generators.Gen2Cost) + " beans"
  document.getElementById("Gen2").innerHTML = "Bean Machines: " + formatNumber(generators.Gen2)
}
}
function BuyGen3() {
if (gameData.beans >= generators.Gen3Cost) {
  gameData.beans -= generators.Gen3Cost
  generators.Gen3 += 1
  generators.Gen3Cost *= 1.75
  updateBeans()
  document.getElementById("BuyGen3Button").innerHTML = "Cost: " + formatNumber(generators.Gen3Cost) + " beans"
  document.getElementById("Gen3").innerHTML = "Bean Factories: " + formatNumber(generators.Gen3)
  if (!unlocks.Beanstiege) {
  document.getElementById("Reset-Container").classList.remove('hidden')
  unlocks.Beanstiege = true
  }
}
}
function BuyGen4() {
if (gameData.beans >= generators.Gen4Cost) {
  gameData.beans -= generators.Gen4Cost
  generators.Gen4 += 1
  generators.Gen4Cost *= 1.75
  updateBeans()
  document.getElementById("BuyGen4Button").innerHTML = "Cost: " + formatNumber(generators.Gen4Cost) + " beans"
  document.getElementById("Gen4").innerHTML = "Bean Companies: " + formatNumber(generators.Gen4)
}
}
function BuyGen5() {
if (gameData.beans >= generators.Gen5Cost) {
  gameData.beans -= generators.Gen5Cost
  generators.Gen5 += 1
  generators.Gen5Cost *= 1.8
  updateBeans()
  document.getElementById("BuyGen5Button").innerHTML = "Cost: " + formatNumber(generators.Gen5Cost) + " beans"
  document.getElementById("Gen5").innerHTML = "Bean Cities: " + formatNumber(generators.Gen5)
}
}
function BuyGen6() {
if (gameData.beans >= generators.Gen6Cost) {
  gameData.beans -= generators.Gen6Cost
  generators.Gen6 += 1
  generators.Gen6Cost *= 2
  updateBeans()
  document.getElementById("BuyGen6Button").innerHTML = "Cost: " + formatNumber(generators.Gen6Cost) + " beans"
  document.getElementById("Gen6").innerHTML = "Bean Countries: " + formatNumber(generators.Gen6)
}
}
function BuyGen7() {
if (gameData.beans >= generators.Gen7Cost) {
  gameData.beans -= generators.Gen7Cost
  generators.Gen7 += 1
  generators.Gen7Cost *= 10
  updateBeans()
  document.getElementById("BuyGen7Button").innerHTML = "Cost: " + formatNumber(generators.Gen7Cost) + " beans"
  document.getElementById("Gen7").innerHTML = "Bean Planets: " + formatNumber(generators.Gen7)
}
}
function unlockShop(up){
  if (up == 1 && !unlocks.Upgrade2 && gameData.beans >= 1e+6){
    gameData.beans -= 1e+6
    updateBeans()
    document.getElementById("shopUpgrade2").classList.remove('hidden')
    document.getElementById("shopUpgrade2").classList.add('upgrade')
    document.getElementById("Unlock1").classList.add('bought')
    document.getElementById("Unlock2").classList.add('Once-upgrade')
    document.getElementById("Unlock2").classList.remove('hidden')
    unlocks.Upgrade2 = true
  }
  if (up == 2 && !unlocks.Upgrade3 && gameData.beans >= 1e+10){
    gameData.beans -= 1e+10
    updateBeans()
    document.getElementById("shopUpgrade3").classList.remove('hidden')
    document.getElementById("shopUpgrade3").classList.add('upgrade')
    document.getElementById("Unlock2").classList.add('bought')
    document.getElementById("Unlock3").classList.add('Once-upgrade')
    document.getElementById("Unlock3").classList.remove('hidden')
    unlocks.Upgrade3 = true
  }
  if (up == 3 && !unlocks.Upgrade4 && gameData.beans >= 1e+25){
    gameData.beans -= 1e+25
    updateBeans()
    document.getElementById("shopUpgrade4").classList.remove('hidden')
    document.getElementById("shopUpgrade4").classList.add('upgrade')
    document.getElementById("Unlock3").classList.add('bought')
    unlocks.Upgrade4 = true
  }
}
function BuyUpgrade1() {
if (gameData.beans >= upgrades.ShopUpgrade1Cost) {
  gameData.beans -= upgrades.ShopUpgrade1Cost
  upgrades.shopUpgrade1 += 1
  if (!beanType.BlackBean) {
    upgrades.ShopUpgrade1Cost *= 10
  }
  else {
    upgrades.ShopUpgrade1Cost *= 7
  }
  document.getElementById("shopUpgrade1").innerHTML = "Double bean Production <br><br><br><strong> Cost: " + formatNumber(upgrades.ShopUpgrade1Cost)
  updateBeans()
}
}
function BuyUpgrade2() {
  if (gameData.beans >= upgrades.ShopUpgrade2Cost) {
    if (upgrades.shopUpgrade2 == 0) {
      gameData.beans -= upgrades.ShopUpgrade2Cost;
      upgrades.ShopUpgrade2Cost = 1e+10;
      upgrades.shopUpgrade2 += 1;
      document.getElementById("Gen3").classList.remove('hidden');
      document.getElementById("BuyGen3Button").classList.remove('hidden');
      document.getElementById("shopUpgrade2").innerHTML = "Unlock Next building <br><br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade2Cost) + "</strong> </button>"
      return
    }
    if (upgrades.shopUpgrade2 == 1) {
      gameData.beans -= upgrades.ShopUpgrade2Cost;
      upgrades.ShopUpgrade2Cost = 1e+16;
      upgrades.shopUpgrade2 += 1;
      document.getElementById("Gen4").classList.remove('hidden');
      document.getElementById("BuyGen4Button").classList.remove('hidden');
      document.getElementById("shopUpgrade2").innerHTML = "Unlock Next building <br><br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade2Cost) + "</strong> </button>"
      return
    }
    if (upgrades.shopUpgrade2 == 2) {
      gameData.beans -= upgrades.ShopUpgrade2Cost;
      upgrades.ShopUpgrade2Cost = 1e+30;
      upgrades.shopUpgrade2 += 1;
      document.getElementById("Gen5").classList.remove('hidden');
      document.getElementById("BuyGen5Button").classList.remove('hidden');
      document.getElementById("shopUpgrade2").innerHTML = "Unlock Next building <br><br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade2Cost) + "</strong> </button>"
      return
    }
    if (upgrades.shopUpgrade2 == 3) {
      gameData.beans -= upgrades.ShopUpgrade2Cost;
      upgrades.ShopUpgrade2Cost = 1e+50;
      upgrades.shopUpgrade2 += 1;
      document.getElementById("Gen6").classList.remove('hidden');
      document.getElementById("BuyGen6Button").classList.remove('hidden');
      document.getElementById("shopUpgrade2").innerHTML = "Unlock Next building <br><br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade2Cost) + "</strong> </button>"
      return
    }
    if (upgrades.shopUpgrade2 == 4) {
      gameData.beans -= upgrades.ShopUpgrade2Cost;
      upgrades.ShopUpgrade2Cost = 1e+100;
      upgrades.shopUpgrade2 += 1;
      document.getElementById("Gen7").classList.remove('hidden');
      document.getElementById("BuyGen7Button").classList.remove('hidden');
      document.getElementById("shopUpgrade2").innerHTML = "Beanify everything. <br><br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade2Cost) + "</strong> </button>"
      return
    }
    if (upgrades.shopUpgrade2 == 5) {
      gameData.beans -= upgrades.ShopUpgrade2Cost;
      upgrades.ShopUpgrade2Cost = 1e+100;
      upgrades.shopUpgrade2 += 1;
      document.getElementById("shopUpgrade2").classList.add('bought');
      document.getElementById("shopUpgrade2").innerHTML = "Everything is beanified you win. <br><br><br> <strong>Cost:00000000e-0</strong> </button>"
      return
    }
  }
}
function BuyUpgrade3(){
  if (gameData.beans >= upgrades.ShopUpgrade3Cost) {
    if (upgrades.shopUpgrade3 == 0){
      gameData.beans -= upgrades.ShopUpgrade3Cost
      upgrades.ShopUpgrade3Cost = 1e+20
      upgrades.shopUpgrade3 += 1
      beanType.JellyBean = true
      document.getElementById("shopUpgrade3").innerHTML = "Unlock Black Beans <br> (decrease double bean production upgrade scaling) <br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade3Cost)+"</strong>"
      return
    }
    if (upgrades.shopUpgrade3 == 1){
      gameData.beans -= upgrades.ShopUpgrade3Cost
      upgrades.ShopUpgrade3Cost = 1e+30
      upgrades.shopUpgrade3 += 1
      beanType.BlackBean = true
      upgrades.ShopUpgrade1Cost = 10000
      upgrades.ShopUpgrade1Cost *= 7 ** upgrades.shopUpgrade1
      document.getElementById("shopUpgrade1").innerHTML = "Double bean production <br><br><br><strong> Cost: " + formatNumber(upgrades.ShopUpgrade1Cost)
      document.getElementById("shopUpgrade3").innerHTML = "Unlock...Peas?<br> (beanstiege no longer resets beans) <br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade3Cost)+"</strong>"
      return
    }
    if (upgrades.shopUpgrade3 == 2){
      gameData.beans -= upgrades.ShopUpgrade3Cost
      upgrades.ShopUpgrade3Cost = 1e+40
      upgrades.shopUpgrade3 += 1
      beanType.Pea = true
      document.getElementById("shopUpgrade3").innerHTML = "Unlock Space beans<br> (Improve beanstiege formula) <br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade3Cost)+"</strong>"
      return
    }
    if (upgrades.shopUpgrade3 == 3){
      gameData.beans -= upgrades.ShopUpgrade3Cost
      upgrades.ShopUpgrade3Cost = 1e+50
      upgrades.shopUpgrade3 += 1
      beanType.SpaceBean = true
      document.getElementById("shopUpgrade3").innerHTML = "Unlock AI beans<br> (Autoclick 10 times a second) <br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade3Cost)+"</strong>"
      return
    }
    if (upgrades.shopUpgrade3 == 4){
      gameData.beans -= upgrades.ShopUpgrade3Cost
      upgrades.ShopUpgrade3Cost = 1e+60
      upgrades.shopUpgrade3 += 1
      beanType.AIBean = true
      document.getElementById("shopUpgrade3").innerHTML = "Unlock Earth beans<br> (Multiply all buildings by Bean Planet Amount) <br><br> <strong>Cost:" + formatNumber(upgrades.ShopUpgrade3Cost)+"</strong>"
      return
    }
    if (upgrades.shopUpgrade3 == 5){
      gameData.beans -= upgrades.ShopUpgrade3Cost
      upgrades.ShopUpgrade3Cost = 1e+80
      upgrades.shopUpgrade3 += 1
      beanType.EarthBean = true
      document.getElementById("shopUpgrade3").classList.add('bought')
      return
    }
  }
}
function BuyUpgrade4(){
  if (gameData.beans >= upgrades.shopUpgrade4Cost){
    gameData.beans -= upgrades.shopUpgrade4Cost
    upgrades.shopUpgrade4Cost *= 5
    upgrades.shopUpgrade4 += 1
    upgrades.shopUpgrade4Increase += 1
    document.getElementById("shopUpgrade4").innerHTML = "Increase all buildings by +100%<br><br><br><strong>Cost:" + formatNumber(upgrades.shopUpgrade4Cost) + "</strong>"
  }
}
function beanstiege() {
  generators.Gen7 = 0
  generators.Gen6 = 0
  generators.Gen5 = 0
  generators.Gen4 = 0
  generators.Gen3 = 0
  generators.Gen2 = 0
  generators.Gen1 = 0
  if (!beanType.Pea){
    gameData.beans = 0
  }
  generators.Gen1Cost = 100
  generators.Gen2Cost = 1000
  generators.Gen3Cost = 100000
  generators.Gen4Cost = 1e+9
  generators.Gen5Cost = 1e+16
  generators.Gen6Cost = 1e+30
  generators.Gen7Cost = 1e+50
  updateAll()
  gameData.BeanstiegeMult = gameData.NextBeanstiegeMult
}
function GenTick() {
if (gameData.beans>gameData.highestBeans) {
  gameData.highestBeans=gameData.beans
}
if (beanType.EarthBean && generators.Gen7 > 0){
  generators.Gen7Multi = generators.Gen7
}
else {
  generators.Gen7Multi = 1
}
if (!beanType.SpaceBean){
  gameData.NextBeanstiegeMult = 1+((Math.log10(gameData.highestBeans) ** 1.6)/3);
}
else {
  gameData.NextBeanstiegeMult = 1+((Math.log(gameData.highestBeans) ** 1.6)/3);
}
gameData.beans += gameData.beansPerSecond / 10
generators.Gen1 += generators.Gen7Multi*upgrades.shopUpgrade4Increase*gameData.BeanstiegeMult * generators.Gen2 * generators.Gen2Mult / 10
generators.Gen2 += generators.Gen7Multi*upgrades.shopUpgrade4Increase*gameData.BeanstiegeMult * generators.Gen3 * generators.Gen3Mult / 10
generators.Gen3 += generators.Gen7Multi*upgrades.shopUpgrade4Increase*gameData.BeanstiegeMult * generators.Gen4 * generators.Gen4Mult / 10
generators.Gen4 += generators.Gen7Multi*upgrades.shopUpgrade4Increase*gameData.BeanstiegeMult * generators.Gen5 * generators.Gen5Mult / 10
generators.Gen5 += generators.Gen7Multi*upgrades.shopUpgrade4Increase*gameData.BeanstiegeMult * generators.Gen6 * generators.Gen6Mult / 10
generators.Gen6 += generators.Gen7Multi*upgrades.shopUpgrade4Increase*gameData.BeanstiegeMult * generators.Gen7 * generators.Gen7Mult / 10
updateAll()
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
    document.getElementById("upgradeContainer").classList.remove('hidden')
    document.getElementById("upgradeContainer").classList.add('upgrade-container')
    document.getElementById("Unlock1").classList.add('Once-upgrade')
    document.getElementById("Unlock1").classList.remove('hidden')
    unlocks.Upgrades = true
  }
}
}
var mainGameLoop = window.setInterval(function() {
  beansASecond();
  GenTick();
  unlock();
  updateBeans();
  if (beanType.AIBean){
    clickButton()
  }
}, 100)
