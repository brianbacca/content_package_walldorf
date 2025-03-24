sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var oCard;
	var oController;

	return Controller.extend("wall.CardInvisible.Card", {
		onInit: function () {
            oController = this;
            oCard = oController.getOwnerComponent().oCard;
			oCard.setVisible(false);
		}
	});
});
