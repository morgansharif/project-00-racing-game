var raceOver = false;

$(document).on("ready", function(){

console.log('running');

//player constructor
function Player(playerName, elemName, keySet, keyRow){
  //string label of the current players name
  this.playerName = playerName;
  //unique div id name, containing the player's car
  this.elemName = elemName;
  //set of keys assigned to this player
  this.keySet = keySet;
  //class referring to this visible div icons for the player to react to
  this.keyRow = keyRow;
  // 0-4 index of the
  this.currKeyIndex = 0;
  //current target key value for this player
  this.currKeyVal = this.keySet[ this.currKeyIndex ];
  //character code of the curent target character
  this.currKeyCode = this.currKeyVal.charCodeAt();
  //array of all current wrong keys associated with current player
  this.currWrongKeys = [];
  //current speed in pixels
  this.speed = 0;
  //distance travelled in pixels
  this.dist = 0;
  //increases player's speed and moves once (called if they hit target key)
  this.accelerate =
    function(){
      if (this.speed <= 30){
        this.speed = (this.speed + 5);
      }
      this.dist += this.speed;
      this.move();
    };
  //decreases players speed (called if they hit wrong key)
  this.decelerate =
    function(){
      if (this.speed >= 30){
        this.speed = (this.speed - 30);
      }else{
        this.speed = 0;
      }
    };
  //move players car to the right at the current speed in pixels
  this.move =
    function(){
       $(this.elemName).animate({ 'margin-left': ('+=' + (this.speed)) }, 200);
       this.setNewKey();
       this.isWinner();
    };
  //set new target key within current players key range
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
      //remove current key from wrong key set
      this.currWrongKeys.splice(this.currKeyIndex, 1);
      var keyId = "#"+this.currKeyVal;
      $(this.keyRow).removeClass("key-on");
      $(keyId).addClass("key-on");

    };
    //check for winner
  this.isWinner =
    function(){
      //see if player has travelled to the finish line ~ 1040 pixels
      if (this.dist >= 1040){
        alert(this.playerName + " Wins!");
        raceOver = true;
        return true;
      }else{
        return false;
      }
    };
}


  // Set Player objects
    var p1 = new Player("Player 1", "#player-1", ['q', 'w', 'e', 'd', 'c'], ".leftrow" );
    var p2 = new Player("Player 2", "#player-2", ['n', 'j', 'i', 'o', 'p'], ".rightrow");

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

  //listen for keypress
  $(document).on("keypress",
    function(event) {
      var maxWidth = $('#race-track').innerWidth();
      var keyPress = event.which;
      console.log(keyPress + " pressed | checking for p1: " + p1.currKeyCode +" or p2: "+ p2.currKeyCode );
      //check if race has been won, otherwise look if moving conditions have been met
      if (raceOver === false){
        //check for correct keys and NOT wrong keys simultaneously (to mitigate button-mashing)
        if (isRightKey(keyPress, p1) && !isWrongKey(keyPress, p1)){
          p1.accelerate();
          return;
        }else if (isRightKey(keyPress, p2) && !isWrongKey(keyPress, p2)){
          p2.accelerate();
          return;
        //check for wrong keys pressed
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


  $('button').on("click",
    function reset(){
      //reset to original conditions, and assing new target key value
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
  );



}); //end document on ready
