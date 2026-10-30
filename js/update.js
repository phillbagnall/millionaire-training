/*
 * Keeping the installed app up to date.
 *
 * The service worker caches the app so it works offline, which also means a
 * phone can happily sit on an old version. This checks for a new one on
 * launch, whenever the app is brought back to the foreground, and
 * periodically while it is open.
 *
 * Crucially it never swaps versions mid-game. A new worker waits until the
 * player is somewhere safe — the home or stats screen — before taking over,
 * so an update can never cost her a game in progress.
 */
(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;

  var CHECK_EVERY_MS = 30 * 60 * 1000;   // while the app is open
  var SETTLE_MS = 4000;                  // how often to retry a held update

  var registration = null;
  var waitingWorker = null;
  var applying = false;

  /* Anything that would be lost by a reload counts as busy. */
  function appIsBusy() {
    return ['screen-game', 'screen-fff', 'screen-result'].some(function (id) {
      var el = document.getElementById(id);
      return !!el && el.classList.contains('active');
    });
  }

  function applyNow() {
    if (!waitingWorker || applying) return;
    applying = true;
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  }

  function applyWhenSafe() {
    if (waitingWorker && !appIsBusy()) applyNow();
  }

  function watchInstalling(worker) {
    if (!worker) return;

    // It may already have finished installing by the time we get here, in
    // which case no statechange is coming and waiting for one would strand
    // the update until the next launch.
    function consider() {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) {
        waitingWorker = worker;
        applyWhenSafe();
      }
    }

    worker.addEventListener('statechange', consider);
    consider();
  }

  navigator.serviceWorker.addEventListener('controllerchange', function () {
    // Only reload for an update this page asked for; a first install also
    // fires this, and reloading then would loop.
    if (!applying) return;
    window.location.reload();
  });

  function checkForUpdate() {
    if (!registration) return;
    try {
      registration.update().then(function () {
        // A worker that installed and went straight to waiting raises no
        // event we are listening for, so look for one directly too.
        if (registration.waiting && navigator.serviceWorker.controller) {
          waitingWorker = registration.waiting;
          applyWhenSafe();
        }
      }).catch(function () { /* offline, try later */ });
    } catch (e) { /* ignore */ }
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      registration = reg;

      if (reg.waiting && navigator.serviceWorker.controller) {
        waitingWorker = reg.waiting;
        applyWhenSafe();
      }
      watchInstalling(reg.installing);
      reg.addEventListener('updatefound', function () {
        watchInstalling(reg.installing);
      });

      checkForUpdate();
    }).catch(function () { /* https only; ignore elsewhere */ });
  });

  /*
   * An installed app usually returns from the background without navigating,
   * so without this it could sit on an old version indefinitely.
   */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') return;
    applyWhenSafe();
    checkForUpdate();
  });

  // Pick up an update that was held back because a game was in progress, or
  // one that arrived without an event we caught.
  setInterval(function () {
    if (!waitingWorker && registration && registration.waiting &&
        navigator.serviceWorker.controller) {
      waitingWorker = registration.waiting;
    }
    applyWhenSafe();
  }, SETTLE_MS);
  setInterval(checkForUpdate, CHECK_EVERY_MS);
})();
