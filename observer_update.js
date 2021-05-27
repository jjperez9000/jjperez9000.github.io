// document.querySelector("[class*=icon-button]").onclick = function() {
// 	console.log("x button was clicked, doing the thing!");
// 	checkPresence();
// }
var chatButton = document.querySelectorAll("[class*=accent4]"); 
console.log(chatButton);

var presenceIntervalCheck;

if (document.querySelector("[class*=accent4]") == null) {
    console.log("chat button does not exist yet");
    presenceIntervalCheck = setInterval(function() {
        if (document.querySelector("[class*=accent4]") != null) {
            console.log("found the button!!!!!!!!!!!!");
            clearInterval(this);
        } else {
            console.log("looking for chat button");
        }
    }, 2000);
} else {
    console.log("found the button (on first try)");
}