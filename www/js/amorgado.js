// Waits until phone device is ready
$(document).ready(function(){

    // Check orientation on page load
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener("orientationchange", function() {
        // Announce the new orientation number
        checkOrientation();
	    //alert(window.orientation);
    }, false);


    $("#restart").click( function()
       {
        window.location.reload();
       }
    );

});

// Checks device orientation and changes display accordingly
    var checkOrientation = function() {
        if (window.orientation == 0) {
            $("#foodBox1").hide();
            $("#foodBox2").hide();
            $("#flagGermany").hide();
            $("#flagArgentina").hide();
            $("#flagSpain").hide();
            $("#flagBrazil").hide();
            $("#flagNetherlands").hide();
            $("#flagEngland").hide();
            $("#flagGhana").hide();
            $("#aquarium").hide();
            $("#paulArea").hide();
            $("#score").hide();
            $("#finalResult").hide();
            $("#restart").hide();
            $("#portraitMessage").show();
            $("#history").show();
            $("#paulEntrance").show();
        }
        else {
            $( initGame );
        }
    }

 function initGame(){

    $("#portraitMessage").hide();
    $("#history").hide();
    $("#paulEntrance").hide();
    $("#restart").show();
    $("#paulArea").show();
    $("#score").show();
    $("#cage").addClass("cageIn");
    $("#paulPlace").addClass("paulLocked");
    $("#pageHeader").removeClass("bounceInDown");
    $("#foodBox1").show();
    $("#foodBox2").show();
    $("#flagGermany").show();
    $("#flagArgentina").show();
    $("#flagSpain").show();
    $("#flagBrazil").show();
    $("#flagNetherlands").show();
    $("#flagEngland").show();
    $("#flagGhana").show();
    $("#aquarium").show();
    $( initDragDrop );
 }

// Drag and Drop

function initDragDrop() {
  $("#flagGermany").draggable();
  $("#flagArgentina").draggable();
  $("#flagSpain").draggable();
  $("#flagBrazil").draggable();
  $("#flagNetherlands").draggable();
  $("#flagEngland").draggable();
  $("#flagGhana").draggable();
  $("#foodBox1Msg").addClass("flash");
  $("#foodBox2Msg").addClass("flash");
  $("#foodBox1").droppable( {
    drop: handleDropEvent
  } );
    $("#foodBox2").droppable( {
    drop: handleDropEvent
    } );
}

var countDrops = 0;

function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  var droppable = $(this).attr("id");
  /*alert( 'The square with ID "' + draggable.attr("id") + '" was dropped onto ' + droppable + ' me!');}*/
  var oponent = draggable.attr("id").substring(4,20);
  if (droppable == "foodBox1"){
      $("#winner").text(oponent.toUpperCase());
  }
  draggable.css({"top":$(this).css("top")});
  draggable.css({"left":$(this).css("left")});
  draggable.draggable( 'disable' );
  $(this).text(oponent);
  $(this).droppable( 'disable' );
  $(this).removeClass("flash");
  countDrops++;
  if (countDrops == 2) {
  $("#flagGermany").draggable( 'disable' );
  $("#flagArgentina").draggable( 'disable' );
  $("#flagSpain").draggable( 'disable' );
  $("#flagBrazil").draggable( 'disable' );
  $("#flagNetherlands").draggable( 'disable' );
  $("#flagEngland").draggable( 'disable' );
  $("#flagGhana").draggable( 'disable' );
    startGuessing();
  }
}

function startGuessing(){
    $("#cage").removeClass("cageIn");
    $("#cage").addClass("cageOut");
    $("#paulPlace").removeClass("paulLocked");
    $("#paulPlace").addClass("paulGuessing1");
    setTimeout(score1, 3000);
 }

function score1(){
    $("#score").text('1 X 0');
    setTimeout(score2, 3000);
}

function score2(){
    $("#score").text('1 X 1');
    setTimeout(score3, 5000);
}

function score3(){
    $("#score").text('2 X 1');
    $("#finalResult").show();
}


