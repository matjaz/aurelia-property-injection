import { Metadata } from 'aurelia-metadata';
import { ClassActivator, Container } from 'aurelia-dependency-injection';
export const MetadataKey = 'di:propInjectables';
var singleton;
export class PropertyClassActivator extends ClassActivator {
    constructor(container = Container.instance) {
        super();
        this.container = container;
    }
    static get instance() {
        return singleton || (singleton = new PropertyClassActivator());
    }
    invoke(fn, args) {
        var instance = Object.create(fn.prototype || Object.prototype);
        // inject properties before calling constructor
        this.injectProperties(instance, fn);
        var result = Function.apply.call(fn, instance, args);
        if (result && typeof result == 'object') {
            instance = result;
            this.injectProperties(instance, fn);
        }
        return instance;
    }
    injectProperties(instance, fn) {
        var injectables = Metadata.getOwn(MetadataKey, fn || instance.constructor);
        if (injectables) {
            for (var propertyKey in injectables) {
                this.injectProperty(instance, propertyKey, injectables[propertyKey]);
            }
        }
    }
    injectProperty(instance, propertyKey, value) {
        Object.defineProperty(instance, propertyKey, {
            value: this.container.get(value)
        });
    }
}
export function inject(targetOrType, propertyKey) {
    if (propertyKey) {
        // presume annotation was used like @inject on property
        injectFromMetadata(targetOrType, propertyKey);
    }
    else {
        // presume annotation was used like @inject(Type)
        return function (target, propertyKey) {
            injectType(target, propertyKey, targetOrType);
        };
    }
}
function injectFromMetadata(target, propertyKey) {
    var Type = Metadata.getOwn('design:type', target, propertyKey);
    injectType(target, propertyKey, Type);
}
function injectType(target, propertyKey, Type) {
    if (Type) {
        var Constructor = target.constructor;
        var injectables = Metadata.getOwn(MetadataKey, Constructor);
        if (!injectables) {
            var instanceActivator = Metadata.getOwn(Metadata.instanceActivator, Constructor);
            if (instanceActivator) {
                if (!(instanceActivator instanceof PropertyClassActivator)) {
                    throw new Error('Instance activator already set. Can not use property injection.');
                }
            }
            else {
                Metadata.define(Metadata.instanceActivator, PropertyClassActivator.instance, Constructor);
            }
            injectables = {};
            Metadata.define(MetadataKey, injectables, Constructor);
        }
        injectables[propertyKey] = Type;
    }
}
