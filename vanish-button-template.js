

function inject_createInteractiveBall() {

	//Query assets in order to setup template
	let assets = document.querySelector("a-assets");
	let newTemplate = document.createElement("template");
	newTemplate.id = "interactable-ball-media";
	let newEntity = document.createElement("a-entity");
	newEntity.setAttribute("class", "interactable");

	let bh = document.createAttribute("body-helper");
	bh.value = "type: dynamic; mass: 1; collisionFilterGroup: 1; collisionFilterMask: 15;";
	newEntity.setAttributeNode(bh);

	bh = document.createAttribute("geometry");
	bh.value = "primitive: sphere; radius: 0.2";
	newEntity.setAttributeNode(bh);

	bh = document.createAttribute("material");
	bh.value = "color:yellow;metalness:1.0;roughness:0.0;";
	newEntity.setAttributeNode(bh);

	newEntity.setAttribute("set-unowned-body-kinematic", "");

	newEntity.setAttribute("is-remote-hover-target", "");

	bh = document.createAttribute("tags")
	bh.value = "isHandCollisionTarget: true; isHoldable: true; offersHandConstraint: true; offersRemoteConstraint: true; inspectable: true;";
	newEntity.setAttributeNode(bh);

	newEntity.setAttribute("destroy-at-extreme-distances", "");

	newEntity.setAttribute("scalable-when-grabbed", "");

	newEntity.setAttribute("set-xyz-order", "");

	newEntity.setAttribute("matrix-auto-update", "");

	newEntity.setAttribute("hoverable-visuals", "");

	bh = document.createAttribute("shape-helper")
	bh.value = "";
	newEntity.setAttributeNode(bh);

	newEntity.setAttribute("listed-media", "");

	//slap the button on there
	let newChild = document.createElement("a-entity");
	newChild.setAttribute("class", "ui interactable-ui");
	newChild.innerHTML = "<a-entity class='snap-button' mixin='rounded-action-button' is-remote-hover-target='' tags='singleActionButton: true;' position='0 0 .25' scale='1 1 1' slice9='' text-button=''></a-entity>"
	newEntity.appendChild(newChild);

	//Once all the attributes are setup on the entity you can append it to the template variable content created above.
	newTemplate.content.appendChild(newEntity);
	assets.appendChild(newTemplate);

	newEntity.setAttribute("vanish-item");


	//need this or it won't work
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
function mod_addBall() {

	var el = document.createElement("a-entity")
	el.setAttribute("networked", { template: "#interactable-ball-media" })

	el.setAttribute("floaty-object", "modifyGravityOnRelease: true; autoLockOnLoad: true; autoLockOnRelease: true");
	el.setAttribute("media-loader", { animate: false, fileIsOwned: true });
	el.object3D.position.y = 2;

	AFRAME.scenes[0].appendChild(el);
}


