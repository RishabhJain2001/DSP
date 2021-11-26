let sub = document.querySelector("#Submit");
let number;
let nValue = document.querySelector('.N-value');
let datas = document.querySelector('.data');
let con = document.querySelector('.content');
var input = document.createElement("input");
let submitInput = document.createElement("input");
let sequence = [];
var paragraph = document.querySelector(".dft");


sub.addEventListener("click", function() {
    let N = document.querySelector('#number');
    number = N.value;
    nValue.innerHTML = "N = " + N.value;
    con.innerHTML = "Enter " + N.value + " sequence ";
    input.type = "text";
    input.className = "get-sequence"; // set the CSS class
    con.appendChild(input);
    con.appendChild(document.createElement("br"));
    submitInput.type = "button";
    submitInput.value = "Submit";
    submitInput.className = "submit-sequence"; // set the CSS class
    con.appendChild(submitInput);
    let submitSequence = document.querySelector(".submit-sequence");
    submitSequence.addEventListener("click", function() {
        let count = 0;
        for (let i = 0; i < input.value.length; i++) {
            if (input.value[i] !== ',' && input.value[i] !== ' ') {
                sequence[count++] = input.value[i];
            }
        }
        main();
    })
})


function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

function transpose(array) {
    return array.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])
    ), []);
}



function main() {

    paragraph.innerHTML = "";


    document.querySelector('.sequenc').innerHTML = "x[n] = " + sequence;
    let N = sequence.length;

    let arr1 = [];
    let arr2 = [];
    for (let i = 0; i < N; i++) {
        let a = [];
        let b = [];
        for (let j = 0; j < N; j++) {
            let x = (2 * (Math.PI) * i * j) / N;
            //a[j] = (sequence[i] * (Math.round(Math.cos(x)))) + '   ' + ((sequence[i] * (Math.round(Math.sin(x)))) * -1) + 'j';
            //console.log(a[j]);
            a[j] = (sequence[i] * ((Math.cos(x)).toFixed(2)));
            b[j] = ((sequence[i] * ((Math.sin(x)).toFixed(2))) * -1);
        }
        arr1[i] = a;
        arr2[i] = b;
    }

    let answer1 = [];
    let answer2 = [];

    arr1 = transpose(arr1);
    arr2 = transpose(arr2);
    for (let i = 0; i < N; i++) {
        let x1 = 0;
        let x2 = 0;
        for (let j = 0; j < N; j++) {
            x1 += arr1[i][j];
            x2 += arr2[i][j];
        }
        answer1[i] = x1;
        answer2[i] = x2;
    }
    console.log(answer1);
    console.log(answer2);
    console.log(arr2);

    document.querySelector('.N').innerHTML = "N = " + N;
    for (let i = 0; i < N; i++) {
        if (answer2[i] === 0)
            var text = document.createTextNode(answer1[i] + ' , ');
        else if (answer2[i] > 0) {
            var text = document.createTextNode(answer1[i] + " + " + answer2[i] + "j" + ' , ');

        } else
            var text = document.createTextNode(answer1[i] + " " + answer2[i] + "j" + ' , ');

        paragraph.appendChild(text);
        let brk = document.createElement("div")
        brk.className = "dividing"
        paragraph.appendChild(brk);
    }
}