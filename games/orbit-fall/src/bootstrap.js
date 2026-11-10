// Keep this entry dependency-free so a failed main-module graph has a visible recovery path.
export async function startBootstrap(browser, loadMain = () => import('./main.js')) {
  const sessionId = new URLSearchParams(browser.location.search).get('session');
  const embedded = browser.parent !== browser;
  let initialization = null, failure = null, reported = false;

  const reportFailure = () => {
    if (!initialization || !failure || reported) return;
    reported = true;
    browser.parent.postMessage({
      protocol: 'stteak-game', version: 1, sessionId,
      type: 'game:error', payload: { message: failure },
    }, browser.location.origin);
  };
  const captureInitialization = event => {
    if (!embedded || !sessionId || event.source !== browser.parent || event.origin !== browser.location.origin) return;
    const data = event.data;
    // Match bridge.js before accepting a session; never invent an initialization message.
    if (!data || Array.isArray(data) || data.protocol !== 'stteak-game' || data.version !== 1 || data.sessionId !== sessionId || data.type !== 'host:init') return;
    if (!data.payload || typeof data.payload !== 'object' || Array.isArray(data.payload) || data.payload.gameId !== 'orbit-fall' || typeof data.payload.title !== 'string') return;
    initialization = event;
    reportFailure();
  };
  browser.addEventListener('message', captureInitialization);

  try {
    await loadMain();
  } catch (error) {
    browser.console.error('Orbit / Fall module loading failed:', error);
    failure = '遊戲程式載入未完成。請檢查連線，再按「重新載入」重試。';
    browser.document.getElementById('boot').hidden = false;
    browser.document.getElementById('boot-status').textContent = failure;
    const retry = browser.document.getElementById('boot-retry');
    retry.hidden = false;
    retry.addEventListener('click', () => {
      retry.disabled = true;
      // A fresh document clears failed module caches and any partially installed listeners.
      browser.location.reload();
    }, { once: true });
    retry.focus();
    reportFailure();
    return false;
  }

  browser.removeEventListener('message', captureInitialization);
  // Dynamic loading can finish after the iframe load event and its one host:init.
  // Replay the original verified event only after the main bridge has registered.
  if (initialization) browser.dispatchEvent(initialization);
  return true;
}

if (typeof window !== 'undefined') startBootstrap(window);
