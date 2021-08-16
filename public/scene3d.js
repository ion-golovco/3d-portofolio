const w = window.innerWidth;
const h = window.innerHeight;

const stars = [];

class Star {
  constructor() {
    this.x = RN(1000);
    this.y = RN(1000);
    this.z = RN(1000);
    this.size = RN(4);
    this.color = 0xffffff;
  }
}

class ShootingStar extends Star {
  constructor() {
    super();
  }
}
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  div: document.querySelector("#bg"),
});

document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(200, 50);
const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);

let geometry = new THREE.SphereGeometry(0.7, 24, 24);
let material = new THREE.MeshStandardMaterial({ color: 0xffffff });
let sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
scene.add(sphere);

pointLight.position.set(10, 10, 0);

for (let i = 0; i < 2000; i++) {
  stars.push(new Star());
  let star = stars[i];
  const geometry = new THREE.SphereGeometry(star.size, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: star.color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(star.x, star.y, star.z);
  scene.add(sphere);
}

const camera = new THREE.PerspectiveCamera(80, w / h, 1, 1000);
let time = 0;
camera.rotation.y = Math.PI / 2;
let dist = 5;
let pos = 0

renderer.setClearColor(new THREE.Color('#09090a'),1)

const animate = function () {
  renderer.setSize(w, h);
  requestAnimationFrame(animate);
  dist+=pos
  pos*=0.9
  time += 0.005;
  camera.position.z = Math.sin(time) * dist;
  camera.rotation.y -= 0.005;
  camera.position.x = Math.cos(time) * dist;

  window.addEventListener("wheel", onMouseWheel);
  renderer.render(scene, camera);
};
animate();

function onMouseWheel(event) {
  pos = 0.001 * event.deltaY;
}

function RN(value) {
  let res = (Math.random() * 2 - 1) * value;
  return res;
}
