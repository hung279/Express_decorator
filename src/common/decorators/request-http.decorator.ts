import { RequestMethod } from '../enums/request-method.enum';

function validatePath(path: string) {
  return path[0] === '/' ? path : `/${path}`;
}

const createMethodDecorator = (method: RequestMethod) => {
  return function (path?: string) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const route = path && path.length ? path : '/';
      const requestMethod = method || RequestMethod.GET;
      if (!Reflect.hasMetadata('routes', target.constructor)) {
        Reflect.defineMetadata('routes', [], target.constructor);
      }
      const routes = Reflect.getMetadata('routes', target.constructor);

      routes.push({
        method: requestMethod,
        path: validatePath(route),
        handleMethod: descriptor.value,
      });

      Reflect.defineMetadata('routes', routes, target.constructor);
    };
  };
};

export const Get = createMethodDecorator(RequestMethod.GET);

export const Post = createMethodDecorator(RequestMethod.POST);

export const Put = createMethodDecorator(RequestMethod.PUT);

export const Patch = createMethodDecorator(RequestMethod.Patch);

export const Delete = createMethodDecorator(RequestMethod.Delete);
