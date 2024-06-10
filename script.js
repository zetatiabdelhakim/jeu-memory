
//body
let cards = [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let cardNow = null;
let time = null;
function change(a,b){
    var x = cards[a];
    cards[a] = cards[b];
    cards[b] = x;
}
function readyCards(){
    for(var i = 0; i <= 1000;i++){
        var a = Math.floor(Math.random()*16 + 1);
        var b = Math.floor(Math.random()*16 + 1);
        change(a, b);
    }
}
function firstClickOnCard(img){
    img.src = `images/${cards[img.id]}.png`; 
    if (cardNow == null) {
        cardNow = img;
    }
}
function hideCard(img){
    img.src = `images/back.png`; 
}

// sounds
var ohh = new Audio('sounds/ohh.mp3');
var yaas = new Audio('sounds/yaas.mp3');
var audioGreen = new Audio('sounds/greenTime.mp3');
audioGreen.loop = true;
var audioRed = new Audio('sounds/redTime.mp3');
audioRed.loop = true;

function secondClickOnCard(first, second){
    firstClickOnCard(second);
    if (cards[first.id] == cards[second.id]){
        cards[first.id] = 0;
        cards[second.id] = 0;
        first.onclick = null;
        second.onclick = null;
    }
    else{
        setTimeout(() => {
            hideCard(first);
            hideCard(second);
        },700)
    }
    cardNow = null;
    if (isWin()){
        var p = document.getElementsByClassName("timing-text")[0];
        timmer = document.getElementById('time');
        p.innerHTML = "-";
        timmer.style.color="black";
        clearInterval(time); 
        document.getElementById("clock").src = "images/PROTEGON logo.png";
        audioGreen.pause();
        audioRed.play();
        setTimeout(()=>{
            theMsj(1)
            yaas.play()
        },30);
    }
}

function isWin(){
    var S = cards.filter(val=>val != 0);
    return S.length == 0;
}

function startCardGame(){
    for(var i = 1; i<=16; i++){
        document.getElementById(`${i}`).onclick = function(){
            if (cardNow !== null && this != cardNow){
                secondClickOnCard(cardNow,this);
            }
            else if (cardNow === null){
                firstClickOnCard(this);
            }
        }
    }
}
function noClickOnCards(){
    for(var i = 1; i<=16; i++){
        document.getElementById(`${i}`).onclick = null;
    }
}
function changeInterval() {
    clearInterval(time); 
    time = setInterval(timePlusPlus, 100);
}
function startTime(){
    time = setInterval(timePlusPlus, 1000);
}
function timePlusPlus(){
    timmer = document.getElementById('time');
    var p = document.getElementsByClassName("timing-text")[0];
    var s = parseFloat(timmer.innerText);
    audioGreen.play();
    if(s<=0){
        audioRed.pause();
        audioGreen.pause();
        p.innerHTML = "-";
        timmer.style.color="black";
        clearInterval(time); 
        document.getElementById("clock").src = "images/PROTEGON logo.png"
        setTimeout(()=>{
        theMsj(0)
        ohh.play();
    }   ,30);
        noClickOnCards();
    }
    else if(s<10){
        audioGreen.pause();
        audioRed.play();
        if(p.style.color != "red")
            changeInterval()
        p.style.color="red";
        timmer.innerText = (s-0.1).toFixed(1);
    }
    else{
        timmer.innerText = (s-1);
    }

}

function changeToRestart(){
    var start = document.getElementById("start");
    start.innerHTML = "Restart";
    start.onclick = function(){
        window.location.href = window.location.href.split("?v=")[0] + `?v=${document.getElementById("setTime").value}`;
    }
}


document.getElementById("start").onclick = async function(){
    await getReady();
    ready = document.getElementsByClassName("compt")[0].style.transform = "scale(0)";
    changeToRestart();
    document.getElementById("clock").src = "images/WAIT GIF.gif"
    document.getElementById("setTime").disabled = true;
    readyCards();
    startTime();
    startCardGame();
}
function timeSetChange(){
    let level = document.getElementById("level");
    let value = document.getElementById("setTime").value;
    document.getElementById('time').innerHTML = value;
    if(value > 60){
        level.innerHTML = "Easy";
        level.style.color = "green";
    }else if( value > 35){
        level.innerHTML = "Medium";
        level.style.color = "blue";
    }else{
        level.innerHTML = "Hard";
        level.style.color = "red";
    }

} 
function getReady() {
    return new Promise((resolve, reject) => {
        var ready = document.getElementsByClassName("compt")[0];
    ready.style.transform = "scale(1)";
    setTimeout(function(){
        ready.innerHTML = "Get Ready !";
        ready.style.fontSize = "11em";
    },1000)
    setTimeout(function(){
        ready.innerHTML = "Get Readyyy !!";
        ready.style.fontSize = "14em";
    },2300)
    setTimeout(function(){
        ready.style.color = "green";
        ready.innerHTML = "Gooo";
        ready.style.fontSize = "12em";
        audiogo.play();
    },4000)
    setTimeout(()=>{resolve('Start')},5100)
    var audio = new Audio('sounds/getReady.mp3');
    var audiogo = new Audio('sounds/go.mp3');
    audio.play();
    });
}

// initialitation
let timeVal = window.location.href.split("?v=")[1];
document.getElementById("setTime").value = timeVal;
timeSetChange();

//end

document.getElementById("setTime").oninput = timeSetChange;


document.getElementById("restart").onclick = function(){
    window.location.href = window.location.href.split("?v=")[0] + `?v=${document.getElementById("setTime").value}`;
}
function theMsj(msj){
    audioGreen.pause();
    audioRed.pause();
    document.getElementsByClassName("end-c")[0].style.transform = "scale(1)";
    var info = document.getElementById("end");
    if(msj === 0){
        info.innerHTML = "OOOHH";
        info.style.color = "rgb(75, 16, 16)";
        info.style.backgroundImage = "linear-gradient(to right, #ff0000 0%, #f06969 50%, #ff0000 100%)";
    }
    else{
        info.innerHTML = "YAAAS!";
        info.style.color = "rgb(16, 75, 19);";
        info.style.backgroundImage = "linear-gradient(to right, #00ff00 0%, #7fb990 50%, #00ff00 100%)";
    }
}

// decoration
function cardsPlaces(){
    for(var i = 1; i<=70; i++){
        var img = document.getElementById(`d${i}`)
        var a = Math.floor(Math.random()*93 + 3);
        var b = Math.floor(Math.random()*87 + 3);
        while(a > 32 && a < 68){
            a = Math.floor(Math.random()*93 + 3);
        }
        img.style.left=a+'%';
        img.style.top=b+'%';
    }
}
cardsPlaces()
setInterval(cardsPlaces,9000)