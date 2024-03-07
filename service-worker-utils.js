console.info("service-worker-utils.js load");
const _ruleSet = ["ruleset_1","ruleset_2","ruleset_3","ruleset_6","ruleset_7","ruleset_8","ruleset_9","ruleset_13","ruleset_14"]

chrome.declarativeNetRequest.setExtensionActionOptions({ displayActionCountAsBadgeText: true });

function toggleRuleSets(bannerAdBlock) {
    const addRuleIds = bannerAdBlock ? _ruleSet : [];
    const removeRuleIds = bannerAdBlock ? [] : _ruleSet;

    chrome.declarativeNetRequest.updateEnabledRulesets(
        { enableRulesetIds: addRuleIds, disableRulesetIds: removeRuleIds },
        function() {
            if (chrome.runtime.lastError) {
                console.error("룰셋 수정 에러 발생.", chrome.runtime.lastError.message);
            } else {
                console.info("룰셋 수정 완료.");
            }
        }
    );
}

function log(log, level = 'l', ...args) {
    const prefix = 'AD Killer:'
    const message = `${prefix} ${log}`;

        switch (level) {
            case 'e':
            case 'err':
            case 'error':
                console.error(message, ...args);
                break;
            case 'l':
            case 'log':
                console.log(message, ...args);
                break;
            case 'w':
            case 'warn':
            case 'warning':
                console.warn(message, ...args);
                break;
            case 'i':
            case 'info':
            default:
                console.info(message, ...args);
                break
    }
}

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
            console.info('배너 플래그:', message.value);
            
            toggleRuleSets(message.value);            

            setStorage({ bannerAdBlock: message.value })
                .then(() => console.log('배너 차단 값 저장 완료.'))
                .catch(error => console.error('배너 차단 값 저장 중 오류 발생.:', error));
        } else if (message.type === 'videoAdBlock') {
            console.info('비디오 배너 플래그:', message.value);

            setStorage({ videoAdBlock: message.value })
                .then(() => console.log('비디오 배너 차단 값 저장 완료.'))
                .catch(error => console.error('비디오 배너 차단 값 저장 중 오류 발생.:', error));
        }

        // 응답 전송
        sendResponse(sender,'메세지 수신 완료.');
    });

})();
