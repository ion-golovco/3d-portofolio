import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
let scene, renderer, fiveTone, composer, camera;
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
  console.log(1);

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    div: document.querySelector("#bg"),
  });
  renderer.setClearColor(new THREE.Color("#050505"), 1);
  document.body.appendChild(renderer.domElement);
  const gridHelper = new THREE.GridHelper(200, 50);
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
  renderer.setSize(w, h);

  const pointLight = new THREE.PointLight(0xffffff);
  scene.add(pointLight);
  const ambientLight = new THREE.PointLight(0xffffff);
  scene.add(ambientLight);

  scene.add(new THREE.AxesHelper(5));

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
