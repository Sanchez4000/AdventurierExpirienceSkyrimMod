/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/asset.ts":
/*!***************************!*\
  !*** ./src/core/asset.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Asset = /** @class */ (function () {
    function Asset(hexId, name) {
        this._hexId = hexId;
        this._numericId = parseInt(hexId, 16);
        this._name = name;
    }
    Object.defineProperty(Asset.prototype, "HexId", {
        get: function () {
            return this._hexId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "NumericId", {
        get: function () {
            return this._numericId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    return Asset;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Asset);


/***/ }),

/***/ "./src/core/feature.ts":
/*!*****************************!*\
  !*** ./src/core/feature.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Feature = /** @class */ (function () {
    function Feature() {
    }
    return Feature;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feature);


/***/ }),

/***/ "./src/core/gameContext.ts":
/*!*********************************!*\
  !*** ./src/core/gameContext.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! skyrimPlatform */ "skyrimPlatform");
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mod */ "./src/core/mod.ts");


var GameContext = /** @class */ (function () {
    function GameContext() {
        this._events = [];
        this._features = [];
        this._modMap = new Map();
    }
    GameContext.prototype.Reset = function () {
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Reset");
        while (this._features.length > 0) {
            this.DisableFeature(this._features[0]);
        }
        while (this._events.length > 0) {
            this.Unsubscribe(this._events[0]);
        }
        this._modMap.clear();
    };
    GameContext.prototype.SafeSubscribe = function (event, name) {
        var existed = this._events.find(function (subscription) { return subscription.name === name; });
        if (existed !== undefined) {
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Event with name ".concat(name, " already exist"));
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.unsubscribe)(event);
        }
        this._events.push({
            name: name,
            event: event,
        });
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Event handler ".concat(name, " registered for ").concat(event.eventName));
    };
    GameContext.prototype.Unsubscribe = function (value) {
        if (typeof value === "string") {
            var item = this._events.find(function (subscription) { return subscription.name === value; });
            if (item === undefined)
                return;
            value = item;
        }
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.unsubscribe)(value.event);
        this._events = this._events.filter(function (subscription) { return subscription !== value; });
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Event handler ".concat(value.name, " unsubscribed"));
    };
    GameContext.prototype.RegisterMod = function (name) {
        var modIndex = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getModByName(name);
        if (modIndex === GameContext.MOD_NOT_FOUND_INDEX) {
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Mod: ".concat(name, " is missing"));
            return;
        }
        var mod = new _mod__WEBPACK_IMPORTED_MODULE_1__["default"](modIndex, name);
        this._modMap.set(name, mod);
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Mod: ".concat(name, " registered"));
    };
    GameContext.prototype.GetMod = function (name) {
        var mod = this._modMap.get(name);
        return mod || null;
    };
    GameContext.prototype.EnableFeature = function (instance) {
        for (var i = 0; i < this._features.length; i++) {
            var feature = this._features[i];
            if (typeof feature === typeof instance) {
                (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Feature ".concat(instance.Name, " already enabled"));
                return;
            }
        }
        this._features.push(instance);
        instance.Enable();
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Feature ".concat(instance.Name, " enabled"));
    };
    GameContext.prototype.DisableFeature = function (feature) {
        this._features = this._features.filter(function (f) { return f !== feature; });
        feature.Disable();
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Feature ".concat(typeof feature, " disabled"));
    };
    GameContext.MOD_NOT_FOUND_INDEX = 0xff;
    return GameContext;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameContext);


/***/ }),

/***/ "./src/core/mod.ts":
/*!*************************!*\
  !*** ./src/core/mod.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! skyrimPlatform */ "skyrimPlatform");
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asset */ "./src/core/asset.ts");


var Mod = /** @class */ (function () {
    function Mod(index, name) {
        this.Assets = [];
        var hexIndex = index.toString(16);
        this.ModPrefix = "0x".concat(hexIndex);
        this.ModName = name;
    }
    Object.defineProperty(Mod.prototype, "Name", {
        get: function () {
            return this.ModName;
        },
        enumerable: false,
        configurable: true
    });
    Mod.prototype.RegisterAsset = function (hexId, name) {
        var hexItemId = "".concat(this.ModPrefix).concat(hexId);
        var regex = /^0x[0-9A-Fa-f]{8}$/;
        if (!regex.test(hexItemId)) {
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Error registering asset. Id cannot be ".concat(hexItemId));
            return;
        }
        var newAsset = new _asset__WEBPACK_IMPORTED_MODULE_1__["default"](hexItemId, name);
        var existed = this.Assets.find(function (asset) { return asset.NumericId === newAsset.NumericId; });
        if (existed !== undefined) {
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Error registering asset. ".concat(newAsset.HexId, " already existed"));
            return;
        }
        this.Assets.push(newAsset);
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Asset ".concat(hexItemId, " registered (").concat(name, ")"));
    };
    Mod.prototype.GetAsset = function (name) {
        if (name === null)
            return null;
        var asset = this.Assets.find(function (asset) { return asset.Name === name; });
        if (asset === undefined) {
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Asset ".concat(name, " not found"));
            return null;
        }
        return asset;
    };
    return Mod;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mod);


/***/ }),

/***/ "./src/meta/modData.ts":
/*!*****************************!*\
  !*** ./src/meta/modData.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mods_modsList_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mods/modsList.enum */ "./src/mods/modsList.enum.ts");

var ModData = /** @class */ (function () {
    function ModData() {
    }
    ModData.PLUGIN_NAME = "hex-adventurer-experience-script";
    ModData.VERSION = "1.0.0";
    ModData.REQUIREMENTS = [_mods_modsList_enum__WEBPACK_IMPORTED_MODULE_0__.ModsList.HEX_AdventurerExperience];
    ModData.AUTHOR = "Hexagon";
    return ModData;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModData);


/***/ }),

/***/ "./src/mods/HEX_AdventurerExperience/data/adventurerExpirienceData.ts":
/*!****************************************************************************!*\
  !*** ./src/mods/HEX_AdventurerExperience/data/adventurerExpirienceData.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var AdventurerExpirienceData = /** @class */ (function () {
    function AdventurerExpirienceData() {
    }
    Object.defineProperty(AdventurerExpirienceData, "AllAssets", {
        get: function () {
            return __spreadArray(__spreadArray(__spreadArray([], this.WeaponsList, true), this.ActiveMagicEffectsList, true), this.SpellsList, true);
        },
        enumerable: false,
        configurable: true
    });
    AdventurerExpirienceData.fill = function (source) {
        var result = [];
        for (var key in source) {
            result.push(source[key]);
        }
        return result;
    };
    var _a;
    _a = AdventurerExpirienceData;
    AdventurerExpirienceData.Weapons = {
        HEX_ITMW_TESTMOD_Testweapon: {
            hexId: "002DB4",
            name: "HEX_ITMW_TESTMOD_Testweapon",
        },
    };
    AdventurerExpirienceData.WeaponsList = _a.fill(_a.Weapons);
    AdventurerExpirienceData.ActiveMagicEffects = {
        HEX_MGEF_FortifyHealth: {
            hexId: "003DDC",
            name: "HEX_MGEF_FortifyHealth",
        },
        HEX_MGEF_FortifyStamina: {
            hexId: "003DDD",
            name: "HEX_MGEF_FortifyStamina",
        },
        HEX_MGEF_FortifyMagicka: {
            hexId: "003DDE",
            name: "HEX_MGEF_FortifyMagicka",
        },
        HEX_MGEF_HealthRegen: {
            hexId: "003DDF",
            name: "HEX_MGEF_HealthRegen",
        },
        HEX_MGEF_StaminaRegen: {
            hexId: "003DE0",
            name: "HEX_MGEF_StaminaRegen",
        },
        HEX_MGEF_MagickaRegen: {
            hexId: "003DE1",
            name: "HEX_MGEF_MagickaRegen",
        },
        HEX_MGEF_ResistMagic: {
            hexId: "003DE2",
            name: "HEX_MGEF_ResistMagic",
        },
        HEX_MGEF_ResistFire: {
            hexId: "003DE3",
            name: "HEX_MGEF_ResistFire",
        },
        HEX_MGEF_ResistFrost: {
            hexId: "003DE4",
            name: "HEX_MGEF_ResistFrost",
        },
        HEX_MGEF_ResistElectric: {
            hexId: "003DE5",
            name: "HEX_MGEF_ResistElectric",
        },
        HEX_MGEF_ResistDamage: {
            hexId: "003DE6",
            name: "HEX_MGEF_ResistDamage",
        },
        HEX_MGEF_FortifyDamage: {
            hexId: "003DE7",
            name: "HEX_MGEF_FortifyDamage",
        },
        HEX_MGEF_FortifyDamageDescription: {
            hexId: "00434C",
            name: "HEX_MGEF_FortifyDamageDescription",
        },
        HEX_MGEF_AttributesDescription: {
            hexId: "005377",
            name: "HEX_MGEF_AttributesDescription",
        },
        HEX_MGEF_ResistElementDescription: {
            hexId: "005378",
            name: "HEX_MGEF_ResistElementDescription",
        },
        HEX_MGEF_FortifyCarryWeight: {
            hexId: "0058DD",
            name: "HEX_MGEF_FortifyCarryWeight",
        },
        HEX_MGEF_ResistPoitions: {
            hexId: "005E41",
            name: "HEX_MGEF_ResistPoitions",
        },
        HEX_MGEF_ResistDisease: {
            hexId: "005E40",
            name: "HEX_MGEF_ResistDisease",
        },
        HEX_MGEF_ResistBadEffects: {
            hexId: "005E42",
            name: "HEX_MGEF_ResistBadEffects",
        },
    };
    AdventurerExpirienceData.ActiveMagicEffectsList = _a.fill(_a.ActiveMagicEffects);
    AdventurerExpirienceData.Spells = {
        HEX_SPELL_AdventurierExpirience0: {
            hexId: "00434B",
            name: "HEX_SPELL_AdventurierExpirience0",
            effectsData: [
                {
                    gameName: "Повышение урона оружием",
                    index: 0,
                    divider: 1,
                    value: 0.01,
                },
                {
                    gameName: "Повышение брони",
                    index: 1,
                    divider: 1,
                    value: 10,
                },
                {
                    gameName: "Описание повышения урона оружием",
                    index: 2,
                    divider: 1,
                    value: 1,
                },
                {
                    gameName: "Повышение переносимого веса",
                    index: 3,
                    divider: 1,
                    value: 10,
                },
            ],
        },
        HEX_SPELL_AdventurierExpirience1: {
            hexId: "00434E",
            name: "HEX_SPELL_AdventurierExpirience1",
            effectsData: [
                {
                    gameName: "Повышение здоровья",
                    index: 0,
                    divider: 10,
                    value: 15,
                },
                {
                    gameName: "Повышение запаса сил",
                    index: 1,
                    divider: 10,
                    value: 15,
                },
                {
                    gameName: "Повышение магии",
                    index: 2,
                    divider: 10,
                    value: 15,
                },
                {
                    gameName: "Регенерация здоровья",
                    index: 3,
                    divider: 10,
                    value: 1,
                },
                {
                    gameName: "Регенерация запаса сил",
                    index: 4,
                    divider: 10,
                    value: 1,
                },
                {
                    gameName: "Регенерация магии",
                    index: 5,
                    divider: 10,
                    value: 1,
                },
                {
                    gameName: "Повышение атрибутов",
                    index: 6,
                    divider: 10,
                    value: 15,
                },
                {
                    gameName: "Повышение регенерации",
                    index: 7,
                    divider: 10,
                    value: 1,
                },
            ],
        },
        HEX_SPELL_AdventurierExpirience2: {
            hexId: "00434F",
            name: "HEX_SPELL_AdventurierExpirience2",
            effectsData: [
                {
                    gameName: "Сопротивление магии",
                    index: 0,
                    divider: 2,
                    value: 1,
                },
                {
                    gameName: "Сопротивление огню",
                    index: 1,
                    divider: 1,
                    value: 1,
                },
                {
                    gameName: "Сопротивление холоду",
                    index: 2,
                    divider: 1,
                    value: 1,
                },
                {
                    gameName: "Сопротивление электричеству",
                    index: 3,
                    divider: 1,
                    value: 1,
                },
                {
                    gameName: "Сопротивление элементам",
                    index: 4,
                    divider: 1,
                    value: 1,
                },
            ],
        },
        HEX_SPELL_AdventurierExpirience3: {
            hexId: "005E43",
            name: "HEX_SPELL_AdventurierExpirience3",
            effectsData: [
                {
                    gameName: "Сопротивление болезням",
                    index: 0,
                    divider: 1,
                    value: 2,
                },
                {
                    gameName: "Сопротивление ядам",
                    index: 1,
                    divider: 1,
                    value: 2,
                },
                {
                    gameName: "Сопротивление ядам и болезням",
                    index: 2,
                    divider: 1,
                    value: 2,
                },
            ],
        },
    };
    AdventurerExpirienceData.SpellsList = _a.fill(_a.Spells);
    return AdventurerExpirienceData;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdventurerExpirienceData);


/***/ }),

/***/ "./src/mods/HEX_AdventurerExperience/features/statBoostPerDiscoveredLocation.ts":
/*!**************************************************************************************!*\
  !*** ./src/mods/HEX_AdventurerExperience/features/statBoostPerDiscoveredLocation.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! skyrimPlatform */ "skyrimPlatform");
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/global */ "./src/utils/global.ts");
/* harmony import */ var _core_feature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/feature */ "./src/core/feature.ts");
/* harmony import */ var _skyrim_trackedStat_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../skyrim/trackedStat.enum */ "./src/skyrim/trackedStat.enum.ts");
/* harmony import */ var _modsList_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modsList.enum */ "./src/mods/modsList.enum.ts");
/* harmony import */ var _data_adventurerExpirienceData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/adventurerExpirienceData */ "./src/mods/HEX_AdventurerExperience/data/adventurerExpirienceData.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var StatBoostPerDiscoveredLocation = /** @class */ (function (_super) {
    __extends(StatBoostPerDiscoveredLocation, _super);
    function StatBoostPerDiscoveredLocation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Name = "StatBoostPerDiscoveredLocation";
        _this._eventHandlerName = "RefreshAdventurierBonuses";
        _this._mod = _utils_global__WEBPACK_IMPORTED_MODULE_1__["default"].Context.GetMod(_modsList_enum__WEBPACK_IMPORTED_MODULE_4__.ModsList.HEX_AdventurerExperience);
        _this._spells = [
            _data_adventurerExpirienceData__WEBPACK_IMPORTED_MODULE_5__["default"].Spells.HEX_SPELL_AdventurierExpirience0,
            _data_adventurerExpirienceData__WEBPACK_IMPORTED_MODULE_5__["default"].Spells.HEX_SPELL_AdventurierExpirience1,
            _data_adventurerExpirienceData__WEBPACK_IMPORTED_MODULE_5__["default"].Spells.HEX_SPELL_AdventurierExpirience2,
            _data_adventurerExpirienceData__WEBPACK_IMPORTED_MODULE_5__["default"].Spells.HEX_SPELL_AdventurierExpirience3,
        ];
        return _this;
    }
    StatBoostPerDiscoveredLocation.prototype.Enable = function () {
        var _this = this;
        _utils_global__WEBPACK_IMPORTED_MODULE_1__["default"].Context.SafeSubscribe((0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.on)("trackedStats", function (event) {
            _this.EventHandler(event);
        }), this._eventHandlerName);
    };
    StatBoostPerDiscoveredLocation.prototype.Disable = function () {
        _utils_global__WEBPACK_IMPORTED_MODULE_1__["default"].Context.Unsubscribe(this._eventHandlerName);
        _utils_global__WEBPACK_IMPORTED_MODULE_1__["default"].Context.Unsubscribe("UpdateEvent");
    };
    StatBoostPerDiscoveredLocation.prototype.EventHandler = function (value) {
        var _this = this;
        if (value.statName !== _skyrim_trackedStat_enum__WEBPACK_IMPORTED_MODULE_3__.TrackedStat.DungeonsCleared)
            return;
        if (this._mod === null)
            return;
        var _loop_1 = function (i) {
            var spell = this_1._spells[i];
            if (this_1.HasSpell(spell)) {
                this_1.RemoveSpell(spell);
                (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.once)("update", function () {
                    _this.AddSpell(spell, value.newValue, true);
                });
            }
            this_1.AddSpell(spell, value.newValue);
        };
        var this_1 = this;
        for (var i = 0; i < this._spells.length; i++) {
            _loop_1(i);
        }
    };
    StatBoostPerDiscoveredLocation.prototype.HasSpell = function (spell) {
        var spellForm = this.GetSpell(spell);
        var player = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getPlayer();
        return player.hasSpell(spellForm);
    };
    StatBoostPerDiscoveredLocation.prototype.GetSpell = function (spell) {
        var _a;
        var asset = (_a = this._mod) === null || _a === void 0 ? void 0 : _a.GetAsset(spell.name);
        var form = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getFormEx(asset.NumericId);
        return skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Spell.from(form);
    };
    StatBoostPerDiscoveredLocation.prototype.AddSpell = function (spell, power, silent) {
        var _a;
        if (silent === void 0) { silent = false; }
        var spellForm = this.GetSpell(spell);
        var player = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getPlayer();
        var effectsCount = (_a = spellForm === null || spellForm === void 0 ? void 0 : spellForm.getMagicEffects()) === null || _a === void 0 ? void 0 : _a.length;
        var _loop_2 = function (j) {
            var data = spell.effectsData.find(function (effect) { return effect.index == j; });
            if (data === undefined)
                return "continue";
            var magnitude = Math.floor(power / data.divider) * data.value;
            spellForm === null || spellForm === void 0 ? void 0 : spellForm.setNthEffectMagnitude(j, magnitude);
        };
        for (var j = 0; j < effectsCount; j++) {
            _loop_2(j);
        }
        player.addSpell(spellForm, !silent);
    };
    StatBoostPerDiscoveredLocation.prototype.RemoveSpell = function (spell) {
        var spellForm = this.GetSpell(spell);
        var player = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getPlayer();
        player.removeSpell(spellForm);
    };
    return StatBoostPerDiscoveredLocation;
}(_core_feature__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatBoostPerDiscoveredLocation);


/***/ }),

/***/ "./src/mods/modsList.enum.ts":
/*!***********************************!*\
  !*** ./src/mods/modsList.enum.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModsList": () => (/* binding */ ModsList)
/* harmony export */ });
var ModsList;
(function (ModsList) {
    ModsList["HEX_AdventurerExperience"] = "HEX_AdventurerExperience.esp";
})(ModsList || (ModsList = {}));


/***/ }),

/***/ "./src/skyrim/trackedStat.enum.ts":
/*!****************************************!*\
  !*** ./src/skyrim/trackedStat.enum.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrackedStat": () => (/* binding */ TrackedStat)
/* harmony export */ });
var TrackedStat;
(function (TrackedStat) {
    TrackedStat["LocationsDiscovered"] = "Locations Discovered";
    TrackedStat["DungeonsCleared"] = "Dungeons Cleared";
})(TrackedStat || (TrackedStat = {}));


/***/ }),

/***/ "./src/utils/global.ts":
/*!*****************************!*\
  !*** ./src/utils/global.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_gameContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/gameContext */ "./src/core/gameContext.ts");

var Global = /** @class */ (function () {
    function Global() {
    }
    Object.defineProperty(Global, "Context", {
        get: function () {
            return this._context;
        },
        enumerable: false,
        configurable: true
    });
    Global._context = new _core_gameContext__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return Global;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Global);


/***/ }),

/***/ "skyrimPlatform":
/*!***********************************!*\
  !*** external ["skyrimPlatform"] ***!
  \***********************************/
/***/ ((module) => {

module.exports = skyrimPlatform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! skyrimPlatform */ "skyrimPlatform");
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _meta_modData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./meta/modData */ "./src/meta/modData.ts");
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/global */ "./src/utils/global.ts");
/* harmony import */ var _mods_modsList_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mods/modsList.enum */ "./src/mods/modsList.enum.ts");
/* harmony import */ var _mods_HEX_AdventurerExperience_features_statBoostPerDiscoveredLocation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mods/HEX_AdventurerExperience/features/statBoostPerDiscoveredLocation */ "./src/mods/HEX_AdventurerExperience/features/statBoostPerDiscoveredLocation.ts");
/* harmony import */ var _mods_HEX_AdventurerExperience_data_adventurerExpirienceData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mods/HEX_AdventurerExperience/data/adventurerExpirienceData */ "./src/mods/HEX_AdventurerExperience/data/adventurerExpirienceData.ts");






var context = _utils_global__WEBPACK_IMPORTED_MODULE_2__["default"].Context;
(0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.once)("skyrimLoaded", function () {
    (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("".concat(_meta_modData__WEBPACK_IMPORTED_MODULE_1__["default"].PLUGIN_NAME));
    (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("Version ".concat(_meta_modData__WEBPACK_IMPORTED_MODULE_1__["default"].VERSION));
});
(0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.on)("newGame", function () {
    (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("NewGame");
    (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.once)("update", function () {
        start();
    });
});
(0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.on)("loadGame", function () {
    (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.printConsole)("LoadGame");
    start();
});
function start() {
    context.Reset();
    for (var i = 0; i < _meta_modData__WEBPACK_IMPORTED_MODULE_1__["default"].REQUIREMENTS.length; i++) {
        var modName = _meta_modData__WEBPACK_IMPORTED_MODULE_1__["default"].REQUIREMENTS[i];
        context.RegisterMod(modName);
    }
    var mod = context.GetMod(_mods_modsList_enum__WEBPACK_IMPORTED_MODULE_3__.ModsList.HEX_AdventurerExperience);
    var modAssets = _mods_HEX_AdventurerExperience_data_adventurerExpirienceData__WEBPACK_IMPORTED_MODULE_5__["default"].AllAssets;
    for (var i = 0; i < modAssets.length; i++) {
        var asset = modAssets[i];
        mod.RegisterAsset(asset.hexId, asset.name);
    }
    context.EnableFeature(new _mods_HEX_AdventurerExperience_features_statBoostPerDiscoveredLocation__WEBPACK_IMPORTED_MODULE_4__["default"]());
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdCckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMMEM7QUFDekM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDREQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxvQ0FBb0M7QUFDdEc7QUFDQSxZQUFZLDREQUFZO0FBQ3hCLFlBQVksMkRBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUSw0REFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUscUNBQXFDO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyREFBVztBQUNuQixxRUFBcUUsZ0NBQWdDO0FBQ3JHLFFBQVEsNERBQVk7QUFDcEI7QUFDQTtBQUNBLHVCQUF1Qiw2REFBaUI7QUFDeEM7QUFDQSxZQUFZLDREQUFZO0FBQ3hCO0FBQ0E7QUFDQSxzQkFBc0IsNENBQUc7QUFDekI7QUFDQSxRQUFRLDREQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwyQkFBMkI7QUFDbkQ7QUFDQTtBQUNBLGdCQUFnQiw0REFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0REFBWTtBQUNwQjtBQUNBO0FBQ0EsOERBQThELHVCQUF1QjtBQUNyRjtBQUNBLFFBQVEsNERBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VtQjtBQUNsQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxvQ0FBb0MsRUFBRTtBQUN0QztBQUNBLFlBQVksNERBQVk7QUFDeEI7QUFDQTtBQUNBLDJCQUEyQiw4Q0FBSztBQUNoQywwREFBMEQsZ0RBQWdEO0FBQzFHO0FBQ0EsWUFBWSw0REFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxRQUFRLDREQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELDZCQUE2QjtBQUNyRjtBQUNBLFlBQVksNERBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxHQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QzhCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0ZBQWlDO0FBQzdEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNWdkIscUJBQXFCLFNBQUksSUFBSSxTQUFJO0FBQ2pDLDZFQUE2RSxPQUFPO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FB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V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053RDtBQUNuQjtBQUNEO0FBQ1k7QUFDcUU7QUFDaEI7QUFDckcsY0FBYyw2REFBYztBQUM1QixvREFBSTtBQUNKLElBQUksNERBQVksV0FBVyxpRUFBbUI7QUFDOUMsSUFBSSw0REFBWSxtQkFBbUIsNkRBQWU7QUFDbEQsQ0FBQztBQUNELGtEQUFFO0FBQ0YsSUFBSSw0REFBWTtBQUNoQixJQUFJLG9EQUFJO0FBQ1I7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNELGtEQUFFO0FBQ0YsSUFBSSw0REFBWTtBQUNoQjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0Esb0JBQW9CLElBQUkseUVBQTJCLEVBQUU7QUFDckQsc0JBQXNCLGtFQUFvQjtBQUMxQztBQUNBO0FBQ0EsNkJBQTZCLGtGQUFpQztBQUM5RCxvQkFBb0IsOEdBQWtDO0FBQ3RELG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDhHQUE4QjtBQUM1RCIsInNvdXJjZXMiOlsid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL2NvcmUvYXNzZXQudHMiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvLi9zcmMvY29yZS9mZWF0dXJlLnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL2NvcmUvZ2FtZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvLi9zcmMvY29yZS9tb2QudHMiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvLi9zcmMvbWV0YS9tb2REYXRhLnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL21vZHMvSEVYX0FkdmVudHVyZXJFeHBlcmllbmNlL2RhdGEvYWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL21vZHMvSEVYX0FkdmVudHVyZXJFeHBlcmllbmNlL2ZlYXR1cmVzL3N0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbi50cyIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC8uL3NyYy9tb2RzL21vZHNMaXN0LmVudW0udHMiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvLi9zcmMvc2t5cmltL3RyYWNrZWRTdGF0LmVudW0udHMiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvLi9zcmMvdXRpbHMvZ2xvYmFsLnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0L2V4dGVybmFsIHZhciBbXCJza3lyaW1QbGF0Zm9ybVwiXSIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBBc3NldCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFzc2V0KGhleElkLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faGV4SWQgPSBoZXhJZDtcclxuICAgICAgICB0aGlzLl9udW1lcmljSWQgPSBwYXJzZUludChoZXhJZCwgMTYpO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2V0LnByb3RvdHlwZSwgXCJIZXhJZFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZXhJZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXNzZXQucHJvdG90eXBlLCBcIk51bWVyaWNJZFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9udW1lcmljSWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2V0LnByb3RvdHlwZSwgXCJOYW1lXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEFzc2V0O1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBBc3NldDtcclxuIiwidmFyIEZlYXR1cmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBGZWF0dXJlKCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEZlYXR1cmU7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmU7XHJcbiIsImltcG9ydCB7IEdhbWUsIHByaW50Q29uc29sZSwgdW5zdWJzY3JpYmUgfSBmcm9tIFwic2t5cmltUGxhdGZvcm1cIjtcclxuaW1wb3J0IE1vZCBmcm9tIFwiLi9tb2RcIjtcclxudmFyIEdhbWVDb250ZXh0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gR2FtZUNvbnRleHQoKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5fZmVhdHVyZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9tb2RNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcbiAgICBHYW1lQ29udGV4dC5wcm90b3R5cGUuUmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJpbnRDb25zb2xlKFwiUmVzZXRcIik7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2ZlYXR1cmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5EaXNhYmxlRmVhdHVyZSh0aGlzLl9mZWF0dXJlc1swXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh0aGlzLl9ldmVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLlVuc3Vic2NyaWJlKHRoaXMuX2V2ZW50c1swXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21vZE1hcC5jbGVhcigpO1xyXG4gICAgfTtcclxuICAgIEdhbWVDb250ZXh0LnByb3RvdHlwZS5TYWZlU3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50LCBuYW1lKSB7XHJcbiAgICAgICAgdmFyIGV4aXN0ZWQgPSB0aGlzLl9ldmVudHMuZmluZChmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7IHJldHVybiBzdWJzY3JpcHRpb24ubmFtZSA9PT0gbmFtZTsgfSk7XHJcbiAgICAgICAgaWYgKGV4aXN0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwcmludENvbnNvbGUoXCJFdmVudCB3aXRoIG5hbWUgXCIuY29uY2F0KG5hbWUsIFwiIGFscmVhZHkgZXhpc3RcIikpO1xyXG4gICAgICAgICAgICB1bnN1YnNjcmliZShldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByaW50Q29uc29sZShcIkV2ZW50IGhhbmRsZXIgXCIuY29uY2F0KG5hbWUsIFwiIHJlZ2lzdGVyZWQgZm9yIFwiKS5jb25jYXQoZXZlbnQuZXZlbnROYW1lKSk7XHJcbiAgICB9O1xyXG4gICAgR2FtZUNvbnRleHQucHJvdG90eXBlLlVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2V2ZW50cy5maW5kKGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHsgcmV0dXJuIHN1YnNjcmlwdGlvbi5uYW1lID09PSB2YWx1ZTsgfSk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhbHVlID0gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5zdWJzY3JpYmUodmFsdWUuZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cy5maWx0ZXIoZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikgeyByZXR1cm4gc3Vic2NyaXB0aW9uICE9PSB2YWx1ZTsgfSk7XHJcbiAgICAgICAgcHJpbnRDb25zb2xlKFwiRXZlbnQgaGFuZGxlciBcIi5jb25jYXQodmFsdWUubmFtZSwgXCIgdW5zdWJzY3JpYmVkXCIpKTtcclxuICAgIH07XHJcbiAgICBHYW1lQ29udGV4dC5wcm90b3R5cGUuUmVnaXN0ZXJNb2QgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBtb2RJbmRleCA9IEdhbWUuZ2V0TW9kQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIGlmIChtb2RJbmRleCA9PT0gR2FtZUNvbnRleHQuTU9EX05PVF9GT1VORF9JTkRFWCkge1xyXG4gICAgICAgICAgICBwcmludENvbnNvbGUoXCJNb2Q6IFwiLmNvbmNhdChuYW1lLCBcIiBpcyBtaXNzaW5nXCIpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbW9kID0gbmV3IE1vZChtb2RJbmRleCwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5fbW9kTWFwLnNldChuYW1lLCBtb2QpO1xyXG4gICAgICAgIHByaW50Q29uc29sZShcIk1vZDogXCIuY29uY2F0KG5hbWUsIFwiIHJlZ2lzdGVyZWRcIikpO1xyXG4gICAgfTtcclxuICAgIEdhbWVDb250ZXh0LnByb3RvdHlwZS5HZXRNb2QgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBtb2QgPSB0aGlzLl9tb2RNYXAuZ2V0KG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBtb2QgfHwgbnVsbDtcclxuICAgIH07XHJcbiAgICBHYW1lQ29udGV4dC5wcm90b3R5cGUuRW5hYmxlRmVhdHVyZSA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSB0aGlzLl9mZWF0dXJlc1tpXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmZWF0dXJlID09PSB0eXBlb2YgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHByaW50Q29uc29sZShcIkZlYXR1cmUgXCIuY29uY2F0KGluc3RhbmNlLk5hbWUsIFwiIGFscmVhZHkgZW5hYmxlZFwiKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmVhdHVyZXMucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuRW5hYmxlKCk7XHJcbiAgICAgICAgcHJpbnRDb25zb2xlKFwiRmVhdHVyZSBcIi5jb25jYXQoaW5zdGFuY2UuTmFtZSwgXCIgZW5hYmxlZFwiKSk7XHJcbiAgICB9O1xyXG4gICAgR2FtZUNvbnRleHQucHJvdG90eXBlLkRpc2FibGVGZWF0dXJlID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcclxuICAgICAgICB0aGlzLl9mZWF0dXJlcyA9IHRoaXMuX2ZlYXR1cmVzLmZpbHRlcihmdW5jdGlvbiAoZikgeyByZXR1cm4gZiAhPT0gZmVhdHVyZTsgfSk7XHJcbiAgICAgICAgZmVhdHVyZS5EaXNhYmxlKCk7XHJcbiAgICAgICAgcHJpbnRDb25zb2xlKFwiRmVhdHVyZSBcIi5jb25jYXQodHlwZW9mIGZlYXR1cmUsIFwiIGRpc2FibGVkXCIpKTtcclxuICAgIH07XHJcbiAgICBHYW1lQ29udGV4dC5NT0RfTk9UX0ZPVU5EX0lOREVYID0gMHhmZjtcclxuICAgIHJldHVybiBHYW1lQ29udGV4dDtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgR2FtZUNvbnRleHQ7XHJcbiIsImltcG9ydCB7IHByaW50Q29uc29sZSB9IGZyb20gXCJza3lyaW1QbGF0Zm9ybVwiO1xyXG5pbXBvcnQgQXNzZXQgZnJvbSBcIi4vYXNzZXRcIjtcclxudmFyIE1vZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vZChpbmRleCwgbmFtZSkge1xyXG4gICAgICAgIHRoaXMuQXNzZXRzID0gW107XHJcbiAgICAgICAgdmFyIGhleEluZGV4ID0gaW5kZXgudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIHRoaXMuTW9kUHJlZml4ID0gXCIweFwiLmNvbmNhdChoZXhJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Nb2ROYW1lID0gbmFtZTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2QucHJvdG90eXBlLCBcIk5hbWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Nb2ROYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE1vZC5wcm90b3R5cGUuUmVnaXN0ZXJBc3NldCA9IGZ1bmN0aW9uIChoZXhJZCwgbmFtZSkge1xyXG4gICAgICAgIHZhciBoZXhJdGVtSWQgPSBcIlwiLmNvbmNhdCh0aGlzLk1vZFByZWZpeCkuY29uY2F0KGhleElkKTtcclxuICAgICAgICB2YXIgcmVnZXggPSAvXjB4WzAtOUEtRmEtZl17OH0kLztcclxuICAgICAgICBpZiAoIXJlZ2V4LnRlc3QoaGV4SXRlbUlkKSkge1xyXG4gICAgICAgICAgICBwcmludENvbnNvbGUoXCJFcnJvciByZWdpc3RlcmluZyBhc3NldC4gSWQgY2Fubm90IGJlIFwiLmNvbmNhdChoZXhJdGVtSWQpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3QXNzZXQgPSBuZXcgQXNzZXQoaGV4SXRlbUlkLCBuYW1lKTtcclxuICAgICAgICB2YXIgZXhpc3RlZCA9IHRoaXMuQXNzZXRzLmZpbmQoZnVuY3Rpb24gKGFzc2V0KSB7IHJldHVybiBhc3NldC5OdW1lcmljSWQgPT09IG5ld0Fzc2V0Lk51bWVyaWNJZDsgfSk7XHJcbiAgICAgICAgaWYgKGV4aXN0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwcmludENvbnNvbGUoXCJFcnJvciByZWdpc3RlcmluZyBhc3NldC4gXCIuY29uY2F0KG5ld0Fzc2V0LkhleElkLCBcIiBhbHJlYWR5IGV4aXN0ZWRcIikpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQXNzZXRzLnB1c2gobmV3QXNzZXQpO1xyXG4gICAgICAgIHByaW50Q29uc29sZShcIkFzc2V0IFwiLmNvbmNhdChoZXhJdGVtSWQsIFwiIHJlZ2lzdGVyZWQgKFwiKS5jb25jYXQobmFtZSwgXCIpXCIpKTtcclxuICAgIH07XHJcbiAgICBNb2QucHJvdG90eXBlLkdldEFzc2V0ID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAobmFtZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIGFzc2V0ID0gdGhpcy5Bc3NldHMuZmluZChmdW5jdGlvbiAoYXNzZXQpIHsgcmV0dXJuIGFzc2V0Lk5hbWUgPT09IG5hbWU7IH0pO1xyXG4gICAgICAgIGlmIChhc3NldCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHByaW50Q29uc29sZShcIkFzc2V0IFwiLmNvbmNhdChuYW1lLCBcIiBub3QgZm91bmRcIikpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFzc2V0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNb2Q7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IE1vZDtcclxuIiwiaW1wb3J0IHsgTW9kc0xpc3QgfSBmcm9tIFwiLi4vbW9kcy9tb2RzTGlzdC5lbnVtXCI7XHJcbnZhciBNb2REYXRhID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTW9kRGF0YSgpIHtcclxuICAgIH1cclxuICAgIE1vZERhdGEuUExVR0lOX05BTUUgPSBcImhleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0XCI7XHJcbiAgICBNb2REYXRhLlZFUlNJT04gPSBcIjEuMC4wXCI7XHJcbiAgICBNb2REYXRhLlJFUVVJUkVNRU5UUyA9IFtNb2RzTGlzdC5IRVhfQWR2ZW50dXJlckV4cGVyaWVuY2VdO1xyXG4gICAgTW9kRGF0YS5BVVRIT1IgPSBcIkhleGFnb25cIjtcclxuICAgIHJldHVybiBNb2REYXRhO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBNb2REYXRhO1xyXG4iLCJ2YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59O1xyXG52YXIgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhKCkge1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YSwgXCJBbGxBc3NldHNcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIHRoaXMuV2VhcG9uc0xpc3QsIHRydWUpLCB0aGlzLkFjdGl2ZU1hZ2ljRWZmZWN0c0xpc3QsIHRydWUpLCB0aGlzLlNwZWxsc0xpc3QsIHRydWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5maWxsID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNvdXJjZVtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBfYSA9IEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YTtcclxuICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5XZWFwb25zID0ge1xyXG4gICAgICAgIEhFWF9JVE1XX1RFU1RNT0RfVGVzdHdlYXBvbjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDJEQjRcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfSVRNV19URVNUTU9EX1Rlc3R3ZWFwb25cIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5XZWFwb25zTGlzdCA9IF9hLmZpbGwoX2EuV2VhcG9ucyk7XHJcbiAgICBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEuQWN0aXZlTWFnaWNFZmZlY3RzID0ge1xyXG4gICAgICAgIEhFWF9NR0VGX0ZvcnRpZnlIZWFsdGg6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAzRERDXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfRm9ydGlmeUhlYWx0aFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfRm9ydGlmeVN0YW1pbmE6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAzREREXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfRm9ydGlmeVN0YW1pbmFcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX0ZvcnRpZnlNYWdpY2thOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RERVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX0ZvcnRpZnlNYWdpY2thXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9IZWFsdGhSZWdlbjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDNEREZcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9IZWFsdGhSZWdlblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfU3RhbWluYVJlZ2VuOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFMFwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1N0YW1pbmFSZWdlblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfTWFnaWNrYVJlZ2VuOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFMVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX01hZ2lja2FSZWdlblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfUmVzaXN0TWFnaWM6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAzREUyXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfUmVzaXN0TWFnaWNcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1Jlc2lzdEZpcmU6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAzREUzXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfUmVzaXN0RmlyZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfUmVzaXN0RnJvc3Q6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAzREU0XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfUmVzaXN0RnJvc3RcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1Jlc2lzdEVsZWN0cmljOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFNVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdEVsZWN0cmljXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9SZXNpc3REYW1hZ2U6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAzREU2XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfUmVzaXN0RGFtYWdlXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9Gb3J0aWZ5RGFtYWdlOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFN1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX0ZvcnRpZnlEYW1hZ2VcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX0ZvcnRpZnlEYW1hZ2VEZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDQzNENcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9Gb3J0aWZ5RGFtYWdlRGVzY3JpcHRpb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX0F0dHJpYnV0ZXNEZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDUzNzdcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9BdHRyaWJ1dGVzRGVzY3JpcHRpb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1Jlc2lzdEVsZW1lbnREZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDUzNzhcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9SZXNpc3RFbGVtZW50RGVzY3JpcHRpb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX0ZvcnRpZnlDYXJyeVdlaWdodDoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDU4RERcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9Gb3J0aWZ5Q2FycnlXZWlnaHRcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1Jlc2lzdFBvaXRpb25zOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwNUU0MVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdFBvaXRpb25zXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9SZXNpc3REaXNlYXNlOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwNUU0MFwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdERpc2Vhc2VcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1Jlc2lzdEJhZEVmZmVjdHM6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDA1RTQyXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfUmVzaXN0QmFkRWZmZWN0c1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLkFjdGl2ZU1hZ2ljRWZmZWN0c0xpc3QgPSBfYS5maWxsKF9hLkFjdGl2ZU1hZ2ljRWZmZWN0cyk7XHJcbiAgICBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEuU3BlbGxzID0ge1xyXG4gICAgICAgIEhFWF9TUEVMTF9BZHZlbnR1cmllckV4cGlyaWVuY2UwOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwNDM0QlwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9TUEVMTF9BZHZlbnR1cmllckV4cGlyaWVuY2UwXCIsXHJcbiAgICAgICAgICAgIGVmZmVjdHNEYXRhOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J/QvtCy0YvRiNC10L3QuNC1INGD0YDQvtC90LAg0L7RgNGD0LbQuNC10LxcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMCxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwLjAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQn9C+0LLRi9GI0LXQvdC40LUg0LHRgNC+0L3QuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQntC/0LjRgdCw0L3QuNC1INC/0L7QstGL0YjQtdC90LjRjyDRg9GA0L7QvdCwINC+0YDRg9C20LjQtdC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J/QvtCy0YvRiNC10L3QuNC1INC/0LXRgNC10L3QvtGB0LjQvNC+0LPQviDQstC10YHQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9TUEVMTF9BZHZlbnR1cmllckV4cGlyaWVuY2UxOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwNDM0RVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9TUEVMTF9BZHZlbnR1cmllckV4cGlyaWVuY2UxXCIsXHJcbiAgICAgICAgICAgIGVmZmVjdHNEYXRhOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J/QvtCy0YvRiNC10L3QuNC1INC30LTQvtGA0L7QstGM0Y9cIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMCxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMTUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCf0L7QstGL0YjQtdC90LjQtSDQt9Cw0L/QsNGB0LAg0YHQuNC7XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDE1LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQn9C+0LLRi9GI0LXQvdC40LUg0LzQsNCz0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0KDQtdCz0LXQvdC10YDQsNGG0LjRjyDQt9C00L7RgNC+0LLRjNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCg0LXQs9C10L3QtdGA0LDRhtC40Y8g0LfQsNC/0LDRgdCwINGB0LjQu1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQoNC10LPQtdC90LXRgNCw0YbQuNGPINC80LDQs9C40LhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogNSxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J/QvtCy0YvRiNC10L3QuNC1INCw0YLRgNC40LHRg9GC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J/QvtCy0YvRiNC10L3QuNC1INGA0LXQs9C10L3QtdGA0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogNyxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDQzNEZcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMlwiLFxyXG4gICAgICAgICAgICBlZmZlY3RzRGF0YTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCh0L7Qv9GA0L7RgtC40LLQu9C10L3QuNC1INC80LDQs9C40LhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMCxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQodC+0L/RgNC+0YLQuNCy0LvQtdC90LjQtSDQvtCz0L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCh0L7Qv9GA0L7RgtC40LLQu9C10L3QuNC1INGF0L7Qu9C+0LTRg1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCh0L7Qv9GA0L7RgtC40LLQu9C10L3QuNC1INGN0LvQtdC60YLRgNC40YfQtdGB0YLQstGDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0KHQvtC/0YDQvtGC0LjQstC70LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMzoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDVFNDNcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlM1wiLFxyXG4gICAgICAgICAgICBlZmZlY3RzRGF0YTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCh0L7Qv9GA0L7RgtC40LLQu9C10L3QuNC1INCx0L7Qu9C10LfQvdGP0LxcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMCxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQodC+0L/RgNC+0YLQuNCy0LvQtdC90LjQtSDRj9C00LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCh0L7Qv9GA0L7RgtC40LLQu9C10L3QuNC1INGP0LTQsNC8INC4INCx0L7Qu9C10LfQvdGP0LxcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMixcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5TcGVsbHNMaXN0ID0gX2EuZmlsbChfYS5TcGVsbHMpO1xyXG4gICAgcmV0dXJuIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhO1xyXG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgR2FtZSwgb24sIG9uY2UsIFNwZWxsIH0gZnJvbSBcInNreXJpbVBsYXRmb3JtXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2dsb2JhbFwiO1xyXG5pbXBvcnQgRmVhdHVyZSBmcm9tIFwiLi4vLi4vLi4vY29yZS9mZWF0dXJlXCI7XHJcbmltcG9ydCB7IFRyYWNrZWRTdGF0IH0gZnJvbSBcIi4uLy4uLy4uL3NreXJpbS90cmFja2VkU3RhdC5lbnVtXCI7XHJcbmltcG9ydCB7IE1vZHNMaXN0IH0gZnJvbSBcIi4uLy4uL21vZHNMaXN0LmVudW1cIjtcclxuaW1wb3J0IEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YSBmcm9tIFwiLi4vZGF0YS9hZHZlbnR1cmVyRXhwaXJpZW5jZURhdGFcIjtcclxudmFyIFN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24oKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuTmFtZSA9IFwiU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uXCI7XHJcbiAgICAgICAgX3RoaXMuX2V2ZW50SGFuZGxlck5hbWUgPSBcIlJlZnJlc2hBZHZlbnR1cmllckJvbnVzZXNcIjtcclxuICAgICAgICBfdGhpcy5fbW9kID0gR2xvYmFsLkNvbnRleHQuR2V0TW9kKE1vZHNMaXN0LkhFWF9BZHZlbnR1cmVyRXhwZXJpZW5jZSk7XHJcbiAgICAgICAgX3RoaXMuX3NwZWxscyA9IFtcclxuICAgICAgICAgICAgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLlNwZWxscy5IRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMCxcclxuICAgICAgICAgICAgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLlNwZWxscy5IRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMSxcclxuICAgICAgICAgICAgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLlNwZWxscy5IRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMixcclxuICAgICAgICAgICAgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLlNwZWxscy5IRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMyxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbi5wcm90b3R5cGUuRW5hYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgR2xvYmFsLkNvbnRleHQuU2FmZVN1YnNjcmliZShvbihcInRyYWNrZWRTdGF0c1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgX3RoaXMuRXZlbnRIYW5kbGVyKGV2ZW50KTtcclxuICAgICAgICB9KSwgdGhpcy5fZXZlbnRIYW5kbGVyTmFtZSk7XHJcbiAgICB9O1xyXG4gICAgU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uLnByb3RvdHlwZS5EaXNhYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEdsb2JhbC5Db250ZXh0LlVuc3Vic2NyaWJlKHRoaXMuX2V2ZW50SGFuZGxlck5hbWUpO1xyXG4gICAgICAgIEdsb2JhbC5Db250ZXh0LlVuc3Vic2NyaWJlKFwiVXBkYXRlRXZlbnRcIik7XHJcbiAgICB9O1xyXG4gICAgU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uLnByb3RvdHlwZS5FdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh2YWx1ZS5zdGF0TmFtZSAhPT0gVHJhY2tlZFN0YXQuRHVuZ2VvbnNDbGVhcmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX21vZCA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgdmFyIHNwZWxsID0gdGhpc18xLl9zcGVsbHNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzXzEuSGFzU3BlbGwoc3BlbGwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzXzEuUmVtb3ZlU3BlbGwoc3BlbGwpO1xyXG4gICAgICAgICAgICAgICAgb25jZShcInVwZGF0ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuQWRkU3BlbGwoc3BlbGwsIHZhbHVlLm5ld1ZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXNfMS5BZGRTcGVsbChzcGVsbCwgdmFsdWUubmV3VmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zcGVsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgX2xvb3BfMShpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uLnByb3RvdHlwZS5IYXNTcGVsbCA9IGZ1bmN0aW9uIChzcGVsbCkge1xyXG4gICAgICAgIHZhciBzcGVsbEZvcm0gPSB0aGlzLkdldFNwZWxsKHNwZWxsKTtcclxuICAgICAgICB2YXIgcGxheWVyID0gR2FtZS5nZXRQbGF5ZXIoKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyLmhhc1NwZWxsKHNwZWxsRm9ybSk7XHJcbiAgICB9O1xyXG4gICAgU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uLnByb3RvdHlwZS5HZXRTcGVsbCA9IGZ1bmN0aW9uIChzcGVsbCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgYXNzZXQgPSAoX2EgPSB0aGlzLl9tb2QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5HZXRBc3NldChzcGVsbC5uYW1lKTtcclxuICAgICAgICB2YXIgZm9ybSA9IEdhbWUuZ2V0Rm9ybUV4KGFzc2V0Lk51bWVyaWNJZCk7XHJcbiAgICAgICAgcmV0dXJuIFNwZWxsLmZyb20oZm9ybSk7XHJcbiAgICB9O1xyXG4gICAgU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uLnByb3RvdHlwZS5BZGRTcGVsbCA9IGZ1bmN0aW9uIChzcGVsbCwgcG93ZXIsIHNpbGVudCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAoc2lsZW50ID09PSB2b2lkIDApIHsgc2lsZW50ID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgc3BlbGxGb3JtID0gdGhpcy5HZXRTcGVsbChzcGVsbCk7XHJcbiAgICAgICAgdmFyIHBsYXllciA9IEdhbWUuZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgdmFyIGVmZmVjdHNDb3VudCA9IChfYSA9IHNwZWxsRm9ybSA9PT0gbnVsbCB8fCBzcGVsbEZvcm0gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNwZWxsRm9ybS5nZXRNYWdpY0VmZmVjdHMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aDtcclxuICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uIChqKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc3BlbGwuZWZmZWN0c0RhdGEuZmluZChmdW5jdGlvbiAoZWZmZWN0KSB7IHJldHVybiBlZmZlY3QuaW5kZXggPT0gajsgfSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb250aW51ZVwiO1xyXG4gICAgICAgICAgICB2YXIgbWFnbml0dWRlID0gTWF0aC5mbG9vcihwb3dlciAvIGRhdGEuZGl2aWRlcikgKiBkYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICBzcGVsbEZvcm0gPT09IG51bGwgfHwgc3BlbGxGb3JtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzcGVsbEZvcm0uc2V0TnRoRWZmZWN0TWFnbml0dWRlKGosIG1hZ25pdHVkZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGVmZmVjdHNDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgIF9sb29wXzIoaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXllci5hZGRTcGVsbChzcGVsbEZvcm0sICFzaWxlbnQpO1xyXG4gICAgfTtcclxuICAgIFN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbi5wcm90b3R5cGUuUmVtb3ZlU3BlbGwgPSBmdW5jdGlvbiAoc3BlbGwpIHtcclxuICAgICAgICB2YXIgc3BlbGxGb3JtID0gdGhpcy5HZXRTcGVsbChzcGVsbCk7XHJcbiAgICAgICAgdmFyIHBsYXllciA9IEdhbWUuZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgcGxheWVyLnJlbW92ZVNwZWxsKHNwZWxsRm9ybSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbjtcclxufShGZWF0dXJlKSk7XHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbjtcclxuIiwiZXhwb3J0IHZhciBNb2RzTGlzdDtcclxuKGZ1bmN0aW9uIChNb2RzTGlzdCkge1xyXG4gICAgTW9kc0xpc3RbXCJIRVhfQWR2ZW50dXJlckV4cGVyaWVuY2VcIl0gPSBcIkhFWF9BZHZlbnR1cmVyRXhwZXJpZW5jZS5lc3BcIjtcclxufSkoTW9kc0xpc3QgfHwgKE1vZHNMaXN0ID0ge30pKTtcclxuIiwiZXhwb3J0IHZhciBUcmFja2VkU3RhdDtcclxuKGZ1bmN0aW9uIChUcmFja2VkU3RhdCkge1xyXG4gICAgVHJhY2tlZFN0YXRbXCJMb2NhdGlvbnNEaXNjb3ZlcmVkXCJdID0gXCJMb2NhdGlvbnMgRGlzY292ZXJlZFwiO1xyXG4gICAgVHJhY2tlZFN0YXRbXCJEdW5nZW9uc0NsZWFyZWRcIl0gPSBcIkR1bmdlb25zIENsZWFyZWRcIjtcclxufSkoVHJhY2tlZFN0YXQgfHwgKFRyYWNrZWRTdGF0ID0ge30pKTtcclxuIiwiaW1wb3J0IEdhbWVDb250ZXh0IGZyb20gXCIuLi9jb3JlL2dhbWVDb250ZXh0XCI7XHJcbnZhciBHbG9iYWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBHbG9iYWwoKSB7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2xvYmFsLCBcIkNvbnRleHRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBHbG9iYWwuX2NvbnRleHQgPSBuZXcgR2FtZUNvbnRleHQoKTtcclxuICAgIHJldHVybiBHbG9iYWw7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IEdsb2JhbDtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBza3lyaW1QbGF0Zm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgb24sIG9uY2UsIHByaW50Q29uc29sZSB9IGZyb20gXCJza3lyaW1QbGF0Zm9ybVwiO1xyXG5pbXBvcnQgTW9kRGF0YSBmcm9tIFwiLi9tZXRhL21vZERhdGFcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxcIjtcclxuaW1wb3J0IHsgTW9kc0xpc3QgfSBmcm9tIFwiLi9tb2RzL21vZHNMaXN0LmVudW1cIjtcclxuaW1wb3J0IFN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbiBmcm9tIFwiLi9tb2RzL0hFWF9BZHZlbnR1cmVyRXhwZXJpZW5jZS9mZWF0dXJlcy9zdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb25cIjtcclxuaW1wb3J0IEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YSBmcm9tIFwiLi9tb2RzL0hFWF9BZHZlbnR1cmVyRXhwZXJpZW5jZS9kYXRhL2FkdmVudHVyZXJFeHBpcmllbmNlRGF0YVwiO1xyXG52YXIgY29udGV4dCA9IEdsb2JhbC5Db250ZXh0O1xyXG5vbmNlKFwic2t5cmltTG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHByaW50Q29uc29sZShcIlwiLmNvbmNhdChNb2REYXRhLlBMVUdJTl9OQU1FKSk7XHJcbiAgICBwcmludENvbnNvbGUoXCJWZXJzaW9uIFwiLmNvbmNhdChNb2REYXRhLlZFUlNJT04pKTtcclxufSk7XHJcbm9uKFwibmV3R2FtZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmludENvbnNvbGUoXCJOZXdHYW1lXCIpO1xyXG4gICAgb25jZShcInVwZGF0ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc3RhcnQoKTtcclxuICAgIH0pO1xyXG59KTtcclxub24oXCJsb2FkR2FtZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmludENvbnNvbGUoXCJMb2FkR2FtZVwiKTtcclxuICAgIHN0YXJ0KCk7XHJcbn0pO1xyXG5mdW5jdGlvbiBzdGFydCgpIHtcclxuICAgIGNvbnRleHQuUmVzZXQoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTW9kRGF0YS5SRVFVSVJFTUVOVFMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbW9kTmFtZSA9IE1vZERhdGEuUkVRVUlSRU1FTlRTW2ldO1xyXG4gICAgICAgIGNvbnRleHQuUmVnaXN0ZXJNb2QobW9kTmFtZSk7XHJcbiAgICB9XHJcbiAgICB2YXIgbW9kID0gY29udGV4dC5HZXRNb2QoTW9kc0xpc3QuSEVYX0FkdmVudHVyZXJFeHBlcmllbmNlKTtcclxuICAgIHZhciBtb2RBc3NldHMgPSBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEuQWxsQXNzZXRzO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RBc3NldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYXNzZXQgPSBtb2RBc3NldHNbaV07XHJcbiAgICAgICAgbW9kLlJlZ2lzdGVyQXNzZXQoYXNzZXQuaGV4SWQsIGFzc2V0Lm5hbWUpO1xyXG4gICAgfVxyXG4gICAgY29udGV4dC5FbmFibGVGZWF0dXJlKG5ldyBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24oKSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9