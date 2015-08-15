import {Metadata} from 'aurelia-metadata';
import {ClassActivator, Container} from 'aurelia-dependency-injection';

export const MetadataKey = 'di:propInjectables';

var singleton;

export class PropertyClassActivator extends ClassActivator {
  static get instance(): PropertyClassActivator {
    return singleton || (singleton = new PropertyClassActivator());
  }

  constructor(container: Container = Container.instance, classActivator: ClassActivator = ClassActivator.instance) {
    super();
    this.container = container;
    this.classActivator = classActivator;
  }

  invoke(fn: Function, args: any[]) {
    var instance = this.classActivator.invoke(fn, args);
    var injectables = Metadata.getOwn(MetadataKey, fn);
    if (injectables) {
      for (var propertyKey in injectables) {
        this.injectProperty(instance, propertyKey, injectables[propertyKey]);
      }
    }
    return instance;
  }

  injectProperty(instance: Object, propertyKey: string, value: Function) {
    Object.defineProperty(instance, propertyKey, {
      value: this.container.get(value)
    });
  }
}

export function inject(target: Object, propertyKey: string|symbol) {
  var Type = Metadata.getOwn('design:type', target, propertyKey);
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
