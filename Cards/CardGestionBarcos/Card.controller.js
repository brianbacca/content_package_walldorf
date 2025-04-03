sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Token",
'sap/viz/ui5/format/ChartFormatter',
'sap/viz/ui5/api/env/Format',

], function (MessageToast, Controller, JSONModel,Token,ChartFormatter,Format) {
	"use strict";
	var oController;
	var oCard,
	_yaPasePorElAfterRendering;

	return Controller.extend("wall.CardGestionBarcos.Card", {
		onInit: function () {
			oController = this;
			oCard = oController.getOwnerComponent().oCard;
			_yaPasePorElAfterRendering = false;

			var oImageModel = new sap.ui.model.json.JSONModel({
				path: jQuery.sap.getModulePath("wall.CardGestionBarcos")
			});
			this.getView().setModel(oImageModel, "imageModel");

			var card = oController.getView().byId("card");

			oController._consultarOData();

			// Define las propiedades del gráfico
			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			
			let json = new sap.ui.model.json.JSONModel({
			
				
			});
			
			// Establecer el modelo en la vista
			this.getView().setModel(json, "vizProp");
			
			// Conectar el Popover
			let oVizFrame = this.getView().byId("idDonutChart");
			let oPopOver = this.getView().byId("idPoBarcos");

			
		},


		_consultarOData: function () {
			var oModel = new sap.ui.model.json.JSONModel();
		
			var oData = {
				"origen": [
					{ "origen": "argentina", "cantidad": 10 },
					{ "origen": "qatar", "cantidad": 5 },
					{ "origen": "eeuu", "cantidad": 4 },
					{ "origen": "noruega", "cantidad": 3 },
					{ "origen": "australia", "cantidad": 5 }
				],
				"total": 27
			};
			
			var oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel, "graficos");
		
			console.log("Datos para el gráfico:", oModel.getData());
		}
	});
});