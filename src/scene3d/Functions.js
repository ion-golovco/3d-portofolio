import { c, entities } from "./Utility";
import * as THREE from "three";
import { Star } from "./Category";
import { scene, camera, mouse } from "./Main";

export function cameraMovement() {
  // when moving make stars in front red and in peripherial sight blue, maybe use a shader or camera filter
  // create a cameramovement class
  let x = c.scrollDist / 4

  camera.rotation.x = Math.cos(x) / 12 + mouse.y / 12;
  camera.rotation.y = Math.cos(x) / 12 - mouse.x / 6;
  camera.rotation.z = Math.sin(x) / 12;

  camera.position.z = Math.tan(x / 4) * 4 + Math.tan(x/2)*4 + x;
  camera.position.x = Math.cos (x/2) * 4;
  
}

export function onMouseWheel(event) {
  c.scrollPos = -0.001 * event.deltaY;
}

export function initCategory() {
  for (let i of entities.category) {
    i.init();
  }
}
export function updateCategory() {
  for (let i of entities.category) {
    i.update();
    i.show();
  }
}

export function RN(value) {
  return (Math.random() * 2 - 1) * value;
}

export function createBackgroundStars(n) {
  for (let i = 0; i < n; i++) {
    let s = new Star(i);
    const geometry = new THREE.SphereGeometry(s.size, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: s.color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(s.pos.x, s.pos.y, s.pos.z);
    scene.add(sphere);
  }
}
