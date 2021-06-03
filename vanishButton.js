
var visible = true;
function mod_hideRoom() {
    if (visible) {
        document.querySelector(".CombinedMesh").setAttribute("visible", false);
        visible = false;
    } else {
        document.querySelector(".CombinedMesh").setAttribute("visible", true)
        visible = true;
    }
}

document.addEventListener("click", function(){
    console.log(AFRAME.scenes[0].systems.interaction.state.rightRemote.held);
})