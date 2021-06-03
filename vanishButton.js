
var visible = true;
function mod_hideRoom() {
    if (visible) {
        document.querySelector("#environment-root").setAttribute("visible", false);
        visible = false;
    } else {
        document.querySelector("#environment-root").setAttribute("visible", true)
        visible = true;
    }
}
