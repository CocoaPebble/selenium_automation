const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const getPage = async () => {
  let options = new chrome.Options().addArguments('--headless'); // 设置为 headless 模式
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  
  const url = 'https://www.dailypay.com/jobs/?gh_jid=7247544002&gh_src=2d446d382us';
  
  try {
    await driver.get(url);
    const requiredInputs = await driver.findElements(By.xpath("//*[@required]")); // 找到所有带有 required 属性的输入字段
    let inputsAndLabels = [];
    for (let input of requiredInputs) {
      let label = await input.findElement(By.xpath('ancestor::label[contains(.//span[@class="asterisk"])]')); // 找到包含 span.asterisk 的标签
      let labelInnerText = await label.getText(); // 获取标签的文本内容
      let inputName = await input.getAttribute('name'); // 获取输入字段的名称
      inputsAndLabels.push({ label: labelInnerText.trim(), input: inputName });
    }
    return inputsAndLabels;
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await driver.quit(); // 关闭浏览器会话
  }
}

(async () => {
  const inputsAndLabels = await getPage();
  console.log(inputsAndLabels);
})();
