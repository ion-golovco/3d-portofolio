const w = window.innerWidth;
const h = window.innerHeight;

const stars = [];
let inc = 0.001

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({div: document.querySelector("#bg"),});
renderer.setClearColor(new THREE.Color("#050505"), 1);
document.body.appendChild(renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 50);
const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);
const camera = new THREE.PerspectiveCamera(80, w / h, 1, 1000);

class Star {
  constructor() {
    this.pos = new THREE.Vector3(RN(20),RN(20),RN(1))
    this.size = RN(0.044);
    this.color = 0xffffff;
  }
}

let dist = 10;
let pos = 0;
let time = 0;
const lifeShootingStar = 120
createBackgroundStars();
class ShootingStar {
  constructor(_life) {
    this.pos = new THREE.Vector3(RN(20), RN(10), RN(1));
    this.vel = new THREE.Vector2(RN(0.5), RN(0.5));
    this.acl = new THREE.Vector2(RN(0.05), RN(0.05));
    this.size = RN(1);
    this.life = _life;
    this.history = []
  }
  update(){
    this.history[this.life] = (new THREE.Vector2(this.pos.x,this.pos.y))
    this.pos.x+= this.vel.x
    this.pos.y+= this.vel.y
    this.vel.x+= this.acl.x
    this.vel.y+= this.acl.y
    this.acl.x*=0.9
    this.acl.y*=0.9
  };
}

let sStar = new ShootingStar(9999);
const geometry = new THREE.SphereGeometry(sStar.size, 24, 24);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
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

  sStar.update()
  sphere.position.set(sStar.pos.x, sStar.pos.y, sStar.pos.z);

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
function createBackgroundStars(){
  for (let i = 0; i < 2000; i++) {
    stars.push(new Star());
    let s = stars[i];
    const geometry = new THREE.SphereGeometry(s.size, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: s.color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(s.pos.x,s.pos.y,s.pos.z);
    scene.add(sphere);
  }
}

