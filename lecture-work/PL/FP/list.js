let a = [2, 4, 6, 8, 10];
console.log(`a=[${a}]`);
console.log(`a.head()=${a[0]}`);
console.log(`a.tail()=${a.slice(1)}`);
console.log(`a.last()=${a[a.length - 1]}`);

console.log(`a.map(x=>x*x)=[${a.map((x) => x * x)}]`);

function gt3(x) {
  return x > 3;
}
const le4 = (x) => x <= 4;
a = [1, 2, 3, 4, 5];
console.log(`a=[${a}]`);
console.log(`a.filter(x=>x%2===0)=[${a.filter((x) => x % 2 === 0)}]`);
console.log(`a.filter(gt3)=[${a.filter(gt3)}]`);
console.log(`a.filter(le4)=[${a.filter(le4)}]`);

console.log(`a.reduce((x,y)=>x+y, 0)=${a.reduce((x, y) => x + y, 0)}`);
console.log(`a.reduce((x,y)=>x*y, 1)=${a.reduce((x, y) => x * y, 1)}`);
console.log(`a.reduce((x,y)=>x.concat(y), [])=[${a.reduce((x, y) => x.concat(y), [])}]`);

function zip(L1, L2, f) {
  return L1.map((l1, i) => f(l1, L2[i]));
}
console.log(`zip([1,3,5],[6,4,2],(x,y)=>x+y)=[${zip([1, 3, 5], [6, 4, 2], (x, y) => x + y)}]`);
console.log(`zip([1,3,5],[6,4,2],(x,y)=>x>y)=[${zip([1, 3, 5], [6, 4, 2], (x, y) => x > y)}]`);
///*
function quickSort(list, comp) {
  if (list.length <= 1) return list;
  else {
    const piv = list[0]; // list.head()
    const low = list.filter((it) => comp(it, piv) < 0);
    const eql = list.filter((it) => comp(it, piv) === 0);
    const high = list.filter((it) => comp(it, piv) > 0);
    return quickSort(low, comp).concat(eql, quickSort(high, comp));
  }
}
console.log(
  `quickSort([100,2,4,6,1,3,5,4,99],(x,y)=>x-y)=[${quickSort([100, 2, 4, 6, 1, 3, 5, 4, 99], (x, y) => x - y)}]`
);

const listComp = (xl, yl) => {
  if ((xl == null && yl == null) || (xl.length === 0 && yl.length === 0)) return 0;
  else if (xl == null || xl.length === 0) return -1;
  else if (yl == null || yl.length === 0) return 1;
  else {
    xh = xl[0];
    yh = yl[0];
    if (xh === yh) return listComp(xl.slice(1), yl.slice(1));
    else return xh - yh;
  }
};

const listToSort = [
  [1, 5, 4, 3, 2, 1],
  [1, 6, 4, 3, 2, 1],
  [1, 6, 5, 3, 2, 1],
  [1, 13, 12, 7, 5, 1],
  [2, 1, 4, 3, 2],
  [2, 13, 11, 8, 6],
  [2, 13, 11, 8, 7],
  [3, 2, 1, 3],
  [3, 13, 12, 11],
  [3, 13, 12, 9],
  [4, 1, 3, 2],
  [4, 13, 12, 11],
  [4, 13, 12, 8],
  [5, 1, 2],
  [5, 13, 12],
  [5, 13, 11],
  [6, 1, 2],
  [6, 13, 12],
  [6, 13, 1],
];
console.log(`quickSort(listToSort, listComp)=${JSON.stringify(quickSort(listToSort, listComp))}`);

const [A, K, Q, J] = [1, 13, 12, 11];
cardList = [
  [A, 2, 3, 4, 5],
  [A, 2, 3, 4, 6],
  [A, 2, 3, 5, 6],
  [A, 5, 7, Q, K],
  [A, A, 2, 3, 4],
  [6, 8, J, K, K],
  [7, 8, J, K, K],
  [A, A, 2, 2, 3],
  [Q, Q, J, K, K],
  [9, Q, Q, K, K],
  [A, A, A, 2, 3],
  [Q, J, K, K, K],
  [8, Q, K, K, K],
  [A, A, A, 2, 2],
  [Q, Q, K, K, K],
  [J, J, K, K, K],
  [A, A, A, A, 2],
  [Q, K, K, K, K],
  [A, K, K, K, K],
];
console.log(`quickSort(cardList, listComp)=${JSON.stringify(quickSort(cardList, listComp))}`);
//*/