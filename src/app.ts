import express, {
  Application,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { controllers } from './controllers';
import { RouteParamKey } from './common/enums/route-param-key.enum';

export class App {
  public app: Application;
  public port: number | string;

  constructor(port: number | string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.routerProxy(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private applyRoute(target: any) {
    const router: any = Router();
    const routes = Reflect.getMetadata('routes', target) || [];
    const instance = new target();

    routes.forEach((route: any) => {
      const { method, path, handleMethod } = route;
      const handler: Function = instance[handleMethod.name].bind(instance);

      const routeParams = this.getRouteParamData(target, handleMethod.name);

      const requestHandler = this.registerRequestHandler(handler, routeParams);

      router[method](`${path}`, requestHandler);
    });

    this.app.use('/api', router);
  }

  private routerProxy(controllers: any[]) {
    controllers.forEach((controller) => {
      this.applyRoute(controller);
    });
  }

  private registerRequestHandler(
    handler: Function,
    routeParams: { [T in RouteParamKey]?: number }
  ): RequestHandler {
    const requestHandler: RequestHandler = async (
      req: Request,
      res: Response
    ) => {
      const args: any[] = [];

      if (routeParams[RouteParamKey.PARAM] !== undefined) {
        args[routeParams[RouteParamKey.PARAM] as any] = req.params;
      }
      if (routeParams[RouteParamKey.BODY] !== undefined) {
        args[routeParams[RouteParamKey.BODY] as any] = req.body;
      }
      if (routeParams[RouteParamKey.QUERY] !== undefined) {
        args[routeParams[RouteParamKey.QUERY] as any] = req.query;
      }

      const response: any = await handler(...args);
      res.json(response);
    };

    return requestHandler;
  }

  private getRouteParamData(controller: any, methodName: string) {
    const routeParams: { [T in RouteParamKey]?: number } = {};
    Object.values(RouteParamKey).forEach((key) => {
      routeParams[key] = Reflect.getMetadata(key, controller, methodName);
    });

    return routeParams;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
