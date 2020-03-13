
let socket;

function preload() 
{
    initPlayer();
}

let players;
let hostPlayer;
let nextHost;
let nowbeat;
let steps;
let life;
let playerInfo;


function setup()
{
    randomColorN=0;
    playerInfo=[];
    maxLife=100;
    lost=0;
    life=100;
    players=0;
    hostPlayer="";
    socket = io('http://0.0.0.0:3000');
    socket.on('player join', (playersIn, hostPlayerIn)=>{
        players=playersIn;
        hostPlayer=hostPlayerIn;
    });
    socket.emit('check info');
    socket.on('reply info', (nowbeatIn, playersIn, hostPlayerIn, nextHostIn)=>{
     
        
        playBeat(steps, myPattern);
        playBeat(steps, ansPattern);
        nowbeat=nowbeatIn;
        players=playersIn;
        hostPlayer=hostPlayerIn;
        nextHost=nextHostIn;
        steps=nowbeat%8;
        if (myID==hostPlayer) {
            if (nowbeat==0) clearPattern(3);
            socket.emit('send pattern', myPattern);
           
            
        } else if (myID!=hostPlayer && nowbeat==0) {
            clearPattern(3);
        } 
        checkPattern();
        randomColorN=Math.floor(Math.random() * 6) + 1  ;
        
    });
    socket.on('answer pattern', (patternIn)=>{
        ansPattern=patternIn;
    });
    socket.on('update data', (points, playerListWithScoreIn)=>{
        if (state=='host') life+=points;
        playerInfo=playerListWithScoreIn;
    });
    initDraw();
    init_gui_layout();
    
    /*
        由於p5.js serial的運作原理也是使用socket的方式，
        同時使用會導致效能覆載不了，故移除serial的功能
        initSerial();
    */
}

let myID;
let state;
function draw()
{
    
    
    myID=socket.id;
    
    if (myID==hostPlayer) state='host';
    else if(myID!=null&&hostPlayer!=null) state='play';
    else state='server down';
    
    drawMain();
    gui_layout();
}
function clearPattern(n)
{
    switch(n) {
        default:
            
            myPattern= [
                [0,0,0,0,0,0,0,0], //bd
                [0,0,0,0,0,0,0,0], //cr
                [0,0,0,0,0,0,0,0], //hh
                [0,0,0,0,0,0,0,0], //t1
                [0,0,0,0,0,0,0,0], //t2
            ];
            ansPattern= [
                [0,0,0,0,0,0,0,0], //bd
                [0,0,0,0,0,0,0,0], //cr
                [0,0,0,0,0,0,0,0], //hh
                [0,0,0,0,0,0,0,0], //t1
                [0,0,0,0,0,0,0,0], //t2
            ];
        break; case 1:
            myPattern= [
                [0,0,0,0,0,0,0,0], //bd
                [0,0,0,0,0,0,0,0], //cr
                [0,0,0,0,0,0,0,0], //hh
                [0,0,0,0,0,0,0,0], //t1
                [0,0,0,0,0,0,0,0], //t2
            ];
        break; case 2:
            ansPattern= [
                [0,0,0,0,0,0,0,0], //bd
                [0,0,0,0,0,0,0,0], //cr
                [0,0,0,0,0,0,0,0], //hh
                [0,0,0,0,0,0,0,0], //t1
                [0,0,0,0,0,0,0,0], //t2
            ];

    }
    
}
let lost;
let maxLife;

function checkPattern()
{
   
    if (life>100 && nowbeat==0) {maxLife=life}
    for (let i=0; i<5; i++) {
        let checkStep=steps-1;
        if (checkStep<0) checkStep=15;
        if (state=='play'&&ansPattern[i][checkStep]!=myPattern[i][checkStep]) {
            lost++;
            

        }
    }
    lost*=1;
    life-=lost;
    socket.emit('upload data', lost, socket.id, life);
    lost=0;
}