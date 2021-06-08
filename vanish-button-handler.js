function inject_vanish_backend() {
	AFRAME.registerComponent("vanish-item", {
		schema: {
			event: { type: 'string', default: '' },
			message: { type: 'string', default: 'Hello, World!' }
		},

		init: function () {
			console.log("init called");
			this.searching = true;
		},

		tick: function () {

			if (this.searching) {
				console.log("tick called");
				console.log(this.el.querySelector(".snap-button"));
				console.log(this.el.querySelector(".snap-button").object3D);
				this.vanishButton = this.el.querySelector(".snap-button");
				this.objectToHide = lastItemClicked.id

				if (this.vanishButton.object3D !== null) {
					console.log("button was found!!! HURRAY!!! ")
            		this.vanishButton.object3D.addEventListener("interact", () => {
            			console.log("holy fuck it works")
						
						hideObject(this.objectToHide);

            		})
					this.searching = false;
				}
			}
		}
	})
	console.log("vanish-item was created");
}
inject_vanish_backend();
