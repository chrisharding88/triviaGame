
$(document).ready(function(){
    //Global Variables
    var clockRunning = false;
    var clockId;
    var currentOptions = 0;
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
       

       for (var i = 0; i < options.length; i++){
           var answer1 = $('#ans1');
           var answer2 = $('#ans2');
           var answer3 = $('#ans3');
           var answer4 = $('#ans4');
           
           if (i===0){
               answer1.attr('data-answer', options[i]);
           } else if (i===1){
               answer2.attr('data-answer', options[i]);
           } else if (i===2){
               answer3.attr('data-answer', options[i]);
           } else if (i===3){
              answer4.attr('data-answer', options[i]);
           }

           var choices = questionBank[currentOptions].options[i];
           $('.answers').append('<p>' +'<button type = "button" class="btn btn-primary">' + choices + '</button>' + '</p>');

       }


   }







   

    


  




































});

