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
  await page.evaluate(() => {
    const accordionSections = document.querySelectorAll('.c-accordion__section');
    accordionSections.forEach((el) => {
      el.innerText = 'Percy ipsum dolor sit amet, consectetur adipisicing elit. In, animi fugiat. Soluta dicta fuga explicabo nihil vero incidunt sapiente magni, qui recusandae deserunt quibusdam vel voluptates ipsam enim perferendis totam.'
    });
  });
  await percySnapshot('Landing');
}, options);

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('https://cdlib.github.io/dmphub-ui/components/preview/project.html');
  await percySnapshot('Project');
}, options);
