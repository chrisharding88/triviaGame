
$(document).ready(function(){
    //Global Variables
    var clockRunning = false;
    let clockId;
    let shotClock;
    let currentQuestion = 0;
    let answersCorrect = 0;
    let answersWrong = 0;
    let correctImage;

    var buzzer = document.createElement('audio');
    buzzer = new Audio('assets/sounds/buzzer.mp3');



    

   // Stops the clock if the user didn't answer the question on time
    function stop(){
        //Boolean to let the user know that the clock is going to stop running
        clockRunning = false;
        var correctAnswer = questionBank[currentQuestion].correctAnswer;
        var correctImage= questionBank[currentQuestion].image;
        //Tallys the answersWrong whenever the time is up
        answersWrong++;
        clearInterval(clockId);
        //hides the question & answers
        $('#question').hide();
        $('.answers').hide();
        //Appears on the screen to indicate that the user lost
        // Also displays the correct answer and image
        $('#gameDisplay').html(`
                <p>Nah bro, you LOST</p>
                <p>The correct answer is <b>${correctAnswer}</b></p>
                <img src ="${correctImage}"/>         
         
            `);
        // Sets up 3 seconds to display the image & answer before moving on to the next question
         setTimeout(newQuestion, 3000);
    } 




    function clock(){
        // Decrementing the timer
        shotClock--;
        //Display the timer in the DOM.
        $("#time").html(shotClock);
        //When the "shot clock" hits zero, it ends the question and it will display the answer
        if (shotClock === 0){
            stop();
            buzzer.play();
        }

    } 

      


    function displayQuestion(){
        $('#gameDisplay').html('');
        $('#question').html('');
        clockRunning = true;

        shotClock = 24;
        //Decrementing the timer each second
        clockId = setInterval(clock, 1000);
        $("#time").html(shotClock);

        // Set up as constants to catch from questionBank array(see questionBank.js)
        const question = questionBank[currentQuestion].question;
        const options = questionBank[currentQuestion].options;

        //Displays every single question
       $('#question').html('<h1>' + question + '</h1>');

       // Executes the displayOptions function
       displayOptions(options);
       
    }
    

   function displayOptions(options){
        $('#question').show();
        $('.answers').show();

     // Hides the old Answers so the new answers can come in the DOM
        $('.answers').html("")
       for (let i = 0; i < options.length; i++){
        //set as a variable to catch from question bank
        // Also use to set an attribute 'data-answer'
        var choices = questionBank[currentQuestion].options[i]; 
        // Adding new answers into the DOM 
         $('.answers').append('<p>' + `<button class="optionBtn" type = "button" data-answer = "${choices}">${choices}</button>` + '</p>'); 
       }
       
   }




    function newQuestion(){
        //Set as a constant to tell that the question is finished
        const isQuestionFinished = (questionBank.length - 1);
        
        //Condition when the game is finished
        if (isQuestionFinished === currentQuestion){
        //Stops the clock
        clockRunning = false;
        //Displays the result of how many answer correct and wrong
        showResult();
        } else {
        // incrementing the questions from the questionBank array
        currentQuestion++;
        //Set the timer in 3 seconds to move on to another question
        setTimeout(displayQuestion, 3000);

        }

    }
    


    $(document).on('click','.optionBtn', function(e) {
        // Clock stops when the answers is picked
        clearInterval(clockId);
        //Grabs the data-answer attr from the button element
        var pickedAnswer = $(this).attr('data-answer');
        //Grabs the correctAnswer from the questionBank
        var correctAnswer = questionBank[currentQuestion].correctAnswer;
        var correctImage= questionBank[currentQuestion].image;

        //If the answer is correct
        if (pickedAnswer === correctAnswer){
            //Tallys how many the user have right
            answersCorrect++;
            //Hides the questions and answers
             $("#question").hide();
             $(".answers").hide();
             $("#time").html('');
            //Appears when the user gets the answer right
            $('#gameDisplay').html(`
            <p>YES SIR! That is CORRECT</p>
            <p>The correct answer is <b>${correctAnswer}</b></p>
            <img src ="${correctImage}" class="imageAnswers"/>         
           `);
            // Executes the new Question
            newQuestion();
        } else {
         //Tallys how many the user have wrong
            answersWrong++;
            //Hides the questions and answers
             $("#question").hide();
             $(".answers").hide();
             $("#time").html('');
             //Appears when the user gets the answer wrong
            $('#gameDisplay').html(`
            <p>Nah bro, you LOST</p>
            <p>The correct answer is <b>${correctAnswer}</b></p>
            <img src ="${correctImage}" class ="imageAnswers"/>         
            `);
            //Executes the new Question
             newQuestion();

        } 
    
    });




   // Displays how many answers the user have right and wrong
    function showResult(){
        const result = `
        <p>You have ${answersCorrect} correct</p>
        <p>You have ${answersWrong} wrong</p>
        <button class = "reset">Reset</button>
        
        `;
        //Displays the results
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


function startGame(){
    $('#start').click(function(){
     //Hides the start button after it clicks
        $(this).remove();
        $("#time").html(shotClock);
        // Clock starts to run after the button is clicked
        displayQuestion();

    });

}

startGame();




});




