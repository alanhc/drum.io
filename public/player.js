let myPattern = [
    [0,0,0,0,0,0,0,0], //bd
    [0,0,0,0,0,0,0,0], //cr
    [0,0,0,0,0,0,0,0], //hh
    [0,0,0,0,0,0,0,0], //t1
    [0,0,0,0,0,0,0,0], //t2
]
let ansPattern = [
    [0,0,0,0,0,0,0,0], //bd
    [0,0,0,0,0,0,0,0], //cr
    [0,0,0,0,0,0,0,0], //hh
    [0,0,0,0,0,0,0,0], //t1
    [0,0,0,0,0,0,0,0], //t2
]

let bdrum;
let crash;
let hh_c;
let tom1;
let tom2;

//let totalBeat=0;
//Tone.Transport.scheduleRepeat(playBeat, "0.5s");
Tone.Buffer.on('load', play);



function initPlayer()
{
    bdrum = new Tone.Player('assets/80s-Bdrum1.mp3');
    crash = new Tone.Player('assets/80s-CRASH1.mp3');
    hh_c = new Tone.Player('assets/80s-HHCLOSE1.mp3');
    tom1 = new Tone.Player('assets/80s-TOM1.mp3');
    tom2 = new Tone.Player('assets/80s-TOM2.mp3');
    bdrum.toMaster();
    crash.toMaster();
    hh_c.toMaster();
    tom1.toMaster();
    tom2.toMaster();
    
}
function play() {
    Tone.Transport.start();
}

function keyTyped() {
  if (key>0&&key<6) {
      myPattern[key-1][steps]=1;
      //playBeat(steps, myPattern);
  }
}

function playBeat(steps, pattern) {
    if (pattern[0][steps] == 1) {
        bdrum.start();
    }
    if (pattern[1][steps] == 1) {
        crash.start();
    }
    if (pattern[2][steps] == 1) {
        hh_c.start();
    }
    if (pattern[3][steps] == 1) {
        tom1.start();
    }
    if (pattern[4][steps] == 1) {
        tom2.start();
    }
}

