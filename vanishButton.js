
var visible = true;
var lastItemClicked;
function mod_hideRoom() {
    if (visible) {
        document.querySelector(lastItemClicked.id).setAttribute("visible", false);
        visible = false;
    } else {
        document.querySelector(lastItemClicked.id).setAttribute("visible", true)
        visible = true;
    }
}

document.addEventListener("click", function(){
    console.log(AFRAME.scenes[0].systems.interaction.state.rightRemote.held);
    lastItemClicked = AFRAME.scenes[0].systems.interaction.state.rightRemote.held;
})