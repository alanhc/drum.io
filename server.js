let express = require('express');
let app = express();
app.use(express.static('public'))

let server = app.listen(3000);

let socket = require('socket.io');
let io = socket(server);



console.log("My socket server is running");
let players=0;
let playerList=[];


let playerInfoTable = new Map();

io.sockets.on('connection', (socket)=>{
    playerList.push(socket.id);
    players++;
    
    socket.broadcast.emit('player join', players, playerList[nowHost]);
    socket.on('disconnect', (reason)=>{
        
        --players;
        playerList = playerList.filter( (value, index, arr)=> value!=socket.id );
        socket.broadcast.emit('reply info',players, playerList[nowHost]);
        console.log(playerList);
        
    });
    socket.on('check info', ()=>{
        socket.broadcast.emit('reply info',players, playerList[nowHost]);
    });
    socket.on('send pattern', (patternIn)=>{
        socket.broadcast.emit('answer pattern',patternIn);
    });
    
    socket.on('upload data', (lost, playerName, life)=>{
        
        
        playerInfoTable.set(playerName,life);
        //let re=playerInfoTable.map(item=>item.playerName).filter((value, index, self) => self.indexOf(value) === index);
        let sortedPlayerInfo=[];
        for (let [key,value] of playerInfoTable) {
            sortedPlayerInfo.push( {'name':key,'life':value} )
        }
        sortedPlayerInfo.sort((a,b)=>{
            return b.life-a.life;
        });
        console.log(sortedPlayerInfo);
        socket.broadcast.emit('update data', lost,sortedPlayerInfo);
    })
    console.log(playerList);
});


let nowHost=0;
let nowBeat=0;
let nextHost;

setInterval(function() {
   nowBeat++;
   steps=nowBeat%8;
   
   if (nowBeat==16) {
       nowBeat=0;
       nowHost++;
       nextHost=nowHost+1;
   } 
   
   if (nowHost>playerList.length-1) nowHost=0;
   nextHost%=playerList.length;
   console.log("aaa "+nextHost);
   io.local.emit('beat',nowBeat, nextHost);
   io.local.emit('reply info',nowBeat, players, playerList[nowHost], playerList[nextHost]);
   //console.log(nowBeat+" "+nowHost+" "+playerList[nowHost]+" "+playerList[nextHost]);
   
}, 500);
