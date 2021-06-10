

function inject_vanish_button_template() {

	//Query assets in order to setup template
	let assets = document.querySelector("a-assets");
	// create a new template variable
	let newTemplate = document.createElement("template");
	// create template id
	newTemplate.id = "vanish-button-media";
	// create a new entity for the template so we can append it to the assets later
	// normally this is done in the Hubs.html "bootstrap" file
	let newEntity = document.createElement("a-entity");

	// setup the attributes for the template such and class and components that
	// should be associated with the template entities
				
	// set the class to interactable if you want interaction or some other class
	// based on hubs interaction layers
	newEntity.setAttribute("class", "interactable");

			
	// for attributes with multiple objects in the schema it's easier to setup
	// a varibable to hold the attribute and its values then create the node on
	// the entity
				
	// the body helper component allows you to setup dynamic attributes for physics
	// interactions.  the type can be dynamic or static.  collision filters and
	// masks are used to limit what objects can collide with.  See the body-helper
	// component for more information
	let bh = document.createAttribute("body-helper");
	bh.value = "type: dynamic; mass: 1; collisionFilterGroup: 1; collisionFilterMask: 15;";
	newEntity.setAttributeNode(bh);

	// Button needs geometry so that we can give it a body. This will go away once we get a real model for the button
	// here we reuse the bh variable since the body helper node has been added to the entity.  In this case we are creating the geometry attribute (see aframe docs)
	bh = document.createAttribute("geometry");
	//create a simple geometry sphere of 0.2 meters
	// bh.value = "primitive: box; radius: 0.2";

	bh.value = "primitive: sphere; radius: 0.2";
	newEntity.setAttributeNode(bh);

	// reuse the same bh variable for a material attribute to color the geometry
	bh = document.createAttribute("material");
	// set the color to yellow.  You can set a lot of things here, texture, shininess etc.  See the aframe docs on materials
	bh.value = "color:yellow;metalness:1.0;roughness:0.0;";
	newEntity.setAttributeNode(bh);

	// set the unowned body kinematic component for the object since it's networked
	// and physics related.
	newEntity.setAttribute("set-unowned-body-kinematic", "");

	// sets the remote hover target component on the object
	newEntity.setAttribute("is-remote-hover-target", "");

	// the tags component allows you to filter the collisions and interactable
	// qualities of the entity.  We can reuse bh to set all it's values
	bh = document.createAttribute("tags")
	// set it to be a hand collision target, holdable, give it a hand constraint, a remote constraint, and set to be inspectable with a right click.
	bh.value = "isHandCollisionTarget: true; isHoldable: true; offersHandConstraint: true; offersRemoteConstraint: true; inspectable: true;";
	newEntity.setAttributeNode(bh);

	// you can set the objects to be destroyed at extreme distances in order to avoid having a bunch of hard to find physics objects falling in your hub
	newEntity.setAttribute("destroy-at-extreme-distances", "");

	// sets whether the object can be scaled when you grab it. Check hubs docs or the component to see how it can be scaled in different modes
	newEntity.setAttribute("scalable-when-grabbed", "");
	
	// another component setup.  Check it out in the components in src
	newEntity.setAttribute("set-xyz-order", "");
	
	// important! since the matrix auto update on objects in turned off by default
	// in order to save compute power
	newEntity.setAttribute("matrix-auto-update", "");
	
	// whether this object has a hoverable visuals interaction. You may have to add additional child entities to the template to get this to show up.  Check the component to see how it works 
	newEntity.setAttribute("hoverable-visuals", "");

	// Important!  This Component helps you set the collision shape for the object
	// without it set on the actual entity which contains the mesh (set with the 
	// geometry component above in this case) the physics won't collide and the 
	// object will fall through the ground.  Check the component for details
	bh = document.createAttribute("shape-helper")
	bh.value = "";
	newEntity.setAttributeNode(bh);

	//add the listed-media component
	newEntity.setAttribute("listed-media", "");

/////////////////////////////////////////////////////////////////////

	//create a button that we can use and add it to the ball
	// let newChild = document.createElement("a-entity");
	// newChild.setAttribute("class", "ui interactable-ui");
	// newChild.innerHTML = "<a-entity class='page-label' position='0 -0.2 0' text='value:.; width:2; align:center;' text-raycast-hack></a-entity><a-entity class='next-button' position='0 0 0.1'><a-entity is-remote-hover-target tags='singleActionButton:true; isHoverMenuChild: true;' mixin='rounded-text-button' slice9='width: 0.2'><a-entity sprite icon-button='image: next.png; hoverImage: next.png;' scale='0.070 0.070 0.070' position='0 0 0.005' ></a-entity></a-entity></a-entity>";
	// newEntity.appendChild(newChild);

	let newChild = document.createElement("a-entity");
	newChild.setAttribute("class", "ui interactable-ui");
	newChild.innerHTML = "<a-entity class='page-label' position='0 -0.2 0' text='value:.; width:2; align:center;' text-raycast-hack></a-entity><a-entity class='next-button' position='0 0 0.1'><a-entity is-remote-hover-target tags='singleActionButton:true; isHoverMenuChild: true;' mixin='rounded-text-button' slice9='width: 0.2'><a-entity sprite icon-button='image: next.png; hoverImage: next.png;' scale='0.070 0.070 0.070' position='0 0 0.005' ></a-entity></a-entity></a-entity><a-entity class='freeze-menu' visibility-while-frozen='withinDistance: 100; withPermission: spawn_and_move_media'><a-entity mixin='rounded-text-action-button' is-remote-hover-target tags='singleActionButton:true' pin-networked-object-button='tipSelector:.pin-button-tip; labelSelector:.pin-button-label;' position='0 0.125 0.5'><a-entity class='pin-button-label' visible='false' text=' value:pin; width:1.75; align:center;' text-raycast-hack position='0 0 0.001'> </a-entity></a-entity><a-entity class='pin-button-tip' text='value:Pinning will broadcast this object to Discord.; width:1.75; align:center; color:#fff;' visible='false' text-raycast-hack slice9='color: #0F40A9; width: 1.8; height: 0.2; left: 64; top: 64; right: 66; bottom: 66; opacity: 1.0; src: #button' position='0 0.6 0.001'></a-entity><a-entity is-remote-hover-target tags='singleActionButton:true;' mixin='rounded-text-button' camera-focus-button='track: false' position='-0.25 0.375 0.001'><a-entity text=' value:focus; width:1.75; align:center;' text-raycast-hack position='0.075 0 0.02'></a-entity><a-entity sprite icon-button='image: camera-action.png; hoverImage: camera-action.png;' scale='0.165 0.165 0.165' position='-0.125 0.005 0.02' ></a-entity></a-entity><a-entity is-remote-hover-target tags='singleActionButton:true;' mixin='rounded-text-button' camera-focus-button='track: true' position='0.25 0.375 0.001'><a-entity text=' value:track; width:1.75; align:center;' text-raycast-hack position='0.075 0 0.02'></a-entity><a-entity sprite icon-button='image: camera-action.png; hoverImage: camera-action.png;' scale='0.165 0.165 0.165' position='-0.125 0.005 0.001' ></a-entity></a-entity><a-entity mixin='rounded-button' is-remote-hover-target tags='singleActionButton: true;' hide-when-pinned-and-forbidden='whenPinned: true' remove-networked-object-button position='0 -0.375 0.001'><a-entity sprite='name: remove-action.png' icon-button='image: remove-action.png; hoverImage: remove-action.png' scale='0.165 0.165 0.165' position='0 0 0.001' ></a-entity></a-entity><a-entity visibility-on-content-types='contentTypes: video/ audio/ image/ application/vnd.apple.mpegurl application/x-mpegurl application/pdf; visible: false;'><a-entity mixin='rounded-button' is-remote-hover-target tags='singleActionButton: true;' drop-object-button hide-when-pinned-and-forbidden='whenPinned: true' position='0 -0.625 0.001'><a-entity sprite icon-button='image: drop-action.png; hoverImage: drop-action.png' scale='0.165 0.165 0.165' position='0 0 0.001' ></a-entity></a-entity></a-entity><a-entity mixin='rounded-button' is-remote-hover-target tags='isHoldable: true; holdableButton: true;' inspect-button visibility-on-content-types='contentTypes: video/ audio/ image/ application/vnd.apple.mpegurl application/x-mpegurl application/pdf;' position='0 -0.625 0.001'><a-entity sprite icon-button='image: focus-action.png; hoverImage: focus-action.png' scale='0.165 0.165 0.165' position='0 0 0.001' ></a-entity></a-entity><a-entity class='deserialize-drawing' visible='false' mixin='rounded-button' is-remote-hover-target tags='singleActionButton: true;' deserialize-drawing-button position='-0.3 -0.625 0.001'><a-entity sprite icon-button='image: deserialize-action.png; hoverImage: deserialize-action.png' scale='0.165 0.165 0.165' position='0 0 0.001' ></a-entity></a-entity><a-entity is-remote-hover-target tags='singleActionButton:true;' mixin='rounded-text-button' open-media-button='onlyOpenLink: true' position='0.43 -0.375 0.001'><a-entity text='value:open link; width:1.75; align:center;' text-raycast-hack position='0 0 0.02'></a-entity></a-entity><a-entity mixin='rounded-text-button ui' is-remote-hover-target tags='singleActionButton: true; isHoverMenuChild: true;' local-refresh-media-button position='0.43 -0.6 0.001' ><a-entity text='value:refresh; width:1.75; align:center;' text-raycast-hack position='0 0 0.02'></a-entity></a-entity><a-entity is-remote-hover-target tags='singleActionButton:true;' mixin='rounded-text-button' clone-media-button position='-0.43 -0.375 0.001'><a-entity text='value:clone; width:1.75; align:center;' text-raycast-hack position='0 0 0.02'></a-entity></a-entity><a-entity mixin='rounded-action-button' tags='isHoldable: true; holdableButton: true;' is-remote-hover-target transform-button transform-button-selector hide-when-pinned-and-forbidden position='-0.3 -0.125 0.001'><a-entity sprite icon-button='image: rotate-action.png; hoverImage: rotate-action.png;' scale='0.165 0.165 0.165' position='0 0 0.001'></a-entity></a-entity><a-entity mixin='rounded-action-button' is-remote-hover-target tags='singleActionButton:true;' mirror-media-button visibility-on-content-types='contentTypes: video/ audio/ image/ application/vnd.apple.mpegurl application/x-mpegurl application/pdf;' position='0 -0.125 0.001'><a-entity sprite icon-button='image: inspect-action.png; hoverImage: inspect-action.png' scale='0.165 0.165 0.165' position='0 0 0.001' ></a-entity></a-entity><a-entity mixin='rounded-action-button' tags='isHoldable: true; holdableButton: true;' is-remote-hover-target scale-button hide-when-pinned-and-forbidden position='0.3 -0.125 0.001'><a-entity sprite icon-button='image: scale-action.png; hoverImage: scale-action.png' scale='0.165 0.165 0.165' position='0 0 0.001' ></a-entity></a-entity></a-entity><a-entity class='freeze-unprivileged-menu' visibility-while-frozen='withinDistance: 100; withoutPermission: spawn_and_move_media;'><a-entity mixin='rounded-text-button ui' is-remote-hover-target tags='singleActionButton: true; isHoverMenuChild: true;' local-refresh-media-button position='0 -0.6 0.001'><a-entity text='value:refresh; width:1.75; align:center;' text-raycast-hack position='0 0 0.02'></a-entity></a-entity><a-entity is-remote-hover-target tags='singleActionButton:true;' mixin='rounded-text-button' open-media-button='onlyOpenLink: true' position='0 -0.25 0.001'><a-entity text='value:open link; width:1.75; align:center;' text-raycast-hack position='0 0 0.02'></a-entity></a-entity><a-entity mixin='rounded-action-button' is-remote-hover-target tags='singleActionButton:true;' mirror-media-button visibility-on-content-types='contentTypes: video/ audio/ image/ application/vnd.apple.mpegurl application/x-mpegurl application/pdf;' position='0 0 0.001'><a-entity sprite icon-button='image: inspect-action.png; hoverImage: inspect-action.png' scale='0.165 0.165 0.165' position='0 0 0.001'></a-entity></a-entity><a-entity mixin='rounded-button' tags='isHoldable: true; holdableButton: true;' is-remote-hover-target inspect-button position='0 0.25 0.001'><a-entity sprite icon-button='image: focus-action.png; hoverImage: focus-action.png' scale='0.165 0.165 0.165' position='0 0 0.001'></a-entity></a-entity></a-entity>";
	
	newEntity.appendChild(newChild);

	//give function to the added button
	newEntity.setAttribute("vanish-item");


/////////////////////////////////////////////////////////////////////

	//Once all the attributes are setup on the entity you can append it to the template variable content created above.
	newTemplate.content.appendChild(newEntity);
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
		template: "#vanish-button-media",
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
			"vanish-button",
			"material",
			"pinnable"
		]
	});

}
// we add the prefix inject_ to our utility functions to isolate them from the global namespace
inject_vanish_button_template();


// we add the prefix mod_ to this function to allow it to be targeted by the chat interface
function mod_addBall() {

	var el = document.createElement("a-entity")
	el.setAttribute("networked", { template: "#vanish-button-media" })
	el.setAttribute("floaty-object", "modifyGravityOnRelease: true; autoLockOnLoad: true; autoLockOnRelease: true");
	el.setAttribute("media-loader", { animate: false, fileIsOwned: true });
	el.object3D.position.y = 2;

	AFRAME.scenes[0].appendChild(el);
}


