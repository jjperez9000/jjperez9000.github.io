// the following ia a presence checker which waits for the chat log to exist so that it
// can attach new commands which will start the mods we inject.  There are other ways to
// do this like trigger-volumes, but this gives us more control and predictable behavior

var presenceIntervalCheck;
var buttonIntervalCheck;
var observer;
var groupObserver;

function detectLog() {
	console.log("the log does not exist yet");
	presenceIntervalCheck = setInterval(function(){ 
		if(document.querySelector("[class*=message-list]") != null ) {
			console.log("found presence");

			document.querySelector("[class*=icon-button]").onclick = function() {
				console.log("window closed");
				console.log(document.querySelector("[class*=message-list]"))
				buttonIntervalCheck();
				detectLog();
			}

			checkPresence();
		}else{
			console.log("checking presence");
		}
	}, 2000);
}

detectLog();

function checkPresence() {
	
	const watchedNode = document.querySelector("[class*=message-list]");

	console.log(watchedNode.className);
	observer = new MutationObserver(function(mutations) {

		mutations.forEach(function(mutation) {
			
			if (mutation.addedNodes) {
				console.log(mutation.addedNodes.length)
				for (var n of mutation.addedNodes){
					console.log("new group discovered :)")
					console.log(n);

					document.querySelector("a-scene").dispatchEvent(new CustomEvent("chatevent", { bubbles: true, detail: { text: n.lastChild.textContent } }));		
					const watchedNode2 = document.querySelectorAll("[class*=message-group-messages]")[document.querySelectorAll("[class*=message-group-messages]").length-1]
					

					groupObserver = new MutationObserver(function(mutations) {

						mutations.forEach(function(mutation) {
							
							if (mutation.addedNodes) {
								for (var i of mutation.addedNodes){
									console.log("group observe triggered :O")
									console.log(i);

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

	observer.observe(watchedNode, {childList: true});

	//once the mutation observer is attached to the presence-log we can clear the interval that attaches it
	clearInterval(presenceIntervalCheck);
}

document.querySelector("a-scene").addEventListener("chatevent", e => {
	
	// // function we want to run we add mod_ to the string to isolate our custom functions
	// // from the global namespace and prevent people from running functions through chat
	// // interface unless it's one we've added for that purpose.
	
	var myMessage = e.detail.text;
	
	var fnstring = "mod_" + myMessage;
	console.log("function string = " + fnstring);
	// find object
	var fn = window[fnstring];
	
	// is object a function?
	if (typeof fn === "function"){
		fn();
	}else{
		console.log(fn + " is not a function");
	}
});
