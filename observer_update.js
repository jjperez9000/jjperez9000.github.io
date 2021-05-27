// document.querySelector("[class*=icon-button]").onclick = function() {
// 	console.log("x button was clicked, doing the thing!");
// 	checkPresence();
// }
var chatButton = document.querySelectorAll("[class*=accent4]"); 
console.log(chatButton);

var buttonIntervalCheck;
var currentButton;

if (document.querySelector("[class*=accent4]") == null) {
    console.log("chat button does not exist yet");
    buttonIntervalCheck = setInterval(function() {
        if (document.querySelector("[class*=accent4]") != null) {
            console.log("found the button!!!!!!!!!!!!");
            chatButton = document.querySelector("[class*=accent4]"); 
            clearInterval(buttonIntervalCheck);
        } else {
            console.log("looking for chat button");
        }
    }, 2000);
} else {
    console.log("found the button (on first try)");
}
chatButton.onclick = function() {console.log("button does thing");}