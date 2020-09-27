// String Reverse
function reverse(str) {
  if (str.length === 0 || str.length === 1) {
    return str;
  } else {
    return reverse(str.substring(1)) + str[0];
  }
}

function rev(s1, s2) {
  // Tail Recursion
  if (s2.length === 0) return s1;
  else {
    return rev(s2[0] + s1, s2.substring(1));
  }
}
function reverse1(str) {
  return rev("", str);
}

let s1 = "Hello World!";
console.log(`s1 length=${s1.length}`);
let s2 = "blah blah blah";

console.log(`rev1 s1 ${reverse(s1)}`);
console.log(`rev2 s1 ${reverse1(s1)}`);

console.log(`rev1 s2 ${reverse(s2)}`);
console.log(`rev2 s2 ${reverse1(s2)}`);

//List Reverse
function reverseList(list) {
  if (list.length === 0) return [];
  else {
    const head = list[0];
    const tail = list.slice(1);
    const res = reverseList(tail);
    res.push(head);
    return res;
  }
}
// Todo Tail Recursive List Reverse
let li = [1, 2, 3, 4];
console.log(`reverse ${li} = ${reverseList(li)}`);
