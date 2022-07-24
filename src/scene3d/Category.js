import * as THREE from "three";

import { c, entities } from "./Utility";
import { RN } from "./Functions";
import { scene } from "./Main";

export function addCategory() {
  entities.category[0] = new Category(0, 2, 95);
  entities.category[1] = new Category(1, 4, 85);
  entities.category[2] = new Category(2, 2, 280);
  entities.category[3] = new Category(3, 5, 60);
}


//add cool structures to category planets
export class Category {
  constructor(_id, _size, _corection) {
    this.pos = new THREE.Vector3(0, 0, 0);
    this.id = _id;
    this.angle = 0;
    this.dist = 0;
    this.cor = _corection;
    this.obj = {};
    this.size = _size
  }
  init() {
    this.dist = (this.id + 1) * 25;
    this.cor = this.angle + this.cor;

    let geometry = new THREE.SphereGeometry(this.size, 9, 9);

    const material = new THREE.MeshStandardMaterial({
      color: "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      }),
    });

    this.obj = new THREE.Mesh(geometry, material);
    scene.add(this.obj);
  }
  update() {
    this.angle = c.scrollDist * (6-this.size) + this.cor;
    this.pos.x = this.dist * Math.sin(this.angle * 0.001);
    this.pos.z = -this.dist * Math.cos(this.angle * 0.001);
  
  }
  show() {
    if (c.scrollDist !== 0) {
      this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
    }
  }
}


export class Star {
  // create constelations using this
  /**
   * const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    scene.add( line );
   */
  constructor( _index ) {
    // use index to make stars close to each other
    this.pos = new THREE.Vector3(RN(20), RN(4), RN(120));
    this.size = RN(0.044);
    this.color = 0xffffff;
  }
}
