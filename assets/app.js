
$(document).ready(function(){
    //Global Variables
    var clockRunning = false;
    var clockId;
    var shotClock = 24;

    $("#question").hide();
    $(".answers").hide();
    $("#start").on('click', run);

    function startGame(){
        $('#start').click(function(){
            $("#question").show();
            $(".answers").show();
            $(this).hide();
            clock();
        });

    }
    startGame();


    function clock(){
        shotClock--;
        clockRunning = true;
        $("#time").html(shotClock);

    } 

    function run(){
        intervalId = setInterval(clock, 1000);
    } 

    function stop(){
        clearInterval(intervalId);
        clockRunning = false;
    }

    if (shotClock === 0){
        stop();
        alert("Time's Up");
    }

    


  




































});

