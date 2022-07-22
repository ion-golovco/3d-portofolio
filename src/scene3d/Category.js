import * as THREE from 'three';

import {c, entities} from "./Utility"
import {randomSpherePosition, RN} from "./Functions"
import { fiveTone, scene } from './Main';

export function addCategory() {
  for (let i = 0; i < 5; i++) {
    entities.category[i] = new Category(i, -1, 0);
  }
}

export class Category {
  constructor(_id, _direction, _corection) {
    this.pos = new THREE.Vector3(0, RN(0.2), 0);
    this.id = _id;
    this.angle = 0;
    this.dir = _direction;
    this.dist = 0;
    this.cor = _corection;
    this.obj = {};
    this.size = 4 + RN(2);
  }
  init() {
    this.dist = (this.id + 1) * 20 + 0;
    this.angle = RN(1);
    this.cor = this.angle + this.cor;

    let geometry = new THREE.SphereGeometry(this.size, 10, 5);
    const material = new THREE.MeshToonMaterial({
      color: "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      }),
      gradientMap: fiveTone
    });
  
    this.obj = new THREE.Mesh(geometry, material);
    scene.add(this.obj);
    
  }
  update() {
    this.angle = (c.scrollDist) * (6 - this.size) + this.cor;
    this.pos.x = this.dist * Math.sin(this.angle*0.4)
    this.pos.z = -50+(this.dist * Math.cos(this.angle*0.4))
  }
  show() {
    if (c.scrollPos !== 0) {
      this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
    }
  }
}
export class Star {
  constructor() {
    this.pos = randomSpherePosition();
    this.size = RN(0.044);
    this.color = 0xffffff;
  }
}