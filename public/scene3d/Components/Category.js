const a = new THREE.Vector3(0, 1, 0);

//no arguments; will be initialised to (0, 0, 0)
const b = new THREE.Vector3();

const d = a.distanceTo(b);

class CategoryPlanet {
  constructor(_id, _angle, _direction, _corection) {
    this.pos = new THREE.Vector3();
    this._id = _id;
    this.angle = _angle;
    this.dir = _direction;
    this.dist = 0
    this.cor = _corection
    
  }
   
  init() {
    this.dist = this.id * 10;
  }
  update() {
    this.angle = c.scrollPos+ this.cor
    this.pos.x = this.dist * Math.sin(this.angle) + entity.sun.pos.x
    this.pos.y = this.dist * Math.sin(this.angle)
  }
}

class CategoryMoon {
  constructor(_parent, _dist, _angle, _direction,_corection) {
    this.pos = new THREE.Vector3();
    this.parent = _parent;
    this.dist = _dist;
    this.angle = _angle;
    this.direction = _direction;
    this.cor = _corection
  }
  init() {
    this.pos = this.parent.pos;
    this.pos.x += this.dist;
  }
  update() {
    this.angle = c.scrollPos + this.cor
    this.pos.x = this.dist * Math.sin(this.angle) + entity.sun.pos.x
    this.pos.y = this.dist * Math.sin(this.angle)
  }
}
