let c = {
  scrollDist:10,
  scrollPos:0,
  
  time:0,
  incTime:0.005,
}

let entities = {
  category:[],
  categoryMoon:[],
}


class Star {
  constructor() {
    this.pos = new THREE.Vector3(RN(20), RN(20), RN(1));
    this.size = RN(0.044);
    this.color = 0xffffff;
  }
}