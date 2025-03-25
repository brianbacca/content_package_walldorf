sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";
	var oCard;
	var oController;

	return Controller.extend("wall.CardMapa.Card", {
		onInit: function () {
			oController = this;
			oCard = oController.getOwnerComponent().oCard;

			var oImageModel = new sap.ui.model.json.JSONModel({
				path: jQuery.sap.getModulePath("wall.CardMapa")
			});
			this.getView().setModel(oImageModel, "imageModel");

			var card = oController.getView().byId("card");
			card.addEventDelegate({
				onclick: function () {
					// oController._navegarALaApp.call(oController);
				}.bind(oController)
			});
		},

		// _navegarALaApp: function () {
		// 	var oComponent = this.getOwnerComponent(),
		// 		oCard = oComponent.oCard;
		// 		var oComponent = oController.getOwnerComponent();
		// 		sap.ui.require(["sap/ushell/Container"], async function (Container) {
		// 			try {
		// 				const Navigation = await Container.getServiceAsync("Navigation");
		// 				Navigation.navigate({
		// 					target: {
		// 						semanticObject: "SOOrderList",
		// 						action: "Display"
		// 					}
		// 				}, oComponent);
		// 			} catch (error) {
		// 				console.error("Error al obtener el servicio de navegación:", error);
		// 			}
		// 		})

		// }
	});
});