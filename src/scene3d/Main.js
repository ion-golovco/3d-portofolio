import * as THREE from "three";
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { updateCategory, initCategory, onMouseWheel, createBackgroundStars, cameraMovement } from "./Functions";
import { addCategory } from "./Category";
import { c } from "./Utility";
let w, h;

export let scene, renderer, fiveTone, composer, camera, pointLight;
export let mouse = new THREE.Vector2();

initial();

const animate = function () {
  requestAnimationFrame(animate);
  c.time += c.incTime;
  scrollUpdate();
  updateCategory();
  composer.render();
  c.scrollDist -= 0.1;
};

function initial() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    div: document.querySelector("bg"),
  });
  renderer.setClearColor(new THREE.Color("#050505"), 1);
  document.body.appendChild(renderer.domElement);
  w = window.innerWidth;
  h = window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
  renderer.setSize(w, h);
  pointLight = new THREE.PointLight(0xffffff);
  scene.add(pointLight);
  const ambientLight = new THREE.PointLight(0xffffff);
  scene.add(ambientLight);
  createBackgroundStars(1500);
  addCategory();
  initCategory();
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new EffectPass(camera, new BloomEffect()));
  window.addEventListener("resize", onWindowResize);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  pointLight.position.set(0, 0, 0);
}
animate();

function scrollUpdate() {
  window.addEventListener("wheel", onMouseWheel);
  if (c.scrollDist < 18 && c.scrollPos > 0) {
    c.scrollDist += c.scrollPos;
  } else if (c.scrollDist > -1000 && c.scrollPos < 0) {
    c.scrollDist += c.scrollPos;

    //cool af useful for a warp drive
    // camera.setFocalLength(60 + (c.scrollPos+c.scrollDist)*10)
    // console.log(camera.fov)
  }
  c.scrollPos *= 0.93;
  cameraMovement();
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
