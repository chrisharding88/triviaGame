
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
        
        if (shotClock === 0){
            stop();
            alert("Time's Up");
        }

    } 

    function run(){
        intervalId = setInterval(clock, 1000);
    } 

    function stop(){
        clearInterval(intervalId);
        clockRunning = false;
    }

    




    var bank = [ 

        {
            question: "Which one of the players come from Kentucky?",
            options: ['Anthony Davis', 'Kyrie Irving', 'Kemba Walker','Giannis Antetokounmpo'],
            answer: 1
        },

        {
            question: "What is Kobe Bryant's nickname?",
            options: ['The Black Widow', 'The Black Panther', 'The Black Mamba','The Black Monster'],
            answer: 3
        },

        {
            question: "Who's the NBA leading scorer in the 2018-19 season?",
            options: ['Paul George', 'Russell Westbrook', 'Kawhi Leonard','James Harden'],
            answer: 4
        },

        {
            question: "What was Kawhi Leonard's team before he played for the Toronto Raptors?",
            options: ['Los Angeles Clippers', 'Houston Rockets', 'San Antonio Spurs','Dallas Mavericks'],
            answer: 3
        },

        {
            question: "What is Patrick Ewing's home country",
            options: ['Nigeria', 'Jamaica', 'USA','Cameroon'],
            answer: 2
        },

        {
            question: "What year did the Miami Heat first became a NBA franchise?",
            options: ['1991', '1988', '1983','1996'],
            answer: 2
        },

        {
            question: "What's the name of the NBA team before they called the Philadelphia 76ers?",
            options: ['Syracuse Nationals', 'Philadelphia Warriors', 'Rochester Royals','Fort Wayne Pistons'],
            answer: 1
        },

        {
            question: "What is the Grizzlies first city before they moved to Memphis?",
            options: ['Seattle', 'Oklahoma City', 'Vancouver', 'Charlotte'],
            answer: 3
        },

        {
            question: "Before they became the Oklahoma City Thunder, which of the following teams used to be a franchise?",
            options: ['Vancouver Grizzles', 'Charlotte Bobcats', 'New Orleans Hornets','Seattle Supersonics'],
            answer: 4
        },



    ];

    


  




































});

