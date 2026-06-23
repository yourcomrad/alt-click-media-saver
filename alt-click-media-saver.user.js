// ==UserScript==
// @name         Alt+Click Absolute Media Saver
// @namespace    alt-click-media-saver
// @version      1.5
// @description  Force download image/video with Alt+Click using GM_download
// @match        *://*/*
// @grant        GM_download
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('click', (e) => {
        // Проверяем только нажатие Alt + ЛКМ
        if (!e.altKey || e.button !== 0) return;

        const target = e.target;
        let url = null;

        // Строго проверяем тег
        if (target.tagName === 'IMG') {
            url = target.src || target.currentSrc;
        } else if (target.tagName === 'VIDEO') {
            url = target.currentSrc || target.src;
        }

        if (!url) return;

        // Полностью блокируем стандартное поведение сайта и браузера
        e.preventDefault();
        e.stopPropagation();

        // Извлекаем имя файла
        const filename = url.split('/').pop().split(/[?#]/)[0] || 'media_file';

        // Используем встроенный загрузчик расширения, который обходит CORS restrictions
        GM_download({
            url: url,
            name: filename,
            onerror: (err) => {
                console.error('Download failed via GM_download:', err);
                // На крайний случай — открываем, если вообще всё сломалось
                window.open(url, '_blank');
            }
        });
    }, true); // Перехватываем клик на самом раннем этапе
})();
