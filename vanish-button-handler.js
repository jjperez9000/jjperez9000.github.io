function inject_vanish_backend() {
	AFRAME.registerComponent("vanish-item", {

		init: function () {
			this._hideObject = this._hideObject.bind(this);
			this.searching = true;
		},

		tick: function () {
			
			if (this.searching) {	
				console.log("tick claled");
				this.vanishButton = this.el.querySelector(".snap-button");

				//save last item interacted with
				if (lastItemClicked !== undefined) {
					this.objectToHide = lastItemClicked.id;
				}

				if (this.vanishButton.object3D !== null) {
					//create an event listener for when the button is clicked
            		this.vanishButton.object3D.addEventListener("interact", () => {						
						if (this.objectToHide !== undefined) {
							//hide object when button is clicked
							this._hideObject();
						} else {
							console.log("this button is linked to nothing");
						}

            		})
					this.searching = false;
				}
			}
		},
		_hideObject: function() {
			if (document.querySelector("#" + this.objectToHide).getAttribute("visible")) {
				document.querySelector("#" + this.objectToHide).setAttribute("visible", false);
			} else {
				document.querySelector("#" + this.objectToHide).setAttribute("visible", true);
			}
		}
	})
}
inject_vanish_backend();
