sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("wall.CardInvisible.Card", {
		onInit: function () {
            var cardId = "wall.CardInvisible";
            cardId = cardId.replace(/\./g,'/');
			var oImgModel = new JSONModel({
                Image_1 : sap.ui.require.toUrl(cardId + "/images") + "/Image_1.png"
            });
			this.getView().setModel(oImgModel, "images");
		}
	});
});