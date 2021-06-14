// the following ia a presence checker which waits for the chat log to exist so that it
// can attach new commands which will start the mods we inject.  There are other ways to
// do this like trigger-volumes, but this gives us more control and predictable behavior

var presenceIntervalCheck;
var observer;
var groupObserver;
var currentGroup = null;

var chatButtonIntervalCheck = setInterval(function () {
	if (document.querySelector("[class*=accent4]") !== undefined) {
		
		console.log("chat button found");
		clearInterval(chatButtonIntervalCheck);

		document.querySelector("[class*=accent4]").onclick = detectLog;
	}
}, 2000)

// //function to detect when a new chat window is pulled up
function detectLog() {
	console.log("the chat window does not exist yet");
	presenceIntervalCheck = setInterval(function(){ 
		if(document.querySelector("[class*=message-list]") != null ) {
			console.log("chat window open");

			//add a function to the 'x' button on the window so that when it is closed
			//we start searching for a window again
			document.querySelector("[class*=icon-button]").onclick = document.querySelector("[class*=accent4]").onclick = function() {
				console.log("chat window closed");
				document.querySelector("[class*=accent4]").onclick = detectLog;
			}
			clearInterval(presenceIntervalCheck);
		}else{
			console.log("checking presence");
		}
	}, 300);
}

