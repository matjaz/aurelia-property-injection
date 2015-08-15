"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function inject(e,t){var a=_aureliaMetadata.Metadata.getOwn("design:type",e,t);if(a){var n=e.constructor,r=_aureliaMetadata.Metadata.getOwn(MetadataKey,n);if(!r){var i=_aureliaMetadata.Metadata.getOwn(_aureliaMetadata.Metadata.instanceActivator,n);if(i){if(!(i instanceof PropertyClassActivator))throw new Error("Instance activator already set. Can not use property injection.")}else _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.instanceActivator,PropertyClassActivator.instance,n);r={},_aureliaMetadata.Metadata.define(MetadataKey,r,n)}r[t]=a}}exports.__esModule=!0;var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();exports.inject=inject;var _aureliaMetadata=require("aurelia-metadata"),_aureliaDependencyInjection=require("aurelia-dependency-injection"),MetadataKey="di:propInjectables";exports.MetadataKey=MetadataKey;var singleton,PropertyClassActivator=function(e){function t(){var a=arguments.length<=0||void 0===arguments[0]?_aureliaDependencyInjection.Container.instance:arguments[0],n=arguments.length<=1||void 0===arguments[1]?_aureliaDependencyInjection.ClassActivator.instance:arguments[1];_classCallCheck(this,t),e.call(this),this.container=a,this.classActivator=n}return _inherits(t,e),_createClass(t,null,[{key:"instance",get:function(){return singleton||(singleton=new t)}}]),t.prototype.invoke=function(e,t){var a=this.classActivator.invoke(e,t),n=_aureliaMetadata.Metadata.getOwn(MetadataKey,e);if(n)for(var r in n)this.injectProperty(a,r,n[r]);return a},t.prototype.injectProperty=function(e,t,a){Object.defineProperty(e,t,{value:this.container.get(a)})},t}(_aureliaDependencyInjection.ClassActivator);exports.PropertyClassActivator=PropertyClassActivator;