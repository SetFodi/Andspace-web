import { chromium } from "playwright";
import { existsSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const launchOptions = existsSync(chromePath)
  ? { executablePath: chromePath, headless: true }
  : { headless: true };

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(2000);

const metrics = await page.evaluate(async () => {
  const scrollRoot = document.scrollingElement ?? document.documentElement;

  const summarize = (frames) => {
    const sorted = [...frames].sort((a, b) => a - b);
    const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
    const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;

    return {
      frameCount: frames.length,
      avgMs: Math.round(avg * 10) / 10,
      p95Ms: Math.round(p95 * 10) / 10,
      maxMs: Math.round(Math.max(...frames) * 10) / 10,
      jankOver32: frames.filter((f) => f > 32).length,
      jankOver50: frames.filter((f) => f > 50).length,
    };
  };

  const profileScroll = async (from, to, duration = 2400) => {
    const frames = [];
    let last = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      const now = performance.now();
      frames.push(now - last);
      last = now;
      requestAnimationFrame(tick);
    };

    window.scrollTo(0, from);
    await new Promise((resolve) => setTimeout(resolve, 250));
    last = performance.now();
    requestAnimationFrame(tick);

    const t0 = performance.now();
    await new Promise((resolve) => {
      const step = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        window.scrollTo(0, from + (to - from) * p);
        if (p < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });

    await new Promise((resolve) => setTimeout(resolve, 250));
    running = false;

    return summarize(frames);
  };

  const maxY = scrollRoot.scrollHeight - window.innerHeight;

  return {
    scrollHeight: scrollRoot.scrollHeight,
    maxY,
    down: await profileScroll(0, maxY),
    up: await profileScroll(maxY, 0),
  };
});

const summarizeFrames = (frames) => {
  const sorted = [...frames].sort((a, b) => a - b);
  const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
  const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;

  return {
    frameCount: frames.length,
    avgMs: Math.round(avg * 10) / 10,
    p95Ms: Math.round(p95 * 10) / 10,
    maxMs: Math.round(Math.max(...frames) * 10) / 10,
    jankOver32: frames.filter((f) => f > 32).length,
    jankOver50: frames.filter((f) => f > 50).length,
  };
};

const collectDuring = async (action) => {
  await page.evaluate(() => {
    window.__scrollProfileFrames = [];
    window.__scrollProfileRunning = true;

    let last = performance.now();
    const tick = (now) => {
      if (!window.__scrollProfileRunning) return;
      window.__scrollProfileFrames.push(now - last);
      last = now;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });

  await action();
  await page.waitForTimeout(350);

  const frames = await page.evaluate(() => {
    window.__scrollProfileRunning = false;
    return window.__scrollProfileFrames;
  });

  return summarizeFrames(frames);
};

const wheelBurst = async (startY, deltaY) => {
  await page.evaluate((y) => window.scrollTo(0, y), startY);
  await page.waitForTimeout(250);
  await page.mouse.move(960, 540);

  return collectDuring(async () => {
    for (let i = 0; i < 12; i++) {
      await page.mouse.wheel(0, deltaY);
      await page.waitForTimeout(34);
    }
  });
};

metrics.middleWheelDown = await wheelBurst(Math.round(metrics.maxY * 0.45), 520);
metrics.lowerWheelUp = await wheelBurst(Math.round(metrics.maxY * 0.82), -520);

console.log(JSON.stringify(metrics, null, 2));
await browser.close();
