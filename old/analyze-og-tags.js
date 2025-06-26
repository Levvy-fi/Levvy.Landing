const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Analyzing Open Graph tags...\n');

  // Check main docs page
  console.log('=== Main Docs Page (/docs/intro) ===');
  await page.goto('http://localhost:3000/docs/intro');
  
  const mainPageMeta = await page.evaluate(() => {
    const metaTags = {};
    const tags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
    tags.forEach(tag => {
      const key = tag.getAttribute('property') || tag.getAttribute('name');
      metaTags[key] = tag.getAttribute('content');
    });
    return metaTags;
  });
  
  console.log('Current meta tags:', JSON.stringify(mainPageMeta, null, 2));
  console.log('\nPage title:', await page.title());

  // Check a specific doc page
  console.log('\n=== Specific Doc Page (/docs/angel-paper/introduction) ===');
  await page.goto('http://localhost:3000/docs/angel-paper/introduction');
  
  const docPageMeta = await page.evaluate(() => {
    const metaTags = {};
    const tags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
    tags.forEach(tag => {
      const key = tag.getAttribute('property') || tag.getAttribute('name');
      metaTags[key] = tag.getAttribute('content');
    });
    return metaTags;
  });
  
  console.log('Current meta tags:', JSON.stringify(docPageMeta, null, 2));
  console.log('\nPage title:', await page.title());

  // Check if we're getting the default Docusaurus meta or custom ones
  console.log('\n=== Analysis ===');
  console.log('Missing critical OG tags:');
  const requiredTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
  requiredTags.forEach(tag => {
    if (\!docPageMeta[tag]) {
      console.log(`- ${tag} is missing`);
    }
  });

  await browser.close();
})();
EOF < /dev/null