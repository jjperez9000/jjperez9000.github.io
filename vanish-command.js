var lastItemClicked;

document.addEventListener("click", function(){
    if (AFRAME.scenes[0].systems.interaction.state.rightRemote.held !== null) {
        lastItemClicked = AFRAME.scenes[0].systems.interaction.state.rightRemote.held;
    }
})

function hideObject(id) {
    if (document.querySelector("#" + id).getAttribute("visible")) {
        document.querySelector("#" + id).setAttribute("visible", false);
    } else {
        document.querySelector("#" + id).setAttribute("visible", true);
    }
}

