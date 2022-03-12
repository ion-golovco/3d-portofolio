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
createBackgroundStars(1500);

const animate = function () {
  requestAnimationFrame(animate);
  c.time += c.inc;
  scrollUpdate();
  pointLight.position.set(Math.sin(c.time) * 10, Math.cos(c.time) * 10, Math.cos(c.time) * 10);
  renderer.render(scene, camera);
   
};
animate();

