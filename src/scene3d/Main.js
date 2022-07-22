import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import {
  updateCategory,
  initCategory,
  onMouseWheel,
  createBackgroundStars,
  cameraMovement,
} from "./Functions";
import { addCategory } from "./Category";
import { c } from "./Utility";

export let scene, renderer, fiveTone, composer, camera, pointLight;

initial();

const animate = function () {
  requestAnimationFrame(animate);
  c.time += c.incTime;
  scrollUpdate();
  updateCategory();
  pointLight.position.set(0,0,0);
  composer.render();
};

function initial() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    div: document.querySelector("bg"),
  });
  renderer.setClearColor(new THREE.Color("#050505"), 1);
  document.body.appendChild(renderer.domElement);
  const gridHelper = new THREE.GridHelper(200, 50);
  //scene.add(gridHelper);
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
  
  renderer.setSize(w, h);

  pointLight = new THREE.PointLight(0xffffff);
  scene.add(pointLight);
  const ambientLight = new THREE.PointLight(0xffffff);
  scene.add(ambientLight);

  fiveTone = new THREE.TextureLoader().load("img/fiveTone.jpg");
  fiveTone.minFilter = THREE.NearestFilter;
  fiveTone.magFilter = THREE.NearestFilter;

  createBackgroundStars(1500);
  addCategory();
  initCategory();

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new EffectPass(camera, new BloomEffect()));
  window.addEventListener("resize", onWindowResize);
}
animate();

function scrollUpdate() {
  window.addEventListener("wheel", onMouseWheel);
  if (c.scrollDist < 18 && c.scrollPos > 0) {
    c.scrollDist += c.scrollPos;
  } else if (c.scrollDist > -100 && c.scrollPos < 0) {
    c.scrollDist += c.scrollPos;
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
