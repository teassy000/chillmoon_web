const fs = require('fs');
const path = require('path');

const locales = {};
const localesPath = path.join(__dirname, "locales");

// 遍历所有语言文件，按文件名（如 en/zh）挂载到 locales 对象
fs.readdirSync(localesPath).forEach(file => {
  const langCode = file.replace('.json', '');
  locales[langCode] = require(path.join(localesPath, file));
});

module.exports = locales;