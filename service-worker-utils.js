console.info("service-worker-utils.js load");

(() => {
    const setStorage = data => new Promise(resolve => chrome.storage.local.set(data, resolve));
    const getStorage = keys => new Promise(resolve => chrome.storage.local.get(keys, resolve));
    const removeStorage = keys => new Promise(resolve => chrome.storage.local.remove(keys, resolve));

})();
