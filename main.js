// Intruksi Start
const afterload = document.getElementById('petunjuk');
const play = document.getElementById('play');

play.addEventListener('click', function(){
    afterload.classList.remove('flex');
    afterload.classList.add('hidden');
});
// Intruksi End

window.onload = function(){
    map = document.getElementById("canvas");
    map.width = 400;
    map.height = 400;
    ctx = map.getContext('2d');
    document.addEventListener("keydown", kontrol);
    setInterval(game, 1000/5);
}

ularX = ularY = 10;
kepalaX = kepalaY = 0;
setmap = ujungmap = 20;
buahX = buahY = Math.floor(Math.random()*setmap);
jejak = [];
ekor = 3;
let score = document.getElementById('score');
let theme = new Audio('aset/theme.mp3');
let aaa = new Audio('aset/tes.mp3');

function show(){
    let username = document.getElementById('username').value;
    return username;
}


let btn = {
    kiri: 65,
    atas: 87,
    kanan: 68,
    bawah: 83
}

function kontrol(tmb){
    // horizontal
    if(tmb.keyCode == btn.kiri){
        if(kepalaX == 1){
            return;
        }else{
            kepalaX = -1;
            kepalaY = 0;
        }
    }
    if(tmb.keyCode == btn.kanan){
        if(kepalaX == -1){
            return;
        }else{
            kepalaX = 1;
            kepalaY = 0;
        }
    }
    if(tmb.keyCode == btn.atas){
        if(kepalaY == 1){
            return;
        }else{
            kepalaX = 0;
            kepalaY = -1;
        }
    }
    if(tmb.keyCode == btn.bawah){
        if(kepalaY == -1){
            return;
        }else{
            kepalaX = 0;
            kepalaY = 1;
        }
    }
}

function game(){
    ularX += kepalaX;
    ularY += kepalaY;

    if(ularX < 0){
        ularX = ujungmap-1;
    }
    if(ularX > ujungmap-1){
        ularX = 0;
    }
    if(ularY < 0){
        ularY = ujungmap-1;
    }
    if(ularY > ujungmap-1){
        ularY = 0;
    }
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0,0,map.width,map.height);

    ctx.fillStyle = '#444';
    for(var i = 0; i < jejak.length; i++){ 
        theme.play();
        ctx.fillRect( jejak[i].x*setmap, jejak[i].y*setmap, setmap-2, setmap-2 );
        
        if( jejak[i].x == ularX && jejak[i].y == ularY ){
            if(kepalaX == 0 && kepalaY == 0){
                return;
            }else{
                ekor = 3;
                alert('Yahh, '+ username.value +' baru nyampe '+score.innerHTML+' point:(');
                score.innerHTML = 0;
                document.location = 'index.html';
            }
        }
    }
    jejak.push({ x:ularX, y:ularY });
    while(jejak.length > ekor){
        jejak.shift();
    }
    if(buahX == ularX && buahY == ularY){
        aaa.play();
        ekor++;
        score.innerHTML++;
        buahX = Math.floor(Math.random() * ujungmap);
        buahY = Math.floor(Math.random() * ujungmap);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(buahX*setmap, buahY*setmap, setmap, setmap);
}