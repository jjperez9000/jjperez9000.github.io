var lastItemClicked;

document.addEventListener("click", function(){
    if (AFRAME.scenes[0].systems.interaction.state.rightRemote.held !== null) {
        lastItemClicked = AFRAME.scenes[0].systems.interaction.state.rightRemote.held;
    }
})

function mod_hideObject() {
    if (document.querySelector("#" + lastItemClicked.id).getAttribute("visible")) {
        document.querySelector("#" + lastItemClicked.id).setAttribute("visible", false);
    } else {
        document.querySelector("#" + lastItemClicked.id).setAttribute("visible", true);
    }
}

function mod_test() {
    console.log("hello world");
}

let temp = lastItemClicked.getAttributeNames()
temp.forEach(element => {
    console.log(lastItemClicked.getAttribute(element));
});