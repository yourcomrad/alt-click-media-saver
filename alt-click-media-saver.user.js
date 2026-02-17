// ==UserScript==
// @name         Alt+Click Media Saver (images & videos)
// @namespace    alt-click-media-saver
// @version      1.1
// @description  Save images and videos with Alt+Click on any website (fetch + blob)
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    async function saveByFetch(url) {
        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) throw new Error('Fetch failed');

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const filename =
                url.split('/').pop()?.split('?')[0] ||
                `file_${Date.now()}`;

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.warn('Alt+Click save failed:', err);
        }
    }

    function getMediaURL(el) {
        if (!el) return null;

        if (el.tagName === 'IMG') return el.currentSrc || el.src;
        if (el.tagName === 'VIDEO') return el.currentSrc || el.src;

        const img = el.closest('img');
        if (img) return img.currentSrc || img.src;

        const video = el.closest('video');
        if (video) return video.currentSrc || video.src;

        return null;
    }

    document.addEventListener('click', e => {
        if (!e.altKey || e.button !== 0) return;

        const url = getMediaURL(e.target);
        if (!url) return;

        // ❌ don't mess with blob / stream
        if (url.startsWith('blob:') || url.includes('.m3u8')) return;

        e.preventDefault();
        e.stopPropagation();

        saveByFetch(url);
    }, true);
})();
