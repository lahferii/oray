window.onload = function(){
    map = document.getElementById("canvas");
    map.width = 400;
    map.height = 400;
    ctx = map.getContext('2d');
    document.addEventListener("keydown", kontrol);
    setInterval(game, 1000/10);
}

ular_x = ular_y = 0;
kepala_x = kepala_y = 0;
buah_x = buah_y = 10;
setmap = ujungmap = 20;
jejak = [];
ekor = 3;
let score = document.getElementById('score');

let btn = {
    kiri: 37,
    atas: 38,
    kanan: 39,
    bawah: 40
}

function kontrol(tmb){
    // horizontal
    if(tmb.keyCode == btn.kiri){
        kepala_x = -1;
        kepala_y = 0;
        
        btn.kanan = false;
    }
    if(tmb.keyCode == btn.kanan){
        kepala_x = 1;
        kepala_y = 0;

        btn.kiri = false;
    }
    if(tmb.keyCode == btn.atas){
        kepala_x = 0;
        kepala_y = -1;

        btn.bawah = false;
    }
    if(tmb.keyCode == btn.bawah){
        kepala_x = 0;
        kepala_y = 1;

        btn.atas = true;
    }
}

function game(){
    ular_x += kepala_x;
    ular_y += kepala_y;

    if(ular_x < 0){
        ular_x = ujungmap;
    }
    if(ular_x > ujungmap){
        ular_x = 0;
    }
    if(ular_y < 0){
        ular_y = ujungmap;
    }
    if(ular_y > ujungmap){
        ular_y = 0;
    }
    ctx.fillStyle = '#444';
    ctx.fillRect(0,0,map.width,map.height);

    ctx.fillStyle = '#fff';
    for(var i = 0; i < jejak.length; i++){ 
        ctx.fillRect( jejak[i].x*setmap, jejak[i].y*setmap, setmap-2, setmap-2 );
        
        if( jejak[i].x == ular_x && jejak[i].y == ular_y ){
            ekor = 3;
            score.innerHTML = 0;
            
        }
    }
    jejak.push({ x:ular_x, y:ular_y });
    while(jejak.length > ekor){
        jejak.shift();
    }
    if(buah_x == ular_x && buah_y == ular_y){
        ekor++;
        score.innerHTML++;
        buah_x = Math.floor(Math.random() * ujungmap);
        buah_y = Math.floor(Math.random() * ujungmap);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(buah_x*setmap, buah_y*setmap, setmap, setmap);
}