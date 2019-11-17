import { INJECTION_TOKEN_METADATA_KEY } from "./Injectable";
import { InjectionToken } from "./type";

const defineInjectionTokenMetadata = (data: any): ((target: any) => any) => {
  return function(target: any): any {
    const injectionTokens: any = {};
    injectionTokens[0] = data;
    Reflect.defineMetadata(
      INJECTION_TOKEN_METADATA_KEY,
      injectionTokens,
      target
    );
  };
};

/**
 * inject token for interface
 * @param token
 */
export const inject = (
  token: InjectionToken<any>
): ((
  target: any,
  propertyKey: string | symbol, // this is not for use, but inject decorator need.
  parameterIndex: number // this is not for use, but inject decorator need.
) => any) => {
  return defineInjectionTokenMetadata(token);
};
