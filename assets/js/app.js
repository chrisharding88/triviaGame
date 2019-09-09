
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

   // Stops the clock
    function stop(){
        clockRunning = false;
        answersWrong++;
        clearInterval(clockId);
        imageDescription('lost');
        setTimeout(newQuestion, 3*1000);
    } 




    function clock(){
        shotClock--;
        $("#time").html(shotClock);
        //When the "shot clock" hits zero, it ends the question and it will display the answer
        if (shotClock === 0){
            stop();
        }

    } 

      


    function displayQuestion(){
        clockRunning = true;
        shotClock = 24;
        clockId = setInterval(clock, 1000);
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




    function newQuestion(){
        const isQuestionFinished = (questionBank.length - 1);
        
        if (isQuestionFinished === currentQuestion){
        console.log("Game Over");
        clockRunning = false;
        showResult();
        } else {
        currentQuestion++;
        displayQuestion();
        }

    }
    


    $(document).on('click','.optionBtn', function() {
        // Clock stops when the answers is picked
        clearInterval(clockId);
        //Grabs the data-answer attr from the button element
        var pickedAnswer = $(this).attr('data-answer');
        var correctAnswer = questionBank[currentQuestion].correctAnswer;
        //If the answer is correct
        if (pickedAnswer === correctAnswer){
            //Tallys how many the user have right
            answersCorrect++;
            imageDescription('correct');
            setTimeout(newQuestion, 3*1000);
        } else {
         //Tallys how many the user have wrong
            answersWrong++;
            imageDescription('lost');
            setTimeout(newQuestion, 3*1000);

        } 
     
    
    });


   


    function imageDescription(status){

        
        correctAnswer = questionBank[currentQuestion].correctAnswer; 
        correctImage = questionBank[currentQuestion].image;

        if (status === 'correct'){
            $('#gameDisplay').html(`
             <p>YES SIR! That is CORRECT</p>
             <p>The correct answer is <b>${correctAnswer}</b></p>
             <img src ="${correctImage}"/>         
            `);
        }else if (status === 'lost'){
            $('#gameDisplay').html(`
                <p>Nah bro, you LOST</p>
                <p>The correct answer is <b>${correctAnswer}</b></p>
                <img src ="${correctImage}"/>         
         
            `);
        }




    };







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


function startGame(){
    $('#start').click(function(){
     //Hides the start button after it clicks
        $(this).remove();
        $("#question").show();
        $(".answers").show();
        // Clock starts to run after the button is clicked
        displayQuestion();

    });

}

startGame();




});




