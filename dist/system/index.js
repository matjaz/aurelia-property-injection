var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);n.prototype=e.prototype,t.prototype=new n};System.register(["aurelia-metadata","aurelia-dependency-injection"],function(t){function e(t,e){return e?void n(t,e):function(e,n){r(e,n,t)}}function n(t,e){var n=a.Metadata.getOwn("design:type",t,e);r(t,e,n)}function r(t,e,n){if(n){var r=t.constructor,i=a.Metadata.getOwn(o,r);if(!i){var c=a.Metadata.getOwn(a.Metadata.instanceActivator,r);if(c){if(!(c instanceof s))throw new Error("Instance activator already set. Can not use property injection.")}else a.Metadata.define(a.Metadata.instanceActivator,s.instance,r);i={},a.Metadata.define(o,i,r)}i[e]=n}}var a,i,o,c,s;return t("inject",e),{setters:[function(t){a=t},function(t){i=t}],execute:function(){t("MetadataKey",o="di:propInjectables"),s=function(t){function e(e){void 0===e&&(e=i.Container.instance),t.call(this),this.container=e}return __extends(e,t),Object.defineProperty(e,"instance",{get:function(){return c||(c=new e)},enumerable:!0,configurable:!0}),e.prototype.invoke=function(t,e){var n=Object.create(t.prototype||Object.prototype);this.injectProperties(n,t);var r=Function.apply.call(t,n,e);return r&&"object"==typeof r&&(n=r,this.injectProperties(n,t)),n},e.prototype.injectProperties=function(t,e){var n=a.Metadata.getOwn(o,e||t.constructor);if(n)for(var r in n)this.injectProperty(t,r,n[r])},e.prototype.injectProperty=function(t,e,n){Object.defineProperty(t,e,{value:this.container.get(n)})},e}(i.ClassActivator),t("PropertyClassActivator",s)}}});