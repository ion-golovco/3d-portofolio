function scrollUpdate(){
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
    c.stars.push(new Star());
    let s = c.stars[i];
    const geometry = new THREE.SphereGeometry(s.size, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: s.color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(s.pos.x, s.pos.y, s.pos.z);
    scene.add(sphere);
  }
}
function RN(value) {
  let res = (Math.random() * 2 - 1) * value;
  return res;
}