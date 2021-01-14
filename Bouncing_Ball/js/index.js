var ball = document.getElementById('circle');
var pos = 0;
var up = true;
var down = false;

function bouncingBall(){
    if (pos == 0){
        up = true;
        down = false;
    }
    else if (pos > 400){
        down = true;
        up = false;
    }
    if (up){
        pos += 8;
        ball.style.marginTop = pos + "px";
    }
    else if (down) {
            pos -= 8;
            ball.style.marginTop  = pos + "px";
    } 
    requestAnimationFrame(bouncingBall);
}
requestAnimationFrame(bouncingBall);