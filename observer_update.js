// document.querySelector("[class*=icon-button]").onclick = function() {
// 	console.log("x button was clicked, doing the thing!");
// 	checkPresence();
// }
var chatButton = document.querySelectorAll("[class*=accent4]"); 
console.log(chatButton);

var buttonIntervalCheck;

if (document.querySelector("[class*=accent4]") == null) {
    console.log("chat button does not exist yet");
    buttonIntervalCheck = setInterval(function() {
        if (document.querySelector("[class*=accent4]") != null) {
            console.log("found the button!!!!!!!!!!!!");

            document.querySelector('.ToolbarButton__toolbar-button__1sqrf ToolbarButton__accent4__3i3tf').id = "chat_button";

            clearInterval(buttonIntervalCheck);
        } else {
            console.log("looking for chat button");
        }
    }, 2000);
} else {
    console.log("found the button (on first try)");
}

document.getElementById("chat_button").onclick = function() {
    console.log("you clicked the button!!!!");
}