
var lastItemClicked;

document.addEventListener("click", function(){
    // console.log(AFRAME.scenes[0].systems.interaction.state.rightRemote.held);
    if (AFRAME.scenes[0].systems.interaction.state.rightRemote.held !== null) {
        lastItemClicked = AFRAME.scenes[0].systems.interaction.state.rightRemote.held;
    }
})

function mod_hideRoom() {
    if (document.querySelector("#" + lastItemClicked.id).visible) {
        document.querySelector("#" + lastItemClicked.id).setAttribute("visible", false);
    } else {
        document.querySelector("#" + lastItemClicked.id).setAttribute("visible", true);
    }
}

