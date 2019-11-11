"use strict";
exports.__esModule = true;
exports.INJECTION_TOKEN_METADATA_KEY = "injectionTokens";
exports.injectable = function () {
    return function (target) {
        var params = Reflect.getMetadata("design:paramtypes", target) || [];
        var injectionTokens = Reflect.getOwnMetadata(exports.INJECTION_TOKEN_METADATA_KEY, target) || {};
        Object.keys(injectionTokens).forEach(function (key) {
            params[+key] = injectionTokens[key];
        });
        Container.getInstance().register(target, params);
    };
};
