const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  div: document.querySelector("#bg"),
});
renderer.setClearColor(new THREE.Color("#050505"), 1);
document.body.appendChild(renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 50);
const camera = new THREE.PerspectiveCamera(30, c.w / c.h, 1, 1000);
renderer.setSize(c.w, c.h);

const animate = function () {
  requestAnimationFrame(animate);
  c.time += c.inc;
  scrollUpdate();

  window.addEventListener("wheel", onMouseWheel);
  renderer.render(scene, camera);
};
animate();

