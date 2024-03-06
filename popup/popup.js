"use strict";

(function () {
    console.info("popup.js load");

    document.addEventListener('DOMContentLoaded', function () {
        var bannerAdBlockCheckbox = document.getElementById('bannerAdBlock');
        var videoAdBlockCheckbox = document.getElementById('videoAdBlock');
        
        // 저장된 값 가져오기
        chrome.storage.local.get(['bannerAdBlock', 'videoAdBlock'], function (result) {
            // 배너 광고 차단 체크박스 초기화
            if (result.bannerAdBlock !== undefined) {
                bannerAdBlockCheckbox.checked = result.bannerAdBlock;
            }
            // 영상 광고 차단 체크박스 초기화
            if (result.videoAdBlock !== undefined) {
                videoAdBlockCheckbox.checked = result.videoAdBlock;
            }
        });

        // 배너 광고 차단 체크박스 변경 이벤트 리스너
        bannerAdBlockCheckbox.addEventListener('change', function () {
            var isChecked = bannerAdBlockCheckbox.checked;
            // background.js에 메시지를 보냄
            chrome.runtime.sendMessage({ type: 'bannerAdBlock', value: isChecked });
        });
    
        // 영상 광고 차단 체크박스 변경 이벤트 리스너
        videoAdBlockCheckbox.addEventListener('change', function () {
            var isChecked = videoAdBlockCheckbox.checked;
            // background.js에 메시지를 보냄
            chrome.runtime.sendMessage({ type: 'videoAdBlock', value: isChecked });
        });
    });

})();
