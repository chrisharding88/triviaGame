
$(document).ready(function(){
    //Global Variables
    var clockRunning = false;
    var clockId;
    var shotClock = 24;
    let count = 0;

    $("#time").html(shotClock);



    function clock(){
        shotClock--;
        clockRunning = true;
    } setTimeout(clock, 1000);


    console.log(shotClock);




































});

