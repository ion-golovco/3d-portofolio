const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  div: document.querySelector("#bg"),
});
renderer.setClearColor(new THREE.Color("#050505"), 1);
document.body.appendChild(renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 50);
const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
renderer.setSize(w, h);

const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);
const ambientLight = new THREE.PointLight(0xffffff);
scene.add(ambientLight);

scene.add(new THREE.AxesHelper(5))

const fiveTone = new THREE.TextureLoader().load("img/fiveTone.jpg");
fiveTone.minFilter = THREE.NearestFilter
fiveTone.magFilter = THREE.NearestFilter

createBackgroundStars(1500);
addCategory();
initCategory();

let composer = new POSTPROCESSING.EffectComposer(renderer);
const effectPass = new POSTPROCESSING.EffectPass(
  camera,
  new POSTPROCESSING.BloomEffect()
);
effectPass.renderToScreen = true;
composer.addPass(effectPass);

const animate = function () {
  requestAnimationFrame(animate);

  composer.render();
  c.time += c.incTime;
  scrollUpdate();
  updateCategory()
  pointLight.position.set(Math.sin(c.time) * 10, Math.cos(c.time) * 10, Math.cos(c.time) * 10);
  composer.render()
  
};
animate();

