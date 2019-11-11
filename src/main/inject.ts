import { INJECTION_TOKEN_METADATA_KEY } from "./Injectable";
import { InjectionToken } from "./type";

const defineInjectionTokenMetadata = (
  data: any
): ((
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number
) => any) => {
  return function(
    target: any,
    _propertyKey: string | symbol,
    parameterIndex: number
  ): any {
    const injectionTokens =
      Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};
    injectionTokens[parameterIndex] = data;
    Reflect.defineMetadata(
      INJECTION_TOKEN_METADATA_KEY,
      injectionTokens,
      target
    );
  };
};

export const inject = (
  token: InjectionToken<any>
): ((
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number
) => any) => {
  return defineInjectionTokenMetadata(token);
};
