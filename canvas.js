//finds canvas css string tag & selects it
var canvas = document.querySelector('canvas');  
//set width & height of browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//items rendered on the canvas in 2d (returned objects contains tons of functions and methods!!!)
var board = canvas.getContext('2d');



var mouse = {
    x: undefined,
    y: undefined
}
//add event listener to detect mouse movement
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

//to detect resize of browser
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

//create js circle object
function CircleObject(x, y, dx, dy, rad) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    var origRad = rad;
    var maxRad = 90;
    //for randomizing colors!
    var r = 255*Math.random();
    var g = 255*Math.random();
    var b = 255*Math.random();
    r = r.toString();
    b = b.toString();
    g = g.toString();
    //draw circle
    this.draw =  function() {
        board.beginPath();
        board.arc(this.x, this.y, this.rad, 0, Math.PI*2, false);
        board.fillStyle = "rgb("+r+", "+g+", "+b+")";
        board.fill();
    }
    //animate circle
    this.update = function() {
        //collision detection
        if (this.x + rad > innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.rad > innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy;
        }
        this.x+= this.dx;
        this.y+=this.dy;

        //interact with mouse movement, if circle within 50 pixels up down left or right of the mouse
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.rad < maxRad) {
                this.rad += 1.5;
            }
        }
        else if (this.rad > origRad) {
            this.rad -= .5;
        }
    }
}

//create array of circles 
var circleObjs = [];
for (var i = 0; i < 350; i++) {
    var x = (innerWidth - rad*2)*Math.random() + rad;
    var y = (innerHeight - rad*2)*Math.random() + rad;
    //-.5  allows between -.5 to .5 as the range since originally returns 0 to 1
    var dx = (Math.random()-.5)*2;     //range is now -1 to 1
    var dy = (Math.random()-.5)*2;
    var rad = 20*Math.random();
    circleObjs.push(new CircleObject(x, y, dx, dy, rad));
}


//animate all ur circles onto the screen!
function animate() {
    requestAnimationFrame(animate); //cycling through loop that calls each other; refreshes
    board.clearRect(0, 0, innerWidth, innerHeight);
    board.font = "45px Courier New";
    board.fillStyle = "white";
    board.textAlign = "center";
    board.fillText("h e l l o  w o r l d .", canvas.width/2, canvas.height/2); 
    for (var i = 0; i < circleObjs.length; i++) {
        circleObjs[i].draw();      
        circleObjs[i].update();
    }
}

animate();
