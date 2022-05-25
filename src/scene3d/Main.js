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
  pointLight.position.set(
    Math.sin(c.time) * 10,
    Math.cos(c.time) * 10,
    Math.cos(c.time) * 10
  );
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
  scene.add(gridHelper);
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
  composer.addPass(
    new EffectPass(
      camera,
      new BloomEffect(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        2,
        1,
        5
      )
    )
  );
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
  c.scrollPos *= 0.9;
  camera.position.z = c.scrollDist;

  let x = camera.position.z;

  camera.rotation.x = Math.sin(x / 4) / 12;
  camera.rotation.y = Math.cos(x / 4) / 12;
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
}
