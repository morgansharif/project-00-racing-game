$(document).on("ready", function(){
console.log('running');


function Player(elemName, img, keySet){
  this.elemName = elemName;
  this.img = img;
  this.keySet = keySet;
  this.currKeyCode = this.keySet.charCodeAt(0);
  this.currKeyVal = this.keySet[0];
  // this.speed = 1;
  this.move =
    function(){
      console.log("right");
       $(this.elemName).animate({ 'margin-left': '+=100' }, 'slow');
      currMargin = ($('elemName').css('margin-right'));
      //  console.log("currmargin: " + currMargin);
       this.setNewKey();
       if ( currMargin === 0){
         alert(this.elemName + "wins!");
       }
    };
  this.setNewKey =
    function(){
      //set currKey to a random character (random int of 0-4) from the this.Keyset
      this.currKeyVal = this.keySet[ ( Math.floor(Math.random()*5) ) ];
      this.currKeyCode = this.currKeyVal.charCodeAt(0);
      console.log("new key is: " + this.currKeyCode + " " + this.currKeyVal);
    };
}


// Player 1 Keys: ['q', 'w', 'e', 'r', 't'] charCode: [113, 119, 101, 114, 116]
// Player 2 Keys: ['o', 'p', '[', ']', '\'] charCode: [111, 112,  91,  93,  92]

    var p1 = new Player("#player-1", "blueCar.png", "qwert");
    var p2 = new Player("#player-2", "redCar.png", ",lp[]");

    console.log("P1 key is: " + p1.currKeyCode + " " + p1.currKeyVal);
    console.log("p2 key is: " + p2.currKeyCode + " " + p2.currKeyVal);




$(document).on("keypress",
  function(event) {
    var currMargin = $('#player-1').css('margin-right');
    var maxWidth = $('#race-track').innerWidth();
    var keyPress = event.which;
    console.log();
    console.log(keyPress + " pressed | checking for p1: " + p1.currKeyCode +" or p2: "+ p2.currKeyCode );
    if (keyPress === p1.currKeyCode){
      p1.move();
    }else if (keyPress === p2.currKeyCode){
      p2.move();
    }
  }
);

function move(player){

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







});
