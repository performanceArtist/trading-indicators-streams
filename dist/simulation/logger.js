"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logObservableToArray = exports.logObservable = void 0;
const function_1 = require("fp-ts/lib/function");
const fs_1 = __importDefault(require("fs"));
const rxo = __importStar(require("rxjs/operators"));
const writeFile = fs_1.default.writeFileSync;
const logObservable = (filepath) => (o) => {
    o.subscribe((data) => writeFile(filepath, JSON.stringify(data)));
};
exports.logObservable = logObservable;
const logObservableToArray = (filepath) => (o) => {
    (0, function_1.pipe)(o, rxo.scan((acc, cur) => acc.concat(cur), []), rxo.startWith([]), (all) => all.subscribe((data) => writeFile(filepath, JSON.stringify(data))));
};
exports.logObservableToArray = logObservableToArray;
