const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
let deep = 1;
let checked = [];
let unChecked = [];
let counter1 = 0;

function printGrid(arr) {
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(`grid${i}`).style.borderColor = "rgb(124, 124, 124)";
        document.getElementById(`grid${i}`).style.backgroundColor = "rgb(29, 29, 29)";
        if (arr[i] == i + 1) {
            document.getElementById(`grid${i}`).style.color = "white";
        } else {
            document.getElementById(`grid${i}`).style.color = "red";
        }
    }
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(`grid${i}`).innerHTML = arr[i];
    }
    document.getElementById(`grid${arr.indexOf(" ")}`).style.backgroundColor = "rgb(148, 148, 148)";
    document.getElementById(`grid${arr.indexOf(" ")}`).style.borderColor = "rgba(218, 218, 218, 0)";
}

function moveUp(arr, p = 1) {
    let pos = arr.indexOf(" ");
    switch (pos) {
        case 0:
        case 1:
        case 2:
        case 3:
            return 0;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            arr[pos] = arr[pos - 4];
            arr[pos - 4] = " ";
            break;
    }
    if (p == 1) printGrid(arr);
    return arr;
}

function moveDown(arr, p = 1) {
    let pos = arr.indexOf(" ");
    switch (pos) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            arr[pos] = arr[pos + 4];
            arr[pos + 4] = " ";
            break;
        case 12:
        case 13:
        case 14:
        case 15:
            return 0;
    }
    if (p == 1) printGrid(arr);
    return arr;
}

function moveLeft(arr, p = 1) {
    let pos = arr.indexOf(" ");
    switch (pos) {
        case 0:
        case 4:
        case 8:
        case 12:
            return 0;
        case 1:
        case 2:
        case 3:
        case 5:
        case 6:
        case 7:
        case 9:
        case 10:
        case 11:
        case 13:
        case 14:
        case 15:
            arr[pos] = arr[pos - 1];
            arr[pos - 1] = " ";
            break;
    }
    if (p == 1) printGrid(arr);
    return arr;
}

function moveRight(arr, p = 1) {
    let pos = arr.indexOf(" ");
    switch (pos) {
        case 3:
        case 7:
        case 11:
        case 15:
            return 0;
        case 0:
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
        case 8:
        case 9:
        case 10:
        case 12:
        case 13:
        case 14:
            arr[pos] = arr[pos + 1];
            arr[pos + 1] = " ";
            break;
    }
    if (p == 1) printGrid(arr);
    return arr;
}

function shuffle(arr) {
    deep = 1;
    checked = [];
    unChecked = [];
    counter1 = 0;
    for (let i = 0; i < 30; i++) {
        let x = Math.floor(Math.random() * 4);
        switch (x) {
            case 0:
                moveUp(arr, 0);
                break;
            case 1:
                moveDown(arr, 0);
                break;
            case 2:
                moveLeft(arr, 0);
                break;
            case 3:
                moveRight(arr, 0);
                break;
        }
    }
    printGrid(arr);
    document.getElementById("counter1").innerHTML = 0;
    document.getElementById("counter2").innerHTML = 0;
    document.getElementById("counter3").innerHTML = 0;
}

function solverR(arr) {
    var counter1 = 0;
    while (!arraysEqual(arr.slice(0, 5), result.slice(0, 5))) {
        let x = Math.floor(Math.random() * 4);
        switch (x) {
            case 0:
                moveUp(arr, 0);
                break;
            case 1:
                moveDown(arr, 0);
                break;
            case 2:
                moveLeft(arr, 0);
                break;
            case 3:
                moveRight(arr, 0);
                break;
        }
        counter1++;
    }
    printGrid(arr);
    document.getElementById("counter1").innerHTML = counter1;
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function inputer(arr) {
    counter1 = 0;
    let a = document.getElementById("inner").value;
    array = a.split(',').map(function (item) {
        if (item != " ") {
            return parseInt(item, 10);
        } else return item;
    });
    document.getElementById("counter1").innerHTML = counter1;
    printGrid(array);
}

function solver(arr) {
    if (arraysEqual(array.slice(0, 16), result.slice(0, 16))){ 
        document.getElementById("counter3").innerHTML = deep;
        document.getElementById("counter1").innerHTML = counter1;
        return 0;
    }
    if (unChecked.length < 1) {
        let k = [...arr];
        unChecked.push({
            grid: k,
            h: check(arr),
            f: 1
        });
        checked.push(k);
    }
    for (let i = 0; i < unChecked.length; i++) {
        if (JSON.stringify(unChecked[i].grid) == JSON.stringify(arr)) unChecked.splice(i, 1);
    }
    // if(arraysEqual(arr.slice(0, 15), result.slice(0, 15))){

    // }else{
    if (moveLeft(arr, 0)) {
        counter1++;
        let k = [...arr];
        let t = 0;
        for (let i = 0; i < unChecked.length; i++) {
            if(JSON.stringify(unChecked[i].grid) == JSON.stringify(k)) {
                moveRight(arr, 0);
                t++;
                break;
            }
        }
        if(t == 0){
        unChecked.push({
            grid: k,
            h: check2(arr) + check(arr),
            f: deep + 1
        });
        moveRight(arr, 0);
    }
    }
    if (moveUp(arr, 0)) {
        counter1++;
        let k = [...arr];
        let t = 0;
        for (let i = 0; i < unChecked.length; i++) {
            if(JSON.stringify(unChecked[i].grid) == JSON.stringify(k)) {
                moveDown(arr, 0);
                t++;
                break;
            }
        }
        if(t == 0){
        unChecked.push({
            grid: k,
            h: check2(arr) + check(arr),
            f: deep + 1
        });
        moveDown(arr, 0);
    }
    }
    if (moveDown(arr, 0)) {
        counter1++;
        let k = [...arr];
        let t = 0;
        for (let i = 0; i < unChecked.length; i++) {
            if(JSON.stringify(unChecked[i].grid) == JSON.stringify(k)) {
                moveUp(arr, 0);
                t++;
                break;
            }
        }
        if(t==0){
        unChecked.push({
            grid: k,
            h: check2(arr) + check(arr),
            f: deep + 1
        });
        moveUp(arr, 0);
    }
    }
    if (moveRight(arr, 0)) {
        counter1++;
        let k = [...arr];
        let t = 0;
        for (let i = 0; i < unChecked.length; i++) {
            if(JSON.stringify(unChecked[i].grid) == JSON.stringify(k)) {
                moveRight(arr, 0);
                t++;
                break;
            }
        }
        if(t == 0){
        unChecked.push({
            grid: k,
            h: check2(arr) + check(arr),
            f: deep + 1
        });
        moveLeft(arr, 0);
    }
    }

    unChecked = uniq(unChecked);

    let minG = {
        pos: 0,
        val: 9999
    };
    for (let i = 0; i < unChecked.length; i++) {
        if ((minG.val > (unChecked[i].h + unChecked[i].f)) && !was(unChecked[i].grid)) {
            minG = {
                pos: i,
                val: unChecked[i].h + unChecked[i].f
            };
        }
    }
    checked.push(unChecked[minG.pos].grid);
    array = unChecked[minG.pos].grid;
    printGrid(array);
    console.log(check2(unChecked[minG.pos].grid));
    deep = unChecked[minG.pos].f;
    // }
    // console.log(unChecked.length);
    // console.log(unChecked);
    // console.log(checked);
}

function check(arr) {
    let a = 16
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == result[i]) a--;
    }
    return a;
}

function check2(arr) {
    let vSum = 0;
    let hSum = 0;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == i+1) continue;
        if (arr[i] != " ") {
            let item = arr[i];
            let v = 0;
            let h = 0;
            if (item <= 4) {
                if (i < 4) v = 0;
                if (i >= 5 && i < 8) v = 1;
                if (i >= 9 && i < 12) v = 2;
                if (i >= 13 && i < 15) v = 3;
            }
            if (item >= 5 && item <= 8) {
                if (i < 4) v = 1;
                if (i >= 5 && i < 8) v = 0;
                if (i >= 9 && i < 12) v = 1;
                if (i >= 13 && i < 15) v = 2;
            }
            if (item >= 9 && item <= 12) {
                if (i < 4) v = 2;
                if (i >= 5 && i < 8) v = 1;
                if (i >= 9 && i < 12) v = 0;
                if (i >= 13 && i < 15) v = 1;
            }
            if (item >= 13 && item <= 15) {
                if (i < 4) v = 3;
                if (i >= 5 && i < 8) v = 2;
                if (i >= 9 && i < 12) v = 1;
                if (i >= 13 && i < 15) v = 0;
            }
            if(item == 1 || item == 5 || item == 9 || item == 13){
                if(i == 0 || i == 4 || i == 8 || i == 12) h = 0;
                if(i == 1 || i == 5 || i == 9 || i == 13) h = 1;
                if(i == 2 || i == 6 || i == 10 || i == 14) h = 2;
                if(i == 3 || i == 7 || i == 11 || i == 15) h = 3;
            }
            if(item == 2 || item == 6 || item == 10 || item == 14){
                if(i == 0 || i == 4 || i == 8 || i == 12) h = 1;
                if(i == 1 || i == 5 || i == 9 || i == 13) h = 0;
                if(i == 2 || i == 6 || i == 10 || i == 14) h = 1;
                if(i == 3 || i == 7 || i == 11 || i == 15) h = 2;
            }
            if(item == 3 || item == 7 || item == 11 || item == 15){
                if(i == 0 || i == 4 || i == 8 || i == 12) h = 2;
                if(i == 1 || i == 5 || i == 9 || i == 13) h = 1;
                if(i == 2 || i == 6 || i == 10 || i == 14) h = 0;
                if(i == 3 || i == 7 || i == 11 || i == 15) h = 1;
            }
            if(item == 4 || item == 8 || item == 12){
                if(i == 0 || i == 4 || i == 8 || i == 12) h = 3;
                if(i == 1 || i == 5 || i == 9 || i == 13) h = 2;
                if(i == 2 || i == 6 || i == 10 || i == 14) h = 1;
                if(i == 3 || i == 7 || i == 11 || i == 15) h = 0;
            }
            vSum += v;
            hSum += h;
        }
    }
    return vSum + hSum;
}

function was(arr) {
    for (let i = 0; i < checked.length; i++) {
        if (JSON.stringify(checked[i]) == JSON.stringify(arr)) {
            return true;
        }
    }
    return false;
}

function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}