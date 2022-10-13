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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAccStreams = void 0;
const fp_ts_1 = require("fp-ts");
const function_1 = require("fp-ts/lib/function");
const rxo = __importStar(require("rxjs/operators"));
const rx = __importStar(require("rxjs"));
const Apply_1 = require("fp-ts/lib/Apply");
const makeAccStreams = (init, next) => (data) => {
    const closed$ = (0, function_1.pipe)(data.historical$, rxo.map(fp_ts_1.either.chain(init)), rxo.switchMap((initial) => (0, function_1.pipe)(data.currentClosed$, rxo.scan((acc, cur) => (0, function_1.pipe)((0, Apply_1.sequenceT)(fp_ts_1.either.either)(acc, cur), fp_ts_1.either.chain(([acc, cur]) => next(acc, cur))), initial), rxo.startWith(initial))), rxo.shareReplay(1));
    const current$ = (0, function_1.pipe)(rx.combineLatest([closed$, data.current$]), rxo.map(([acc, cur]) => (0, function_1.pipe)((0, Apply_1.sequenceT)(fp_ts_1.either.either)(acc, cur), fp_ts_1.either.chain(([acc, cur]) => next(acc, cur)))), rxo.shareReplay(1));
    return { closed$, current$ };
};
exports.makeAccStreams = makeAccStreams;
