sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("wall.CardBanner.Component", {
		metadata : {
			manifest: "json"
		},
		onCardReady: function (oCard) {
			this.oCard = oCard;
		}
	});

	return Component;

});