const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Fetching PageSpeed Insights results...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Navigate to the PageSpeed results page
  const url = 'https://pagespeed.web.dev/analysis/https-angelfinance-io/srsbxezueq?form_factor=mobile';
  console.log('Loading PageSpeed results from:', url);
  
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Wait for the results to load - try multiple possible selectors
  try {
    await page.waitForSelector('.lh-gauge__percentage, .lh-category-score, [data-testid="score"]', { timeout: 30000 });
  } catch (e) {
    console.log('Waiting for page to fully load...');
    await page.waitForTimeout(5000);
  }
  
  // Extract the scores
  const scores = await page.evaluate(() => {
    // Try multiple ways to get scores
    const scores = {};
    
    // Method 1: Look for gauge percentages
    const gauges = document.querySelectorAll('.lh-gauge__percentage');
    const gaugeScores = Array.from(gauges).map(g => parseInt(g.textContent));
    
    // Method 2: Look for category headers with scores
    const categoryElements = document.querySelectorAll('.lh-category-header');
    categoryElements.forEach(cat => {
      const title = cat.querySelector('.lh-category-header__title')?.textContent.trim();
      const scoreEl = cat.querySelector('.lh-gauge__percentage, .lh-category-score');
      if (title && scoreEl) {
        scores[title] = parseInt(scoreEl.textContent);
      }
    });
    
    // Method 3: Look for any element with score-like content
    if (Object.keys(scores).length === 0) {
      const possibleScores = Array.from(document.querySelectorAll('*'))
        .filter(el => /^\d{1,3}$/.test(el.textContent.trim()) && parseInt(el.textContent) <= 100)
        .map(el => ({
          score: parseInt(el.textContent),
          context: el.parentElement?.textContent.substring(0, 50)
        }));
      
      return {
        gaugeScores,
        categoryScores: scores,
        possibleScores: possibleScores.slice(0, 10),
        pageTitle: document.title,
        hasResults: document.body.textContent.includes('Performance') || document.body.textContent.includes('score')
      };
    }
    
    return {
      gaugeScores,
      categoryScores: scores,
      pageTitle: document.title,
      hasResults: true
    };
  });
  
  console.log('📊 PageSpeed Insights Results:\n');
  console.log('Page loaded:', scores.pageTitle);
  console.log('Has results:', scores.hasResults);
  
  // Display scores if found
  if (scores.categoryScores && Object.keys(scores.categoryScores).length > 0) {
    console.log('\nCategory Scores:');
    Object.entries(scores.categoryScores).forEach(([category, score]) => {
      console.log(`${category}: ${score}/100 ${getScoreEmoji(score)}`);
    });
  } else if (scores.gaugeScores && scores.gaugeScores.length > 0) {
    console.log('\nGauge Scores Found:');
    const categories = ['Performance', 'Accessibility', 'Best Practices', 'SEO'];
    scores.gaugeScores.forEach((score, index) => {
      if (categories[index] && score) {
        console.log(`${categories[index]}: ${score}/100 ${getScoreEmoji(score)}`);
      }
    });
  } else {
    console.log('\nCould not extract scores. Possible scores found:');
    scores.possibleScores?.forEach(item => {
      console.log(`- Score: ${item.score} (context: ${item.context})`);
    });
  }
  
  // Extract Core Web Vitals
  console.log('\n⚡ Core Web Vitals:');
  
  const metrics = await page.evaluate(() => {
    const getMetricValue = (labelText) => {
      const labels = Array.from(document.querySelectorAll('.lh-metric__title'));
      const label = labels.find(l => l.textContent.includes(labelText));
      if (label) {
        const valueElement = label.parentElement.querySelector('.lh-metric__value');
        return valueElement ? valueElement.textContent.trim() : 'N/A';
      }
      return 'N/A';
    };
    
    return {
      fcp: getMetricValue('First Contentful Paint'),
      lcp: getMetricValue('Largest Contentful Paint'),
      cls: getMetricValue('Cumulative Layout Shift'),
      tti: getMetricValue('Time to Interactive'),
      si: getMetricValue('Speed Index'),
      tbt: getMetricValue('Total Blocking Time')
    };
  });
  
  console.log(`- First Contentful Paint (FCP): ${metrics.fcp}`);
  console.log(`- Largest Contentful Paint (LCP): ${metrics.lcp}`);
  console.log(`- Cumulative Layout Shift (CLS): ${metrics.cls}`);
  console.log(`- Time to Interactive (TTI): ${metrics.tti}`);
  console.log(`- Speed Index: ${metrics.si}`);
  console.log(`- Total Blocking Time (TBT): ${metrics.tbt}`);
  
  // Extract opportunities and diagnostics
  console.log('\n💡 Top Opportunities:');
  
  const opportunities = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.lh-audit--load-opportunity'));
    return items.slice(0, 5).map(item => {
      const title = item.querySelector('.lh-audit__title')?.textContent.trim();
      const savings = item.querySelector('.lh-audit__display-text')?.textContent.trim();
      return { title, savings };
    });
  });
  
  opportunities.forEach(opp => {
    if (opp.title) {
      console.log(`- ${opp.title}${opp.savings ? ` (${opp.savings})` : ''}`);
    }
  });
  
  // Extract diagnostics
  console.log('\n🔧 Diagnostics:');
  
  const diagnostics = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.lh-audit--manual, .lh-audit--informative'));
    return items.slice(0, 5).map(item => {
      const title = item.querySelector('.lh-audit__title')?.textContent.trim();
      const description = item.querySelector('.lh-audit__description')?.textContent.trim();
      return { title, description };
    });
  });
  
  diagnostics.forEach(diag => {
    if (diag.title) {
      console.log(`- ${diag.title}`);
    }
  });
  
  await browser.close();
  
  console.log('\n✅ Analysis complete!');
})();

function getScoreEmoji(score) {
  if (score >= 90) return '🟢';
  if (score >= 50) return '🟠';
  return '🔴';
}