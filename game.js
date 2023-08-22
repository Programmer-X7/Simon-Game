var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
const sounds = [
    "./sounds/red.mp3",
    "./sounds/blue.mp3",
    "./sounds/green.mp3",
    "./sounds/yellow.mp3",
    "./sounds/wrong.mp3",
];
var started = false;
var level = 0;

$(document).keypress(function (e) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function (e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    playSound("./sounds/" + userChosenColour + ".mp3");
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 800);
        }
    } else {
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        playSound(sounds[4]);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(sounds[randomNumber]);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}