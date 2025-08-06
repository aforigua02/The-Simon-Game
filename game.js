var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$(document).on("keypress",function(event){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSecuence();
        started =true;
    }
});

$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Sucess")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSecuence();
            },1000)
        }
    }else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(()=>{
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function nextSecuence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);

}

function playSound(name){
    const audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(()=>{
        $("#" + currentColour).removeClass("pressed");
    },100)
}

function startOver(){
    level = 0;
    gamePattern = []
    started = false
}
    






