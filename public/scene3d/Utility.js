let c = {
  scrollDist:10,
  time:0,
  scrollPos:0,
  inc:0.005,
  stars:[],
}

class Star {
  constructor() {
    this.pos = new THREE.Vector3(RN(20), RN(20), RN(1));
    this.size = RN(0.044);
    this.color = 0xffffff;
  }
}