import { CircuitBoard, Layers, Terminal } from 'lucide-react';

/* Small illustration of a generic microcontroller board (not an official logo). */
function ArduinoVisual() {
  const topPins = Array.from({ length: 10 }, (_, i) => 118 + i * 18);
  const chipPins = Array.from({ length: 7 }, (_, i) => 178 + i * 11);

  return (
    <svg className="ws-visual" viewBox="0 -16 360 236" role="img" aria-label="Illustration of a microcontroller board with a blinking LED">
      <defs>
        <linearGradient id="wsBoard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f6aa6" />
          <stop offset="1" stopColor="#08355c" />
        </linearGradient>
        <linearGradient id="wsMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6eefc" />
          <stop offset="1" stopColor="#8b9bb8" />
        </linearGradient>
        <radialGradient id="wsGlow" cx="50%" cy="55%" r="55%">
          <stop offset="0" stopColor="#1f6bff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#1f6bff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="180" cy="120" rx="170" ry="100" fill="url(#wsGlow)" />

      {/* board */}
      <rect x="52" y="50" width="256" height="128" rx="10" fill="url(#wsBoard)" stroke="#4cc9ff" strokeOpacity="0.55" strokeWidth="1.5" />

      {/* glowing traces */}
      <g className="ws-traces" fill="none" strokeLinecap="round">
        <path id="wsT1" d="M146 111 H178" />
        <path id="wsT2" d="M262 111 H292 V86" />
        <path d="M208 92 V72 H240" />
        <path d="M150 128 V150 H210" />
        <path d="M262 126 H286 V150" />
      </g>

      {/* connectors */}
      <rect x="30" y="68" width="48" height="40" rx="3" fill="url(#wsMetal)" />
      <rect x="36" y="74" width="36" height="28" rx="2" fill="#0d1626" />
      <rect x="30" y="126" width="42" height="34" rx="3" fill="#0d1626" stroke="#2b3a5c" />

      {/* pin headers */}
      <rect x="108" y="40" width="190" height="14" rx="2" fill="#0a0f1e" />
      <rect x="108" y="174" width="190" height="14" rx="2" fill="#0a0f1e" />
      {topPins.map((x) => (
        <g key={x}>
          <circle cx={x} cy="47" r="2.6" fill="#f5c76a" />
          <circle cx={x} cy="181" r="2.6" fill="#f5c76a" />
        </g>
      ))}

      {/* main chip */}
      <g>
        <rect x="170" y="94" width="92" height="34" rx="3" fill="#0a0f1e" stroke="#2b3a5c" />
        {chipPins.map((x) => (
          <g key={x}>
            <rect x={x} y="89" width="4" height="5" fill="#8b9bb8" />
            <rect x={x} y="128" width="4" height="5" fill="#8b9bb8" />
          </g>
        ))}
        <circle cx="180" cy="104" r="2.5" fill="#2b3a5c" />
      </g>

      {/* small parts */}
      <rect x="112" y="100" width="34" height="22" rx="2" fill="#0a0f1e" stroke="#2b3a5c" />
      <rect x="150" y="146" width="24" height="9" rx="4" fill="url(#wsMetal)" />
      <circle cx="88" cy="66" r="7" fill="#0d1626" stroke="#4cc9ff" strokeOpacity="0.6" />

      {/* LEDs */}
      <rect className="ws-led ws-led--on" x="272" y="70" width="10" height="6" rx="1.5" />
      <rect className="ws-led ws-led--blink" x="286" y="70" width="10" height="6" rx="1.5" />
      <rect className="ws-led ws-led--flicker" x="272" y="150" width="10" height="6" rx="1.5" />

      {/* a wired LED floating above the board, blinking with the board LED */}
      <path d="M298 40 C 316 22, 326 34, 332 20" fill="none" stroke="#4cc9ff" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <g className="ws-bulb" transform="translate(332 12)">
        <circle className="ws-bulb__halo" r="16" />
        <path d="M-6 8 V-2 a6 6 0 0 1 12 0 V8 z" className="ws-bulb__body" />
        <rect x="-6" y="8" width="12" height="4" rx="1" fill="#8b9bb8" />
      </g>

      {/* electron travelling along a trace */}
      <circle r="2.8" className="ws-electron">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M146 111 H178 M178 111 H262 M262 111 H292 V86" />
      </circle>
    </svg>
  );
}

/* Insane illustration of an active electronics lab: live oscilloscope + 555 timer breadboard + glowing components */
function ElectronicsVisual() {
  const gridH = [52, 68, 85, 102, 118];
  const gridV = [54, 80, 106, 132, 158];
  const bbRows = [52, 60, 68, 120, 128, 136];
  const bbCols = [222, 234, 246, 258, 270, 282, 294, 306, 318, 330];
  const dipPins = [255, 267, 279, 291];

  return (
    <svg className="ws-visual" viewBox="0 -16 360 236" role="img" aria-label="Illustration of an electronics workshop featuring an oscilloscope, circuit breadboard, 555 timer chip, and flowing signals">
      <defs>
        <radialGradient id="elecGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#00ffaa" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#1f6bff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1f6bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="scopeChassis" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#111c30" />
          <stop offset="100%" stopColor="#080e1a" />
        </linearGradient>
        <linearGradient id="crtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#041612" />
          <stop offset="100%" stopColor="#010a08" />
        </linearGradient>
        <linearGradient id="metalBnc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2ecfc" />
          <stop offset="100%" stopColor="#6e7f9e" />
        </linearGradient>
        <linearGradient id="knobGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f314f" />
          <stop offset="100%" stopColor="#0c1626" />
        </linearGradient>
        <linearGradient id="resBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecd6ba" />
          <stop offset="50%" stopColor="#dfc39f" />
          <stop offset="100%" stopColor="#be9e77" />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#17509c" />
          <stop offset="70%" stopColor="#256cd1" />
          <stop offset="100%" stopColor="#0d3266" />
        </linearGradient>
        <filter id="phosphorGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00ffb4" floodOpacity="0.85" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00ffb4" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* ambient backdrop glow */}
      <ellipse cx="180" cy="112" rx="170" ry="100" fill="url(#elecGlow)" />

      {/* ========================================================
          1. OSCILLOSCOPE UNIT (Left side)
         ======================================================== */}
      <rect x="16" y="24" width="180" height="156" rx="8" fill="url(#scopeChassis)" stroke="#274169" strokeWidth="1.5" />

      {/* Screen bezel */}
      <rect x="24" y="32" width="164" height="106" rx="6" fill="#040b14" stroke="#00e5ff" strokeOpacity="0.35" strokeWidth="1" />

      {/* Phosphor CRT display */}
      <rect x="28" y="36" width="156" height="98" rx="4" fill="url(#crtGrad)" />

      {/* CRT Reticle Grid */}
      <g stroke="#00ffaa" strokeOpacity="0.14" strokeWidth="0.8" strokeDasharray="2 3">
        {gridH.map((y) => (
          <line key={`gh-${y}`} x1="30" y1={y} x2="182" y2={y} />
        ))}
        {gridV.map((x) => (
          <line key={`gv-${x}`} x1={x} y1="38" x2={x} y2="132" />
        ))}
      </g>

      {/* Center crosshair */}
      <line x1="106" y1="80" x2="106" y2="90" stroke="#00ffaa" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="101" y1="85" x2="111" y2="85" stroke="#00ffaa" strokeOpacity="0.4" strokeWidth="1" />

      {/* On-screen telemetry readouts */}
      <text x="34" y="47" fill="#00ffb4" fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.04em">CH1: 2.5V 1.0kHz</text>
      <text x="142" y="47" fill="#3dff9a" fontSize="6" fontFamily="var(--font-mono)" fontWeight="600">● TRIG</text>
      <text x="34" y="129" fill="#ffb020" fontSize="6.5" fontFamily="var(--font-mono)">CH2: 500mV</text>
      <text x="136" y="129" fill="#4cc9ff" fontSize="5.5" fontFamily="var(--font-mono)" opacity="0.8">500µs/DIV</text>

      {/* Secondary Pulse / Square Wave (Trace B - Amber) */}
      <path
        d="M 28 114 H 44 V 102 H 64 V 114 H 84 V 102 H 104 V 114 H 124 V 102 H 144 V 114 H 164 V 102 H 184"
        fill="none"
        stroke="#ffb020"
        strokeWidth="1.6"
        strokeOpacity="0.8"
        strokeLinecap="round"
        className="ws-traces"
      />

      {/* Main Phosphor Sine Wave (Trace A - Neon Green) */}
      <path
        id="elecSineWave"
        d="M 28 85 Q 47.5 55 67 85 T 106 85 T 145 85 T 184 85"
        fill="none"
        stroke="#00ffb4"
        strokeWidth="2.2"
        strokeLinecap="round"
        filter="url(#phosphorGlow)"
      />

      {/* Traveling phosphor electron scan dot tracing the sine wave */}
      <circle r="3.2" fill="#ffffff" filter="url(#phosphorGlow)">
        <animateMotion dur="1.7s" repeatCount="indefinite" path="M 28 85 Q 47.5 55 67 85 T 106 85 T 145 85 T 184 85" />
      </circle>

      {/* Oscilloscope Lower Control Panel (Knobs, BNCs) */}
      {/* CH1 BNC Connector */}
      <g>
        <circle cx="48" cy="156" r="9" fill="url(#metalBnc)" />
        <circle cx="48" cy="156" r="4.5" fill="#0b1320" />
        <circle cx="48" cy="156" r="1.6" fill="#f5c76a" />
        <text x="48" y="173" textAnchor="middle" fill="#00e5ff" fontSize="5.5" fontFamily="var(--font-mono)" fontWeight="600">CH1</text>
      </g>

      {/* CH2 BNC Connector */}
      <g>
        <circle cx="82" cy="156" r="9" fill="url(#metalBnc)" />
        <circle cx="82" cy="156" r="4.5" fill="#0b1320" />
        <circle cx="82" cy="156" r="1.6" fill="#f5c76a" />
        <text x="82" y="173" textAnchor="middle" fill="#ffb020" fontSize="5.5" fontFamily="var(--font-mono)" fontWeight="600">CH2</text>
      </g>

      {/* VOLTS/DIV Knob */}
      <g>
        <circle cx="124" cy="156" r="10" fill="url(#knobGrad)" stroke="#274169" strokeWidth="1.2" />
        <circle cx="124" cy="156" r="7.5" fill="#132238" />
        <line x1="124" y1="148" x2="124" y2="153" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" />
        <text x="124" y="173" textAnchor="middle" fill="#8b9bb8" fontSize="5.5" fontFamily="var(--font-mono)">VOLTS</text>
      </g>

      {/* TIME/DIV Knob */}
      <g>
        <circle cx="158" cy="156" r="10" fill="url(#knobGrad)" stroke="#274169" strokeWidth="1.2" />
        <circle cx="158" cy="156" r="7.5" fill="#132238" />
        <line x1="158" y1="148" x2="158" y2="153" stroke="#ffb020" strokeWidth="1.8" strokeLinecap="round" />
        <text x="158" y="173" textAnchor="middle" fill="#8b9bb8" fontSize="5.5" fontFamily="var(--font-mono)">TIME</text>
      </g>

      {/* ========================================================
          2. BREADBOARD & CIRCUIT MODULE (Right side)
         ======================================================== */}
      <rect x="210" y="24" width="134" height="156" rx="8" fill="#0e1729" stroke="#253c63" strokeWidth="1.5" />

      {/* Power Rails */}
      <line x1="220" y1="33" x2="334" y2="33" stroke="#ff4d4d" strokeWidth="1.4" opacity="0.85" />
      <line x1="220" y1="39" x2="334" y2="39" stroke="#3d7bff" strokeWidth="1.4" opacity="0.85" />

      {/* Breadboard contact holes grid */}
      <g>
        {bbRows.map((y) =>
          bbCols.map((x) => (
            <circle key={`bb-${x}-${y}`} cx={x} cy={y} r="1.3" fill="#070c14" stroke="#1d2e4a" strokeWidth="0.6" />
          ))
        )}
      </g>

      {/* DIP-8 NE555 Timer IC */}
      <g>
        {/* Lead pins extending to holes */}
        {dipPins.map((x) => (
          <g key={`pin-${x}`}>
            <rect x={x - 1.5} y="74" width="3" height="6" fill="#8b9bb8" rx="0.5" />
            <rect x={x - 1.5} y="110" width="3" height="6" fill="#8b9bb8" rx="0.5" />
          </g>
        ))}

        {/* Chip Body */}
        <rect x="248" y="79" width="58" height="32" rx="3" fill="#070d18" stroke="#274169" strokeWidth="1.2" />
        {/* Orientation notch */}
        <path d="M 248 92 a 3 3 0 0 1 0 6" fill="#16253c" />
        {/* Laser etched text */}
        <text x="278" y="97" textAnchor="middle" fill="#9bb3d6" fontSize="6.8" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600">NE555P</text>
        <circle cx="256" cy="85" r="1.5" fill="#274169" />
      </g>

      {/* Resistor R1 (Horizontal) */}
      <g>
        <line x1="222" y1="56" x2="260" y2="56" stroke="#8b9bb8" strokeWidth="1.2" />
        <rect x="233" y="52" width="20" height="8" rx="2.5" fill="url(#resBody)" stroke="#9c7a52" strokeWidth="0.8" />
        <rect x="236" y="52" width="2.2" height="8" fill="#804a1e" /> {/* Brown */}
        <rect x="240" y="52" width="2.2" height="8" fill="#111" />    {/* Black */}
        <rect x="244" y="52" width="2.2" height="8" fill="#e03030" /> {/* Red (1kΩ) */}
        <rect x="249" y="52" width="2.2" height="8" fill="#f5c76a" /> {/* Gold 5% */}
      </g>

      {/* Resistor R2 (Vertical) */}
      <g>
        <line x1="318" y1="62" x2="318" y2="100" stroke="#8b9bb8" strokeWidth="1.2" />
        <rect x="314" y="70" width="8" height="20" rx="2.5" fill="url(#resBody)" stroke="#9c7a52" strokeWidth="0.8" />
        <rect x="314" y="73" width="8" height="2.2" fill="#ffd700" /> {/* Yellow */}
        <rect x="314" y="77" width="8" height="2.2" fill="#7b1fa2" /> {/* Violet */}
        <rect x="314" y="81" width="8" height="2.2" fill="#ff7043" /> {/* Orange (47kΩ) */}
        <rect x="314" y="86" width="8" height="2.2" fill="#f5c76a" /> {/* Gold */}
      </g>

      {/* Electrolytic Capacitor C1 (Blue Can) */}
      <g>
        <rect x="221" y="112" width="16" height="23" rx="3" fill="url(#capGrad)" stroke="#0e2a52" strokeWidth="1" />
        <ellipse cx="229" cy="112" rx="8" ry="3" fill="url(#metalBnc)" />
        <line x1="229" y1="110" x2="229" y2="114" stroke="#666" strokeWidth="0.8" />
        <line x1="227" y1="112" x2="231" y2="112" stroke="#666" strokeWidth="0.8" />
        <rect x="232" y="115" width="4" height="20" fill="#9bb3d6" opacity="0.6" />
        <text x="234" y="125" textAnchor="middle" fill="#000" fontSize="4.5" fontFamily="var(--font-mono)">-</text>
      </g>

      {/* Ceramic Disc Capacitor C2 (Orange) */}
      <g>
        <circle cx="316" cy="126" r="7.5" fill="#d96c21" stroke="#944510" strokeWidth="1" />
        <text x="316" y="128.5" textAnchor="middle" fill="#fff" fontSize="5" fontFamily="var(--font-mono)" fontWeight="600">104</text>
      </g>

      {/* Blue Rotary Trimpot */}
      <g>
        <rect x="250" y="121" width="18" height="18" rx="2.5" fill="#0d4f8b" stroke="#2b82d9" strokeWidth="1" />
        <circle cx="259" cy="130" r="5" fill="#f5c76a" stroke="#b38a32" strokeWidth="0.8" />
        <line x1="256.5" y1="130" x2="261.5" y2="130" stroke="#443" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Status LEDs on Breadboard */}
      <circle cx="282" cy="129" r="4.5" className="ws-led ws-led--blink" />
      <circle cx="295" cy="129" r="4" className="ws-led ws-led--on" />

      {/* ========================================================
          3. JUMPER WIRES BRIDGING CIRCUIT TO OSCILLOSCOPE
         ======================================================== */}
      {/* Wire 1: Cyan (IC Output pin 3 -> Scope CH1 BNC) */}
      <path
        d="M 279 111 C 279 176, 115 186, 48 156"
        fill="none"
        stroke="#00e5ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
        filter="drop-shadow(0 0 4px rgba(0,229,255,0.6))"
      />

      {/* Wire 2: Amber (Resistor Node -> Scope CH2 BNC) */}
      <path
        d="M 318 62 C 318 10, 110 16, 82 156"
        fill="none"
        stroke="#ffb020"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
        filter="drop-shadow(0 0 4px rgba(255,176,32,0.6))"
      />

      {/* Wire 3: Violet (Power rail to IC pin 8) */}
      <path
        d="M 234 39 C 234 68, 255 68, 255 79"
        fill="none"
        stroke="#c084fc"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Traveling Electrons Along Wires */}
      <circle r="3" className="ws-electron">
        <animateMotion dur="2.1s" repeatCount="indefinite" path="M 279 111 C 279 176, 115 186, 48 156" />
      </circle>

      <circle r="2.8" fill="#fff" filter="drop-shadow(0 0 6px #ffb020)">
        <animateMotion dur="2.7s" repeatCount="indefinite" path="M 318 62 C 318 10, 110 16, 82 156" />
      </circle>
    </svg>
  );
}

function GenericVisual({ category }) {
  const key = (category || '').toLowerCase();
  const Icon = key.includes('hard') ? CircuitBoard : key.includes('soft') ? Terminal : Layers;
  return (
    <div className="ws-generic" aria-hidden="true">
      <span className="ws-generic__ring ws-generic__ring--a" />
      <span className="ws-generic__ring ws-generic__ring--b" />
      <Icon size={54} strokeWidth={1.3} />
    </div>
  );
}

const VISUALS = {
  arduino: ArduinoVisual,
  electronics: ElectronicsVisual,
};

export default function WorkshopVisual({ visual, category }) {
  const Custom = VISUALS[visual];
  return Custom ? <Custom /> : <GenericVisual category={category} />;
}
