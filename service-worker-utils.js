console.info("service-worker-utils.js load");

chrome.declarativeNetRequest.setExtensionActionOptions({ displayActionCountAsBadgeText: true });

(() => {
    const setStorage = data => new Promise(resolve => chrome.storage.local.set(data, resolve));
    const getStorage = keys => new Promise(resolve => chrome.storage.local.get(keys, resolve));
    const removeStorage = keys => new Promise(resolve => chrome.storage.local.remove(keys, resolve));

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'bannerAdBlock') {
            console.log('Received bannerAdBlock value:', message.value);

            setStorage({ bannerAdBlock: message.value })
                .then(() => console.log('Banner Ad Block value saved'))
                .catch(error => console.error('Error saving bannerAdBlock value:', error));
        } else if (message.type === 'videoAdBlock') {
            console.log('Received videoAdBlock value:', message.value);

            setStorage({ videoAdBlock: message.value })
                .then(() => console.log('Video Ad Block value saved'))
                .catch(error => console.error('Error saving videoAdBlock value:', error));
        }

        // 응답 전송
        sendResponse('Message received successfully!');
    });

})();
