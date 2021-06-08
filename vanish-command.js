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
