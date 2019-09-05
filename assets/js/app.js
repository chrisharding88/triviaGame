
$(document).ready(function(){
    //Global Variables
    var clockRunning = false;
    var clockId;
    var shotClock = 24;
    let currentQuestion = 0;

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
        
        //When the "shot clock" hits zero, it ends the question and it will display the answer
        if (shotClock === 0){
            stop();
            alert("Time's Up");
        }

    } 

    function run(){
        intervalId = setInterval(clock, 1000);
    } 

    // Stops the clock
    function stop(){
        clearInterval(intervalId);
        clockRunning = false;
    }



    function displayQuestion(){
        const question = questionBank[currentQuestion].question;
        const options = questionBank[currentQuestion].options;

       $('#question').html('<h1>' + question + '<h1>');
       $('.answers').html(displayOptions(options));
    }
    
   displayQuestion();

   function displayOptions(options){
        let result = '';
        let choices = $('.options');


       for (let i = 0; i < options.length; i++){
           result += choices;
           choices.attr('data-answer', options[i]);
       }

       return result;

   }







   

    


  




































});

