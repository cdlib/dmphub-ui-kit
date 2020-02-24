const PercyScript = require('@percy/script');

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('http://localhost:8080/components/preview/tests.html');
  await percySnapshot('DMPHub-UI-Kit Tests Page');
});
