import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import fs from 'fs';

/**
 * Run Lighthouse audit for a given URL
 * Returns scores for accessibility and performance
 */
export async function runLighthouse(url: string) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options = {
    logLevel: 'info',
    output: 'html',   // Puede ser 'json' si quieres procesarlo
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);

  // Guardar reporte HTML
  fs.writeFileSync('lighthouse-report.html', runnerResult.report);

  const { accessibility, performance } = runnerResult.lhr.categories;
  console.log('Lighthouse Scores:');
  console.log('Accessibility:', accessibility.score);
  console.log('Performance:', performance.score);

  await chrome.kill();

  return {
    accessibility: accessibility.score,
    performance: performance.score
  };
}
