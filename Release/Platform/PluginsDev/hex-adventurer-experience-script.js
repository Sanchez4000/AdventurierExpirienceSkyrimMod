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
                    value: 0,
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
    };
    StatBoostPerDiscoveredLocation.prototype.EventHandler = function (value) {
        var _a;
        if (value.statName !== _skyrim_trackedStat_enum__WEBPACK_IMPORTED_MODULE_3__.TrackedStat.DungeonsCleared)
            return;
        if (this._mod === null)
            return;
        var player = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getPlayer();
        for (var i = 0; i < this._spells.length; i++) {
            var spell = this._spells[i];
            var asset = this._mod.GetAsset(spell.name);
            var spellForm = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Spell.from(skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getFormEx(asset.NumericId));
            if (player.hasSpell(spellForm)) {
                player.removeSpell(spellForm);
            }
            var effectsCount = (_a = spellForm === null || spellForm === void 0 ? void 0 : spellForm.getMagicEffects()) === null || _a === void 0 ? void 0 : _a.length;
            var _loop_1 = function (j) {
                var data = spell.effectsData.find(function (effect) { return effect.index == j; });
                if (data === undefined)
                    return "continue";
                var magnitude = Math.floor(value.newValue / data.divider) * data.value;
                spellForm === null || spellForm === void 0 ? void 0 : spellForm.setNthEffectMagnitude(j, magnitude);
            };
            for (var j = 0; j < effectsCount; j++) {
                _loop_1(j);
            }
            player.addSpell(spellForm, true);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDbkI7QUFDRDtBQUNZO0FBQ3FFO0FBQ2hCO0FBQ3JHLGNBQWMsNkRBQWM7QUFDNUIsb0RBQUk7QUFDSixJQUFJLDREQUFZLFdBQVcsaUVBQW1CO0FBQzlDLElBQUksNERBQVksbUJBQW1CLDZEQUFlO0FBQ2xELENBQUM7QUFDRCxrREFBRTtBQUNGLElBQUksNERBQVk7QUFDaEIsSUFBSSxvREFBSTtBQUNSO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRCxrREFBRTtBQUNGLElBQUksNERBQVk7QUFDaEI7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG9CQUFvQixJQUFJLHlFQUEyQixFQUFFO0FBQ3JELHNCQUFzQixrRUFBb0I7QUFDMUM7QUFDQTtBQUNBLDZCQUE2QixrRkFBaUM7QUFDOUQsb0JBQW9CLDhHQUFrQztBQUN0RCxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw4R0FBOEI7QUFDNUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC8uL3NyYy9jb3JlL2Fzc2V0LnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL2NvcmUvZmVhdHVyZS50cyIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC8uL3NyYy9jb3JlL2dhbWVDb250ZXh0LnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL2NvcmUvbW9kLnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL21ldGEvbW9kRGF0YS50cyIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC8uL3NyYy9tb2RzL0hFWF9BZHZlbnR1cmVyRXhwZXJpZW5jZS9kYXRhL2FkdmVudHVyZXJFeHBpcmllbmNlRGF0YS50cyIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC8uL3NyYy9tb2RzL0hFWF9BZHZlbnR1cmVyRXhwZXJpZW5jZS9mZWF0dXJlcy9zdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvLi9zcmMvbW9kcy9tb2RzTGlzdC5lbnVtLnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL3NreXJpbS90cmFja2VkU3RhdC5lbnVtLnRzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0Ly4vc3JjL3V0aWxzL2dsb2JhbC50cyIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC9leHRlcm5hbCB2YXIgW1wic2t5cmltUGxhdGZvcm1cIl0iLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hleC1hZHZlbnR1cmVyLWV4cGVyaWVuY2Utc2NyaXB0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGV4LWFkdmVudHVyZXItZXhwZXJpZW5jZS1zY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQXNzZXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBc3NldChoZXhJZCwgbmFtZSkge1xyXG4gICAgICAgIHRoaXMuX2hleElkID0gaGV4SWQ7XHJcbiAgICAgICAgdGhpcy5fbnVtZXJpY0lkID0gcGFyc2VJbnQoaGV4SWQsIDE2KTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBc3NldC5wcm90b3R5cGUsIFwiSGV4SWRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGV4SWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2V0LnByb3RvdHlwZSwgXCJOdW1lcmljSWRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbnVtZXJpY0lkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBc3NldC5wcm90b3R5cGUsIFwiTmFtZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBBc3NldDtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgQXNzZXQ7XHJcbiIsInZhciBGZWF0dXJlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmVhdHVyZSgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBGZWF0dXJlO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlO1xyXG4iLCJpbXBvcnQgeyBHYW1lLCBwcmludENvbnNvbGUsIHVuc3Vic2NyaWJlIH0gZnJvbSBcInNreXJpbVBsYXRmb3JtXCI7XHJcbmltcG9ydCBNb2QgZnJvbSBcIi4vbW9kXCI7XHJcbnZhciBHYW1lQ29udGV4dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEdhbWVDb250ZXh0KCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2ZlYXR1cmVzID0gW107XHJcbiAgICAgICAgdGhpcy5fbW9kTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgR2FtZUNvbnRleHQucHJvdG90eXBlLlJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHByaW50Q29uc29sZShcIlJlc2V0XCIpO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9mZWF0dXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzYWJsZUZlYXR1cmUodGhpcy5fZmVhdHVyZXNbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodGhpcy5fZXZlbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5VbnN1YnNjcmliZSh0aGlzLl9ldmVudHNbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb2RNYXAuY2xlYXIoKTtcclxuICAgIH07XHJcbiAgICBHYW1lQ29udGV4dC5wcm90b3R5cGUuU2FmZVN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudCwgbmFtZSkge1xyXG4gICAgICAgIHZhciBleGlzdGVkID0gdGhpcy5fZXZlbnRzLmZpbmQoZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikgeyByZXR1cm4gc3Vic2NyaXB0aW9uLm5hbWUgPT09IG5hbWU7IH0pO1xyXG4gICAgICAgIGlmIChleGlzdGVkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJpbnRDb25zb2xlKFwiRXZlbnQgd2l0aCBuYW1lIFwiLmNvbmNhdChuYW1lLCBcIiBhbHJlYWR5IGV4aXN0XCIpKTtcclxuICAgICAgICAgICAgdW5zdWJzY3JpYmUoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBwcmludENvbnNvbGUoXCJFdmVudCBoYW5kbGVyIFwiLmNvbmNhdChuYW1lLCBcIiByZWdpc3RlcmVkIGZvciBcIikuY29uY2F0KGV2ZW50LmV2ZW50TmFtZSkpO1xyXG4gICAgfTtcclxuICAgIEdhbWVDb250ZXh0LnByb3RvdHlwZS5VbnN1YnNjcmliZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9ldmVudHMuZmluZChmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7IHJldHVybiBzdWJzY3JpcHRpb24ubmFtZSA9PT0gdmFsdWU7IH0pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVuc3Vic2NyaWJlKHZhbHVlLmV2ZW50KTtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMuZmlsdGVyKGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHsgcmV0dXJuIHN1YnNjcmlwdGlvbiAhPT0gdmFsdWU7IH0pO1xyXG4gICAgICAgIHByaW50Q29uc29sZShcIkV2ZW50IGhhbmRsZXIgXCIuY29uY2F0KHZhbHVlLm5hbWUsIFwiIHVuc3Vic2NyaWJlZFwiKSk7XHJcbiAgICB9O1xyXG4gICAgR2FtZUNvbnRleHQucHJvdG90eXBlLlJlZ2lzdGVyTW9kID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgbW9kSW5kZXggPSBHYW1lLmdldE1vZEJ5TmFtZShuYW1lKTtcclxuICAgICAgICBpZiAobW9kSW5kZXggPT09IEdhbWVDb250ZXh0Lk1PRF9OT1RfRk9VTkRfSU5ERVgpIHtcclxuICAgICAgICAgICAgcHJpbnRDb25zb2xlKFwiTW9kOiBcIi5jb25jYXQobmFtZSwgXCIgaXMgbWlzc2luZ1wiKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1vZCA9IG5ldyBNb2QobW9kSW5kZXgsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX21vZE1hcC5zZXQobmFtZSwgbW9kKTtcclxuICAgICAgICBwcmludENvbnNvbGUoXCJNb2Q6IFwiLmNvbmNhdChuYW1lLCBcIiByZWdpc3RlcmVkXCIpKTtcclxuICAgIH07XHJcbiAgICBHYW1lQ29udGV4dC5wcm90b3R5cGUuR2V0TW9kID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgbW9kID0gdGhpcy5fbW9kTWFwLmdldChuYW1lKTtcclxuICAgICAgICByZXR1cm4gbW9kIHx8IG51bGw7XHJcbiAgICB9O1xyXG4gICAgR2FtZUNvbnRleHQucHJvdG90eXBlLkVuYWJsZUZlYXR1cmUgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBmZWF0dXJlID0gdGhpcy5fZmVhdHVyZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmVhdHVyZSA9PT0gdHlwZW9mIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBwcmludENvbnNvbGUoXCJGZWF0dXJlIFwiLmNvbmNhdChpbnN0YW5jZS5OYW1lLCBcIiBhbHJlYWR5IGVuYWJsZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2ZlYXR1cmVzLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgIGluc3RhbmNlLkVuYWJsZSgpO1xyXG4gICAgICAgIHByaW50Q29uc29sZShcIkZlYXR1cmUgXCIuY29uY2F0KGluc3RhbmNlLk5hbWUsIFwiIGVuYWJsZWRcIikpO1xyXG4gICAgfTtcclxuICAgIEdhbWVDb250ZXh0LnByb3RvdHlwZS5EaXNhYmxlRmVhdHVyZSA9IGZ1bmN0aW9uIChmZWF0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5fZmVhdHVyZXMgPSB0aGlzLl9mZWF0dXJlcy5maWx0ZXIoZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYgIT09IGZlYXR1cmU7IH0pO1xyXG4gICAgICAgIGZlYXR1cmUuRGlzYWJsZSgpO1xyXG4gICAgICAgIHByaW50Q29uc29sZShcIkZlYXR1cmUgXCIuY29uY2F0KHR5cGVvZiBmZWF0dXJlLCBcIiBkaXNhYmxlZFwiKSk7XHJcbiAgICB9O1xyXG4gICAgR2FtZUNvbnRleHQuTU9EX05PVF9GT1VORF9JTkRFWCA9IDB4ZmY7XHJcbiAgICByZXR1cm4gR2FtZUNvbnRleHQ7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVDb250ZXh0O1xyXG4iLCJpbXBvcnQgeyBwcmludENvbnNvbGUgfSBmcm9tIFwic2t5cmltUGxhdGZvcm1cIjtcclxuaW1wb3J0IEFzc2V0IGZyb20gXCIuL2Fzc2V0XCI7XHJcbnZhciBNb2QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBNb2QoaW5kZXgsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLkFzc2V0cyA9IFtdO1xyXG4gICAgICAgIHZhciBoZXhJbmRleCA9IGluZGV4LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICB0aGlzLk1vZFByZWZpeCA9IFwiMHhcIi5jb25jYXQoaGV4SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuTW9kTmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kLnByb3RvdHlwZSwgXCJOYW1lXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTW9kTmFtZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBNb2QucHJvdG90eXBlLlJlZ2lzdGVyQXNzZXQgPSBmdW5jdGlvbiAoaGV4SWQsIG5hbWUpIHtcclxuICAgICAgICB2YXIgaGV4SXRlbUlkID0gXCJcIi5jb25jYXQodGhpcy5Nb2RQcmVmaXgpLmNvbmNhdChoZXhJZCk7XHJcbiAgICAgICAgdmFyIHJlZ2V4ID0gL14weFswLTlBLUZhLWZdezh9JC87XHJcbiAgICAgICAgaWYgKCFyZWdleC50ZXN0KGhleEl0ZW1JZCkpIHtcclxuICAgICAgICAgICAgcHJpbnRDb25zb2xlKFwiRXJyb3IgcmVnaXN0ZXJpbmcgYXNzZXQuIElkIGNhbm5vdCBiZSBcIi5jb25jYXQoaGV4SXRlbUlkKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld0Fzc2V0ID0gbmV3IEFzc2V0KGhleEl0ZW1JZCwgbmFtZSk7XHJcbiAgICAgICAgdmFyIGV4aXN0ZWQgPSB0aGlzLkFzc2V0cy5maW5kKGZ1bmN0aW9uIChhc3NldCkgeyByZXR1cm4gYXNzZXQuTnVtZXJpY0lkID09PSBuZXdBc3NldC5OdW1lcmljSWQ7IH0pO1xyXG4gICAgICAgIGlmIChleGlzdGVkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJpbnRDb25zb2xlKFwiRXJyb3IgcmVnaXN0ZXJpbmcgYXNzZXQuIFwiLmNvbmNhdChuZXdBc3NldC5IZXhJZCwgXCIgYWxyZWFkeSBleGlzdGVkXCIpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkFzc2V0cy5wdXNoKG5ld0Fzc2V0KTtcclxuICAgICAgICBwcmludENvbnNvbGUoXCJBc3NldCBcIi5jb25jYXQoaGV4SXRlbUlkLCBcIiByZWdpc3RlcmVkIChcIikuY29uY2F0KG5hbWUsIFwiKVwiKSk7XHJcbiAgICB9O1xyXG4gICAgTW9kLnByb3RvdHlwZS5HZXRBc3NldCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBhc3NldCA9IHRoaXMuQXNzZXRzLmZpbmQoZnVuY3Rpb24gKGFzc2V0KSB7IHJldHVybiBhc3NldC5OYW1lID09PSBuYW1lOyB9KTtcclxuICAgICAgICBpZiAoYXNzZXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwcmludENvbnNvbGUoXCJBc3NldCBcIi5jb25jYXQobmFtZSwgXCIgbm90IGZvdW5kXCIpKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhc3NldDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTW9kO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBNb2Q7XHJcbiIsImltcG9ydCB7IE1vZHNMaXN0IH0gZnJvbSBcIi4uL21vZHMvbW9kc0xpc3QuZW51bVwiO1xyXG52YXIgTW9kRGF0YSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vZERhdGEoKSB7XHJcbiAgICB9XHJcbiAgICBNb2REYXRhLlBMVUdJTl9OQU1FID0gXCJoZXgtYWR2ZW50dXJlci1leHBlcmllbmNlLXNjcmlwdFwiO1xyXG4gICAgTW9kRGF0YS5WRVJTSU9OID0gXCIxLjAuMFwiO1xyXG4gICAgTW9kRGF0YS5SRVFVSVJFTUVOVFMgPSBbTW9kc0xpc3QuSEVYX0FkdmVudHVyZXJFeHBlcmllbmNlXTtcclxuICAgIE1vZERhdGEuQVVUSE9SID0gXCJIZXhhZ29uXCI7XHJcbiAgICByZXR1cm4gTW9kRGF0YTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgTW9kRGF0YTtcclxuIiwidmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxudmFyIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YSgpIHtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEsIFwiQWxsQXNzZXRzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCB0aGlzLldlYXBvbnNMaXN0LCB0cnVlKSwgdGhpcy5BY3RpdmVNYWdpY0VmZmVjdHNMaXN0LCB0cnVlKSwgdGhpcy5TcGVsbHNMaXN0LCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEuZmlsbCA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChzb3VyY2Vba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgdmFyIF9hO1xyXG4gICAgX2EgPSBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGE7XHJcbiAgICBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEuV2VhcG9ucyA9IHtcclxuICAgICAgICBIRVhfSVRNV19URVNUTU9EX1Rlc3R3ZWFwb246IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAyREI0XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX0lUTVdfVEVTVE1PRF9UZXN0d2VhcG9uXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEuV2VhcG9uc0xpc3QgPSBfYS5maWxsKF9hLldlYXBvbnMpO1xyXG4gICAgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLkFjdGl2ZU1hZ2ljRWZmZWN0cyA9IHtcclxuICAgICAgICBIRVhfTUdFRl9Gb3J0aWZ5SGVhbHRoOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0REQ1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX0ZvcnRpZnlIZWFsdGhcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX0ZvcnRpZnlTdGFtaW5hOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RERFwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX0ZvcnRpZnlTdGFtaW5hXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9Gb3J0aWZ5TWFnaWNrYToge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDNEREVcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9Gb3J0aWZ5TWFnaWNrYVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfSGVhbHRoUmVnZW46IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDAzRERGXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfSGVhbHRoUmVnZW5cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1N0YW1pbmFSZWdlbjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDNERTBcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9TdGFtaW5hUmVnZW5cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX01hZ2lja2FSZWdlbjoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDNERTFcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9NYWdpY2thUmVnZW5cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1Jlc2lzdE1hZ2ljOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFMlwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdE1hZ2ljXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9SZXNpc3RGaXJlOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFM1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdEZpcmVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhFWF9NR0VGX1Jlc2lzdEZyb3N0OiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFNFwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdEZyb3N0XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9SZXNpc3RFbGVjdHJpYzoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDNERTVcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9SZXNpc3RFbGVjdHJpY1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfUmVzaXN0RGFtYWdlOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwM0RFNlwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdERhbWFnZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfRm9ydGlmeURhbWFnZToge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDNERTdcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9Gb3J0aWZ5RGFtYWdlXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9Gb3J0aWZ5RGFtYWdlRGVzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDA0MzRDXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfRm9ydGlmeURhbWFnZURlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9BdHRyaWJ1dGVzRGVzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDA1Mzc3XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfQXR0cmlidXRlc0Rlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9SZXNpc3RFbGVtZW50RGVzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDA1Mzc4XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfUmVzaXN0RWxlbWVudERlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9Gb3J0aWZ5Q2FycnlXZWlnaHQ6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDA1OEREXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX01HRUZfRm9ydGlmeUNhcnJ5V2VpZ2h0XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9SZXNpc3RQb2l0aW9uczoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDVFNDFcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9SZXNpc3RQb2l0aW9uc1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX01HRUZfUmVzaXN0RGlzZWFzZToge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDVFNDBcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfTUdFRl9SZXNpc3REaXNlYXNlXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfTUdFRl9SZXNpc3RCYWRFZmZlY3RzOiB7XHJcbiAgICAgICAgICAgIGhleElkOiBcIjAwNUU0MlwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkhFWF9NR0VGX1Jlc2lzdEJhZEVmZmVjdHNcIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5BY3RpdmVNYWdpY0VmZmVjdHNMaXN0ID0gX2EuZmlsbChfYS5BY3RpdmVNYWdpY0VmZmVjdHMpO1xyXG4gICAgQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLlNwZWxscyA9IHtcclxuICAgICAgICBIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMDoge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDQzNEJcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMFwiLFxyXG4gICAgICAgICAgICBlZmZlY3RzRGF0YTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCf0L7QstGL0YjQtdC90LjQtSDRg9GA0L7QvdCwINC+0YDRg9C20LjQtdC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMC4wMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J/QvtCy0YvRiNC10L3QuNC1INCx0YDQvtC90LhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMSxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J7Qv9C40YHQsNC90LjQtSDQv9C+0LLRi9GI0LXQvdC40Y8g0YPRgNC+0L3QsCDQvtGA0YPQttC40LXQvFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCf0L7QstGL0YjQtdC90LjQtSDQv9C10YDQtdC90L7RgdC40LzQvtCz0L4g0LLQtdGB0LBcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMyxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMToge1xyXG4gICAgICAgICAgICBoZXhJZDogXCIwMDQzNEVcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIRVhfU1BFTExfQWR2ZW50dXJpZXJFeHBpcmllbmNlMVwiLFxyXG4gICAgICAgICAgICBlZmZlY3RzRGF0YTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCf0L7QstGL0YjQtdC90LjQtSDQt9C00L7RgNC+0LLRjNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDE1LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQn9C+0LLRi9GI0LXQvdC40LUg0LfQsNC/0LDRgdCwINGB0LjQu1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0J/QvtCy0YvRiNC10L3QuNC1INC80LDQs9C40LhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMixcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMTUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCg0LXQs9C10L3QtdGA0LDRhtC40Y8g0LfQtNC+0YDQvtCy0YzRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQoNC10LPQtdC90LXRgNCw0YbQuNGPINC30LDQv9Cw0YHQsCDRgdC40LtcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogNCxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0KDQtdCz0LXQvdC10YDQsNGG0LjRjyDQvNCw0LPQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCf0L7QstGL0YjQtdC90LjQtSDQsNGC0YDQuNCx0YPRgtC+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogNixcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMTUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCf0L7QstGL0YjQtdC90LjQtSDRgNC10LPQtdC90LXRgNCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTI6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDA0MzRGXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTJcIixcclxuICAgICAgICAgICAgZWZmZWN0c0RhdGE6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQodC+0L/RgNC+0YLQuNCy0LvQtdC90LjQtSDQvNCw0LPQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0KHQvtC/0YDQvtGC0LjQstC70LXQvdC40LUg0L7Qs9C90Y5cIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMSxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQodC+0L/RgNC+0YLQuNCy0LvQtdC90LjQtSDRhdC+0LvQvtC00YNcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMixcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQodC+0L/RgNC+0YLQuNCy0LvQtdC90LjQtSDRjdC70LXQutGC0YDQuNGH0LXRgdGC0LLRg1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBcItCh0L7Qv9GA0L7RgtC40LLQu9C10L3QuNC1INGN0LvQtdC80LXQvdGC0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTM6IHtcclxuICAgICAgICAgICAgaGV4SWQ6IFwiMDA1RTQzXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTNcIixcclxuICAgICAgICAgICAgZWZmZWN0c0RhdGE6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQodC+0L/RgNC+0YLQuNCy0LvQtdC90LjQtSDQsdC+0LvQtdC30L3Rj9C8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWU6IFwi0KHQvtC/0YDQvtGC0LjQstC70LXQvdC40LUg0Y/QtNCw0LxcIixcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogMSxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTmFtZTogXCLQodC+0L/RgNC+0YLQuNCy0LvQtdC90LjQtSDRj9C00LDQvCDQuCDQsdC+0LvQtdC30L3Rj9C8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlcjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEuU3BlbGxzTGlzdCA9IF9hLmZpbGwoX2EuU3BlbGxzKTtcclxuICAgIHJldHVybiBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGE7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YTtcclxuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IEdhbWUsIG9uLCBTcGVsbCB9IGZyb20gXCJza3lyaW1QbGF0Zm9ybVwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi8uLi91dGlscy9nbG9iYWxcIjtcclxuaW1wb3J0IEZlYXR1cmUgZnJvbSBcIi4uLy4uLy4uL2NvcmUvZmVhdHVyZVwiO1xyXG5pbXBvcnQgeyBUcmFja2VkU3RhdCB9IGZyb20gXCIuLi8uLi8uLi9za3lyaW0vdHJhY2tlZFN0YXQuZW51bVwiO1xyXG5pbXBvcnQgeyBNb2RzTGlzdCB9IGZyb20gXCIuLi8uLi9tb2RzTGlzdC5lbnVtXCI7XHJcbmltcG9ydCBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEgZnJvbSBcIi4uL2RhdGEvYWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhXCI7XHJcbnZhciBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLk5hbWUgPSBcIlN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvblwiO1xyXG4gICAgICAgIF90aGlzLl9ldmVudEhhbmRsZXJOYW1lID0gXCJSZWZyZXNoQWR2ZW50dXJpZXJCb251c2VzXCI7XHJcbiAgICAgICAgX3RoaXMuX21vZCA9IEdsb2JhbC5Db250ZXh0LkdldE1vZChNb2RzTGlzdC5IRVhfQWR2ZW50dXJlckV4cGVyaWVuY2UpO1xyXG4gICAgICAgIF90aGlzLl9zcGVsbHMgPSBbXHJcbiAgICAgICAgICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5TcGVsbHMuSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTAsXHJcbiAgICAgICAgICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5TcGVsbHMuSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTEsXHJcbiAgICAgICAgICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5TcGVsbHMuSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTIsXHJcbiAgICAgICAgICAgIEFkdmVudHVyZXJFeHBpcmllbmNlRGF0YS5TcGVsbHMuSEVYX1NQRUxMX0FkdmVudHVyaWVyRXhwaXJpZW5jZTMsXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24ucHJvdG90eXBlLkVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIEdsb2JhbC5Db250ZXh0LlNhZmVTdWJzY3JpYmUob24oXCJ0cmFja2VkU3RhdHNcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIF90aGlzLkV2ZW50SGFuZGxlcihldmVudCk7XHJcbiAgICAgICAgfSksIHRoaXMuX2V2ZW50SGFuZGxlck5hbWUpO1xyXG4gICAgfTtcclxuICAgIFN0YXRCb29zdFBlckRpc2NvdmVyZWRMb2NhdGlvbi5wcm90b3R5cGUuRGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBHbG9iYWwuQ29udGV4dC5VbnN1YnNjcmliZSh0aGlzLl9ldmVudEhhbmRsZXJOYW1lKTtcclxuICAgIH07XHJcbiAgICBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24ucHJvdG90eXBlLkV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAodmFsdWUuc3RhdE5hbWUgIT09IFRyYWNrZWRTdGF0LkR1bmdlb25zQ2xlYXJlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9tb2QgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgcGxheWVyID0gR2FtZS5nZXRQbGF5ZXIoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NwZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3BlbGwgPSB0aGlzLl9zcGVsbHNbaV07XHJcbiAgICAgICAgICAgIHZhciBhc3NldCA9IHRoaXMuX21vZC5HZXRBc3NldChzcGVsbC5uYW1lKTtcclxuICAgICAgICAgICAgdmFyIHNwZWxsRm9ybSA9IFNwZWxsLmZyb20oR2FtZS5nZXRGb3JtRXgoYXNzZXQuTnVtZXJpY0lkKSk7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaGFzU3BlbGwoc3BlbGxGb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnJlbW92ZVNwZWxsKHNwZWxsRm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVmZmVjdHNDb3VudCA9IChfYSA9IHNwZWxsRm9ybSA9PT0gbnVsbCB8fCBzcGVsbEZvcm0gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNwZWxsRm9ybS5nZXRNYWdpY0VmZmVjdHMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzcGVsbC5lZmZlY3RzRGF0YS5maW5kKGZ1bmN0aW9uIChlZmZlY3QpIHsgcmV0dXJuIGVmZmVjdC5pbmRleCA9PSBqOyB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcclxuICAgICAgICAgICAgICAgIHZhciBtYWduaXR1ZGUgPSBNYXRoLmZsb29yKHZhbHVlLm5ld1ZhbHVlIC8gZGF0YS5kaXZpZGVyKSAqIGRhdGEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBzcGVsbEZvcm0gPT09IG51bGwgfHwgc3BlbGxGb3JtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzcGVsbEZvcm0uc2V0TnRoRWZmZWN0TWFnbml0dWRlKGosIG1hZ25pdHVkZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZWZmZWN0c0NvdW50OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIF9sb29wXzEoaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWVyLmFkZFNwZWxsKHNwZWxsRm9ybSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb247XHJcbn0oRmVhdHVyZSkpO1xyXG5leHBvcnQgZGVmYXVsdCBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb247XHJcbiIsImV4cG9ydCB2YXIgTW9kc0xpc3Q7XHJcbihmdW5jdGlvbiAoTW9kc0xpc3QpIHtcclxuICAgIE1vZHNMaXN0W1wiSEVYX0FkdmVudHVyZXJFeHBlcmllbmNlXCJdID0gXCJIRVhfQWR2ZW50dXJlckV4cGVyaWVuY2UuZXNwXCI7XHJcbn0pKE1vZHNMaXN0IHx8IChNb2RzTGlzdCA9IHt9KSk7XHJcbiIsImV4cG9ydCB2YXIgVHJhY2tlZFN0YXQ7XHJcbihmdW5jdGlvbiAoVHJhY2tlZFN0YXQpIHtcclxuICAgIFRyYWNrZWRTdGF0W1wiTG9jYXRpb25zRGlzY292ZXJlZFwiXSA9IFwiTG9jYXRpb25zIERpc2NvdmVyZWRcIjtcclxuICAgIFRyYWNrZWRTdGF0W1wiRHVuZ2VvbnNDbGVhcmVkXCJdID0gXCJEdW5nZW9ucyBDbGVhcmVkXCI7XHJcbn0pKFRyYWNrZWRTdGF0IHx8IChUcmFja2VkU3RhdCA9IHt9KSk7XHJcbiIsImltcG9ydCBHYW1lQ29udGV4dCBmcm9tIFwiLi4vY29yZS9nYW1lQ29udGV4dFwiO1xyXG52YXIgR2xvYmFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gR2xvYmFsKCkge1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdsb2JhbCwgXCJDb250ZXh0XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgR2xvYmFsLl9jb250ZXh0ID0gbmV3IEdhbWVDb250ZXh0KCk7XHJcbiAgICByZXR1cm4gR2xvYmFsO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBHbG9iYWw7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gc2t5cmltUGxhdGZvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG9uLCBvbmNlLCBwcmludENvbnNvbGUgfSBmcm9tIFwic2t5cmltUGxhdGZvcm1cIjtcclxuaW1wb3J0IE1vZERhdGEgZnJvbSBcIi4vbWV0YS9tb2REYXRhXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IE1vZHNMaXN0IH0gZnJvbSBcIi4vbW9kcy9tb2RzTGlzdC5lbnVtXCI7XHJcbmltcG9ydCBTdGF0Qm9vc3RQZXJEaXNjb3ZlcmVkTG9jYXRpb24gZnJvbSBcIi4vbW9kcy9IRVhfQWR2ZW50dXJlckV4cGVyaWVuY2UvZmVhdHVyZXMvc3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uXCI7XHJcbmltcG9ydCBBZHZlbnR1cmVyRXhwaXJpZW5jZURhdGEgZnJvbSBcIi4vbW9kcy9IRVhfQWR2ZW50dXJlckV4cGVyaWVuY2UvZGF0YS9hZHZlbnR1cmVyRXhwaXJpZW5jZURhdGFcIjtcclxudmFyIGNvbnRleHQgPSBHbG9iYWwuQ29udGV4dDtcclxub25jZShcInNreXJpbUxvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmludENvbnNvbGUoXCJcIi5jb25jYXQoTW9kRGF0YS5QTFVHSU5fTkFNRSkpO1xyXG4gICAgcHJpbnRDb25zb2xlKFwiVmVyc2lvbiBcIi5jb25jYXQoTW9kRGF0YS5WRVJTSU9OKSk7XHJcbn0pO1xyXG5vbihcIm5ld0dhbWVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgcHJpbnRDb25zb2xlKFwiTmV3R2FtZVwiKTtcclxuICAgIG9uY2UoXCJ1cGRhdGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHN0YXJ0KCk7XHJcbiAgICB9KTtcclxufSk7XHJcbm9uKFwibG9hZEdhbWVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgcHJpbnRDb25zb2xlKFwiTG9hZEdhbWVcIik7XHJcbiAgICBzdGFydCgpO1xyXG59KTtcclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBjb250ZXh0LlJlc2V0KCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1vZERhdGEuUkVRVUlSRU1FTlRTLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG1vZE5hbWUgPSBNb2REYXRhLlJFUVVJUkVNRU5UU1tpXTtcclxuICAgICAgICBjb250ZXh0LlJlZ2lzdGVyTW9kKG1vZE5hbWUpO1xyXG4gICAgfVxyXG4gICAgdmFyIG1vZCA9IGNvbnRleHQuR2V0TW9kKE1vZHNMaXN0LkhFWF9BZHZlbnR1cmVyRXhwZXJpZW5jZSk7XHJcbiAgICB2YXIgbW9kQXNzZXRzID0gQWR2ZW50dXJlckV4cGlyaWVuY2VEYXRhLkFsbEFzc2V0cztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kQXNzZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGFzc2V0ID0gbW9kQXNzZXRzW2ldO1xyXG4gICAgICAgIG1vZC5SZWdpc3RlckFzc2V0KGFzc2V0LmhleElkLCBhc3NldC5uYW1lKTtcclxuICAgIH1cclxuICAgIGNvbnRleHQuRW5hYmxlRmVhdHVyZShuZXcgU3RhdEJvb3N0UGVyRGlzY292ZXJlZExvY2F0aW9uKCkpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==