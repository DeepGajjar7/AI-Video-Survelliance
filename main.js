var video="";
var status1="";
var objects=[];

function preload(){
    video=createVideo('video.mp4')
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center()
}

function draw(){
    image(video,0,0,480,380)
    if(status1 !=""){
        objectDetector.detect(video,gotresults)
        for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="Status: Objects Detected"
        document.getElementById("number_of_objects").innerHTML="Number of objects:"+objects.length;
        fill("red");
        percent=floor(objects[i].confidence*100)
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modeloaded);
    document.getElementById("status").innerHTML="Status :Detecting Objects";
}

function modeloaded(){
    console.log("modeloaded")
    status1=true
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error,results){
    if (error){
        console.error(error)
    }
    else{
        console.log(results)
        objects=results;
    }
}