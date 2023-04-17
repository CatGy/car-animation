
let x = 0;
let y = 0;
let angle = 0;
let alpha = 1;

let wheel = new Image(500, 500);
let bg = new Image(800, 800);
let car = new Image(800, 800);
let start = 0;

// Launch init on window loaded
window.onload = () => {
    // Fetch images
    wheel.src = "assets/images/wheel.png";
    bg.src = "assets/images/bg-1.jpg";
    car.src = "assets/images/car-model.png";
    init();
}

// Init function
function init() {
    /* Initialize the canvas */
    let ctx = document.getElementById('canvas').getContext("2d");
    ctx.clearRect(0, 0, 800, 800);
    ctx.translate(400, 400);
    ctx.save();

    /* Animate */
    animate(ctx);
}

// Animation function
function animate(ctx) {

    CarAnimation.draw(ctx);
    /* Request the CarAnimation to be called on each frame. */
    requestAnimationFrame(function () {
        animate(ctx);
    });
}

// Fan animation called on each animation frame
var CarAnimation = {
    limit: 1.8,
    draw: function (ctx) {

        /* Clear the canvas */
        ctx.clearRect(-800, -800, 1600, 1600);
        /* Draw the background image */
        ctx.drawImage(bg, -400,-400, 800, 800);

        /* Compute a time fraction in order to use a timing function for the animation */
        let timeFraction = (performance.now() - start) / 10000;
        
        /* Animate only if the time fraction is below */
        if (timeFraction < 3) {
            /* Create an empty layout for now, it will be use lated to draw the car*/
            ctx.save();

            /* Configure the strole style */
            ctx.strokeStyle = "rgba(0,0,0,0)";
            ctx.miterLimit = 4;
            /* Create an empty layout for now, it will be use lated to draw the second wheel*/
            ctx.save();

            /* Create an empty layout for now, it will be use lated to draw the first wheel*/
            ctx.save();
            
            /* Draw the text */
            ctx.font = "70px serif";
            ctx.fillStyle = "rgba(255,255,255,"+alpha+")";
            ctx.fillText(timeFraction < this.limit ? "Go!" : "Stop & Reverse !", timeFraction < this.limit ? -50 : -180, 200, 500);
            
            /* Slow bring down the opacity of the text*/
            if(timeFraction > this.limit) alpha = alpha - 0.001;
            
            /* Translate the layout to draw the first wheel in the horizontal center of the canvas */
            ctx.translate(x,0);

            /* Rotate the layout to angle */
            ctx.rotate(Math.radians(angle));
            
            /* Dra the first wheel*/
            ctx.drawImage(wheel, -75, -75, 150, 150);
            
            ctx.restore();
            
            /* Translate the layout */
            ctx.translate(x-610 ,0);

            /* Rotate the layout */
            ctx.rotate(Math.radians(angle));

            /* Draw the second wheel */
            ctx.drawImage(wheel, -75, -75, 150, 150);

            /* Go to layer below */
            ctx.restore();

            /* Translate the layout */
            ctx.translate(x -20 ,0);

            /* Draw the car */
            ctx.drawImage(car, -815, -220, 1100, 400);

             /* Go to layer below */
            ctx.restore();
            
            /* Compute the x position using a timing function */
            x += makeEaseInOut(10, timeFraction, this.limit);

            /* Make the car loop back to the left or right side of the canvas */
            if (x > 1200) x = -1200;
            if (x < -1200) x = 1200;
            
            /* Compute the angle using the timing function */
            angle += makeEaseInOut(10, timeFraction, this.limit);
            /* Make sure the angle stop at 359 and start back at 0 */
            if (angle > 359) angle = 0;
        }
    }
}

// Timing function
// The timing function is called every frame with the following
// parameters to get a position that represents a easing/easout function 
function makeEaseInOut(factor, timeFraction, limit) {
    if(timeFraction > limit)
    {
        return (factor * timeFraction * (2 - timeFraction) + limit);
    } 
    else 
    {
        return (factor * timeFraction * timeFraction);
    }
}

// Convert from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}