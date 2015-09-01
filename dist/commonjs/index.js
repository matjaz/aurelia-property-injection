function inject(t,e){return e?void injectFromMetadata(t,e):function(e,a){injectType(e,a,t)}}function injectFromMetadata(t,e){var a=aurelia_metadata_1.Metadata.getOwn("design:type",t,e);injectType(t,e,a)}function injectType(t,e,a){if(a){var n=t.constructor,i=aurelia_metadata_1.Metadata.getOwn(exports.MetadataKey,n);if(!i){var r=aurelia_metadata_1.Metadata.getOwn(aurelia_metadata_1.Metadata.instanceActivator,n);if(r){if(!(r instanceof PropertyClassActivator))throw new Error("Instance activator already set. Can not use property injection.")}else aurelia_metadata_1.Metadata.define(aurelia_metadata_1.Metadata.instanceActivator,PropertyClassActivator.instance,n);i={},aurelia_metadata_1.Metadata.define(exports.MetadataKey,i,n)}i[e]=a}}var __extends=this&&this.__extends||function(t,e){function a(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);a.prototype=e.prototype,t.prototype=new a},aurelia_metadata_1=require("aurelia-metadata"),aurelia_dependency_injection_1=require("aurelia-dependency-injection");exports.MetadataKey="di:propInjectables";var singleton,PropertyClassActivator=function(t){function e(e,a){void 0===e&&(e=aurelia_dependency_injection_1.Container.instance),void 0===a&&(a=aurelia_dependency_injection_1.ClassActivator.instance),t.call(this),this.container=e,this.classActivator=a,this.container=e,this.classActivator=a}return __extends(e,t),Object.defineProperty(e,"instance",{get:function(){return singleton||(singleton=new e)},enumerable:!0,configurable:!0}),e.prototype.invoke=function(t,e){var a=this.classActivator.invoke(t,e),n=aurelia_metadata_1.Metadata.getOwn(exports.MetadataKey,t);if(n)for(var i in n)this.injectProperty(a,i,n[i]);return a},e.prototype.injectProperty=function(t,e,a){Object.defineProperty(t,e,{value:this.container.get(a)})},e}(aurelia_dependency_injection_1.ClassActivator);exports.PropertyClassActivator=PropertyClassActivator,exports.inject=inject;
