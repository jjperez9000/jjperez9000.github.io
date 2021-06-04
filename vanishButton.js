
var lastItemClicked;

document.addEventListener("click", function(){
    // console.log(AFRAME.scenes[0].systems.interaction.state.rightRemote.held);
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

function mod_addButton() {
    console.log("not implemented yet");
}

function inject_createInteractiveBall() {
				
	//Query assets in order to setup template
	let assets = document.querySelector("a-assets");
	// create a new template variable
	let newTemplate = document.createElement("template");
	// create template id
	newTemplate.id = "interactable-ball-media";
	// create a new entity for the template so we can append it to the assets later
	// normally this is done in the Hubs.html "bootstrap" file
	let newEntity = document.createElement("a-entity");
	

    // class="interactable"
    let bh = document.createAttribute("class", "interactable");
    newEntity.setAttribute(bh);
    // body-helper="type: dynamic; mass: 1; collisionFilterGroup: 1; collisionFilterMask: 15;"
    bh.createAttribute("body-helper")
    bh.value = "type: dynamic; mass: 1; collisionFilterGroup: 1; collisionFilterMask: 15;"
    newEntity.setAttribute(bh);
    // owned-object-limiter="counter: #media-counter"
    bh.createAttribute("owned-object-limiter");
    bh.value = "counter: #media-counter";
    newEntity.setAttribute(bh);
    // set-unowned-body-kinematic
    bh.createAttribute("set-unowned-body-kinematic");
    newEntity.setAttribute(bh);
    // is-remote-hover-target
    bh.createAttribute("is-remote-hover-target");
    newEntity.setAttribute(bh);
    // tags="isHandCollisionTarget: true; isHoldable: true; offersHandConstraint: true; offersRemoteConstraint: true; inspectable: true;"
    bh.createAttribute("tags");
    bh.value = "isHandCollisionTarget: true; isHoldable: true; offersHandConstraint: true; offersRemoteConstraint: true; inspectable: true;"
    newEntity.setAttribute(bh);
    // destroy-at-extreme-distances
    bh.createAttribute("destroy-at-extreme-distances");
    newEntity.setAttribute(bh);
    // scalable-when-grabbed
    bh.createAttribute("scalable-when-grabbed");
    newEntity.setAttribute(bh);
    // floaty-object="modifyGravityOnRelease: true; autoLockOnLoad: true;"
    bh.createAttribute("floaty-object");
    bh.value = "modifyGravityOnRelease: true; autoLockOnLoad: true;"
    newEntity.setAttribute(bh);
    // set-yxz-order
    bh.createAttribute("set-yxz-order");
    newEntity.setAttribute(bh);
    // matrix-auto-update
    bh.createAttribute("matrix-auto-update");
    newEntity.setAttribute(bh);
    // hoverable-visuals
    bh.createAttribute("hoverable-visuals");
    newEntity.setAttribute(bh);
    // position-at-border__freeze="target:.freeze-menu"
    bh.createAttribute("position-at-border__freeze");
    bh.value = "target:.freeze-menu";
    newEntity.setAttribute(bh);
    // position-at-border__freeze-unprivileged="target:.freeze-unprivileged-menu"
    bh.createAttribute("position-at-border__freeze-unprivileged");
    bh.value = "target:.freeze-menu-unprivileged-menu";
    newEntity.setAttribute(bh);
    // listed-media
    bh.createAttribute("listed-media");
    newEntity.setAttribute(bh);
    // use-audio-system-settings
    bh.createAttribute("use-audio-system-settings");
    newEntity.setAttribute(bh);

    //code that will potentially break things:
    	// create a sphere geometry with a radius of 0.5 meters
	bh.value = "primitive: sphere; radius: 0.5";
	newEntity.setAttributeNode(bh);
    bh = document.createAttribute("material");
	// set the color to yellow.  You can set a lot of things here, texture, shininess etc.  See the aframe docs on materials
	bh.value = "color:yellow;metalness:1.0;roughness:0.0;";
	newEntity.setAttributeNode(bh);
	
				
	//Once all the attributes are setup on the entity you can append it to the template variable content created above.
	newTemplate.content.appendChild(newEntity);
				
	// once the template is created you append it to the assets
	assets.appendChild(newTemplate);
				
				
	//	This sets up an update function for how often each networked entity needs to update
	// position, rotation, or scale based on each transforms setting in the NAF schema.
	// I'm not sure why it's not a utility function in NAF?
	const vectorRequiresUpdate = epsilon => {
		return () => {
			let prev = null;

			return curr => {
				if (prev === null) {
					prev = new THREE.Vector3(curr.x, curr.y, curr.z);
					return true;
				} else if (!NAF.utils.almostEqualVec3(prev, curr, epsilon)) {
					prev.copy(curr);
					return true;
				}

				return false;
			};
		};
	};

	// Add the new schema to NAF. and declare the networked components and their update 
	// sensitivity using the function above if they modify the transforms.
	NAF.schemas.add({
		template: "#interactable-ball-media",
		components: [
			{
				component: "position",
				requiresNetworkUpdate: vectorRequiresUpdate(0.001)
			},
			{
				component: "rotation",
				requiresNetworkUpdate: vectorRequiresUpdate(0.5)
			},
			{
				component: "scale",
				requiresNetworkUpdate: vectorRequiresUpdate(0.001)
			},
			"media-loader",
			"material",
			"pinnable"
		]
	});
		
}

// we add the prefix inject_ to our utility functions to isolate them from the global namespace
inject_createInteractiveBall();

// we add the prefix mod_ to this function to allow it to be targeted by the chat interface
function mod_addBall(){
	
	if(document.querySelector("a-entity[camera-cube-env]") == null){

		var el = document.createElement("a-entity")
		el.setAttribute("networked", { template: "#interactable-ball-media" } )
		el.object3D.position.y = 2;
		AFRAME.scenes[0].appendChild(el)
		
	}else{
		console.log("a ball already exists");
	}
	
}