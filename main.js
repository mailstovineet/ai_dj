song="";
lWristX=0;
lWristY=0;
rWristX=0;
rWristY=0;
score_left_wrist=0;
score_right_wrist=0;

function preload(){
    song=loadSound("music.mp3");
}

function play_sound(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(550,300);
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        lWristX=results[0].pose.leftWrist.x;
        lWristY=results[0].pose.leftWrist.y;
        rWristX=results[0].pose.rightWrist.x;
        rWristY=results[0].pose.rightWrist.y;
        console.log("lwristx= "+lWristX+" lwristy= "+lWristY+" rwristx= "+rWristX+" rwristy= "+rWristY);
        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log(score_left_wrist);
        console.log(score_right_wrist);
    }
}


function draw(){
    image(video,0,0,400,400);
    fill('red');
    stroke('red');
    if(score_left_wrist>0.2){
    circle(lWristX,lWristY,15);
    inNumber=Number(lWristY);
    remove_decimals=Math.floor(inNumber);
    volume=remove_decimals/400;
    document.getElementById("volume").innerHTML="Volume: "+volume*100;
    song.setVolume(volume);
    }
    if(score_right_wrist>0.2){
        circle(rWristX,rWristY,15);
        if(rWristY>0 && rWristY<=100){
            document.getElementById("speed").innerHTML="Speed= 0.5X";
            song.rate(0.5);
        } else if(rWristY>100 && rWristY<=200){
            document.getElementById("speed").innerHTML="Speed= 1X";
            song.rate(1);
        } else if(rWristY>200 && rWristY<=300){
            document.getElementById("speed").innerHTML="Speed= 1.5X";
            song.rate(1.5);
        } else if(rWristY>300 && rWristY<=400){
            document.getElementById("speed").innerHTML="Speed= 2X";
            song.rate(2);
        }
    }
}

function modelLoaded(){
    console.log("Model loaded");
}

