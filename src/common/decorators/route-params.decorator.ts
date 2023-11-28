import { RouteParamKey } from "../enums/route-param-key.enum";

function createRouteParamDecorator(routeParamKey: RouteParamKey) {
  return function (name?: string) {
    return function (target: any, key: string | symbol, index: number) {
      Reflect.defineMetadata(routeParamKey, index, target.constructor, key);
    };
  };
}

export const Body = createRouteParamDecorator(RouteParamKey.BODY);

export const Param = createRouteParamDecorator(RouteParamKey.PARAM);

export const Quey = createRouteParamDecorator(RouteParamKey.QUERY);
