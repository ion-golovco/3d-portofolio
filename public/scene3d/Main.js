
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  div: document.querySelector("#bg"),
});
renderer.setClearColor(new THREE.Color("#050505"), 1);
document.body.appendChild(renderer.domElement);


const gridHelper = new THREE.GridHelper(200, 50);
const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);

let c = {
    scrollDist:10,
    time:0,
    scrollPos:0,
}

createBackgroundStars(1500);
class trailShootingStar {
  constructor(_pos, _index) {
    this.pos = _pos;
    this.size = (-(0.0004*Math.pow(_index,2))+0.08*_index)/50
    this.color = `rgb(${_index}, ${_index}, ${_index})`
  }
}

const geometry = new THREE.SphereGeometry(sStar.size, 24, 24);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const sStarObj = new THREE.Mesh(geometry, material);
scene.add(sStarObj);

const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, w / h, 1, 1000);
renderer.setSize(w, h);

const animate = function () {
  requestAnimationFrame(animate);
  time += inc;
  scrollUpdate();

  pointLight.position.set(Math.sin(time) * 10, Math.cos(time) * 1, 0);
  window.addEventListener("wheel", onMouseWheel);
  renderer.render(scene, camera);
};
animate();
function scrollUpdate(){
    if(c.scrollDist<15&&c.scrollPos>0){
        c.scrollDist += c.scrollPos;
      }else if(c.scrollDist>-100&&c.scrollPos<0){
        c.scrollDist += c.scrollPos;
      }
    c.scrollPos *= 0.9;
    camera.position.z = c.scrollDist;
}
function onMouseWheel(event) {
 c.scrollPos = -0.001 * event.deltaY;
}