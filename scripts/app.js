$(document).on("ready", function(){
console.log('running');




$(document).on("keydown",
  function(event) {
    switch (event.which) {
        case 37: // left arrow key
          console.log("left");
           $('#player-1').animate({ 'margin-left': '-=100' }, 3000);
           break;
        case 39: // right arrow key
          console.log("right");
           $('#player-1').animate({ 'margin-left': '+=100' }, 3000);
           break;
    }
  }
);


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
