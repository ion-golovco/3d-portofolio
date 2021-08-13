let fov = 0;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  div: document.querySelector("#scene3d"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x0fff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const animate = function () {
  requestAnimationFrame(animate);
  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 5;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  fov += 0.5;

  renderer.render(scene, camera);
};

animate();
