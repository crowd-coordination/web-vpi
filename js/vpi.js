// Layout and graphic related
var centerX = 500;
var scale = 200;

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

window.requestAnimFrame = (function(){
   return window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
   })();

// Position, velocity and acceleration 
var x1 = 0.1;
var x2 = 0;
var x1d = 0;
var x1dd = 0;
var x2d = 0
var x2dd = 0;

//HKB parameters
var mu = -1;
var A = -0.125;
var B = -0.025;
var dt = 0.01;
var omega = 1.6 * 2 * 3.142;
var alpha = 0.641;
var beta = 0.05;
var gamma = 12.457;
      

(function animloop(){
    requestAnimFrame(animloop);
    updateHKB();
    render();
})();
          
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(evt);
    x2 = -(centerX - mousePos.x) /  scale;
}, false);

function drawCircle(centerX, centerY) {    
    var radius = 40;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#00FF00';
    context.stroke();
}

function getMousePos(evt) {
   var rect = canvas.getBoundingClientRect();
   return {
       x: evt.clientX - rect.left,
       y: evt.clientY - rect.top
       };
   }

function render(){
    canvas.width = canvas.width;    
    drawCircle(x1 * scale + centerX, 200);
    drawCircle(x2 * scale + centerX, 400);        
}        

function updateHKB(){
    x1dd = 
       (x1d - mu * x2d) * (A + B * Math.pow((x1 - mu * x2), 2)) 
       - Math.pow(omega, 2) * x1 
       - x1d * (alpha * Math.pow(x1, 2) + beta * Math.pow(x1d, 2) - gamma);        
   x1d += dt * x1dd;
   x1 += dt * x1d;
    
   x2dd = 
       (x2d - mu * x1d) * (A + B * Math.pow((x2 - mu * x1), 2)) 
       - Math.pow(omega, 2) * x2 
       - x2d * (alpha * Math.pow(x2, 2) + beta * Math.pow(x2d, 2) - gamma);           
           
   x2d += dt * x2dd;
   // Comment this back in, in order to simulate the second oscillator
   // x2 += dt * x2d;    

   // TODO: The relative phase should be calculated with the Hilbert Transform. How is it calculated online?
   rp = x1 - x2;
       
    
}