var buttonColours=["red","blue","green","yellow"];
var userClickPattern=[];
var gamePattern=[];
var level=0;

$("body").keypress(function(){
    nextSequence();
});


function nextSequence(){
    var i=Math.random()*4;
    var randomNumber=Math.floor(i);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level "+level);
    level++;
    console.log("game "+gamePattern);
    userClickPattern=[];
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    var clicked=this;
    $(clicked).addClass("pressed");
    setTimeout(function(){
        $(clicked).removeClass("pressed");
    },100);
    console.log("user "+userClickPattern);
    checkAnswer(userClickPattern.length);
});



function playSound(clr){
    var audio=new Audio("sounds/"+clr+".mp3");
    audio.play();
}

function checkAnswer(i){
    if(userClickPattern[i-1]==gamePattern[i-1]){
        if(i==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var a=new Audio("sounds/wrong.mp3");
        a.play();
        userClickPattern=[];
        gamePattern=[];
        level=0;
        $("#level-title").text("Game-Over");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("#level-title").text("Press A Key to Start");
        },2000);
    }
}