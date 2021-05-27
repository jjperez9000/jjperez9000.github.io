// document.querySelector("[class*=icon-button]").onclick = function() {
// 	console.log("x button was clicked, doing the thing!");
// 	checkPresence();
// }
var chatButton
var chatOpen = false;
var buttonIntervalCheck;

if (document.querySelector('.TextInput__icon-button__m5JFp') == null) {
    console.log("chat button does not exist yet");
    buttonIntervalCheck = setInterval(function() {
        if (document.querySelector('.TextInput__icon-button__m5JFp') != null) {
            console.log("found an x button");
            chatButton = document.querySelector('.TextInput__icon-button__m5JFp');
            chatButton.onclick = function() {
                console.log("window has been closed")
                detectLog();
            
            }
        } else {
            console.log("looking for x button");
        }
    }, 2000);
} else {
    console.log("found the button (on first try)");
}

// TextInput__icon-button__m5JFp