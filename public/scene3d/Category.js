const a = new THREE.Vector3(0, 1, 0);

//no arguments; will be initialised to (0, 0, 0)
const b = new THREE.Vector3();

const d = a.distanceTo(b);



function addCategory() {
  for (let i = 0; i < 5; i++) {
    entities.category[i] = new Category(i,1,0);
  }
}

class Category {
  constructor(_id, _direction, _corection) {
    this.pos = new THREE.Vector3(0,RN(0.2),0);
    this.id = _id;
    this.angle;
    this.dir = _direction;
    this.dist = 0;
    this.cor = _corection;
    this.obj;
    this.size = RN(0.4)+0.2
  }
  init() {
    this.dist = (this.id +1) * 10 +20;
    this.angle = RN(1)
    this.cor = this.angle + this.cor;
    const geometry = new THREE.SphereGeometry(this.size, 10, 5);
    const material = new THREE.MeshToonMaterial({ color: "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}) });
    this.obj = new THREE.Mesh(geometry, material);
    scene.add(this.obj);
    console.log(this.obj);
  }
  update() {
    this.angle = c.scrollDist*(1-this.size) + this.cor;
    this.pos.x =  this.dist * Math.sin(this.angle)*0.1
    this.pos.y =  this.dist * Math.cos(this.angle)*0.1

}
  show() {
    if (c.scrollPos !== 0) {
      this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
      console.log(this.pos)
    }
  }
}

class CategoryMoon extends Category {
  constructor(_id, _direction, _corection, _dist) {
    super(_id, _direction, _corection);
    this.dist = _dist;
  }
  init() {
    this.pos = entities.category[this.id];
    this.pos.x += this.dist;
  }
  update() {
    this.angle = c.scrollPos + this.cor;
    this.pos.x = this.dist * Math.sin(this.angle)
    this.pos.y = this.dist * Math.sin(this.angle);
  }
}
