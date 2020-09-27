class Shape {
  computeArea() {}
}
class Circle extends Shape {
  constructor(r) {
    super();
    this.radius = r;
  }
  toString() {
    return `Circle Radius=${this.radius}`;
  }
  computeArea() {
    return Math.PI * this.radius * this.radius;
  }
}
class Rectangle extends Shape {
  constructor(w, h) {
    super();
    this.height = h;
    this.width = w;
  }
  toString() {
    return `Rectangle Width=${this.width}, Height=${this.height}`;
  }
  computeArea() {
    return this.width * this.height;
  }
}
function totalAreas(allShapes) {
  let total = 0.0;
  for (let i = 0; i < allShapes.length; ++i) {
    const s = allShapes[i];
    console.log(`${s.toString()} -- area=${s.computeArea()}`);
    total += s.computeArea();
  }
  return total;
}
let allShapes = [];
allShapes.push(new Rectangle(2, 3));
allShapes.push(new Circle(5));
allShapes.push(new Rectangle(5.0, 5.0));
allShapes.push(new Circle(8.0));
allShapes.push(new Rectangle(9, 9));
allShapes.push(new Circle(0));
allShapes.push(new Rectangle(0, 0));

const tot = totalAreas(allShapes);
console.log(`Total Area = ${tot}`);
