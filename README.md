# Camera Animation Tool

A premium, standalone static `model-viewer` camera animation tool with built-in Progressive Web App (PWA) support.

## Features

- **Installable Desktop/Mobile App**: Package and run the tool locally without browser borders.
- **Offline Mode**: Supported by a built-in Service Worker caching all core assets.
- **Interactive Timeline**: Scrub and snap frames, add auto-keyframes, and nudge values.
- **AI Camera Director**: Generate smooth camera motion paths from text prompts (orbit sweeps, push-ins, etc.).
- **Camera Path Visualizer**: Renders the 3D camera trajectory directly in the viewer context.
- **Preset Library**: Quickly apply and save custom presets (Hero Push, Wide Establish, Close Detail).

---

## How to Run & Install

### 1. Run Locally
You can run the app locally in one of two ways:
- **Direct Launch**: Open [index.html](file:///c:/Users/ravit/Documents/Codex/2026-05-22/https-camera-animation-standalone-vercel-app/index.html) directly in any modern browser.
- **Local Web Server**: Serve the workspace using any simple HTTP server:
  ```bash
  # Example: Accessing via the running PowerShell listener
  http://127.0.0.1:4173/
  ```

### 2. Install on Desktop/Mobile (PWA)
When running the app on a web server or hosted online:
1. Open the URL in Google Chrome, Microsoft Edge, or Safari.
2. Click the **Install** (monitor-arrow or `+`) icon in the address bar.
3. The tool will install as a native application with a desktop shortcut and its own standalone window.

---

## Deployment on Vercel

The project is pre-configured for static hosting on Vercel via [vercel.json](file:///c:/Users/ravit/Documents/Codex/2026-05-22/https-camera-animation-standalone-vercel-app/vercel.json):
1. Connect your repository to Vercel.
2. Click **Deploy**. Vercel will automatically read [vercel.json](file:///c:/Users/ravit/Documents/Codex/2026-05-22/https-camera-animation-standalone-vercel-app/vercel.json) and compile the site using the correct static preset without any Next.js configuration errors.

---

## File Schema Support

### Camera JSON
The app accepts arrays or objects containing `keyframes`, `cameraKeyframes`, `cameras`, or `frames`.
Supported frame fields:
- `time`, `t`, or `seconds`
- `orbit` / `cameraOrbit`: `{ "yaw": 0, "pitch": 75, "radius": 3 }`
- `position` / `cameraPosition` / `eye`: `{ "x": 2, "y": 1, "z": 3 }`
- `target` / `cameraTarget` / `lookAt`: `{ "x": 0, "y": 0, "z": 0 }`
- `fov` or `fieldOfView`
- `lens`, `lensMm`, or `focalLength` (standard full-frame millimeter equivalent)

*Note: When a keyframe uses standard absolute Cartesian `position`, the app automatically resolves it to a stable spherical `model-viewer` orbit centered on the target.*

### Labels JSON
Supports annotations matched to specific frames or visibility ranges:
```json
{
  "Front detail": {
    "position": { "x": 0, "y": 0.4, "z": 0.8 },
    "keyframes": [30, 60, 120]
  }
}
```
