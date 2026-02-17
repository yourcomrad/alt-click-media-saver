# Alt+Click Media Saver

Alt+Click Media Saver is a universal userscript that allows you to instantly save images and videos from any website using **Alt + Click**.

## Features

- 💾 **Alt + Click** on images to instantly download them
- 💾 **Alt + Click** on videos to download video files
- 🌍 Works on almost all websites
- ⚡ No dialogs, no "Save As" window
- 🧩 **Does NOT conflict** with MP4/WEBM Helper or other media userscripts

## How it works

The script downloads media using `fetch + Blob`, bypassing browser
limitations of the `download` attribute.

## Limitations

- ❌ Does not work with:
  - `blob:` URLs
  - HLS / DASH streams (`.m3u8`, `.mpd`)
  - DRM-protected media
- Some servers may block cross-origin requests (rare)

## Compatibility

- Tested with:
  - Tampermonkey
  - Violentmonkey
- Fully compatible with MP4/WEBM Helper
- No shared storage, no overlapping shortcuts or event listeners

## Installation

1. Install Tampermonkey or Violentmonkey
2. Open the userscript file:
   `alt-click-media-saver.user.js`
3. Click **Install**

## License

MIT
