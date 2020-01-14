const PercyScript = require('@percy/script');
const options = {headless: false};

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('https://cdlib.github.io/dmphub-ui/components/preview/datasets.html');
  await percySnapshot('Datasets');
}, options);

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('https://cdlib.github.io/dmphub-ui/components/preview/dmp.html');
  await percySnapshot('DMP');
}, options);

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('https://cdlib.github.io/dmphub-ui/components/preview/landing.html');
  await percySnapshot('Landing');
}, options);

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('https://cdlib.github.io/dmphub-ui/components/preview/project.html');
  await percySnapshot('Project');
}, options);
