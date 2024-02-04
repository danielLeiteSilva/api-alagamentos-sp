const puppeteer = require("puppeteer")
const { latLong } = require('./Google')

function sleep() { return new Promise(resolve => setTimeout(resolve, 2000))}

function getAddress(data) {
  return data.split('\n')[1]
}

function getHour(data) {
  return data.split('\n')[0]
}

function formatData(date){
  return date.split("/").join("-")
}

async function getDada(data) {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.cgesp.org/v3/alagamentos.jsp');
  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const passwordEnterprise = await page.$x('//*[@id="campoBusca"]');
  await page.$eval("#campoBusca", input => input.value = '');
  await passwordEnterprise[0].type(data);
  await page.click("#enviaBusca");

  let elements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".arial-descr-alag.col-local"), elements => elements.innerText)
  });
  
  elements = elements.map(element => element.toLowerCase() + " - sao paulo, sp")

  const list_address = []
  for(let el of elements){
    try {
      let object = {}
      let address = getAddress(el)
      let hour = getHour(el)
      const result = await latLong(address)
      object.address = address
      object.locale = result.message
      object.hour = hour
      list_address.push(object)
    } catch (error) {
      console.log(error)
    }
  }

  object_per_date = { date: formatData(data), list_address }

  await sleep();
  await browser.close();

  return object_per_date

}

module.exports = {
  getDada
}