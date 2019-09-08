
$(document).ready(function(){
    //Global Variables
    var clockRunning = false;
    let clockId;
    let shotClock;
    let currentQuestion = 0;
    let answersCorrect = 0;
    let answersWrong = 0;

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
        var choices = questionBank[currentQuestion].options[i]; 
            // Adding new answers into the DOM 
         $('.answers').append('<p>' + `<button class="optionBtn" type = "button" data-answer = "${choices}">${choices}</button>` + '</p>'); 
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
        var pickedAnswer = $(this).attr('data-answer');
        console.log(pickedAnswer);
        var correctAnswer = questionBank[currentQuestion].correctAnswer;
        if (pickedAnswer === correctAnswer){
            //Tallys how many the user have right
            answersCorrect++;
            console.log('Correct');
            nextDisplayQuestion();
        } else {
         //Tallys how many the user have wrong
            answersWrong++
            console.log('Wrong');
            nextDisplayQuestion();
        } 
     
    
    });

   // Displays how many answers the user have right and wrong
    function showResult(){
        const result = `
        <p>You have ${answersCorrect} correct</p>
        <p>You have ${answersWrong} wrong</p>
        <button class = "reset">Reset</button>
        
        `;
        $('#gameDisplay').html(result);

    }

   
    //Reset the whole game
    $(document).on('click', '.reset', function() {
         shotClock = 24; 
         currentQuestion = 0;
         answersCorrect = 0;
         answersWrong = 0;
         clockId = null;
 
         displayQuestion();
    });








});




