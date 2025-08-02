import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2,5,6);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Store all lines
const lines = [];

function addLine(startCoords, endCoords, color = 0xff0000) {
  const start = new THREE.Vector3(...startCoords);
  const end = new THREE.Vector3(...endCoords);
  const points = [start, end];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color });
  const line = new THREE.Line(geometry, material);

  scene.add(line);
  lines.push(line);
}

// Animation/render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // required if controls.enableDamping = true
  renderer.render(scene, camera);
}
animate();

// Parameters that can be changed via GUI
const params = {
  rodLength: 3,
  rimHeight: 3,
  rodCount: 18,
  stringCount: 6,
};
// Function to rebuild the structure
function rebuildStructure() {
  // Remove existing lines
  lines.forEach(line => scene.remove(line));
  lines.length = 0;

  // Coordinate axes
  addLine([0, 0, 0], [1, 0, 0], 0xff0000);
  addLine([0, 0, 0], [0, 1, 0], 0x00ff00);
  addLine([0, 0, 0], [0, 0, 1], 0x0000ff);

  const { rodLength, rimHeight, rodCount, stringCount } = params;

  for (let i = 0; i < rodCount; i++) {
    addLine([0, 0, 0], [
      Math.cos(2 * Math.PI * i / rodCount) * rodLength,
      rimHeight,
      Math.sin(2 * Math.PI * i / rodCount) * rodLength
    ], 0x009977);

    addLine([
      Math.cos(2 * Math.PI * i / rodCount) * rodLength,
      rimHeight,
      Math.sin(2 * Math.PI * i / rodCount) * rodLength
    ], [
      Math.cos(2 * Math.PI * (i + 1) / rodCount) * rodLength,
      rimHeight,
      Math.sin(2 * Math.PI * (i + 1) / rodCount) * rodLength
    ], 0x00aaaa);

    for (let j = 0; j < stringCount; j++) {
      addLine([
        Math.cos(2 * Math.PI * i / rodCount) * rodLength / stringCount * (j + 1),
        rimHeight / stringCount * (j + 1),
        Math.sin(2 * Math.PI * i / rodCount) * rodLength / stringCount * (j + 1)
      ], [
        Math.cos(2 * Math.PI * (i + rodCount / 2) / rodCount) * rodLength / stringCount * (stringCount - j),
        rimHeight / stringCount * (stringCount - j),
        Math.sin(2 * Math.PI * (i + rodCount / 2) / rodCount) * rodLength / stringCount * (stringCount - j)
      ], 0xaaaaaa);
    }
  }
}

// GUI setup
const gui = new GUI();
gui.add(params, 'rodLength', 0, 10).onChange(rebuildStructure);
gui.add(params, 'rimHeight', 1, 10).onChange(rebuildStructure);
gui.add(params, 'rodCount', 4, 64, 2).onChange(rebuildStructure); // Step 2 to ensure even numbers
gui.add(params, 'stringCount', 1, 20, 1).onChange(rebuildStructure);

// Initial build
rebuildStructure();
