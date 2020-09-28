const f = x => { return { value: x }; }; // Good: f() returns an object
const g = x => ({ value: x }); // Good: g() returns an object
const h = x => { value: x }; // Bad: h() returns nothing
//const i = x => { v: x, w: x }; // Bad: Syntax Error
const obj = {
  x:1,
  y:2,
  f:function(p,q){return p+q},
  g:function(){return this.x+this.y},
  h(){return this.x+this.y},
  f1: ()=>this.x+this.y, // Error
}
console.log(obj.f(1,2));
console.log(obj.g());
console.log(obj.h());
console.log(obj.f1());

let o = {
  // An object o.
  x:1,
  y:2,
  m: function () {
    // Method m of the object.
    let self = this; // Save the "this" value in a variable.
    console.log(this);
    console.log(this === o); // => true: "this" is the object o.
    f(); // Now call the helper function f().
    const g = () => {
      console.log(this);
      console.log(this === o); // true, since arrow functions inherit this
    };
    g();
    const h = function () {
      console.log(this);
      console.log(this === o); // true, since we bound this function to the outer this
    }.bind(this);
    h();
    function f() {
      // A nested function f
      //console.log(this);
      console.log(this === o); // => false: "this" is global or undefined
      console.log(self === o); // => true: self is the outer "this" value.
    }
  },
};
o.m();
