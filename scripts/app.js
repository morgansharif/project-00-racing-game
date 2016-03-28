var raceOver = false;

$(document).on("ready", function(){
console.log('running');

function Player(playerName, elemName, img, keySet, keyRow){
  this.playerName = playerName;
  this.elemName = elemName;
  this.img = img;
  this.keySet = keySet;
  this.keyRow = keyRow;
  this.currKeyIndex = 0;
  this.currKeyVal = this.keySet[ this.currKeyIndex ];
  this.currKeyCode = this.currKeyVal.charCodeAt();
  this.currWrongKeys = "";
  this.speed = 0;
  this.dist = 0;
  this.accelerate =
    function(){
      this.dist += this.speed;
      if (this.speed <= 30){
        this.speed = (this.speed + 5);
      }
      this.move();
    };
  this.decelerate =
    function(){
      if (this.speed >= 15){
        this.speed = (this.speed - 15);
      }else{
        this.speed = 0;
      }
      this.move();
    };

  this.move =
    function(){
       $(this.elemName).animate({ 'margin-left': ('+=' + (this.speed)) }, 200);
       this.setNewKey();
       this.isWinner();
    };
  this.setNewKey =
    function(){
      //set currKey to a random character (random int of 0-4) from the this.Keyset
      this.currKeyIndex = Math.floor( Math.random() * 5 );
      //set current key val to new index #
      this.currKeyVal = this.keySet[ this.currKeyIndex ];
      //get character code for new key
      this.currKeyCode = this.currKeyVal.charCodeAt(0);
      //build set of new wrongKey vals to slow down current player if they click the wrong key
      this.currWrongKeys = [];
      for (var i in this.keySet){
          this.currWrongKeys.push(this.keySet[i]);
      }
      this.currWrongKeys.splice(this.currKeyIndex, 1);
      console.log("wrong keys= " + this.currWrongKeys);
      console.log("keyset= " + this.keySet);
      console.log("new key is: " + this.currKeyCode + " '" + this.currKeyVal + "'");
      var keyId = "#"+this.currKeyVal;
      $(this.keyRow).removeClass("key-on");
      console.log(keyId);
      $(keyId).addClass("key-on");

    };
    //check for winner
  this.isWinner =
    function(){
      //see if player has travelled to the finish line
      if (this.dist >= 1030){
        alert(this.playerName + " Wins!");
        raceOver = true;
        return true;
      }else{
        return false;
      }
    };
}


  // Set Player objects
    var p1 = new Player("Player 1", "#player-1", "blueCar.png", ['q', 'w', 'e', 'd', 'c'], ".leftrow" );
    var p2 = new Player("Player 2", "#player-2", "redCar.png" , ['n', 'j', 'i', 'o', 'p'], ".rightrow");


  function isRightKey(keyPress, player){
    if (keyPress === player.currKeyCode){
      return true;
    }else {
      return false;
    }
  }

  function isWrongKey(keyPress, player){
    if ( keyPress === player.currWrongKeys[0] || keyPress === player.currWrongKeys[1] || keyPress === player.currWrongKeys[2] || keyPress === player.currWrongKeys[3]){
      return true;
    }else{
      return false;
    }
  }


$(document).on("keypress",
  function(event) {
    var maxWidth = $('#race-track').innerWidth();
    var keyPress = event.which;
    console.log(keyPress + " pressed | checking for p1: " + p1.currKeyCode +" or p2: "+ p2.currKeyCode );

    if (raceOver === false){
      if (isRightKey(keyPress, p1)){
        p1.accelerate();
        return;
      }else if (isRightKey(keyPress, p2)){
        p2.accelerate();
        return;
      }else if (isWrongKey(keyPress, p1)){
        p1.decelerate();
        return;
      }else if (isWrongKey(keyPress, p2)){
        p2.decelerate();
        return;
      }
    }
  }
);



$('button').on("click", function(){
  reset();
});

function reset(){
  $(p1.elemName).css({ 'margin-left': '0px' });
  $(p2.elemName).css({ 'margin-left': '0px' });
  p1.speed = 0;
  p2.speed = 0;
  p1.dist = 0;
  p2.dist = 0;
  p1.setNewKey();
  p2.setNewKey();
  raceOver = false;
}


// //popup window from button
// $("button.info").on("click",
//   function(){
//     $("popup.hidden").removeClass("hidden")
//   }
// );
// $("button.close").on("click",
//   function(){
//   }
// );




console.log('racetrack width ='+ $('#race-track').width());

});
