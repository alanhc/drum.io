
let serial="/dev/ttyACM0";
let latestData = "waiting for data"; 

function initSerial() {
 
  serial = new p5.SerialPort();
  serial.list();

  serial.open("/dev/ttyACM0");
  serial.on('connected', serverConnected);

  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);

  serial.on('close', gotClose);
}

function serverConnected() {
  print("Connected to Server");
}
function gotList(thelist) {
  print("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}
let ax,ay,az;
function gotData() {
  let currentString = serial.readLine();  
  trim(currentString);                    
  if (!currentString) return;            
  let splitString = split(currentString, '\t');
  ax=float(splitString[1]);
  ay=float(splitString[2]);
  az=float(splitString[3]);
  
  
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  
}


