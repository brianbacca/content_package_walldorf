sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";
	var oCard;
	var oController;

	return Controller.extend("wall.CardPeticionesOfertas.Card", {
		onInit: function () {
			oController = this;
			oCard = oController.getOwnerComponent().oCard;

			var oImageModel = new sap.ui.model.json.JSONModel({
				path: jQuery.sap.getModulePath("wall.CardPeticionesOfertas")
			});
			this.getView().setModel(oImageModel, "imageModel");

			var card = oController.getView().byId("card");
		},

	});
});