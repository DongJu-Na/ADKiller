console.info("service-worker-utils.js load");
const _ruleSet = ["ruleset_1","ruleset_2","ruleset_3","ruleset_6","ruleset_7","ruleset_8","ruleset_9","ruleset_13","ruleset_14"]

chrome.declarativeNetRequest.setExtensionActionOptions({ displayActionCountAsBadgeText: true });

(() => {
    const setStorage = data => new Promise(resolve => chrome.storage.local.set(data, resolve));
    const getStorage = keys => new Promise(resolve => chrome.storage.local.get(keys, resolve));
    const removeStorage = keys => new Promise(resolve => chrome.storage.local.remove(keys, resolve));
    const getAvailableStaticRuleCount = () =>{
        return new Promise((resolve, reject) => {
            chrome.declarativeNetRequest.getAvailableStaticRuleCount(count => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve(count);
                }
            });
        });
    }
    const getEnabledRulesets = () => {
        return new Promise((resolve, reject) => {
            chrome.declarativeNetRequest.getEnabledRulesets(rulesets => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve(rulesets);
                }
            });
        });
    }


    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'bannerAdBlock') {
            console.log('Received bannerAdBlock value:', message.value);

            getAvailableStaticRuleCount()
            .then(count => {
                console.log("Available static rule count:", count);
            })
            .catch(error => {
                console.error("Error:", error);
            });

            getEnabledRulesets()
            .then(rulesets => {
                console.log("Enabled rulesets:", rulesets);
            })
            .catch(error => {
                console.error("Error:", error);
            });

            

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
