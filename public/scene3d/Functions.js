function scrollUpdate(){
  window.addEventListener("wheel", onMouseWheel);
    if(c.scrollDist<18&&c.scrollPos>0){
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

function createBackgroundStars(n) {
  for (let i = 0; i < n; i++) {
    let s = new Star();
    const geometry = new THREE.SphereGeometry(s.size, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: s.color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(s.pos.x, s.pos.y, s.pos.z);
    scene.add(sphere);
  }
}
function initCategory(){
  for(let i of entities.category){
    i.init();
  }
}
function updateCategory() {
  for(let i of entities.category){
    i.update();
    i.show();
  }
}

function RN(value) {
  return (Math.random() * 2 - 1) * value;
}
