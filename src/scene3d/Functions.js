import {c, entities} from "./Utility"
import * as THREE from 'three';
import {Star} from "./Category"
import { scene, camera } from './Main';
import { Vector3 } from "three";

export function cameraMovement(){
  camera.position.z = c.scrollDist;
  let x = camera.position.z;
  camera.rotation.x = Math.sin(x / 4) / 12;
  camera.rotation.y = Math.cos(x / 4) / 12;
}

export function onMouseWheel(event) {
 c.scrollPos = -0.001 * event.deltaY;
}

export function initCategory(){
  for(let i of entities.category){
    i.init();
  }
}
export function updateCategory() {
  for(let i of entities.category){
    i.update();
    i.show();
  }
}

export function RN(value) {
  return (Math.random() * 2 - 1) * value;
}
export function randomSpherePosition(){
  let pos = new THREE.Vector3()
  pos.x =  15+ RN(50)
  pos.y =   Math.sin(RN(2))
  pos.z = RN(50)
  return pos
}

export function createBackgroundStars(n) {
  for (let i = 0; i < n; i++) {
    let s = new Star();
    const geometry = new THREE.SphereGeometry(s.size, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: s.color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(s.pos.x, s.pos.y, s.pos.z);
    scene.add(sphere);
  }
}
