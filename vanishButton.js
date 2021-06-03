
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