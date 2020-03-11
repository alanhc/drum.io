
let img_bdrum;
let img_cymbals;
let img_drum;
let img_heart;
let randomN;

function initDraw()
{
    img_bdrum = loadImage('assets/bdrum.png');
    img_cymbals = loadImage('assets/cymbals.png');
    img_drum = loadImage('assets/drum.png');
    img_heart = loadImage('assets/heart.png');

}
function drawMain()
{
    createCanvas(windowWidth,windowHeight);
    if (state=='host') background(255,94,72);
    else if (state=='play') background(151,173,172);
    else background(128);
    drawSheet(windowWidth*4/5, windowHeight/2);
}
let footerHeight=50;
function drawSheet(w, h)
{
    if (life<0) socket.close();
    for (let i=0; i<8; i++) {
        for (let j=0; j<5; j++) {
            if (myPattern[j][i]==1) {
                
                let imgW=w/8, imgH=h/8;
                let space=(imgW<imgH)?imgW:imgH;
                if (steps==i) space*=2;
                drawNote(Number(j), 0+i*w/8, windowHeight-h-footerHeight+j*h/5,space,w/8,h/5);
            }
            if(ansPattern[j][i]==1) {
                fill(0,255,0,95)
            } else {
                fill(255,50);
            }
            rect(0+i*w/8, windowHeight-h-footerHeight+j*h/5, w/8, h/5);
        }
    }
    fill(255, 255, 0, 50);
    
    rect(0+steps*w/8, windowHeight-h-footerHeight, w/8, h);
    //tilte
    
    textAlign(CENTER);
    let titleSize=(windowWidth<windowHeight)?windowWidth:windowHeight;
    textSize(windowWidth/10);
    fill(255);
    let s='drum.io';
    let color=[
        [23,44,60],
        [39,72,98],
        [153,80,84],
        [217,104,49],
        [250,179,61],
        [23,44,60],
        [39,72,98],
    ];
    let n=randomColorN;
    for (let i=1; i<=7; i++) {
        fill(color[n]);
        n++;
        n%=7;
        
        text(s[i-1],windowWidth/2/7*i,windowHeight/4);
    }
    
    

    //playerInfoArray
    drawPlayesList();

    //life bar 
    fill(128,0,0);
    rect(0, windowHeight-footerHeight, windowWidth,footerHeight);
    fill(172,231,0);
    rect(0, windowHeight-footerHeight, windowWidth*life/maxLife,footerHeight);
    imageMode(CENTER);
    image(img_heart, windowWidth*life/maxLife-25/2, windowHeight-footerHeight+25,25,25);

    fill(0);
    textAlign(RIGHT);
    text(life+'/'+maxLife,windowWidth/2, windowHeight-footerHeight+25);
    
}
let imgs;
function drawNote(n, x,y, space, w,h)
{
    
    imgs=[img_bdrum, img_cymbals, img_cymbals, img_drum,img_drum ];
    imageMode(CENTER);
    image(imgs[n],x+w/2,y+h/2,space,space);
    //circle(x+windowWidth/16-10,y+windowHeight/16-10, 10)
}
function drawPlayesList()
{
    fill(0);
    textAlign(LEFT);
    textSize(20);
    if (state=='host'||state=='play') text('online: '+players, 10, 60);
    else text('offline', 10, 60);
    
    if (nextHost==myID) {
        fill(255,255,0); rect(8,65, 50,20);
        fill(0);    text('next', 10, 80);
    }
    textAlign(RIGHT);
    for (let i=0; i<playerInfo.length; i++) {
        if (playerInfo[i].name==myID) fill(128,255,128);
        else fill(255,2);
        rect(windowWidth-windowWidth/5,5+i*20,windowWidth/5,20);
        fill(0,255);

        textSize(10);
        text(playerInfo[i].name, windowWidth-30, 20+i*20);
        textSize(16);    
        text(playerInfo[i].life, windowWidth, 20+i*20);
    }
    
}