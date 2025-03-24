// sap.ui.define([
// 	"sap/m/MessageToast",
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/model/json/JSONModel"
// ], function (MessageToast, Controller, JSONModel) {
// 	"use strict";

// 	return Controller.extend("wall.CardBanner.Card", {
// 		onInit: function () {
//             var cardId = "wall.CardBanner";
//             cardId = cardId.replace(/\./g,'/');
// 			var oImgModel = new JSONModel({
//                 Image_1 : sap.ui.require.toUrl(cardId + "/images") + "/Image_1.png"
//             });
// 			this.getView().setModel(oImgModel, "images");
// 		}
// 	});
// });


sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	
], function (Controller, JSONModel) {
	"use strict";
	var oCard;
	var oController;

	return Controller.extend("wall.CardBanner.Card", {
		onInit: function () {
			oController = this;
			oCard = oController.getOwnerComponent().oCard;
			oController.intervalo =  setInterval(oController.proximaNoticia,10000);
		
			oController._eventDelegate = ({
				onclick: function() {
					oController.onRedirect.call(oController);
				}
			});

			var oImageModel = new sap.ui.model.json.JSONModel({
				path: jQuery.sap.getModulePath("wall.CardBanner")
			});
			this.getView().setModel(oImageModel, "imageModel");
			
			var aImagenes = [
				{ imagenNoticia: oImageModel.getProperty("/path") + "/images/softtek-vector-itc.jpg" },
				{ imagenNoticia: oImageModel.getProperty("/path") + "/images/energiaEolica.png"},
				{ imagenNoticia: oImageModel.getProperty("/path") + "/images/petroleo.jpg"},

			];
			
			this.getView().getModel("banners").setData(aImagenes);
		},

	

		reiniciarIntervalo : function(){
			clearInterval(oController.intervalo)
			oController.intervalo = setInterval(oController.proximaNoticia,10000)
		},

		proximaNoticia:function () {
			try{
				var card = oController.getView().byId("carouselSample");
				card.next();
			}
			catch(e){

			}
		},

		onNextPage: function (oEvent) {
			oController.reiniciarIntervalo();
			var iPageIndex = oEvent.getParameter("activePages"),
			oPage = oEvent.getSource().getPages()[iPageIndex],
			oContext = oPage.getBindingContext("banners");
			oController._oData = oContext.getObject()

			if (oController._oData.tieneRedireccion === true) {
				setTimeout
					(function () {
						oController.onAddClass();
					}, 500);

			} else {
				oController.onRemoveClass();
			}
		},

		onAddClass: function() {
			var bOnclick  = true;
			var oControl = oController.getView().byId("carouselSample"); 
			oControl.addStyleClass("bannerHover"); 
			oController.setOnClick(bOnclick)
		},

		onRemoveClass: function() {
			var bOnclick  = false;
			var oControl = oController.getView().byId("carouselSample"); 
			oControl.removeStyleClass("bannerHover"); 
			oController.setOnClick(bOnclick)
		},

	
		setOnClick: function(bOnclick) {
			const oController = this;
			const bannerWsp = oController.getView().byId("carouselSample");
			if(bOnclick){
				bannerWsp.addEventDelegate(oController._eventDelegate)
			} else {
				bannerWsp.removeEventDelegate(oController._eventDelegate)
			}
		},
		

		onRedirect: function () {
			window.open(oController._oData.URLRedireccion, "_blank");
		},

	
		
		compararFechas:function (a, b) {
            if (a.createdAt < b.createdAt) {
                return -1;
            }
            if (a.createdAt > b.createdAt) {
                return 1;
            }
            return 0;
          },

		  	// _actualizarDatosAlVolver : function(){
		// 	window.addEventListener("hashchange", function (oEvent) {
		// 		// var regexNew = /Shell-home/g;
		// 		var regexAlmacenamiento = /Almacenamiento-Show/g;
		// 		var regexFijaciones = /FijacionesDePrecios-display/g;
		// 		var regexInsumos = /MisInsumos-Show/g;
		// 		var regexMisDatos = /datos-edit/g;

		// 		var url = oEvent.oldURL;

		// 		switch (true) {
		// 			case regexAlmacenamiento.test(url):
		// 				sap.ui.controller("hb4.CardEstablecimientos.Card").onActualizar();
		// 			  	break;
		// 			case regexFijaciones.test(url):
		// 				sap.ui.controller("hb4.CardFijaciones.Card").onActualizar();
		// 			 	break;
		// 			case regexInsumos.test(url):
		// 				sap.ui.controller("hb4.CardMisInsumos.Card").onActualizar();
		// 			  	break;
		// 			case regexMisDatos.test(url):
		// 				sap.ui.controller("hb4.CardMisDatos.Card").onActualizar();
		// 				break;
		// 		}
		// 	}, true);
		// },

		getBanner:function(){
			oCard.showLoadingPlaceholders();
			oCard.request({
				url: "{{destinations.myDestination}}/odata/v2/launchpad-interno/Parametros?$filter=aplicacion eq 'BANNER' and habilitado eq true",
				parameters: {
					"$format": "json"
				},
				method: "GET"
			})
			.then(function (oRes) {
				//oRes.d.results.sort(oController.compararFechas);
				//oController.getView().getModel("banners").setData(oRes.d.results);
				
				var result = oRes.d.results;
				var aImagenes = [];
				result.forEach(img => {
					aImagenes.push({imagenNoticia:img.valor1})
				});
				oController.getView().getModel("banners").setData(aImagenes);
				oCard.hideLoadingPlaceholders();
			}.bind(this))
			.catch(function (e) {
				oCard.hideLoadingPlaceholders();
				console.log(e);
			});
		},
	});
});