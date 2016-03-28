$(document).on("ready", function(){
console.log('running');

function Player(elemName, img, keySet){
  this.elemName = elemName;
  this.img = img;
  this.keySet = keySet;
  this.currKeyIndex = 0;
  this.currKeyVal = this.keySet[ this.currKeyIndex ];
  this.currKeyCode = this.currKeyVal.charCodeAt();
  this.currWrongKeys = "";
  this.speed = 100;
  this.move =
    function(){
      console.log("right");
       $(this.elemName).animate({ 'margin-left': ('+=' + this.speed) }, 'slow');
      currMargin = ($('elemName').css('margin-right'));
      //  console.log("currmargin: " + currMargin);
       this.setNewKey();
       if ( currMargin === 0){
         alert(this.elemName + " wins!");
       }
    };
  this.setNewKey =
    function(){
      //set currKey to a random character (random int of 0-4) from the this.Keyset
      this.currKeyIndex = Math.floor( Math.random() * 5 );
      console.log("i " + this.currKeyIndex + " in " + this.keySet);
      this.currKeyVal = this.keySet[ this.currKeyIndex ];
      console.log("keyval= "+ this.currKeyVal);
      this.currKeyCode = this.currKeyVal.charCodeAt(0);
      //build new wrongKey vals
      this.currWrongKeys = [];
      for (var i in this.keySet){
        if (i !== this.currKeyIndex){
          this.currWrongKeys.push(this.keySet[i]);
        }
      }
      console.log("currwrongKeys before splice = " + this.currWrongKeys);
      this.currWrongKeys.splice(this.currKeyIndex, 1);
      console.log("wrong keys= " + this.currWrongKeys);
      console.log("keyset= " + this.keySet);

      // for (var i in this.keySet){
      //   console.log("i= " + i + " | thiskeyset = " + this.keyset);
      //   if (i === this.currKeyIndex){
      //   } else{
      //     console.log(i + " !== " + this.currKeyIndex);
      //     this.currWrongKeys.push(this.keySet[i]);
      //   }
      // }
      console.log("new key is: " + this.currKeyCode + " '" + this.currKeyVal + "'");
    };
}


// Player 1 Keys: ['q', 'w', 'e', 'r', 't'] charCode: [113, 119, 101, 114, 116]
// Player 2 Keys: ['o', 'p', '[', ']', '\'] charCode: [111, 112,  91,  93,  92]

    var p1 = new Player("#player-1", "blueCar.png", ['q', 'w', 'e', 'd', 'c'] );
    var p2 = new Player("#player-2", "redCar.png" , [',', 'l', 'p', '[', ']'] );

    console.log("P1 key is: " + p1.currKeyCode + " '" + p1.currKeyVal + "'");
    console.log("p2 key is: " + p2.currKeyCode + " '" + p2.currKeyVal + "'");




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
