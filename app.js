const APP_VERSION = "v2026.05.25.8";
const modelViewer = document.querySelector("#modelViewer");
const importScreen = document.querySelector("#importScreen");
const statusText = document.querySelector("#statusText");
const appVersionBadge = document.querySelector("#appVersionBadge");
const dropOverlay = document.querySelector("#dropOverlay");
const keyframeList = document.querySelector("#keyframeList");
const labelList = document.querySelector("#labelList");
const presetSelect = document.querySelector("#presetSelect");
const lensReadout = document.querySelector("#lensReadout");
const fovReadout = document.querySelector("#fovReadout");
const appShell = document.querySelector(".app-shell");
const sideToggleButton = document.querySelector("#sideToggleButton");
const closePanelButton = document.querySelector("#closePanelButton");
const sidebarDrawerHandle = document.querySelector("#sidebarDrawerHandle");
const timelineMarkers = document.querySelector("#timelineMarkers");
const timelineFrameReadout = document.querySelector("#timelineFrameReadout");
const currentFrameReadout = document.querySelector("#currentFrameReadout");
const totalFrameReadout = document.querySelector("#totalFrameReadout");
const zoomReadout = document.querySelector("#zoomReadout");
const playheadBubble = document.querySelector("#playheadBubble");
const timelineScale = document.querySelector("#timelineScale");
const currentOrbitReadout = document.querySelector("#currentOrbitReadout");
const currentFovValueReadout = document.querySelector("#currentFovValueReadout");
const currentTargetReadout = document.querySelector("#currentTargetReadout");
const audioStatus = document.querySelector("#audioStatus");
const timelineAudio = document.querySelector("#timelineAudio");
const audioTrack = document.querySelector("#audioTrack");
const audioTrackLabel = document.querySelector("#audioTrackLabel");
const audioWaveform = document.querySelector("#audioWaveform");
const modelAnimationStatus = document.querySelector("#modelAnimationStatus");
const timelineTrackWrap = document.querySelector(".timeline-track-wrap");
const timelinePanel = document.querySelector(".timeline-panel");
const menuDropdowns = Array.from(document.querySelectorAll(".menu-dropdown"));
const cursorImportMenu = document.querySelector("#cursorImportMenu");
const mousePosition = { x: 24, y: 48 };

if (appVersionBadge) {
  appVersionBadge.textContent = APP_VERSION;
  appVersionBadge.title = `App version ${APP_VERSION}`;
}

const inputs = {
  startModel: document.querySelector("#startModelInput"),
  startCamera: document.querySelector("#startCameraInput"),
  startLabel: document.querySelector("#startLabelInput"),
  startAudio: document.querySelector("#startAudioInput"),
  project: document.querySelector("#projectInput"),
  model: document.querySelector("#modelInput"),
  camera: document.querySelector("#cameraInput"),
  labels: document.querySelector("#labelInput"),
  audio: document.querySelector("#audioInput"),
  animation: document.querySelector("#animationSelect"),
  syncModelAnimation: document.querySelector("#syncModelAnimationInput"),
  timeline: document.querySelector("#timelineInput"),
  bottomTimeline: document.querySelector("#bottomTimelineInput"),
  duration: document.querySelector("#durationInput"),
  smooth: document.querySelector("#smoothInput"),
  lens: document.querySelector("#lensInput"),
  yaw: document.querySelector("#yawInput"),
  pitch: document.querySelector("#pitchInput"),
  radius: document.querySelector("#radiusInput"),
  targetX: document.querySelector("#targetXInput"),
  targetY: document.querySelector("#targetYInput"),
  targetZ: document.querySelector("#targetZInput"),
  shakeEnabled: document.querySelector("#shakeEnabledInput"),
  shakeIntensity: document.querySelector("#shakeIntensityInput"),
  shakeSpeed: document.querySelector("#shakeSpeedInput"),
  shakeProfile: document.querySelector("#shakeProfileSelect"),
  presetSelect: document.querySelector("#presetSelect"),
  easingSelect: document.querySelector("#easingSelect"),
  aiPrompt: document.querySelector("#aiPromptInput"),
  aiCustomRange: document.querySelector("#aiCustomRangeToggle"),
  aiFrameRangeFields: document.querySelector("#aiFrameRangeFields"),
  aiStartFrame: document.querySelector("#aiStartFrameInput"),
  aiEndFrame: document.querySelector("#aiEndFrameInput"),
};

const buttons = {
  enterEditor: document.querySelector("#enterEditorButton"),
  skipImport: document.querySelector("#skipImportButton"),
  play: document.querySelector("#playButton"),
  previewMode: document.querySelector("#previewModeButton"),
  fit: document.querySelector("#fitModelButton"),
  reset: document.querySelector("#resetCameraButton"),
  add: document.querySelector("#addKeyframeButton"),
  addShakeKeyframe: document.querySelector("#addShakeKeyframeButton"),
  timelineToggle: document.querySelector("#timelineToggleButton"),
  snapToggle: document.querySelector("#snapToggleButton"),
  loopToggle: document.querySelector("#loopToggleButton"),
  firstFrame: document.querySelector("#firstFrameButton"),
  prevKeyframe: document.querySelector("#prevKeyframeButton"),
  nextKeyframe: document.querySelector("#nextKeyframeButton"),
  lastFrame: document.querySelector("#lastFrameButton"),
  exportJson: document.querySelector("#exportJsonButton"),
  saveProject: document.querySelector("#saveProjectButton"),
  copyKeyframe: document.querySelector("#copyKeyframeButton"),
  pasteKeyframe: document.querySelector("#pasteKeyframeButton"),
  deleteKeyframe: document.querySelector("#deleteKeyframeButton"),
  nudgeKeyframeLeft: document.querySelector("#nudgeKeyframeLeftButton"),
  nudgeKeyframeRight: document.querySelector("#nudgeKeyframeRightButton"),
  savePreset: document.querySelector("#savePresetButton"),
  createPreset: document.querySelector("#createPresetButton"),
  syncCurrentValues: document.querySelector("#syncCurrentValuesButton"),
  autoKeyToggle: document.querySelector("#autoKeyToggleButton"),
  aiGenerate: document.querySelector("#aiGenerateButton"),
};

const startStatuses = {
  model: document.querySelector("#startModelStatus"),
  camera: document.querySelector("#startCameraStatus"),
  labels: document.querySelector("#startLabelStatus"),
  audio: document.querySelector("#startAudioStatus"),
};

const CAMERA_PRESETS = [
  {
    name: "Hero Push",
    description: "Slow push-in with a natural 35mm lens.",
    duration: 5,
    lens: 35,
    frames: [
      { time: 0, orbit: { yaw: -12, pitch: 76, radius: 4.4 }, target: { x: 0, y: 0.18, z: 0 } },
      { time: 5, orbit: { yaw: 4, pitch: 73, radius: 2.7 }, target: { x: 0, y: 0.22, z: 0 } },
    ],
  },
  {
    name: "Wide Establish",
    description: "Wide 24mm room reveal with a soft sweep.",
    duration: 6,
    lens: 24,
    frames: [
      { time: 0, orbit: { yaw: -38, pitch: 78, radius: 5.2 }, target: { x: 0, y: 0.08, z: 0 } },
      { time: 6, orbit: { yaw: 32, pitch: 76, radius: 5.1 }, target: { x: 0.05, y: 0.12, z: 0 } },
    ],
  },
  {
    name: "Close Detail",
    description: "85mm detail move with less perspective distortion.",
    duration: 4,
    lens: 85,
    frames: [
      { time: 0, orbit: { yaw: 14, pitch: 72, radius: 3.2 }, target: { x: 0.15, y: 0.28, z: 0 } },
      { time: 4, orbit: { yaw: 8, pitch: 70, radius: 2.1 }, target: { x: 0.12, y: 0.32, z: 0 } },
    ],
  },
  {
    name: "Orbit Reveal",
    description: "Clean 180 degree product-style orbit.",
    duration: 7,
    lens: 50,
    frames: [
      { time: 0, orbit: { yaw: -90, pitch: 76, radius: 3.6 }, target: { x: 0, y: 0.18, z: 0 } },
      { time: 3.5, orbit: { yaw: 0, pitch: 74, radius: 3.4 }, target: { x: 0, y: 0.18, z: 0 } },
      { time: 7, orbit: { yaw: 90, pitch: 76, radius: 3.6 }, target: { x: 0, y: 0.18, z: 0 } },
    ],
  },
  {
    name: "Dolly Zoom",
    description: "Radius pulls back while lens tightens.",
    duration: 5,
    lens: 28,
    frames: [
      { time: 0, orbit: { yaw: 0, pitch: 74, radius: 2.4 }, target: { x: 0, y: 0.22, z: 0 }, lens: 28 },
      { time: 5, orbit: { yaw: 0, pitch: 74, radius: 4.6 }, target: { x: 0, y: 0.22, z: 0 }, lens: 80 },
    ],
  },
  {
    name: "Interview",
    description: "Subtle locked-off movement for character shots.",
    duration: 8,
    lens: 55,
    frames: [
      { time: 0, orbit: { yaw: -4, pitch: 72, radius: 3.1 }, target: { x: 0, y: 0.35, z: 0 } },
      { time: 8, orbit: { yaw: 5, pitch: 72, radius: 2.9 }, target: { x: 0, y: 0.35, z: 0 } },
    ],
  },
];

const state = {
  modelUrl: "",
  audioUrl: "",
  audioDuration: 0,
  audioName: "",
  modelAnimations: [],
  keyframes: [],
  labels: [],
  duration: 6,
  isPlaying: false,
  startedAt: 0,
  pausedAt: 0,
  rafId: 0,
  defaultCamera: {
    orbit: { yaw: 0, pitch: 75, radius: 3 },
    target: { x: 0, y: 0, z: 0 },
    lens: 35,
    fov: 37.8,
  },
  selectedKeyframeIndex: 0,
  copiedKeyframe: null,
  draggingKeyframeIndex: -1,
  draggingKeyframeRef: null,
  snapToFiveFrames: false,
  loopPlayback: false,
  shakeEnabled: false,
  shakeIntensity: 0.3,
  shakeSpeed: 2.0,
  shakeProfile: "continuous",
  presets: [...CAMERA_PRESETS],
  selectedPresetIndex: -1,
  timelineViewStartFrame: 0,
  timelineViewEndFrame: 0,
  fps: 24,
  modelAnimationDuration: 0,
  isMouseOverTimeline: false,
  autoKeyframe: false,
  aiStartFrameEdited: false,
  aiEndFrameEdited: false,
};

function cloneKeyframe(frame) {
  return {
    time: frame.time,
    orbit: { ...frame.orbit },
    target: { ...frame.target },
    lens: frame.lens,
    fov: frame.fov,
    shake: frame.shake,
    easing: frame.easing ?? 'easeInOut',
    source: frame.source,
  };
}



function lensToFov(lensMm) {
  const sensorHeight = 24;
  return (2 * Math.atan(sensorHeight / (2 * Math.max(lensMm, 1))) * 180) / Math.PI;
}

function fovToLens(fov) {
  const sensorHeight = 24;
  return sensorHeight / (2 * Math.tan((clamp(fov, 1, 120) * Math.PI) / 360));
}

function setStatus(message, tone = "normal") {
  statusText.textContent = message;
  statusText.style.color = tone === "warn" ? "var(--warn)" : "var(--muted)";
}

function updateStartStatus(kind, message) {
  startStatuses[kind].textContent = message;
}

function openEditor() {
  importScreen.classList.add("hidden");
  document.body.classList.add("editor-open");
}

function updateDetailsMenuLabel() {
  if (!sideToggleButton) return;
  const label = sideToggleButton.querySelector("span");
  const isClosed = appShell.classList.contains("panel-closed");
  sideToggleButton.setAttribute("aria-expanded", String(!isClosed));
  if (label) label.textContent = isClosed ? "Open Controls" : "Close Controls";
}

function closeToolbarMenus(exceptMenu = null) {
  menuDropdowns.forEach((menu) => {
    if (menu !== exceptMenu) menu.removeAttribute("open");
  });
}

function closeCursorImportMenu() {
  if (cursorImportMenu) cursorImportMenu.hidden = true;
}

function openCursorImportMenu() {
  if (!cursorImportMenu) return;
  closeToolbarMenus();
  cursorImportMenu.hidden = false;

  const rect = cursorImportMenu.getBoundingClientRect();
  const left = clamp(mousePosition.x, 8, window.innerWidth - rect.width - 8);
  const top = clamp(mousePosition.y, 8, window.innerHeight - rect.height - 8);
  cursorImportMenu.style.left = `${left}px`;
  cursorImportMenu.style.top = `${top}px`;
}

function updateAiFrameRangeState() {
  const enabled = !!inputs.aiCustomRange?.checked;
  if (inputs.aiStartFrame) inputs.aiStartFrame.disabled = !enabled;
  if (inputs.aiEndFrame) inputs.aiEndFrame.disabled = !enabled;
  if (inputs.aiFrameRangeFields) inputs.aiFrameRangeFields.classList.toggle("disabled", !enabled);
  if (!enabled) {
    if (inputs.aiStartFrame) inputs.aiStartFrame.value = "";
    if (inputs.aiEndFrame) inputs.aiEndFrame.value = "";
    state.aiStartFrameEdited = false;
    state.aiEndFrameEdited = false;
  } else if (inputs.aiStartFrame && inputs.aiStartFrame.value === "") {
    inputs.aiStartFrame.value = getVisibleTimelineFrame();
    state.aiStartFrameEdited = false;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function parseNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function readVector(value, fallback = { x: 0, y: 0, z: 0 }) {
  if (Array.isArray(value)) {
    return {
      x: parseNumber(value[0], fallback.x),
      y: parseNumber(value[1], fallback.y),
      z: parseNumber(value[2], fallback.z),
    };
  }

  if (value && typeof value === "object") {
    return {
      x: parseNumber(value.x ?? value[0], fallback.x),
      y: parseNumber(value.y ?? value[1], fallback.y),
      z: parseNumber(value.z ?? value[2], fallback.z),
    };
  }

  return { ...fallback };
}

function positionToOrbit(position, target) {
  const dx = position.x - target.x;
  const dy = position.y - target.y;
  const dz = position.z - target.z;
  const radius = Math.max(Math.hypot(dx, dy, dz), 0.01);
  const yaw = (Math.atan2(dx, dz) * 180) / Math.PI;
  const pitch = clamp((Math.acos(clamp(dy / radius, -1, 1)) * 180) / Math.PI, 1, 179);
  return { yaw, pitch, radius };
}

function normalizeAngleDegrees(value, fallback) {
  const number = parseNumber(value, fallback);
  return Math.abs(number) <= Math.PI * 2 ? (number * 180) / Math.PI : number;
}

function readCameraTarget(raw) {
  return readVector(
    raw.target
      ?? raw.cameraTarget
      ?? raw.lookAt
      ?? raw.look_at
      ?? raw.focalPoint
      ?? raw.focus
      ?? raw.center,
    state.defaultCamera.target,
  );
}

function readFrameTime(raw, index, totalDuration) {
  if (raw.frame !== undefined || raw.frameNumber !== undefined || raw.frameIndex !== undefined) {
    return parseNumber(raw.frame ?? raw.frameNumber ?? raw.frameIndex, 0) / state.fps;
  }

  if (raw.time !== undefined || raw.seconds !== undefined || raw.t !== undefined) {
    return parseNumber(raw.time ?? raw.seconds ?? raw.t, 0);
  }

  const progressFallback = totalDuration > 0 ? index / Math.max(totalDuration - 1, 1) : 0;
  return progressFallback * state.duration;
}

function normalizeKeyframe(raw, index, totalDuration) {
  if (raw.properties) {
    const props = raw.properties;
    const target = {
      x: parseNumber(Array.isArray(props.targetX) ? props.targetX[0] : props.targetX, state.defaultCamera.target.x),
      y: parseNumber(Array.isArray(props.targetY) ? props.targetY[0] : props.targetY, state.defaultCamera.target.y),
      z: parseNumber(Array.isArray(props.targetZ) ? props.targetZ[0] : props.targetZ, state.defaultCamera.target.z),
    };
    const orbit = {
      yaw: parseNumber(Array.isArray(props.theta) ? props.theta[0] : props.theta, state.defaultCamera.orbit.yaw),
      pitch: parseNumber(Array.isArray(props.phi) ? props.phi[0] : props.phi, state.defaultCamera.orbit.pitch),
      radius: Math.max(parseNumber(Array.isArray(props.radius) ? props.radius[0] : props.radius, state.defaultCamera.orbit.radius), 0.01),
    };
    const fov = parseNumber(Array.isArray(props.fov) ? props.fov[0] : props.fov, state.defaultCamera.fov);
    const lens = fovToLens(fov);
    const time = readFrameTime(raw, index, totalDuration);

    return {
      time,
      orbit,
      target,
      fov,
      lens,
      shake: parseNumber(raw.shake ?? (raw.shakeEnabled ? 0.3 : 0), 0.3),
      easing: raw.easing ?? "easeInOut",
      source: raw.source,
    };
  }

  const target = readCameraTarget(raw);
  let orbit;

  if (raw.orbit || raw.cameraOrbit) {
    const source = raw.orbit ?? raw.cameraOrbit;
    orbit = {
      yaw: source.yaw !== undefined 
        ? parseNumber(source.yaw, state.defaultCamera.orbit.yaw)
        : source.azimuth !== undefined
        ? parseNumber(source.azimuth, state.defaultCamera.orbit.yaw)
        : normalizeAngleDegrees(source.theta, state.defaultCamera.orbit.yaw),
      pitch: source.pitch !== undefined
        ? parseNumber(source.pitch, state.defaultCamera.orbit.pitch)
        : source.polar !== undefined
        ? parseNumber(source.polar, state.defaultCamera.orbit.pitch)
        : normalizeAngleDegrees(source.phi, state.defaultCamera.orbit.pitch),
      radius: Math.max(parseNumber(source.radius ?? source.distance, state.defaultCamera.orbit.radius), 0.01),
    };
  } else if (raw.rotation || raw.cameraRotation || raw.euler) {
    const source = raw.rotation ?? raw.cameraRotation ?? raw.euler;
    const position = readVector(raw.position ?? raw.cameraPosition ?? raw.eye ?? raw.location, {
      x: state.defaultCamera.orbit.radius,
      y: state.defaultCamera.orbit.radius,
      z: state.defaultCamera.orbit.radius,
    });
    orbit = positionToOrbit(position, target);
    orbit.yaw = source.yaw !== undefined 
      ? parseNumber(source.yaw, orbit.yaw) 
      : normalizeAngleDegrees(source.y ?? source[1], orbit.yaw);
    orbit.pitch = source.pitch !== undefined 
      ? parseNumber(source.pitch, orbit.pitch) 
      : normalizeAngleDegrees(source.x ?? source[0], orbit.pitch);
  } else {
    const position = readVector(raw.position ?? raw.cameraPosition ?? raw.eye ?? raw.location, {
      x: state.defaultCamera.orbit.radius,
      y: state.defaultCamera.orbit.radius,
      z: state.defaultCamera.orbit.radius,
    });
    orbit = positionToOrbit(position, target);
  }

  const time = readFrameTime(raw, index, totalDuration);

  return {
    time,
    orbit,
    target,
    fov: parseNumber(raw.fov ?? raw.fieldOfView, state.defaultCamera.fov),
    lens: parseNumber(raw.lens ?? raw.lensMm ?? raw.focalLength, fovToLens(raw.fov ?? raw.fieldOfView ?? state.defaultCamera.fov)),
    shake: parseNumber(raw.shake ?? raw.shakeIntensity ?? (raw.shakeEnabled ? 0.3 : 0), 0.3),
    easing: raw.easing ?? "easeInOut",
    source: raw.source,
  };
}

function extractCameraFrames(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.keyframes)) return json.keyframes;
  if (Array.isArray(json.cameraKeyframes)) return json.cameraKeyframes;
  if (Array.isArray(json.cameras)) return json.cameras;
  if (Array.isArray(json.frames)) return json.frames;
  if (json.camera && typeof json.camera === "object") return [json.camera];
  return [];
}

function setKeyframes(rawFrames, duration) {
  const frames = rawFrames
    .map((frame, index) => normalizeKeyframe(frame, index, rawFrames.length))
    .sort((a, b) => a.time - b.time);

  state.keyframes = frames;
  
  const lastKeyframeTime = state.keyframes.at(-1)?.time || 0.2;
  
  if (duration !== undefined && duration !== null) {
    const durationValue = parseNumber(duration, 6);
    const calculatedDuration = durationValue > 60 ? durationValue / state.fps : durationValue;
    state.duration = Math.max(
      calculatedDuration,
      lastKeyframeTime,
      state.modelAnimationDuration,
      0.2
    );
  } else {
    state.duration = Math.max(
      parseNumber(inputs.duration.value, 6),
      lastKeyframeTime,
      state.modelAnimationDuration,
      0.2,
    );
  }
  inputs.duration.value = state.duration.toFixed(1);
  
  // Reset timeline view bounds to show all keyframes
  state.timelineViewStartFrame = 0;
  state.timelineViewEndFrame = 0;
  prevTotalFrames = 0;
  ensureTimelineView();

  renderKeyframes();
  renderTimelineMarkers();
  seek(0);
  drawCameraPath();
}

function describeCameraTimeline() {
  if (!state.keyframes.length) return "No camera keyframes loaded.";
  const firstFrame = getCurrentFrame(state.keyframes[0].time);
  const lastFrame = getCurrentFrame(state.keyframes.at(-1).time);
  return `${state.keyframes.length} camera keyframes loaded, frames ${firstFrame}-${lastFrame}.`;
}

function createCurrentKeyframe(time = getTimelineTime()) {
  const lens = parseNumber(inputs.lens.value, state.defaultCamera.lens);
  const easingSelect = document.querySelector("#easingSelect");

  return {
    time,
    orbit: {
      yaw: parseNumber(inputs.yaw.value, state.defaultCamera.orbit.yaw),
      pitch: parseNumber(inputs.pitch.value, state.defaultCamera.orbit.pitch),
      radius: Math.max(parseNumber(inputs.radius.value, state.defaultCamera.orbit.radius), 0.01),
    },
    target: readCurrentTarget(),
    lens,
    fov: lensToFov(lens),
    shake: parseNumber(inputs.shakeIntensity.value, 0.3),
    easing: easingSelect ? easingSelect.value : 'easeInOut',
  };
}

function readCurrentTarget() {
  return {
    x: parseNumber(inputs.targetX.value, state.defaultCamera.target.x),
    y: parseNumber(inputs.targetY.value, state.defaultCamera.target.y),
    z: parseNumber(inputs.targetZ.value, state.defaultCamera.target.z),
  };
}

function formatOrbit(orbit) {
  return `${orbit.yaw.toFixed(2)}deg ${orbit.pitch.toFixed(2)}deg ${orbit.radius.toFixed(3)}m`;
}

function formatTarget(target) {
  return `${target.x.toFixed(3)}m ${target.y.toFixed(3)}m ${target.z.toFixed(3)}m`;
}

function updateCurrentValuesDisplay(frame = createCurrentKeyframe(getTimelineTime())) {
  if (currentOrbitReadout) {
    currentOrbitReadout.textContent = `${frame.orbit.yaw.toFixed(0)}deg ${frame.orbit.pitch.toFixed(0)}deg ${frame.orbit.radius.toFixed(2)}m`;
  }
  if (currentFovValueReadout) {
    currentFovValueReadout.textContent = `${frame.fov.toFixed(1)}deg`;
  }
  if (currentTargetReadout) {
    currentTargetReadout.textContent = `${frame.target.x.toFixed(2)}m ${frame.target.y.toFixed(2)}m ${frame.target.z.toFixed(2)}m`;
  }
}

function captureLiveCameraFrame(time = getTimelineTime()) {
  const fallback = createCurrentKeyframe(time);
  const frame = cloneKeyframe(fallback);
  frame.time = time;

  try {
    const orbit = modelViewer.getCameraOrbit?.();
    if (orbit) {
      frame.orbit = {
        yaw: (orbit.theta * 180) / Math.PI,
        pitch: (orbit.phi * 180) / Math.PI,
        radius: Math.max(parseNumber(orbit.radius, frame.orbit.radius), 0.01),
      };
    }
  } catch (error) {
    const orbitAttr = modelViewer.cameraOrbit;
    if (orbitAttr) {
      const parts = String(orbitAttr).trim().split(/\s+/);
      if (parts.length >= 3) {
        frame.orbit = {
          yaw: parseNumber(parseFloat(parts[0]), frame.orbit.yaw),
          pitch: parseNumber(parseFloat(parts[1]), frame.orbit.pitch),
          radius: Math.max(parseNumber(parseFloat(parts[2]), frame.orbit.radius), 0.01),
        };
      }
    }
  }

  try {
    const target = modelViewer.getCameraTarget?.();
    if (target) {
      frame.target = {
        x: parseNumber(target.x, frame.target.x),
        y: parseNumber(target.y, frame.target.y),
        z: parseNumber(target.z, frame.target.z),
      };
    }
  } catch (error) {
    const targetAttr = modelViewer.cameraTarget;
    if (targetAttr) {
      const parts = String(targetAttr).trim().split(/\s+/);
      if (parts.length >= 3) {
        frame.target = {
          x: parseNumber(parseFloat(parts[0]), frame.target.x),
          y: parseNumber(parseFloat(parts[1]), frame.target.y),
          z: parseNumber(parseFloat(parts[2]), frame.target.z),
        };
      }
    }
  }

  try {
    const fov = modelViewer.getFieldOfView?.();
    if (fov) {
      frame.fov = parseNumber(fov, frame.fov);
      frame.lens = fovToLens(frame.fov);
    }
  } catch (error) {
    const fieldOfView = parseNumber(parseFloat(modelViewer.fieldOfView), frame.fov);
    frame.fov = fieldOfView;
    frame.lens = fovToLens(fieldOfView);
  }

  return frame;
}

function syncInputsFromLiveCamera() {
  let didSync = false;

  try {
    const orbit = modelViewer.getCameraOrbit();
    if (orbit) {
      inputs.yaw.value = ((orbit.theta * 180) / Math.PI).toFixed(1);
      inputs.pitch.value = ((orbit.phi * 180) / Math.PI).toFixed(1);
      inputs.radius.value = orbit.radius.toFixed(2);
      didSync = true;
    }

    const target = modelViewer.getCameraTarget();
    if (target) {
      inputs.targetX.value = target.x.toFixed(2);
      inputs.targetY.value = target.y.toFixed(2);
      inputs.targetZ.value = target.z.toFixed(2);
      didSync = true;
    }

    const fov = modelViewer.getFieldOfView();
    if (fov) {
      const lens = fovToLens(fov);
      inputs.lens.value = Math.round(lens);
      lensReadout.textContent = `${Math.round(lens)}mm`;
      fovReadout.textContent = `${fov.toFixed(1)}deg FOV`;
      didSync = true;
    }
  } catch (error) {
    const orbitAttr = modelViewer.cameraOrbit;
    if (orbitAttr) {
      const parts = orbitAttr.trim().split(/\s+/);
      if (parts.length >= 3) {
        inputs.yaw.value = parseFloat(parts[0]).toFixed(1);
        inputs.pitch.value = parseFloat(parts[1]).toFixed(1);
        inputs.radius.value = parseFloat(parts[2]).toFixed(2);
        didSync = true;
      }
    }

    const targetAttr = modelViewer.cameraTarget;
    if (targetAttr) {
      const parts = targetAttr.trim().split(/\s+/);
      if (parts.length >= 3) {
        inputs.targetX.value = parseFloat(parts[0]).toFixed(2);
        inputs.targetY.value = parseFloat(parts[1]).toFixed(2);
        inputs.targetZ.value = parseFloat(parts[2]).toFixed(2);
        didSync = true;
      }
    }
  }

  const frame = createCurrentKeyframe(getTimelineTime());
  updateCurrentValuesDisplay(frame);
  return didSync;
}

function applyCamera(frame, options = {}) {
  const smooth = clamp(parseNumber(inputs.smooth.value, 0.35), 0, 1);
  const lens = clamp(parseNumber(frame.lens, parseNumber(inputs.lens.value, 35)), 12, 135);
  const fov = lensToFov(lens);
  modelViewer.interpolationDecay = options.instant ? "0" : String(smooth);

  // Apply camera shake noise offsets
  let yaw = frame.orbit.yaw;
  let pitch = frame.orbit.pitch;
  let targetX = frame.target.x;
  let targetY = frame.target.y;

  if (state.shakeEnabled) {
    const elapsed = getTimelineTime();
    const intensity = frame.shake ?? state.shakeIntensity;
    let factor = 1.0;
    
    if (state.shakeProfile === 'impact') {
      // Rapid decay: intensity decays to 0 over 2.0s
      factor = Math.exp(-elapsed * 3.0);
    } else if (state.shakeProfile === 'rumble') {
      // Rumbling has high frequency erratic shakes
      const noise = Math.sin(elapsed * 14.0) * Math.cos(elapsed * 8.2);
      factor = 0.4 + 0.6 * Math.abs(noise); 
    }
    
    const speed = state.shakeSpeed;
    const t = elapsed * speed;

    const yawNoise = Math.sin(t * 2.3) * Math.cos(t * 0.7) * intensity * 4.5 * factor;
    const pitchNoise = Math.cos(t * 1.9) * Math.sin(t * 1.1) * intensity * 3.0 * factor;
    const targetNoiseX = Math.sin(t * 1.3) * Math.cos(t * 2.9) * intensity * 0.12 * factor;
    const targetNoiseY = Math.cos(t * 2.7) * Math.sin(t * 1.7) * intensity * 0.12 * factor;

    yaw += yawNoise;
    pitch += pitchNoise;
    targetX += targetNoiseX;
    targetY += targetNoiseY;
  }

  modelViewer.cameraOrbit = `${yaw.toFixed(2)}deg ${pitch.toFixed(2)}deg ${frame.orbit.radius.toFixed(3)}m`;
  modelViewer.cameraTarget = `${targetX.toFixed(3)}m ${targetY.toFixed(3)}m ${frame.target.z.toFixed(3)}m`;
  modelViewer.fieldOfView = `${fov.toFixed(2)}deg`;
  if (options.instant && typeof modelViewer.jumpCameraToGoal === "function") {
    modelViewer.jumpCameraToGoal();
  }

  inputs.yaw.value = frame.orbit.yaw.toFixed(1);
  inputs.pitch.value = frame.orbit.pitch.toFixed(1);
  inputs.radius.value = frame.orbit.radius.toFixed(2);
  inputs.targetX.value = frame.target.x.toFixed(2);
  inputs.targetY.value = frame.target.y.toFixed(2);
  inputs.targetZ.value = frame.target.z.toFixed(2);
  inputs.lens.value = lens.toFixed(0);
  lensReadout.textContent = `${lens.toFixed(0)}mm`;
  fovReadout.textContent = `${fov.toFixed(1)}deg FOV`;
  updateCurrentValuesDisplay({ ...frame, fov });

  // Update lens pill active states
  const lensValRounded = Math.round(lens);
  document.querySelectorAll(".lens-pills button").forEach((btn) => {
    const pillLensVal = Number(btn.dataset.lens);
    btn.classList.toggle("active", pillLensVal === lensValRounded);
  });
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpAngle(a, b, t) {
  let delta = ((b - a + 540) % 360) - 180;
  return a + delta * t;
}

function generateAiSequence(promptText) {
  const query = promptText.toLowerCase().trim();
  if (!query) {
    setStatus("Please enter an AI prompt first.", "warn");
    return;
  }

  if (state.isPlaying) {
    pause();
  }

  const hasKeyword = (keywords) => {
    const list = Array.isArray(keywords) ? keywords : [keywords];
    return list.some(k => {
      const escaped = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`);
      return regex.test(query);
    });
  };

  // 1. Frame Range Parsing. Default starts at playhead; custom range is opt-in.
  const useCustomRange = !!inputs.aiCustomRange?.checked;
  let startFrame = useCustomRange && state.aiStartFrameEdited && inputs.aiStartFrame?.value !== ""
    ? parseInt(inputs.aiStartFrame.value, 10)
    : getVisibleTimelineFrame();
  let endFrame = useCustomRange && state.aiEndFrameEdited && inputs.aiEndFrame?.value ? parseInt(inputs.aiEndFrame.value, 10) : null;

  // Parse prompt ranges only when custom frame range is enabled.
  const rangeMatch = query.match(/(?:frame\s+)?(\d+)\s*(?:to|-)\s*(?:frame\s+)?(\d+)/i);
  if (useCustomRange && rangeMatch) {
    startFrame = parseInt(rangeMatch[1], 10);
    endFrame = parseInt(rangeMatch[2], 10);
  }

  // Parse duration from prompt (e.g. "5s", "5 seconds", "2.5s")
  let parsedDuration = null;
  const durationMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:s|seconds?)\b/i);
  if (durationMatch) {
    parsedDuration = parseFloat(durationMatch[1]);
  }

  // Parse duration in frames from prompt (e.g. "30 frames", "48f")
  let parsedFrames = null;
  const framesMatch = query.match(/(\d+)\s*(?:frames?|f)\b/i);
  if (framesMatch) {
    parsedFrames = parseInt(framesMatch[1], 10);
  }

  // Calculate timeline times
  const startTime = startFrame / state.fps;
  let sequenceDuration = 3.0; // default fallback duration in seconds

  if (endFrame !== null) {
    sequenceDuration = Math.max((endFrame - startFrame) / state.fps, 0.1);
  } else if (parsedDuration !== null) {
    sequenceDuration = parsedDuration;
    endFrame = startFrame + Math.round(sequenceDuration * state.fps);
  } else if (parsedFrames !== null) {
    sequenceDuration = parsedFrames / state.fps;
    endFrame = startFrame + parsedFrames;
  } else {
    // If neither is specified, default to 3s, but clamp so it doesn't exceed current duration unless we are at the end
    const remainingTime = state.duration - startTime;
    sequenceDuration = remainingTime > 0.5 ? Math.min(3.0, remainingTime) : 3.0;
    endFrame = startFrame + Math.round(sequenceDuration * state.fps);
  }
  const endTime = startTime + sequenceDuration;
  const currentCameraFrame = {
    ...captureLiveCameraFrame(startTime),
    time: startTime,
    source: "ai-director",
  };
  updateCurrentValuesDisplay(currentCameraFrame);

  // Synchronize UI inputs to match the resolved range
  if (inputs.aiStartFrame) {
    inputs.aiStartFrame.value = startFrame;
  }
  if (inputs.aiEndFrame) {
    inputs.aiEndFrame.value = endFrame;
  }
  state.aiStartFrameEdited = false;
  state.aiEndFrameEdited = false;

  // 2. Speed / Easing Parsing
  let speed = "easeInOut"; // default
  if (hasKeyword(["linear", "constant"])) {
    speed = "linear";
  } else if (hasKeyword("bounce")) {
    speed = "bounce";
  } else if (hasKeyword(["elastic", "spring"])) {
    speed = "elastic";
  } else if (hasKeyword(["accelerate", "ease-in", "ease in"])) {
    speed = "easeIn";
  } else if (hasKeyword(["decelerate", "ease-out", "ease out"])) {
    speed = "easeOut";
  }

  // 3. Lens/Focal Length Parsing. Default keeps the user's current lens.
  let lens = currentCameraFrame.lens || 35;
  if (hasKeyword(["wide", "establishing"])) {
    lens = 24;
  } else if (hasKeyword(["close-up", "closeup", "detail", "telephoto", "tight"])) {
    lens = 85;
  } else if (hasKeyword(["macro", "portrait"])) {
    lens = 55;
  }

  // 3.5. Camera Shake Parsing
  let parsedShake = state.shakeEnabled;
  let parsedShakeIntensity = state.shakeIntensity;
  let parsedShakeSpeed = state.shakeSpeed;
  let parsedProfile = state.shakeProfile || "continuous";

  if (hasKeyword(["shake", "shaky", "handheld", "jitter", "unsteady", "action", "drop", "impact", "stone", "crash", "explosion", "hit", "fall", "heavy stone", "dropped", "thunderstorm", "thunder", "storm", "earthquake", "rumble", "lightning"])) {
    parsedShake = true;
    
    if (hasKeyword(["drop", "impact", "stone", "crash", "explosion", "hit", "fall", "heavy stone", "dropped"])) {
      parsedProfile = "impact";
      parsedShakeIntensity = 0.85;
      parsedShakeSpeed = 4.5;
    } else if (hasKeyword(["thunderstorm", "thunder", "storm", "earthquake", "rumble", "lightning"])) {
      parsedProfile = "rumble";
      parsedShakeIntensity = 0.70;
      parsedShakeSpeed = 4.0;
    } else if (hasKeyword(["heavy", "extreme", "intense", "strong", "vigorous"])) {
      parsedProfile = "continuous";
      parsedShakeIntensity = 0.8;
      parsedShakeSpeed = 3.5;
    } else if (hasKeyword(["subtle", "light", "slow", "soft", "mild"])) {
      parsedProfile = "continuous";
      parsedShakeIntensity = 0.15;
      parsedShakeSpeed = 1.2;
    } else {
      parsedProfile = "continuous";
      parsedShakeIntensity = 0.35;
      parsedShakeSpeed = 2.0;
    }
  } else if (hasKeyword(["smooth", "stable", "tripod", "static", "no shake", "glide", "steady"])) {
    parsedShake = false;
  }

  // Update global shake state and UI inputs
  state.shakeEnabled = parsedShake;
  state.shakeIntensity = parsedShakeIntensity;
  state.shakeSpeed = parsedShakeSpeed;
  state.shakeProfile = parsedProfile;

  if (inputs.shakeEnabled) {
    inputs.shakeEnabled.checked = parsedShake;
  }
  if (inputs.shakeProfile) {
    inputs.shakeProfile.value = parsedProfile;
    inputs.shakeProfile.disabled = !parsedShake;
  }
  if (inputs.shakeIntensity) {
    inputs.shakeIntensity.value = parsedShakeIntensity.toFixed(2);
    inputs.shakeIntensity.disabled = !parsedShake;
  }
  if (inputs.shakeSpeed) {
    inputs.shakeSpeed.value = parsedShakeSpeed.toFixed(1);
    inputs.shakeSpeed.disabled = !parsedShake;
  }
  if (buttons.addShakeKeyframe) {
    buttons.addShakeKeyframe.disabled = !parsedShake;
  }

  // 4. Direction/Angles extraction relative to current active viewport camera
  const currentYaw = currentCameraFrame.orbit.yaw;
  const currentPitch = currentCameraFrame.orbit.pitch;
  const currentRadius = currentCameraFrame.orbit.radius;
  const currentTarget = currentCameraFrame.target;
  const startFrameData = {
    ...cloneKeyframe(currentCameraFrame),
    time: startTime,
    source: "ai-director",
  };

  let startRadius = currentRadius;

  // Orbit check
  const isOrbit = hasKeyword(["orbit", "sweep", "spin", "around", "rotation"]);
  const isPush = hasKeyword(["push", "dolly in", "dolly-in", "zoom in", "zoom-in", "closer"]);
  const isPull = hasKeyword(["pull", "dolly out", "dolly-out", "zoom out", "zoom-out", "reveal"]);

  // Keep the current screen angle as the anchor. Direction words modify the
  // ending motion relative to the user's camera instead of jumping to fixed
  // world angles like front/left/right.
  let yawOffset = 0;
  let pitchOffset = 0;

  if (hasKeyword("left")) {
    yawOffset = -35;
  } else if (hasKeyword("right")) {
    yawOffset = 35;
  } else if (hasKeyword("back")) {
    yawOffset = 90;
  } else if (hasKeyword("front")) {
    yawOffset = 0;
  }

  if (hasKeyword(["high", "top", "above"])) {
    pitchOffset = -12;
  } else if (hasKeyword(["low", "bottom", "below"])) {
    pitchOffset = 12;
  }

  let generatedFrames = [];
  const makeAiFrame = (time, orbit, target = currentTarget, lensValue = lens) => ({
    time,
    orbit,
    target: { ...target },
    lens: lensValue,
    fov: lensToFov(lensValue),
    shake: parsedShake ? parsedShakeIntensity : 0,
    easing: speed,
    source: "ai-director",
  });

  if (isOrbit) {
    // Determine bounds
    const is360 = hasKeyword(["360", "full", "complete"]);
    const is180 = hasKeyword(["180", "half"]);
    
    let spanYaw = is180 ? 180 : (is360 ? 360 : 90);
    if (hasKeyword(["left", "counter"])) {
      spanYaw = -spanYaw;
    }
    
    const count = is360 ? 4 : 2;
    generatedFrames.push(startFrameData);
    for (let i = 1; i <= count; i++) {
      const ratio = i / count;
      const t = startTime + ratio * sequenceDuration;
      const yaw = currentYaw + ratio * spanYaw;
      const pitch = clamp(currentPitch + (pitchOffset * ratio), 1, 179);
      const radius = startRadius * (hasKeyword("closer") ? 0.8 : 1.0);

      generatedFrames.push(makeAiFrame(t, { yaw, pitch, radius }));
    }
  } else if (isPush) {
    const factor = hasKeyword(["tight", "close"]) ? 0.4 : 0.65;
    generatedFrames = [
      startFrameData,
      makeAiFrame(endTime, {
        yaw: currentYaw + yawOffset,
        pitch: clamp(currentPitch + pitchOffset, 1, 179),
        radius: startRadius * factor,
      })
    ];
  } else if (isPull) {
    const factor = hasKeyword(["far", "wide"]) ? 1.8 : 1.4;
    generatedFrames = [
      startFrameData,
      makeAiFrame(endTime, {
        yaw: currentYaw + yawOffset,
        pitch: clamp(currentPitch + pitchOffset, 1, 179),
        radius: startRadius * factor,
      })
    ];
  } else {
    // Default motion: reveal/sweep/pan from current direction
    const endYawOffset = hasKeyword(["reveal", "sweep"]) ? 45 : 0;
    generatedFrames = [
      startFrameData,
      makeAiFrame(endTime, {
        yaw: currentYaw + yawOffset + endYawOffset,
        pitch: clamp(currentPitch + pitchOffset - 10, 1, 179),
        radius: startRadius,
      })
    ];
  }

  // Normalize generated frames
  const normalizedGenerated = generatedFrames.map((frame, index) => 
    normalizeKeyframe(frame, index, generatedFrames.length)
  );

  // Override camera keyframes in the generated range so running AI Director
  // again replaces the previous AI move instead of stacking duplicate keys.
  state.keyframes = state.keyframes.filter(frame => 
    frame.time < startTime - 0.001 || frame.time > endTime + 0.001
  );

  // Append new keyframes and sort
  state.keyframes = [...state.keyframes, ...normalizedGenerated].sort((a, b) => a.time - b.time);

  // Adjust total duration if new sequence extends past it
  if (endTime > state.duration) {
    state.duration = endTime;
    inputs.duration.value = endTime.toFixed(1);
  }

  renderKeyframes();
  renderTimelineMarkers();
  state.isPlaying = false;
  state.pausedAt = startTime;
  modelViewer.setAttribute("camera-controls", "");
  updateTimeline(startTime);
  if (state.audioDuration && Math.abs(timelineAudio.currentTime - startTime) > 0.08) {
    timelineAudio.currentTime = clamp(startTime, 0, state.audioDuration);
  }
  if (inputs.syncModelAnimation.checked && state.modelAnimationDuration) {
    modelViewer.currentTime = clamp(startTime, 0, state.modelAnimationDuration);
  }
  updateLabelPositions();
  updateLabelVisibilities(startTime);
  applyCamera(startFrameData, { instant: true });
  updatePlaybackButtons();
  drawCameraPath();

  setStatus(`AI start captured: ${formatOrbit(startFrameData.orbit)} at frame ${startFrame}. Press Play to preview.`);
}

function getEasingValue(type, t) {
  switch (type) {
    case 'linear': return t;
    case 'easeIn': return t * t * t;
    case 'easeOut': return 1 - Math.pow(1 - t, 3);
    case 'bounce': {
      const n1 = 7.5625;
      const d1 = 2.75;
      let x = t;
      if (x < 1 / d1) return n1 * x * x;
      else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
      else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
      else return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
    case 'elastic': {
      const c4 = (2 * Math.PI) / 3;
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
    case 'easeInOut':
    default:
      return t * t * (3 - 2 * t);
  }
}

function updateEasingPreview(type) {
  const path = document.querySelector("#easingPath");
  if (!path) return;
  
  let d = "M 0 100";
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * 100;
    const y = 100 - getEasingValue(type, t) * 100;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  path.setAttribute("d", d);
}

// 3D Spline Path Visualizer Helpers
let pathLine = null;
let pathPoints = [];

function getCameraPosition(frame) {
  const theta = (frame.orbit.yaw * Math.PI) / 180;
  const phi = (frame.orbit.pitch * Math.PI) / 180;
  const r = frame.orbit.radius;
  
  const dy = r * Math.cos(phi);
  const horizontalDist = r * Math.sin(phi);
  const dx = horizontalDist * Math.sin(theta);
  const dz = horizontalDist * Math.cos(theta);
  
  return {
    x: frame.target.x + dx,
    y: frame.target.y + dy,
    z: frame.target.z + dz
  };
}

function drawCameraPath() {
  if (typeof THREE === "undefined") return;

  const scene = getThreeScene();
  if (!scene) return;

  // Remove existing path and nodes
  if (pathLine) {
    try {
      scene.remove(pathLine);
    } catch (e) {
      console.warn("Could not remove path line:", e);
    }
    if (pathLine.geometry) pathLine.geometry.dispose();
    if (pathLine.material) pathLine.material.dispose();
    pathLine = null;
  }
  pathPoints.forEach(mesh => {
    try {
      scene.remove(mesh);
    } catch (e) {
      console.warn("Could not remove mesh:", e);
    }
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) mesh.material.dispose();
  });
  pathPoints = [];

  if (!state.keyframes || state.keyframes.length === 0) {
    if (modelViewer.requestUpdate) modelViewer.requestUpdate();
    return;
  }

  // 1. Plot the camera path line in 3D
  const positions = state.keyframes.map(frame => {
    const pos = getCameraPosition(frame);
    return new THREE.Vector3(pos.x, pos.y, pos.z);
  });

  if (positions.length >= 2) {
    const curve = new THREE.CatmullRomCurve3(positions);
    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x4f8fd6, // Accent Cyan
      linewidth: 3,
      transparent: true,
      opacity: 0.75
    });
    pathLine = new THREE.Line(geometry, material);
    try {
      scene.add(pathLine);
    } catch (e) {
      console.warn("Could not add path line to scene:", e);
    }
  }

  // 2. Add clickable 3D diamond nodes (Octahedrons) at keyframe positions
  state.keyframes.forEach((frame, index) => {
    const pos = getCameraPosition(frame);
    const geometry = new THREE.OctahedronGeometry(0.08, 0); // 0.08m size rotated diamond
    const isSelected = state.selectedKeyframeIndex === index;
    const material = new THREE.MeshBasicMaterial({
      color: isSelected ? 0xd9822b : 0x4f8fd6, // Selected Orange / Active Cyan
      transparent: true,
      opacity: 0.9
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.userData = { keyframeIndex: index };
    try {
      scene.add(mesh);
    } catch (e) {
      console.warn("Could not add keyframe node to scene:", e);
    }
    pathPoints.push(mesh);
  });

  // Force <model-viewer> to repaint the Three.js scene
  if (modelViewer.requestUpdate) {
    modelViewer.requestUpdate();
  }
}

function interpolateFrame(time) {
  if (!state.keyframes.length) return createCurrentKeyframe(time);
  if (time <= state.keyframes[0].time) return state.keyframes[0];
  if (time >= state.keyframes.at(-1).time) return state.keyframes.at(-1);

  const nextIndex = state.keyframes.findIndex((frame) => frame.time >= time);
  const from = state.keyframes[nextIndex - 1];
  const to = state.keyframes[nextIndex];
  const span = Math.max(to.time - from.time, 0.001);
  const easingType = from.easing ?? 'easeInOut';
  const amount = getEasingValue(easingType, (time - from.time) / span);

  return {
    time,
    orbit: {
      yaw: lerpAngle(from.orbit.yaw, to.orbit.yaw, amount),
      pitch: lerp(from.orbit.pitch, to.orbit.pitch, amount),
      radius: lerp(from.orbit.radius, to.orbit.radius, amount),
    },
    target: {
      x: lerp(from.target.x, to.target.x, amount),
      y: lerp(from.target.y, to.target.y, amount),
      z: lerp(from.target.z, to.target.z, amount),
    },
    fov: lerp(from.fov, to.fov, amount),
    lens: lerp(from.lens ?? fovToLens(from.fov), to.lens ?? fovToLens(to.fov), amount),
    shake: lerp(from.shake ?? 0.3, to.shake ?? 0.3, amount),
  };
}

function getTimelineTime() {
  return (parseNumber(inputs.timeline.value, 0) / 1000) * state.duration;
}

function getVisibleTimelineFrame() {
  return clamp(
    parseInt(inputs.bottomTimeline?.value ?? getCurrentFrame(getTimelineTime()), 10) || 0,
    0,
    getTotalFrames(),
  );
}

function getTimelineFrameDuration() {
  return Math.max(state.audioDuration, state.modelAnimationDuration || state.duration, state.duration, 0.001);
}

function getModelAnimationDuration() {
  if (!modelViewer) return 0;
  const durations = [];
  
  // 1. Try reading direct duration property
  let duration = parseNumber(modelViewer.duration, 0);
  if (duration > 0) durations.push(duration);
  
  // 2. Try reading every Three.js clip, then use the longest clip for total timeline frames.
  try {
    const model = modelViewer.model;
    if (model && model.animations) {
      Array.from(model.animations).forEach((clip) => {
        const clipDuration = parseNumber(clip.duration, 0);
        if (clipDuration > 0) durations.push(clipDuration);
      });
    }
  } catch (e) {
    console.warn("Could not read duration from modelViewer.model.animations:", e);
  }

  // 3. Try reading from the internal three3d object animations if available
  try {
    const symbol = Symbol.for('three3d');
    const three = modelViewer[symbol];
    if (three && three.animations) {
      Array.from(three.animations).forEach((clip) => {
        const clipDuration = parseNumber(clip.duration, 0);
        if (clipDuration > 0) durations.push(clipDuration);
      });
    }
  } catch (e) {
    console.warn("Could not read duration from three3d symbol:", e);
  }
  
  return durations.length ? Math.max(...durations) : 0;
}

function getTotalFrames() {
  return Math.max(1, Math.round(getTimelineFrameDuration() * state.fps));
}

let prevTotalFrames = 0;
function ensureTimelineView() {
  const totalFrames = getTotalFrames();
  if (!state.timelineViewEndFrame || state.timelineViewEndFrame > totalFrames || state.timelineViewEndFrame === prevTotalFrames) {
    state.timelineViewEndFrame = totalFrames;
  }
  prevTotalFrames = totalFrames;
  state.timelineViewStartFrame = clamp(state.timelineViewStartFrame, 0, Math.max(totalFrames - 1, 0));
  state.timelineViewEndFrame = clamp(state.timelineViewEndFrame, state.timelineViewStartFrame + 1, totalFrames);
}

function getVisibleFrameSpan() {
  ensureTimelineView();
  return Math.max(state.timelineViewEndFrame - state.timelineViewStartFrame, 1);
}

function getCurrentFrame(time) {
  return clamp(Math.round(time * state.fps), 0, getTotalFrames());
}

function snapFrame(frameNumber) {
  if (!state.snapToFiveFrames) return frameNumber;
  return clamp(Math.round(frameNumber / 5) * 5, 0, getTotalFrames());
}

function getTimeFromTimelineValue(value) {
  const rawTime = (parseNumber(value, 0) / 1000) * state.duration;
  const frame = snapFrame(getCurrentFrame(rawTime));
  return frame / state.fps;
}

function updateTimelineReadouts(time) {
  const clampedTime = clamp(time, 0, state.duration);
  const currentFrame = getCurrentFrame(clampedTime);
  const percent = getFramePercent(currentFrame);
  const totalFrames = getTotalFrames();
  ensureTimelineView();

  currentFrameReadout.textContent = `Frame ${currentFrame}`;
  totalFrameReadout.textContent = `Total ${totalFrames}`;
  zoomReadout.textContent = `View ${state.timelineViewStartFrame}-${state.timelineViewEndFrame}`;
  playheadBubble.textContent = `F${currentFrame}`;
  const trackWidth = timelineTrackWrap?.clientWidth ?? 0;
  const trackInset = 18;
  const playheadX = trackWidth
    ? trackInset + (percent / 100) * Math.max(trackWidth - trackInset * 2, 1)
    : 0;
  playheadBubble.style.left = `${playheadX}px`;
}

function getFramePercent(frame) {
  ensureTimelineView();
  return ((frame - state.timelineViewStartFrame) / getVisibleFrameSpan()) * 100;
}

function isFrameInView(frame) {
  ensureTimelineView();
  return frame >= state.timelineViewStartFrame && frame <= state.timelineViewEndFrame;
}

function buildFrameTicks() {
  ensureTimelineView();
  const span = getVisibleFrameSpan();
  const majorStep = span <= 80 ? 5 : span <= 180 ? 12 : span <= 360 ? 24 : 48;
  const minorStep = Math.max(1, Math.round(majorStep / 4));
  const ticks = new Map();

  ticks.set(state.timelineViewStartFrame, "major");
  ticks.set(state.timelineViewEndFrame, "major");

  const firstMinorTick = Math.ceil(state.timelineViewStartFrame / minorStep) * minorStep;
  for (let frame = firstMinorTick; frame < state.timelineViewEndFrame; frame += minorStep) {
    ticks.set(frame, "minor");
  }

  const firstTick = Math.ceil(state.timelineViewStartFrame / majorStep) * majorStep;
  for (let frame = firstTick; frame < state.timelineViewEndFrame; frame += majorStep) {
    ticks.set(frame, "major");
  }

  return [...ticks.entries()]
    .map(([frame, type]) => ({ frame, type }))
    .sort((a, b) => a.frame - b.frame);
}

function renderTimelineScale() {
  timelineScale.innerHTML = "";

  buildFrameTicks().forEach(({ frame, type }) => {
    const tick = document.createElement("span");
    tick.className = `timeline-tick ${type}`;
    tick.style.left = `${getFramePercent(frame)}%`;
    tick.textContent = type === "major" ? String(frame) : "";
    timelineScale.append(tick);
  });
}

function renderAudioTrack() {
  audioWaveform.innerHTML = "";

  if (!state.audioDuration) {
    audioTrack.hidden = true;
    timelineTrackWrap?.classList.remove("has-audio");
    return;
  }

  audioTrack.hidden = false;
  timelineTrackWrap?.classList.add("has-audio");
  audioTrackLabel.textContent = `${state.audioName} (${state.audioDuration.toFixed(2)}s)`;

  const bars = 80;
  for (let index = 0; index < bars; index += 1) {
    const bar = document.createElement("span");
    const height = 20 + Math.round(Math.abs(Math.sin(index * 1.7) * Math.cos(index * 0.31)) * 70);
    bar.style.height = `${height}%`;
    audioWaveform.append(bar);
  }
}

function ensureFrameInView(frame) {
  const span = getVisibleFrameSpan();
  const totalFrames = getTotalFrames();
  if (frame < state.timelineViewStartFrame) {
    state.timelineViewStartFrame = clamp(frame, 0, Math.max(totalFrames - span, 0));
    state.timelineViewEndFrame = state.timelineViewStartFrame + span;
    renderTimelineMarkers();
  } else if (frame > state.timelineViewEndFrame) {
    state.timelineViewEndFrame = clamp(frame, span, totalFrames);
    state.timelineViewStartFrame = Math.max(state.timelineViewEndFrame - span, 0);
    renderTimelineMarkers();
  }
}

function updateTimeline(time) {
  const value = String(Math.round((clamp(time, 0, state.duration) / state.duration) * 1000));
  inputs.timeline.value = value;
  
  ensureTimelineView();
  const currentFrame = getCurrentFrame(time);
  
  if (state.isPlaying) {
    ensureFrameInView(currentFrame);
  }
  
  inputs.bottomTimeline.min = String(state.timelineViewStartFrame);
  inputs.bottomTimeline.max = String(state.timelineViewEndFrame);
  inputs.bottomTimeline.value = String(currentFrame);
  
  updateTimelineReadouts(time);
  updateSelectedKeyframe(time);
}

function seek(time) {
  const clamped = clamp(time, 0, state.duration);
  updateTimeline(clamped);
  if (state.audioDuration && Math.abs(timelineAudio.currentTime - clamped) > 0.08) {
    timelineAudio.currentTime = clamp(clamped, 0, state.audioDuration);
  }
  if (inputs.syncModelAnimation.checked && state.modelAnimationDuration) {
    modelViewer.currentTime = clamp(clamped, 0, state.modelAnimationDuration);
  }
  updateLabelPositions();
  if (state.keyframes.length > 0) {
    applyCamera(interpolateFrame(clamped));
  }
  updateLabelVisibilities(clamped);
}

function updatePlaybackButtons() {
  buttons.timelineToggle.classList.toggle("pause-icon", state.isPlaying);
  buttons.timelineToggle.classList.toggle("play-icon", !state.isPlaying);
  buttons.timelineToggle.setAttribute("aria-label", state.isPlaying ? "Pause timeline" : "Play timeline");
  buttons.timelineToggle.title = state.isPlaying ? "Pause timeline" : "Play timeline";

  if (buttons.play) {
    buttons.play.textContent = state.isPlaying ? "Pause" : "Play";
    buttons.play.style.borderColor = state.isPlaying ? "var(--orange)" : "var(--green)";
    buttons.play.style.backgroundColor = state.isPlaying ? "rgba(251, 146, 60, 0.14)" : "rgba(34, 197, 94, 0.14)";
    buttons.play.style.color = state.isPlaying ? "#ffe5d9" : "#c9ffd8";
  }
}

function togglePlayback() {
  if (state.isPlaying) {
    pause();
  } else {
    play();
  }
}

function updateSelectedKeyframe(time) {
  if (!state.keyframes.length) {
    timelineFrameReadout.textContent = "No keyframes";
    if (inputs.easingSelect) {
      inputs.easingSelect.disabled = true;
      updateEasingPreview("easeInOut");
    }
    return;
  }

  let nearestIndex = 0;
  let nearestDistance = Infinity;
  state.keyframes.forEach((frame, index) => {
    const distance = Math.abs(frame.time - time);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });
  state.selectedKeyframeIndex = nearestIndex;
  timelineFrameReadout.textContent = `Keyframe ${nearestIndex + 1} / ${state.keyframes.length}`;

  const currentKf = state.keyframes[nearestIndex];
  if (inputs.easingSelect) {
    inputs.easingSelect.disabled = false;
    inputs.easingSelect.value = currentKf.easing ?? "easeInOut";
    updateEasingPreview(inputs.easingSelect.value);
  }

  document.querySelectorAll(".timeline-marker").forEach((marker, index) => {
    marker.classList.toggle("active", index === nearestIndex);
  });

  document.querySelectorAll(".keyframe-list li").forEach((li, index) => {
    li.classList.toggle("active", index === nearestIndex);
  });
}

function play() {
  state.isPlaying = true;
  updatePlaybackButtons();
  if (state.keyframes.length > 0) {
    modelViewer.removeAttribute("camera-controls");
  }
  state.startedAt = performance.now() - state.pausedAt * 1000;
  if (state.audioDuration) {
    timelineAudio.currentTime = clamp(state.pausedAt, 0, state.audioDuration);
    timelineAudio.play().catch(() => {
      setStatus("Audio could not autoplay. Press Play again after interacting.", "warn");
    });
  }
  if (inputs.syncModelAnimation.checked && state.modelAnimationDuration) {
    modelViewer.currentTime = clamp(state.pausedAt, 0, state.modelAnimationDuration);
    modelViewer.play();
  }
  tick();
}

function pause() {
  state.isPlaying = false;
  cancelAnimationFrame(state.rafId);
  state.pausedAt = getTimelineTime();
  timelineAudio.pause();
  if (state.modelAnimationDuration) modelViewer.pause();
  modelViewer.setAttribute("camera-controls", "");
  updatePlaybackButtons();
}

function stop() {
  state.isPlaying = false;
  cancelAnimationFrame(state.rafId);
  state.pausedAt = 0;
  timelineAudio.pause();
  timelineAudio.currentTime = 0;
  if (state.modelAnimationDuration) {
    modelViewer.pause();
    modelViewer.currentTime = 0;
  }
  modelViewer.setAttribute("camera-controls", "");
  seek(0);
  updatePlaybackButtons();
}

function tick() {
  if (!state.isPlaying) return;

  const elapsed = (performance.now() - state.startedAt) / 1000;
  if (elapsed >= state.duration) {
    if (state.loopPlayback) {
      state.startedAt = performance.now();
      seek(0);
      if (state.audioDuration) {
        timelineAudio.currentTime = 0;
        timelineAudio.play().catch(() => {});
      }
      if (inputs.syncModelAnimation.checked && state.modelAnimationDuration) {
        modelViewer.currentTime = 0;
        modelViewer.play();
      }
    } else {
      seek(state.duration);
      stop();
      return;
    }
  } else {
    seek(elapsed);
  }

  state.rafId = requestAnimationFrame(tick);
}

function renderKeyframes() {
  keyframeList.innerHTML = "";

  if (!state.keyframes.length) {
    keyframeList.textContent = "No keyframes loaded.";
    return;
  }

  state.keyframes.forEach((frame, index) => {
    const item = document.createElement("li");
    const title = document.createElement("span");
    const orbit = document.createElement("span");
    const target = document.createElement("span");
    const fov = document.createElement("span");
    const actions = document.createElement("div");
    const goButton = document.createElement("button");
    const copyButton = document.createElement("button");
    const pasteButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    title.className = "keyframe-title";
    actions.className = "inline-keyframe-actions";
    const frameNumber = Math.round(frame.time * state.fps);
    title.textContent = `#${index + 1} at Frame ${frameNumber}`;
    orbit.textContent = `Orbit ${formatOrbit(frame.orbit)}`;
    target.textContent = `Target ${formatTarget(frame.target)}`;
    fov.textContent = `FOV ${frame.fov.toFixed(1)}deg`;
    if (frame.lens) fov.textContent = `Lens ${frame.lens.toFixed(0)}mm`;

    const shakeInfo = document.createElement("span");
    shakeInfo.textContent = `Shake: ${(frame.shake ?? 0.3).toFixed(2)}`;

    goButton.type = "button";
    copyButton.type = "button";
    pasteButton.type = "button";
    deleteButton.type = "button";
    goButton.textContent = "Go";
    copyButton.textContent = "Copy";
    pasteButton.textContent = "Paste";
    deleteButton.textContent = "Delete";
    pasteButton.disabled = !state.copiedKeyframe;
    deleteButton.disabled = false;

    item.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      seekToKeyframe(index);
    });
    goButton.addEventListener("click", () => seekToKeyframe(index));
    copyButton.addEventListener("click", () => copyKeyframe(index));
    pasteButton.addEventListener("click", () => {
      seekToKeyframe(index);
      pasteKeyframe();
    });
    deleteButton.addEventListener("click", () => deleteKeyframe(index));

    actions.append(goButton, copyButton, pasteButton, deleteButton);
    item.append(title, orbit, target, fov, shakeInfo, actions);
    keyframeList.append(item);
  });
}

function renderTimelineMarkers() {
  timelineMarkers.innerHTML = "";
  renderTimelineScale();

  if (!state.keyframes.length) {
    updateSelectedKeyframe(0);
    return;
  }

  state.keyframes.forEach((frame, index) => {
    const frameNumber = getCurrentFrame(frame.time);
    if (!isFrameInView(frameNumber)) return;
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "timeline-marker";
    marker.style.left = `${getFramePercent(frameNumber)}%`;
    marker.dataset.index = String(index + 1);
    marker.setAttribute("aria-label", `Keyframe ${index + 1}`);
    marker.title = `Keyframe ${index + 1} at frame ${frameNumber}, ${frame.time.toFixed(2)}s`;
    marker.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentIndex = state.keyframes.indexOf(frame);
      seekToKeyframe(currentIndex === -1 ? index : currentIndex);
    });
    marker.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.draggingKeyframeIndex = index;
      state.draggingKeyframeRef = state.keyframes[index];
      marker.setPointerCapture(event.pointerId);
      marker.classList.add("dragging");
      seekToKeyframe(index);
    });
    marker.addEventListener("pointermove", (event) => {
      if (state.draggingKeyframeIndex !== index) return;
      const frameAtPointer = getFrameFromPointer(event);
      const currentIndex = state.keyframes.indexOf(state.draggingKeyframeRef);
      moveKeyframeToFrame(currentIndex, frameAtPointer, { render: false });
      marker.style.left = `${getFramePercent(frameAtPointer)}%`;
    });
    marker.addEventListener("pointerup", (event) => {
      if (state.draggingKeyframeIndex !== index) return;
      marker.releasePointerCapture(event.pointerId);
      marker.classList.remove("dragging");
      const currentIndex = state.keyframes.indexOf(state.draggingKeyframeRef);
      const targetFrame = getFrameFromPointer(event);
      moveKeyframeToFrame(currentIndex, targetFrame, { render: true });
      state.pausedAt = targetFrame / state.fps;
      seek(state.pausedAt);
      state.draggingKeyframeIndex = -1;
      state.draggingKeyframeRef = null;
    });
    marker.addEventListener("pointercancel", () => {
      marker.classList.remove("dragging");
      state.draggingKeyframeIndex = -1;
      state.draggingKeyframeRef = null;
      renderTimelineMarkers();
    });
    timelineMarkers.append(marker);
  });

  updateTimelineReadouts(getTimelineTime());
  updateSelectedKeyframe(getTimelineTime());
}

function seekToKeyframe(index) {
  if (!state.keyframes.length) return;
  const safeIndex = clamp(index, 0, state.keyframes.length - 1);
  const frame = state.keyframes[safeIndex];
  const frameNumber = getCurrentFrame(frame.time);
  const frameTime = frameNumber / state.fps;
  state.selectedKeyframeIndex = safeIndex;
  state.pausedAt = frameTime;
  ensureFrameInView(frameNumber);
  seek(frameTime);
  drawCameraPath();
  setStatus(`Frame ${frameNumber}`);
}

function stepFrame(direction) {
  const currentFrame = getCurrentFrame(getTimelineTime());
  const increment = state.snapToFiveFrames ? 5 : 1;
  const nextFrame = snapFrame(clamp(currentFrame + direction * increment, 0, getTotalFrames()));
  const nextTime = nextFrame / state.fps;
  state.pausedAt = clamp(nextTime, 0, state.duration);
  ensureFrameInView(nextFrame);
  seek(state.pausedAt);
  setStatus(`Frame ${nextFrame}`);
}

function goToFrame(frameNumber) {
  const frame = snapFrame(clamp(frameNumber, 0, getTotalFrames()));
  state.pausedAt = clamp(frame / state.fps, 0, state.duration);
  ensureFrameInView(frame);
  seek(state.pausedAt);
  setStatus(`Frame ${frame}`);
}

function enterPreviewMode() {
  closeToolbarMenus();
  closeCursorImportMenu();
  appShell.classList.add("panel-closed");
  updateDetailsMenuLabel();
  document.body.classList.add("preview-mode");

  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }

  if (!state.isPlaying) play();
}

function exitPreviewMode() {
  if (!document.body.classList.contains("preview-mode")) return;
  document.body.classList.remove("preview-mode");
  pause();
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}

function getFrameFromPointer(event) {
  const rect = inputs.bottomTimeline.getBoundingClientRect();
  const ratio = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
  return snapFrame(Math.round(state.timelineViewStartFrame + ratio * getVisibleFrameSpan()));
}

function zoomTimelineAtPointer(event) {
  event.preventDefault();
  ensureTimelineView();
  const totalFrames = getTotalFrames();
  const rect = inputs.bottomTimeline.getBoundingClientRect();
  const pointerRatio = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
  const frameAtPointer = state.timelineViewStartFrame + pointerRatio * getVisibleFrameSpan();
  const zoomFactor = event.deltaY < 0 ? 0.82 : 1.22;
  const nextSpan = clamp(Math.round(getVisibleFrameSpan() * zoomFactor), 10, totalFrames);
  let nextStart = Math.round(frameAtPointer - pointerRatio * nextSpan);
  nextStart = clamp(nextStart, 0, Math.max(totalFrames - nextSpan, 0));
  state.timelineViewStartFrame = nextStart;
  state.timelineViewEndFrame = nextStart + nextSpan;
  renderTimelineMarkers();
  seek(getTimelineTime());
}

function moveKeyframeToFrame(index, frameNumber, options = { render: true }) {
  if (!state.keyframes.length || index < 0 || index >= state.keyframes.length) return;
  const safeFrame = clamp(frameNumber, 0, getTotalFrames());
  const time = clamp(safeFrame / state.fps, 0, state.duration);
  const keyframe = state.keyframes[index];
  keyframe.time = time;
  if (options.render) {
    state.keyframes.sort((a, b) => a.time - b.time);
    const newIndex = state.keyframes.indexOf(keyframe);
    state.selectedKeyframeIndex = newIndex;
    renderKeyframes();
    renderTimelineMarkers();
    drawCameraPath();
  }
  ensureFrameInView(safeFrame);
  seek(time);
  setStatus(`Moved keyframe to frame ${safeFrame}.`);
}

function nudgeSelectedKeyframe(direction) {
  if (!state.keyframes.length) return;
  const keyframe = state.keyframes[state.selectedKeyframeIndex];
  if (!keyframe) return;
  moveKeyframeToFrame(state.selectedKeyframeIndex, getCurrentFrame(keyframe.time) + direction);
}

function addKeyframe() {
  const frame = createCurrentKeyframe();
  state.keyframes = [...state.keyframes, frame].sort((a, b) => a.time - b.time);
  renderKeyframes();
  renderTimelineMarkers();
  drawCameraPath();
  const frameNumber = Math.round(frame.time * state.fps);
  setStatus(`Added keyframe at Frame ${frameNumber}.`);
}

function toggleAutoKey() {
  state.autoKeyframe = !state.autoKeyframe;
  if (buttons.autoKeyToggle) {
    buttons.autoKeyToggle.classList.toggle("active", state.autoKeyframe);
    buttons.autoKeyToggle.setAttribute("aria-pressed", String(state.autoKeyframe));
  }
  setStatus(state.autoKeyframe ? "Auto Keyframe enabled." : "Auto Keyframe disabled.");
}

let autoKeyRenderTimeout = null;
function recordAutoKeyframe() {
  if (state.isPlaying) return;
  
  const currentFrame = getCurrentFrame(getTimelineTime());
  const time = currentFrame / state.fps;
  
  const existingIndex = state.keyframes.findIndex(frame => getCurrentFrame(frame.time) === currentFrame);
  const frameData = createCurrentKeyframe(time);
  
  let addedNew = false;
  if (existingIndex >= 0) {
    state.keyframes[existingIndex] = frameData;
  } else {
    state.keyframes = [...state.keyframes, frameData].sort((a, b) => a.time - b.time);
    addedNew = true;
  }
  
  if (autoKeyRenderTimeout) clearTimeout(autoKeyRenderTimeout);
  
  if (addedNew) {
    renderKeyframes();
    renderTimelineMarkers();
    drawCameraPath();
    updateSelectedKeyframe(getTimelineTime());
  } else {
    autoKeyRenderTimeout = setTimeout(() => {
      renderKeyframes();
      drawCameraPath();
      updateSelectedKeyframe(getTimelineTime());
    }, 100);
  }
}

function copyKeyframe(index = state.selectedKeyframeIndex) {
  const hasIndexedFrame = state.keyframes.length && index >= 0 && index < state.keyframes.length;
  const safeIndex = hasIndexedFrame ? clamp(index, 0, state.keyframes.length - 1) : -1;
  state.copiedKeyframe = hasIndexedFrame
    ? cloneKeyframe(state.keyframes[safeIndex])
    : createCurrentKeyframe(getTimelineTime());
  renderKeyframes();
  setStatus(hasIndexedFrame ? `Copied keyframe ${safeIndex + 1}.` : "Copied current camera.");
}

function pasteKeyframe() {
  if (!state.copiedKeyframe) {
    setStatus("Copy a keyframe first.", "warn");
    return;
  }

  const currentFrame = getCurrentFrame(getTimelineTime());
  const time = clamp(currentFrame / state.fps, 0, state.duration);
  const pasted = {
    ...cloneKeyframe(state.copiedKeyframe),
    time,
  };
  state.keyframes = [...state.keyframes, pasted].sort((a, b) => a.time - b.time);
  renderKeyframes();
  renderTimelineMarkers();
  seek(time);
  setStatus(`Pasted keyframe at frame ${currentFrame}.`);
}

function deleteKeyframe(index = state.selectedKeyframeIndex) {
  if (state.keyframes.length === 0) {
    setStatus("No keyframes to delete.", "warn");
    return;
  }

  const safeIndex = clamp(index, 0, state.keyframes.length - 1);
  const removed = state.keyframes[safeIndex];
  state.keyframes.splice(safeIndex, 1);
  state.selectedKeyframeIndex = clamp(safeIndex, 0, state.keyframes.length - 1);
  renderKeyframes();
  renderTimelineMarkers();
  drawCameraPath();
  seek(state.keyframes[state.selectedKeyframeIndex]?.time ?? 0);
  const frameNumber = Math.round(removed.time * state.fps);
  setStatus(`Deleted keyframe at Frame ${frameNumber}.`);
}

function renderPresets() {
  presetSelect.innerHTML = '<option value="" disabled selected>Select a preset...</option>';

  state.presets.forEach((preset, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = preset.name;
    presetSelect.append(option);
  });

  if (state.selectedPresetIndex >= 0) {
    presetSelect.value = String(state.selectedPresetIndex);
  }
}

function applyPreset(preset) {
  state.duration = preset.duration;
  inputs.duration.value = preset.duration.toFixed(1);
  inputs.lens.value = String(preset.lens);
  setKeyframes(
    preset.frames.map((frame) => ({
      ...frame,
      lens: frame.lens ?? preset.lens,
      fov: lensToFov(frame.lens ?? preset.lens),
    })),
  );
  setStatus(`Applied preset: ${preset.name}`);
}

function exportCameraJson() {
  const currentFrame = createCurrentKeyframe(getTimelineTime());
  
  const currentCameraState = {
    theta: Number(currentFrame.orbit.yaw.toFixed(3)),
    phi: Number(currentFrame.orbit.pitch.toFixed(3)),
    radius: Number(currentFrame.orbit.radius.toFixed(3)),
    targetX: Number(currentFrame.target.x.toFixed(3)),
    targetY: Number(currentFrame.target.y.toFixed(3)),
    targetZ: Number(currentFrame.target.z.toFixed(3)),
    fov: Number(currentFrame.fov.toFixed(3))
  };

  const keyframes = state.keyframes.map((frame, index) => {
    const frameNumber = Math.round(frame.time * state.fps);
    return {
      frame: frameNumber,
      time: Number(frame.time.toFixed(6)),
      name: `Keyframe ${index + 1}`,
      easing: frame.easing ?? 'easeInOut',
      properties: {
        theta: [Number(frame.orbit.yaw.toFixed(3))],
        phi: [Number(frame.orbit.pitch.toFixed(3))],
        radius: [Number(frame.orbit.radius.toFixed(3))],
        targetX: [Number(frame.target.x.toFixed(3))],
        targetY: [Number(frame.target.y.toFixed(3))],
        targetZ: [Number(frame.target.z.toFixed(3))],
        fov: [Number(frame.fov.toFixed(3))]
      }
    };
  });

  const data = {
    currentCameraState,
    keyframes,
    animationSettings: {
      fps: state.fps,
      duration: state.duration,
      autoKeyframe: false
    },
    cameraSettings: {
      fovRange: {
        min: 1,
        max: 180
      },
      radiusRange: {
        min: 10,
        max: 500
      },
      orbitLimits: {
        enabled: false,
        minDistance: 0.5,
        maxDistance: 100
      },
      interpolationDecay: 100
    },
    metadata: {
      version: "1.1",
      creator: "LearningPad 3D Web Camera Controls",
      timestamp: new Date().toISOString(),
      totalKeyframes: state.keyframes.length
    }
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "camera-animation.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Exported camera-animation.json");
}

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getWorkingFileData() {
  return {
    app: "camera-animation-tool",
    version: 1,
    fps: state.fps,
    duration: state.duration,
    pausedAt: getTimelineTime(),
    timelineView: {
      startFrame: state.timelineViewStartFrame,
      endFrame: state.timelineViewEndFrame,
      snapToFiveFrames: state.snapToFiveFrames,
      loopPlayback: state.loopPlayback,
    },
    model: state.modelUrl ? { name: inputs.model.files?.[0]?.name ?? null } : null,
    audio: state.audioUrl
      ? {
          name: state.audioName,
          duration: Number(state.audioDuration.toFixed(3)),
        }
      : null,
    animation: {
      name: inputs.animation.value || null,
      sync: inputs.syncModelAnimation.checked,
    },
    camera: {
      defaultCamera: cloneKeyframe(state.defaultCamera),
      keyframes: state.keyframes.map(cloneKeyframe),
      selectedKeyframeIndex: state.selectedKeyframeIndex,
      copiedKeyframe: state.copiedKeyframe ? cloneKeyframe(state.copiedKeyframe) : null,
    },
    effects: {
      shakeEnabled: state.shakeEnabled,
      shakeIntensity: state.shakeIntensity,
      shakeSpeed: state.shakeSpeed,
      shakeProfile: state.shakeProfile,
      smoothing: parseNumber(inputs.smooth.value, 0.35),
    },
    labels: state.labels.map((label) => ({
      name: label.name,
      nodeName: label.nodeName,
      position: { ...label.position },
      normal: { ...label.normal },
      frame: label.frame,
      time: label.time,
      frames: [...(label.frames || [])],
      visibilityRanges: [...(label.visibilityRanges || [])],
      hasTimelineVisibility: !!label.hasTimelineVisibility,
    })),
    presets: state.presets,
  };
}

function saveWorkingFile() {
  downloadJson(getWorkingFileData(), "camera-working-file.json");
  setStatus("Saved camera-working-file.json");
}

async function loadWorkingFile(file) {
  const json = await readJsonFile(file);
  if (json.app !== "camera-animation-tool") {
    throw new Error("This is not a Camera Animation Tool working file.");
  }

  state.fps = 24;
  const projectFrames = json.camera?.keyframes || [];
  state.keyframes = projectFrames.map((frame, index) => normalizeKeyframe(frame, index, projectFrames.length));
  state.keyframes.sort((a, b) => a.time - b.time);

  const lastKeyframeTime = state.keyframes.at(-1)?.time || 0.2;
  state.duration = Math.max(
    parseNumber(json.duration, state.duration),
    lastKeyframeTime,
    state.modelAnimationDuration,
    0.2
  );
  inputs.duration.value = state.duration.toFixed(1);
  state.selectedKeyframeIndex = clamp(parseNumber(json.camera?.selectedKeyframeIndex, 0), 0, state.keyframes.length - 1);
  state.copiedKeyframe = json.camera?.copiedKeyframe ? normalizeKeyframe(json.camera.copiedKeyframe, 0, 1) : null;
  if (json.camera?.defaultCamera) state.defaultCamera = normalizeKeyframe(json.camera.defaultCamera, 0, 1);

  state.labels = Array.isArray(json.labels)
    ? json.labels.map((label, index) => normalizeLabel(label, index))
    : [];

  if (Array.isArray(json.presets) && json.presets.length) {
    state.presets = json.presets;
    state.selectedPresetIndex = -1;
    renderPresets();
  }

  state.shakeEnabled = !!json.effects?.shakeEnabled;
  state.shakeIntensity = parseNumber(json.effects?.shakeIntensity, state.shakeIntensity);
  state.shakeSpeed = parseNumber(json.effects?.shakeSpeed, state.shakeSpeed);
  state.shakeProfile = json.effects?.shakeProfile || "continuous";
  inputs.shakeEnabled.checked = state.shakeEnabled;
  inputs.shakeIntensity.disabled = !state.shakeEnabled;
  inputs.shakeSpeed.disabled = !state.shakeEnabled;
  inputs.shakeProfile.disabled = !state.shakeEnabled;
  buttons.addShakeKeyframe.disabled = !state.shakeEnabled;
  inputs.shakeIntensity.value = state.shakeIntensity;
  inputs.shakeSpeed.value = state.shakeSpeed;
  inputs.shakeProfile.value = state.shakeProfile;
  inputs.smooth.value = parseNumber(json.effects?.smoothing, parseNumber(inputs.smooth.value, 0.35));

  inputs.syncModelAnimation.checked = json.animation?.sync ?? inputs.syncModelAnimation.checked;
  if (json.animation?.name && Array.from(inputs.animation.options).some((option) => option.value === json.animation.name)) {
    inputs.animation.value = json.animation.name;
    modelViewer.animationName = json.animation.name;
  }

  state.timelineViewStartFrame = parseNumber(json.timelineView?.startFrame, 0);
  state.timelineViewEndFrame = parseNumber(json.timelineView?.endFrame, getTotalFrames());
  state.snapToFiveFrames = !!json.timelineView?.snapToFiveFrames;
  state.loopPlayback = !!json.timelineView?.loopPlayback;
  buttons.snapToggle.classList.toggle("active", state.snapToFiveFrames);
  buttons.snapToggle.setAttribute("aria-pressed", String(state.snapToFiveFrames));
  buttons.loopToggle.classList.toggle("active", state.loopPlayback);
  buttons.loopToggle.setAttribute("aria-pressed", String(state.loopPlayback));

  renderLabels();
  renderKeyframes();
  renderTimelineMarkers();
  goToFrame(getCurrentFrame(parseNumber(json.pausedAt, 0)));
  setStatus(`Opened working file: ${file.name}`);
}

function extractFramesList(raw) {
  const list = [];
  const searchProps = ["keyframes", "frames", "keyFrames", "times", "frame", "frameNumber", "time", "seconds", "t"];
  
  const searchObjects = [raw];
  if (raw.text && typeof raw.text === "object") {
    searchObjects.push(raw.text);
  }
  
  for (const obj of searchObjects) {
    for (const prop of searchProps) {
      const val = obj[prop];
      if (val !== undefined && val !== null) {
        if (Array.isArray(val)) {
          val.forEach((item) => {
            if (typeof item === "number") {
              list.push(item);
            } else if (typeof item === "string") {
              const num = Number(item);
              if (Number.isFinite(num)) list.push(num);
            } else if (item && typeof item === "object") {
              let f = null;
              let t = null;
              if (item.frame !== undefined && item.frame !== null) f = parseNumber(item.frame, null);
              else if (item.frameNumber !== undefined && item.frameNumber !== null) f = parseNumber(item.frameNumber, null);
              else if (item.time !== undefined && item.time !== null) t = parseNumber(item.time, null);
              else if (item.seconds !== undefined && item.seconds !== null) t = parseNumber(item.seconds, null);
              else if (item.t !== undefined && item.t !== null) t = parseNumber(item.t, null);
              
              if (f !== null) list.push(f);
              else if (t !== null) list.push(Math.round(t * state.fps));
            }
          });
        } else {
          if (typeof val === "number") {
            if (prop === "time" || prop === "seconds" || prop === "t") {
              list.push(Math.round(val * state.fps));
            } else {
              list.push(val);
            }
          } else if (typeof val === "string") {
            const num = Number(val);
            if (Number.isFinite(num)) {
              if (prop === "time" || prop === "seconds" || prop === "t") {
                list.push(Math.round(num * state.fps));
              } else {
                list.push(num);
              }
            }
          }
        }
      }
    }
  }
  return [...new Set(list)].sort((a, b) => a - b);
}

function readFrameNumber(value) {
  if (value === null || value === undefined) return null;
  const number = parseNumber(value, null);
  return number === null ? null : Math.round(number);
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function readFrameLike(value) {
  return readFrameNumber(value) ?? readTimeAsFrame(value);
}

function isVisibleFalse(value) {
  return value === false || value === 0 || value === "false" || value === "hidden" || value === "off";
}

function findNestedValue(value, keys, depth = 5) {
  if (depth < 0 || value === null || value === undefined || typeof value !== "object") return undefined;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(value, key)) return value[key];
  }

  const children = Array.isArray(value) ? value : Object.values(value);
  for (const child of children) {
    const found = findNestedValue(child, keys, depth - 1);
    if (found !== undefined) return found;
  }

  return undefined;
}

function readTimeAsFrame(value) {
  if (value === null || value === undefined) return null;
  const number = parseNumber(value, null);
  return number === null ? null : Math.round(number * state.fps);
}

function addVisibilityRange(ranges, start, end) {
  if (start === null && end === null) return;
  const safeStart = Math.max(0, start ?? end ?? 0);
  const safeEnd = Math.max(safeStart, end ?? start ?? safeStart);
  ranges.push({ start: safeStart, end: safeEnd });
}

function hasVisibilityHint(raw) {
  if (!isPlainObject(raw)) return false;
  const hintKeys = [
    "visible",
    "visibility",
    "show",
    "enabled",
    "startFrame",
    "endFrame",
    "first_value",
    "second_value",
    "firstValue",
    "secondValue",
    "fromFrame",
    "toFrame",
    "inFrame",
    "outFrame",
    "frameStart",
    "frameEnd",
    "visibleFrom",
    "visibleTo",
    "showFrom",
    "showTo",
    "appearFrame",
    "disappearFrame",
    "showFrame",
    "hideFrame",
    "visibleFrames",
    "visibilityFrames",
    "showFrames",
    "visibleRange",
    "visibleRanges",
    "range",
    "ranges",
    "visibilityKeyframes",
  ];
  if (hintKeys.some((key) => raw[key] !== undefined)) return true;
  if (findNestedValue(raw, hintKeys) !== undefined) return true;
  if (isPlainObject(raw.text) && hasVisibilityHint(raw.text)) return true;
  return isPlainObject(raw.visibility) || isPlainObject(raw.show);
}

function extractVisibilityRanges(raw) {
  const ranges = [];
  const sources = [raw];
  if (raw.text && typeof raw.text === "object") sources.push(raw.text);
  if (raw.visibility && typeof raw.visibility === "object") sources.push(raw.visibility);
  if (raw.show && typeof raw.show === "object") sources.push(raw.show);

  const nestedStart = findNestedValue(raw, [
    "first_value",
    "firstValue",
    "startFrame",
    "fromFrame",
    "inFrame",
    "frameStart",
    "visibleFrom",
    "showFrom",
    "appearFrame",
    "showFrame",
  ]);
  const nestedEnd = findNestedValue(raw, [
    "second_value",
    "secondValue",
    "endFrame",
    "toFrame",
    "outFrame",
    "frameEnd",
    "visibleTo",
    "showTo",
    "disappearFrame",
    "hideFrame",
  ]);
  addVisibilityRange(ranges, readFrameNumber(nestedStart), readFrameNumber(nestedEnd));

  sources.forEach((source) => {
    if (isVisibleFalse(source.visible ?? source.visibility ?? source.show ?? source.enabled)) return;

    const start = readFrameNumber(
      source.startFrame
      ?? source.first_value
      ?? source.fromFrame
      ?? source.inFrame
      ?? source.frameStart
      ?? source.visibleFrom
      ?? source.showFrom
      ?? source.appearFrame
      ?? source.showFrame
      ?? source.start
      ?? source.from,
    );
    const end = readFrameNumber(
      source.endFrame
      ?? source.second_value
      ?? source.toFrame
      ?? source.outFrame
      ?? source.frameEnd
      ?? source.visibleTo
      ?? source.showTo
      ?? source.disappearFrame
      ?? source.hideFrame
      ?? source.end
      ?? source.to,
    );
    addVisibilityRange(ranges, start, end);

    const startTime = readTimeAsFrame(source.startTime ?? source.fromTime ?? source.inTime ?? source.visibleFromTime);
    const endTime = readTimeAsFrame(source.endTime ?? source.toTime ?? source.outTime ?? source.visibleToTime);
    addVisibilityRange(ranges, startTime, endTime);

    const frameFields = [
      source.visibleFrames,
      source.visibilityFrames,
      source.showFrames,
    ];

    frameFields.filter(Array.isArray).forEach((items) => {
      items.forEach((item) => {
        if (Array.isArray(item)) {
          addVisibilityRange(ranges, readFrameNumber(item[0]), readFrameNumber(item[1] ?? item[0]));
        } else if (item && typeof item === "object") {
          addVisibilityRange(
            ranges,
            readFrameLike(item.start ?? item.from ?? item.startFrame ?? item.fromFrame ?? item.frame ?? item.frameNumber ?? item.time),
            readFrameLike(item.end ?? item.to ?? item.endFrame ?? item.toFrame ?? item.frame ?? item.frameNumber ?? item.time),
          );
        } else {
          const frame = readFrameNumber(item);
          addVisibilityRange(ranges, frame, frame);
        }
      });
    });

    const rangeFields = [
      source.visibleRange,
      source.visibleRanges,
      source.visibilityRanges,
      source.range,
      source.ranges,
    ];

    rangeFields.filter(Array.isArray).forEach((items) => {
      const normalizedItems = Array.isArray(items[0]) || isPlainObject(items[0]) ? items : [items];
      normalizedItems.forEach((item) => {
        if (Array.isArray(item)) {
          addVisibilityRange(ranges, readFrameNumber(item[0]), readFrameNumber(item[1] ?? item[0]));
        } else if (item && typeof item === "object") {
          addVisibilityRange(
            ranges,
            readFrameLike(item.start ?? item.from ?? item.startFrame ?? item.fromFrame ?? item.frame ?? item.frameNumber ?? item.time),
            readFrameLike(item.end ?? item.to ?? item.endFrame ?? item.toFrame ?? item.frame ?? item.frameNumber ?? item.time),
          );
        } else {
          const frame = readFrameNumber(item);
          addVisibilityRange(ranges, frame, frame);
        }
      });
    });

    const keyframes = source.keyframes ?? source.frames ?? source.visibilityKeyframes;
    if (Array.isArray(keyframes)) {
      keyframes.forEach((item) => {
        if (item && typeof item === "object") {
          const isVisible = item.visible ?? item.visibility ?? item.show ?? item.enabled;
          if (isVisibleFalse(isVisible)) return;
          const frame = readFrameNumber(item.frame ?? item.frameNumber ?? item.index)
            ?? readTimeAsFrame(item.time ?? item.seconds ?? item.t);
          addVisibilityRange(ranges, frame, frame);
        } else {
          const frame = readFrameNumber(item);
          addVisibilityRange(ranges, frame, frame);
        }
      });
    }
  });

  return ranges;
}

function getLabelText(field) {
  if (field === null || field === undefined) return null;
  if (typeof field === "string") return field;
  if (typeof field === "number" || typeof field === "boolean") return String(field);
  if (Array.isArray(field)) {
    return field.map((item) => getLabelText(item)).filter(Boolean).join(", ") || null;
  }
  if (typeof field === "object") {
    return getLabelText(field.text)
      ?? getLabelText(field.content)
      ?? getLabelText(field.value)
      ?? getLabelText(field.name)
      ?? getLabelText(field.title)
      ?? getLabelText(field.english)
      ?? getLabelText(field.label)
      ?? getLabelText(field.message)
      ?? getLabelText(field.description)
      ?? getLabelText(field.annotation)
      ?? getLabelText(field.caption)
      ?? getLabelText(field.displayName)
      ?? getLabelText(field.objectName);
  }
  return null;
}

function getThreeScene() {
  try {
    const symbol = Symbol.for('three3d');
    if (modelViewer && modelViewer[symbol]) {
      const three = modelViewer[symbol];
      if (three.scene) return three.scene;
      return three;
    }
  } catch (e) {
    console.warn("Could not get Three.js scene:", e);
  }
  return null;
}

function updateLabelPositions() {
  const scene = getThreeScene();
  if (!scene) return;
  
  state.labels.forEach((label, index) => {
    if (!label.nodeName) return;
    
    const node = scene.getObjectByName(label.nodeName);
    if (node) {
      node.updateMatrixWorld(true);
      if (node.matrixWorld) {
        const x = node.matrixWorld.elements[12];
        const y = node.matrixWorld.elements[13];
        const z = node.matrixWorld.elements[14];
        
        label.position.x = x;
        label.position.y = y;
        label.position.z = z;
        
        const hotspot = modelViewer.querySelector(`[slot="hotspot-${index}"]`);
        if (hotspot) {
          hotspot.setAttribute("data-position", `${x} ${y} ${z}`);
        }
      }
    }
  });
}

function normalizeLabel(raw, index) {
  const nodeName = raw.nodeName ?? (typeof raw.name === "string" && (raw.name.startsWith("label-") || raw.name.startsWith("dot-")) ? raw.name : null) ?? raw.id ?? (typeof raw.name === "string" ? raw.name : null);
  
  let name = getLabelText(raw.text) ?? getLabelText(raw.content) ?? getLabelText(raw.label) ?? getLabelText(raw.title) ?? getLabelText(raw.message);
  
  if (!name && raw.name && typeof raw.name === "string" && !raw.name.startsWith("label-") && !raw.name.startsWith("dot-")) {
    name = raw.name;
  }
  
  if (!name) {
    name = nodeName ?? `Label ${index + 1}`;
  }
  
  const frames = extractFramesList(raw);
  const visibilityRanges = extractVisibilityRanges(raw);
  const hasTimelineVisibility = hasVisibilityHint(raw);
  const frame = frames.length ? frames[0] : null;
  const time = frame !== null ? frame / state.fps : null;
  
  const positionSrc = raw.position ?? raw.point ?? (raw.text && typeof raw.text === "object" ? raw.text.position ?? raw.text.point : null);
  const normalSrc = raw.normal ?? (raw.text && typeof raw.text === "object" ? raw.text.normal : null);
  
  const position = readVector(positionSrc, { x: 0, y: 0, z: 0 });
  const normal = readVector(normalSrc, { x: 0, y: 1, z: 0 });
  
  return {
    name,
    nodeName: nodeName ?? raw.name ?? `Label ${index + 1}`,
    position,
    normal,
    frame,
    time,
    frames,
    visibilityRanges,
    hasTimelineVisibility,
  };
}

function isLabelVisibleAtFrame(label, currentFrame) {
  if (label.visibilityRanges && label.visibilityRanges.length) {
    return label.visibilityRanges.some((range) => currentFrame >= range.start && currentFrame <= range.end);
  }

  if (label.frames && label.frames.length) {
    return label.frames.includes(currentFrame);
  }

  if (label.hasTimelineVisibility) return false;

  return true;
}

function getNearestLabelFrame(label, currentFrame = getCurrentFrame(getTimelineTime())) {
  if (!label.frames || !label.frames.length) return null;
  let nearestFrame = label.frames[0];
  let minDiff = Math.abs(currentFrame - nearestFrame);
  label.frames.forEach((f) => {
    const diff = Math.abs(currentFrame - f);
    if (diff < minDiff) {
      minDiff = diff;
      nearestFrame = f;
    }
  });
  return nearestFrame;
}

function updateLabelVisibilities(time) {
  const currentFrame = getCurrentFrame(time);
  
  state.labels.forEach((label, index) => {
    const hotspot = modelViewer.querySelector(`[slot="hotspot-${index}"]`);
    if (!hotspot) return;
    const chip = labelList.querySelector(`[data-label-index="${index}"]`);

    if (!label.frames?.length && !label.visibilityRanges?.length && !label.hasTimelineVisibility) {
      hotspot.style.display = "block";
      hotspot.style.opacity = "1";
      hotspot.style.pointerEvents = "auto";
      hotspot.classList.remove("active");
      
      if (chip) chip.classList.remove("active");
    } else {
      const visible = isLabelVisibleAtFrame(label, currentFrame);

      if (visible) {
        hotspot.style.display = "block";
        hotspot.style.pointerEvents = "auto";
        hotspot.style.opacity = "1";
        hotspot.classList.add("active");
        if (chip && !chip.classList.contains("active")) {
          chip.classList.add("active");
          chip.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        hotspot.style.display = "none";
        hotspot.style.opacity = "0";
        hotspot.style.pointerEvents = "none";
        hotspot.classList.remove("active");
        if (chip) chip.classList.remove("active");
      }
    }
  });
}

function renderLabelsInViewer() {
  const existingHotspots = modelViewer.querySelectorAll(".hotspot");
  existingHotspots.forEach((el) => el.remove());

  state.labels.forEach((label, index) => {
    const hotspot = document.createElement("button");
    hotspot.className = "hotspot";
    hotspot.setAttribute("slot", `hotspot-${index}`);
    hotspot.setAttribute("data-position", `${label.position.x} ${label.position.y} ${label.position.z}`);
    hotspot.setAttribute("data-normal", `${label.normal.x} ${label.normal.y} ${label.normal.z}`);
    hotspot.setAttribute("data-label-index", String(index));

    const annotation = document.createElement("div");
    annotation.className = "hotspot-annotation";
    annotation.textContent = label.name;

    hotspot.append(annotation);
    
    if (label.frames && label.frames.length > 0) {
      hotspot.addEventListener("click", () => {
        const targetFrame = getNearestLabelFrame(label);
        if (targetFrame !== null) {
          const targetTime = targetFrame / state.fps;
          state.pausedAt = targetTime;
          ensureFrameInView(targetFrame);
          seek(targetTime);
          setStatus(`Seeked to label frame ${targetFrame}`);
        }
      });
    }

    modelViewer.append(hotspot);
  });
  
  updateLabelPositions();
  updateLabelVisibilities(getTimelineTime());
}

function renderLabels() {
  labelList.innerHTML = "";

  if (!state.labels.length) {
    labelList.textContent = "No labels loaded.";
    modelViewer.querySelectorAll(".hotspot").forEach((el) => el.remove());
    return;
  }

  state.labels.forEach((label, index) => {
    const chip = document.createElement("div");
    chip.className = "label-chip";
    chip.setAttribute("data-label-index", String(index));
    
    if (label.frames && label.frames.length > 0) {
      chip.classList.add("clickable");
      chip.title = `Click to seek to nearest label frame`;
      chip.addEventListener("click", () => {
        const targetFrame = getNearestLabelFrame(label);
        if (targetFrame !== null) {
          const targetTime = targetFrame / state.fps;
          state.pausedAt = targetTime;
          ensureFrameInView(targetFrame);
          seek(targetTime);
          setStatus(`Seeked to label frame ${targetFrame}`);
        }
      });
    }

    const title = document.createElement("strong");
    const detail = document.createElement("span");
    title.textContent = label.name;
    
    if (label.visibilityRanges && label.visibilityRanges.length) {
      const rangeText = label.visibilityRanges
        .map((range) => (range.start === range.end ? `${range.start}` : `${range.start}-${range.end}`))
        .join(", ");
      title.textContent += ` (Visible: ${rangeText})`;
    } else if (label.frames && label.frames.length === 1) {
      title.textContent += ` (Frame ${label.frames[0]})`;
    } else if (label.frames && label.frames.length > 1) {
      title.textContent += ` (Frames: ${label.frames.join(", ")})`;
    }
    
    detail.textContent = formatTarget(label.position);
    chip.append(title, detail);
    labelList.append(chip);
  });

  renderLabelsInViewer();
}

async function readJsonFile(file) {
  try {
    return JSON.parse(await file.text());
  } catch {
    throw new Error(`${file.name} is not valid JSON.`);
  }
}

async function loadModel(file) {
  if (state.modelUrl) URL.revokeObjectURL(state.modelUrl);
  state.modelAnimations = [];
  state.modelAnimationDuration = 0;
  state.fps = 24;
  state.modelUrl = URL.createObjectURL(file);
  modelViewer.src = state.modelUrl;
  modelViewer.removeAttribute("animation-name");
  inputs.animation.innerHTML = '<option value="">Loading animations...</option>';
  inputs.animation.disabled = true;
  modelAnimationStatus.textContent = "Loading model animations...";
  setStatus(`Loaded model: ${file.name}`);
  requestAnimationFrame(() => fitModel());
}

function updateAnimationDuration() {
  let attempts = 0;
  const maxAttempts = 180; // Give larger GLBs time to expose animation clip durations.
  const activeAnim = modelViewer.animationName || (state.modelAnimations.length ? state.modelAnimations[0] : "");

  function check() {
    const duration = getModelAnimationDuration();
    if (duration > 0 || attempts >= maxAttempts) {
      state.modelAnimationDuration = duration;
      if (state.modelAnimationDuration > 0) {
        state.duration = state.modelAnimationDuration;
        inputs.duration.value = state.modelAnimationDuration.toFixed(1);
        state.timelineViewStartFrame = 0;
        state.timelineViewEndFrame = 0;
        prevTotalFrames = 0;
        ensureTimelineView();
      }
      modelViewer.currentTime = 0;
      modelViewer.pause();
      modelAnimationStatus.textContent = state.modelAnimationDuration
        ? `Animation: ${activeAnim} - ${state.modelAnimationDuration.toFixed(2)}s - ${getTotalFrames()} frames`
        : activeAnim ? `Animation: ${activeAnim} loaded` : "No animations";
      setStatus(state.modelAnimationDuration
        ? `Model animation ready: ${activeAnim} (${getTotalFrames()} frames).`
        : activeAnim ? `Model animation selected: ${activeAnim}.` : "Model ready.");
      renderTimelineMarkers();
      seek(0);
      if (!state.keyframes.length) fitModel();
    } else {
      attempts++;
      requestAnimationFrame(check);
    }
  }

  requestAnimationFrame(check);
}

function refreshModelAnimations() {
  const animations = Array.from(modelViewer.availableAnimations || []);
  state.modelAnimations = animations;
  inputs.animation.innerHTML = "";

  if (!animations.length) {
    inputs.animation.disabled = true;
    inputs.animation.append(new Option("No animation", ""));
    state.modelAnimationDuration = 0;
    modelAnimationStatus.textContent = "This GLB has no animation clips.";
    renderTimelineMarkers();
    return;
  }

  animations.forEach((name) => inputs.animation.append(new Option(name, name)));
  inputs.animation.disabled = false;
  modelViewer.animationName = animations[0];
  inputs.animation.value = animations[0];

  updateAnimationDuration();
}

async function loadAudio(file) {
  if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
  state.audioUrl = URL.createObjectURL(file);
  state.audioName = file.name;
  state.audioDuration = 0;
  timelineAudio.src = state.audioUrl;
  timelineAudio.load();
  audioStatus.textContent = `Loading audio: ${file.name}`;
}

async function loadCamera(file) {
  const json = await readJsonFile(file);
  const rawFrames = extractCameraFrames(json);
  if (!rawFrames.length) throw new Error("Camera JSON did not include keyframes.");
  
  state.fps = 24;

  if (json.shakeEnabled !== undefined || json.animationSettings?.shakeEnabled !== undefined) {
    state.shakeEnabled = !!(json.shakeEnabled ?? json.animationSettings?.shakeEnabled);
    inputs.shakeEnabled.checked = state.shakeEnabled;
    inputs.shakeIntensity.disabled = !state.shakeEnabled;
    inputs.shakeSpeed.disabled = !state.shakeEnabled;
    buttons.addShakeKeyframe.disabled = !state.shakeEnabled;
  }
  if (json.shakeIntensity !== undefined || json.animationSettings?.shakeIntensity !== undefined) {
    state.shakeIntensity = parseNumber(json.shakeIntensity ?? json.animationSettings?.shakeIntensity, 0.3);
    inputs.shakeIntensity.value = state.shakeIntensity;
    const shakeIntensityReadout = document.querySelector("#shakeIntensityReadout");
    if (shakeIntensityReadout) shakeIntensityReadout.textContent = state.shakeIntensity.toFixed(2);
  }
  if (json.shakeSpeed !== undefined || json.animationSettings?.shakeSpeed !== undefined) {
    state.shakeSpeed = parseNumber(json.shakeSpeed ?? json.animationSettings?.shakeSpeed, 2.0);
    inputs.shakeSpeed.value = state.shakeSpeed;
    const shakeSpeedReadout = document.querySelector("#shakeSpeedReadout");
    if (shakeSpeedReadout) shakeSpeedReadout.textContent = `${state.shakeSpeed.toFixed(1)}Hz`;
  }

  const duration = json.duration ?? json.animationSettings?.duration ?? json.totalFrames ?? json.frameCount ?? json.endFrame;
  setKeyframes(rawFrames, duration);
  setStatus(describeCameraTimeline());
}

function isFrameMapKey(key) {
  return /^\d+$/.test(String(key).trim());
}

function getFrameLabelsFromEntry(entry) {
  if (Array.isArray(entry)) return entry;
  if (!isPlainObject(entry)) return entry === null || entry === undefined ? [] : [entry];
  return entry.labels ?? entry.points ?? entry.annotations ?? entry.objects ?? entry.items ?? entry.data ?? entry.visible ?? entry.show ?? entry;
}

function pushFrameLabels(labels, frameNumber, frameLabels) {
  const frame = readFrameNumber(frameNumber);
  if (frame === null) return;

  if (Array.isArray(frameLabels)) {
    frameLabels.forEach((label) => {
      labels.push({
        frame,
        ...(isPlainObject(label) ? label : { text: label }),
      });
    });
    return;
  }

  if (isPlainObject(frameLabels)) {
    Object.entries(frameLabels).forEach(([key, value]) => {
      if (isVisibleFalse(value)) return;
      labels.push({
        frame,
        name: key,
        ...(isPlainObject(value) ? value : { text: value }),
      });
    });
  }
}

function extractFrameMappedLabels(json) {
  const labels = [];
  if (!isPlainObject(json)) return labels;

  const frameContainers = [
    json.frames,
    json.timeline,
    json.labelFrames,
    json.frameLabels,
    json.labelsByFrame,
    json.visibility,
    json.visibilityByFrame,
  ];

  frameContainers.forEach((container) => {
    if (Array.isArray(container)) {
      container.forEach((entry, index) => {
        if (!isPlainObject(entry)) return;
        const frame = entry.frame ?? entry.frameNumber ?? entry.index ?? index;
        pushFrameLabels(labels, frame, getFrameLabelsFromEntry(entry));
      });
    } else if (isPlainObject(container)) {
      Object.entries(container).forEach(([frame, frameLabels]) => {
        if (isFrameMapKey(frame)) pushFrameLabels(labels, frame, getFrameLabelsFromEntry(frameLabels));
      });
    }
  });

  const numericKeys = Object.keys(json).filter(isFrameMapKey);
  if (numericKeys.length) {
    numericKeys.forEach((frame) => pushFrameLabels(labels, frame, getFrameLabelsFromEntry(json[frame])));
  }

  return labels;
}

function mergeLabelsByIdentity(labels) {
  const merged = new Map();

  labels.forEach((label) => {
    const positionKey = [label.position.x, label.position.y, label.position.z]
      .map((value) => Number(value).toFixed(3))
      .join(",");
    const key = `${label.nodeName || ""}|${label.name || ""}|${positionKey}`;
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, {
        ...label,
        frames: [...(label.frames || [])],
        visibilityRanges: [...(label.visibilityRanges || [])],
      });
      return;
    }

    existing.frames = [...new Set([...(existing.frames || []), ...(label.frames || [])])].sort((a, b) => a - b);
    existing.visibilityRanges = [...(existing.visibilityRanges || []), ...(label.visibilityRanges || [])];
    existing.hasTimelineVisibility = existing.hasTimelineVisibility || label.hasTimelineVisibility;
    if (!existing.frame && label.frame) existing.frame = label.frame;
    if (!existing.time && label.time) existing.time = label.time;
  });

  return Array.from(merged.values()).map((label) => ({
    ...label,
    visibilityRanges: label.visibilityRanges
      .filter((range) => range && Number.isFinite(range.start) && Number.isFinite(range.end))
      .sort((a, b) => a.start - b.start),
  }));
}

function normalizeLabels(rawLabels) {
  return mergeLabelsByIdentity(rawLabels.map((raw, index) => normalizeLabel(raw, index)));
}

function extractRawLabelsFromJson(json) {
  const frameMappedLabels = extractFrameMappedLabels(json);
  if (frameMappedLabels.length) return frameMappedLabels;

  if (Array.isArray(json)) {
    return json;
  }
  if (json.labels && Array.isArray(json.labels)) {
    return json.labels;
  }
  if (json.points && Array.isArray(json.points)) {
    return json.points;
  }
  if (json.annotations && Array.isArray(json.annotations)) {
    return json.annotations;
  }
  if (json.items && Array.isArray(json.items)) {
    return json.items;
  }
  if (json.objects && Array.isArray(json.objects)) {
    return json.objects;
  }
  if (json.data && Array.isArray(json.data)) {
    return json.data;
  }
  if (json.frames && Array.isArray(json.frames)) {
    const labels = [];
    json.frames.forEach((frameEntry, frameIndex) => {
      const frameNumber = frameEntry.frame ?? frameEntry.frameNumber ?? frameEntry.index ?? frameIndex;
      const frameLabels = frameEntry.labels ?? frameEntry.points ?? frameEntry.annotations ?? frameEntry.objects ?? [];
      if (Array.isArray(frameLabels)) {
        frameLabels.forEach((label) => {
          labels.push({
            frame: frameNumber,
            ...(typeof label === "object" && label !== null ? label : { text: label }),
          });
        });
      } else if (frameLabels && typeof frameLabels === "object") {
        Object.entries(frameLabels).forEach(([key, value]) => {
          labels.push({
            frame: frameNumber,
            name: key,
            ...(typeof value === "object" && value !== null ? value : { text: value }),
          });
        });
      }
    });
    if (labels.length) return labels;
  }
  if (typeof json === "object" && json !== null) {
    return Object.entries(json).map(([key, val]) => {
      if (val && typeof val === "object") {
        return {
          name: key,
          ...val
        };
      } else if (typeof val === "string") {
        return {
          name: key,
          text: val
        };
      }
      return null;
    }).filter(Boolean);
  }
  return [];
}

function hasLabelTextCandidate(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some((item) => hasLabelTextCandidate(item));

  const labelTextKeys = [
    "text",
    "label",
    "labels",
    "title",
    "caption",
    "message",
    "annotation",
    "description",
    "content",
    "displayName",
    "objectName",
  ];

  if (labelTextKeys.some((key) => value[key] !== undefined && getLabelText(value[key]))) return true;
  return Object.values(value).some((child) => hasLabelTextCandidate(child));
}

function isLikelyLabelJson(json) {
  const rawLabels = extractRawLabelsFromJson(json);
  return rawLabels.some((label, index) => {
    const normalized = normalizeLabel(label, index);
    return normalized.name && !/^Label \d+$/.test(normalized.name);
  }) || hasLabelTextCandidate(json);
}

async function loadLabels(file) {
  const json = await readJsonFile(file);
  const rawLabels = extractRawLabelsFromJson(json);
  state.labels = normalizeLabels(rawLabels);
  renderLabels();
  setStatus(`Loaded ${state.labels.length} label${state.labels.length === 1 ? "" : "s"}.`);
  if (!state.labels.length) {
    setStatus("No labels found. Check that the JSON has labels, points, annotations, objects, or frame labels.", "warn");
  }
}

async function handleFile(file) {
  const name = file.name.toLowerCase();
  try {
    if (name.endsWith(".glb") || name.endsWith(".gltf")) {
      await loadModel(file);
    } else if (file.type.startsWith("audio/") || /\.(mp3|wav|m4a|ogg)$/i.test(name)) {
      await loadAudio(file);
    } else if (name.endsWith(".json")) {
      const text = await file.text();
      const json = JSON.parse(text);
      if (json.app === "camera-animation-tool") {
        await loadWorkingFile(file);
        return;
      }
      const likelyLabels = isLikelyLabelJson(json);
      const cameraFrames = likelyLabels ? [] : extractCameraFrames(json);
      if (cameraFrames.length) {
        state.fps = 24;
        if (json.shakeEnabled !== undefined) {
          state.shakeEnabled = !!json.shakeEnabled;
          inputs.shakeEnabled.checked = state.shakeEnabled;
          inputs.shakeIntensity.disabled = !state.shakeEnabled;
          inputs.shakeSpeed.disabled = !state.shakeEnabled;
          buttons.addShakeKeyframe.disabled = !state.shakeEnabled;
        }
        if (json.shakeIntensity !== undefined) {
          state.shakeIntensity = parseNumber(json.shakeIntensity, 0.3);
          inputs.shakeIntensity.value = state.shakeIntensity;
          const shakeIntensityReadout = document.querySelector("#shakeIntensityReadout");
          if (shakeIntensityReadout) shakeIntensityReadout.textContent = state.shakeIntensity.toFixed(2);
        }
        if (json.shakeSpeed !== undefined) {
          state.shakeSpeed = parseNumber(json.shakeSpeed, 2.0);
          inputs.shakeSpeed.value = state.shakeSpeed;
          const shakeSpeedReadout = document.querySelector("#shakeSpeedReadout");
          if (shakeSpeedReadout) shakeSpeedReadout.textContent = `${state.shakeSpeed.toFixed(1)}Hz`;
        }
        setKeyframes(cameraFrames, json.duration ?? json.totalFrames ?? json.frameCount ?? json.endFrame);
        setStatus(describeCameraTimeline());
      } else {
        const rawLabels = extractRawLabelsFromJson(json);
        state.labels = normalizeLabels(rawLabels);
        renderLabels();
        setStatus(`Loaded ${state.labels.length} label${state.labels.length === 1 ? "" : "s"}.`);
        if (!state.labels.length) {
          setStatus("No labels found. Check that the JSON has labels, points, annotations, objects, or frame labels.", "warn");
        }
      }
    }
  } catch (error) {
    setStatus(error.message, "warn");
  }
}

function getModelSizeForFit() {
  try {
    const dimensions = typeof modelViewer.getDimensions === "function" ? modelViewer.getDimensions() : null;
    const center = typeof modelViewer.getBoundingBoxCenter === "function" ? modelViewer.getBoundingBoxCenter() : null;
    const width = Math.abs(parseNumber(dimensions?.x, 0));
    const height = Math.abs(parseNumber(dimensions?.y, 0));
    const depth = Math.abs(parseNumber(dimensions?.z, 0));
    const hasSize = width > 0.001 || height > 0.001 || depth > 0.001;
    return {
      center: center || { x: 0, y: 0, z: 0 },
      width,
      height,
      depth,
      hasSize,
    };
  } catch {
    return {
      center: { x: 0, y: 0, z: 0 },
      width: 0,
      height: 0,
      depth: 0,
      hasSize: false,
    };
  }
}

function fitModel(attempt = 0) {
  requestAnimationFrame(async () => {
    try {
      if (modelViewer.updateComplete) await modelViewer.updateComplete;

      const size = getModelSizeForFit();
      if (!size.hasSize && attempt < 12) {
        fitModel(attempt + 1);
        return;
      }

      const fov = 28;
      const target = size.center;
      const width = size.hasSize ? size.width : 1;
      const height = size.hasSize ? size.height : 1;
      const depth = size.hasSize ? size.depth : 1;
      const diagonal = Math.max(Math.hypot(width, height, depth), 1);
      const aspect = Math.max(modelViewer.clientWidth / Math.max(modelViewer.clientHeight, 1), 0.6);
      const verticalFitRadius = (height * 0.85) / Math.tan((fov * Math.PI) / 360);
      const horizontalFitRadius = ((Math.max(width, depth) * 0.85) / Math.tan((fov * Math.PI) / 360)) / aspect;
      const radius = Math.max(diagonal * 1.55, verticalFitRadius, horizontalFitRadius, 3);
      const yaw = 0;
      const pitch = 72;

      modelViewer.fieldOfView = `${fov}deg`;
      modelViewer.cameraTarget = `${target.x.toFixed(3)}m ${target.y.toFixed(3)}m ${target.z.toFixed(3)}m`;
      modelViewer.cameraOrbit = `${yaw}deg ${pitch}deg ${radius.toFixed(3)}m`;
      if (typeof modelViewer.jumpCameraToGoal === "function") modelViewer.jumpCameraToGoal();

      const orbit = modelViewer.getCameraOrbit();
      if (orbit) {
        inputs.yaw.value = ((orbit.theta * 180) / Math.PI).toFixed(1);
        inputs.pitch.value = ((orbit.phi * 180) / Math.PI).toFixed(1);
        inputs.radius.value = orbit.radius.toFixed(2);
        
        state.defaultCamera.orbit = {
          yaw: (orbit.theta * 180) / Math.PI,
          pitch: (orbit.phi * 180) / Math.PI,
          radius: orbit.radius
        };
      }

      const liveTarget = modelViewer.getCameraTarget();
      if (liveTarget) {
        inputs.targetX.value = liveTarget.x.toFixed(2);
        inputs.targetY.value = liveTarget.y.toFixed(2);
        inputs.targetZ.value = liveTarget.z.toFixed(2);
        
        state.defaultCamera.target = { x: liveTarget.x, y: liveTarget.y, z: liveTarget.z };
      }

      const liveFov = modelViewer.getFieldOfView();
      if (liveFov) {
        const lens = fovToLens(liveFov);
        inputs.lens.value = Math.round(lens);
        if (lensReadout) lensReadout.textContent = `${Math.round(lens)}mm`;
        if (fovReadout) fovReadout.textContent = `${liveFov.toFixed(1)}deg FOV`;
        
        state.defaultCamera.fov = liveFov;
        state.defaultCamera.lens = lens;
      }
    } catch (e) {
      console.warn("Failed to read camera values on fitModel:", e);
    }

    // Update displays
    const frame = createCurrentKeyframe(getTimelineTime());
    updateCurrentValuesDisplay(frame);
    
    setStatus("Fit model to screen.");
  });
}

function resetCamera() {
  state.keyframes = [];
  state.duration = Math.max(parseNumber(inputs.duration.value, 6), state.modelAnimationDuration, 0.2);
  inputs.duration.value = state.duration.toFixed(1);
  stop();
  renderKeyframes();
  renderTimelineMarkers();
  drawCameraPath();
  fitModel();
}

inputs.project.addEventListener("change", () => inputs.project.files[0] && loadWorkingFile(inputs.project.files[0]).catch((error) => setStatus(error.message, "warn")));
inputs.model.addEventListener("change", () => inputs.model.files[0] && loadModel(inputs.model.files[0]));
inputs.camera.addEventListener("change", () => inputs.camera.files[0] && loadCamera(inputs.camera.files[0]).catch((error) => setStatus(error.message, "warn")));
inputs.labels.addEventListener("change", () => inputs.labels.files[0] && loadLabels(inputs.labels.files[0]).catch((error) => setStatus(error.message, "warn")));
inputs.audio.addEventListener("change", () => inputs.audio.files[0] && loadAudio(inputs.audio.files[0]));
inputs.startModel.addEventListener("change", async () => {
  if (!inputs.startModel.files[0]) return;
  await loadModel(inputs.startModel.files[0]);
  updateStartStatus("model", inputs.startModel.files[0].name);
});
inputs.startCamera.addEventListener("change", async () => {
  if (!inputs.startCamera.files[0]) return;
  try {
    await loadCamera(inputs.startCamera.files[0]);
    updateStartStatus("camera", `${state.keyframes.length} keyframes loaded`);
  } catch (error) {
    updateStartStatus("camera", error.message);
    setStatus(error.message, "warn");
  }
});
inputs.startLabel.addEventListener("change", async () => {
  if (!inputs.startLabel.files[0]) return;
  try {
    await loadLabels(inputs.startLabel.files[0]);
    updateStartStatus("labels", `${state.labels.length} labels loaded`);
  } catch (error) {
    updateStartStatus("labels", error.message);
    setStatus(error.message, "warn");
  }
});
inputs.startAudio.addEventListener("change", async () => {
  if (!inputs.startAudio.files[0]) return;
  await loadAudio(inputs.startAudio.files[0]);
  updateStartStatus("audio", inputs.startAudio.files[0].name);
});
inputs.animation.addEventListener("change", () => {
  if (!inputs.animation.value) return;
  modelViewer.animationName = inputs.animation.value;
  
  let attempts = 0;
  const maxAttempts = 30; // Up to 500ms
  
  function check() {
    const duration = getModelAnimationDuration();
    if (duration > 0 || attempts >= maxAttempts) {
      state.modelAnimationDuration = duration;
      if (state.modelAnimationDuration > 0) {
        state.duration = state.modelAnimationDuration;
        inputs.duration.value = state.modelAnimationDuration.toFixed(1);
        state.timelineViewStartFrame = 0;
        state.timelineViewEndFrame = 0;
        prevTotalFrames = 0;
        ensureTimelineView();
      }
      modelViewer.currentTime = getTimelineTime();
      modelViewer.pause();
      modelAnimationStatus.textContent = state.modelAnimationDuration
        ? `Animation: ${inputs.animation.value} - ${state.modelAnimationDuration.toFixed(2)}s - ${getTotalFrames()} frames`
        : `Animation: ${inputs.animation.value} selected`;
      renderTimelineMarkers();
      seek(getTimelineTime());
    } else {
      attempts++;
      requestAnimationFrame(check);
    }
  }
  
  requestAnimationFrame(check);
});
inputs.timeline.addEventListener("input", () => {
  state.pausedAt = getTimeFromTimelineValue(inputs.timeline.value);
  seek(state.pausedAt);
});
inputs.bottomTimeline.addEventListener("input", () => {
  const frame = parseNumber(inputs.bottomTimeline.value, 0);
  const snappedFrame = snapFrame(frame);
  state.pausedAt = snappedFrame / state.fps;
  seek(state.pausedAt);
});
if (timelineTrackWrap) {
  timelineTrackWrap.addEventListener("wheel", zoomTimelineAtPointer, { passive: false });
}
inputs.bottomTimeline.addEventListener("dblclick", () => {
  state.timelineViewStartFrame = 0;
  state.timelineViewEndFrame = getTotalFrames();
  renderTimelineMarkers();
  seek(getTimelineTime());
  setStatus("Timeline zoom reset.");
});
inputs.duration.addEventListener("change", () => {
  const lastKeyframeTime = state.keyframes.at(-1)?.time || 0.2;
  state.duration = Math.max(
    parseNumber(inputs.duration.value, 6),
    lastKeyframeTime,
    state.modelAnimationDuration,
    0.2
  );
  inputs.duration.value = state.duration.toFixed(1);
  renderTimelineMarkers();
  seek(getTimelineTime());
});

for (const input of [inputs.yaw, inputs.pitch, inputs.radius, inputs.targetX, inputs.targetY, inputs.targetZ]) {
  input.addEventListener("change", () => {
    applyCamera(createCurrentKeyframe(getTimelineTime()));
    if (state.autoKeyframe) {
      recordAutoKeyframe();
    }
  });
}

inputs.lens.addEventListener("input", () => {
  applyCamera(createCurrentKeyframe(getTimelineTime()));
  if (state.autoKeyframe) {
    recordAutoKeyframe();
  }
});

document.querySelectorAll("[data-lens]").forEach((button) => {
  button.addEventListener("click", () => {
    inputs.lens.value = button.dataset.lens;
    applyCamera(createCurrentKeyframe(getTimelineTime()));
  });
});

if (buttons.play) {
  buttons.play.addEventListener("click", togglePlayback);
}
buttons.enterEditor.addEventListener("click", openEditor);
buttons.skipImport.addEventListener("click", openEditor);
buttons.previewMode.addEventListener("click", enterPreviewMode);
buttons.timelineToggle.addEventListener("click", togglePlayback);
buttons.snapToggle.addEventListener("click", () => {
  state.snapToFiveFrames = !state.snapToFiveFrames;
  buttons.snapToggle.classList.toggle("active", state.snapToFiveFrames);
  buttons.snapToggle.setAttribute("aria-pressed", String(state.snapToFiveFrames));
  if (state.snapToFiveFrames) {
    const snappedTime = snapFrame(getCurrentFrame(getTimelineTime())) / state.fps;
    state.pausedAt = clamp(snappedTime, 0, state.duration);
    seek(state.pausedAt);
  }
  setStatus(state.snapToFiveFrames ? "Timeline snap enabled: 5-frame steps." : "Timeline snap disabled.");
});
buttons.fit.addEventListener("click", fitModel);
buttons.reset.addEventListener("click", resetCamera);
buttons.firstFrame.addEventListener("click", () => goToFrame(0));
buttons.prevKeyframe.addEventListener("click", () => stepFrame(-1));
buttons.nextKeyframe.addEventListener("click", () => stepFrame(1));
buttons.lastFrame.addEventListener("click", () => goToFrame(getTotalFrames()));
buttons.exportJson.addEventListener("click", exportCameraJson);
buttons.saveProject.addEventListener("click", saveWorkingFile);
buttons.copyKeyframe.addEventListener("click", () => copyKeyframe());
buttons.pasteKeyframe.addEventListener("click", () => pasteKeyframe());
buttons.deleteKeyframe.addEventListener("click", () => deleteKeyframe());
buttons.nudgeKeyframeLeft.addEventListener("click", () => nudgeSelectedKeyframe(-1));
buttons.nudgeKeyframeRight.addEventListener("click", () => nudgeSelectedKeyframe(1));
buttons.syncCurrentValues.addEventListener("click", () => {
  const didSync = syncInputsFromLiveCamera();
  setStatus(didSync ? "Synced current camera values." : "Current camera values are already synced.");
});
if (buttons.autoKeyToggle) {
  buttons.autoKeyToggle.addEventListener("click", toggleAutoKey);
}
buttons.add.addEventListener("click", () => addKeyframe());

buttons.loopToggle.addEventListener("click", () => {
  state.loopPlayback = !state.loopPlayback;
  buttons.loopToggle.classList.toggle("active", state.loopPlayback);
  buttons.loopToggle.setAttribute("aria-pressed", String(state.loopPlayback));
  setStatus(state.loopPlayback ? "Timeline loop enabled." : "Timeline loop disabled.");
});

inputs.shakeEnabled.addEventListener("change", () => {
  state.shakeEnabled = inputs.shakeEnabled.checked;
  inputs.shakeIntensity.disabled = !state.shakeEnabled;
  inputs.shakeSpeed.disabled = !state.shakeEnabled;
  inputs.shakeProfile.disabled = !state.shakeEnabled;
  buttons.addShakeKeyframe.disabled = !state.shakeEnabled;
  seek(getTimelineTime());
  setStatus(state.shakeEnabled ? "Handheld camera shake enabled." : "Handheld camera shake disabled.");
});

inputs.shakeProfile.addEventListener("change", () => {
  state.shakeProfile = inputs.shakeProfile.value;
  seek(getTimelineTime());
});

const shakeIntensityReadout = document.querySelector("#shakeIntensityReadout");
inputs.shakeIntensity.addEventListener("input", () => {
  state.shakeIntensity = parseNumber(inputs.shakeIntensity.value, 0.3);
  if (shakeIntensityReadout) {
    shakeIntensityReadout.textContent = state.shakeIntensity.toFixed(2);
  }
  if (state.keyframes.length && state.selectedKeyframeIndex >= 0) {
    state.keyframes[state.selectedKeyframeIndex].shake = state.shakeIntensity;
    renderKeyframes();
  }
  seek(getTimelineTime());
});

const shakeSpeedReadout = document.querySelector("#shakeSpeedReadout");
inputs.shakeSpeed.addEventListener("input", () => {
  state.shakeSpeed = parseNumber(inputs.shakeSpeed.value, 2.0);
  if (shakeSpeedReadout) {
    shakeSpeedReadout.textContent = `${state.shakeSpeed.toFixed(1)}Hz`;
  }
  seek(getTimelineTime());
});

buttons.addShakeKeyframe.addEventListener("click", () => {
  const currentFrame = getCurrentFrame(getTimelineTime());
  const time = currentFrame / state.fps;
  const existingIndex = state.keyframes.findIndex(frame => getCurrentFrame(frame.time) === currentFrame);

  if (existingIndex >= 0) {
    state.keyframes[existingIndex].shake = parseNumber(inputs.shakeIntensity.value, 0.3);
    setStatus(`Updated shake intensity at Frame ${currentFrame}.`);
  } else {
    const frame = createCurrentKeyframe(time);
    state.keyframes = [...state.keyframes, frame].sort((a, b) => a.time - b.time);
    const newIndex = state.keyframes.indexOf(frame);
    state.selectedKeyframeIndex = newIndex;
    setStatus(`Added keyframe with shake at Frame ${currentFrame}.`);
  }

  renderKeyframes();
  renderTimelineMarkers();
  seek(time);
});

inputs.presetSelect.addEventListener("change", () => {
  const index = parseNumber(inputs.presetSelect.value, -1);
  if (index >= 0) {
    state.selectedPresetIndex = index;
    applyPreset(state.presets[index]);
  }
});

buttons.savePreset.addEventListener("click", () => {
  if (state.selectedPresetIndex < 0) {
    setStatus("Select a preset to update first.", "warn");
    return;
  }

  const preset = state.presets[state.selectedPresetIndex];
  preset.duration = state.duration;
  preset.lens = parseNumber(inputs.lens.value, 35);
  preset.frames = state.keyframes.map(frame => ({
    time: frame.time,
    orbit: { ...frame.orbit },
    target: { ...frame.target },
    lens: frame.lens,
    fov: frame.fov,
    shake: frame.shake,
  }));

  setStatus(`Updated preset: ${preset.name} with current keyframes.`);
});

buttons.createPreset.addEventListener("click", () => {
  const name = prompt("Enter custom preset name:", `Custom Preset ${state.presets.length + 1}`);
  if (!name) return;

  const newPreset = {
    name,
    description: "User defined camera movement.",
    duration: state.duration,
    lens: parseNumber(inputs.lens.value, 35),
    frames: state.keyframes.map(frame => ({
      time: frame.time,
      orbit: { ...frame.orbit },
      target: { ...frame.target },
      lens: frame.lens,
      fov: frame.fov,
      shake: frame.shake,
    })),
  };

  state.presets.push(newPreset);
  state.selectedPresetIndex = state.presets.length - 1;
  renderPresets();
  setStatus(`Created custom preset: ${name}`);
});

sideToggleButton.addEventListener("click", () => {
  appShell.classList.toggle("panel-closed");
  updateDetailsMenuLabel();
});

closePanelButton.addEventListener("click", () => {
  appShell.classList.add("panel-closed");
  updateDetailsMenuLabel();
});

if (sidebarDrawerHandle) {
  sidebarDrawerHandle.addEventListener("click", () => {
    appShell.classList.toggle("panel-closed");
    updateDetailsMenuLabel();
  });
}

menuDropdowns.forEach((menu) => {
  menu.addEventListener("toggle", () => {
    if (menu.open) closeToolbarMenus(menu);
  });
});

document.addEventListener("pointerdown", (event) => {
  if (!menuDropdowns.some((menu) => menu.contains(event.target))) {
    closeToolbarMenus();
  }
  if (cursorImportMenu && !cursorImportMenu.contains(event.target)) {
    closeCursorImportMenu();
  }
});

window.addEventListener("pointermove", (event) => {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

cursorImportMenu?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-import-target]");
  if (!button) return;
  const targetInput = inputs[button.dataset.importTarget];
  closeCursorImportMenu();
  targetInput?.click();
});

let dragCounter = 0;

window.addEventListener("dragenter", (event) => {
  event.preventDefault();
  dragCounter++;
  dropOverlay.hidden = false;
});

window.addEventListener("dragover", (event) => {
  event.preventDefault();
});

window.addEventListener("dragleave", (event) => {
  event.preventDefault();
  dragCounter--;
  if (dragCounter <= 0) {
    dropOverlay.hidden = true;
    dragCounter = 0;
  }
});

window.addEventListener("drop", async (event) => {
  event.preventDefault();
  dropOverlay.hidden = true;
  dragCounter = 0;
  for (const file of event.dataTransfer.files) {
    await handleFile(file);
  }
});

window.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTypingTarget = target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLSelectElement
    || target?.isContentEditable;

  if (!isTypingTarget) {
    if (event.ctrlKey && event.code === "KeyC") {
      if (state.isMouseOverTimeline) {
        event.preventDefault();
        copyKeyframe();
      }
    } else if (event.ctrlKey && event.code === "KeyV") {
      if (state.isMouseOverTimeline) {
        event.preventDefault();
        pasteKeyframe();
      }
    } else if (event.code === "KeyK") {
      if (state.isMouseOverTimeline) {
        event.preventDefault();
        addKeyframe();
      }
    } else if (event.code === "KeyA") {
      event.preventDefault();
      toggleAutoKey();
    } else if (event.code === "KeyF") {
      event.preventDefault();
      fitModel();
    } else if (event.ctrlKey && event.code === "KeyI") {
      event.preventDefault();
      openCursorImportMenu();
    } else if (event.code === "Space") {
      event.preventDefault();
      togglePlayback();
    } else if (event.code === "ArrowLeft") {
      event.preventDefault();
      stepFrame(-1);
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      stepFrame(1);
    } else if (event.code === "Delete" || event.code === "Backspace") {
      if (state.isMouseOverTimeline) {
        event.preventDefault();
        deleteKeyframe();
      }
    } else if (event.code === "Escape") {
      if (document.body.classList.contains("preview-mode")) {
        event.preventDefault();
        exitPreviewMode();
        return;
      }
      closeToolbarMenus();
      closeCursorImportMenu();
    }
  }
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTypingTarget = target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLSelectElement
    || target?.isContentEditable;

  if (!isTypingTarget && event.code === "KeyF") {
    event.preventDefault();
    event.stopPropagation();
    fitModel();
  }
}, true);

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && document.body.classList.contains("preview-mode")) {
    document.body.classList.remove("preview-mode");
    pause();
  }
});

timelineAudio.addEventListener("loadedmetadata", () => {
  state.audioDuration = parseNumber(timelineAudio.duration, 0);
  if (state.audioDuration > state.duration) {
    state.duration = state.audioDuration;
    inputs.duration.value = state.audioDuration.toFixed(1);
  }
  audioStatus.textContent = state.audioDuration
    ? `Audio: ${state.audioName} - ${state.audioDuration.toFixed(2)}s`
    : `Audio loaded: ${state.audioName}`;
  renderAudioTrack();
  renderTimelineMarkers();
  seek(getTimelineTime());
  setStatus(`Loaded audio: ${state.audioName}`);
});

timelineAudio.addEventListener("ended", () => {
  if (state.isPlaying) stop();
});

modelViewer.addEventListener("load", () => {
  refreshModelAnimations();
  fitModel();
  updateLabelPositions();
  drawCameraPath();
  setStatus("Model ready. Checking GLB animations...");
});

modelViewer.addEventListener("camera-change", () => {
  if (state.isPlaying) return;
  const didSync = syncInputsFromLiveCamera();
  if (state.autoKeyframe && didSync) {
    recordAutoKeyframe();
  }
});

resetCamera();
renderPresets();
updatePlaybackButtons();
updateDetailsMenuLabel();

if (inputs.easingSelect) {
  inputs.easingSelect.addEventListener("change", () => {
    if (state.keyframes.length && state.selectedKeyframeIndex >= 0) {
      state.keyframes[state.selectedKeyframeIndex].easing = inputs.easingSelect.value;
      updateEasingPreview(inputs.easingSelect.value);
      seek(getTimelineTime());
      drawCameraPath();
    }
  });
}

if (buttons.aiGenerate && inputs.aiPrompt) {
  buttons.aiGenerate.addEventListener("click", () => {
    generateAiSequence(inputs.aiPrompt.value);
  });
  
  inputs.aiPrompt.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      generateAiSequence(inputs.aiPrompt.value);
    }
  });
}

if (inputs.aiCustomRange) {
  inputs.aiCustomRange.addEventListener("change", updateAiFrameRangeState);
  updateAiFrameRangeState();
}
if (inputs.aiStartFrame) {
  inputs.aiStartFrame.addEventListener("input", () => {
    state.aiStartFrameEdited = true;
  });
}
if (inputs.aiEndFrame) {
  inputs.aiEndFrame.addEventListener("input", () => {
    state.aiEndFrameEdited = true;
  });
}

document.querySelectorAll(".ai-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const promptText = chip.dataset.prompt;
    if (inputs.aiPrompt) {
      inputs.aiPrompt.value = promptText;
    }
    generateAiSequence(promptText);
  });
});



if (timelinePanel) {
  timelinePanel.addEventListener("pointerenter", () => {
    state.isMouseOverTimeline = true;
  });
  timelinePanel.addEventListener("pointerleave", () => {
    state.isMouseOverTimeline = false;
  });
}

// Viewport Zoom via Ctrl + Right-Click Drag
let isCtrlRightClickDragging = false;
let ctrlRightClickDragStart = { x: 0, y: 0 };
let ctrlRightClickStartRadius = 3.0;

modelViewer.addEventListener("contextmenu", (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
});

modelViewer.addEventListener("click", (event) => {
  if (!event.target.closest(".hotspot")) {
    event.stopImmediatePropagation();
  }
}, true);

modelViewer.addEventListener("dblclick", (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
}, true);

modelViewer.addEventListener("pointerdown", (event) => {
  if (event.ctrlKey && event.button === 2) {
    event.stopImmediatePropagation();
    event.preventDefault();
    
    isCtrlRightClickDragging = true;
    ctrlRightClickDragStart = { x: event.clientX, y: event.clientY };
    
    try {
      const orbit = modelViewer.getCameraOrbit();
      ctrlRightClickStartRadius = orbit ? orbit.radius : 3.0;
    } catch {
      ctrlRightClickStartRadius = 3.0;
    }
    
    modelViewer.setPointerCapture(event.pointerId);
  }
}, true);

modelViewer.addEventListener("pointermove", (event) => {
  if (isCtrlRightClickDragging) {
    event.stopImmediatePropagation();
    event.preventDefault();
    
    const deltaY = event.clientY - ctrlRightClickDragStart.y;
    const sensitivity = 0.005;
    const radiusOffset = deltaY * ctrlRightClickStartRadius * sensitivity;
    const nextRadius = Math.max(ctrlRightClickStartRadius + radiusOffset, 0.001);
    
    try {
      const orbit = modelViewer.getCameraOrbit();
      if (orbit) {
        const yawDeg = (orbit.theta * 180) / Math.PI;
        const pitchDeg = (orbit.phi * 180) / Math.PI;
        modelViewer.cameraOrbit = `${yawDeg.toFixed(2)}deg ${pitchDeg.toFixed(2)}deg ${nextRadius.toFixed(3)}m`;
        
        inputs.radius.value = nextRadius.toFixed(2);
        
        const frame = createCurrentKeyframe(getTimelineTime());
        updateCurrentValuesDisplay(frame);
      }
    } catch (e) {
      console.error("Zoom handler failed:", e);
    }
  }
}, true);

modelViewer.addEventListener("pointerup", (event) => {
  if (isCtrlRightClickDragging) {
    event.stopImmediatePropagation();
    event.preventDefault();
    modelViewer.releasePointerCapture(event.pointerId);
    isCtrlRightClickDragging = false;
  }
}, true);

modelViewer.addEventListener("pointercancel", (event) => {
  if (isCtrlRightClickDragging) {
    event.stopImmediatePropagation();
    event.preventDefault();
    modelViewer.releasePointerCapture(event.pointerId);
    isCtrlRightClickDragging = false;
  }
}, true);
