const a = new THREE.Vector3(0, 1, 0);

//no arguments; will be initialised to (0, 0, 0)
const b = new THREE.Vector3();

const d = a.distanceTo(b);

class CategoryPlanet {
  constructor(_id,_angle, _direction) {
    this.pos = new THREE.Vector3();
    this._id = _id;
    this.angle = _angle;
    this.dir = _direction;
  }
  init(){
  this.pos = this.pos
      //gets corect angle and direction
  }
  update(){
    this.angle += c.inc*this.dir

    this.pos = this.pos
      //Updates position when scrolling
  }
}

class CategoryMoon {
  constructor(_parent, _dist, _angle, _direction) {
    this.pos = new THREE.Vector3();
    this.parent = _parent
    this.dist = _dist
    this.angle = _angle;
    this.direction = _direction;
  }
  init(){
    this.pos = this.parent.pos
    this.pos.x += this.dist
  }
  update(){

  }
}
