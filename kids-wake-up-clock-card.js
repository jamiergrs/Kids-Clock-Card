const DEFAULT_CONFIG = {
  wake_time: "07:00",
  sleep_time: "18:00",
  locale: "default",
  hour12: true,
  night_label: "Sleepy Time",
  day_label: "Wake Up Time",
  title_sleep: "Shhh... it's still nighttime",
  title_awake: "Good morning!",
  sleep_message: "The moon is out, so it's time to rest and stay in bed.",
  awake_message: "The sun is up, so it's okay to get out of bed and start the day.",
  title_font_size: 3.1,
  message_font_size: 1.2,
  media_player_entity: "",
  show_media_controls: false,
  burn_in_protection: true,
  burn_in_shift_px: 2,
  night_burn_in_dimming: true,
  show_seconds: true,
  show_schedule: true,
  show_date: true,
  animate: true,
  day_background_start: "#7bd7ff",
  day_background_mid: "#82d6c4",
  day_background_end: "#ffd976",
  night_background_start: "#10162f",
  night_background_mid: "#1e2853",
  night_background_end: "#334d89",
  shell_day_start: "#fffde7",
  shell_day_end: "#ffd56a",
  shell_night_start: "#ecf2ff",
  shell_night_end: "#99afff",
};

const CONFIG_FIELDS = [
  { key: "wake_time", label: "Wake time", type: "time" },
  { key: "sleep_time", label: "Sleep time", type: "time" },
  { key: "title_awake", label: "Day title", type: "text" },
  { key: "title_sleep", label: "Night title", type: "text" },
  { key: "title_font_size", label: "Title size (rem)", type: "number", min: 1.6, max: 4.5, step: 0.1 },
  { key: "day_label", label: "Day badge", type: "text" },
  { key: "night_label", label: "Night badge", type: "text" },
  { key: "awake_message", label: "Day message", type: "text" },
  { key: "sleep_message", label: "Night message", type: "text" },
  { key: "message_font_size", label: "Message size (rem)", type: "number", min: 0.9, max: 2, step: 0.1 },
  { key: "media_player_entity", label: "Media player entity", type: "text", placeholder: "media_player.kids_room" },
  { key: "show_media_controls", label: "Show media controls", type: "boolean" },
  { key: "burn_in_protection", label: "Burn-in protection", type: "boolean" },
  { key: "burn_in_shift_px", label: "Burn-in shift (px)", type: "number", min: 0, max: 4, step: 1 },
  { key: "night_burn_in_dimming", label: "Dim at night", type: "boolean" },
  { key: "locale", label: "Locale", type: "text", placeholder: "default" },
  { key: "day_background_start", label: "Day sky start", type: "color" },
  { key: "day_background_mid", label: "Day sky middle", type: "color" },
  { key: "day_background_end", label: "Day sky end", type: "color" },
  { key: "night_background_start", label: "Night sky start", type: "color" },
  { key: "night_background_mid", label: "Night sky middle", type: "color" },
  { key: "night_background_end", label: "Night sky end", type: "color" },
  { key: "shell_day_start", label: "Day shell start", type: "color" },
  { key: "shell_day_end", label: "Day shell end", type: "color" },
  { key: "shell_night_start", label: "Night shell start", type: "color" },
  { key: "shell_night_end", label: "Night shell end", type: "color" },
  { key: "hour12", label: "Use 12-hour time", type: "boolean" },
  { key: "show_seconds", label: "Show seconds", type: "boolean" },
  { key: "show_date", label: "Show date", type: "boolean" },
  { key: "show_schedule", label: "Show schedule", type: "boolean" },
  { key: "animate", label: "Enable animation", type: "boolean" },
];

const CARD_STYLE = `
  :host {
    display: block;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  ha-card {
    height: 100%;
    min-height: 320px;
    overflow: hidden;
    border-radius: 32px;
    border: none;
    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .frame {
    --day-start: ${DEFAULT_CONFIG.day_background_start};
    --day-mid: ${DEFAULT_CONFIG.day_background_mid};
    --day-end: ${DEFAULT_CONFIG.day_background_end};
    --night-start: ${DEFAULT_CONFIG.night_background_start};
    --night-mid: ${DEFAULT_CONFIG.night_background_mid};
    --night-end: ${DEFAULT_CONFIG.night_background_end};
    --shell-day-start: ${DEFAULT_CONFIG.shell_day_start};
    --shell-day-end: ${DEFAULT_CONFIG.shell_day_end};
    --shell-night-start: ${DEFAULT_CONFIG.shell_night_start};
    --shell-night-end: ${DEFAULT_CONFIG.shell_night_end};
    --title-size: ${DEFAULT_CONFIG.title_font_size}rem;
    --message-size: ${DEFAULT_CONFIG.message_font_size}rem;
    --burnin-x: 0px;
    --burnin-y: 0px;
    --motion-state: running;
    position: relative;
    display: grid;
    grid-template-columns: minmax(240px, 1fr) minmax(320px, 1.15fr);
    gap: 24px;
    align-items: stretch;
    height: 100%;
    min-height: 320px;
    padding: 28px;
    color: white;
    font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
  }

  .frame.no-motion {
    --motion-state: paused;
  }

  .frame.rest-mode {
    filter: brightness(0.9) saturate(0.9);
  }

  .frame.day {
    background:
      radial-gradient(circle at 20% 20%, rgba(255, 248, 194, 0.95), transparent 26%),
      radial-gradient(circle at 88% 15%, rgba(255, 189, 105, 0.35), transparent 24%),
      linear-gradient(160deg, var(--day-start) 0%, var(--day-mid) 45%, var(--day-end) 100%);
  }

  .frame.night {
    background:
      radial-gradient(circle at 25% 18%, rgba(122, 140, 255, 0.3), transparent 24%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08), transparent 14%),
      linear-gradient(160deg, var(--night-start) 0%, var(--night-mid) 52%, var(--night-end) 100%);
  }

  .panel {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 18px;
    border-radius: 28px;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  }

  .day .panel {
    background: rgba(255, 255, 255, 0.1);
    box-shadow:
      0 14px 34px rgba(91, 134, 87, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .panel-left {
    justify-content: space-between;
    gap: 24px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 10px 16px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.14);
  }

  .day .eyebrow {
    box-shadow: 0 8px 22px rgba(114, 153, 103, 0.16);
    text-shadow: 0 1px 2px rgba(88, 120, 82, 0.22);
  }

  .headline {
    margin: 14px 0 10px;
    font-size: clamp(1.8rem, 2.8vw, var(--title-size));
    line-height: 1.04;
    font-weight: 800;
  }

  .day .headline {
    text-shadow:
      0 3px 10px rgba(86, 118, 79, 0.18),
      0 1px 2px rgba(60, 92, 58, 0.16);
  }

  .subtext {
    margin: 0;
    max-width: 24ch;
    font-size: clamp(1rem, 1.3vw, var(--message-size));
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.86);
  }

  .day .subtext {
    text-shadow: 0 2px 8px rgba(83, 116, 75, 0.16);
  }

  .status-stack {
    display: grid;
    gap: 12px;
  }

  .media-card {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    padding: 12px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.12);
  }

  .day .media-card {
    box-shadow:
      0 12px 28px rgba(99, 139, 88, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .media-card.is-hidden {
    display: none;
  }

  .media-art {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    object-fit: cover;
    background:
      radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.18), transparent 40%),
      rgba(7, 17, 37, 0.3);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  }

  .media-body {
    min-width: 0;
    display: grid;
    gap: 7px;
  }

  .media-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
  }

  .media-copy {
    min-width: 0;
    display: grid;
    gap: 4px;
  }

  .media-title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .day .media-title,
  .day .media-subtitle {
    text-shadow: 0 1px 8px rgba(83, 116, 75, 0.14);
  }

  .media-subtitle {
    margin: 0;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.68);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .media-progress {
    position: relative;
    height: 6px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
  }

  .media-progress-bar {
    height: 100%;
    width: 0%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(182, 207, 255, 0.95) 100%);
    box-shadow: 0 0 12px rgba(190, 216, 255, 0.28);
  }

  .media-controls {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .media-controls.is-hidden {
    display: none;
  }

  .media-control {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.95);
    cursor: pointer;
    transition: background 140ms ease, transform 140ms ease;
  }

  .media-control:hover {
    background: rgba(255, 255, 255, 0.24);
    transform: translateY(-1px);
  }

  .media-control:active {
    transform: translateY(0);
  }

  .media-control svg {
    width: 15px;
    height: 15px;
    fill: currentColor;
  }

  .schedule {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .schedule.is-hidden {
    display: none;
  }

  .schedule-card {
    padding: 14px 16px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.12);
  }

  .day .schedule-card {
    box-shadow:
      0 12px 28px rgba(99, 139, 88, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .schedule-label {
    margin: 0 0 6px;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.76);
  }

  .schedule-value {
    margin: 0;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    font-weight: 800;
  }

  .day .schedule-label,
  .day .schedule-value {
    text-shadow: 0 2px 8px rgba(83, 116, 75, 0.14);
  }

  .clock-panel {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .clock-shell {
    position: relative;
    width: min(100%, 560px);
    aspect-ratio: 1.2 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    border-radius: 38% 42% 36% 34% / 34% 34% 42% 40%;
    box-shadow:
      0 24px 50px rgba(0, 0, 0, 0.18),
      inset 0 -10px 24px rgba(0, 0, 0, 0.12),
      inset 0 10px 18px rgba(255, 255, 255, 0.26);
    will-change: transform;
    animation: shellFloat 9s ease-in-out infinite alternate;
    animation-play-state: var(--motion-state);
  }

  .day .clock-shell {
    background:
      radial-gradient(circle at 30% 28%, var(--shell-day-start) 0%, #fff4b6 45%, var(--shell-day-end) 100%);
  }

  .night .clock-shell {
    background:
      radial-gradient(circle at 30% 28%, var(--shell-night-start) 0%, #dbe6ff 42%, var(--shell-night-end) 100%);
  }

  .clock-face {
    position: relative;
    display: grid;
    place-items: center;
    width: 76%;
    height: 68%;
    padding: 26px 20px;
    border-radius: 28px;
    transform: translate3d(var(--burnin-x), var(--burnin-y), 0);
    background:
      radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.06), transparent 40%),
      linear-gradient(180deg, rgba(16, 28, 49, 0.95) 0%, rgba(24, 38, 61, 0.98) 100%);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.08),
      inset 0 12px 18px rgba(255, 255, 255, 0.03),
      0 10px 30px rgba(0, 0, 0, 0.28);
    transition: transform 900ms ease, filter 600ms ease, opacity 600ms ease;
  }

  .frame.rest-mode .clock-face {
    filter: brightness(0.92);
  }

  .time {
    margin: 0;
    font-size: clamp(3rem, 6.8vw, 6rem);
    line-height: 1;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: #f7fbff;
    text-shadow: 0 0 18px rgba(193, 222, 255, 0.18);
  }

  .date {
    margin: 10px 0 0;
    font-size: clamp(1rem, 1.35vw, 1.15rem);
    color: rgba(231, 240, 255, 0.78);
    letter-spacing: 0.04em;
  }

  .frame.rest-mode .time,
  .frame.rest-mode .date {
    opacity: 0.92;
  }

  .schedule-inline {
    margin-top: 12px;
    font-size: 0.95rem;
    color: rgba(231, 240, 255, 0.68);
    letter-spacing: 0.03em;
  }

  .sun-wrap,
  .moon-wrap {
    position: absolute;
    right: 12%;
    top: 9%;
    width: 180px;
    height: 180px;
    will-change: transform;
    animation: skyBob 14s ease-in-out infinite alternate;
    animation-play-state: var(--motion-state);
  }

  .moon-wrap {
    animation-duration: 17s;
  }

  .frame.rest-mode .sun-wrap,
  .frame.rest-mode .moon-wrap,
  .frame.rest-mode .cloud,
  .frame.rest-mode .star,
  .frame.rest-mode .glow-star {
    opacity: 0.72;
  }

  .sun {
    position: absolute;
    inset: 28px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #fff9bf 0%, #ffcc3e 72%, #ff9e22 100%);
    box-shadow: 0 0 40px rgba(255, 194, 61, 0.45);
  }

  .sun-rays {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
      conic-gradient(from 0deg,
      rgba(255, 219, 87, 0.9) 0deg 10deg,
      transparent 10deg 30deg,
      rgba(255, 219, 87, 0.9) 30deg 40deg,
      transparent 40deg 60deg,
      rgba(255, 219, 87, 0.9) 60deg 70deg,
      transparent 70deg 90deg,
      rgba(255, 219, 87, 0.9) 90deg 100deg,
      transparent 100deg 120deg,
      rgba(255, 219, 87, 0.9) 120deg 130deg,
      transparent 130deg 150deg,
      rgba(255, 219, 87, 0.9) 150deg 160deg,
      transparent 160deg 180deg,
      rgba(255, 219, 87, 0.9) 180deg 190deg,
      transparent 190deg 210deg,
      rgba(255, 219, 87, 0.9) 210deg 220deg,
      transparent 220deg 240deg,
      rgba(255, 219, 87, 0.9) 240deg 250deg,
      transparent 250deg 270deg,
      rgba(255, 219, 87, 0.9) 270deg 280deg,
      transparent 280deg 300deg,
      rgba(255, 219, 87, 0.9) 300deg 310deg,
      transparent 310deg 330deg,
      rgba(255, 219, 87, 0.9) 330deg 340deg,
      transparent 340deg 360deg);
    filter: blur(1px);
    animation: spin 36s linear infinite;
    animation-play-state: var(--motion-state);
  }

  .moon {
    position: absolute;
    inset: 26px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #fbfdff 0%, #c6d4ff 68%, #9db2ff 100%);
    box-shadow: 0 0 30px rgba(179, 196, 255, 0.32);
  }

  .moon::after {
    content: "";
    position: absolute;
    inset: 2px 0 0 36px;
    border-radius: 50%;
    background: #1c2550;
  }

  .sky {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 32px;
    pointer-events: none;
  }

  .star {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 0 14px rgba(255, 255, 255, 0.82);
    will-change: transform, opacity;
    animation: twinkle 4.4s ease-in-out infinite alternate;
    animation-play-state: var(--motion-state);
  }

  .star-1 { top: 18%; left: 15%; animation-duration: 5.2s; }
  .star-2 { top: 32%; left: 26%; animation-duration: 4.8s; animation-delay: -1.6s; }
  .star-3 { top: 16%; left: 58%; animation-duration: 5.8s; animation-delay: -2.4s; }
  .star-4 { top: 36%; left: 72%; animation-duration: 6.4s; animation-delay: -0.8s; }

  .glow-star {
    position: absolute;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(198, 215, 255, 0.55) 45%, rgba(198, 215, 255, 0) 75%);
    filter: blur(0.2px);
    opacity: 0.42;
    will-change: opacity, transform;
    animation: glowPulse 7.5s ease-in-out infinite alternate;
    animation-play-state: var(--motion-state);
  }

  .glow-star-1 {
    top: 11%;
    left: 18%;
    width: 42px;
    height: 42px;
    animation-duration: 9s;
  }

  .glow-star-2 {
    top: 27%;
    left: 56%;
    width: 34px;
    height: 34px;
    animation-duration: 7.2s;
    animation-delay: -1.8s;
  }

  .glow-star-3 {
    top: 56%;
    left: 28%;
    width: 48px;
    height: 48px;
    animation-duration: 8.4s;
    animation-delay: -3.1s;
  }

  .cloud {
    position: absolute;
    height: 34px;
    border-radius: 999px;
    opacity: 0.9;
    will-change: transform;
    animation: cloudDrift 28s ease-in-out infinite alternate;
    animation-play-state: var(--motion-state);
  }

  .cloud::before,
  .cloud::after {
    content: "";
    position: absolute;
    border-radius: 50%;
  }

  .cloud-day {
    background: rgba(255, 255, 255, 0.82);
  }

  .cloud-day::before {
    width: 42px;
    height: 42px;
    left: 14px;
    bottom: 8px;
    background: rgba(255, 255, 255, 0.82);
  }

  .cloud-day::after {
    width: 56px;
    height: 56px;
    right: 14px;
    bottom: 8px;
    background: rgba(255, 255, 255, 0.82);
  }

  .cloud-night {
    background: rgba(188, 203, 244, 0.18);
  }

  .cloud-night::before {
    width: 42px;
    height: 42px;
    left: 14px;
    bottom: 8px;
    background: rgba(188, 203, 244, 0.18);
  }

  .cloud-night::after {
    width: 56px;
    height: 56px;
    right: 14px;
    bottom: 8px;
    background: rgba(188, 203, 244, 0.18);
  }

  .cloud-1 {
    width: 120px;
    left: 10%;
    bottom: 16%;
    animation-duration: 31s;
    animation-delay: -7s;
  }

  .cloud-2 {
    width: 150px;
    right: 14%;
    bottom: 28%;
    animation-duration: 38s;
    animation-delay: -12s;
  }

  .cloud-3 {
    width: 98px;
    right: 34%;
    bottom: 12%;
    animation-duration: 27s;
    animation-delay: -4s;
  }

  @keyframes shellFloat {
    from { transform: translate3d(0, 6px, 0) rotate(-0.6deg); }
    to { transform: translate3d(0, -6px, 0) rotate(0.6deg); }
  }

  @keyframes skyBob {
    0% { transform: translate3d(0, 2px, 0) rotate(-1deg); }
    50% { transform: translate3d(6px, 12px, 0) rotate(0.5deg); }
    100% { transform: translate3d(-4px, -4px, 0) rotate(1deg); }
  }

  @keyframes twinkle {
    0% { transform: scale(0.88); opacity: 0.38; }
    45% { transform: scale(1); opacity: 0.72; }
    100% { transform: scale(1.16); opacity: 1; }
  }

  @keyframes cloudDrift {
    0% { transform: translate3d(-8px, 0, 0); }
    50% { transform: translate3d(12px, -6px, 0); }
    100% { transform: translate3d(28px, 4px, 0); }
  }

  @keyframes glowPulse {
    0% { transform: scale(0.92); opacity: 0.18; }
    50% { transform: scale(1.03); opacity: 0.34; }
    100% { transform: scale(1.12); opacity: 0.52; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 1180px) {
    .frame {
      gap: 18px;
      padding: 22px;
      grid-template-columns: minmax(230px, 0.9fr) minmax(280px, 1.1fr);
    }

    .panel {
      padding: 16px;
    }

    .sun-wrap,
    .moon-wrap {
      top: 14px;
      right: 16px;
      width: 84px;
      height: 84px;
    }

    .cloud-2,
    .cloud-3 {
      opacity: 0.72;
    }
  }

  @media (max-width: 900px) {
    .frame {
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 20px;
    }

    .panel {
      padding: 16px;
    }

    .media-card {
      grid-template-columns: 48px minmax(0, 1fr);
    }

    .media-art {
      width: 48px;
      height: 48px;
    }

    .clock-shell {
      width: min(100%, 420px);
    }

    .sun-wrap,
    .moon-wrap {
      top: 12px;
      right: 14px;
      width: 72px;
      height: 72px;
    }

    .glow-star-2,
    .glow-star-3 {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .clock-face {
      width: 82%;
      height: 70%;
      padding: 22px 14px;
    }

    .time {
      font-size: clamp(2.5rem, 12vw, 4.2rem);
    }

    .date {
      font-size: 0.92rem;
    }
  }
`;

function withDefaults(config) {
  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

class KidsWakeUpClockCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("kids-wake-up-clock-card-editor");
  }

  static getStubConfig() {
    return {
      wake_time: "07:00",
      sleep_time: "18:00",
      title_awake: "Wake Up Time",
      title_sleep: "Sleep Time",
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._timer = null;
    this._now = new Date();
    this._mode = null;
    this._elements = {};
  }

  setConfig(config) {
    if (!config.wake_time || !config.sleep_time) {
      throw new Error("You need to define both wake_time and sleep_time.");
    }

    this._config = withDefaults(config);
    this._renderCard();
    this._syncTheme(true);
    this._updateClockText();
    this._startTicker();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) {
      return;
    }
    this._updateMediaTile();
    this._updateClockText();
  }

  connectedCallback() {
    this._startTicker();
  }

  disconnectedCallback() {
    this._stopTicker();
  }

  getCardSize() {
    return 8;
  }

  getLayoutOptions() {
    return {
      grid_rows: 8,
      grid_columns: 12,
      grid_min_rows: 6,
    };
  }

  _startTicker() {
    if (!this._config || this._timer) {
      return;
    }

    this._timer = window.setInterval(() => {
      this._now = new Date();
      this._syncTheme();
      this._updateClockText();
    }, 1000);
  }

  _stopTicker() {
    if (!this._timer) {
      return;
    }

    window.clearInterval(this._timer);
    this._timer = null;
  }

  _timeStringToMinutes(value) {
    const [hours, minutes] = String(value).split(":").map((part) => Number(part));
    return (hours * 60) + minutes;
  }

  _minutesNow() {
    return (this._now.getHours() * 60) + this._now.getMinutes();
  }

  _isNightMode() {
    const wakeMinutes = this._timeStringToMinutes(this._config.wake_time);
    const sleepMinutes = this._timeStringToMinutes(this._config.sleep_time);
    const currentMinutes = this._minutesNow();

    if (sleepMinutes === wakeMinutes) {
      return false;
    }

    if (sleepMinutes < wakeMinutes) {
      return currentMinutes >= sleepMinutes && currentMinutes < wakeMinutes;
    }

    return currentMinutes >= sleepMinutes || currentMinutes < wakeMinutes;
  }

  _formatTime(date) {
    return new Intl.DateTimeFormat(this._config.locale, {
      hour: "numeric",
      minute: "2-digit",
      second: this._config.show_seconds ? "2-digit" : undefined,
      hour12: this._config.hour12,
    }).format(date);
  }

  _formatDate(date) {
    return new Intl.DateTimeFormat(this._config.locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  _formatConfigTime(value) {
    const [hours, minutes] = String(value).split(":").map((part) => Number(part));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return value;
    }

    if (!this._config.hour12) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }

    const suffix = hours >= 12 ? "pm" : "am";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${String(minutes).padStart(2, "0")}${suffix}`;
  }

  _getMediaState() {
    const entityId = this._config.media_player_entity;
    if (!entityId || !this._hass?.states) {
      return null;
    }

    const stateObj = this._hass.states[entityId];
    if (!stateObj || stateObj.state !== "playing") {
      return null;
    }

    return stateObj;
  }

  _formatProgressTime(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
      return "";
    }

    const total = Math.floor(totalSeconds);
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  _getLiveMediaPosition(attrs) {
    const basePosition = Number(attrs.media_position ?? 0);
    const duration = Number(attrs.media_duration ?? 0);
    const updatedAtValue = attrs.media_position_updated_at;

    if (!Number.isFinite(basePosition)) {
      return 0;
    }

    if (!updatedAtValue) {
      return duration > 0 ? Math.min(basePosition, duration) : basePosition;
    }

    const updatedAt = new Date(updatedAtValue);
    const updatedAtMs = updatedAt.getTime();
    if (Number.isNaN(updatedAtMs)) {
      return duration > 0 ? Math.min(basePosition, duration) : basePosition;
    }

    const elapsedSeconds = Math.max(0, (this._now.getTime() - updatedAtMs) / 1000);
    const livePosition = basePosition + elapsedSeconds;

    if (duration > 0) {
      return Math.min(livePosition, duration);
    }

    return livePosition;
  }

  _getBurnInShift() {
    if (!this._config.burn_in_protection) {
      return { x: 0, y: 0 };
    }

    const shift = Number(this._config.burn_in_shift_px ?? 0);
    if (!Number.isFinite(shift) || shift <= 0) {
      return { x: 0, y: 0 };
    }

    const cycle = [
      { x: 0, y: 0 },
      { x: shift, y: 0 },
      { x: shift, y: -shift },
      { x: 0, y: -shift },
      { x: -shift, y: -shift },
      { x: -shift, y: 0 },
      { x: -shift, y: shift },
      { x: 0, y: shift },
      { x: shift, y: shift },
    ];

    const bucket = Math.floor(this._now.getTime() / (1000 * 60 * 5));
    return cycle[bucket % cycle.length];
  }

  _renderCard() {
    if (!this.shadowRoot || !this._config) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${CARD_STYLE}</style>
      <ha-card>
        <div class="frame">
          <div class="sky sky-night" data-sky="night" hidden>
            <div class="moon-wrap">
              <div class="moon"></div>
            </div>
            <div class="star star-1"></div>
            <div class="star star-2"></div>
            <div class="star star-3"></div>
            <div class="star star-4"></div>
            <div class="glow-star glow-star-1"></div>
            <div class="glow-star glow-star-2"></div>
            <div class="glow-star glow-star-3"></div>
            <div class="cloud cloud-night cloud-1"></div>
            <div class="cloud cloud-night cloud-2"></div>
          </div>

          <div class="sky sky-day" data-sky="day" hidden>
            <div class="sun-wrap">
              <div class="sun-rays"></div>
              <div class="sun"></div>
            </div>
            <div class="cloud cloud-day cloud-1"></div>
            <div class="cloud cloud-day cloud-2"></div>
            <div class="cloud cloud-day cloud-3"></div>
          </div>

          <section class="panel panel-left">
            <div>
              <div class="eyebrow" data-role="mode-label"></div>
              <h1 class="headline" data-role="headline"></h1>
              <p class="subtext" data-role="message"></p>
            </div>
            <div class="status-stack">
              <div class="media-card is-hidden" data-role="media-card">
                <img class="media-art" data-role="media-art" alt="">
                <div class="media-body">
                  <div class="media-header">
                    <div class="media-copy">
                      <p class="media-title" data-role="media-title"></p>
                      <p class="media-subtitle" data-role="media-subtitle"></p>
                    </div>
                    <div class="media-controls is-hidden" data-role="media-controls">
                      <button class="media-control" type="button" data-action="previous" aria-label="Previous track">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
                      </button>
                      <button class="media-control" type="button" data-action="play-pause" aria-label="Play or pause">
                        <svg viewBox="0 0 24 24" aria-hidden="true" data-icon="play"><path d="M8 5v14l11-7z"/></svg>
                        <svg viewBox="0 0 24 24" aria-hidden="true" data-icon="pause" hidden><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
                      </button>
                      <button class="media-control" type="button" data-action="next" aria-label="Next track">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>
                      </button>
                    </div>
                  </div>
                  <div class="media-progress">
                    <div class="media-progress-bar" data-role="media-progress"></div>
                  </div>
                </div>
              </div>

              <div class="schedule" data-role="schedule">
                <div class="schedule-card">
                  <p class="schedule-label">Sleep Time</p>
                  <p class="schedule-value" data-role="sleep-time"></p>
                </div>
                <div class="schedule-card">
                  <p class="schedule-label">Wake Time</p>
                  <p class="schedule-value" data-role="wake-time"></p>
                </div>
              </div>
            </div>
          </section>

          <section class="panel clock-panel">
            <div class="clock-shell">
              <div class="clock-face">
                <p class="time" data-role="time"></p>
                <p class="date" data-role="date"></p>
              </div>
            </div>
          </section>
        </div>
      </ha-card>
    `;

    this._elements = {
      frame: this.shadowRoot.querySelector(".frame"),
      skyDay: this.shadowRoot.querySelector('[data-sky="day"]'),
      skyNight: this.shadowRoot.querySelector('[data-sky="night"]'),
      modeLabel: this.shadowRoot.querySelector('[data-role="mode-label"]'),
      headline: this.shadowRoot.querySelector('[data-role="headline"]'),
      message: this.shadowRoot.querySelector('[data-role="message"]'),
      mediaCard: this.shadowRoot.querySelector('[data-role="media-card"]'),
      mediaArt: this.shadowRoot.querySelector('[data-role="media-art"]'),
      mediaTitle: this.shadowRoot.querySelector('[data-role="media-title"]'),
      mediaSubtitle: this.shadowRoot.querySelector('[data-role="media-subtitle"]'),
      mediaProgress: this.shadowRoot.querySelector('[data-role="media-progress"]'),
      mediaControls: this.shadowRoot.querySelector('[data-role="media-controls"]'),
      schedule: this.shadowRoot.querySelector('[data-role="schedule"]'),
      sleepTime: this.shadowRoot.querySelector('[data-role="sleep-time"]'),
      wakeTime: this.shadowRoot.querySelector('[data-role="wake-time"]'),
      time: this.shadowRoot.querySelector('[data-role="time"]'),
      date: this.shadowRoot.querySelector('[data-role="date"]'),
    };

    this.shadowRoot.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", (event) => this._handleMediaAction(event));
    });

    this._applyStaticConfig();
  }

  _applyStaticConfig() {
    const frame = this._elements.frame;
    if (!frame) {
      return;
    }

    frame.style.setProperty("--day-start", this._config.day_background_start);
    frame.style.setProperty("--day-mid", this._config.day_background_mid);
    frame.style.setProperty("--day-end", this._config.day_background_end);
    frame.style.setProperty("--night-start", this._config.night_background_start);
    frame.style.setProperty("--night-mid", this._config.night_background_mid);
    frame.style.setProperty("--night-end", this._config.night_background_end);
    frame.style.setProperty("--shell-day-start", this._config.shell_day_start);
    frame.style.setProperty("--shell-day-end", this._config.shell_day_end);
    frame.style.setProperty("--shell-night-start", this._config.shell_night_start);
    frame.style.setProperty("--shell-night-end", this._config.shell_night_end);
    frame.style.setProperty("--title-size", `${this._config.title_font_size}rem`);
    frame.style.setProperty("--message-size", `${this._config.message_font_size}rem`);
    const burnInShift = this._getBurnInShift();
    frame.style.setProperty("--burnin-x", `${burnInShift.x}px`);
    frame.style.setProperty("--burnin-y", `${burnInShift.y}px`);
    frame.classList.toggle("no-motion", !this._config.animate);

    this._elements.sleepTime.textContent = this._formatConfigTime(this._config.sleep_time);
    this._elements.wakeTime.textContent = this._formatConfigTime(this._config.wake_time);
    this._elements.schedule.classList.toggle("is-hidden", !this._config.show_schedule);
    this._elements.date.style.display = this._config.show_date ? "" : "none";
    this._updateMediaTile();
  }

  _syncTheme(force = false) {
    const isNight = this._isNightMode();
    const nextMode = isNight ? "night" : "day";

    if (!force && nextMode === this._mode) {
      return;
    }

    this._mode = nextMode;
    this._elements.frame.classList.toggle("night", isNight);
    this._elements.frame.classList.toggle("day", !isNight);
    this._elements.frame.classList.toggle("rest-mode", Boolean(isNight && this._config.night_burn_in_dimming));
    this._elements.skyNight.hidden = !isNight;
    this._elements.skyDay.hidden = isNight;
    this._elements.modeLabel.textContent = isNight ? this._config.night_label : this._config.day_label;
    this._elements.headline.textContent = isNight ? this._config.title_sleep : this._config.title_awake;
    this._elements.message.textContent = isNight ? this._config.sleep_message : this._config.awake_message;
  }

  _updateClockText() {
    if (!this._elements.time) {
      return;
    }

    this._elements.time.textContent = this._formatTime(this._now);
    this._elements.date.textContent = this._formatDate(this._now);
    const burnInShift = this._getBurnInShift();
    this._elements.frame.style.setProperty("--burnin-x", `${burnInShift.x}px`);
    this._elements.frame.style.setProperty("--burnin-y", `${burnInShift.y}px`);
    this._updateMediaTile();
  }

  _updateMediaTile() {
    if (!this._elements.mediaCard) {
      return;
    }

    const mediaState = this._getMediaState();
    if (!mediaState) {
      this._elements.mediaCard.classList.add("is-hidden");
      return;
    }

    const attrs = mediaState.attributes || {};
    const title = attrs.media_title || attrs.friendly_name || "Now Playing";
    const secondaryBase = attrs.media_artist || attrs.app_name || "Playing";
    const picture = attrs.entity_picture || "";
    const duration = Number(attrs.media_duration ?? 0);
    const position = this._getLiveMediaPosition(attrs);
    const progress = duration > 0 ? Math.min(100, Math.max(0, (position / duration) * 100)) : 0;
    const isPaused = mediaState.state === "paused";
    const secondary = duration > 0
      ? `${this._formatProgressTime(position)} / ${this._formatProgressTime(duration)}`
      : secondaryBase;

    this._elements.mediaCard.classList.remove("is-hidden");
    this._elements.mediaControls.classList.toggle("is-hidden", !this._config.show_media_controls);
    this._elements.mediaTitle.textContent = title;
    this._elements.mediaSubtitle.textContent = secondary;
    this._elements.mediaProgress.style.width = `${progress}%`;
    this._elements.mediaArt.alt = title;
    this._elements.mediaArt.src = picture;
    this._elements.mediaArt.style.visibility = picture ? "visible" : "hidden";
    const playIcon = this.shadowRoot.querySelector('[data-icon="play"]');
    const pauseIcon = this.shadowRoot.querySelector('[data-icon="pause"]');
    if (playIcon && pauseIcon) {
      playIcon.hidden = !isPaused;
      pauseIcon.hidden = isPaused;
    }
  }

  _handleMediaAction(event) {
    const action = event.currentTarget?.dataset?.action;
    const entityId = this._config.media_player_entity;
    if (!action || !entityId || !this._hass) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const serviceMap = {
      previous: "media_previous_track",
      "play-pause": "media_play_pause",
      next: "media_next_track",
    };

    const service = serviceMap[action];
    if (!service) {
      return;
    }

    this._hass.callService("media_player", service, {
      entity_id: entityId,
    });
  }
}

class KidsWakeUpClockCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = withDefaults({});
    this._initialized = false;
  }

  setConfig(config) {
    this._config = withDefaults(config);
    if (!this._initialized) {
      this._render();
      this._initialized = true;
    }
    this._syncValues();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .editor {
          display: grid;
          gap: 20px;
          padding: 12px 2px 4px;
          font-family: "Avenir Next", "Segoe UI", sans-serif;
        }

        .section {
          display: grid;
          gap: 14px;
          padding: 18px;
          border-radius: 20px;
          background: rgba(127, 127, 127, 0.08);
        }

        .section-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
          align-items: start;
        }

        label {
          display: grid;
          gap: 8px;
          min-width: 0;
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.35;
        }

        label > span:first-child {
          display: block;
          min-height: 1.4em;
        }

        input[type="text"],
        input[type="time"],
        input[type="number"] {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 46px;
          padding: 11px 13px;
          border: 1px solid rgba(127, 127, 127, 0.24);
          border-radius: 12px;
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color, #111);
          font: inherit;
          line-height: 1.2;
        }

        input[type="color"] {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 46px;
          padding: 3px;
          border: 1px solid rgba(127, 127, 127, 0.24);
          border-radius: 12px;
          background: var(--card-background-color, #fff);
        }

        .toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 46px;
          padding: 11px 13px;
          border: 1px solid rgba(127, 127, 127, 0.2);
          border-radius: 12px;
          background: var(--card-background-color, #fff);
        }

        .hint {
          margin: 0;
          color: var(--secondary-text-color, #666);
          font-size: 0.86rem;
          line-height: 1.4;
        }

        @media (max-width: 600px) {
          .editor {
            padding: 10px 0 2px;
          }

          .section {
            padding: 16px;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="editor">
        <section class="section">
          <h3 class="section-title">Schedule</h3>
          <div class="grid" data-section="schedule"></div>
        </section>

        <section class="section">
          <h3 class="section-title">Labels</h3>
          <div class="grid" data-section="labels"></div>
        </section>

        <section class="section">
          <h3 class="section-title">Display</h3>
          <div class="grid" data-section="display"></div>
        </section>

        <section class="section">
          <h3 class="section-title">Colors</h3>
          <div class="grid" data-section="colors"></div>
          <p class="hint">These colors drive the sky gradients and the glowing clock shell. You can leave them as-is for a softer default look.</p>
        </section>
      </div>
    `;

    this._buildSection("schedule", ["wake_time", "sleep_time"]);
    this._buildSection("labels", [
      "title_awake",
      "title_sleep",
      "title_font_size",
      "day_label",
      "night_label",
      "awake_message",
      "sleep_message",
      "message_font_size",
      "media_player_entity",
    ]);
    this._buildSection("display", [
      "locale",
      "hour12",
      "show_seconds",
      "show_date",
      "show_schedule",
      "animate",
      "show_media_controls",
      "burn_in_protection",
      "burn_in_shift_px",
      "night_burn_in_dimming",
    ]);
    this._buildSection("colors", [
      "day_background_start",
      "day_background_mid",
      "day_background_end",
      "night_background_start",
      "night_background_mid",
      "night_background_end",
      "shell_day_start",
      "shell_day_end",
      "shell_night_start",
      "shell_night_end",
    ]);
  }

  _buildSection(sectionName, fieldKeys) {
    const container = this.shadowRoot.querySelector(`[data-section="${sectionName}"]`);
    fieldKeys.forEach((key) => {
      const field = CONFIG_FIELDS.find((item) => item.key === key);
      if (!field) {
        return;
      }

      if (field.type === "boolean") {
        const wrapper = document.createElement("label");
        wrapper.innerHTML = `
          <span>${field.label}</span>
          <span class="toggle">
            <input data-field="${field.key}" type="checkbox">
          </span>
        `;
        container.appendChild(wrapper);
        return;
      }

      const wrapper = document.createElement("label");
      wrapper.innerHTML = `
        <span>${field.label}</span>
        <input
          data-field="${field.key}"
          type="${field.type}"
          ${field.min !== undefined ? `min="${field.min}"` : ""}
          ${field.max !== undefined ? `max="${field.max}"` : ""}
          ${field.step !== undefined ? `step="${field.step}"` : ""}
          ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
        >
      `;
      container.appendChild(wrapper);
    });

    container.addEventListener("input", (event) => this._handleValueChange(event));
    container.addEventListener("change", (event) => this._handleValueChange(event));
  }

  _syncValues() {
    CONFIG_FIELDS.forEach((field) => {
      const input = this.shadowRoot.querySelector(`[data-field="${field.key}"]`);
      if (!input) {
        return;
      }

      if (field.type === "boolean") {
        input.checked = Boolean(this._config[field.key]);
      } else {
        input.value = this._config[field.key] ?? "";
      }
    });
  }

  _handleValueChange(event) {
    const input = event.target;
    const key = input?.dataset?.field;
    if (!key) {
      return;
    }

    const field = CONFIG_FIELDS.find((item) => item.key === key);
    let value;
    if (field.type === "boolean") {
      value = input.checked;
    } else if (field.type === "number") {
      value = input.value === "" ? "" : Number(input.value);
    } else {
      value = input.value;
    }
    this._config = {
      ...this._config,
      [key]: value,
    };

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define("kids-wake-up-clock-card", KidsWakeUpClockCard);
customElements.define("kids-wake-up-clock-card-editor", KidsWakeUpClockCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "kids-wake-up-clock-card",
  name: "Kids Wake Up Clock",
  description: "A full-screen friendly wake/sleep clock card for kids rooms.",
});
