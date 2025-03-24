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

	return Controller.extend("wall.CardCurvaDemanda.Card", {
		onInit: function () {
			oController = this;
			oCard = oController.getOwnerComponent().oCard;
			_yaPasePorElAfterRendering = false;

			var oImageModel = new sap.ui.model.json.JSONModel({
				path: jQuery.sap.getModulePath("wall.CardCurvaDemanda")
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
			let oVizFrame = this.getView().byId("idVizFrame");
			let oPopOver = this.getView().byId("idPoTipos");
             oPopOver.connect(oVizFrame.getVizUid());

			 oVizFrame.invalidate();
			oVizFrame.rerender();


			
		},


		_consultarOData: function () {
				var oModel = new sap.ui.model.json.JSONModel();

				var oData = {
					"hoy": [
						{ "hora": "00:00", "demanda": 1900 },
						{ "hora": "01:00", "demanda": 1800 },
						{ "hora": "02:00", "demanda": 1700 },
						{ "hora": "03:00", "demanda": 1650 },
						{ "hora": "04:00", "demanda": 1600 },
						{ "hora": "05:00", "demanda": 1700 },
						{ "hora": "06:00", "demanda": 1900 },
						{ "hora": "07:00", "demanda": 2100 },
						{ "hora": "08:00", "demanda": 2400 },
						{ "hora": "09:00", "demanda": 2800 },
						{ "hora": "10:00", "demanda": 3000 },
						{ "hora": "11:00", "demanda": 3200 }
					],
					"ayer": [
						{ "hora": "00:00", "demanda": 2500 },
						{ "hora": "01:00", "demanda": 2400 },
						{ "hora": "02:00", "demanda": 2300 },
						{ "hora": "03:00", "demanda": 2200 },
						{ "hora": "04:00", "demanda": 2100 },
						{ "hora": "05:00", "demanda": 2000 },
						{ "hora": "06:00", "demanda": 2100 },
						{ "hora": "07:00", "demanda": 2200 },
						{ "hora": "08:00", "demanda": 2400 },
						{ "hora": "09:00", "demanda": 2600 },
						{ "hora": "10:00", "demanda": 2800 },
						{ "hora": "11:00", "demanda": 3000 }
					],
					"semana_anterior": [
						{ "hora": "00:00", "demanda": 2300 },
						{ "hora": "01:00", "demanda": 2250 },
						{ "hora": "02:00", "demanda": 2200 },
						{ "hora": "03:00", "demanda": 2150 },
						{ "hora": "04:00", "demanda": 2100 },
						{ "hora": "05:00", "demanda": 2050 },
						{ "hora": "06:00", "demanda": 2150 },
						{ "hora": "07:00", "demanda": 2300 },
						{ "hora": "08:00", "demanda": 2500 },
						{ "hora": "09:00", "demanda": 2700 },
						{ "hora": "10:00", "demanda": 2900 },
						{ "hora": "11:00", "demanda": 3100 }
					]
				};
			
				var aMergedData = [];
			
				oData.hoy.forEach(item => {
					aMergedData.push({ ...item, dia: "Hoy" });
				});
				oData.ayer.forEach(item => {
					aMergedData.push({ ...item, dia: "Ayer" });
				});
				oData.semana_anterior.forEach(item => {
					aMergedData.push({ ...item, dia: "Semana Anterior" });
				});
			
				oModel.setData(aMergedData);
				oController.getView().setModel(oModel, "oGrafico");
			
				console.log("Datos para el gráfico:", oModel.getData());
		},

	});
});