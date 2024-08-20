//web browser sine wave instrument
//written with assistance from Stephen Roddy & Sebastian Adams

//const - never changes
//let - updatable


const filter = new Tone.Filter(5000, "lowpass").toDestination(); //make lopass, connect to output
const minCutoff = 250;
const maxCutoff = 5000;
//main oscillator
const osc = new Tone.Oscillator({
  type: "sine",
  frequency: 440,
}).connect(filter); // make 440Hz sine, connect to lopass
osc.volume.value = -70; //initial volume

const osc2 = new Tone.Oscillator({
  type: "sine",
  frequency: 435,
}).connect(filter); // make 440Hz sine, connect to lopass
osc2.volume.value = -70; //initial volume

const ringMod = new Tone.LFO({
  frequency: 5,
  amplitude: 0.25,
  min: 200,
  max: 800,
});

ringMod.connect(osc.frequency);

//"audioOn" code: optimised version of earlier code
//incorporating suggestions generated by chatGPT
//specifically, the line below, and setting audioOn to "true"
//to turn on audio on the first mouse click
let audioOn = false 

//let touchEnd = false;
//let touchStart = false;

function setup() {
  createCanvas(windowWidth, windowHeight); //width first, then height. otherwise doesn't fill screen
  colorMode(RGB, 255);
  textAlign(CENTER, CENTER);
  textFont('Courier New');   
 


 /*  //Button stuff. This button won't do anything until you add the p5.sound library back in the index.html file
  button = createButton("Audio"); 
  button.mouseClicked(audioSound);
  button.size(200,100);
  button.position(10,10);
  button.style("font-family", "Courier");
  button.style("font-size", "48px");

  */
}

function draw() {

  let touchX = mouseX;
  let touchY = mouseY;

  if (touches.length > 0) {
    for (var i = 0; i < touches.length; i++){
    touchX = touches[i].x;
    touchY = touches[i].y;
  }
}

if (mouseIsPressed || touches.length > 0) {
  if (!audioOn){
    //start osc on first click only
    Tone.start();
    osc.start();
    osc2.start();
    ringMod.start();
    audioOn = true; //set flag to true = audio stays on
  }

  let blueValue = map(touchX, 0, width, 50, 100); //mouseX&Y - p5 listener event functions
  let greenValue = map(touchY, 0, height, 50, 100);
  //console.log(mouseX, mouseY); //print
  background(0, greenValue, blueValue);
  niceTone(touchX, touchY);

  fill(255);
  text('X axis: sine wave', width / 2, height - 60);
  text('Y axis: ring modulated sine wave', width / 2, height - 30);

  } 
  else {
    fill(255); 
    osc.volume.rampTo(-70, 1);
    osc2.volume.rampTo(-70, 1); //volume to -70 when mouse released
  }
  
  // rect(0, 0, width, height); //draw square that fills the window

  

  //! = logical NOT: if mouse is *not* pressed
  //*and* screen is not touched, then...
  if (!mouseIsPressed && touches.length === 0) { 
    background(255);
    fill(0);
  
  let textScale = windowWidth * 0.025; //text size = 2.5% of screen size
  textSize(textScale);
  text('Tap once, then touch/click and drag anywhere on the screen', width / 2, height / 2);
  text('X axis: sine wave', width / 2, height - 60);
  text('Y axis: ring modulated sine wave', width / 2, height - 30);

  }


}
/*  //Button stuff. This button won't do anything until you add the p5.sound library back in the index.html file as  userStartAudio() is contained in the p5.soudn library

function audioSound(){
  userStartAudio();
}
  /*
//sine wave function
function niceTone(x, y){



//then do all of this (or **only** do this if audio is already on)
let oscFreq = map(x, 0, width, 440, 660);  //maps mouseX to...

//chatGPT - exp conversion for filter
let normalizedY = map(y, 0, height, 0, 1);
let cutoff = minCutoff * Math.pow(maxCutoff / minCutoff, normalizedY); // Exponential scaling
//

let lfoFreq = map(y, 0, height, 430, 420);

ringMod.frequency.value = lfoFreq;
osc2.frequency.value = oscFreq;
filter.frequency.value = cutoff;

osc.volume.rampTo(-6, 1); //osc and ALL partials
osc2.volume.rampTo(-6, 1);
console.log("Cutoff", cutoff); //print cutoff freq to console
}


//chatGPT iphone stuff
//still not working

document.ontouchmove = function(event) {
  event.preventDefault();
};

document.ontouchstart = async function(event) {
  event.preventDefault();
  
  if (Tone.context.state !== 'running') {
    await Tone.context.resume();
  }
  
  if (!audioOn) {
    Tone.start();
    osc.start();
    osc2.start();
    ringMod.start();
    audioOn = true;
  }
};



document.ontouchmove = function(event) {
  event.preventDefault();
};

*/

