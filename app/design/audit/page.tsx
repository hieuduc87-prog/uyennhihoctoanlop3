"use client";

import { useState, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// AAA GAME STUDIO AUDIT TOOL — Full Production Readiness Suite
// 58 categories • 200+ checks • AI-powered fix recommendations
// ═══════════════════════════════════════════════════════════════

const SEVERITY = {
  blocker: { color: "#ff1744", bg: "rgba(255,23,68,0.1)", label: "BLOCKER", points: 10, icon: "🔴" },
  critical: { color: "#ff5252", bg: "rgba(255,82,82,0.08)", label: "CRITICAL", points: 7, icon: "🟠" },
  major: { color: "#ffab40", bg: "rgba(255,171,64,0.08)", label: "MAJOR", points: 4, icon: "🟡" },
  minor: { color: "#69f0ae", bg: "rgba(105,240,174,0.06)", label: "MINOR", points: 2, icon: "🟢" },
  cosmetic: { color: "#b0bec5", bg: "rgba(176,190,197,0.06)", label: "COSMETIC", points: 1, icon: "⚪" },
};

const STATUS: Record<string, { icon: string; color: string; label: string }> = {
  pending: { icon: "○", color: "#555", label: "Pending" },
  pass: { icon: "✓", color: "#00e676", label: "Pass" },
  fail: { icon: "✗", color: "#ff1744", label: "Fail" },
  warn: { icon: "!", color: "#ffab40", label: "Warning" },
  na: { icon: "—", color: "#555", label: "N/A" },
};

// ═══════════════════════════════════════════════
// AAA AUDIT CATEGORIES — 15 domains, 120+ checks
// ═══════════════════════════════════════════════
const CATEGORIES = [
  {
    id: "scoring",
    icon: "🏆",
    title: "Scoring & Reward Systems",
    domain: "Game Design",
    weight: 12,
    description: "Point calculations, combo systems, multipliers, leaderboards, achievements",
    checks: [
      { id: "sc01", label: "Score calculation is deterministic — same input always produces same output", severity: "blocker", fix: "Extract scoring into pure functions with unit tests. Use BigInt or fixed-point for large scores to avoid floating-point drift." },
      { id: "sc02", label: "Combo/multiplier system has clear cap & decay rules (no infinite loops)", severity: "critical", fix: "Define MAX_COMBO constant + decay timer. Add unit tests for edge cases: 0 combo, max combo, decay at boundary." },
      { id: "sc03", label: "Score overflow protection — handles values beyond Number.MAX_SAFE_INTEGER", severity: "critical", fix: "Use BigInt for score storage, or implement score formatting (1.2M, 3.4B). Add overflow test with Number.MAX_SAFE_INTEGER + 1." },
      { id: "sc04", label: "Leaderboard submissions are server-validated (anti-cheat)", severity: "blocker", fix: "Never trust client scores. Send replay data / action log to server, server recalculates score. Add HMAC signature + timestamp validation." },
      { id: "sc05", label: "Achievement unlock logic is event-driven, not polling-based", severity: "major", fix: "Implement EventEmitter/Observer pattern: game events → achievement checker. Avoid checking all achievements every frame." },
      { id: "sc06", label: "Reward distribution is atomic — no partial rewards on crash/disconnect", severity: "critical", fix: "Use transaction pattern: lock → validate → distribute → commit. Implement rollback on failure. Store pending rewards in persistent queue." },
      { id: "sc07", label: "Score display formatting handles all locales (1,000 vs 1.000 vs 1 000)", severity: "minor", fix: "Use Intl.NumberFormat(locale) for all displayed numbers. Never hardcode comma/period separators." },
      { id: "sc08", label: "Daily/weekly challenge reset timing is timezone-aware", severity: "major", fix: "Use server UTC time for all resets. Convert to local only for display. Test across timezone boundaries (UTC-12 to UTC+14)." },
      { id: "sc09", label: "XP/leveling curve is balanced — progression feels smooth, not grindy", severity: "major", fix: "Plot XP curve as graph. Common formula: XP(n) = base * (n^1.5). Playtest at level 1, 10, 50, max. Adjust based on average session time." },
      { id: "sc10", label: "Bonus/special event scoring modifiers stack correctly with base system", severity: "critical", fix: "Define modifier order: base → additive bonuses → multiplicative bonuses → cap. Document formula. Test: base(100) + bonus(50%) + event(2x) = 300, not 400." },
    ],
  },
  {
    id: "character",
    icon: "🧙",
    title: "Character & Avatar Systems",
    domain: "Game Design",
    weight: 10,
    description: "Character creation, stats, equipment, animation states, AI companions",
    checks: [
      { id: "ch01", label: "Character state machine is finite — all states & transitions documented", severity: "blocker", fix: "Create state diagram (idle→walk→run→jump→attack→hurt→death). Use XState or enum-based FSM. Every state must have exit path." },
      { id: "ch02", label: "Stats/attributes use integer math — no floating-point comparison bugs", severity: "critical", fix: "Store HP, ATK, DEF as integers. Multiply by 100 for pseudo-decimals (150 = 1.50x). Never compare floats with ===." },
      { id: "ch03", label: "Equipment/inventory system handles edge cases (full inventory, duplicate items)", severity: "critical", fix: "Validate: inventory full → show feedback, not silent fail. Duplicate equip → unequip first. Stack overflow → split to new slot." },
      { id: "ch04", label: "Character animations blend smoothly — no T-pose or snap transitions", severity: "major", fix: "Use animation blend trees with crossfade (0.1-0.3s). Add interrupt priority: death > hurt > attack > movement. Test rapid input switching." },
      { id: "ch05", label: "Stat modifiers (buffs/debuffs) stack, expire, and display correctly", severity: "critical", fix: "Implement modifier stack: {source, type: add|mult, value, duration, startTime}. Recalculate on add/remove/expire. Show active buffs in HUD." },
      { id: "ch06", label: "Character customization persists across sessions and syncs to server", severity: "major", fix: "Save customization as JSON schema {hair: id, color: hex, outfit: id}. Debounce saves. Sync on login + after each edit with conflict resolution." },
      { id: "ch07", label: "NPC/companion AI doesn't block player movement or doorways", severity: "major", fix: "Add NavMesh avoidance radius. Implement 'get out of way' behavior when player approaches. Teleport companion if stuck >5 seconds." },
      { id: "ch08", label: "Character collision box matches visual sprite/model (no phantom hits)", severity: "critical", fix: "Visualize hitboxes in debug mode. Separate hurt-box from hit-box. Test at all animation frames, especially attack wind-up/recovery." },
      { id: "ch09", label: "Level-up/evolution animations don't block gameplay input", severity: "major", fix: "Run level-up VFX in overlay layer. Queue input during animation. Allow skip with tap. Never pause game loop for cosmetic effects." },
      { id: "ch10", label: "Character data schema is versioned for backward compatibility", severity: "critical", fix: "Add version field: {v: 2, stats: {...}}. Write migration functions v1→v2→v3. Test loading old saves in new build." },
    ],
  },
  {
    id: "uiux",
    icon: "🎨",
    title: "UI/UX & Visual Polish",
    domain: "Presentation",
    weight: 11,
    description: "Layout, typography, animations, responsive design, visual feedback, accessibility",
    checks: [
      { id: "ui01", label: "All interactive elements have visual feedback (hover, press, disabled states)", severity: "critical", fix: "CSS: :hover (scale 1.05 + glow), :active (scale 0.95), :disabled (opacity 0.5 + no pointer). Minimum 3 states per button." },
      { id: "ui02", label: "Touch targets meet 48x48dp minimum (mobile-first)", severity: "blocker", fix: "Set min-width/height: 48px on all buttons and interactive elements. Use padding not margin for hit area. Test with finger-sized touch on mobile." },
      { id: "ui03", label: "Typography hierarchy is clear — max 2-3 font families, consistent scale", severity: "major", fix: "Define type scale: h1(32), h2(24), h3(18), body(14), caption(12). Use modular scale (1.25 ratio). Store in CSS variables." },
      { id: "ui04", label: "Loading states shown for ALL async operations (no blank screens)", severity: "critical", fix: "Create LoadingSpinner + Skeleton components. Wrap every fetch/async in loading state. Show progress % for large assets. Min display time: 300ms." },
      { id: "ui05", label: "Error states are user-friendly with recovery actions (retry, go back)", severity: "critical", fix: "Never show raw errors. Pattern: friendly message + icon + primary action (Retry) + secondary (Go Back). Log technical details to console." },
      { id: "ui06", label: "Animations respect prefers-reduced-motion media query", severity: "major", fix: "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }" },
      { id: "ui07", label: "UI scales correctly from 320px to 2560px without breaking", severity: "blocker", fix: "Use CSS clamp() for font sizes, minmax() for grids, aspect-ratio for game canvas. Test at 320, 375, 768, 1024, 1440, 2560." },
      { id: "ui08", label: "Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)", severity: "major", fix: "Audit with Chrome DevTools contrast checker. Use oklch() for perceptually uniform colors. Provide high-contrast theme option." },
      { id: "ui09", label: "Modals/popups trap focus and are dismissable by Escape key", severity: "major", fix: "Implement focus trap (first/last focusable element loop). Add onKeyDown Escape handler. Set aria-modal, role=dialog." },
      { id: "ui10", label: "No layout shifts during gameplay — CLS score < 0.1", severity: "critical", fix: "Reserve space for dynamic content (ads, scores, timers) with fixed dimensions. Use will-change for animated elements. Measure with Lighthouse." },
      { id: "ui11", label: "Screen transitions have consistent easing & timing (200-400ms)", severity: "minor", fix: "Define transition tokens: fast(150ms), normal(250ms), slow(400ms). Use cubic-bezier(0.4, 0, 0.2, 1) for standard easing. Apply consistently." },
      { id: "ui12", label: "HUD elements don't obscure critical gameplay area", severity: "critical", fix: "Define safe zones (top 15%, bottom 15% for HUD). Keep center 70% clear for gameplay. Add HUD opacity fade during intense action." },
    ],
  },
  {
    id: "monetization",
    icon: "💰",
    title: "Monetization & IAP",
    domain: "Business",
    weight: 8,
    description: "In-app purchases, ads, subscription models, receipt validation, store compliance",
    checks: [
      { id: "mo01", label: "All purchases are server-validated (receipt verification with App Store/Google Play)", severity: "blocker", fix: "Implement server-side receipt validation: Apple → verifyReceipt endpoint, Google → Google Play Developer API. Never trust client-side purchase confirmation." },
      { id: "mo02", label: "Purchase flow handles interruptions (app kill, network loss mid-transaction)", severity: "blocker", fix: "Implement pending purchase queue. On app launch, check for unfinished transactions. Use StoreKit2/Google Billing Client's built-in restoration." },
      { id: "mo03", label: "Restore purchases function works correctly for all product types", severity: "critical", fix: "Test restore for: consumables (should NOT restore), non-consumables (MUST restore), subscriptions (MUST restore with current status). Handle family sharing." },
      { id: "mo04", label: "Ad placements don't interrupt active gameplay (only at natural break points)", severity: "critical", fix: "Define ad slots: level complete, game over, main menu return. NEVER mid-gameplay. Implement interstitial frequency cap (max 1 per 3 minutes)." },
      { id: "mo05", label: "Premium currency is stored server-side with transaction log", severity: "blocker", fix: "Coins/gems NEVER stored client-only. Server maintains balance + full transaction history. Client balance is display-only cache, always synced from server." },
      { id: "mo06", label: "Subscription status checks handle grace period, billing retry, and cancellation", severity: "critical", fix: "Check subscription status on each app launch + periodically. Handle states: active, grace_period, billing_retry, expired, cancelled. Show appropriate UI for each." },
      { id: "mo07", label: "Loot box / gacha probabilities are disclosed and match actual rates", severity: "blocker", fix: "Display drop rates before purchase (legal requirement in many regions). Implement pity system. Server-side RNG. Log actual vs. disclosed rates for audit." },
      { id: "mo08", label: "Free-to-play economy is balanced — no paywall on core gameplay", severity: "major", fix: "Map player journey: identify every friction point. Core loop must be fully playable F2P. IAP accelerates, not gates. Test 100% F2P path to completion." },
    ],
  },
  {
    id: "performance",
    icon: "⚡",
    title: "Performance & Optimization",
    domain: "Engineering",
    weight: 12,
    description: "Frame rate, memory, load times, battery, network, bundle size",
    checks: [
      { id: "pf01", label: "Game maintains 60fps on target min-spec device", severity: "blocker", fix: "Profile on lowest target device. Use Performance.now() frame timing. Identify > 16.6ms frames. Common culprits: GC spikes, layout thrashing, shader complexity." },
      { id: "pf02", label: "Memory usage stays flat during gameplay — no leaks over 30min session", severity: "blocker", fix: "Chrome DevTools → Memory → Heap snapshots at 0, 10, 20, 30 min. Diff snapshots. Fix: remove event listeners, clear timers, null references, dispose textures." },
      { id: "pf03", label: "Initial load time < 3 seconds on 4G connection", severity: "critical", fix: "Measure with WebPageTest on 4G throttle. Code split: critical path < 200KB. Lazy load: level assets, audio, non-essential UI. Use loading screen for rest." },
      { id: "pf04", label: "Asset pipeline: images compressed (WebP), audio compressed (Opus/AAC), sprites atlased", severity: "critical", fix: "Build pipeline: sharp for WebP conversion (quality 80), FFmpeg for audio (128kbps AAC), TexturePacker for sprite sheets. Automate in CI." },
      { id: "pf05", label: "No DOM manipulation in game loop — use Canvas/WebGL or requestAnimationFrame only", severity: "blocker", fix: "Game rendering → Canvas 2D or WebGL. UI overlay → React with will-change. NEVER: document.getElementById in loop, style changes per frame, innerHTML updates." },
      { id: "pf06", label: "Object pooling for frequently created/destroyed entities (bullets, particles, enemies)", severity: "critical", fix: "Implement ObjectPool class: pre-allocate N objects, get() returns inactive, release() marks inactive. Avoid new/GC during gameplay. Pool size = 2x max concurrent." },
      { id: "pf07", label: "Network calls are batched and debounced — no per-frame API calls", severity: "critical", fix: "Batch: collect events for 1-5 seconds, send as array. Debounce: score updates, position sync. Use WebSocket for real-time, REST for async. Max 1 call/second." },
      { id: "pf08", label: "Battery drain is reasonable — CPU/GPU usage drops when game is paused/backgrounded", severity: "major", fix: "Pause game loop on visibilitychange hidden. Reduce RAF to 1fps or stop when paused. Disable GPS, gyroscope when not needed. Test: 1hr gameplay < 20% battery." },
      { id: "pf09", label: "Bundle size is optimized — tree shaking, dead code elimination, no duplicate deps", severity: "major", fix: "Analyze with webpack-bundle-analyzer. Remove unused lodash methods (use lodash-es). Deduplicate with npm dedupe. Target: < 500KB initial JS." },
      { id: "pf10", label: "Render pipeline has level-of-detail (LOD) or quality settings for low-end devices", severity: "major", fix: "Detect device capability (GPU, RAM, screen size). Offer quality presets: Low/Med/High. Reduce: particle count, shadow resolution, post-processing. Auto-adjust if fps drops." },
    ],
  },
  {
    id: "security",
    icon: "🔒",
    title: "Security & Anti-Cheat",
    domain: "Engineering",
    weight: 10,
    description: "Data protection, input validation, anti-tampering, authentication, encryption",
    checks: [
      { id: "se01", label: "No API keys, secrets, or tokens in client-side code (including env vars in build)", severity: "blocker", fix: "Audit: grep -r 'API_KEY\\|SECRET\\|TOKEN\\|password' src/. Move all secrets to server. Use proxy endpoints. Check .env is in .gitignore." },
      { id: "se02", label: "All user input sanitized — no XSS in player names, chat, custom content", severity: "blocker", fix: "Use DOMPurify for any user HTML. Escape special chars: < > & \" '. Validate: name max 20 chars, alphanumeric + limited symbols. CSP headers in production." },
      { id: "se03", label: "Game state validated server-side — client is untrusted render layer only", severity: "blocker", fix: "Architecture: client sends INPUTS (tap, swipe, direction). Server runs SIMULATION, sends RESULTS. Client renders. Never: client sends 'score: 999999'." },
      { id: "se04", label: "Authentication uses industry standard (OAuth2/OIDC) with secure token storage", severity: "critical", fix: "Use Auth0/Firebase Auth/Supabase Auth. Store tokens: httpOnly cookies (web), Keychain (iOS), EncryptedSharedPrefs (Android). Never localStorage for auth." },
      { id: "se05", label: "All network traffic is HTTPS — no mixed content, HSTS enabled", severity: "blocker", fix: "Force HTTPS redirects. Set HSTS header: max-age=31536000; includeSubDomains. Audit: no http:// URLs in code, assets, or API calls." },
      { id: "se06", label: "Rate limiting on all public endpoints (login, leaderboard, purchases, chat)", severity: "critical", fix: "Implement per-IP + per-user rate limits. Login: 5/min. Leaderboard submit: 1/min. Chat: 30/min. Return 429 with Retry-After header." },
      { id: "se07", label: "Dependencies audited — no known CVEs (npm audit / Snyk clean)", severity: "critical", fix: "Run npm audit in CI. Block merge on critical CVEs. Use Snyk or Socket for deeper analysis. Pin dependency versions. Review changelogs before major updates." },
      { id: "se08", label: "Replay attack protection — API requests include nonce + timestamp validation", severity: "major", fix: "Each request: {nonce: uuid(), timestamp: Date.now(), signature: HMAC(payload + nonce + timestamp, secret)}. Server rejects: duplicate nonce, timestamp > 30s old." },
      { id: "se09", label: "Player data encrypted at rest — PII and payment data protected", severity: "blocker", fix: "Encrypt PII fields in database (AES-256-GCM). Use separate encryption keys per data type. Never store raw credit card data — use Stripe/payment processor tokens." },
      { id: "se10", label: "Memory tampering protection — detect modified game values at runtime", severity: "major", fix: "Implement value checksums: store score + hash(score + salt). Validate on read. Obfuscate memory layout. Detect: speed hacks (compare server/client time), impossible states." },
    ],
  },
  {
    id: "architecture",
    icon: "🏗️",
    title: "Architecture & Code Quality",
    domain: "Engineering",
    weight: 10,
    description: "Project structure, patterns, modularity, type safety, documentation",
    checks: [
      { id: "ar01", label: "Clear folder structure: features/, shared/, assets/, config/, types/", severity: "critical", fix: "Reorganize: src/{features/[name]/{components,hooks,utils,types}, shared/{ui,hooks,utils}, assets/{images,audio,fonts}, config/, types/}. Each feature is self-contained." },
      { id: "ar02", label: "Zero circular dependencies between modules", severity: "blocker", fix: "Run madge --circular src/. Fix: extract shared code to shared/, use dependency injection, events instead of direct imports. Add madge check to CI." },
      { id: "ar03", label: "State management is predictable — single source of truth, unidirectional flow", severity: "critical", fix: "Use Zustand/Redux for global state. Pattern: Action → Store → UI. No bidirectional bindings. Game state separate from UI state. DevTools for state inspection." },
      { id: "ar04", label: "Game loop cleanly separated from React render cycle", severity: "blocker", fix: "Game engine runs in useRef/class with own RAF loop. React only renders UI overlay. Communication via: game.on('event') → setState. Never: setState in game loop." },
      { id: "ar05", label: "TypeScript strict mode — no any, no ts-ignore, strict null checks", severity: "critical", fix: "tsconfig: strict: true, noImplicitAny: true. Fix all errors. Use unknown instead of any, then narrow with type guards. Track: grep -c 'any\\|ts-ignore' **/*.ts." },
      { id: "ar06", label: "Config/constants externalized — no magic numbers in game logic", severity: "major", fix: "Create config/gameBalance.ts: export const GAME = { PLAYER: { SPEED: 5, JUMP_FORCE: 12 }, ENEMY: { SPAWN_RATE: 2 } }. Import everywhere. Easy to tune." },
      { id: "ar07", label: "Error boundaries wrap every major section with graceful fallback", severity: "critical", fix: "React ErrorBoundary around: GameCanvas, HUD, Shop, Settings, each major route. Fallback: 'Something went wrong' + Retry button. Log error to Sentry." },
      { id: "ar08", label: "API layer is abstracted — easy to swap backend/mock for testing", severity: "major", fix: "Create api/ layer with interfaces: IGameAPI { submitScore(), getLeaderboard() }. Implementations: RealAPI, MockAPI. Inject via context. Tests use MockAPI." },
    ],
  },
  {
    id: "audio",
    icon: "🔊",
    title: "Audio & Sound Design",
    domain: "Presentation",
    weight: 6,
    description: "Sound effects, music, volume controls, audio loading, spatial audio",
    checks: [
      { id: "au01", label: "Master/SFX/Music volume controls persist across sessions", severity: "critical", fix: "Store volumes in persistent storage. Load on init. UI: 3 sliders (Master, Music, SFX). Apply: masterVol * categoryVol. Persist on change with debounce." },
      { id: "au02", label: "Audio doesn't play before user interaction (browser autoplay policy)", severity: "blocker", fix: "Initialize AudioContext on first user tap/click. Show 'Tap to start' screen. Resume suspended context: audioCtx.resume(). Never autoplay on page load." },
      { id: "au03", label: "Sound effects pooled — rapid triggers don't create new Audio instances", severity: "critical", fix: "Pre-create AudioBuffer pool per SFX (5-10 instances). On play: grab idle instance, play, return to pool. Prevents memory leaks and audio glitches." },
      { id: "au04", label: "Music crossfades between tracks — no abrupt cuts", severity: "major", fix: "Implement AudioManager.crossfade(newTrack, duration=1000): fade out current (1s), fade in new (1s), overlap 500ms. Use GainNode for smooth volume transitions." },
      { id: "au05", label: "Audio resources properly disposed when scene/level unloads", severity: "major", fix: "On scene exit: stop all sounds, disconnect AudioNodes, release AudioBuffers for unneeded tracks. Keep globally-used SFX loaded. Monitor memory in DevTools." },
      { id: "au06", label: "Mute/unmute respects system silent mode (iOS ring/silent switch)", severity: "major", fix: "Check for iOS silent mode (play silent audio, detect no playback). Respect system volume. Add in-game mute button that overrides. Remember user preference." },
    ],
  },
  {
    id: "network",
    icon: "🌐",
    title: "Networking & Multiplayer",
    domain: "Engineering",
    weight: 7,
    description: "API design, sync, offline mode, connection handling, real-time communication",
    checks: [
      { id: "nw01", label: "Offline mode works — core gameplay functional without network", severity: "critical", fix: "Cache: game assets (Service Worker), game config (localStorage), player progress (IndexedDB). Queue actions offline, sync when online. Show offline indicator." },
      { id: "nw02", label: "Network loss handled gracefully — no crash, clear feedback to player", severity: "blocker", fix: "Detect: navigator.onLine + fetch timeout. On disconnect: pause multiplayer, show reconnecting UI, auto-retry with exponential backoff (1s, 2s, 4s, 8s, max 30s)." },
      { id: "nw03", label: "API responses cached appropriately — static data doesn't re-fetch every time", severity: "major", fix: "Cache layers: memory (LRU, 5min TTL), persistent (24hr). Cache: game config, asset URLs, player profile. Don't cache: leaderboards, live events. Use stale-while-revalidate." },
      { id: "nw04", label: "Save system uses conflict resolution — handles multiple device sync", severity: "critical", fix: "Implement last-write-wins with vector clocks, or merge strategy. On conflict: show player choice ('Keep local / Keep cloud / Merge'). Never silently overwrite." },
      { id: "nw05", label: "WebSocket connections have heartbeat + automatic reconnection", severity: "critical", fix: "Send ping every 30s. If no pong in 10s → reconnect. Reconnect with exponential backoff. Re-authenticate on reconnect. Buffer messages during reconnect." },
      { id: "nw06", label: "API versioning in place — old clients don't break with server updates", severity: "critical", fix: "URL versioning: /api/v1/scores. Check client version on login. If outdated: soft prompt to update (minor), force update (breaking). Deprecation notices 30 days ahead." },
    ],
  },
  {
    id: "data",
    icon: "💾",
    title: "Data & Persistence",
    domain: "Engineering",
    weight: 7,
    description: "Save systems, data migration, backup, GDPR, analytics, crash reporting",
    checks: [
      { id: "da01", label: "Save game data is validated on load — corrupted saves don't crash the game", severity: "blocker", fix: "Wrap save load in try/catch. Validate schema with Zod/Joi. On corruption: load last backup → show 'Save restored from backup' → if no backup, start fresh with warning." },
      { id: "da02", label: "Auto-save triggers at natural checkpoints — not mid-action", severity: "critical", fix: "Auto-save on: level complete, shop exit, inventory close, every 5 min idle. NEVER: mid-combat, during animation, while transaction pending. Show save icon briefly." },
      { id: "da03", label: "Data schema is versioned — migrations handle all previous versions", severity: "critical", fix: "Add version field: {_v: 3, data: {...}}. Migration chain: v1→v2→v3 (sequential). Test: load v1 save in v3 build. Store migration log." },
      { id: "da04", label: "GDPR/CCPA compliant — data export, deletion, consent management", severity: "blocker", fix: "Implement: consent dialog before data collection, data export API (JSON download), account deletion (hard delete within 30 days), privacy policy link in settings." },
      { id: "da05", label: "Analytics events are meaningful — no spam, proper taxonomy", severity: "major", fix: "Define event taxonomy: {category}_{action}_{label}. Essential events: session_start, level_complete, purchase_made, error_occurred. Max 50 event types. Review weekly." },
      { id: "da06", label: "Crash reporting captures useful context — device, state, steps to reproduce", severity: "critical", fix: "Use Sentry/Crashlytics. Attach: device info, OS version, game state snapshot, last 10 user actions (breadcrumbs), session duration. Set up alerts for new crash clusters." },
      { id: "da07", label: "Backup save exists — recoverable if primary save corrupts", severity: "critical", fix: "On every save: copy current → backup slot. Keep last 3 saves (current, backup, backup2). On corruption: try backup chain. Cloud backup daily." },
    ],
  },
  {
    id: "localization",
    icon: "🌍",
    title: "Localization & Internationalization",
    domain: "Presentation",
    weight: 5,
    description: "Multi-language support, RTL, cultural adaptation, date/number formats",
    checks: [
      { id: "lo01", label: "All user-facing strings externalized to translation files (no hardcoded text)", severity: "critical", fix: "Use i18next or similar. Extract ALL strings to locales/en.json. Key format: screen.element.text (e.g., 'shop.buy_button.label'). Lint for hardcoded strings in CI." },
      { id: "lo02", label: "UI accommodates text expansion (German ~30% longer than English)", severity: "major", fix: "Design for 40% text expansion. Use auto-sizing containers, text truncation with tooltip, scrollable text areas. Test with German/Russian pseudo-translation." },
      { id: "lo03", label: "RTL layout support for Arabic/Hebrew (mirrored UI, correct text alignment)", severity: "major", fix: "Use CSS logical properties: margin-inline-start not margin-left. dir='rtl' on root. Test: menu navigation, progress bars, swipe gestures all mirrored correctly." },
      { id: "lo04", label: "Date, time, number, and currency formats respect locale", severity: "major", fix: "Use Intl.DateTimeFormat, Intl.NumberFormat, Intl.RelativeTimeFormat. Never hardcode: MM/DD/YYYY, $, comma separators. Test with ja-JP, de-DE, ar-SA." },
      { id: "lo05", label: "Font supports all target language character sets (CJK, Cyrillic, Arabic)", severity: "critical", fix: "Use Noto Sans as fallback (covers all Unicode blocks). Load language-specific fonts on demand. Test: Japanese kanji, Russian Cyrillic, Arabic connected script." },
      { id: "lo06", label: "Pluralization rules handle all target languages (not just +s)", severity: "minor", fix: "Use ICU MessageFormat or i18next plurals. Categories: zero, one, two, few, many, other. Arabic has 6 plural forms. Never: count + 's' for plural." },
    ],
  },
  {
    id: "accessibility",
    icon: "♿",
    title: "Accessibility (a11y)",
    domain: "Presentation",
    weight: 5,
    description: "Screen readers, color blindness, motor impairments, cognitive accessibility",
    checks: [
      { id: "ac01", label: "Game is playable with screen reader — proper ARIA labels on all controls", severity: "critical", fix: "Add aria-label to all buttons, aria-live for dynamic content (score, timer). Screen reader announces: game state changes, turn results, menus. Test with VoiceOver/TalkBack." },
      { id: "ac02", label: "Color-blind modes available — not relying on color alone for info", severity: "critical", fix: "Add shapes/icons alongside colors (✓/✗, not just green/red). Implement deuteranopia, protanopia, tritanopia filters. Use colorblind-safe palette (viridis, cividis)." },
      { id: "ac03", label: "Keyboard/controller fully navigable — no mouse/touch-only interactions", severity: "critical", fix: "All game actions mappable to keyboard. Tab order logical. Focus visible on all elements. Enter/Space activate buttons. Arrow keys for grid navigation." },
      { id: "ac04", label: "Text size adjustable — supports system font scaling up to 200%", severity: "major", fix: "Use rem units, not px. Respect user's browser font-size setting. Add in-game text size slider (0.8x to 2x). Reflow layout at large sizes — no horizontal scroll." },
      { id: "ac05", label: "Subtitles/captions for all audio — including SFX descriptions", severity: "major", fix: "Subtitle system: {speaker, text, timing}. Options: size, background opacity, position. SFX descriptions: [explosion], [footsteps approaching]. Always on by default." },
      { id: "ac06", label: "No gameplay-critical rapid flashing (epilepsy safety — max 3 flashes/sec)", severity: "blocker", fix: "Audit all VFX: explosions, screen shake, strobe effects. Max 3 flashes per second. Add 'Reduce flashing' option. Replace critical flashes with sustained glow." },
    ],
  },
  {
    id: "testing",
    icon: "🧪",
    title: "Testing & QA",
    domain: "Engineering",
    weight: 5,
    description: "Unit tests, integration tests, E2E, visual regression, load testing",
    checks: [
      { id: "te01", label: "Core game logic has >90% unit test coverage", severity: "critical", fix: "Test: scoring, collision, state machines, inventory, progression. Use Jest + fast-check for property-based testing. Mock: time, random, network. Run in <30s." },
      { id: "te02", label: "Critical user flows have E2E tests (start game, play, score, purchase)", severity: "critical", fix: "Playwright/Cypress tests for: new user → tutorial → gameplay → score → leaderboard. Purchase flow → receipt → reward. Run nightly on staging." },
      { id: "te03", label: "Visual regression testing catches UI breakage", severity: "major", fix: "Use Chromatic/Percy for screenshot comparison. Capture: all screens, all states (loading, error, empty, full). Review diffs on every PR. 0.1% threshold." },
      { id: "te04", label: "Load/stress testing for backend — handles 10x expected concurrent users", severity: "critical", fix: "k6/Artillery load tests: simulate 10x peak users. Test: leaderboard writes, matchmaking, purchase validation. Target: p99 < 500ms at 10x load. Run weekly." },
      { id: "te05", label: "CI/CD pipeline runs all tests — no merge without green checks", severity: "blocker", fix: "GitHub Actions: lint → type-check → unit tests → build → E2E. Block merge on failure. Deploy to staging on merge to main. Manual promote to production." },
      { id: "te06", label: "Device matrix testing — verified on min-spec and flagship devices", severity: "critical", fix: "Test matrix: iOS 15+ (iPhone SE, iPhone 15), Android 11+ (low-end: Redmi, flagship: Samsung S24), Browsers: Chrome, Safari, Firefox. Use BrowserStack for coverage." },
    ],
  },
  {
    id: "devops",
    icon: "🚀",
    title: "DevOps & Release",
    domain: "Operations",
    weight: 5,
    description: "CI/CD, feature flags, rollback, monitoring, incident response",
    checks: [
      { id: "do01", label: "Feature flags control all new features — instant kill switch", severity: "critical", fix: "Use LaunchDarkly/Unleash/custom flags. Every new feature wrapped: if (flags.newShop) { ... }. Dashboard for instant toggle. Percentage rollout support." },
      { id: "do02", label: "Rollback plan documented and tested — can revert within 5 minutes", severity: "blocker", fix: "Keep last 3 deployments ready. Rollback script: one command. Database migrations reversible. Test rollback monthly. Document: who triggers, how, notification channels." },
      { id: "do03", label: "Health monitoring with alerts — uptime, error rate, latency dashboards", severity: "critical", fix: "Monitor: API p50/p95/p99 latency, error rate, active users, purchase success rate. Alert thresholds: error rate > 5%, p99 > 2s, purchases failing > 1%. PagerDuty/Opsgenie." },
      { id: "do04", label: "Blue-green or canary deployment — no big-bang releases", severity: "major", fix: "Deploy to 5% of users first (canary). Monitor for 1 hour. If error rate stable → 25% → 50% → 100%. Auto-rollback if error rate spikes 2x baseline." },
      { id: "do05", label: "Environment parity — staging mirrors production config and data shape", severity: "critical", fix: "Staging: same infra (smaller scale), same config (different secrets), anonymized production data snapshot. Test every release on staging before production." },
      { id: "do06", label: "Incident response runbook exists with escalation paths", severity: "critical", fix: "Document: detection → triage (P1-P4) → response → communication → resolution → postmortem. Contacts: on-call rotation, escalation (Lead → CTO). Review quarterly." },
    ],
  },
  {
    id: "platform",
    icon: "📱",
    title: "Platform & Store Compliance",
    domain: "Operations",
    weight: 4,
    description: "App Store / Google Play guidelines, web standards, platform-specific requirements",
    checks: [
      { id: "pl01", label: "App Store Review Guidelines compliance (Apple 4.0 Design, 3.1.1 IAP)", severity: "blocker", fix: "Checklist: all digital goods via Apple IAP (3.1.1), no references to other platforms, proper age rating, privacy nutrition label accurate, no private API usage." },
      { id: "pl02", label: "Google Play policy compliance (Families policy if targeting children)", severity: "blocker", fix: "If targeting <13: COPPA compliant, no personalized ads, no data collection, teacher-approved content. Families policy: certified ad SDKs only, neutral age screen." },
      { id: "pl03", label: "Privacy policy accessible in-app and in store listing", severity: "blocker", fix: "Privacy policy URL in: app settings, store listing, website. Content: what data collected, how used, third parties, retention, deletion rights. Update when practices change." },
      { id: "pl04", label: "App handles all device orientations or properly locks orientation", severity: "major", fix: "Either: support portrait + landscape with adaptive layout, OR lock orientation in manifest/plist and handle gracefully. Test rotation during gameplay, modals, and loading." },
      { id: "pl05", label: "Deep links / universal links work for sharing and re-engagement", severity: "major", fix: "Configure: apple-app-site-association (iOS), assetlinks.json (Android). Handle: shared game invites, daily challenge links, promo codes. Fallback to web/store if app not installed." },
      { id: "pl06", label: "App size optimized for store limits and user patience (<150MB initial)", severity: "major", fix: "Initial download <150MB. Use On-Demand Resources (iOS) / Play Asset Delivery (Android) for large assets. Compress: textures (ASTC), audio (opus), remove unused assets." },
    ],
  },
];

const DOMAINS = [...new Set(CATEGORIES.map(c => c.domain))];
const TOTAL_CHECKS = CATEGORIES.reduce((s, c) => s + c.checks.length, 0);

function getGrade(score: number) {
  if (score >= 95) return { grade: "S+", color: "#00e676", glow: "0 0 30px rgba(0,230,118,0.4)", label: "SHIP IT", sublabel: "AAA Certified" };
  if (score >= 88) return { grade: "S", color: "#00e676", glow: "0 0 20px rgba(0,230,118,0.3)", label: "EXCELLENT", sublabel: "Production Ready" };
  if (score >= 80) return { grade: "A", color: "#69f0ae", glow: "0 0 15px rgba(105,240,174,0.2)", label: "SOLID", sublabel: "Minor Polish Needed" };
  if (score >= 70) return { grade: "B", color: "#40c4ff", glow: "0 0 15px rgba(64,196,255,0.2)", label: "GOOD", sublabel: "Some Issues" };
  if (score >= 55) return { grade: "C", color: "#ffab40", glow: "0 0 15px rgba(255,171,64,0.2)", label: "FAIR", sublabel: "Needs Work" };
  if (score >= 35) return { grade: "D", color: "#ff6e40", glow: "0 0 15px rgba(255,110,64,0.2)", label: "POOR", sublabel: "Major Refactoring" };
  return { grade: "F", color: "#ff1744", glow: "0 0 20px rgba(255,23,68,0.3)", label: "FAIL", sublabel: "Do Not Release" };
}

// ═══════════════════════
// COMPONENTS
// ═══════════════════════

function GradeRing({ score, size = 180 }: { score: number; size?: number }) {
  const r = (size - 20) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const g = getGrade(score);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={g.color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1), stroke 0.5s", filter: `drop-shadow(${g.glow})` }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size * 0.28, fontWeight: 900, color: g.color, lineHeight: 1, letterSpacing: "-0.02em" }}>{g.grade}</div>
        <div style={{ fontSize: size * 0.085, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{score}%</div>
        <div style={{ fontSize: size * 0.065, color: g.color, marginTop: 2, fontWeight: 700, opacity: 0.7 }}>{g.label}</div>
      </div>
    </div>
  );
}

function ProgressBar({ value, max, color = "#69f0ae", height = 4 }: { value: number; max: number; color?: string; height?: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ height, borderRadius: height / 2, background: "rgba(255,255,255,0.04)", overflow: "hidden", width: "100%" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: height / 2, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function StatusDot({ status, onClick, size = 30 }: { status: string; onClick: () => void; size?: number }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 6, border: `1.5px solid ${status !== "pending" ? s.color : "rgba(255,255,255,0.1)"}`,
      background: status !== "pending" ? `${s.color}18` : "transparent", cursor: "pointer", fontSize: size * 0.5,
      display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontWeight: 700,
      transition: "all 0.15s", fontFamily: "inherit",
    }}>{s.icon}</button>
  );
}

function Badge({ text, color, bg }: { text: string; color: string; bg: string }) {
  return <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, color, background: bg, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{text}</span>;
}

function AISuggestionBox({ suggestion, loading }: { suggestion: Record<string, string> | null; loading: boolean }) {
  if (loading) return (
    <div style={{ padding: 14, borderRadius: 8, border: "1px dashed rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.05)", marginTop: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 16, height: 16, border: "2px solid #7c3aed", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <span style={{ fontSize: 11, color: "#a78bfa" }}>Analyzing & generating fix plan...</span>
      </div>
    </div>
  );
  if (!suggestion) return null;
  return (
    <div style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.04)", marginTop: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#a78bfa", marginBottom: 8, letterSpacing: "0.08em" }}>🤖 AI FIX RECOMMENDATION</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginBottom: 8, lineHeight: 1.5 }}>{suggestion.summary}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{suggestion.steps}</div>
      {suggestion.code && (
        <pre style={{ margin: "10px 0 0", padding: 10, borderRadius: 6, background: "rgba(0,0,0,0.4)", fontSize: 10, color: "#69f0ae", overflow: "auto", border: "1px solid rgba(105,240,174,0.1)" }}>{suggestion.code}</pre>
      )}
      <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10 }}>
        <span style={{ color: "rgba(255,255,255,0.35)" }}>Priority: <strong style={{ color: suggestion.priority === "P0" ? "#ff1744" : suggestion.priority === "P1" ? "#ff6e40" : "#ffab40" }}>{suggestion.priority}</strong></span>
        <span style={{ color: "rgba(255,255,255,0.35)" }}>Effort: <strong style={{ color: "#40c4ff" }}>{suggestion.effort}</strong></span>
      </div>
    </div>
  );
}

// ═══════════════════════
// MAIN APP
// ═══════════════════════
export default function AAAGameAudit() {
  const [projectName, setProjectName] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);
  const [filterDomain, setFilterDomain] = useState("All");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState("audit");
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<Record<string, Record<string, string>>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showFixPlan, setShowFixPlan] = useState(false);
  const [fixPlan, setFixPlan] = useState<Record<string, unknown> | null>(null);
  const [fixPlanLoading, setFixPlanLoading] = useState(false);

  const setStatus = useCallback((id: string, val: string) => setResults(p => ({ ...p, [id]: val })), []);

  // Scoring
  const catScores = useMemo(() => {
    const map: Record<string, { score: number; pass: number; fail: number; warn: number; na: number; pending: number; total: number }> = {};
    CATEGORIES.forEach(cat => {
      let max = 0, earned = 0;
      const counts = { pass: 0, fail: 0, warn: 0, na: 0, pending: 0 };
      cat.checks.forEach(ch => {
        const pts = SEVERITY[ch.severity as keyof typeof SEVERITY].points;
        const st = results[ch.id];
        if (!st || st === "pending") { counts.pending++; max += pts; }
        else if (st === "na") { counts.na++; }
        else { max += pts; if (st === "pass") { earned += pts; counts.pass++; } else if (st === "warn") { earned += pts * 0.6; counts.warn++; } else { counts.fail++; } }
      });
      map[cat.id] = { score: max > 0 ? Math.round((earned / max) * 100) : 0, ...counts, total: cat.checks.length };
    });
    return map;
  }, [results]);

  const overallScore = useMemo(() => {
    let tw = 0, ts = 0;
    CATEGORIES.forEach(cat => {
      const cs = catScores[cat.id];
      const answered = cs.total - cs.na - cs.pending;
      if (answered > 0) { tw += cat.weight; ts += cs.score * cat.weight; }
    });
    return tw > 0 ? Math.round(ts / tw) : 0;
  }, [catScores]);

  const totalAnswered = useMemo(() => Object.values(results).filter(v => v && v !== "pending").length, [results]);
  const blockerFails = useMemo(() => CATEGORIES.flatMap(c => c.checks).filter(ch => ch.severity === "blocker" && results[ch.id] === "fail"), [results]);
  const criticalFails = useMemo(() => CATEGORIES.flatMap(c => c.checks).filter(ch => ch.severity === "critical" && results[ch.id] === "fail"), [results]);
  const allFails = useMemo(() => CATEGORIES.flatMap(c => c.checks).filter(ch => results[ch.id] === "fail"), [results]);

  // Filtered categories
  const filteredCats = useMemo(() => {
    let cats = CATEGORIES;
    if (filterDomain !== "All") cats = cats.filter(c => c.domain === filterDomain);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cats = cats.map(c => ({
        ...c,
        checks: c.checks.filter(ch => ch.label.toLowerCase().includes(q) || ch.id.toLowerCase().includes(q)),
      })).filter(c => c.checks.length > 0);
    }
    if (filterStatus !== "all") {
      cats = cats.map(c => ({
        ...c,
        checks: c.checks.filter(ch => {
          const st = results[ch.id] || "pending";
          return filterStatus === "pending" ? st === "pending" : st === filterStatus;
        }),
      })).filter(c => c.checks.length > 0);
    }
    return cats;
  }, [filterDomain, filterStatus, searchQuery, results]);

  // AI suggestion for individual check
  const getAI = async (check: { id: string; label: string; severity: string; fix: string }) => {
    setAiLoading(check.id);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `You are a AAA game studio CTO. A critical audit check FAILED:\n\nCheck: ${check.label}\nSeverity: ${check.severity}\nBuilt-in fix guide: ${check.fix}\n${notes[check.id] ? `Auditor notes: ${notes[check.id]}` : ""}\n\nRespond ONLY with JSON (no markdown, no backticks):\n{"summary":"1-2 sentence diagnosis","steps":"Step-by-step fix (numbered, each under 80 chars)","code":"Short code example if helpful (under 8 lines) or empty string","priority":"P0|P1|P2","effort":"1h|4h|1d|3d|1w"}` }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((i: { text?: string }) => i.text || "").join("") || "";
      setAiResults(p => ({ ...p, [check.id]: JSON.parse(text.replace(/```json|```/g, "").trim()) }));
    } catch { setAiResults(p => ({ ...p, [check.id]: { summary: "Analysis failed — review manually", steps: check.fix, code: "", priority: "P1", effort: "4h" } })); }
    setAiLoading(null);
  };

  // AI full project fix plan
  const generateFixPlan = async () => {
    if (allFails.length === 0) return;
    setFixPlanLoading(true);
    setShowFixPlan(true);
    try {
      const failList = allFails.map(ch => {
        const cat = CATEGORIES.find(c => c.checks.some(x => x.id === ch.id));
        return `[${ch.severity.toUpperCase()}] ${cat?.title} → ${ch.label}`;
      }).join("\n");

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 4000,
          messages: [{ role: "user", content: `You are a AAA game studio CTO creating an emergency fix plan. Project: "${projectName || 'Game App'}"\n\nFAILED CHECKS (${allFails.length} total):\n${failList}\n\nCreate a comprehensive fix plan. Respond ONLY with JSON (no markdown):\n{"executive_summary":"2-3 sentence overview of the situation","risk_level":"CRITICAL|HIGH|MEDIUM","sprints":[{"name":"Sprint name","duration":"e.g. 3 days","priority":"P0|P1|P2","tasks":[{"check":"Which check this fixes","task":"What to do","owner_role":"e.g. Senior Dev, QA Lead","effort":"e.g. 4h, 1d"}]}],"quick_wins":[{"task":"Quick fix description","impact":"HIGH|MEDIUM","effort":"under 2h"}],"total_estimate":"e.g. 2-3 weeks"}` }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((i: { text?: string }) => i.text || "").join("") || "";
      setFixPlan(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setFixPlan({ executive_summary: "Could not generate plan automatically. Review failures manually.", risk_level: "HIGH", sprints: [], quick_wins: [], total_estimate: "TBD" }); }
    setFixPlanLoading(false);
  };

  // Report markdown
  const genReport = () => {
    let md = `# 🎮 AAA GAME AUDIT REPORT\n\n`;
    md += `**Project:** ${projectName || "Unnamed"} | **Date:** ${new Date().toLocaleDateString()} | **Score:** ${overallScore}% (${getGrade(overallScore).grade})\n`;
    md += `**Checks:** ${totalAnswered}/${TOTAL_CHECKS} completed | **Blockers:** ${blockerFails.length} | **Critical Fails:** ${criticalFails.length} | **Total Fails:** ${allFails.length}\n\n---\n\n`;
    CATEGORIES.forEach(cat => {
      const cs = catScores[cat.id];
      md += `## ${cat.icon} ${cat.title} — ${cs.score}% (${cs.pass}✓ ${cs.fail}✗ ${cs.warn}! ${cs.pending}○)\n\n`;
      cat.checks.forEach(ch => {
        const st = results[ch.id] || "pending";
        const ico = STATUS[st]?.icon || "○";
        md += `- ${ico} **[${ch.severity.toUpperCase()}]** ${ch.label}\n`;
        if (st === "fail") md += `  📋 Fix: ${ch.fix}\n`;
        if (notes[ch.id]) md += `  📝 Note: ${notes[ch.id]}\n`;
      });
      md += "\n";
    });
    return md;
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
    @keyframes spin { to { transform: rotate(360deg) } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
    @keyframes pulseGlow { 0%,100% { opacity: 0.3 } 50% { opacity: 0.6 } }
    .aaa-audit * { box-sizing: border-box; }
    .aaa-audit ::-webkit-scrollbar { width: 6px; height: 6px; }
    .aaa-audit ::-webkit-scrollbar-track { background: transparent; }
    .aaa-audit ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
    .aaa-audit input, .aaa-audit textarea, .aaa-audit select { font-family: 'DM Mono', monospace; }
    .check-row:hover { background: rgba(255,255,255,0.02) !important; }
    .cat-header:hover { background: rgba(255,255,255,0.02) !important; }
    .filter-btn { transition: all 0.15s; cursor: pointer; }
    .filter-btn:hover { background: rgba(255,255,255,0.06) !important; }
  `;

  return (
    <div className="aaa-audit" style={{ fontFamily: "'Outfit', sans-serif", background: "#08080e", color: "#ddd", minHeight: "100vh" }}>
      <style>{css}</style>

      {/* Ambient BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-30%", right: "-15%", width: 800, height: 800, background: "radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 60%)", animation: "pulseGlow 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 600, height: 600, background: "radial-gradient(ellipse, rgba(0,230,118,0.03) 0%, transparent 60%)", animation: "pulseGlow 10s ease-in-out infinite 2s" }} />
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.003) 2px, rgba(255,255,255,0.003) 4px)", pointerEvents: "none" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "20px 16px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #00e676)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎮</div>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
                  <span style={{ color: "#fff" }}>AAA</span>{" "}
                  <span style={{ background: "linear-gradient(135deg, #7c3aed, #00e676)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>GAME AUDIT</span>
                </h1>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", margin: 0, fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em" }}>
                  {CATEGORIES.length} DOMAINS • {TOTAL_CHECKS} CHECKS • AI-POWERED FIX PLANS
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["audit", "report"].map(v => (
              <button key={v} onClick={() => setView(v)} className="filter-btn" style={{
                padding: "7px 16px", borderRadius: 6, border: "1px solid",
                borderColor: view === v ? "#7c3aed" : "rgba(255,255,255,0.08)",
                background: view === v ? "rgba(124,58,237,0.12)" : "transparent",
                color: view === v ? "#c4b5fd" : "rgba(255,255,255,0.35)",
                fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
              }}>{v}</button>
            ))}
          </div>
        </div>

        {/* Project Name */}
        <input placeholder="🎯 Project name..." value={projectName} onChange={e => setProjectName(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 16, outline: "none" }} />

        {view === "audit" ? (
          <>
            {/* DASHBOARD */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, marginBottom: 20, padding: 20, borderRadius: 14, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <GradeRing score={overallScore} size={170} />

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 5, minWidth: 0 }}>
                {CATEGORIES.map(cat => {
                  const cs = catScores[cat.id];
                  const scoreColor = cs.score >= 80 ? "#69f0ae" : cs.score >= 60 ? "#ffab40" : "#ff5252";
                  return (
                    <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
                      onClick={() => setExpanded(p => ({ ...p, [cat.id]: !p[cat.id] }))}>
                      <span style={{ fontSize: 13, width: 18, textAlign: "center", flexShrink: 0 }}>{cat.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}><ProgressBar value={cs.score} max={100} color={scoreColor} height={5} /></div>
                      <span style={{ fontSize: 10, color: scoreColor, fontWeight: 700, fontFamily: "'DM Mono', monospace", width: 32, textAlign: "right", flexShrink: 0 }}>{cs.score}%</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, paddingLeft: 16, borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Progress</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{totalAnswered}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>/{TOTAL_CHECKS}</span></div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Blockers</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: blockerFails.length > 0 ? "#ff1744" : "#69f0ae" }}>{blockerFails.length}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Fails</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: allFails.length > 0 ? "#ff5252" : "#69f0ae" }}>{allFails.length}</div>
              </div>
            </div>

            {/* FILTERS */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <input placeholder="🔍 Search checks..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ flex: "1 1 200px", padding: "7px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#ddd", fontSize: 12, outline: "none", fontFamily: "'DM Mono', monospace" }} />
              <div style={{ display: "flex", gap: 3 }}>
                {["All", ...DOMAINS].map(d => (
                  <button key={d} onClick={() => setFilterDomain(d)} className="filter-btn" style={{
                    padding: "5px 10px", borderRadius: 5, border: "1px solid",
                    borderColor: filterDomain === d ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)",
                    background: filterDomain === d ? "rgba(124,58,237,0.1)" : "transparent",
                    color: filterDomain === d ? "#c4b5fd" : "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "inherit", fontWeight: 600,
                  }}>{d}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[{ v: "all", l: "All" }, { v: "pending", l: "○ Todo" }, { v: "fail", l: "✗ Fail" }, { v: "warn", l: "! Warn" }, { v: "pass", l: "✓ Pass" }].map(f => (
                  <button key={f.v} onClick={() => setFilterStatus(f.v)} className="filter-btn" style={{
                    padding: "5px 10px", borderRadius: 5, border: "1px solid",
                    borderColor: filterStatus === f.v ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)",
                    background: filterStatus === f.v ? "rgba(124,58,237,0.1)" : "transparent",
                    color: filterStatus === f.v ? "#c4b5fd" : "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "inherit", fontWeight: 600,
                  }}>{f.l}</button>
                ))}
              </div>
            </div>

            {/* CATEGORIES */}
            {filteredCats.map(cat => {
              const cs = catScores[cat.id] || { score: 0, pass: 0, fail: 0, warn: 0, pending: 0, na: 0, total: 0 };
              const isOpen = expanded[cat.id];
              return (
                <div key={cat.id} style={{ marginBottom: 6, borderRadius: 10, border: "1px solid", borderColor: isOpen ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)", overflow: "hidden", transition: "border-color 0.3s" }}>
                  <div className="cat-header" onClick={() => setExpanded(p => ({ ...p, [cat.id]: !p[cat.id] }))}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", cursor: "pointer", userSelect: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <span style={{ fontSize: 18 }}>{cat.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cat.title}</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>{cat.domain} • w:{cat.weight}%</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      {cs.pass > 0 && <span style={{ fontSize: 10, color: "#69f0ae", fontFamily: "'DM Mono', monospace" }}>{cs.pass}✓</span>}
                      {cs.fail > 0 && <span style={{ fontSize: 10, color: "#ff5252", fontFamily: "'DM Mono', monospace" }}>{cs.fail}✗</span>}
                      {cs.warn > 0 && <span style={{ fontSize: 10, color: "#ffab40", fontFamily: "'DM Mono', monospace" }}>{cs.warn}!</span>}
                      <span style={{ fontSize: 13, fontWeight: 800, color: cs.score >= 80 ? "#69f0ae" : cs.score >= 60 ? "#ffab40" : "#ff5252", fontFamily: "'DM Mono', monospace" }}>{cs.score}%</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
                      {cat.checks.map((ch, ci) => {
                        const st = results[ch.id] || "pending";
                        const sev = SEVERITY[ch.severity as keyof typeof SEVERITY];
                        const isExp = expandedCheck === ch.id;
                        return (
                          <div key={ch.id} className="check-row" style={{ borderBottom: ci < cat.checks.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none", animation: `fadeIn 0.2s ease ${ci * 30}ms both` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px" }}>
                              <Badge text={sev.label} color={sev.color} bg={sev.bg} />
                              <span onClick={() => setExpandedCheck(isExp ? null : ch.id)}
                                style={{ flex: 1, fontSize: 11.5, color: st === "pass" ? "rgba(255,255,255,0.4)" : st === "fail" ? "#ff8a80" : "rgba(255,255,255,0.7)", cursor: "pointer", lineHeight: 1.45, textDecoration: st === "pass" ? "line-through" : "none", textDecorationColor: "rgba(255,255,255,0.15)" }}>
                                {ch.label}
                              </span>
                              <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                                {(["pass", "fail", "warn", "na"] as const).map(sv => (
                                  <StatusDot key={sv} status={st === sv ? sv : "pending"} onClick={() => setStatus(ch.id, st === sv ? "pending" : sv)} size={26} />
                                ))}
                              </div>
                            </div>

                            {isExp && (
                              <div style={{ padding: "0 14px 12px", animation: "fadeIn 0.2s ease" }}>
                                <div style={{ padding: 10, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 8 }}>
                                  <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", marginBottom: 4, letterSpacing: "0.1em" }}>📋 FIX GUIDE</div>
                                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{ch.fix}</div>
                                </div>
                                <textarea placeholder="Your notes..." value={notes[ch.id] || ""} onChange={e => setNotes(p => ({ ...p, [ch.id]: e.target.value }))}
                                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#ddd", fontSize: 11, resize: "vertical", minHeight: 40, outline: "none", boxSizing: "border-box" }} />
                                {st === "fail" && (
                                  <button onClick={() => getAI(ch)} disabled={aiLoading === ch.id} className="filter-btn"
                                    style={{ marginTop: 8, padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", color: "#c4b5fd", fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", gap: 6 }}>
                                    {aiLoading === ch.id ? "⏳ Analyzing..." : "🤖 Deep AI Analysis"}
                                  </button>
                                )}
                                <AISuggestionBox suggestion={aiResults[ch.id]} loading={aiLoading === ch.id} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* ACTIONS BAR */}
            <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "space-between", flexWrap: "wrap" }}>
              <button onClick={() => { if(confirm("Reset all results?")) { setResults({}); setNotes({}); setAiResults({}); }}} className="filter-btn"
                style={{ padding: "9px 18px", borderRadius: 7, border: "1px solid rgba(255,23,68,0.2)", background: "rgba(255,23,68,0.06)", color: "#ff8a80", fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                🗑️ Reset
              </button>
              <div style={{ display: "flex", gap: 8 }}>
                {allFails.length > 0 && (
                  <button onClick={generateFixPlan} className="filter-btn"
                    style={{ padding: "9px 18px", borderRadius: 7, border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd", fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                    🤖 Generate Fix Plan ({allFails.length} fails)
                  </button>
                )}
                <button onClick={() => { navigator.clipboard?.writeText(genReport()); }} className="filter-btn"
                  style={{ padding: "9px 18px", borderRadius: 7, border: "1px solid rgba(0,230,118,0.2)", background: "rgba(0,230,118,0.06)", color: "#69f0ae", fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                  📋 Copy Report
                </button>
              </div>
            </div>
          </>
        ) : (
          /* REPORT VIEW */
          <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", overflow: "hidden" }}>
            <pre style={{ padding: 20, fontSize: 11, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.6, margin: 0, fontFamily: "'DM Mono', monospace" }}>
              {genReport()}
            </pre>
            <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 8 }}>
              <button onClick={() => navigator.clipboard?.writeText(genReport())} className="filter-btn"
                style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", color: "#c4b5fd", fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>📋 Copy</button>
            </div>
          </div>
        )}

        {/* FIX PLAN MODAL */}
        {showFixPlan && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}
            onClick={() => setShowFixPlan(false)}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f18", borderRadius: 14, border: "1px solid rgba(124,58,237,0.2)", maxWidth: 700, width: "100%", maxHeight: "80vh", overflow: "auto", padding: 24 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800 }}>🤖 AI Fix Plan — {projectName || "Game App"}</h2>

              {fixPlanLoading ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 20 }}>
                  <div style={{ width: 20, height: 20, border: "2px solid #7c3aed", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  <span style={{ color: "#a78bfa" }}>Generating comprehensive fix plan for {allFails.length} failures...</span>
                </div>
              ) : fixPlan ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ padding: 14, borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 6 }}>EXECUTIVE SUMMARY</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{fixPlan.executive_summary as string}</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Risk: <strong style={{ color: fixPlan.risk_level === "CRITICAL" ? "#ff1744" : fixPlan.risk_level === "HIGH" ? "#ff6e40" : "#ffab40" }}>{fixPlan.risk_level as string}</strong></span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Estimate: <strong style={{ color: "#40c4ff" }}>{fixPlan.total_estimate as string}</strong></span>
                    </div>
                  </div>

                  {(fixPlan.quick_wins as Array<{ task: string; impact: string }>)?.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#69f0ae", marginBottom: 8 }}>⚡ QUICK WINS (under 2h each)</div>
                      {(fixPlan.quick_wins as Array<{ task: string; impact: string }>).map((qw, i) => (
                        <div key={i} style={{ padding: "8px 12px", borderRadius: 6, background: "rgba(105,240,174,0.04)", border: "1px solid rgba(105,240,174,0.1)", marginBottom: 4, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                          {qw.task} <Badge text={qw.impact} color={qw.impact === "HIGH" ? "#ff6e40" : "#ffab40"} bg={qw.impact === "HIGH" ? "rgba(255,110,64,0.1)" : "rgba(255,171,64,0.1)"} />
                        </div>
                      ))}
                    </div>
                  )}

                  {(fixPlan.sprints as Array<{ name: string; duration: string; priority: string; tasks: Array<{ check: string; task: string; owner_role: string; effort: string }> }>)?.map((sprint, si) => (
                    <div key={si} style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{sprint.name}</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <Badge text={sprint.priority} color={sprint.priority === "P0" ? "#ff1744" : "#ffab40"} bg={sprint.priority === "P0" ? "rgba(255,23,68,0.1)" : "rgba(255,171,64,0.1)"} />
                          <Badge text={sprint.duration} color="#40c4ff" bg="rgba(64,196,255,0.1)" />
                        </div>
                      </div>
                      {sprint.tasks?.map((task, ti) => (
                        <div key={ti} style={{ padding: "6px 0", borderBottom: ti < sprint.tasks.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", fontSize: 11, color: "rgba(255,255,255,0.6)", display: "flex", justifyContent: "space-between", gap: 8 }}>
                          <span style={{ flex: 1 }}>{task.task}</span>
                          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, whiteSpace: "nowrap" }}>{task.owner_role} • {task.effort}</span>
                        </div>
                      ))}
                    </div>
                  ))}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { const txt = JSON.stringify(fixPlan, null, 2); navigator.clipboard?.writeText(txt); }} className="filter-btn"
                      style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", color: "#c4b5fd", fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                      📋 Copy Plan
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", padding: "28px 0 12px", fontSize: 10, color: "rgba(255,255,255,0.1)", fontFamily: "'DM Mono', monospace" }}>
          AAA GAME AUDIT v2.0 • {CATEGORIES.length} domains • {TOTAL_CHECKS} checks
        </div>
      </div>
    </div>
  );
}
