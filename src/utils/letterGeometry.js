import * as THREE from 'three';

/* ==========================================================================
   Builds the 3D "I E E E" letters from simple shapes (no font files needed).
   Each letter is an extruded, beveled polygon so it catches light beautifully.
   Origin of every geometry: centred on X/Z, sitting on y = 0.
   ========================================================================== */

export const LETTER_HEIGHT = 2.6;
const ARM = 0.5; // thickness of horizontal bars
const DEPTH = 0.72;

function buildIShape() {
  const w = 1.5;
  const h = LETTER_HEIGHT;
  const stem = 0.52;
  const l = (w - stem) / 2;
  const r = l + stem;
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(w, 0);
  s.lineTo(w, ARM);
  s.lineTo(r, ARM);
  s.lineTo(r, h - ARM);
  s.lineTo(w, h - ARM);
  s.lineTo(w, h);
  s.lineTo(0, h);
  s.lineTo(0, h - ARM);
  s.lineTo(l, h - ARM);
  s.lineTo(l, ARM);
  s.lineTo(0, ARM);
  s.closePath();
  return s;
}

function buildEShape() {
  const w = 1.7;
  const h = LETTER_HEIGHT;
  const spine = 0.56;
  const gap = (h - 3 * ARM) / 2;
  const mid = 1.35; // length of the middle arm
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(w, 0);
  s.lineTo(w, ARM);
  s.lineTo(spine, ARM);
  s.lineTo(spine, ARM + gap);
  s.lineTo(mid, ARM + gap);
  s.lineTo(mid, 2 * ARM + gap);
  s.lineTo(spine, 2 * ARM + gap);
  s.lineTo(spine, 2 * ARM + 2 * gap);
  s.lineTo(w, 2 * ARM + 2 * gap);
  s.lineTo(w, h);
  s.lineTo(0, h);
  s.closePath();
  return s;
}

function extrude(shape) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.07,
    bevelOffset: 0,
    bevelSegments: 4,
    curveSegments: 1,
  });
  geometry.computeBoundingBox();
  const b = geometry.boundingBox;
  geometry.translate(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2);
  geometry.computeBoundingBox();

  // Vertical colour gradient (soft blue at the bottom → bright white at the top)
  // gives the glossy letters depth. Multiplied with the material colour.
  const pos = geometry.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const bottom = new THREE.Color('#9dbdfb');
  const top = new THREE.Color('#ffffff');
  const tmp = new THREE.Color();
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp(pos.getY(i) / height, 0, 1);
    tmp.copy(bottom).lerp(top, Math.pow(t, 0.8));
    colors.set([tmp.r, tmp.g, tmp.b], i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

/**
 * Creates geometry + final X positions for the four letters.
 * Returns { letters: [{ char, geometry, x, width }], totalWidth }
 */
export function createLetters(gap = 0.34) {
  const defs = [
    { char: 'I', shape: buildIShape() },
    { char: 'E', shape: buildEShape() },
    { char: 'E', shape: buildEShape() },
    { char: 'E', shape: buildEShape() },
  ];

  const built = defs.map((d) => {
    const geometry = extrude(d.shape);
    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    return { char: d.char, geometry, width };
  });

  const totalWidth = built.reduce((sum, l) => sum + l.width, 0) + gap * (built.length - 1);
  let cursor = -totalWidth / 2;
  const letters = built.map((l) => {
    const x = cursor + l.width / 2;
    cursor += l.width + gap;
    return { ...l, x };
  });

  return { letters, totalWidth };
}
