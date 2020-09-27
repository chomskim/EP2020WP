let s1 = "Hello ";
let s2 = "World!";
let s3 = "Earth!";
let s4 = s1 + s2;
console.log(`s4=${s4}`);
s2 = s3;
console.log(`s4=${s4}`); // s2를 s3로 바꿔도 s4는 변하지 않는다
s4 = s1 + s3;
console.log(`s4=${s4}`);

class StringBuilder {
  constructor(str) {
    this.buf = str.split("");
  }
  toString() {
    return this.buf.join("");
  }
  append(right) {
    if (typeof right === "string") this.buf = this.buf.concat(right.split(""));
    else if (right instanceof StringBuilder)
      this.buf = this.buf.concat(right.buf);
  }
}
s1 = new StringBuilder("Hello ");
s2 = new StringBuilder("World!");
console.log(`s1=${s1.toString()}`);
console.log(`s2=${s2.toString()}`);

s3 = s1;
s1.append(s2);
console.log(`s1=${s1.toString()}`);
console.log(`s3=${s3.toString()}`); // s1이 변하면 s3도 변한다
s1.append("+Earth");
console.log(`s1=${s1.toString()}`);
console.log(`s3=${s3.toString()}`); // s1이 변하면 s3도 변한다
