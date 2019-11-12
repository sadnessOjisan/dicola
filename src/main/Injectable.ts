import { InjectionToken, Dictionary } from "./type";
import Container from "./Container";

export const INJECTION_TOKEN_METADATA_KEY = "injectionTokens";

export const injectable = (): ClassDecorator => {
  return target => {
    const params: any[] =
      Reflect.getMetadata("design:paramtypes", target) || [];
    const injectionTokens: Dictionary<InjectionToken<any>> =
      Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};
    Object.keys(injectionTokens).forEach(key => {
      params[+key] = injectionTokens[key];
    });
    Container.getInstance().register(target, params);
  };
};
