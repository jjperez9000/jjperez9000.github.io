// the following ia a presence checker which waits for the chat log to exist so that it
// can attach new commands which will start the mods we inject.  There are other ways to
// do this like trigger-volumes, but this gives us more control and predictable behavior

// const { clear } = require("console");

var chatWindowIntervalCheck;
var groupCreationObserver;
var groupObserver;
var currentGroup = null;

var chatButtonIntervalCheck = setInterval(function () {
	if (document.querySelector("[class*=accent4]") !== undefined) {
		
		console.log("accent4 found")
		clearInterval(chatButtonIntervalCheck);

		detectLog();
	}
}, 2000)

// //function to detect when a new chat window is pulled up
function detectLog() {
	console.log("the log does not exist yet");
	chatWindowIntervalCheck = setInterval(function(){ 
		if(document.querySelector("[class*=message-list]") != null ) {
			console.log("found presence");

			//add a function to the 'x' button on the window so that when it is closed
			//we start searching for a window again
			document.querySelector("[class*=icon-button]").onclick = document.querySelector("[class*=accent4]").onclick = function() {
				groupCreationObserver.disconnect();
				console.log("window closed");
				console.log(document.querySelector("[class*=message-list]"))
				detectLog();
			}

			checkPresence();
		}else{
			// console.log("checking presence");
		}
	}, 2000);
}

// detectLog();



//this function watches for 2 different things: 
//new items in message list and new child messages
//anytime a new user says something a new element is added to the message list
//all of their subsequent messages (until someone else speaks) will be children of that new element
//watchedNode tracks the new element, and watchedNode2 tracks that element's children
function checkPresence() {
	
	const watchedNode = document.querySelector("[class*=message-list]");
	
	//check if we were observing a group before checkPresence() was called
	//this will be the case if a window had previously opened before
	if (currentGroup != null) {
		const watchedNode2 = document.querySelectorAll("[class*=message-group-messages]")[document.querySelectorAll("[class*=message-group-messages]").length-1];
		groupObserver.observe(watchedNode2, {childList: true});
	}

	groupCreationObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {		
			if (mutation.addedNodes) {
				for (var n of mutation.addedNodes){

					document.querySelector("a-scene").dispatchEvent(new CustomEvent("chatevent", { bubbles: true, detail: { text: n.lastChild.textContent } }));		

					//begin observing the new children in the message group
					const watchedNode2 = document.querySelectorAll("[class*=message-group-messages]")[document.querySelectorAll("[class*=message-group-messages]").length-1];
					currentGroup = watchedNode2;

					groupObserver = new MutationObserver(function(mutations) {

						mutations.forEach(function(mutation) {
							
							if (mutation.addedNodes) {
								for (var i of mutation.addedNodes){
									document.querySelector("a-scene").dispatchEvent(new CustomEvent("chatevent", { bubbles: true, detail: { text: i.textContent } }));									
								}
							}
						})
					});
					groupObserver.observe(watchedNode2, {childList: true});
				}
			}
		})

	});

	groupCreationObserver.observe(watchedNode, {childList: true});

	//once the mutation observer is attached to the presence-log we can clear the interval that attaches it
	clearInterval(chatWindowIntervalCheck);
}

document.querySelector("a-scene").addEventListener("chatevent", e => {
	
	// function we want to run we add mod_ to the string to isolate our custom functions
	// from the global namespace and prevent people from running functions through chat
	// interface unless it's one we've added for that purpose.
	
	var myMessage = e.detail.text;
	
	var fnstring = "mod_" + myMessage;
	console.log("function string = " + fnstring);
	// find object
	var fn = window[fnstring];
	
	// is object a function?
	if (typeof fn === "function"){
		fn();
	} else {
		console.log(fn + " is not a function");
	}
});
