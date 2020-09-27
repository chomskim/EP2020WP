let tokens = [];
let tindex = 0;
let tok = "$";

function getNext() {
  tok = tokens[tindex];
  tindex++;
}
function prefixEval() {
  let result;
  if (!isNaN(tok)) {
    result = parseInt(tok);
    getNext();
    return result;
  } else if (tok === "+") {
    getNext();
    const t1 = prefixEval();
    const t2 = prefixEval();
    return t1 + t2;
  } else if (tok === "-") {
    getNext();
    const t1 = prefixEval();
    const t2 = prefixEval();
    return t1 - t2;
  } else {
    console.log(`Error tok=$tok`);
    return 0;
  }
}
let str1 = "+ - 5 2 4 $";
tokens = str1.split(" ");
console.log(`tokens=[${tokens}]`);
tindex = 0;
getNext();
console.log(`Eval result=${prefixEval()}`);

function exp() {
  let t1 = term();
  while (tok === "+") {
    getNext();
    t1 = t1 + term();
  }
  return t1;
}
function term() {
  let f1 = factor();
  while (tok === "*") {
    getNext();
    f1 = f1 * factor();
  }
  return f1;
}
function factor() {
  let temp;
  if (tok === "(") {
    getNext();
    temp = exp();
    if (tok === ")") {
      getNext();
    } else {
      console.log(`Error tok=$tok`);
    }
  } else if (!isNaN(tok)) {
    temp = parseInt(tok);
    getNext();
  } else {
    console.log(`Error tok=$tok`);
  }
  return temp;
}
str1 = "12 + 3 * ( 4 + 5 ) $";
tokens = str1.split(" ");
console.log(`tokens=[${tokens}]`);
tindex = 0;
getNext();
console.log(`Eval Result=${exp()}`);
