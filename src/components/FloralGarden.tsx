import type { CSSProperties } from 'react';
import './FloralGarden.css';

export type FlowerKind = 'sunflower' | 'daisy' | 'ranunculus' | 'rose' | 'chrysanthemum' | 'wildflower' | 'tiny';
type GardenDepth = 'deep' | 'middle' | 'near';

type BloomSpec = {
  x: number;
  y: number;
  size: number;
  kind: FlowerKind;
  delay: number;
  sway: number;
  depth: GardenDepth;
  rotate: number;
  leafTilt: number;
  nearCard?: boolean;
};

type PetalSpec = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
};

type FoliageSpec = {
  x: number;
  y: number;
  size: number;
  delay: number;
  rotate: number;
  depth: GardenDepth;
  kind: 'broad' | 'fern' | 'rosette';
};

const blooms: BloomSpec[] = [
  { x: -2, y: 3, size: 118, kind: 'sunflower', delay: 0.05, sway: 8.2, depth: 'middle', rotate: -17, leafTilt: -8 },
  { x: 7, y: 11, size: 68, kind: 'daisy', delay: 0.36, sway: 5.6, depth: 'near', rotate: 10, leafTilt: 16 },
  { x: 15, y: 2, size: 84, kind: 'chrysanthemum', delay: 0.19, sway: 6.9, depth: 'deep', rotate: -8, leafTilt: -24 },
  { x: 24, y: 9, size: 105, kind: 'rose', delay: 0.52, sway: 7.8, depth: 'middle', rotate: 18, leafTilt: 12, nearCard: true },
  { x: 34, y: 3, size: 65, kind: 'wildflower', delay: 0.66, sway: 5.2, depth: 'near', rotate: -12, leafTilt: -15 },
  { x: 43, y: 11, size: 98, kind: 'ranunculus', delay: 0.31, sway: 8.9, depth: 'deep', rotate: 7, leafTilt: 26 },
  { x: 53, y: 2, size: 73, kind: 'daisy', delay: 0.82, sway: 6.1, depth: 'near', rotate: -22, leafTilt: -9 },
  { x: 62, y: 10, size: 112, kind: 'sunflower', delay: 0.48, sway: 9.3, depth: 'middle', rotate: 14, leafTilt: 20 },
  { x: 72, y: 3, size: 72, kind: 'tiny', delay: 0.74, sway: 5.8, depth: 'near', rotate: 12, leafTilt: -18 },
  { x: 81, y: 11, size: 101, kind: 'chrysanthemum', delay: 0.23, sway: 7.5, depth: 'middle', rotate: -16, leafTilt: 13, nearCard: true },
  { x: 91, y: 1, size: 82, kind: 'rose', delay: 0.59, sway: 8.4, depth: 'deep', rotate: 22, leafTilt: -12 },
  { x: 101, y: 8, size: 122, kind: 'sunflower', delay: 0.12, sway: 9.8, depth: 'middle', rotate: -11, leafTilt: 24 },

  { x: 2, y: 21, size: 77, kind: 'ranunculus', delay: 0.92, sway: 6.4, depth: 'near', rotate: 13, leafTilt: -20 },
  { x: 8, y: 31, size: 110, kind: 'sunflower', delay: 0.44, sway: 8.7, depth: 'deep', rotate: -24, leafTilt: 9, nearCard: true },
  { x: 3, y: 44, size: 63, kind: 'tiny', delay: 0.68, sway: 5.3, depth: 'near', rotate: 18, leafTilt: -14 },
  { x: 7, y: 57, size: 96, kind: 'chrysanthemum', delay: 0.28, sway: 7.6, depth: 'middle', rotate: -9, leafTilt: 18 },
  { x: 1, y: 70, size: 82, kind: 'daisy', delay: 0.77, sway: 6.8, depth: 'deep', rotate: 11, leafTilt: -26 },
  { x: 9, y: 82, size: 114, kind: 'rose', delay: 0.38, sway: 9.1, depth: 'middle', rotate: -19, leafTilt: 8, nearCard: true },
  { x: -1, y: 96, size: 90, kind: 'sunflower', delay: 0.11, sway: 8.8, depth: 'near', rotate: 15, leafTilt: 23 },

  { x: 98, y: 19, size: 79, kind: 'wildflower', delay: 0.47, sway: 5.9, depth: 'near', rotate: -14, leafTilt: -16 },
  { x: 94, y: 29, size: 104, kind: 'ranunculus', delay: 0.88, sway: 8.1, depth: 'deep', rotate: 21, leafTilt: 15, nearCard: true },
  { x: 101, y: 43, size: 69, kind: 'daisy', delay: 0.62, sway: 6.3, depth: 'middle', rotate: -7, leafTilt: -21 },
  { x: 96, y: 55, size: 118, kind: 'sunflower', delay: 0.18, sway: 9.6, depth: 'near', rotate: 17, leafTilt: 11 },
  { x: 102, y: 67, size: 76, kind: 'tiny', delay: 0.71, sway: 5.5, depth: 'deep', rotate: -18, leafTilt: 25 },
  { x: 95, y: 78, size: 97, kind: 'chrysanthemum', delay: 0.34, sway: 7.2, depth: 'middle', rotate: 9, leafTilt: -10, nearCard: true },
  { x: 101, y: 91, size: 112, kind: 'rose', delay: 0.55, sway: 8.6, depth: 'near', rotate: -15, leafTilt: 18 },

  { x: 4, y: 98, size: 72, kind: 'daisy', delay: 0.64, sway: 5.7, depth: 'deep', rotate: -12, leafTilt: -20 },
  { x: 15, y: 94, size: 108, kind: 'sunflower', delay: 0.17, sway: 8.9, depth: 'middle', rotate: 19, leafTilt: 7 },
  { x: 25, y: 101, size: 76, kind: 'tiny', delay: 0.83, sway: 6.2, depth: 'near', rotate: -25, leafTilt: 22 },
  { x: 35, y: 94, size: 96, kind: 'chrysanthemum', delay: 0.37, sway: 7.4, depth: 'deep', rotate: 8, leafTilt: -13, nearCard: true },
  { x: 46, y: 100, size: 116, kind: 'rose', delay: 0.56, sway: 9.4, depth: 'middle', rotate: -18, leafTilt: 15 },
  { x: 57, y: 94, size: 80, kind: 'wildflower', delay: 0.26, sway: 6.1, depth: 'near', rotate: 16, leafTilt: -8 },
  { x: 67, y: 101, size: 103, kind: 'ranunculus', delay: 0.73, sway: 8.2, depth: 'deep', rotate: -10, leafTilt: 24 },
  { x: 78, y: 94, size: 70, kind: 'daisy', delay: 0.43, sway: 5.8, depth: 'near', rotate: 24, leafTilt: -18 },
  { x: 88, y: 99, size: 114, kind: 'sunflower', delay: 0.09, sway: 9.1, depth: 'middle', rotate: -14, leafTilt: 10 },
  { x: 98, y: 94, size: 84, kind: 'chrysanthemum', delay: 0.69, sway: 7.3, depth: 'deep', rotate: 13, leafTilt: -25 },

  { x: 17, y: 19, size: 55, kind: 'tiny', delay: 0.96, sway: 4.9, depth: 'near', rotate: 9, leafTilt: 20, nearCard: true },
  { x: 84, y: 20, size: 59, kind: 'tiny', delay: 0.8, sway: 5.1, depth: 'near', rotate: -18, leafTilt: -15, nearCard: true },
  { x: 18, y: 83, size: 63, kind: 'wildflower', delay: 0.61, sway: 5.6, depth: 'near', rotate: 20, leafTilt: 12, nearCard: true },
  { x: 84, y: 82, size: 62, kind: 'wildflower', delay: 0.33, sway: 5.4, depth: 'near', rotate: -9, leafTilt: -22, nearCard: true },
];

const addedBlooms: BloomSpec[] = [
  { x: 23, y: 24, size: 74, kind: 'daisy', delay: 0.14, sway: 6.1, depth: 'near', rotate: -13, leafTilt: 18, nearCard: true },
  { x: 27, y: 35, size: 92, kind: 'sunflower', delay: 0.51, sway: 8.3, depth: 'middle', rotate: 12, leafTilt: -17, nearCard: true },
  { x: 21, y: 47, size: 66, kind: 'wildflower', delay: 0.78, sway: 5.5, depth: 'deep', rotate: -21, leafTilt: 25, nearCard: true },
  { x: 26, y: 60, size: 86, kind: 'ranunculus', delay: 0.29, sway: 7.7, depth: 'near', rotate: 8, leafTilt: -9, nearCard: true },
  { x: 22, y: 73, size: 72, kind: 'chrysanthemum', delay: 0.63, sway: 6.8, depth: 'middle', rotate: 18, leafTilt: 12, nearCard: true },
  { x: 27, y: 86, size: 97, kind: 'rose', delay: 0.4, sway: 8.8, depth: 'deep', rotate: -16, leafTilt: -24, nearCard: true },
  { x: 16, y: 37, size: 58, kind: 'tiny', delay: 0.91, sway: 5.1, depth: 'near', rotate: 24, leafTilt: 7 },
  { x: 15, y: 64, size: 64, kind: 'daisy', delay: 0.35, sway: 5.9, depth: 'near', rotate: -8, leafTilt: -19 },
  { x: 31, y: 17, size: 57, kind: 'tiny', delay: 0.72, sway: 4.8, depth: 'middle', rotate: 9, leafTilt: 22 },
  { x: 31, y: 89, size: 68, kind: 'wildflower', delay: 0.2, sway: 5.6, depth: 'near', rotate: -12, leafTilt: -11 },

  { x: 77, y: 24, size: 78, kind: 'chrysanthemum', delay: 0.46, sway: 7.2, depth: 'near', rotate: 15, leafTilt: -14, nearCard: true },
  { x: 73, y: 35, size: 95, kind: 'rose', delay: 0.7, sway: 8.5, depth: 'middle', rotate: -11, leafTilt: 21, nearCard: true },
  { x: 79, y: 47, size: 67, kind: 'wildflower', delay: 0.24, sway: 5.7, depth: 'deep', rotate: 20, leafTilt: -7, nearCard: true },
  { x: 74, y: 60, size: 88, kind: 'sunflower', delay: 0.58, sway: 9, depth: 'near', rotate: -19, leafTilt: 16, nearCard: true },
  { x: 78, y: 73, size: 73, kind: 'daisy', delay: 0.12, sway: 6.4, depth: 'middle', rotate: 7, leafTilt: -23, nearCard: true },
  { x: 73, y: 86, size: 99, kind: 'ranunculus', delay: 0.84, sway: 8.1, depth: 'deep', rotate: -7, leafTilt: 13, nearCard: true },
  { x: 84, y: 38, size: 60, kind: 'tiny', delay: 0.31, sway: 5.3, depth: 'near', rotate: -22, leafTilt: 24 },
  { x: 85, y: 64, size: 64, kind: 'chrysanthemum', delay: 0.66, sway: 6.2, depth: 'near', rotate: 12, leafTilt: -16 },
  { x: 69, y: 17, size: 55, kind: 'tiny', delay: 0.19, sway: 4.9, depth: 'middle', rotate: -15, leafTilt: 8 },
  { x: 69, y: 89, size: 69, kind: 'daisy', delay: 0.53, sway: 5.8, depth: 'near', rotate: 16, leafTilt: -21 },

  { x: 12, y: 8, size: 58, kind: 'tiny', delay: 0.27, sway: 5.4, depth: 'near', rotate: -18, leafTilt: 15 },
  { x: 38, y: 16, size: 61, kind: 'daisy', delay: 0.76, sway: 5.7, depth: 'middle', rotate: 21, leafTilt: -12 },
  { x: 58, y: 16, size: 63, kind: 'wildflower', delay: 0.42, sway: 5.2, depth: 'near', rotate: -6, leafTilt: 20 },
  { x: 88, y: 8, size: 56, kind: 'tiny', delay: 0.9, sway: 4.7, depth: 'near', rotate: 11, leafTilt: -23 },
  { x: 13, y: 90, size: 61, kind: 'wildflower', delay: 0.49, sway: 5.5, depth: 'middle', rotate: 8, leafTilt: 11 },
  { x: 38, y: 91, size: 58, kind: 'tiny', delay: 0.67, sway: 4.9, depth: 'near', rotate: -17, leafTilt: -8 },
  { x: 59, y: 91, size: 62, kind: 'daisy', delay: 0.36, sway: 5.6, depth: 'middle', rotate: 13, leafTilt: 22 },
  { x: 89, y: 89, size: 59, kind: 'tiny', delay: 0.83, sway: 5.1, depth: 'near', rotate: -24, leafTilt: -14 },
];

const allBlooms = [...blooms, ...addedBlooms];

const foliage: FoliageSpec[] = [
  { x: -2, y: 10, size: 210, delay: 0.08, rotate: -18, depth: 'deep', kind: 'fern' },
  { x: 9, y: 4, size: 138, delay: 0.31, rotate: 16, depth: 'middle', kind: 'rosette' },
  { x: 20, y: 13, size: 170, delay: 0.56, rotate: -12, depth: 'deep', kind: 'broad' },
  { x: 33, y: 6, size: 132, delay: 0.22, rotate: 21, depth: 'near', kind: 'rosette' },
  { x: 47, y: 12, size: 176, delay: 0.67, rotate: -23, depth: 'deep', kind: 'fern' },
  { x: 62, y: 6, size: 145, delay: 0.42, rotate: 13, depth: 'middle', kind: 'broad' },
  { x: 76, y: 13, size: 174, delay: 0.15, rotate: -17, depth: 'deep', kind: 'fern' },
  { x: 91, y: 5, size: 145, delay: 0.74, rotate: 19, depth: 'near', kind: 'rosette' },
  { x: 103, y: 12, size: 205, delay: 0.36, rotate: -16, depth: 'middle', kind: 'broad' },
  { x: 4, y: 26, size: 160, delay: 0.49, rotate: 22, depth: 'near', kind: 'broad' },
  { x: 13, y: 39, size: 142, delay: 0.77, rotate: -25, depth: 'deep', kind: 'rosette' },
  { x: 7, y: 54, size: 198, delay: 0.2, rotate: 12, depth: 'middle', kind: 'fern' },
  { x: 14, y: 69, size: 153, delay: 0.61, rotate: -19, depth: 'near', kind: 'broad' },
  { x: 5, y: 84, size: 190, delay: 0.11, rotate: 18, depth: 'deep', kind: 'rosette' },
  { x: 12, y: 99, size: 166, delay: 0.7, rotate: -10, depth: 'middle', kind: 'fern' },
  { x: 23, y: 27, size: 150, delay: 0.38, rotate: -13, depth: 'middle', kind: 'broad' },
  { x: 27, y: 49, size: 126, delay: 0.82, rotate: 23, depth: 'near', kind: 'rosette' },
  { x: 22, y: 71, size: 174, delay: 0.26, rotate: -21, depth: 'deep', kind: 'fern' },
  { x: 28, y: 89, size: 138, delay: 0.54, rotate: 14, depth: 'near', kind: 'broad' },
  { x: 97, y: 25, size: 166, delay: 0.63, rotate: -15, depth: 'middle', kind: 'fern' },
  { x: 91, y: 42, size: 139, delay: 0.17, rotate: 20, depth: 'near', kind: 'rosette' },
  { x: 96, y: 56, size: 184, delay: 0.45, rotate: -18, depth: 'deep', kind: 'broad' },
  { x: 91, y: 72, size: 145, delay: 0.79, rotate: 11, depth: 'near', kind: 'fern' },
  { x: 97, y: 87, size: 194, delay: 0.29, rotate: -22, depth: 'middle', kind: 'rosette' },
  { x: 91, y: 100, size: 158, delay: 0.57, rotate: 17, depth: 'deep', kind: 'broad' },
  { x: 34, y: 98, size: 144, delay: 0.34, rotate: -18, depth: 'near', kind: 'fern' },
  { x: 50, y: 101, size: 170, delay: 0.73, rotate: 15, depth: 'middle', kind: 'rosette' },
  { x: 65, y: 98, size: 145, delay: 0.16, rotate: -11, depth: 'deep', kind: 'broad' },
  { x: 80, y: 101, size: 183, delay: 0.52, rotate: 22, depth: 'near', kind: 'fern' },
  { x: 30, y: 11, size: 112, delay: 0.92, rotate: 7, depth: 'near', kind: 'rosette' },
  { x: 70, y: 10, size: 119, delay: 0.86, rotate: -9, depth: 'near', kind: 'rosette' },
];

const petals: PetalSpec[] = [
  { x: 13, y: 15, size: 12, delay: 0.3, duration: 13, drift: 6, rotate: 18 },
  { x: 28, y: 20, size: 9, delay: 3.4, duration: 15, drift: -8, rotate: -34 },
  { x: 75, y: 17, size: 11, delay: 5.8, duration: 14, drift: 10, rotate: 24 },
  { x: 89, y: 35, size: 8, delay: 1.7, duration: 12, drift: -7, rotate: -18 },
  { x: 12, y: 51, size: 10, delay: 6.6, duration: 16, drift: 8, rotate: 42 },
  { x: 91, y: 57, size: 12, delay: 2.2, duration: 14, drift: -11, rotate: 8 },
  { x: 22, y: 71, size: 8, delay: 8.1, duration: 17, drift: 7, rotate: -28 },
  { x: 79, y: 75, size: 10, delay: 4.5, duration: 13, drift: -6, rotate: 29 },
  { x: 30, y: 89, size: 11, delay: 1.1, duration: 15, drift: 9, rotate: -12 },
  { x: 70, y: 91, size: 8, delay: 7.4, duration: 16, drift: -8, rotate: 35 },
];

const sunflowerPetals = Array.from({ length: 16 }, (_, index) => index * 22.5);
const daisyPetals = Array.from({ length: 10 }, (_, index) => index * 36);
const chrysanthemumPetals = Array.from({ length: 22 }, (_, index) => index * (360 / 22));

export function FlowerSvg({ kind }: { kind: FlowerKind }) {
  if (kind === 'sunflower') {
    return (
      <svg className="floral-garden__flower" viewBox="0 0 120 120" aria-hidden="true">
        <g className="flower-sunflower__petals">
          {sunflowerPetals.map((rotation) => (
            <ellipse key={rotation} cx="60" cy="24" rx="11" ry="30" transform={`rotate(${rotation} 60 60)`} fill={rotation % 45 === 0 ? '#eeb82e' : '#f7cc4a'} />
          ))}
        </g>
        <circle cx="60" cy="60" r="22" fill="#8b642c" />
        <circle cx="60" cy="60" r="15" fill="#a7782e" />
        <path d="M49 54c3-5 6-7 9-8m5 2c4 1 7 4 9 7m-19 12c4 3 8 4 12 4m-5-22c1 4 1 7 0 10" stroke="#d8ad48" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7" />
      </svg>
    );
  }

  if (kind === 'daisy') {
    return (
      <svg className="floral-garden__flower" viewBox="0 0 120 120" aria-hidden="true">
        <g className="flower-daisy__petals">
          {daisyPetals.map((rotation) => (
            <ellipse key={rotation} cx="60" cy="29" rx="10" ry="29" transform={`rotate(${rotation} 60 60)`} fill={rotation % 72 === 0 ? '#fff0a6' : '#f8d864'} />
          ))}
        </g>
        <circle cx="60" cy="60" r="15" fill="#bd812b" />
        <circle cx="56" cy="56" r="4" fill="#e3aa37" opacity=".85" />
        <circle cx="67" cy="62" r="3" fill="#e3aa37" opacity=".75" />
      </svg>
    );
  }

  if (kind === 'ranunculus') {
    return (
      <svg className="floral-garden__flower" viewBox="0 0 120 120" aria-hidden="true">
        <g fill="#efb92f">
          <ellipse cx="60" cy="40" rx="18" ry="29" transform="rotate(-32 60 60)" />
          <ellipse cx="60" cy="40" rx="18" ry="29" transform="rotate(32 60 60)" fill="#f5cb53" />
          <ellipse cx="60" cy="40" rx="18" ry="29" transform="rotate(74 60 60)" fill="#e6a91f" />
          <ellipse cx="60" cy="40" rx="18" ry="29" transform="rotate(106 60 60)" fill="#f8d768" />
        </g>
        <g fill="none" stroke="#f9df79" strokeWidth="5" strokeLinecap="round">
          <path d="M38 64c8-13 14-18 22-19" />
          <path d="M82 64c-8-13-14-18-22-19" />
          <path d="M47 77c3-12 8-19 13-23" />
          <path d="M73 77c-3-12-8-19-13-23" />
        </g>
        <circle cx="60" cy="60" r="14" fill="#c88c29" />
        <circle cx="60" cy="60" r="7" fill="#e7b83d" />
      </svg>
    );
  }

  if (kind === 'rose') {
    return (
      <svg className="floral-garden__flower" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60 15C79 14 96 30 94 52c-1 28-17 48-36 49-19 0-34-19-32-44C27 34 39 17 60 15Z" fill="#f4c742" />
        <path d="M39 39c8-17 30-23 44-9 12 12 8 35-2 47-10 12-28 16-40 4-11-11-11-29-2-42Z" fill="#eab431" />
        <path d="M47 45c4-12 20-18 29-9 8 8 6 21-1 29-8 9-20 11-27 3-6-6-6-15-1-23Z" fill="#f6cf57" />
        <path d="M55 51c2-7 10-11 16-6 5 5 3 13-1 17-5 5-12 6-16 2-3-3-2-9 1-13Z" fill="#dca126" />
        <path d="M61 56c3-3 7-2 8 1 1 4-3 7-7 7-3 0-4-5-1-8Z" fill="#aa702b" />
        <path d="M33 64c10 8 22 11 36 8 11-2 18-8 23-17" stroke="#f9df78" strokeWidth="2.5" fill="none" opacity=".65" />
      </svg>
    );
  }

  if (kind === 'chrysanthemum') {
    return (
      <svg className="floral-garden__flower" viewBox="0 0 120 120" aria-hidden="true">
        <g className="flower-chrysanthemum__petals">
          {chrysanthemumPetals.map((rotation, index) => (
            <path key={rotation} d="M60 58C50 44 49 25 56 10c3-6 7-6 8 1 2 16 0 34-4 47Z" transform={`rotate(${rotation} 60 60)`} fill={index % 3 === 0 ? '#f4c43e' : '#efd052'} />
          ))}
        </g>
        <circle cx="60" cy="60" r="15" fill="#bd812c" />
        <circle cx="60" cy="60" r="7" fill="#dba63a" />
      </svg>
    );
  }

  if (kind === 'wildflower') {
    return (
      <svg className="floral-garden__flower" viewBox="0 0 120 120" aria-hidden="true">
        <g fill="#f5cc4f">
          <path d="M60 55c-16-2-25-12-19-23 5-8 14-5 19 7 5-12 14-15 19-7 6 11-3 21-19 23Z" />
          <path d="M60 55c-3-16 3-27 14-26 9 1 10 11 1 20 13-3 20 5 16 13-5 10-18 8-31-7Z" fill="#edb52c" />
          <path d="M60 55c3-16-3-27-14-26-9 1-10 11-1 20-13-3-20 5-16 13 5 10 18 8 31-7Z" fill="#f9d86c" />
        </g>
        <circle cx="60" cy="58" r="10" fill="#b5792b" />
        <circle cx="60" cy="58" r="4" fill="#ebbd42" />
      </svg>
    );
  }

  return (
    <svg className="floral-garden__flower" viewBox="0 0 120 120" aria-hidden="true">
      <g fill="#f4c83f">
        <ellipse cx="60" cy="42" rx="8" ry="21" />
        <ellipse cx="60" cy="42" rx="8" ry="21" transform="rotate(72 60 60)" fill="#eab42c" />
        <ellipse cx="60" cy="42" rx="8" ry="21" transform="rotate(144 60 60)" fill="#f8d96a" />
        <ellipse cx="60" cy="42" rx="8" ry="21" transform="rotate(216 60 60)" fill="#efbf36" />
        <ellipse cx="60" cy="42" rx="8" ry="21" transform="rotate(288 60 60)" fill="#f7d35a" />
      </g>
      <circle cx="60" cy="60" r="8" fill="#b87929" />
    </svg>
  );
}

function LeafSprig({ tilt }: { tilt: number }) {
  return (
    <svg className="floral-garden__leaves" style={{ '--leaf-tilt': `${tilt}deg` } as CSSProperties} viewBox="0 0 150 112" aria-hidden="true">
      <path d="M75 104C72 85 78 66 75 42" fill="none" stroke="#587b45" strokeWidth="3" strokeLinecap="round" />
      <path d="M74 76C57 72 43 62 35 49c17-1 31 5 39 19Z" fill="#6f9850" />
      <path d="M76 65c14-14 27-19 40-18-8 15-20 23-39 26Z" fill="#7da257" />
      <path d="M75 91c-14-2-25-9-32-19 13-1 24 4 32 14Z" fill="#87a95d" />
      <path d="M76 48c9-12 19-17 29-17-5 12-14 19-28 22Z" fill="#618d4b" />
      <path d="M37 50c14 5 26 13 37 25M115 48C99 54 87 63 76 78M43 73c12 2 22 7 32 15M104 36C92 43 85 51 77 63" stroke="#a9bd70" strokeWidth="1.5" opacity=".72" fill="none" />
    </svg>
  );
}

function FoliageSvg({ kind }: { kind: FoliageSpec['kind'] }) {
  if (kind === 'fern') {
    return (
      <svg className="floral-garden__foliage-svg" viewBox="0 0 180 150" aria-hidden="true">
        <g fill="#668f4e">
          <path d="M83 125c-3-24 3-51 14-78 4-10 9-20 14-28-3 26-5 52-11 73-5 16-10 26-17 33Z" fill="#547f48" />
          <path d="M95 84C73 80 57 71 44 56c20-2 37 4 51 18Z" />
          <path d="M101 70c14-19 28-28 46-29-9 19-23 31-43 38Z" fill="#7ba45a" />
          <path d="M91 101c-22-1-37-8-49-21 19-3 36 2 50 14Z" fill="#86aa60" />
          <path d="M106 52c10-15 21-23 34-25-5 16-16 26-32 32Z" fill="#6f9950" />
          <path d="M85 113c-15 3-29-1-39-10 15-5 29-3 41 4Z" fill="#729c52" />
        </g>
        <g fill="none" stroke="#a8bc72" strokeWidth="2" opacity=".65">
          <path d="M86 119c6-22 13-45 23-70" />
          <path d="M93 84c-16-11-30-18-46-26M96 76c16-13 28-23 43-31M90 101c-15-8-28-13-42-18" />
        </g>
      </svg>
    );
  }

  if (kind === 'rosette') {
    return (
      <svg className="floral-garden__foliage-svg" viewBox="0 0 180 150" aria-hidden="true">
        <g fill="#70994e">
          <path d="M88 91C59 92 37 80 22 59c25-5 47 1 64 18Z" />
          <path d="M92 88C88 57 98 32 118 14c7 25 1 48-18 67Z" fill="#618b49" />
          <path d="M94 91c25-20 51-23 74-13-17 21-41 28-67 22Z" fill="#86a95a" />
          <path d="M89 91C61 69 50 45 53 19c24 14 36 35 36 64Z" fill="#83a75b" />
          <path d="M94 94c-8 27-3 47 14 61 12-22 9-43-5-61Z" fill="#5f8948" />
          <path d="M88 95c-25 11-39 29-40 51 24-7 39-23 45-48Z" fill="#78a155" />
        </g>
        <circle cx="91" cy="92" r="11" fill="#567d45" opacity=".88" />
        <circle cx="91" cy="92" r="4" fill="#a9bd70" opacity=".7" />
      </svg>
    );
  }

  return (
    <svg className="floral-garden__foliage-svg" viewBox="0 0 180 150" aria-hidden="true">
      <g fill="#729b52">
        <path d="M85 91C59 89 39 76 26 54c25-4 45 4 62 23Z" />
        <path d="M90 91C69 69 63 44 70 19c21 18 28 39 20 68Z" fill="#8bad62" />
        <path d="M94 89c14-26 34-39 59-40-7 26-26 42-55 48Z" fill="#5c8749" />
        <path d="M92 95c-4 26 5 44 27 55 5-24-3-43-25-58Z" fill="#83a95b" />
        <path d="M88 97c-22 8-34 23-38 44 22-5 37-19 44-41Z" fill="#668f4b" />
        <path d="M95 91c25-8 44-5 60 8-22 12-43 10-61-3Z" fill="#78a256" />
      </g>
      <g fill="none" stroke="#afc378" strokeWidth="2" opacity=".6">
        <path d="M91 92C78 73 72 52 71 27M94 94c17-23 35-35 55-39M89 96c-18-4-34-17-50-36M92 97c1 18 8 34 24 49" />
      </g>
    </svg>
  );
}

function FoliageCluster({ foliage: cluster }: { foliage: FoliageSpec }) {
  const style = {
    '--foliage-x': `${cluster.x}%`,
    '--foliage-y': `${cluster.y}%`,
    '--foliage-size': `${cluster.size}px`,
    '--foliage-delay': `${cluster.delay}s`,
    '--foliage-rotate': `${cluster.rotate}deg`,
  } as CSSProperties;

  return (
    <span className={`floral-garden__foliage floral-garden__foliage--${cluster.depth}`} style={style}>
      <span className="floral-garden__foliage-motion">
        <FoliageSvg kind={cluster.kind} />
      </span>
    </span>
  );
}

function Bloom({ bloom }: { bloom: BloomSpec }) {
  const style = {
    '--bloom-x': `${bloom.x}%`,
    '--bloom-y': `${bloom.y}%`,
    '--bloom-size': `${bloom.size}px`,
    '--bloom-delay': `${bloom.delay}s`,
    '--bloom-sway': `${bloom.sway}s`,
    '--bloom-rotate': `${bloom.rotate}deg`,
    '--leaf-tilt': `${bloom.leafTilt}deg`,
  } as CSSProperties;

  return (
    <span className={`floral-garden__bloom floral-garden__bloom--${bloom.depth}${bloom.nearCard ? ' floral-garden__bloom--near-card' : ''}`} style={style}>
      <span className="floral-garden__bloom-motion">
        <span className="floral-garden__bloom-breath">
          <LeafSprig tilt={bloom.leafTilt} />
          <FlowerSvg kind={bloom.kind} />
        </span>
      </span>
    </span>
  );
}

function DriftingPetal({ petal }: { petal: PetalSpec }) {
  const style = {
    '--petal-x': `${petal.x}%`,
    '--petal-y': `${petal.y}%`,
    '--petal-size': `${petal.size}px`,
    '--petal-delay': `${petal.delay}s`,
    '--petal-duration': `${petal.duration}s`,
    '--petal-drift': `${petal.drift}vw`,
    '--petal-rotate': `${petal.rotate}deg`,
  } as CSSProperties;

  return <span className="floral-garden__petal" style={style} aria-hidden="true" />;
}

function FloralGarden({ open }: { open: boolean }) {
  return (
    <div className={`floral-garden${open ? ' floral-garden--open' : ''}`} aria-hidden="true" data-testid="floral-garden">
      <div className="floral-garden__wash" />
      <div className="floral-garden__foliage-layer">
        {foliage.map((cluster, index) => <FoliageCluster foliage={cluster} key={`foliage-${index}`} />)}
      </div>
      <div className="floral-garden__layer floral-garden__layer--deep">
        {allBlooms.filter((bloom) => bloom.depth === 'deep').map((bloom, index) => <Bloom bloom={bloom} key={`deep-${index}`} />)}
      </div>
      <div className="floral-garden__layer floral-garden__layer--middle">
        {allBlooms.filter((bloom) => bloom.depth === 'middle').map((bloom, index) => <Bloom bloom={bloom} key={`middle-${index}`} />)}
      </div>
      <div className="floral-garden__layer floral-garden__layer--near">
        {allBlooms.filter((bloom) => bloom.depth === 'near').map((bloom, index) => <Bloom bloom={bloom} key={`near-${index}`} />)}
      </div>
      <div className="floral-garden__petal-field">
        {petals.map((petal, index) => <DriftingPetal key={`petal-${index}`} petal={petal} />)}
      </div>
    </div>
  );
}

export default FloralGarden;