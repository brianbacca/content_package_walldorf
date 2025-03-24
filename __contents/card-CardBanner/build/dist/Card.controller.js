sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(e,t){"use strict";var a;var n;return e.extend("wall.CardBanner.Card",{onInit:function(){n=this;a=n.getOwnerComponent().oCard;n.intervalo=setInterval(n.proximaNoticia,1e4);n._eventDelegate={onclick:function(){n.onRedirect.call(n)}};var e=new sap.ui.model.json.JSONModel({path:jQuery.sap.getModulePath("wall.CardBanner")});this.getView().setModel(e,"imageModel");var t=[{imagenNoticia:e.getProperty("/path")+"/images/softtek-vector-itc.jpg"},{imagenNoticia:e.getProperty("/path")+"/images/energiaEolica.png"},{imagenNoticia:e.getProperty("/path")+"/images/petroleo.jpg"}];this.getView().getModel("banners").setData(t)},reiniciarIntervalo:function(){clearInterval(n.intervalo);n.intervalo=setInterval(n.proximaNoticia,1e4)},proximaNoticia:function(){try{var e=n.getView().byId("carouselSample");e.next()}catch(e){}},onNextPage:function(e){n.reiniciarIntervalo();var t=e.getParameter("activePages"),a=e.getSource().getPages()[t],o=a.getBindingContext("banners");n._oData=o.getObject();if(n._oData.tieneRedireccion===true){setTimeout(function(){n.onAddClass()},500)}else{n.onRemoveClass()}},onAddClass:function(){var e=true;var t=n.getView().byId("carouselSample");t.addStyleClass("bannerHover");n.setOnClick(e)},onRemoveClass:function(){var e=false;var t=n.getView().byId("carouselSample");t.removeStyleClass("bannerHover");n.setOnClick(e)},setOnClick:function(e){const t=this;const a=t.getView().byId("carouselSample");if(e){a.addEventDelegate(t._eventDelegate)}else{a.removeEventDelegate(t._eventDelegate)}},onRedirect:function(){window.open(n._oData.URLRedireccion,"_blank")},compararFechas:function(e,t){if(e.createdAt<t.createdAt){return-1}if(e.createdAt>t.createdAt){return 1}return 0},getBanner:function(){a.showLoadingPlaceholders();a.request({url:"{{destinations.myDestination}}/odata/v2/launchpad-interno/Parametros?$filter=aplicacion eq 'BANNER' and habilitado eq true",parameters:{$format:"json"},method:"GET"}).then(function(e){var t=e.d.results;var o=[];t.forEach(e=>{o.push({imagenNoticia:e.valor1})});n.getView().getModel("banners").setData(o);a.hideLoadingPlaceholders()}.bind(this)).catch(function(e){a.hideLoadingPlaceholders();console.log(e)})}})});
//# sourceMappingURL=Card.controller.js.map