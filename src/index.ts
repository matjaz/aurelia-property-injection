import {Metadata} from 'aurelia-metadata';
import {ClassActivator, Container} from 'aurelia-dependency-injection';

export const MetadataKey = 'di:propInjectables';

var singleton;

export class PropertyClassActivator extends ClassActivator {
  static get instance(): PropertyClassActivator {
    return singleton || (singleton = new PropertyClassActivator());
  }

  constructor(protected container: Container = Container.instance) {
    super();
  }

  invoke(fn: Function, args: any[]) {
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

  injectProperties(instance: Object, fn?: Function) {
    var injectables = Metadata.getOwn(MetadataKey, fn || instance.constructor);
    if (injectables) {
      for (var propertyKey in injectables) {
        this.injectProperty(instance, propertyKey, injectables[propertyKey]);
      }
    }
  }

  injectProperty(instance: Object, propertyKey: string, value: Function) {
    Object.defineProperty(instance, propertyKey, {
      value: this.container.get(value)
    });
  }
}

export function inject(targetOrType: Object, propertyKey?: string|symbol): any {
  if (propertyKey) {
    // presume annotation was used like @inject on property
    var Type = Metadata.getOwn('design:type', targetOrType, propertyKey);
    injectType(targetOrType, propertyKey, Type);
  } else {
    // presume annotation was used like @inject(Type) on property
    return function(target: Object, propertyKey: string|symbol) {
      injectType(target, propertyKey, targetOrType);
    }
  }
}

function injectType(target: Object, propertyKey: string|symbol, Type: Object) {
  if (Type) {
    var Constructor = target.constructor;
    var injectables = Metadata.getOwn(MetadataKey, Constructor);
    if (!injectables) {
      var instanceActivator = Metadata.getOwn(Metadata.instanceActivator, Constructor)
      if (instanceActivator) {
        if (!(instanceActivator instanceof PropertyClassActivator)) {
          throw new Error('Instance activator already set. Can not use property injection.');
        }
      } else {
        Metadata.define(Metadata.instanceActivator, PropertyClassActivator.instance, Constructor);
      }
      injectables = {};
      Metadata.define(MetadataKey, injectables, Constructor);
    }
    injectables[propertyKey] = Type;
  }
}
