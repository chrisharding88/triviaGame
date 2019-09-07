
$(document).ready(function(){
    //Global Variables
    var clockRunning = false;
    var clockId;
    var shotClock;
    let currentQuestion = 0;
    var answersCorrect = 0;
    var answersWrong = 0;

    $("#question").hide();
    $(".answers").hide();
    $("#start").on('click', run);

    function startGame(){
        $('#start').click(function(){
            $("#question").show();
            $(".answers").show();
            $(this).hide();
            clock();
            displayQuestion();

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
            nextDisplayQuestion();
        }

    } 

    
    function run(){
        clockId = setInterval(clock, 1000);
    } 

    // Stops the clock
    function stop(){
        clearInterval(clockId);
        clockRunning = false;
    }

  


    function displayQuestion(){
        shotClock = 24;
        const question = questionBank[currentQuestion].question;
        const options = questionBank[currentQuestion].options;

       $('#question').html('<h1>' + question + '<h1>');
       $('.answers').html(displayOptions(options));
    }
    

   function displayOptions(options){
    // Hides the old Answers so the new answers can come in the DOM
    $('.answers').html('');

       for (let i = 0; i < options.length; i++){
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

           var choices = questionBank[currentQuestion].options[i];
           // Adding new answers into the DOM 
           $('.answers').append('<p>' + '<button class="optionBtn" type = "button">' + choices + '</button>' + '</p>');
           
       }
       
   }




    function nextDisplayQuestion(){
        var isQuestionFinished = (questionBank.length - 1);

        if (isQuestionFinished === currentQuestion){
        console.log("Game Over");
        showResult();       
        } else {
        currentQuestion++;
        displayQuestion();

        }

    }


    $(document).on('click','.optionBtn', function() {
        clearInterval(clockId);
        console.log('AYE', pickedAnswer);
        var pickedAnswer = $(this).attr('data-answer');
        var correctAnswer = questionBank[currentQuestion].correctAnswer;
    
        if (pickedAnswer === correctAnswer){
            answersCorrect++;
            console.log('Correct');
            nextDisplayQuestion();
        } else {
            answersWrong++
            console.log('Wrong');
            nextDisplayQuestion();
        } 
     
    
    });


    function showResult(){
        const result = `
        <p>You have ${answersCorrect} correct</p>
        <p>You have ${answersWrong}</p>
        <button class = "reset">Reset</button>
        
        `;
        $('#gameDisplay').html(result);

    }

    $(document).on('click', '.reset', function(){
        shotClock = 24; 
        currentQuestion = 0;
        answersCorrect = 0;
        answersWrong = 0;
        clockId = null;


        displayQuestion(); 
    });
 
   




   

    


  




































});




