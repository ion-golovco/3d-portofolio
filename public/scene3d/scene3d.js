const stars = [];
const trailShootingStarArr = [];
const trailShootingStarObjArr = [];
let inc = 0.001;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  div: document.querySelector("#bg"),
});
renderer.setClearColor(new THREE.Color("#050505"), 1);
document.body.appendChild(renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 50);
const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);

class Star {
  constructor() {
    this.pos = new THREE.Vector3(RN(20), RN(20), RN(1));
    this.size = RN(0.044);
    this.color = 0xffffff;
  }
}

let dist = 10;
let pos = 0;
let time = 0;

const lifeShootingStar = 200;
createBackgroundStars(1500);
class ShootingStar {
  constructor(_life) {
    this.pos = new THREE.Vector3(RN(10), RN(5), RN(1));
    this.vel = new THREE.Vector3(RN(0.1), RN(0.1),RN(0.1));
    this.acl = new THREE.Vector3(RN(0.0008), RN(0.0008),RN(0.0008));
    this.size = 0.1;
    this.life = _life;
  }
  update() {
    this.pos.add(this.vel)
    this.vel.add(this.acl)
    this.acl.multiplyScalar(0.9)
  }
}
class trailShootingStar {
  constructor(_pos, _index) {
    this.pos = _pos;
    this.size = (-(0.0004*Math.pow(_index,2))+0.08*_index)/50
    this.color = `rgb(${_index}, ${_index}, ${_index})`
  }
}
for (let i = 0; i < lifeShootingStar; i++) {
  trailShootingStarArr.push(new trailShootingStar(new THREE.Vector3(10,10,1), i));
  const geometry = new THREE.SphereGeometry(trailShootingStarArr[i].size, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: trailShootingStarArr[i].color });
  trailShootingStarObjArr[i] = new THREE.Mesh(geometry, material);
  scene.add(trailShootingStarObjArr[i]);
}

let sStar = new ShootingStar(9999);
const geometry = new THREE.SphereGeometry(sStar.size, 24, 24);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const sStarObj = new THREE.Mesh(geometry, material);
scene.add(sStarObj);

const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(40, w / h, 1, 1000);
renderer.setSize(w, h);

const animate = function () {

  requestAnimationFrame(animate);
  time += inc;
  dist += pos;
  pos *= 0.9;
  camera.position.z = dist;
  camera.rotation.z += 0.00005;
  pointLight.position.set(Math.sin(time) * 10, Math.cos(time) * 1, 0);

  sStar.life += 1;
  if (sStar.life > lifeShootingStar) {
    sStar = new ShootingStar(0);
  }
  sStar.update();
  sStarObj.position.set(sStar.pos.x, sStar.pos.y, sStar.pos.z);

  trailShootingStarObjArr[sStar.life].position.set(sStar.pos.x, sStar.pos.y, sStar.pos.z)

  window.addEventListener("wheel", onMouseWheel);
  renderer.render(scene, camera);
};
animate();

function onMouseWheel(event) {
  pos = -0.001 * event.deltaY;
}
function RN(value) {
  let res = (Math.random() * 2 - 1) * value;
  return res;
}
function createBackgroundStars(n) {
  for (let i = 0; i < n; i++) {
    stars.push(new Star());
    let s = stars[i];
    const geometry = new THREE.SphereGeometry(s.size, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: s.color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(s.pos.x, s.pos.y, s.pos.z);
    scene.add(sphere);
  }
}
