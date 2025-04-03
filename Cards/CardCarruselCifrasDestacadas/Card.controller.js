sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";
	var oController;
	var oCard,
	_yaPasePorElAfterRendering;

	return Controller.extend("wall.CardCarruselCifrasDestacadas.Card", {
		onInit: function () {
			oController = this;
			oCard = oController.getOwnerComponent().oCard;
			_yaPasePorElAfterRendering = false;

			var oImageModel = new sap.ui.model.json.JSONModel({
				path: jQuery.sap.getModulePath("wall.CardCarruselCifrasDestacadas")
			});
			this.getView().setModel(oImageModel, "imageModel");

			var card = oController.getView().byId("card");
			card.addEventDelegate({
				onclick: function () {
					oController.handleSeeDetails.call(oController);
				}.bind(oController)
			});
		},

		onAfterRendering: function () {

		},



	});
});