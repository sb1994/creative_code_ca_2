let capture;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyeLX = 0;
let eyeLY = 0;
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  capture = createCapture(VIDEO);
  // capture.size(320, 240);
  capture.hide();
  // console.log(ml5);
  poseNet = ml5.poseNet(capture, modelSetup);
  poseNet.on("pose", gotPoses);
}
function modelSetup() {
  console.log("Model Has been setup");
  // console.log(poseNet);
}
function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    console.log(poses[0].pose.keypoints[0].position.x);

    let newX = poses[0].pose.keypoints[0].position.x;
    let newY = poses[0].pose.keypoints[0].position.y;
    noseX = lerp(noseX, newX, 0.5);
    noseY = lerp(noseY, newY, 0.5);
    let newEyeLX = poses[0].pose.keypoints[1].position.x;
    let newEyeLY = poses[0].pose.keypoints[1].position.y;
    eyeLX = lerp(eyeLX, newEyeLX, 0.5);
    eyeLY = lerp(eyeLY, newEyeLY, 0.5);
    // noseY = poses[0].pose.nose.y;
    // console.log(noseX);
  }
}

function draw() {
  background(255);
  image(capture, 0, 0, 600, 600);
  // filter(INVERT);
  line(noseX, noseY, eyeLX, eyeLY);
  let d = dist(noseX, noseY, eyeLX, eyeLY);
  fill(255, 0, 0);
  ellipse(noseX, noseY + 20, d);
  // ellipse(eyeLX, eyeLY, 50, 50);
}
