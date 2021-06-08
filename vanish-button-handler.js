function inject_vanish_backend() {
	AFRAME.registerComponent("vanish-item", {
		schema: {
			event: { type: 'string', default: '' },
			message: { type: 'string', default: 'Hello, World!' }
		},

		init: function () {
			console.log("init called");
			this._hideObject = this._hideObject.bind(this);
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
						
						this._hideObject(this.objectToHide);

            		})
					this.searching = false;
				}
			}
		},
		_hideObject: (function() {
			console.log("hiding/unhiding");
			if (document.querySelector("#" + id).getAttribute("visible")) {
				document.querySelector("#" + id).setAttribute("visible", false);
			} else {
				document.querySelector("#" + id).setAttribute("visible", true);
			}
		})
	})
	console.log("vanish-item was created");
}
inject_vanish_backend();
