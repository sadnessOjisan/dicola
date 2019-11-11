"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var Injectable_1 = require("../main/Injectable");
var Hoge = /** @class */ (function () {
    function Hoge() {
    }
    Hoge.prototype.call = function () {
        console.log("hoge");
    };
    return Hoge;
}());
var Fuga = /** @class */ (function () {
    function Fuga(hoge) {
        this.hoge = hoge;
    }
    Fuga = __decorate([
        Injectable_1.injectable()
    ], Fuga);
    return Fuga;
}());
var Foo = /** @class */ (function () {
    function Foo(fuga) {
        this.fuga = fuga;
    }
    Foo = __decorate([
        Injectable_1.injectable()
    ], Foo);
    return Foo;
}());
var container = Container.getInstance();
console.log(container);
