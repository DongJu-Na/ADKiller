"use strict";

(function () {
    console.info("popup.js load");

    document.addEventListener('DOMContentLoaded', function () {
        let bannerAdBlockCheckbox = document.getElementById('bannerAdBlock');
        let videoAdBlockCheckbox = document.getElementById('videoAdBlock');
        let searchAdBlockCheckbox = document.getElementById('searchAdBlock');
        let urlAdBlockCheckbox = document.getElementById('urlAdBlock');
        let pageAdBlockCheckbox = document.getElementById('pageAdBlock');
        

        chrome.storage.local.get(['bannerAdBlock', 'videoAdBlock', 'searchAdBlock', 'urlAdBlock', 'pageAdBlock'], function (result) {
            // 배너 광고 차단 체크박스 초기화
            if (result.bannerAdBlock !== undefined) {
                bannerAdBlockCheckbox.checked = result.bannerAdBlock;
            }
            // 영상 광고 차단 체크박스 초기화
            if (result.videoAdBlock !== undefined) {
                videoAdBlockCheckbox.checked = result.videoAdBlock;
            }
            // 검색 광고 차단 체크박스 초기화
            if (result.searchAdBlock !== undefined) {
                searchAdBlockCheckbox.checked = result.searchAdBlock;
            }
            // 웹사이트 광고 차단 체크박스 초기화
            if (result.urlAdBlock !== undefined) {
                urlAdBlockCheckbox.checked = result.urlAdBlock;
            }
            // 웹사이트 내 페이지 광고 차단 체크박스 초기화
            if (result.pageAdBlock !== undefined) {
                pageAdBlockCheckbox.checked = result.pageAdBlock;
            }
        });

        /*
        const toggles = document.querySelectorAll('.toggle-checkbox');
        toggles.forEach(function (toggle) {
            toggle.addEventListener('change', function (e) {
                this.nextElementSibling.classList.toggle('fa-toggle-on');
                this.nextElementSibling.classList.toggle('fa-toggle-off');
                this.nextElementSibling.classList.toggle('text-blue-500');
                this.nextElementSibling.classList.toggle('text-gray-400');
            });
        });
        */
        
        


        // 배너 광고 차단 체크박스 변경 이벤트 리스너
        bannerAdBlockCheckbox.addEventListener('change', function () {
            // background.js에 메시지를 보냄
            chrome.runtime.sendMessage({ type: 'bannerAdBlock', value: bannerAdBlockCheckbox.checked });
        });
    
        // 영상 광고 차단 체크박스 변경 이벤트 리스너
        videoAdBlockCheckbox.addEventListener('change', function () {
            // background.js에 메시지를 보냄
            chrome.runtime.sendMessage({ type: 'videoAdBlock', value: videoAdBlockCheckbox.checked });
        });

        
        // 검색 광고 차단 체크박스 초기화 체크박스 변경 이벤트 리스너
        searchAdBlockCheckbox.addEventListener('change', function () {
            // background.js에 메시지를 보냄
            chrome.runtime.sendMessage({ type: 'searchAdBlock', value: searchAdBlockCheckbox.checked });
        });

        // 웹사이트 광고 차단 체크박스 초기화 체크박스 변경 이벤트 리스너
        urlAdBlockCheckbox.addEventListener('change', function () {
            // background.js에 메시지를 보냄
            chrome.runtime.sendMessage({ type: 'urlAdBlock', value: urlAdBlockCheckbox.checked });
        });

        // 웹사이트 내 페이지 광고 차단 체크박스 초기화 체크박스 변경 이벤트 리스너
        pageAdBlockCheckbox.addEventListener('change', function () {
            // background.js에 메시지를 보냄
            chrome.runtime.sendMessage({ type: 'pageAdBlock', value: pageAdBlockCheckbox.checked });
        });

        
    });

})();
