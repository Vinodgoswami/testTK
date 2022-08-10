window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  APAspectRatioFitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3130bJk9hpJlZHdw9EpUFH/", "APAspectRatioFitter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.APAspectRatioFitter = exports.ON_SPRITE_FRAME_CHANGED = exports.APAspectRatioFitType = void 0;
    var APAspectRatioFitType;
    (function(APAspectRatioFitType) {
      APAspectRatioFitType[APAspectRatioFitType["None"] = 0] = "None";
      APAspectRatioFitType[APAspectRatioFitType["FitVertical"] = 1] = "FitVertical";
      APAspectRatioFitType[APAspectRatioFitType["FitHorizontal"] = 2] = "FitHorizontal";
      APAspectRatioFitType[APAspectRatioFitType["Envelope"] = 3] = "Envelope";
      APAspectRatioFitType[APAspectRatioFitType["FitInside"] = 4] = "FitInside";
      APAspectRatioFitType[APAspectRatioFitType["Stretch"] = 5] = "Stretch";
    })(APAspectRatioFitType = exports.APAspectRatioFitType || (exports.APAspectRatioFitType = {}));
    exports.ON_SPRITE_FRAME_CHANGED = "OnSpriteFrameChanged";
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
    var APAspectRatioFitter = function(_super) {
      __extends(APAspectRatioFitter, _super);
      function APAspectRatioFitter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this._fitMode = APAspectRatioFitType.Envelope;
        _this.editorFocus = false;
        return _this;
      }
      Object.defineProperty(APAspectRatioFitter.prototype, "fitMode", {
        get: function() {
          return this._fitMode;
        },
        set: function(value) {
          this._fitMode = value;
          this.onSizeChanged();
        },
        enumerable: false,
        configurable: true
      });
      APAspectRatioFitter.prototype.onLoad = function() {
        false;
        this.onSizeChanged();
        this.node.parent.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, this);
        this.node.on(exports.ON_SPRITE_FRAME_CHANGED, this.onSizeChanged, this);
      };
      APAspectRatioFitter.prototype.onDestroy = function() {
        if (cc.isValid(this.node, true)) {
          this.node.parent.off(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, this);
          this.node.off(exports.ON_SPRITE_FRAME_CHANGED, this.onSizeChanged, this);
        }
      };
      APAspectRatioFitter.prototype.onFocusInEditor = function() {
        this.editorFocus = true;
      };
      APAspectRatioFitter.prototype.onLostFocusInEditor = function() {
        this.editorFocus = false;
      };
      APAspectRatioFitter.prototype.update = function(dt) {
        this.editorFocus && this.onSizeChanged();
      };
      APAspectRatioFitter.prototype.onSizeChanged = function() {
        if (null === this.sprite) return;
        var spriteSize = this.sprite.spriteFrame.getOriginalSize();
        if (this.sprite.trim) {
          var _rect = this.sprite.spriteFrame.getRect();
          spriteSize = new cc.Size(_rect.width, _rect.height);
        }
        var widthFactor = this.node.parent.width / spriteSize.width;
        var heightFactor = this.node.parent.height / spriteSize.height;
        switch (this.fitMode) {
         case APAspectRatioFitType.Envelope:
          var multFactor = Math.max(widthFactor, heightFactor);
          this.node.width = spriteSize.width * multFactor;
          this.node.height = spriteSize.height * multFactor;
          break;

         case APAspectRatioFitType.FitVertical:
          this.node.height = this.node.parent.height;
          this.node.width = spriteSize.width * heightFactor;
          break;

         case APAspectRatioFitType.FitHorizontal:
          this.node.width = this.node.parent.width;
          this.node.height = spriteSize.height * widthFactor;
          break;

         case APAspectRatioFitType.FitInside:
          var multFactor = Math.min(widthFactor, heightFactor);
          this.node.width = spriteSize.width * multFactor;
          this.node.height = spriteSize.height * multFactor;
          break;

         case APAspectRatioFitType.Stretch:
          this.node.width = this.node.parent.width;
          this.node.height = this.node.parent.height;
        }
      };
      __decorate([ property(cc.Sprite) ], APAspectRatioFitter.prototype, "sprite", void 0);
      __decorate([ property({
        type: cc.Enum(APAspectRatioFitType),
        serializable: true,
        visible: false
      }) ], APAspectRatioFitter.prototype, "_fitMode", void 0);
      __decorate([ property({
        type: cc.Enum(APAspectRatioFitType)
      }) ], APAspectRatioFitter.prototype, "fitMode", null);
      APAspectRatioFitter = __decorate([ ccclass, menu("Custom UI/Aspect Ratio Fitter"), executeInEditMode ], APAspectRatioFitter);
      return APAspectRatioFitter;
    }(cc.Component);
    exports.APAspectRatioFitter = APAspectRatioFitter;
    cc._RF.pop();
  }, {} ],
  AdManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e200fT8DoxI9KWeonfEsvLj", "AdManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameManager_1 = require("./GameManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AdManager = function() {
      function AdManager() {
        this.ADS_ENABLED = true;
        this.interstitialAdsName = "gameover";
        this.rewardedAdsName = "rewarded";
        this.videoAdsName = "videoAds";
      }
      AdManager_1 = AdManager;
      AdManager.getInstance = function() {
        AdManager_1.instance || (AdManager_1.instance = new AdManager_1());
        return AdManager_1.instance;
      };
      AdManager.prototype.initialiseSDK = function() {
        this.ADS_ENABLED = GameManager_1.default.getInstance().getGameAdsStatus();
        cc.sys.isMobile && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "loadAds", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AdsManager", "loadAds"));
      };
      AdManager.prototype.setListener = function(callback) {};
      AdManager.prototype.showInterstitial = function() {
        cc.sys.isMobile && this.ADS_ENABLED && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "showInterstitialAd", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AdsManager", "showInterstitialAd"));
      };
      AdManager.prototype.showVidoeAd = function() {
        cc.sys.isMobile && this.ADS_ENABLED && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "showInterstitialVideoAd", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AdsManager", "showInterstitialVideoAd"));
      };
      AdManager.prototype.showRewardedVideoAds = function(type) {
        if (cc.sys.isMobile) if (cc.sys.os == cc.sys.OS_ANDROID) {
          cc.log("calling android method");
          jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager", "showRewardedAd", "(Ljava/lang/String;)V", type);
        } else cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AdsManager", "showRewardedAd:", type);
      };
      AdManager.prototype.updateAdsStatus = function(status) {
        this.ADS_ENABLED = status;
      };
      var AdManager_1;
      AdManager = AdManager_1 = __decorate([ ccclass ], AdManager);
      return AdManager;
    }();
    exports.default = AdManager;
    cc._RF.pop();
  }, {
    "./GameManager": "GameManager"
  } ],
  Base: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "090a2xeq5VATIlyqYlByEFO", "Base");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var AdManager_1 = require("../Manager/AdManager");
    var GameManager_1 = require("../Manager/GameManager");
    var IAPManager_1 = require("../Manager/IAPManager");
    var MessageCenter_1 = require("../Utilities/MessageCenter");
    var Utility_1 = require("../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Base = function(_super) {
      __extends(Base, _super);
      function Base() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hudPrefab = null;
        _this.footerPrefab = null;
        _this.hudLayer = null;
        _this.footerLayer = null;
        _this.popupPrefabTag = "popupTag";
        return _this;
      }
      Base.prototype.onLoad = function() {
        cc.debug.setDisplayStats(false);
        GameManager_1.default.getInstance().setIsIpad(this.node.width, this.node.height);
        this.registerEvents();
      };
      Base.prototype.registerEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_EVENT_CALLBACK, this.updateHUDLayer.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_OPEN_EVENT, this.chestPurchaseEvents.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, this.onEnergyPurchasedCB.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.OPEN_OUT_OF_ENERGY_POPUP, this.showOutOfEnergyPopup.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.SPECIAL_PURCHASE_EVENT, this.specialOfferPurchaseEventCallback.bind(this), this.node);
      };
      Base.prototype.unregisterEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_EVENT_CALLBACK, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_OPEN_EVENT, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.OPEN_OUT_OF_ENERGY_POPUP, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.SPECIAL_PURCHASE_EVENT, this.node);
      };
      Base.prototype.updateHUDLayer = function(data) {
        data.eventType == Constant_1.CHEST_REWARDS.COINS ? this.hudLayer.getComponent("HUD").updateInGameCoins(data.itemCount) : data.eventType == Constant_1.CHEST_REWARDS.GEMS && this.hudLayer.getComponent("HUD").updateInGameGems(data.itemCount);
      };
      Base.prototype.addHUDLayerWithData = function(title, backButtonStauts, sceneName) {
        this.hudLayer = cc.instantiate(this.hudPrefab);
        this.hudLayer.getComponent("HUD").updateSceneTitle(title);
        this.hudLayer.getComponent("HUD").updateBackButtonStatus(backButtonStauts);
        sceneName && this.hudLayer.getComponent("HUD").updateLastScene(sceneName);
        this.node.addChild(this.hudLayer);
      };
      Base.prototype.showRestoreButton = function() {
        this.hudLayer.getComponent("HUD").enableRestoreButton();
      };
      Base.prototype.onEnergyPurchasedCB = function(energyCount) {
        this.hudLayer && this.hudLayer.getComponent("HUD").updateInGameEnergy(energyCount);
      };
      Base.prototype.showSpecialPurchaseReward = function() {
        var specialPurchaseStats = GameManager_1.default.getInstance().getSpecialPurchaseStatus();
        if (specialPurchaseStats.PACK_1 && specialPurchaseStats.PACK_2) return;
        var ref = this;
        cc.resources.load("Prefab/SpecialPurchaseAlert", cc.Prefab, function(err, asset) {
          var type = Utility_1.Utility.getRandomNumber(9, 8);
          specialPurchaseStats.PACK_1 && !specialPurchaseStats.PACK_2 ? type = Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER : !specialPurchaseStats.PACK_1 && specialPurchaseStats.PACK_2 && (type = Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER);
          var prefabNode = cc.instantiate(asset);
          prefabNode.getComponent("SpecialOffer").subTowerType = type;
          prefabNode.getComponent("SpecialOffer").updateOfferDetails();
          prefabNode.name = ref.popupPrefabTag;
          ref.node.addChild(prefabNode);
        });
      };
      Base.prototype.removePopup = function() {
        var node = this.node.getChildByName(this.popupPrefabTag);
        node && node.removeFromParent(true);
      };
      Base.prototype.chestPurchaseEvents = function(rewardData) {
        var ref = this;
        if (rewardData.type == Constant_1.CHEST_REWARD_TYPE.RARE_CHEST && rewardData.cost) {
          var cost = parseInt(rewardData.cost);
          if (GameManager_1.default.getInstance().getGameGems() < cost) {
            this.showGeneralPopup(Constant_1.ALERT_TITLE.ALERT_MESSAGE, Constant_1.ALERT_MESSAGES.INSUFFICIENT_BALANCE);
            return;
          }
        }
        cc.resources.load("Prefab/ChestReward", cc.Prefab, function(err, asset) {
          var rewardType = rewardData.type;
          var prefabNode = cc.instantiate(asset);
          prefabNode.getComponent("ChestReward").setRewardType(rewardType);
          rewardData.cost && ref.hudLayer.getComponent("HUD").updateInGameGems(-rewardData.cost);
          ref.node.addChild(prefabNode);
        });
      };
      Base.prototype.addFooterLayer = function() {
        this.footerLayer = cc.instantiate(this.footerPrefab);
        this.node.addChild(this.footerLayer);
      };
      Base.prototype.onDestroy = function() {
        this.unregisterEvents();
      };
      Base.prototype.showItemPurchasePopup = function(data) {
        var ref = this;
        cc.resources.load("Prefab/itemPurchasePopup", cc.Prefab, function(err, asset) {
          var prefabNode = cc.instantiate(asset);
          prefabNode.getComponent("ItemPurcahsePopup").showPopup(data);
          ref.node.addChild(prefabNode);
        });
      };
      Base.prototype.showCoinsPurchasePopup = function(data) {
        var ref = this;
        cc.resources.load("Prefab/PurchaseConfirmationPopup", cc.Prefab, function(err, asset) {
          var prefabNode = cc.instantiate(asset);
          prefabNode.getComponent("PurchaseConfirmationPopup").showPopup(data);
          ref.node.addChild(prefabNode);
        });
      };
      Base.prototype.specialOfferPurchaseEventCallback = function(data) {
        this.showLoader();
        IAPManager_1.default.getInstance().purchaseProduct(data.purchaseID);
      };
      Base.prototype.specialOfferPurchaseConfirmation = function(purchaseID) {
        var data = GameManager_1.default.getInstance().getSpecialPurchaseStatus();
        if (purchaseID == Constant_1.IAP_PURCHASE_ID.SPECIAL_1) {
          GameManager_1.default.getInstance().setTowerLockedStatus(Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER, 1);
          data["PACK_1"] = true;
        } else if (purchaseID == Constant_1.IAP_PURCHASE_ID.SPECIAL_2) {
          GameManager_1.default.getInstance().setTowerLockedStatus(Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER, 1);
          data["PACK_2"] = true;
        }
        this.hudLayer.getComponent("HUD").updateInGameGems(600);
        this.hudLayer.getComponent("HUD").updateInGameCoins(2e3);
        this.hudLayer.getComponent("HUD").updateInGameEnergy(50);
        this.removePopup();
        AdManager_1.default.getInstance().updateAdsStatus(false);
        GameManager_1.default.getInstance().setSpecialPurchaseStatus(data);
        GameManager_1.default.getInstance().setGameAdsStatus("0");
      };
      Base.prototype.showGeneralPopup = function(title, message) {
        var ref = this;
        cc.resources.load("Prefab/GeneralPopup", cc.Prefab, function(err, asset) {
          var data = {
            title: title,
            message: message
          };
          var prefabNode = cc.instantiate(asset);
          prefabNode.getComponent("GeneralPopup").showPopup(data);
          ref.node.addChild(prefabNode);
        });
      };
      Base.prototype.showOutOfEnergyPopup = function() {
        var ref = this;
        cc.resources.load("Prefab/EnergyPurchaseAlert", cc.Prefab, function(err, asset) {
          var prefabNode = cc.instantiate(asset);
          ref.node.addChild(prefabNode);
        });
      };
      Base.prototype.loadEnemyIntroPrefab = function(type) {
        var ref = this;
        cc.resources.load("Prefab/EnemyIntroduction", cc.Prefab, function(err, asset) {
          var prefabNode = cc.instantiate(asset);
          prefabNode.getComponent("EnemyIntroduction").enemyType = type;
          prefabNode.getComponent("EnemyIntroduction").updateEnemyAndDesc();
          prefabNode.setPosition(new cc.Vec2(0, 0));
          prefabNode.getChildByName("Base").setContentSize(new cc.Size(ref.node.width, ref.node.height));
          ref.node.addChild(prefabNode, Number.MAX_SAFE_INTEGER);
        });
      };
      Base.prototype.showLoader = function() {
        cc.log("show loader");
        var ref = this;
        cc.resources.load("Prefab/Loader", cc.Prefab, function(err, asset) {
          var prefabNode = cc.instantiate(asset);
          prefabNode.name = "loaderNode";
          ref.node.addChild(prefabNode);
          ref.node.runAction(cc.sequence(cc.delayTime(120), cc.callFunc(ref.removeLoader, ref)));
        });
      };
      Base.prototype.removeLoader = function() {
        var loader = this.node.getChildByName("loaderNode");
        loader && loader.removeFromParent(true);
      };
      __decorate([ property(cc.Prefab) ], Base.prototype, "hudPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Base.prototype, "footerPrefab", void 0);
      Base = __decorate([ ccclass ], Base);
      return Base;
    }(cc.Component);
    exports.default = Base;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/AdManager": "AdManager",
    "../Manager/GameManager": "GameManager",
    "../Manager/IAPManager": "IAPManager",
    "../Utilities/MessageCenter": "MessageCenter",
    "../Utilities/Utility": "Utility"
  } ],
  Button: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3bcd0JwA7NEc68L10ypAhHm", "Button");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  CannonFireball: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30f18RKFI1CVqonyOovgDBu", "CannonFireball");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CannonFireBall = function(_super) {
      __extends(CannonFireBall, _super);
      function CannonFireBall() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.key = "0";
        _this.type = 0;
        _this.ballPath = [];
        _this.initialPosition = new cc.Vec2(0, 0);
        _this.currentPath = 0;
        _this.redBallSprite = null;
        _this.blueBallSprite = null;
        _this.greenBallSprite = null;
        _this.yellowBallSprite = null;
        _this.offset = null;
        _this.mapPath = null;
        _this.pathOffset = 0;
        return _this;
      }
      CannonFireBall.prototype.start = function() {
        this.initialPosition.x = this.node.position.x;
        this.initialPosition.y = this.node.position.y;
        this.node.runAction(cc.flipX(true));
      };
      CannonFireBall.prototype.updateCannonBallProperties = function(key, type, path, map, pathOffset) {
        this.key = key;
        this.type = type;
        this.currentPath = path;
        this.offset = map.node.getContentSize();
        this.getComponent(cc.Sprite).spriteFrame = this.getBallSpriteFrame();
        this.node.setScale(.6);
        this.mapPath = map.node;
        this.pathOffset = pathOffset;
      };
      CannonFireBall.prototype.getBallSpriteFrame = function() {
        var spriteFrame = this.blueBallSprite;
        this.type == Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? spriteFrame = this.greenBallSprite : this.type == Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED ? spriteFrame = this.redBallSprite : this.type == Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED && (spriteFrame = this.yellowBallSprite);
        return spriteFrame;
      };
      CannonFireBall.prototype.runFireballAnimation = function(path, pathData, initPos) {
        this.node.stopAllActions();
        this.ballPath = __spreadArrays(pathData);
        this.node.y = this.initialPosition.y;
        this.initialPosition = initPos;
        this.node.x = this.initialPosition.x;
        this.node.y = this.initialPosition.y;
        this.node.runAction(this.getFireballAction());
      };
      CannonFireBall.prototype.getFireballAction = function() {
        var action = null;
        var actions = [];
        var initialPosition = cc.v2(this.node.x, this.node.y);
        for (var counter = this.ballPath.length - 2; counter >= 0; counter--) {
          var speed = 350;
          var positionInWorldSpace = this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.ballPath[counter].x - .5 * this.offset.width, this.ballPath[counter].y - .5 * this.offset.height));
          var changedPosition = this.node.parent.convertToNodeSpaceAR(positionInWorldSpace);
          var distace = Math.sqrt(Math.pow(initialPosition.x - changedPosition.x, 2) + Math.pow(initialPosition.y - changedPosition.y, 2));
          var time = distace / speed;
          initialPosition.x = changedPosition.x;
          initialPosition.y = changedPosition.y;
          counter > 0 && 1 == this.ballPath[counter + 1].pathFromCave && (time = 0);
          var moveAction = cc.moveTo(time, changedPosition.x, changedPosition.y);
          actions.push(moveAction);
        }
        action = cc.sequence(__spreadArrays(actions, [ cc.callFunc(this.informParentAboutDeletion, this), cc.delayTime(.1), cc.removeSelf() ]));
        return action;
      };
      CannonFireBall.prototype.informParentAboutDeletion = function() {
        this.node.parent.parent.getComponent("GamePlay").cannonBallRemovedFromGamePlay(this.key);
      };
      CannonFireBall.prototype.playBlastAnimation = function() {
        var animationClips = this.getComponent(cc.Animation);
        this.type == Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? animationClips.play("GreenBlast") : this.type == Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED ? animationClips.play("RedBlast") : this.type == Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED ? animationClips.play("YellowBlast") : animationClips.play("BlueBlast");
      };
      CannonFireBall.prototype.getCurrentPath = function() {
        return this.currentPath;
      };
      CannonFireBall.prototype.removeBall = function() {
        this.node.removeFromParent(true);
      };
      __decorate([ property(cc.SpriteFrame) ], CannonFireBall.prototype, "redBallSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], CannonFireBall.prototype, "blueBallSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], CannonFireBall.prototype, "greenBallSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], CannonFireBall.prototype, "yellowBallSprite", void 0);
      CannonFireBall = __decorate([ ccclass ], CannonFireBall);
      return CannonFireBall;
    }(cc.Component);
    exports.default = CannonFireBall;
    cc._RF.pop();
  }, {
    "./Constant": "Constant"
  } ],
  Cannon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed5f1eCVt9Kl5TSSdmXkKcm", "Cannon");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Cannon = function(_super) {
      __extends(Cannon, _super);
      function Cannon() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cannonPath_1 = null;
        _this.cannonPath_3 = null;
        _this.towerAnimationName = "";
        _this.direction = 1;
        _this.requestForPathChange = false;
        _this.requestedPath = 0;
        _this.requestedDirection = 0;
        _this.isAnimationPlaying = false;
        return _this;
      }
      Cannon.prototype.onLoad = function() {};
      Cannon.prototype.start = function() {};
      Cannon.prototype.updateProperties = function(direction, selectedPath) {
        if (this.isAnimationPlaying) {
          this.requestForPathChange = true;
          this.requestedDirection = direction;
          this.requestedPath = selectedPath;
        } else {
          this.direction = direction;
          this.updateCannonPosition();
        }
      };
      Cannon.prototype.playAnimation = function() {
        this.requestForPathChange && this.animationCompeletd();
        var towerAnimation = this.node.parent.getChildByName("Tower").getChildByName("Animation");
        towerAnimation && towerAnimation.getComponent(cc.Animation).play(this.towerAnimationName);
        var animationClips = this.getComponent(cc.Animation);
        animationClips.on("finished", this.animationCompeletd, this);
        this.isAnimationPlaying = true;
        if (Constant_1.PATH_SELECTED.PATH_1_SELECTED == this.direction) animationClips.play(this.node.parent.name + "CannonFirePath_1"); else if (Constant_1.PATH_SELECTED.PATH_2_SELECTED == this.direction) {
          this.node.scaleX = -1;
          animationClips.play(this.node.parent.name + "CannonFirePath_1");
        } else if (Constant_1.PATH_SELECTED.PATH_3_SELECTED == this.direction) animationClips.play(this.node.parent.name + "CannonFirePath_3"); else if (Constant_1.PATH_SELECTED.PATH_4_SELECTED == this.direction) {
          this.node.scaleX = -1;
          animationClips.play(this.node.parent.name + "CannonFirePath_3");
        } else this.isAnimationPlaying = false;
      };
      Cannon.prototype.updateCannonPosition = function() {
        switch (this.node.parent.name) {
         case "GreenTankTower":
         case "KhakiTankTower":
          if (Constant_1.PATH_SELECTED.PATH_1_SELECTED == this.direction || Constant_1.PATH_SELECTED.PATH_2_SELECTED == this.direction) {
            this.node.anchorX = .6;
            this.node.anchorY = .7;
          } else if (Constant_1.PATH_SELECTED.PATH_3_SELECTED == this.direction || Constant_1.PATH_SELECTED.PATH_4_SELECTED == this.direction) {
            this.node.anchorX = .4;
            this.node.anchorY = .5;
          }
          break;

         case "RedBugTower":
         case "PinkBugTower":
          if (Constant_1.PATH_SELECTED.PATH_1_SELECTED == this.direction || Constant_1.PATH_SELECTED.PATH_2_SELECTED == this.direction) {
            this.node.anchorX = .6;
            this.node.anchorY = .7;
          } else if (Constant_1.PATH_SELECTED.PATH_3_SELECTED == this.direction || Constant_1.PATH_SELECTED.PATH_4_SELECTED == this.direction) {
            this.node.anchorX = .3;
            this.node.anchorY = .6;
          }
          break;

         case "CastleTower":
          if (Constant_1.PATH_SELECTED.PATH_1_SELECTED == this.direction || Constant_1.PATH_SELECTED.PATH_2_SELECTED == this.direction) {
            this.node.anchorX = .65;
            this.node.anchorY = .5;
          } else if (Constant_1.PATH_SELECTED.PATH_3_SELECTED == this.direction || Constant_1.PATH_SELECTED.PATH_4_SELECTED == this.direction) {
            this.node.anchorX = .4;
            this.node.anchorY = .4;
          }
        }
        this.node.scaleX = 1;
        var spriteFrame = this.cannonPath_1;
        if (Constant_1.PATH_SELECTED.PATH_2_SELECTED == this.direction) {
          this.node.scaleX = -1;
          spriteFrame = this.cannonPath_1;
        } else if (Constant_1.PATH_SELECTED.PATH_3_SELECTED == this.direction) {
          this.node.scaleX = 1;
          spriteFrame = this.cannonPath_3;
        } else if (Constant_1.PATH_SELECTED.PATH_4_SELECTED == this.direction) {
          this.node.scaleX = -1;
          spriteFrame = this.cannonPath_3;
        }
        this.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      };
      Cannon.prototype.animationCompeletd = function() {
        this.isAnimationPlaying = false;
        if (this.requestForPathChange) {
          this.node.parent.parent.parent.getComponent("GamePlay").updatePathInfo(this.requestedPath);
          this.updateProperties(this.requestedDirection, this.requestedPath);
          this.requestedPath = 0;
          this.requestForPathChange = false;
        }
      };
      __decorate([ property(cc.SpriteFrame) ], Cannon.prototype, "cannonPath_1", void 0);
      __decorate([ property(cc.SpriteFrame) ], Cannon.prototype, "cannonPath_3", void 0);
      Cannon = __decorate([ ccclass ], Cannon);
      return Cannon;
    }(cc.Component);
    exports.default = Cannon;
    cc._RF.pop();
  }, {
    "./Constant": "Constant"
  } ],
  Castle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f906cET/ilJIrzG+TXBbzmd", "Castle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Castle = function(_super) {
      __extends(Castle, _super);
      function Castle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fadeCastles = [];
        _this.castles = [];
        _this.item = null;
        _this.comingSoon = null;
        _this.currentSelectedCastle = Constant_1.CASTLE_TYPE.GRASS_CASTLE;
        _this.castleType = Constant_1.CASTLE_TYPE.GRASS_CASTLE;
        return _this;
      }
      Castle.prototype.onLoad = function() {};
      Castle.prototype.start = function() {};
      Castle.prototype.updateCastleInfo = function(castleType) {
        this.castleType = castleType;
        this.comingSoon.node.active = false;
        if (castleType == Constant_1.CASTLE_TYPE.GRASS_CASTLE) this.item.spriteFrame = this.castles[this.castleType]; else {
          this.comingSoon.node.active = true;
          this.item.spriteFrame = this.fadeCastles[this.castleType];
        }
      };
      __decorate([ property(cc.SpriteFrame) ], Castle.prototype, "fadeCastles", void 0);
      __decorate([ property(cc.SpriteFrame) ], Castle.prototype, "castles", void 0);
      __decorate([ property(cc.Sprite) ], Castle.prototype, "item", void 0);
      __decorate([ property(cc.Label) ], Castle.prototype, "comingSoon", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.CASTLE_TYPE),
        visible: function() {
          this.currentPurchaseData = this.castleType;
          this.updateCastleInfo(this.currentPurchaseData);
          return true;
        }
      }) ], Castle.prototype, "castleType", void 0);
      Castle = __decorate([ ccclass ], Castle);
      return Castle;
    }(cc.Component);
    exports.default = Castle;
    cc._RF.pop();
  }, {
    "../Constant": "Constant"
  } ],
  Challenges: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "711b1qzFctLNL8z9ZuLt7xk", "Challenges");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base_1 = require("./Base/Base");
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Challenges = function(_super) {
      __extends(Challenges, _super);
      function Challenges() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Challenges.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        GameManager_1.default.getInstance().setCurrentScene(Constant_1.SCENE_TYPE.CHALLENGE_SCENE);
        this.addHUDLayerWithData("C H A L L E N G E S", true, "MainMenu");
      };
      Challenges.prototype.start = function() {};
      Challenges.prototype.scrollviewCallback = function(scrollview) {};
      Challenges = __decorate([ ccclass ], Challenges);
      return Challenges;
    }(Base_1.default);
    exports.default = Challenges;
    cc._RF.pop();
  }, {
    "./Base/Base": "Base",
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager"
  } ],
  ChestReward: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e0607jSxyBHZbMjrwpCzG7n", "ChestReward");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var GameManager_1 = require("../Manager/GameManager");
    var SoundManager_1 = require("../Manager/SoundManager");
    var MessageCenter_1 = require("../Utilities/MessageCenter");
    var Utility_1 = require("../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChestReward = function(_super) {
      __extends(ChestReward, _super);
      function ChestReward() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rewardSounds = [];
        _this.openChestSpriteFrame = [];
        _this.closedChestSpriteFrame = [];
        _this.rewardItems = [];
        _this.chestRewardAnimItem = null;
        _this.item = null;
        _this.chestItem = null;
        _this.countLabel = null;
        _this.rewardAnimNode = null;
        _this.rewardNode = null;
        _this.rewardType = Constant_1.CHEST_REWARD_TYPE.PLAIN_CHEST;
        _this.itemCount = 1;
        _this.minRewardIndex = 0;
        _this.maxRewardIndex = 5;
        _this.rewardIndex = 0;
        return _this;
      }
      ChestReward.prototype.onLoad = function() {
        this.rewardNode.active = false;
        this.rewardAnimNode.active = true;
        setTimeout(this.enableReward.bind(this), 3e3);
      };
      ChestReward.prototype.enableReward = function() {
        SoundManager_1.default.getInstance().playEffect(this.rewardSounds[0], false, 1);
        this.rewardNode.active = true;
        this.rewardAnimNode.active = false;
      };
      ChestReward.prototype.setRewardType = function(rewardType) {
        this.rewardType = rewardType;
        this.minRewardIndex = this.rewardType == Constant_1.CHEST_REWARD_TYPE.PLAIN_CHEST ? Constant_1.CHEST_REWARDS.MAGIC_HEART : Constant_1.CHEST_REWARDS.COINS;
        this.maxRewardIndex = this.rewardType == Constant_1.CHEST_REWARD_TYPE.PLAIN_CHEST ? Constant_1.CHEST_REWARDS.GEMS : Constant_1.CHEST_REWARDS.MONKEY_CANNON;
        this.rewardIndex = Utility_1.Utility.getRandomNumber(this.maxRewardIndex, this.minRewardIndex);
        this.updateChestReward();
        this.setItemCount();
      };
      ChestReward.prototype.start = function() {};
      ChestReward.prototype.onClaimRewardCB = function(event, customData) {
        SoundManager_1.default.getInstance().playEffect(this.rewardSounds[1], false, 1);
        this.assignReward(this.rewardIndex);
        this.closePopup();
      };
      ChestReward.prototype.closePopup = function() {
        this.node.removeFromParent(true);
      };
      ChestReward.prototype.updateChestReward = function() {
        this.chestRewardAnimItem.spriteFrame = this.closedChestSpriteFrame[this.rewardType];
        this.chestItem.spriteFrame = this.openChestSpriteFrame[this.rewardType];
        this.item.spriteFrame = this.rewardItems[this.rewardIndex];
      };
      ChestReward.prototype.assignReward = function(index) {
        switch (index) {
         case Constant_1.CHEST_REWARDS.MAGIC_HEART:
          GameManager_1.default.getInstance().incrementInGameHeartItem(this.itemCount);
          break;

         case Constant_1.CHEST_REWARDS.LAND_MINES:
          GameManager_1.default.getInstance().incrementInGameLandMineItem(this.itemCount);
          break;

         case Constant_1.CHEST_REWARDS.COINS:
          var itemData = {
            eventType: Constant_1.CHEST_REWARDS.COINS,
            itemCount: this.itemCount
          };
          MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_EVENT_CALLBACK, itemData);
          break;

         case Constant_1.CHEST_REWARDS.GEMS:
          var itemData = {
            eventType: Constant_1.CHEST_REWARDS.GEMS,
            itemCount: this.itemCount
          };
          MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_EVENT_CALLBACK, itemData);
          break;

         case Constant_1.CHEST_REWARDS.RAINBOW_DRAGON:
          GameManager_1.default.getInstance().incrementInGameDragonItem(this.itemCount);
          break;

         case Constant_1.CHEST_REWARDS.MONKEY_CANNON:
          GameManager_1.default.getInstance().incrementInGameMonkeyCannonItem(this.itemCount);
        }
      };
      ChestReward.prototype.setItemCount = function() {
        switch (this.rewardIndex) {
         case Constant_1.CHEST_REWARDS.MAGIC_HEART:
         case Constant_1.CHEST_REWARDS.LAND_MINES:
          this.itemCount = Utility_1.Utility.getRandomNumber(2, 1);
          break;

         case Constant_1.CHEST_REWARDS.COINS:
          var maxCount = this.rewardType == Constant_1.CHEST_REWARD_TYPE.PLAIN_CHEST ? 5 : 10;
          var minCount = this.rewardType == Constant_1.CHEST_REWARD_TYPE.RARE_CHEST ? 1 : 4;
          this.itemCount = 50 * Utility_1.Utility.getRandomNumber(minCount, maxCount);
          break;

         case Constant_1.CHEST_REWARDS.GEMS:
          var maxCount = this.rewardType == Constant_1.CHEST_REWARD_TYPE.PLAIN_CHEST ? 2 : 4;
          var minCount = this.rewardType == Constant_1.CHEST_REWARD_TYPE.RARE_CHEST ? 1 : 2;
          this.itemCount = 5 * Utility_1.Utility.getRandomNumber(minCount, maxCount);
          break;

         case Constant_1.CHEST_REWARDS.RAINBOW_DRAGON:
         case Constant_1.CHEST_REWARDS.MONKEY_CANNON:
          this.itemCount = 1;
        }
        this.countLabel.string = this.itemCount.toString();
      };
      __decorate([ property(cc.AudioClip) ], ChestReward.prototype, "rewardSounds", void 0);
      __decorate([ property(cc.SpriteFrame) ], ChestReward.prototype, "openChestSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], ChestReward.prototype, "closedChestSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], ChestReward.prototype, "rewardItems", void 0);
      __decorate([ property(cc.Sprite) ], ChestReward.prototype, "chestRewardAnimItem", void 0);
      __decorate([ property(cc.Sprite) ], ChestReward.prototype, "item", void 0);
      __decorate([ property(cc.Sprite) ], ChestReward.prototype, "chestItem", void 0);
      __decorate([ property(cc.Label) ], ChestReward.prototype, "countLabel", void 0);
      __decorate([ property(cc.Node) ], ChestReward.prototype, "rewardAnimNode", void 0);
      __decorate([ property(cc.Node) ], ChestReward.prototype, "rewardNode", void 0);
      ChestReward = __decorate([ ccclass ], ChestReward);
      return ChestReward;
    }(cc.Component);
    exports.default = ChestReward;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/GameManager": "GameManager",
    "../Manager/SoundManager": "SoundManager",
    "../Utilities/MessageCenter": "MessageCenter",
    "../Utilities/Utility": "Utility"
  } ],
  CoinsPanelItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c6ac0tqenZP8oyCsQrLmR/E", "CoinsPanelItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var CoinsPanelItem = function(_super) {
      __extends(CoinsPanelItem, _super);
      function CoinsPanelItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.coinsCount = 1500;
        _this.gemsCount = 5;
        _this.coinLabel = null;
        _this.gemsLabel = null;
        _this.icon = null;
        return _this;
      }
      CoinsPanelItem.prototype.onLoad = function() {
        this.coinLabel.string = this.coinsCount.toString();
        this.gemsLabel.string = this.gemsCount.toString();
      };
      CoinsPanelItem.prototype.onBtnCallback = function(event, customData) {
        var data = {
          coins: this.coinsCount,
          gems: this.gemsCount,
          frame: this.icon.spriteFrame
        };
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.COINS_PURCHASED_EVENT, data);
      };
      __decorate([ property(cc.Integer) ], CoinsPanelItem.prototype, "coinsCount", void 0);
      __decorate([ property(cc.Integer) ], CoinsPanelItem.prototype, "gemsCount", void 0);
      __decorate([ property(cc.Label) ], CoinsPanelItem.prototype, "coinLabel", void 0);
      __decorate([ property(cc.Label) ], CoinsPanelItem.prototype, "gemsLabel", void 0);
      __decorate([ property(cc.Sprite) ], CoinsPanelItem.prototype, "icon", void 0);
      CoinsPanelItem = __decorate([ ccclass ], CoinsPanelItem);
      return CoinsPanelItem;
    }(cc.Component);
    exports.default = CoinsPanelItem;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter"
  } ],
  Constant: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73b11Wa/f9HboiNvO/+bYYe", "Constant");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SCENE_TYPE = exports.ENEMY_TYPE = exports.CHEST_REWARDS = exports.CHEST_REWARD_TYPE = exports.IAP_PURCHASE_ID = exports.TOWER_ARRANGEMENT = exports.ITEM_COST = exports.TOWER_COST = exports.CASTLE_TYPE = exports.TOWER_SUB_TYPE = exports.TOWER_TYPE = exports.ITEM_LAYER_TYPE = exports.SHOP_SCENE_LAYER_TYPE = exports.ALERT_TITLE = exports.ALERT_MESSAGES = exports.SHOW_POPUP_TYPE = exports.MESSAGE_PASSING_EVENTS = exports.constant = exports.LIGHTING_COLOR = exports.LIGHTING_SELECTED = exports.KNIGHT_COLOR = exports.DIFFICULTY_SELECTED = exports.PATH_SELECTED = exports.KNIGHT_SELECTED = void 0;
    var KNIGHT_SELECTED;
    (function(KNIGHT_SELECTED) {
      KNIGHT_SELECTED[KNIGHT_SELECTED["RED_KNIGHT_SELECTED"] = 1] = "RED_KNIGHT_SELECTED";
      KNIGHT_SELECTED[KNIGHT_SELECTED["YELLOW_KNIGHT_SELECTED"] = 2] = "YELLOW_KNIGHT_SELECTED";
      KNIGHT_SELECTED[KNIGHT_SELECTED["GREEN_KNIGHT_SELECTED"] = 3] = "GREEN_KNIGHT_SELECTED";
      KNIGHT_SELECTED[KNIGHT_SELECTED["BLUE_KNIGHT_SELECTED"] = 4] = "BLUE_KNIGHT_SELECTED";
    })(KNIGHT_SELECTED = exports.KNIGHT_SELECTED || (exports.KNIGHT_SELECTED = {}));
    var PATH_SELECTED;
    (function(PATH_SELECTED) {
      PATH_SELECTED[PATH_SELECTED["PATH_1_SELECTED"] = 1] = "PATH_1_SELECTED";
      PATH_SELECTED[PATH_SELECTED["PATH_2_SELECTED"] = 2] = "PATH_2_SELECTED";
      PATH_SELECTED[PATH_SELECTED["PATH_3_SELECTED"] = 3] = "PATH_3_SELECTED";
      PATH_SELECTED[PATH_SELECTED["PATH_4_SELECTED"] = 4] = "PATH_4_SELECTED";
    })(PATH_SELECTED = exports.PATH_SELECTED || (exports.PATH_SELECTED = {}));
    var DIFFICULTY_SELECTED;
    (function(DIFFICULTY_SELECTED) {
      DIFFICULTY_SELECTED[DIFFICULTY_SELECTED["LOCKED"] = 0] = "LOCKED";
      DIFFICULTY_SELECTED[DIFFICULTY_SELECTED["NORMAL"] = 1] = "NORMAL";
      DIFFICULTY_SELECTED[DIFFICULTY_SELECTED["HARD"] = 2] = "HARD";
    })(DIFFICULTY_SELECTED = exports.DIFFICULTY_SELECTED || (exports.DIFFICULTY_SELECTED = {}));
    exports.KNIGHT_COLOR = {
      GREEN: cc.color(59, 194, 26, 255),
      YELLOW: cc.color(238, 195, 36, 255),
      RED: cc.color(220, 20, 50, 255),
      BLUE: cc.color(40, 80, 255, 255)
    };
    exports.LIGHTING_SELECTED = [ "", "Red", "Green", "Blue", "Purple" ];
    exports.LIGHTING_COLOR = {
      Green: cc.color(0, 200, 31, 255),
      Blue: cc.color(71, 140, 208, 255),
      Purple: cc.color(134, 9, 235, 255),
      Red: cc.color(192, 23, 65, 255)
    };
    exports.constant = {
      STREAK_LEVEL_UP: 20
    };
    exports.MESSAGE_PASSING_EVENTS = {
      COINS_PURCHASED_EVENT: "COINS_PURCHASED",
      GEMS_PURCHASED_EVENT: "GEMS_PURCHASED",
      INSUFFICIENT_GEMS_EVENTS: "INSUFFICIENT_GEMS",
      ITEM_SELECTED_EVENTS: "ITEM_SELECTED_EVENTS",
      TOWER_SELECTED_EVENTS: "TOWER_SELECTED_EVENTS",
      TOWER_UPDATED_COST_EVENTS: "TOWER_UPDATED_COST",
      TOWER_PURCHASE_EVENTS: "TOWER_PURCHASE_EVENTS",
      ITEM_PURCHASE_EVENTS: "ITEM_PURCHASED_EVENTS",
      ITEM_QUANTITY_CHANGED_EVENT: "ITEM_QUANTITY_CHANGED",
      SPECIAL_PURCHASE_EVENT: "SPECIAL_PURCHASE_EVENT",
      CHEST_OPEN_EVENT: "CHEST_OPEN_EVENT",
      CHEST_EVENT_CALLBACK: "CHEST_EVENT_CALLBACK",
      ENERGY_EVENT_CALLBACK: "ENERGY_EVENT_ADS_CALLBACK",
      OPEN_OUT_OF_ENERGY_POPUP: "OPEN_OUT_OF_ENERGY_POPUP",
      ENEMY_TUTORIAL_OVER: "ENEMY_TUTORIAL_OVER",
      CLOSE_EVENT_CALLBACK: "CLOSE_EVENT_CALLBACK",
      GAME_PLAY_LOADING: "GAME_PLAY_LOADING"
    };
    exports.SHOW_POPUP_TYPE = {
      PURCHASE_GEMS_POPUP: 1,
      PURCHASE_COINS_POPUP: 2,
      SPECIAL_PURCHASE_POPUP: 3,
      NORMAL_ALERT_MESSAGE: 4,
      ITEM_PURCHASE_POPUP: 5,
      TOWER_PURCHASE_POPUP: 6
    };
    exports.ALERT_MESSAGES = {
      INSUFFICIENT_BALANCE: "In Sufficient Balance",
      SOMETHING_WENT_WRONG: "Something went wrong, please try again",
      COINS_PURCHASE_SUCCESSFUL: "Coins Credited Successfully.",
      GEMS_PURCHASE_SUCCESSFUL: "Gems credited to your account",
      TOWER_CREDITED_SUCCESSFUL: "Tower Unlocked Successfully.",
      ITEM_CREDITED_SUCCESSFUL: "Item Unlocked Successfully."
    };
    exports.ALERT_TITLE = {
      ALERT_MESSAGE: "Alert!",
      PURCHASE_SUCCESS_MESSAGE: "PURCHASE  SUCCESSFUL",
      PURCHASE_UNSUCCESS_MESSAGE: "PURCHASE  UNSUCCESSFUL",
      CONFIRM_PURCHASE_MESSAGE: "CONFIRM PURCHASE"
    };
    var SHOP_SCENE_LAYER_TYPE;
    (function(SHOP_SCENE_LAYER_TYPE) {
      SHOP_SCENE_LAYER_TYPE[SHOP_SCENE_LAYER_TYPE["COINS_AND_GEMS_LAYER"] = 0] = "COINS_AND_GEMS_LAYER";
      SHOP_SCENE_LAYER_TYPE[SHOP_SCENE_LAYER_TYPE["TOWERS_LAYER"] = 1] = "TOWERS_LAYER";
      SHOP_SCENE_LAYER_TYPE[SHOP_SCENE_LAYER_TYPE["ITEMS_LAYER"] = 2] = "ITEMS_LAYER";
      SHOP_SCENE_LAYER_TYPE[SHOP_SCENE_LAYER_TYPE["SPECIAL_OFFER_LAYER"] = 3] = "SPECIAL_OFFER_LAYER";
    })(SHOP_SCENE_LAYER_TYPE = exports.SHOP_SCENE_LAYER_TYPE || (exports.SHOP_SCENE_LAYER_TYPE = {}));
    var ITEM_LAYER_TYPE;
    (function(ITEM_LAYER_TYPE) {
      ITEM_LAYER_TYPE[ITEM_LAYER_TYPE["LAND_MINE"] = 0] = "LAND_MINE";
      ITEM_LAYER_TYPE[ITEM_LAYER_TYPE["HEART"] = 1] = "HEART";
      ITEM_LAYER_TYPE[ITEM_LAYER_TYPE["MONKEY_CANNON"] = 2] = "MONKEY_CANNON";
      ITEM_LAYER_TYPE[ITEM_LAYER_TYPE["DRAGON_FIRE"] = 3] = "DRAGON_FIRE";
    })(ITEM_LAYER_TYPE = exports.ITEM_LAYER_TYPE || (exports.ITEM_LAYER_TYPE = {}));
    var TOWER_TYPE;
    (function(TOWER_TYPE) {
      TOWER_TYPE[TOWER_TYPE["NORMAL_TOWER"] = 0] = "NORMAL_TOWER";
      TOWER_TYPE[TOWER_TYPE["TANK_TOWER"] = 1] = "TANK_TOWER";
      TOWER_TYPE[TOWER_TYPE["DRAGON_TOWER"] = 2] = "DRAGON_TOWER";
      TOWER_TYPE[TOWER_TYPE["BUG_TOWER"] = 3] = "BUG_TOWER";
      TOWER_TYPE[TOWER_TYPE["ALL"] = 4] = "ALL";
    })(TOWER_TYPE = exports.TOWER_TYPE || (exports.TOWER_TYPE = {}));
    var TOWER_SUB_TYPE;
    (function(TOWER_SUB_TYPE) {
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["RED_TOWER"] = 0] = "RED_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["BLUE_TOWER"] = 1] = "BLUE_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["PURPLE_TOWER"] = 2] = "PURPLE_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["GREEN_TOWER"] = 3] = "GREEN_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["PLAIN_TANK_TOWER"] = 4] = "PLAIN_TANK_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["CREATIVE_TANK_TOWER"] = 5] = "CREATIVE_TANK_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["PLAIN_DRAGON_TOWER"] = 6] = "PLAIN_DRAGON_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["PLAIN_BUG_TOWER"] = 7] = "PLAIN_BUG_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["CREATIVE_DRAGON_TOWER"] = 8] = "CREATIVE_DRAGON_TOWER";
      TOWER_SUB_TYPE[TOWER_SUB_TYPE["CREATIVE_BUG_TOWER"] = 9] = "CREATIVE_BUG_TOWER";
    })(TOWER_SUB_TYPE = exports.TOWER_SUB_TYPE || (exports.TOWER_SUB_TYPE = {}));
    var CASTLE_TYPE;
    (function(CASTLE_TYPE) {
      CASTLE_TYPE[CASTLE_TYPE["GRASS_CASTLE"] = 0] = "GRASS_CASTLE";
      CASTLE_TYPE[CASTLE_TYPE["SNOW_CASTLE"] = 1] = "SNOW_CASTLE";
      CASTLE_TYPE[CASTLE_TYPE["LAVA_CASTLE"] = 2] = "LAVA_CASTLE";
    })(CASTLE_TYPE = exports.CASTLE_TYPE || (exports.CASTLE_TYPE = {}));
    var TOWER_COST;
    (function(TOWER_COST) {
      TOWER_COST[TOWER_COST["NORMAL_TOWER"] = 200] = "NORMAL_TOWER";
      TOWER_COST[TOWER_COST["TANK_TOWER"] = 500] = "TANK_TOWER";
      TOWER_COST[TOWER_COST["DRAGON_TOWER"] = 1e3] = "DRAGON_TOWER";
      TOWER_COST[TOWER_COST["BUG_TOWER"] = 1e3] = "BUG_TOWER";
    })(TOWER_COST = exports.TOWER_COST || (exports.TOWER_COST = {}));
    var ITEM_COST;
    (function(ITEM_COST) {
      ITEM_COST[ITEM_COST["LAND_MINE"] = 100] = "LAND_MINE";
      ITEM_COST[ITEM_COST["HEART"] = 200] = "HEART";
      ITEM_COST[ITEM_COST["MONKEY_CANNON"] = 500] = "MONKEY_CANNON";
      ITEM_COST[ITEM_COST["DRAGON_FIRE"] = 1e3] = "DRAGON_FIRE";
    })(ITEM_COST = exports.ITEM_COST || (exports.ITEM_COST = {}));
    var TOWER_ARRANGEMENT;
    (function(TOWER_ARRANGEMENT) {
      TOWER_ARRANGEMENT[TOWER_ARRANGEMENT["LOCKED_FIRST"] = 0] = "LOCKED_FIRST";
      TOWER_ARRANGEMENT[TOWER_ARRANGEMENT["UNLOCKED_FIRST"] = 1] = "UNLOCKED_FIRST";
      TOWER_ARRANGEMENT[TOWER_ARRANGEMENT["NONE"] = 2] = "NONE";
    })(TOWER_ARRANGEMENT = exports.TOWER_ARRANGEMENT || (exports.TOWER_ARRANGEMENT = {}));
    var IAP_PURCHASE_ID;
    (function(IAP_PURCHASE_ID) {
      IAP_PURCHASE_ID["Gems_300"] = "Gems_300";
      IAP_PURCHASE_ID["Gems_1000"] = "Gems_1000";
      IAP_PURCHASE_ID["Gems_2500"] = "Gems_2500";
      IAP_PURCHASE_ID["Gems_7000"] = "Gems_7000";
      IAP_PURCHASE_ID["Gems_17000"] = "Gems_17000";
      IAP_PURCHASE_ID["Gems_120000"] = "Gems_120000";
      IAP_PURCHASE_ID["SPECIAL_1"] = "Speical_Offer_1";
      IAP_PURCHASE_ID["SPECIAL_2"] = "Speical_Offer_2";
      IAP_PURCHASE_ID["EnergyBar"] = "EnergyBar";
    })(IAP_PURCHASE_ID = exports.IAP_PURCHASE_ID || (exports.IAP_PURCHASE_ID = {}));
    var CHEST_REWARD_TYPE;
    (function(CHEST_REWARD_TYPE) {
      CHEST_REWARD_TYPE[CHEST_REWARD_TYPE["PLAIN_CHEST"] = 0] = "PLAIN_CHEST";
      CHEST_REWARD_TYPE[CHEST_REWARD_TYPE["RARE_CHEST"] = 1] = "RARE_CHEST";
    })(CHEST_REWARD_TYPE = exports.CHEST_REWARD_TYPE || (exports.CHEST_REWARD_TYPE = {}));
    var CHEST_REWARDS;
    (function(CHEST_REWARDS) {
      CHEST_REWARDS[CHEST_REWARDS["MAGIC_HEART"] = 0] = "MAGIC_HEART";
      CHEST_REWARDS[CHEST_REWARDS["LAND_MINES"] = 1] = "LAND_MINES";
      CHEST_REWARDS[CHEST_REWARDS["COINS"] = 2] = "COINS";
      CHEST_REWARDS[CHEST_REWARDS["GEMS"] = 3] = "GEMS";
      CHEST_REWARDS[CHEST_REWARDS["RAINBOW_DRAGON"] = 4] = "RAINBOW_DRAGON";
      CHEST_REWARDS[CHEST_REWARDS["MONKEY_CANNON"] = 5] = "MONKEY_CANNON";
    })(CHEST_REWARDS = exports.CHEST_REWARDS || (exports.CHEST_REWARDS = {}));
    var ENEMY_TYPE;
    (function(ENEMY_TYPE) {
      ENEMY_TYPE[ENEMY_TYPE["DARK_KNIGHT"] = 0] = "DARK_KNIGHT";
      ENEMY_TYPE[ENEMY_TYPE["LARGE_KNIGHT"] = 1] = "LARGE_KNIGHT";
      ENEMY_TYPE[ENEMY_TYPE["FLYING_KNIGHT"] = 2] = "FLYING_KNIGHT";
      ENEMY_TYPE[ENEMY_TYPE["WIZARD"] = 3] = "WIZARD";
    })(ENEMY_TYPE = exports.ENEMY_TYPE || (exports.ENEMY_TYPE = {}));
    var SCENE_TYPE;
    (function(SCENE_TYPE) {
      SCENE_TYPE[SCENE_TYPE["MAIN_MENU_SCENE"] = 0] = "MAIN_MENU_SCENE";
      SCENE_TYPE[SCENE_TYPE["SHOP_SCENE"] = 1] = "SHOP_SCENE";
      SCENE_TYPE[SCENE_TYPE["ACHIEVEMENT_SCENE"] = 2] = "ACHIEVEMENT_SCENE";
      SCENE_TYPE[SCENE_TYPE["TOWER_SELECTION_SCENE"] = 3] = "TOWER_SELECTION_SCENE";
      SCENE_TYPE[SCENE_TYPE["LEVEL_SELECTION_SCENE"] = 4] = "LEVEL_SELECTION_SCENE";
      SCENE_TYPE[SCENE_TYPE["CHALLENGE_SCENE"] = 5] = "CHALLENGE_SCENE";
      SCENE_TYPE[SCENE_TYPE["GAME_PLAY"] = 6] = "GAME_PLAY";
      SCENE_TYPE[SCENE_TYPE["TUTORIAL"] = 7] = "TUTORIAL";
    })(SCENE_TYPE = exports.SCENE_TYPE || (exports.SCENE_TYPE = {}));
    cc._RF.pop();
  }, {} ],
  DragonParticle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ebdf8KZA8NBwKXZsJ+mSHaN", "DragonParticle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DragonParticle = function(_super) {
      __extends(DragonParticle, _super);
      function DragonParticle() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DragonParticle.prototype.updateProperties = function(pos, name) {
        this.node.name = "DragonParticle" + name;
        this.node.position = cc.v3(pos.x, pos.y - 10, 0);
        this.node.zIndex = 1e3;
      };
      DragonParticle.prototype.dragonParticleMoveAction = function(pathData, initPos, itemKey) {
        var _this = this;
        var map = this.node.parent.parent.getComponent("GamePlay").map.node;
        var action = null;
        var actions = [];
        var initialPosition = cc.v2(initPos.x, initPos.y);
        for (var counter = pathData.length - 2; counter >= 0; counter--) {
          var speed = 450;
          var positionInWorldSpace = map.convertToWorldSpaceAR(new cc.Vec2(pathData[counter].x - .5 * map.width, pathData[counter].y - .5 * map.height));
          var changedPosition = this.node.parent.convertToNodeSpaceAR(positionInWorldSpace);
          var distace = Math.sqrt(Math.pow(initialPosition.x - changedPosition.x, 2) + Math.pow(initialPosition.y - changedPosition.y, 2));
          var time = distace / speed;
          initialPosition.x = changedPosition.x;
          initialPosition.y = changedPosition.y;
          counter > 0 && 1 == pathData[counter + 1].pathFromCave && (time = 0);
          var moveAction = cc.moveTo(time, changedPosition.x, changedPosition.y);
          actions.push(moveAction);
        }
        action = cc.sequence(__spreadArrays(actions, [ cc.delayTime(.1), cc.callFunc(function() {
          _this.node.parent.parent.getComponent("GamePlay").itemRemovedFromGamePlay(itemKey);
        }, this, itemKey), cc.removeSelf() ]));
        return action;
      };
      DragonParticle = __decorate([ ccclass ], DragonParticle);
      return DragonParticle;
    }(cc.Component);
    exports.default = DragonParticle;
    cc._RF.pop();
  }, {} ],
  EnemyIntroduction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f95f85+hXJOC6iS+OaBdbz/", "EnemyIntroduction");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var GameManager_1 = require("../Manager/GameManager");
    var SoundManager_1 = require("../Manager/SoundManager");
    var MessageCenter_1 = require("../Utilities/MessageCenter");
    var APAspectRatioFitter_1 = require("../Utilities/APAspectRatioFitter");
    var Utility_1 = require("../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EnemyIntroduction = function(_super) {
      __extends(EnemyIntroduction, _super);
      function EnemyIntroduction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.enemyTexture = [];
        _this.enemyIcon = null;
        _this.enemyIntro = null;
        _this.enemyName = null;
        _this.enemyNode = null;
        _this.enemyType = Constant_1.ENEMY_TYPE.DARK_KNIGHT;
        return _this;
      }
      EnemyIntroduction.prototype.onLoad = function() {
        this.updateEnemyAndDesc();
      };
      EnemyIntroduction.prototype.start = function() {};
      EnemyIntroduction.prototype.updateEnemyAndDesc = function() {
        this.enemyName.string = Utility_1.Utility.getEnemyName(this.enemyType);
        this.enemyIntro.string = Utility_1.Utility.getEnemyDescription(this.enemyType);
        this.enemyIcon.spriteFrame = this.enemyTexture[this.enemyType];
        this.enemyIcon.node.getComponent("APAspectRatioFitter").fitMode = APAspectRatioFitter_1.APAspectRatioFitType.FitInside;
      };
      EnemyIntroduction.prototype.okButtonCB = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        var key = Utility_1.Utility.getEnemyStatusTutKey(this.enemyType);
        var data = GameManager_1.default.getInstance().getEnemyTutorialStatus();
        data[key] = false;
        GameManager_1.default.getInstance().setEnemyTutorialStatus(data);
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.ENEMY_TUTORIAL_OVER);
        this.node.removeFromParent(true);
      };
      __decorate([ property(cc.SpriteFrame) ], EnemyIntroduction.prototype, "enemyTexture", void 0);
      __decorate([ property(cc.Sprite) ], EnemyIntroduction.prototype, "enemyIcon", void 0);
      __decorate([ property(cc.Label) ], EnemyIntroduction.prototype, "enemyIntro", void 0);
      __decorate([ property(cc.Label) ], EnemyIntroduction.prototype, "enemyName", void 0);
      __decorate([ property(cc.Node) ], EnemyIntroduction.prototype, "enemyNode", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.ENEMY_TYPE),
        visible: function() {
          this.updateEnemyAndDesc();
          return true;
        }
      }) ], EnemyIntroduction.prototype, "enemyType", void 0);
      EnemyIntroduction = __decorate([ ccclass ], EnemyIntroduction);
      return EnemyIntroduction;
    }(cc.Component);
    exports.default = EnemyIntroduction;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/GameManager": "GameManager",
    "../Manager/SoundManager": "SoundManager",
    "../Utilities/APAspectRatioFitter": "APAspectRatioFitter",
    "../Utilities/MessageCenter": "MessageCenter",
    "../Utilities/Utility": "Utility"
  } ],
  EnemyProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ae7c7rkP9K2LViW6Re559B", "EnemyProgress");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EnemyProgress = function(_super) {
      __extends(EnemyProgress, _super);
      function EnemyProgress() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.topBarKnight = null;
        _this.knightProgressBar = null;
        _this.knightProgressArray = {};
        _this.currentSelectedPath = 1;
        return _this;
      }
      EnemyProgress.prototype.start = function() {};
      EnemyProgress.prototype.updateCurrentPathString = function(currentSelectedLevelPath) {
        this.currentSelectedPath = currentSelectedLevelPath;
        this.updateKnightStatusInTopBar();
      };
      EnemyProgress.prototype.addKnightInProgressBar = function(knightType, path, color, knightKey) {
        var knightProgressImage = cc.instantiate(this.topBarKnight);
        knightProgressImage.name = knightKey;
        knightProgressImage.getComponent("TopBarKnight").updateKnightProperties(knightKey, knightType, color, path, this.knightProgressBar.node.height);
        this.knightProgressBar.node.addChild(knightProgressImage);
        this.knightProgressArray[knightKey] = knightProgressImage;
        knightProgressImage.x = .48 * -this.knightProgressBar.node.width;
        knightProgressImage.active = false;
        this && this.currentSelectedPath == path && (knightProgressImage.active = true);
      };
      EnemyProgress.prototype.updateKnigtPosition = function(knightKey, originalKnightMovementPercentage) {
        var knight = this.knightProgressArray[knightKey];
        var knightPathWidth = this.knightProgressBar.node.width - 1.5 * knight.width;
        var positionInX = .48 * -knightPathWidth + knightPathWidth * originalKnightMovementPercentage;
        knight.getComponent("TopBarKnight").updateKnightPosition(new cc.Vec2(positionInX, knight.y));
      };
      EnemyProgress.prototype.updateKnightStatusInTopBar = function() {
        var _this = this;
        var pathToCheck = "Path_" + this.currentSelectedPath.toString();
        Object.keys(this.knightProgressArray).forEach(function(knightKey) {
          var knight = _this.knightProgressArray[knightKey];
          knightKey.includes(pathToCheck) ? knight.active = true : knight.active = false;
        });
      };
      EnemyProgress.prototype.changeKnightInProgressBar = function(knightKey) {
        var knight = this.knightProgressArray[knightKey];
        knight && knight.getComponent("TopBarKnight").changeKnightSpriteFrame();
      };
      EnemyProgress.prototype.removeKnightFromProgressBar = function(knightKey) {
        var knight = this.knightProgressArray[knightKey];
        knight && knight.getComponent("TopBarKnight").removeSelfFromBar();
        delete this.knightProgressArray[knightKey];
      };
      __decorate([ property(cc.Prefab) ], EnemyProgress.prototype, "topBarKnight", void 0);
      __decorate([ property(cc.Sprite) ], EnemyProgress.prototype, "knightProgressBar", void 0);
      EnemyProgress = __decorate([ ccclass ], EnemyProgress);
      return EnemyProgress;
    }(cc.Component);
    exports.default = EnemyProgress;
    cc._RF.pop();
  }, {} ],
  EnergyPurchase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1caeeMWbW9NhqI99csyxxVR", "EnergyPurchase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var AdManager_1 = require("../Manager/AdManager");
    var GameManager_1 = require("../Manager/GameManager");
    var IAPManager_1 = require("../Manager/IAPManager");
    var SoundManager_1 = require("../Manager/SoundManager");
    var MessageCenter_1 = require("../Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EnergyPurchase = function(_super) {
      __extends(EnergyPurchase, _super);
      function EnergyPurchase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.energyFromAds = 10;
        _this.energyPurcahsedCount = 100;
        _this.itemCount = 5;
        return _this;
      }
      EnergyPurchase_1 = EnergyPurchase;
      EnergyPurchase.prototype.onLoad = function() {
        EnergyPurchase_1.instance = this;
      };
      EnergyPurchase.prototype.onWatchButtonAdCB = function(event, customData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        AdManager_1.default.getInstance().showRewardedVideoAds("0");
        var ref = this;
      };
      EnergyPurchase.prototype.onPurchaseButtonCB = function(event, customData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        IAPManager_1.default.getInstance().purchaseProduct(Constant_1.IAP_PURCHASE_ID.EnergyBar);
        this.showLoader();
        var ref = this;
        IAPManager_1.default.getInstance().setListener(function(data, error) {
          ref.removeLoader();
          if (!error && data.name == Constant_1.IAP_PURCHASE_ID.EnergyBar) {
            MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, ref.energyPurcahsedCount);
            GameManager_1.default.getInstance().incrementInGameLandMineItem(ref.itemCount);
            GameManager_1.default.getInstance().incrementInGameHeartItem(ref.itemCount);
            GameManager_1.default.getInstance().incrementInGameMonkeyCannonItem(ref.itemCount);
            GameManager_1.default.getInstance().incrementInGameDragonItem(ref.itemCount);
            ref.node.removeFromParent(true);
          }
        });
      };
      EnergyPurchase.prototype.onCloseButtonCB = function(event, customData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.CLOSE_EVENT_CALLBACK, this.energyFromAds);
        this.node.removeFromParent(true);
      };
      EnergyPurchase.energyPurchaseEvent = function() {
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, EnergyPurchase_1.instance.energyFromAds);
        EnergyPurchase_1.instance.node.removeFromParent(true);
      };
      EnergyPurchase.prototype.showLoader = function() {
        var ref = this;
        cc.resources.load("Prefab/Loader", cc.Prefab, function(err, asset) {
          var prefabNode = cc.instantiate(asset);
          prefabNode.name = "loaderNode";
          ref.node.addChild(prefabNode);
          ref.node.runAction(cc.sequence(cc.delayTime(120), cc.callFunc(ref.removeLoader, ref)));
        });
      };
      EnergyPurchase.prototype.removeLoader = function() {
        var loader = this.node.getChildByName("loaderNode");
        loader && loader.removeFromParent(true);
      };
      var EnergyPurchase_1;
      EnergyPurchase = EnergyPurchase_1 = __decorate([ ccclass ], EnergyPurchase);
      return EnergyPurchase;
    }(cc.Component);
    exports.default = EnergyPurchase;
    window.OnEnergyReceivedEventCallback = EnergyPurchase.energyPurchaseEvent;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/AdManager": "AdManager",
    "../Manager/GameManager": "GameManager",
    "../Manager/IAPManager": "IAPManager",
    "../Manager/SoundManager": "SoundManager",
    "../Utilities/MessageCenter": "MessageCenter"
  } ],
  FooterBarController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60430CW8DhJP4dSaANJNrsF", "FooterBarController");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FooterBarController = function(_super) {
      __extends(FooterBarController, _super);
      function FooterBarController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lightingStreak = null;
        return _this;
      }
      FooterBarController.prototype.onLoad = function() {};
      FooterBarController.prototype.start = function() {};
      FooterBarController.prototype.lightAnimation = function(level) {
        var footerSibling = null;
        "LeftFooterNode" === this.node.name ? footerSibling = this.node.getChildByName("FooterLeft") : "RightFooterNode" === this.node.name && (footerSibling = this.node.getChildByName("FooterRight"));
        this.lightingStreak.node.zIndex = footerSibling.zIndex + 1;
        this.lightingStreak.node.width = 1.15 * footerSibling.width;
        this.lightingStreak.node.height = 1.6 * footerSibling.height;
        this.lightingStreak.node.active = true;
        this.lightingStreak.node.color = Constant_1.LIGHTING_COLOR[Constant_1.LIGHTING_SELECTED[level]];
        this.lightingStreak.getComponent(cc.Animation).play("FooterLighting");
      };
      FooterBarController.prototype.stopLightAnimation = function() {
        this.lightingStreak.getComponent(cc.Animation).stop();
        this.lightingStreak.node.active = false;
      };
      __decorate([ property(cc.Sprite) ], FooterBarController.prototype, "lightingStreak", void 0);
      FooterBarController = __decorate([ ccclass ], FooterBarController);
      return FooterBarController;
    }(cc.Component);
    exports.default = FooterBarController;
    cc._RF.pop();
  }, {
    "./Constant": "Constant"
  } ],
  Footer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e2cf6j8aS1JJIMGWDThTiH1", "Footer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var AdManager_1 = require("./Manager/AdManager");
    var GameManager_1 = require("./Manager/GameManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var MessageCenter_1 = require("./Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Footer = function(_super) {
      __extends(Footer, _super);
      function Footer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rewardSounds = null;
        _this.chestDisableTexture = [];
        _this.disableBaseTexture = null;
        _this.enableBaseTexture = null;
        _this.rareChestIcon = null;
        _this.plainChestIcon = null;
        _this.chestBase = [];
        _this.glowTexture = [];
        _this.timerNode = null;
        _this.claimNode = null;
        _this.gemPurchase = null;
        _this.rareChestRewardButton = null;
        _this.plainChestRewardButton = null;
        _this.plainChestReward = null;
        _this.rareChestReward = null;
        _this.enableChestTexture = [];
        _this.rareChestRemainingSec = null;
        _this.plainChestRemainingSec = null;
        _this.rewardTimer = 86400;
        _this.plainChestTimeoutRef = null;
        _this.rareTimeoutRef = null;
        _this.rareChestPurchaseCost = 25;
        return _this;
      }
      Footer_1 = Footer;
      Footer.prototype.onLoad = function() {
        Footer_1.instance = this;
      };
      Footer.prototype.start = function() {
        this.enableChestTexture = [];
        this.enableChestTexture.push(this.plainChestIcon.spriteFrame);
        this.enableChestTexture.push(this.rareChestIcon.spriteFrame);
        this.plainChestRewardButton.interactable = true;
        this.updatePlainChestStatus();
        this.rareChestRewardButton.interactable = true;
        this.updateRareChestStatus();
      };
      Footer.prototype.onDestroy = function() {
        clearInterval(this.plainChestTimeoutRef);
        this.plainChestTimeoutRef = null;
        this.removeRareTimeOutRef();
      };
      Footer.prototype.updatePlainChestStatus = function() {
        if (GameManager_1.default.getInstance().getPlainChestRewardStatus()) {
          this.enablePlainChestTexture();
          this.plainChestReward.string = "Watch Video";
        } else {
          this.plainChestRemainingSec = this.rewardTimer - GameManager_1.default.getInstance().getPlainChestTimeInSec();
          this.plainChestRemainingSec = this.plainChestRemainingSec > 0 ? this.plainChestRemainingSec : 0;
          if (null == this.plainChestTimeoutRef && this.plainChestRemainingSec > 0) {
            this.hideRewardActiveIndicator(0);
            this.plainChestIcon.spriteFrame = this.chestDisableTexture[0];
            this.chestBase[0].spriteFrame = this.disableBaseTexture;
            var timeFormat = GameManager_1.default.getInstance().getTimerData(this.plainChestRemainingSec);
            this.updatePlainChestLabel(timeFormat);
            this.plainChestTimeoutRef = setInterval(this.updatePlainChestTimer.bind(this), 1e3);
          } else this.updatePlainChestTimer();
        }
      };
      Footer.prototype.updatePlainChestTimer = function() {
        this.plainChestRemainingSec -= 1;
        var timeFormat = GameManager_1.default.getInstance().getTimerData(this.plainChestRemainingSec);
        if (Math.floor(this.plainChestRemainingSec) <= 0) {
          this.enablePlainChestTexture();
          this.resetPlainRewardCounter(1, 3);
          this.removePlainChestTimeoutRef();
          this.addRewardActivateIndicator(0);
          SoundManager_1.default.getInstance().playEffect(this.rewardSounds, false, 1);
        } else {
          this.hideRewardActiveIndicator(0);
          this.updatePlainChestLabel(timeFormat);
        }
      };
      Footer.prototype.removePlainChestTimeoutRef = function() {
        clearInterval(this.plainChestTimeoutRef);
        this.plainChestTimeoutRef = null;
      };
      Footer.prototype.enablePlainChestTexture = function() {
        this.plainChestIcon.spriteFrame = this.enableChestTexture[0];
        this.chestBase[0].spriteFrame = this.enableBaseTexture;
        this.plainChestRewardButton.interactable = true;
      };
      Footer.prototype.updatePlainChestLabel = function(time) {
        this.plainChestRewardButton.interactable = false;
        this.plainChestReward.string = GameManager_1.default.getInstance().getTimeInTwoDigit(time.hour) + " : " + GameManager_1.default.getInstance().getTimeInTwoDigit(time.minute) + " : " + GameManager_1.default.getInstance().getTimeInTwoDigit(time.seconds);
      };
      Footer.prototype.resetPlainRewardCounter = function(rewardStatus, rewardCounter) {
        GameManager_1.default.getInstance().setPlainChestRewardCounter(rewardCounter);
        GameManager_1.default.getInstance().setPlainChestRewardStatus(rewardStatus);
        var currentTime = new Date().getTime();
        GameManager_1.default.getInstance().setPlainChestRewardTimer(currentTime.toString());
        this.updatePlainChestStatus();
      };
      Footer.prototype.updateRareChestStatus = function() {
        if (GameManager_1.default.getInstance().getRareChestRewardStatus()) {
          this.enableRareChestTexture();
          this.rareChestReward.string = "Claim";
          this.switchToGemsMode(false);
        } else {
          this.rareChestRemainingSec = this.rewardTimer - GameManager_1.default.getInstance().getRareChestTimeInSec();
          this.rareChestRemainingSec = this.rareChestRemainingSec > 0 ? this.rareChestRemainingSec : 0;
          if (null == this.rareTimeoutRef && this.rareChestRemainingSec > 0) {
            this.rareChestIcon.spriteFrame = this.chestDisableTexture[1];
            this.chestBase[1].spriteFrame = this.disableBaseTexture;
            this.timerNode.active = true;
            var timeFormat = GameManager_1.default.getInstance().getTimerData(this.rareChestRemainingSec);
            this.updateRareChestLabel(timeFormat);
            this.rareTimeoutRef = setInterval(this.updateRareChestTimer.bind(this), 1e3);
            this.hideRewardActiveIndicator(1);
          } else this.updateRareChestTimer();
        }
      };
      Footer.prototype.updateRareChestTimer = function() {
        this.rareChestRemainingSec -= 1;
        var timeFormat = GameManager_1.default.getInstance().getTimerData(this.rareChestRemainingSec);
        if (Math.floor(this.rareChestRemainingSec) <= 0) {
          this.enableRareChestTexture();
          this.resetRareRewardCounter(1, 1);
          this.removeRareTimeOutRef();
          SoundManager_1.default.getInstance().playEffect(this.rewardSounds, false, 1);
          this.addRewardActivateIndicator(1);
        } else {
          this.hideRewardActiveIndicator(1);
          this.updateRareChestLabel(timeFormat);
        }
      };
      Footer.prototype.removeRareTimeOutRef = function() {
        clearInterval(this.rareTimeoutRef);
        this.rareTimeoutRef = null;
      };
      Footer.prototype.enableRareChestTexture = function() {
        this.timerNode.active = false;
        this.rareChestIcon.spriteFrame = this.enableChestTexture[1];
        this.chestBase[1].spriteFrame = this.enableBaseTexture;
        this.rareChestRewardButton.interactable = true;
      };
      Footer.prototype.updateRareChestLabel = function(time) {
        this.switchToGemsMode(true);
        this.rareChestReward && (this.rareChestReward.string = GameManager_1.default.getInstance().getTimeInTwoDigit(time.hour) + " : " + GameManager_1.default.getInstance().getTimeInTwoDigit(time.minute) + " : " + GameManager_1.default.getInstance().getTimeInTwoDigit(time.seconds));
      };
      Footer.prototype.resetRareRewardCounter = function(rewardStatus, rewardCounter) {
        GameManager_1.default.getInstance().setRareChestRewardCounter(rewardCounter);
        GameManager_1.default.getInstance().setRareChestRewardStatus(rewardStatus);
        var currentTime = new Date().getTime();
        GameManager_1.default.getInstance().setRareChestRewardTimer(currentTime.toString());
        this.updateRareChestStatus();
      };
      Footer.prototype.switchToGemsMode = function(status) {
        if (this.gemPurchase && this.claimNode) {
          this.gemPurchase.active = status;
          this.claimNode.active = !status;
        }
      };
      Footer.prototype.openShopScreen = function() {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        cc.director.loadScene("Shop");
      };
      Footer.prototype.openChallengesScreen = function() {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        cc.director.loadScene("Challenges");
      };
      Footer.prototype.plainRewardButtonCB = function(event, customData) {
        var counter = GameManager_1.default.getInstance().getPlainChestRewardCounter();
        if (counter > 0) {
          SoundManager_1.default.getInstance().playButtonClickSoundEffect();
          AdManager_1.default.getInstance().showRewardedVideoAds("1");
        }
      };
      Footer.prototype.showPlainChestRewardPopup = function() {
        var counter = GameManager_1.default.getInstance().getPlainChestRewardCounter();
        if (counter > 0) {
          counter -= 1;
          var eventData = {
            type: Constant_1.CHEST_REWARD_TYPE.PLAIN_CHEST
          };
          MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_OPEN_EVENT, eventData);
          GameManager_1.default.getInstance().setPlainChestRewardCounter(counter);
        }
        0 == counter && this.resetPlainRewardCounter(0, 0);
      };
      Footer.prototype.rareRewardButtonCB = function(event, customData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        var counter = GameManager_1.default.getInstance().getRareChestRewardCounter();
        var eventData = {
          type: Constant_1.CHEST_REWARD_TYPE.RARE_CHEST
        };
        eventData["cost"] = counter > 0 ? 0 : this.rareChestPurchaseCost;
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.CHEST_OPEN_EVENT, eventData);
        this.resetRareRewardCounter(0, 0);
        counter = counter > 0 ? counter - 1 : 0;
        GameManager_1.default.getInstance().setRareChestRewardCounter(counter);
        this.hideRewardActiveIndicator(1);
      };
      Footer.prototype.addRewardActivateIndicator = function(index) {
        this.glowTexture[index].active = true;
        this.glowTexture[index].runAction(cc.blink(2, 4));
      };
      Footer.prototype.hideRewardActiveIndicator = function(index) {
        this.glowTexture[index].active = false;
      };
      Footer.rewardReceivedEventCallback = function() {
        console.log("Call Received");
        Footer_1.instance.showPlainChestRewardPopup();
        Footer_1.instance.hideRewardActiveIndicator(0);
      };
      var Footer_1;
      __decorate([ property(cc.AudioClip) ], Footer.prototype, "rewardSounds", void 0);
      __decorate([ property(cc.SpriteFrame) ], Footer.prototype, "chestDisableTexture", void 0);
      __decorate([ property(cc.SpriteFrame) ], Footer.prototype, "disableBaseTexture", void 0);
      __decorate([ property(cc.SpriteFrame) ], Footer.prototype, "enableBaseTexture", void 0);
      __decorate([ property(cc.Sprite) ], Footer.prototype, "rareChestIcon", void 0);
      __decorate([ property(cc.Sprite) ], Footer.prototype, "plainChestIcon", void 0);
      __decorate([ property(cc.Sprite) ], Footer.prototype, "chestBase", void 0);
      __decorate([ property(cc.Node) ], Footer.prototype, "glowTexture", void 0);
      __decorate([ property(cc.Node) ], Footer.prototype, "timerNode", void 0);
      __decorate([ property(cc.Node) ], Footer.prototype, "claimNode", void 0);
      __decorate([ property(cc.Node) ], Footer.prototype, "gemPurchase", void 0);
      __decorate([ property(cc.Button) ], Footer.prototype, "rareChestRewardButton", void 0);
      __decorate([ property(cc.Button) ], Footer.prototype, "plainChestRewardButton", void 0);
      __decorate([ property(cc.Label) ], Footer.prototype, "plainChestReward", void 0);
      __decorate([ property(cc.Label) ], Footer.prototype, "rareChestReward", void 0);
      Footer = Footer_1 = __decorate([ ccclass ], Footer);
      return Footer;
    }(cc.Component);
    exports.default = Footer;
    window.OnRewardReceivedEventCallback = Footer.rewardReceivedEventCallback;
    cc._RF.pop();
  }, {
    "./Constant": "Constant",
    "./Manager/AdManager": "AdManager",
    "./Manager/GameManager": "GameManager",
    "./Manager/SoundManager": "SoundManager",
    "./Utilities/MessageCenter": "MessageCenter"
  } ],
  GameManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ea12y3tz5H/5uiPsAB8QXR", "GameManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var Utility_1 = require("../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GAME_KEY_DATA = {
      GAME_COINS: "GAME_COINS",
      GAME_GEMS: "GAME_GEMS",
      GAME_ENERGY: "GAME_ENERGY",
      GAME_DRAGON: "GAME_DRAGON",
      GAME_HEART: "GAME_HEART",
      LAND_MINE: "LAND_MINE",
      MONKEY_CANNON: "MONKEY_CANNON",
      USER_SCORE: "SCORE",
      CURRENT_LEVEL: "CURRENT_LEVEL",
      UNLOCKED_LEVEL: "UNLOCKED_LEVEL",
      TOTAL_LEVEL: "TOTAL_LEVEL",
      LAST_LEVEL_PLY: "LAST_LEVEL_PLAYED",
      LEVEL_INFO: "LEVEL_INFO",
      TOWER_LOCK_STAT: "TOWER_SUB_TYPE_",
      SHOW_ADS: "SHOW_ADS",
      PLAIN_CHEST: "PLAIN_CHEST_TIMER",
      PLAIN_CHEST_STAT: "PLAIN_CHEST_STATS",
      PLAIN_CHEST_COUNT: "PLAIN_CHEST_COUNTER",
      RARE_CHEST: "RARE_CHEST_TIMER",
      RARE_CHEST_STAT: "RARE_CHEST_STATS",
      RARE_CHEST_COUNT: "RARE_CHEST_COUNTER",
      DAILY_REWARD: "DAILY_REWARD",
      SPECIAL_PURCHASE_STATUS: "SPECIAL_PURCHASE_STATUS",
      SPECIAL_PURCHASE_STATUS_TIMER: "SPECIAL_PURCHASE_STATUS_TIMER",
      REWARD_ON_LEVEL: "REWARD_ON_LEVEL",
      CONSEQUITIVE_LEVEL_LOSE: "CONSEQUITIVE_LEVEL_LOSE",
      ENEMY_TUTORIAL_STATUS: "ENEMY_TUTORIAL_STATUS",
      NO_OF_GAME_PLAYED: "NO_OF_GAME_PLAYED",
      APP_OPENED_FIRST_TIME: "APP_OPENED_FIRST_TIME",
      ENERGY_REWARD_TIMER: "ENERGY_REWARD_TIMER",
      ENERGY_REWARD_STATUS: "ENERGY_REWARD_STATUS"
    };
    var GameManager = function() {
      function GameManager() {
        this.initialGemsCount = 200;
        this.initialCoinsCount = 500;
        this.energyCount = 20;
        this.dragonCount = 5;
        this.heartCount = 5;
        this.landMineCount = 5;
        this.monkeyCannonCount = 5;
        this.totalLevels = 38;
        this.rewardOnLvl = 7;
        this.isIpad = false;
        this.currentScene = Constant_1.SCENE_TYPE.MAIN_MENU_SCENE;
      }
      GameManager_1 = GameManager;
      GameManager.getInstance = function() {
        GameManager_1.instance || (GameManager_1.instance = new GameManager_1());
        return GameManager_1.instance;
      };
      GameManager.prototype.setCurrentScene = function(currScene) {
        this.currentScene = currScene;
      };
      GameManager.prototype.getCurrentScene = function() {
        return this.currentScene;
      };
      GameManager.prototype.setGameGems = function(gems) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.GAME_GEMS, gems);
      };
      GameManager.prototype.getGameGems = function() {
        var gemCount = cc.sys.localStorage.getItem(GAME_KEY_DATA.GAME_GEMS);
        if (null == gemCount || !Number.isInteger(parseInt(gemCount))) {
          this.setGameGems(this.initialGemsCount);
          gemCount = this.initialGemsCount;
        }
        return parseInt(gemCount);
      };
      GameManager.prototype.setGameCoins = function(coins) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.GAME_COINS, coins);
      };
      GameManager.prototype.getGameCoins = function() {
        var coinsCount = cc.sys.localStorage.getItem(GAME_KEY_DATA.GAME_COINS);
        if (null == coinsCount || !Number.isInteger(parseInt(coinsCount))) {
          this.setGameCoins(this.initialCoinsCount);
          coinsCount = this.initialCoinsCount;
        }
        return parseInt(coinsCount);
      };
      GameManager.prototype.setGameEnergy = function(energy) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.GAME_ENERGY, energy);
      };
      GameManager.prototype.getGameEnergy = function() {
        var energyCount = cc.sys.localStorage.getItem(GAME_KEY_DATA.GAME_ENERGY);
        if (null == energyCount || !Number.isInteger(parseInt(energyCount))) {
          this.setGameEnergy(this.energyCount);
          energyCount = this.energyCount;
        }
        return parseInt(energyCount);
      };
      GameManager.prototype.setAppOpenFirstTime = function(status) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.APP_OPENED_FIRST_TIME, status);
      };
      GameManager.prototype.getAppOpenFirstTimeStatus = function() {
        var status = cc.sys.localStorage.getItem(GAME_KEY_DATA.APP_OPENED_FIRST_TIME);
        if (null == status) {
          status = 1;
          this.setAppOpenFirstTime(status);
          return status;
        }
        return parseInt(status);
      };
      GameManager.prototype.setInGameDragonItem = function(dragonItem) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.GAME_DRAGON, dragonItem);
      };
      GameManager.prototype.getInGameDragonItem = function() {
        var dragonCount = cc.sys.localStorage.getItem(GAME_KEY_DATA.GAME_DRAGON);
        if (null == dragonCount || !Number.isInteger(parseInt(dragonCount))) {
          this.setInGameDragonItem(this.dragonCount);
          dragonCount = this.dragonCount;
        }
        return parseInt(dragonCount);
      };
      GameManager.prototype.incrementInGameDragonItem = function(counter) {
        var dragonCounter = this.getInGameDragonItem() + counter;
        this.setInGameDragonItem(dragonCounter);
      };
      GameManager.prototype.decrementInGameDragonItem = function(counter) {
        var dragonCounter = this.getInGameDragonItem() - counter;
        this.setInGameDragonItem(dragonCounter);
      };
      GameManager.prototype.setInGameHeartItem = function(magicHeart) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.GAME_HEART, magicHeart);
      };
      GameManager.prototype.getInGameHeartItem = function() {
        var gameHeart = cc.sys.localStorage.getItem(GAME_KEY_DATA.GAME_HEART);
        if (null == gameHeart || !Number.isInteger(parseInt(gameHeart))) {
          this.setInGameHeartItem(this.heartCount);
          gameHeart = this.heartCount;
        }
        return parseInt(gameHeart);
      };
      GameManager.prototype.incrementInGameHeartItem = function(counter) {
        var heartItem = this.getInGameHeartItem() + counter;
        this.setInGameHeartItem(heartItem);
      };
      GameManager.prototype.decrementInGameHeartItem = function(counter) {
        var heartItem = this.getInGameHeartItem() - counter;
        this.setInGameHeartItem(heartItem);
      };
      GameManager.prototype.setInGameLandMineItem = function(landMine) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.LAND_MINE, landMine);
      };
      GameManager.prototype.getInGameLandMineItem = function() {
        var landMine = cc.sys.localStorage.getItem(GAME_KEY_DATA.LAND_MINE);
        if (null == landMine || !Number.isInteger(parseInt(landMine))) {
          this.setInGameLandMineItem(this.landMineCount);
          landMine = this.landMineCount;
        }
        return parseInt(landMine);
      };
      GameManager.prototype.incrementInGameLandMineItem = function(counter) {
        var landMine = this.getInGameLandMineItem() + counter;
        this.setInGameLandMineItem(landMine);
      };
      GameManager.prototype.decrementInGameLandMineItem = function(counter) {
        var landMine = this.getInGameLandMineItem() - counter;
        this.setInGameLandMineItem(landMine);
      };
      GameManager.prototype.setInGameMonkeyCannonItem = function(cannonCount) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.MONKEY_CANNON, cannonCount);
      };
      GameManager.prototype.getInGameMonkeyCannonItem = function() {
        var cannonCount = cc.sys.localStorage.getItem(GAME_KEY_DATA.MONKEY_CANNON);
        if (null == cannonCount || !Number.isInteger(parseInt(cannonCount))) {
          this.setInGameMonkeyCannonItem(this.monkeyCannonCount);
          cannonCount = this.monkeyCannonCount;
        }
        return parseInt(cannonCount);
      };
      GameManager.prototype.incrementInGameMonkeyCannonItem = function(counter) {
        var cannonCounter = this.getInGameMonkeyCannonItem() + counter;
        this.setInGameMonkeyCannonItem(cannonCounter);
      };
      GameManager.prototype.decrementInGameMonkeyCannonItem = function(counter) {
        var cannonCounter = this.getInGameMonkeyCannonItem() - counter;
        this.setInGameMonkeyCannonItem(cannonCounter);
      };
      GameManager.prototype.setUserScore = function(score) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.USER_SCORE, score);
      };
      GameManager.prototype.getUserScore = function() {
        var score = cc.sys.localStorage.getItem(GAME_KEY_DATA.USER_SCORE);
        if (null == score || !Number.isInteger(parseInt(score))) {
          this.setUserScore(0);
          score = 0;
        }
        return parseInt(score);
      };
      GameManager.prototype.incrementUserScore = function(score) {
        var cannonCounter = this.getUserScore() + score;
        this.setUserScore(cannonCounter);
      };
      GameManager.prototype.decrementUserScore = function(score) {
        var cannonCounter = this.getUserScore() - score;
        this.setUserScore(cannonCounter);
      };
      GameManager.prototype.setUserCurrentLevel = function(level) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.CURRENT_LEVEL, level);
      };
      GameManager.prototype.getUserCurrentLevel = function() {
        var level = cc.sys.localStorage.getItem(GAME_KEY_DATA.CURRENT_LEVEL);
        if (null == level || !Number.isInteger(parseInt(level))) {
          this.setUserCurrentLevel(1);
          level = 1;
        }
        return parseInt(level);
      };
      GameManager.prototype.incrementUserCurrentLevel = function(level) {
        var cLevel = this.getUserCurrentLevel() + level;
        this.setUserCurrentLevel(cLevel);
      };
      GameManager.prototype.setLevelUnlocked = function(level) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.UNLOCKED_LEVEL, level);
      };
      GameManager.prototype.getLevelUnlocked = function() {
        var level = cc.sys.localStorage.getItem(GAME_KEY_DATA.UNLOCKED_LEVEL);
        if (null == level || !Number.isInteger(parseInt(level))) {
          this.setLevelUnlocked(1);
          level = 1;
        }
        return 45;
      };
      GameManager.prototype.incrementLevelUnlocked = function(level) {
        var cLevel = this.getLevelUnlocked() + level;
        this.setLevelUnlocked(cLevel);
      };
      GameManager.prototype.getTotalLevels = function() {
        var level = cc.sys.localStorage.getItem(GAME_KEY_DATA.TOTAL_LEVEL);
        null != level && Number.isInteger(parseInt(level)) || (level = this.totalLevels);
        return parseInt(level);
      };
      GameManager.prototype.setLastLevelPlayed = function(level) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.LAST_LEVEL_PLY, level);
      };
      GameManager.prototype.getLastLevelPlayed = function() {
        var level = cc.sys.localStorage.getItem(GAME_KEY_DATA.LAST_LEVEL_PLY);
        if (null == level || !Number.isInteger(parseInt(level))) {
          this.setLastLevelPlayed(0);
          level = 0;
        }
        return parseInt(level);
      };
      GameManager.prototype.setLevelData = function(data) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.LEVEL_INFO, JSON.stringify(data));
      };
      GameManager.prototype.getLevelData = function() {
        var levelInfo = cc.sys.localStorage.getItem(GAME_KEY_DATA.LEVEL_INFO);
        if (null == levelInfo) {
          levelInfo = this.createInitialLevelInfo();
          this.setLevelData(levelInfo);
          return levelInfo;
        }
        return JSON.parse(levelInfo);
      };
      GameManager.prototype.createInitialLevelInfo = function() {
        var level = [];
        for (var i = 0; i < this.totalLevels; i++) {
          var item = {
            difficulty: 0,
            totalScore: 130,
            achievedScore: 0
          };
          level.push(item);
        }
        return __spreadArrays(level);
      };
      GameManager.prototype.setIsIpad = function(width, height) {
        this.isIpad = width / height <= 1.4;
      };
      GameManager.prototype.isDeviceIPad = function() {
        return this.isIpad;
      };
      GameManager.prototype.setTowerLockedStatus = function(subTowerType, status) {
        var key = GAME_KEY_DATA.TOWER_LOCK_STAT + subTowerType;
        cc.sys.localStorage.setItem(key, status);
      };
      GameManager.prototype.getTowerLockedStatus = function(subTowerType) {
        var key = GAME_KEY_DATA.TOWER_LOCK_STAT + subTowerType;
        var towerStatus = cc.sys.localStorage.getItem(key);
        if (null == towerStatus) {
          towerStatus = subTowerType == Constant_1.TOWER_SUB_TYPE.RED_TOWER ? 1 : 0;
          this.setTowerLockedStatus(subTowerType, towerStatus);
        }
        return parseInt(towerStatus);
      };
      GameManager.prototype.getLockedTowersList = function() {
        var itemType = [];
        for (var counter = Constant_1.TOWER_SUB_TYPE.RED_TOWER; counter <= Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER; counter++) {
          var status = this.getTowerLockedStatus(counter);
          var towerStatus = Boolean(status);
          towerStatus || itemType.push(counter);
        }
      };
      GameManager.prototype.getUnlockedTowerList = function() {
        var itemType = [];
        for (var counter = Constant_1.TOWER_SUB_TYPE.RED_TOWER; counter <= Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER; counter++) {
          var status = this.getTowerLockedStatus(counter);
          var towerStatus = Boolean(status);
          status && itemType.push(counter);
        }
      };
      GameManager.prototype.setSpecialRewardTimer = function(timeStamp) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.SPECIAL_PURCHASE_STATUS_TIMER, timeStamp);
      };
      GameManager.prototype.getSpecialRewardTimer = function() {
        var timeStamp = cc.sys.localStorage.getItem(GAME_KEY_DATA.SPECIAL_PURCHASE_STATUS_TIMER);
        var currTime = new Date().getTime();
        var timeGap = 30;
        if (null == timeStamp) {
          this.setSpecialRewardTimer(currTime.toString());
          return true;
        }
        if (Utility_1.Utility.getTimeDifferenceInMin(timeStamp) >= timeGap) {
          this.setSpecialRewardTimer(currTime.toString());
          return true;
        }
        return false;
      };
      GameManager.prototype.setSpecialPurchaseStatus = function(data) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.SPECIAL_PURCHASE_STATUS, JSON.stringify(data));
      };
      GameManager.prototype.getSpecialPurchaseStatus = function() {
        var data = cc.sys.localStorage.getItem(GAME_KEY_DATA.SPECIAL_PURCHASE_STATUS);
        if (null == data) {
          data = {
            PACK_1: false,
            PACK_2: false
          };
          this.setSpecialPurchaseStatus(data);
        } else data = JSON.parse(data);
        return data;
      };
      GameManager.prototype.setGameAdsStatus = function(status) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.SHOW_ADS, status);
      };
      GameManager.prototype.getGameAdsStatus = function() {
        var status = cc.sys.localStorage.getItem(GAME_KEY_DATA.SHOW_ADS);
        null == status && (status = "1");
        this.setGameAdsStatus(status);
        return Boolean(parseInt(status));
      };
      GameManager.prototype.setPlainChestRewardStatus = function(status) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.PLAIN_CHEST_STAT, status);
      };
      GameManager.prototype.getPlainChestRewardStatus = function() {
        var status = cc.sys.localStorage.getItem(GAME_KEY_DATA.PLAIN_CHEST_STAT);
        if (null == status) {
          status = 1;
          this.setPlainChestRewardStatus(status);
        }
        return Boolean(parseInt(status));
      };
      GameManager.prototype.setPlainChestRewardTimer = function(timeStamp) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.PLAIN_CHEST, timeStamp);
      };
      GameManager.prototype.getPlainChestRewardTimer = function() {
        var time = cc.sys.localStorage.getItem(GAME_KEY_DATA.PLAIN_CHEST);
        null == time && (time = "0");
        return parseInt(time);
      };
      GameManager.prototype.getPlainChestTimeInSec = function() {
        var chestSavedTime = this.getPlainChestRewardTimer();
        if (0 == chestSavedTime) return 0;
        var seconds = Utility_1.Utility.getTimeDifferenceInSec(chestSavedTime.toString());
        return seconds;
      };
      GameManager.prototype.setPlainChestRewardCounter = function(status) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.PLAIN_CHEST_COUNT, status);
      };
      GameManager.prototype.getPlainChestRewardCounter = function() {
        var status = cc.sys.localStorage.getItem(GAME_KEY_DATA.PLAIN_CHEST_COUNT);
        if (null == status) {
          status = 3;
          this.setPlainChestRewardCounter(status);
        }
        return parseInt(status);
      };
      GameManager.prototype.setRareChestRewardTimer = function(timeStamp) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.RARE_CHEST, timeStamp);
      };
      GameManager.prototype.getRareChestRewardTimer = function() {
        var time = cc.sys.localStorage.getItem(GAME_KEY_DATA.RARE_CHEST);
        null == time && (time = "0");
        return parseInt(time);
      };
      GameManager.prototype.getRareChestTimeInSec = function() {
        var currentTime = new Date().getTime();
        var chestSavedTime = this.getRareChestRewardTimer();
        if (0 == chestSavedTime) return 0;
        var timeDiffInSec = (currentTime - chestSavedTime) / 1e3;
        return timeDiffInSec;
      };
      GameManager.prototype.setRareChestRewardStatus = function(status) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.RARE_CHEST_STAT, status);
      };
      GameManager.prototype.getRareChestRewardStatus = function() {
        var status = cc.sys.localStorage.getItem(GAME_KEY_DATA.RARE_CHEST_STAT);
        if (null == status) {
          status = 1;
          this.setRareChestRewardStatus(status);
        }
        return Boolean(parseInt(status));
      };
      GameManager.prototype.setRareChestRewardCounter = function(status) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.RARE_CHEST_COUNT, status);
      };
      GameManager.prototype.getRareChestRewardCounter = function() {
        var status = cc.sys.localStorage.getItem(GAME_KEY_DATA.RARE_CHEST_COUNT);
        if (null == status) {
          status = 1;
          this.setRareChestRewardCounter(status);
        }
        return parseInt(status);
      };
      GameManager.prototype.setDailyRewardTimeStamp = function(timeStamp) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.DAILY_REWARD, timeStamp);
      };
      GameManager.prototype.getDailyRewardStatus = function() {
        var timeStamp = cc.sys.localStorage.getItem(GAME_KEY_DATA.DAILY_REWARD);
        if (null == timeStamp) return true;
        var waitingTime = 24;
        if (Utility_1.Utility.getTimeDifferenceInHours(timeStamp) >= waitingTime) return true;
        return false;
      };
      GameManager.prototype.setRewardUnlockedOnLevel = function(levelNo) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.REWARD_ON_LEVEL, levelNo);
      };
      GameManager.prototype.getRewardUnlockedOnLevel = function() {
        var levelNo = cc.sys.localStorage.getItem(GAME_KEY_DATA.REWARD_ON_LEVEL);
        if (null == levelNo) {
          levelNo = this.rewardOnLvl.toString();
          this.setRewardUnlockedOnLevel(levelNo);
        }
        return parseInt(levelNo);
      };
      GameManager.prototype.updateRewardUnlockedOnLevel = function() {
        var levelNo = this.getRewardUnlockedOnLevel();
        var newLvl = levelNo + this.rewardOnLvl;
        this.setRewardUnlockedOnLevel(newLvl.toString());
      };
      GameManager.prototype.checkIfRewardAvailableForLevelsUnlocked = function() {
        var rewardOnLvl = this.getRewardUnlockedOnLevel();
        var unlockedLvl = this.getLevelUnlocked();
        if (unlockedLvl >= rewardOnLvl) return true;
        return false;
      };
      GameManager.prototype.setConsequitiveLevelLose = function(loseCount) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.CONSEQUITIVE_LEVEL_LOSE, loseCount);
      };
      GameManager.prototype.getConsequitiveLevelLose = function() {
        var loseCount = cc.sys.localStorage.getItem(GAME_KEY_DATA.CONSEQUITIVE_LEVEL_LOSE);
        if (null == loseCount) {
          loseCount = "0";
          this.setConsequitiveLevelLose(loseCount);
        }
        return parseInt(loseCount);
      };
      GameManager.prototype.setGamePlayCounter = function(counter) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.NO_OF_GAME_PLAYED, counter);
      };
      GameManager.prototype.getGamePlayCounter = function() {
        var counter = cc.sys.localStorage.getItem(GAME_KEY_DATA.NO_OF_GAME_PLAYED);
        if (null == counter) {
          counter = 0;
          this.setGamePlayCounter(counter);
          return counter;
        }
        return parseInt(counter);
      };
      GameManager.prototype.updateLoseCount = function() {
        var loseCount = this.getConsequitiveLevelLose();
        var counter = loseCount + 1;
        this.setConsequitiveLevelLose(counter.toString());
      };
      GameManager.prototype.setEnemyTutorialStatus = function(data) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.ENEMY_TUTORIAL_STATUS, JSON.stringify(data));
      };
      GameManager.prototype.getEnemyTutorialStatus = function() {
        var tutStatus = cc.sys.localStorage.getItem(GAME_KEY_DATA.ENEMY_TUTORIAL_STATUS);
        if (null == tutStatus) {
          tutStatus = {
            DARK_KNIGHT: true,
            LARGE_KNIGHT: true,
            FLYING_KNIGHT: true,
            WIZARD: true
          };
          this.setEnemyTutorialStatus(tutStatus);
          return tutStatus;
        }
        return JSON.parse(tutStatus);
      };
      GameManager.prototype.setEnergyRewardTimer = function(timeStamp) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.ENERGY_REWARD_TIMER, timeStamp);
      };
      GameManager.prototype.getEnergyRewardTimer = function() {
        var time = cc.sys.localStorage.getItem(GAME_KEY_DATA.ENERGY_REWARD_TIMER);
        null == time && (time = "0");
        return parseInt(time);
      };
      GameManager.prototype.getEnergyRewardTimeInSec = function() {
        var currentTime = new Date().getTime();
        var chestSavedTime = this.getEnergyRewardTimer();
        if (0 == chestSavedTime) return 0;
        var timeDiffInSec = (currentTime - chestSavedTime) / 1e3;
        return timeDiffInSec;
      };
      GameManager.prototype.setEnergyStatus = function(status) {
        cc.sys.localStorage.setItem(GAME_KEY_DATA.ENERGY_REWARD_STATUS, status);
      };
      GameManager.prototype.getEnergyStatus = function() {
        var status = cc.sys.localStorage.getItem(GAME_KEY_DATA.ENERGY_REWARD_STATUS);
        if (null == status) {
          status = 1;
          this.setEnergyStatus(status);
        }
        return Boolean(parseInt(status));
      };
      GameManager.prototype.getTimeInTwoDigit = function(time) {
        time = Math.floor(time);
        return ("0" + time).slice(-2);
      };
      GameManager.prototype.getTimerData = function(time) {
        var hour = time / 3600;
        var remainSec = time % 3600;
        var minute = remainSec / 60;
        var seconds = remainSec % 60;
        return {
          hour: hour,
          minute: minute,
          seconds: seconds
        };
      };
      var GameManager_1;
      GameManager = GameManager_1 = __decorate([ ccclass ], GameManager);
      return GameManager;
    }();
    exports.default = GameManager;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Utilities/Utility": "Utility"
  } ],
  GamePlay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b9cepw8/hPCprdXEOhAJiB", "GamePlay");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var LevelManager_1 = require("./Manager/LevelManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var Knight_1 = require("./Knight");
    var GameManager_1 = require("./Manager/GameManager");
    var AdManager_1 = require("./Manager/AdManager");
    var Utility_1 = require("./Utilities/Utility");
    var Base_1 = require("./Base/Base");
    var MessageCenter_1 = require("./Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GamePlay = function(_super) {
      __extends(GamePlay, _super);
      function GamePlay() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isDemoLevel = false;
        _this.topBarControllerScript = null;
        _this.currentWinningStreak = 0;
        _this.maxLife = 10;
        _this.currentLevel = 1;
        _this.maxLevelInGame = 1;
        _this.knightCounter = 0;
        _this.ballCounter = 0;
        _this.itemCounter = 0;
        _this.knightRecord = {};
        _this.shieldRecord = {};
        _this.itemsRecord = {};
        _this.cannonFireballRecord = [];
        _this.maxLocalZOrder = 1e3;
        _this.currentSelectedPath = Constant_1.PATH_SELECTED.PATH_1_SELECTED;
        _this.levelData = null;
        _this.maximumKnight = 200;
        _this.maxNumberOfPath = 1;
        _this.currentSelectedPathData = [];
        _this.timer = 0;
        _this.isPause = false;
        _this.pathNodes = [];
        _this.spriteFrames = [];
        _this.lifeLineLost = null;
        _this.pathOffset = 0;
        _this.tower = null;
        _this.cannon = null;
        _this.towerGlow = null;
        _this.towerGlowAnimationClip = "";
        _this.isFinalRush = false;
        _this.item = null;
        _this.score = 0;
        _this.timeForKnightSpawning = 35;
        _this.knightItemDataInPath = {
          path1: 0,
          path2: 0,
          path3: 0,
          path4: 0
        };
        _this.dragonParticle = null;
        _this.difficulty = Constant_1.DIFFICULTY_SELECTED.HARD;
        _this.isGameStart = false;
        _this.isGameEnd = false;
        _this.isBagOpen = false;
        _this.userStreaks = [];
        _this.towerPrefab = null;
        _this.topBarController = null;
        _this.footerLeft = null;
        _this.footerMiddle = null;
        _this.footerRight = null;
        _this.map = null;
        _this.knight = null;
        _this.cannonFireBall = null;
        _this.killScore = null;
        _this.heartLose = null;
        _this.portalAnimationClip = null;
        _this.audioClips = [];
        _this.path = null;
        _this.oneLaneFooterBgButton = null;
        _this.itemPrefab = null;
        _this.itemSpriteFrames = [];
        _this.dragonParticlePrefab = null;
        _this.monkeyCanonBackSpriteFrame = null;
        _this.dragonBackSpriteFrame = null;
        _this.blueTowerSpriteFrame = null;
        _this.purpleTowerSpriteFrame = null;
        _this.greenTowerSpriteFrame = null;
        _this.fireCastleTowerSpriteFrame = null;
        _this.khakiTankTowerSpriteFrame = null;
        _this.khakiTankCannonPath1SpriteFrame = null;
        _this.khakiTankCannonPath3SpriteFrame = null;
        _this.pinkBugTowerSpriteFrame = null;
        _this.pinkBugCannonPath1SpriteFrame = null;
        _this.pinkBugCannonPath3SpriteFrame = null;
        return _this;
      }
      GamePlay.prototype.onLoad = function() {
        cc.debug.setDisplayStats(false);
        GameManager_1.default.getInstance().getCurrentScene() == Constant_1.SCENE_TYPE.TUTORIAL && (this.isDemoLevel = true);
        GameManager_1.default.getInstance().setCurrentScene(Constant_1.SCENE_TYPE.GAME_PLAY);
        this.registerEvents();
      };
      GamePlay.prototype.registerEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.ENEMY_TUTORIAL_OVER, this.enemyTutorialOver.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.CLOSE_EVENT_CALLBACK, this.buyEnergyPopupDenied.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, this.onEnergyPurchasedCB.bind(this), this.node);
      };
      GamePlay.prototype.removeRegisteredEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.ENEMY_TUTORIAL_OVER, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.CLOSE_EVENT_CALLBACK, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, this.node);
      };
      GamePlay.prototype.onEnergyPurchasedCB = function(energyCount) {
        GameManager_1.default.getInstance().setGameEnergy(GameManager_1.default.getInstance().getGameEnergy() + energyCount);
        this.addGameComponent();
      };
      GamePlay.prototype.buyEnergyPopupDenied = function() {
        cc.director.loadScene("LevelSelection");
      };
      GamePlay.prototype.onDestroy = function() {
        this.removeRegisteredEvents();
      };
      GamePlay.prototype.start = function() {
        GameManager_1.default.getInstance().getGameEnergy() < 5 ? this.showOutOfEnergyPopup() : this.addGameComponent();
        if (GameManager_1.default.getInstance().isDeviceIPad()) {
          this.map.node.setScale(.75);
          this.footerMiddle.setScale(.8);
        }
      };
      GamePlay.prototype.addGameComponent = function() {
        var _this = this;
        this.node.getChildByName("PopUp").zIndex = 1001;
        this.node.getChildByName("FinalRush").zIndex = 1001;
        this.node.getChildByName("Fireworks").zIndex = 1001;
        this.node.getChildByName("ItemLayout").zIndex = 1001;
        this.topBarControllerScript = this.topBarController.getComponent("TopBarController");
        this.footerLeft.zIndex = 1001;
        this.footerRight.zIndex = 1001;
        this.topBarController.zIndex = 1001;
        this.currentLevel = GameManager_1.default.getInstance().getUserCurrentLevel();
        LevelManager_1.default.getInstance().loadLevelsData().then(function() {
          LevelManager_1.default.getInstance().loadLevelMap(_this.currentLevel).then(function(data) {
            _this.map.tmxAsset = LevelManager_1.default.getInstance().getLevelMap(_this.currentLevel);
            LevelManager_1.default.getInstance().loadSelectedTower().then(function(towerPrefabData) {
              _this.towerPrefab = towerPrefabData;
              _this.updateMapComponent();
            });
          });
          LevelManager_1.default.getInstance().loadCurrentLevelData(_this.currentLevel);
          _this.maxLife = 10;
          _this.maxNumberOfPath = LevelManager_1.default.getInstance().getNumberOfPaths();
          _this.maxLevelInGame = LevelManager_1.default.getInstance().getNumberOfLevels();
          _this.changePathButtonStatus();
          _this.changeColorButtonStatus();
          _this.updateItemsInGamePlay();
          _this.node.getChildByName("PopUp").getComponent("PopUp").showDifficultyPopUp(_this.currentLevel, _this.isDemoLevel);
        });
        SoundManager_1.default.getInstance().addEffectToPriorityList(this.audioClips[5]);
        SoundManager_1.default.getInstance().addEffectToPriorityList(this.audioClips[6]);
        SoundManager_1.default.getInstance().addEffectToPriorityList(this.audioClips[7]);
        SoundManager_1.default.getInstance().addEffectToPriorityList(this.audioClips[8]);
        SoundManager_1.default.getInstance().addEffectToPriorityList(this.audioClips[9]);
        SoundManager_1.default.getInstance().addEffectToPriorityList(this.audioClips[14]);
        this.pathOffset = .1 * cc.instantiate(this.knight).height;
        this.showAds();
      };
      GamePlay.prototype.showAds = function() {
        var counter = GameManager_1.default.getInstance().getGamePlayCounter() + 1;
        GameManager_1.default.getInstance().setGamePlayCounter(counter);
        counter % 7 == 0 ? AdManager_1.default.getInstance().showVidoeAd() : counter % 3 == 0 && AdManager_1.default.getInstance().showInterstitial();
      };
      GamePlay.prototype.gameStart = function(difficulty) {
        SoundManager_1.default.getInstance().playMusic(this.audioClips[0], true);
        this.difficulty = difficulty;
        this.isGameStart = true;
        this.changePathButtonStatus();
        this.changeColorButtonStatus();
        LevelManager_1.default.getInstance().setDifficultyOfLevel(this.difficulty);
        this.topBarControllerScript.updateLifeCounter(this.maxLife);
        this.topBarControllerScript.updateCurrentSelectedPath(this.currentSelectedPath);
        this.maximumKnight = LevelManager_1.default.getInstance().getMaximumKnights();
        this.timeForKnightSpawning = LevelManager_1.default.getInstance().getTimeForKnightSpawning();
        LevelManager_1.default.getInstance().createAttackPattern();
        this.isDemoLevel || this.reduceEnergy();
        this.showEnemyIntroduction();
        this.logGameStartEvent();
      };
      GamePlay.prototype.logGameStartEvent = function() {
        var levelNumber = GameManager_1.default.getInstance().getUserCurrentLevel().toString();
        cc.sys.isMobile && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameAnalyticsManager", "levelStartEvent", "(Ljava/lang/String;)V", levelNumber) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("GameAnalyticsManager", "levelStartEvent:", levelNumber));
      };
      GamePlay.prototype.reduceEnergy = function() {
        var energyCount = GameManager_1.default.getInstance().getGameEnergy();
        energyCount -= 5;
        GameManager_1.default.getInstance().setGameEnergy(energyCount);
      };
      GamePlay.prototype.updateMapComponent = function() {
        this.updateTowerProperties();
        var direction = this.getPathDirection(1);
        this.cannon.getComponent("Cannon").updateProperties(direction, 1);
        if (this.map.getObjectGroup("Portal")) {
          var portal = this.map.getObjectGroup("Portal").node;
          for (var i in portal.children) {
            var portalAnimation = portal.children[i].addComponent(cc.Animation);
            portalAnimation.defaultClip = this.portalAnimationClip;
            portalAnimation.addClip(this.portalAnimationClip);
            var animState = portalAnimation.play("Portal");
            var portalProperties = this.map.getObjectGroup("Portal").getObject("Portal" + (parseInt(i) + 1));
            portalProperties.xFlip && (portal.children[i].scaleX = -1);
          }
        }
        this.initalizeHeartLose();
      };
      GamePlay.prototype.updateTowerProperties = function() {
        var selectedTowerName = LevelManager_1.default.getInstance().selectedTowerType;
        var towerPosInMap = this.map.getObjectGroup("TowerPosition").getObject("TowerPos");
        this.tower = cc.instantiate(this.towerPrefab);
        var towerPos = this.map.node.convertToNodeSpaceAR(this.map.node.convertToWorldSpaceAR(new cc.Vec2(towerPosInMap.x - .5 * this.map.node.getContentSize().width, towerPosInMap.y - .5 * this.map.node.getContentSize().height)));
        this.tower.position = cc.v3(towerPos.x, towerPos.y, 0);
        this.map.node.addChild(this.tower);
        this.towerGlowAnimationClip = this.tower.getChildByName("TowerLighting").getComponent(cc.Animation).getClips()[0].name;
        switch (selectedTowerName) {
         case Constant_1.TOWER_SUB_TYPE.BLUE_TOWER:
          this.tower.getChildByName("Tower").getComponent(cc.Sprite).spriteFrame = this.blueTowerSpriteFrame;
          break;

         case Constant_1.TOWER_SUB_TYPE.PURPLE_TOWER:
          this.tower.getChildByName("Tower").getComponent(cc.Sprite).spriteFrame = this.purpleTowerSpriteFrame;
          break;

         case Constant_1.TOWER_SUB_TYPE.GREEN_TOWER:
          this.tower.getChildByName("Tower").getComponent(cc.Sprite).spriteFrame = this.greenTowerSpriteFrame;
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_DRAGON_TOWER:
          this.tower.getChildByName("Cannon").getComponent("Cannon").towerAnimationName = "PurpleCastleTower";
          break;

         case Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER:
          this.tower.getChildByName("Cannon").getComponent("Cannon").towerAnimationName = "FireCastleTower";
          this.tower.getChildByName("Tower").getChildByName("Animation").getComponent(cc.Sprite).spriteFrame = this.fireCastleTowerSpriteFrame;
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_TANK_TOWER:
          this.tower.name = "GreenTankTower";
          this.tower.getChildByName("Cannon").getComponent("Cannon").towerAnimationName = "GreenTankTower";
          break;

         case Constant_1.TOWER_SUB_TYPE.CREATIVE_TANK_TOWER:
          this.tower.name = "KhakiTankTower";
          this.tower.getChildByName("Cannon").getComponent("Cannon").towerAnimationName = "KhakiTankTower";
          this.tower.getChildByName("Tower").getChildByName("Animation").getComponent(cc.Sprite).spriteFrame = this.khakiTankTowerSpriteFrame;
          this.tower.getChildByName("Cannon").getComponent("Cannon").cannonPath_1 = this.khakiTankCannonPath1SpriteFrame;
          this.tower.getChildByName("Cannon").getComponent("Cannon").cannonPath_3 = this.khakiTankCannonPath3SpriteFrame;
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_BUG_TOWER:
          this.tower.name = "RedBugTower";
          this.tower.getChildByName("Cannon").getComponent("Cannon").towerAnimationName = "RedBugTower";
          break;

         case Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER:
          this.towerGlowAnimationClip = this.tower.getChildByName("TowerLighting").getComponent(cc.Animation).getClips()[1].name;
          this.tower.name = "PinkBugTower";
          this.tower.getChildByName("Tower").getChildByName("Animation").getComponent(cc.Sprite).spriteFrame = this.pinkBugTowerSpriteFrame;
          this.tower.getChildByName("Cannon").getComponent("Cannon").towerAnimationName = "PinkBugTower";
          this.tower.getChildByName("Cannon").getComponent("Cannon").cannonPath_1 = this.pinkBugCannonPath1SpriteFrame;
          this.tower.getChildByName("Cannon").getComponent("Cannon").cannonPath_3 = this.pinkBugCannonPath3SpriteFrame;
        }
        this.towerGlow = this.tower.getChildByName("TowerLighting");
        this.cannon = this.tower.getChildByName("Cannon");
      };
      GamePlay.prototype.changePathButtonStatus = function() {
        var avilablePaths = LevelManager_1.default.getInstance().getNumberOfPaths();
        var bgSpriteFrame = null;
        switch (avilablePaths) {
         case 1:
          bgSpriteFrame = this.oneLaneFooterBgButton;
          break;

         case 2:
          bgSpriteFrame = this.footerLeft.getComponent(cc.Sprite).spriteFrame;
        }
        for (var index = 0; index < avilablePaths; index++) {
          this.footerLeft.children[index].getComponent(cc.Button).interactable = this.isGameStart;
          this.footerLeft.children[index].active = true;
          avilablePaths < 3 && (this.footerLeft.getComponent(cc.Sprite).spriteFrame = bgSpriteFrame);
        }
        GameManager_1.default.getInstance().isDeviceIPad() && this.footerLeft.setScale(.8);
      };
      GamePlay.prototype.changeColorButtonStatus = function() {
        var avilableColors = LevelManager_1.default.getInstance().getNumberOfColorEnemy();
        var bgSpriteFrame = null;
        switch (avilableColors) {
         case 1:
          bgSpriteFrame = this.oneLaneFooterBgButton;
          break;

         case 2:
         case 3:
          bgSpriteFrame = this.footerRight.getComponent(cc.Sprite).spriteFrame;
        }
        for (var index = 0; index < avilableColors; index++) {
          this.footerRight.children[index].getComponent(cc.Button).interactable = this.isGameStart;
          this.footerRight.children[index].active = true;
          this.isGameStart ? this.footerRight.children[index].opacity = 255 : this.footerRight.children[index].opacity = 180;
          avilableColors < 4 && (this.footerRight.getComponent(cc.Sprite).spriteFrame = bgSpriteFrame);
        }
        GameManager_1.default.getInstance().isDeviceIPad() && this.footerRight.setScale(.8);
      };
      GamePlay.prototype.initalizeHeartLose = function() {
        var heartPos = this.tower.getChildByName("Tower").getChildByName("heartPosition");
        this.lifeLineLost = cc.instantiate(this.heartLose);
        var lifeLostPos = this.node.convertToNodeSpaceAR(this.tower.getChildByName("Tower").convertToWorldSpaceAR(new cc.Vec2(heartPos.x, heartPos.y)));
        this.lifeLineLost.x = lifeLostPos.x;
        this.lifeLineLost.y = lifeLostPos.y;
        this.node.addChild(this.lifeLineLost);
      };
      GamePlay.prototype.onSelectPathButtonCallback = function(event, customEventData) {
        var direction = this.getPathDirection(customEventData);
        if (cc.director.isPaused()) return;
        if (this.cannon.getComponent("Cannon").isAnimationPlaying) this.cannon.getComponent("Cannon").updateProperties(direction, customEventData); else {
          this.currentSelectedPath = customEventData;
          this.cannon.getComponent("Cannon").updateProperties(direction);
          this.topBarControllerScript.updateCurrentSelectedPath(customEventData);
        }
      };
      GamePlay.prototype.updatePathInfo = function(pathNo) {
        this.currentSelectedPath = pathNo;
        this.topBarControllerScript.updateCurrentSelectedPath(this.currentSelectedPath);
      };
      GamePlay.prototype.onKnightColorPathButtonCallback = function(event, customEventData) {
        var _this = this;
        if (cc.director.isPaused()) return;
        this.cannon.getComponent("Cannon").playAnimation();
        var cannonFireAnimation = cc.callFunc(function() {
          var pathData = _this.getCurrentPathData(_this.currentSelectedPath);
          var startPos = new cc.Vec2(_this.tower.getChildByName("StartPosDirection" + _this.cannon.getComponent("Cannon").direction).x, _this.tower.getChildByName("StartPosDirection" + _this.cannon.getComponent("Cannon").direction).y);
          var initPos = _this.node.convertToNodeSpaceAR(_this.tower.convertToWorldSpaceAR(new cc.Vec2(startPos.x, startPos.y)));
          _this.fireCannonBall(customEventData, _this.currentSelectedPath, pathData, initPos);
        }, this);
        this.node.runAction(cc.sequence(cc.delayTime(.1), cannonFireAnimation));
      };
      GamePlay.prototype.fireCannonBall = function(customEventData, path, pathData, initPos) {
        var cannonBall = cc.instantiate(this.cannonFireBall);
        this.path.addChild(cannonBall, this.maxLocalZOrder);
        var cannonBallKey = "CannonBall_" + this.ballCounter;
        this.ballCounter = this.ballCounter + 1;
        cannonBall.name = cannonBallKey;
        cannonBall.getComponent("CannonFireball").updateCannonBallProperties(cannonBallKey, customEventData, path, this.map, this.pathOffset);
        cannonBall.getComponent("CannonFireball").runFireballAnimation(path, pathData, initPos);
        SoundManager_1.default.getInstance().playEffect(this.audioClips[1], false, 1);
        this.cannonFireballRecord[cannonBallKey] = cannonBall;
      };
      GamePlay.prototype.updateStreak = function() {
        var _this = this;
        var leftFooterBarControllerScript = this.footerLeft.getParent().getComponent("FooterBarController");
        var rightFooterBarControllerScript = this.footerRight.getParent().getComponent("FooterBarController");
        var levelUp = this.currentWinningStreak / Constant_1.constant.STREAK_LEVEL_UP;
        if (Number.isInteger(levelUp) && levelUp > 0 && levelUp < 5) {
          this.playFireworkConfetti();
          var levelAudioClips = [ 0, 5, 6, 7, 8 ];
          cc.tween(this.node).call(function() {
            SoundManager_1.default.getInstance().playEffect(_this.audioClips[9], false, 1);
          }).delay(.2).call(function() {
            SoundManager_1.default.getInstance().playEffect(_this.audioClips[levelAudioClips[levelUp]], false, 1);
          }).start();
          this.playTowerStreakAnimation(levelUp);
          this.topBarControllerScript.lightAnimation(levelUp);
          leftFooterBarControllerScript.lightAnimation(levelUp);
          rightFooterBarControllerScript.lightAnimation(levelUp);
        } else if (true == this.topBarControllerScript.lightingStreak.node.active && 0 == this.currentWinningStreak) {
          SoundManager_1.default.getInstance().audioPool.length > 0 && SoundManager_1.default.getInstance().stopAllSounds();
          SoundManager_1.default.getInstance().playEffect(this.audioClips[10], false, 1);
        }
        this.topBarControllerScript.updateStreakCounter(this.currentWinningStreak);
      };
      GamePlay.prototype.updateLifeCounter = function() {
        this.topBarControllerScript.updateLifeCounter(this.maxLife);
      };
      GamePlay.prototype.addKnightInGame = function(knightColor, selectedPath, knightType, knightSpeed) {
        this.knightCounter = this.knightCounter + 1;
        var knightKey = "Path_" + selectedPath + "_Knight_" + this.knightCounter.toString();
        var zOrder = this.maxLocalZOrder - this.knightCounter;
        var knightRef = null;
        var bezierPathData = [];
        var flyDirection = null;
        knightRef = cc.instantiate(this.knight);
        knightRef.name = knightKey;
        knightRef.getChildByName("Name").getComponent(cc.Label).string = knightKey;
        this.path.addChild(knightRef);
        knightRef.zIndex = zOrder;
        var pathData = this.getCurrentPathData(selectedPath);
        if ("Flying" == knightType) {
          bezierPathData = this.getCurrentBezierPathData(selectedPath);
          flyDirection = this.getFlyDirection(selectedPath);
          knightRef.getComponent("Knight").playFlyingAudioEffect(this.audioClips[14]);
          knightRef.getComponent("Knight").updateKnightProperties(knightColor, selectedPath, 1, __spreadArrays(pathData), knightType, this.map, knightSpeed, this.difficulty, this.isFinalRush, __spreadArrays(bezierPathData), flyDirection);
        } else {
          knightRef.getComponent("Knight").updateKnightProperties(knightColor, selectedPath, 1, __spreadArrays(pathData), knightType, this.map, knightSpeed, this.difficulty, this.isFinalRush, __spreadArrays(bezierPathData), flyDirection);
          knightRef.getComponent("Knight").move();
        }
        this.knightRecord[knightRef.name] = knightRef;
      };
      GamePlay.prototype.addKnightInProgressBar = function(selectedKnight, knightPath, knightKey, color) {
        this.topBarControllerScript.addKnightToProgressBar(selectedKnight, knightPath, color, knightKey);
      };
      GamePlay.prototype.getKnightRecord = function() {
        return this.knightRecord;
      };
      GamePlay.prototype.getShieldRecord = function() {
        return this.shieldRecord;
      };
      GamePlay.prototype.knightMovement = function() {
        var _this = this;
        Object.keys(this.knightRecord).forEach(function(knightKey) {
          var knight = _this.knightRecord[knightKey];
          var knightMovementInPercentage = knight.getComponent("Knight").totalDistanceMovedInPer;
          knight.getComponent("Knight").isInsideMap && knight.getComponent("Knight").isOnPath && _this.topBarControllerScript.moveKnightInTopBar(knightMovementInPercentage, knightKey);
        });
      };
      GamePlay.prototype.knightAttackedTower = function() {
        var _this = this;
        SoundManager_1.default.getInstance().playEffect(this.audioClips[4], false, 1);
        this.lifeLineLost.active = true;
        var callBack = cc.callFunc(function() {
          _this.lifeLineLost.active = false;
        });
        this.lifeLineLost.runAction(cc.sequence(cc.delayTime(1), callBack));
        this.maxLife = this.maxLife - 1 >= 0 ? this.maxLife - 1 : 0;
        this.updateLifeCounter();
        this.currentWinningStreak > 0 && this.userStreaks.push(this.currentWinningStreak);
        this.currentWinningStreak = 0;
        this.stopLightingAnimation();
        this.updateStreak();
        var leftFooterBarControllerScript = this.footerLeft.getParent().getComponent("FooterBarController");
        var rightFooterBarControllerScript = this.footerRight.getParent().getComponent("FooterBarController");
        this.topBarControllerScript.stopLightAnimation();
        leftFooterBarControllerScript.stopLightAnimation();
        rightFooterBarControllerScript.stopLightAnimation();
      };
      GamePlay.prototype.increaseKnightsSpeed = function() {
        var _this = this;
        var final = this.node.getChildByName("FinalRush").getChildByName("Final");
        var rush = this.node.getChildByName("FinalRush").getChildByName("Rush");
        SoundManager_1.default.getInstance().playEffect(this.audioClips[9], false, 1);
        cc.tween(final).call(function() {
          final.active = true;
        }).to(.6, {
          scale: 1
        }, {
          easing: "elasticOut"
        }).delay(1.2).call(function() {
          final.active = false;
        }).start();
        cc.tween(rush).delay(.2).call(function() {
          rush.active = true;
        }).to(.6, {
          scale: 1
        }, {
          easing: "elasticOut"
        }).delay(1).call(function() {
          rush.active = false;
        }).start();
        Object.keys(this.knightRecord).forEach(function(knightKey) {
          var knight = _this.knightRecord[knightKey];
          knight.getComponent("Knight").changeSpeedOfKnight();
        });
      };
      GamePlay.prototype.detectCollision = function() {
        this.onShieldCollision();
        this.onKnightCollision();
        this.onItemCollision();
      };
      GamePlay.prototype.onItemCollision = function() {
        var _this = this;
        var _loop_1 = function(path) {
          itemsOnPath = Object.keys(this_1.itemsRecord).filter(function(knightItemKey) {
            return knightItemKey.includes("Path_" + path);
          });
          knightsOnPath = Object.keys(this_1.knightRecord).filter(function(knightItemKey) {
            return knightItemKey.includes("Path_" + path);
          });
          itemsOnPath.forEach(function(itemKey) {
            var item = _this.itemsRecord[itemKey];
            knightsOnPath.forEach(function(knightKey) {
              var knight = _this.knightRecord[knightKey];
              if (!_this.isGameEnd && itemKey.includes("LandMine") && item.getChildByName("LandMineCollider").active && knight && knight.getComponent("Knight").isOnPath && cc.Intersection.rectRect(item.getChildByName("LandMineCollider").getBoundingBoxToWorld(), knight.getChildByName("Bg").getBoundingBoxToWorld())) {
                item.getChildByName("LandMineCollider").active = false;
                item.getChildByName("Animation").getComponent(cc.Animation).play("LandMineBlast");
                SoundManager_1.default.getInstance().playEffect(_this.audioClips[17], false, 1);
                item.getComponent(cc.Sprite).enabled = false;
                SoundManager_1.default.getInstance().playEffect(_this.audioClips[2], false, 1);
                cc.tween(_this.node).call(function() {
                  knight.stopAllActions();
                  knight.getComponent("Knight").PlayDeadAnimation();
                  _this.showKnightKillScore(knight);
                }).delay(.6).call(function() {
                  knight.removeFromParent();
                  _this.itemRemovedFromGamePlay(itemKey);
                }).start();
                _this.knightRemovedFromGamePlay(knightKey);
                _this.currentWinningStreak = _this.currentWinningStreak + 1;
                _this.updateStreak();
              } else if (!_this.isGameEnd && itemKey.includes("MonkeyCanon") && item && !item.getComponent("Item").alreadyCollideKnights.includes(knightKey) && item.getChildByName("MonkeyCanonCollider").active && knight && knight.getComponent("Knight").isOnPath && item.getComponent("Item").detectCollisionWithKnightAndCannonRange(knight.getChildByName("Bg").getBoundingBoxToWorld())) {
                item.getComponent(cc.Sprite).enabled = false;
                var i = 1;
                var cannonFireAnimation = [];
                1 == item.getComponent("Item").maxBallsToFire && (i = knight.getComponent("Knight").lifeCount);
                for (;i <= knight.getComponent("Knight").lifeCount; ++i) {
                  cannonFireAnimation.push(cc.callFunc(function() {
                    item.getComponent("Item").isBackside ? item.getChildByName("Animation").getComponent(cc.Animation).play("MonkeyCanonFireRight") : item.getChildByName("Animation").getComponent(cc.Animation).play("MonkeyCanonFireLeft");
                    var initPos = cc.v2(item.x - 25, item.y - 5);
                    item.scaleX < 0 && !item.getComponent("Item").isBackside ? initPos = cc.v2(item.x + 25, item.y - 5) : item.scaleX < 0 && item.getComponent("Item").isBackside ? initPos = cc.v2(item.x - 20, item.y + 20) : item.scaleX > 0 && item.getComponent("Item").isBackside && (initPos = cc.v2(item.x + 20, item.y + 20));
                    _this.fireCannonBall(knight.getComponent("Knight").color, path, item.getComponent("Item").pathData, initPos);
                    item.getComponent("Item").updateBallsOfMonkeyCanon();
                    item.getComponent("Item").checkIfMonkeyCanonHasAnyBallLeft();
                  }, _this));
                  cannonFireAnimation.push(cc.delayTime(.2));
                  i == knight.getComponent("Knight").lifeCount && item.getComponent("Item").alreadyCollideKnights.push(knightKey);
                }
                cannonFireAnimation.length >= 1 && _this.node.runAction(cc.sequence(__spreadArrays([ cc.delayTime(.1) ], cannonFireAnimation)));
              } else if (!_this.isGameEnd && itemKey.includes("DragonFire") && _this.path.getChildByName("DragonParticle" + itemKey) && knight && knight.getComponent("Knight").isOnPath && cc.Intersection.rectRect(_this.path.getChildByName("DragonParticle" + itemKey).getChildByName("Collider").getBoundingBoxToWorld(), knight.getChildByName("Bg").getBoundingBoxToWorld())) {
                SoundManager_1.default.getInstance().playEffect(_this.audioClips[2], false, 1);
                cc.tween(_this.node).call(function() {
                  knight.stopAllActions();
                  knight.getComponent("Knight").PlayDeadAnimation();
                  _this.showKnightKillScore(knight);
                }).delay(.6).call(function() {
                  knight.removeFromParent();
                }).start();
                _this.knightRemovedFromGamePlay(knightKey);
                _this.currentWinningStreak = _this.currentWinningStreak + 1;
                _this.updateStreak();
              }
            });
          });
        };
        var this_1 = this, itemsOnPath, knightsOnPath;
        for (var path = 1; path <= this.maxNumberOfPath; ++path) _loop_1(path);
      };
      GamePlay.prototype.onShieldCollision = function() {
        var _this = this;
        Object.keys(this.shieldRecord).forEach(function(shieldKey) {
          Object.keys(_this.cannonFireballRecord).forEach(function(fireballKey) {
            var fireball = _this.cannonFireballRecord[fireballKey];
            var fireballCollider = fireball.getChildByName("Collider");
            var knightShield = _this.shieldRecord[shieldKey];
            var knightShieldRect = knightShield && knightShield.getChildByName("BoundingBox").active ? knightShield.getChildByName("BoundingBox").getBoundingBoxToWorld() : null;
            if (knightShield && knightShield.active && knightShield.getChildByName("BoundingBox").active && knightShieldRect.intersects(fireballCollider.getBoundingBoxToWorld()) && knightShield.getComponent("Shield").color == fireball.getComponent("CannonFireball").type) {
              var knightShieldLifeCount = knightShield.getChildByName("LifeCount").getComponent(cc.Label);
              knightShieldLifeCount.string = (parseInt(knightShieldLifeCount.string) - 1).toString();
              if (knightShieldLifeCount.string < 3) {
                knightShield.getComponent("Shield").shieldMaterial.setProperty("u_dS", -.29);
                _this.path.getChildByName(shieldKey + "Arc").getComponent("Shield").shieldMaterial.setProperty("u_dS", -.29);
              }
              if (0 == knightShieldLifeCount.string) {
                knightShield.parent.removeFromParent(true);
                _this.path.getChildByName(shieldKey + "Arc").removeFromParent(true);
                SoundManager_1.default.getInstance().playEffect(_this.audioClips[13], false, 1);
                delete _this.shieldRecord[shieldKey];
                fireball.removeFromParent(true);
                _this.cannonBallRemovedFromGamePlay(fireball.name);
              } else if (knightShieldLifeCount.string > 0) {
                _this.cannonBallRemovedFromGamePlay(fireball.name);
                var fireBallBlastAnimation = cc.callFunc(function() {
                  fireball.stopAllActions();
                  fireball.getComponent("CannonFireball").playBlastAnimation();
                }, fireball);
                fireball.runAction(fireBallBlastAnimation);
              }
            } else knightShield && knightShield.active && knightShield.getChildByName("BoundingBox").active && knightShieldRect.intersects(fireballCollider.getBoundingBoxToWorld()) && knightShield.getComponent("Shield").color != fireball.getComponent("CannonFireball").type && _this.onLifeLost(fireball);
          });
        });
      };
      GamePlay.prototype.onKnightCollision = function() {
        var _this = this;
        Object.keys(this.knightRecord).forEach(function(knightKey) {
          var knight = _this.knightRecord[knightKey];
          Object.keys(_this.cannonFireballRecord).forEach(function(fireballKey) {
            var fireball = _this.cannonFireballRecord[fireballKey];
            var knightBg = knight.getChildByName("Bg");
            var knightRect = knightBg.getBoundingBoxToWorld();
            var fireballCollider = fireball.getChildByName("Collider");
            if (knightBg.active && knight.getComponent("Knight").isOnPath && knightRect.intersects(fireballCollider.getBoundingBoxToWorld()) && knight.getComponent("Knight").path == fireball.getComponent("CannonFireball").currentPath && (knight.getComponent("Knight").color == fireball.getComponent("CannonFireball").type || knight.getComponent("Knight").knightType == Knight_1.KNIGHT_TYPE.Dark && knight.getComponent("Knight").lifeCount > 1)) {
              knight.getComponent("Knight").lifeCount--;
              if (0 == knight.getComponent("Knight").lifeCount) {
                SoundManager_1.default.getInstance().playEffect(_this.audioClips[2], false, 1);
                cc.tween(_this.node).call(function() {
                  knight.stopAllActions();
                  knight.getComponent("Knight").PlayDeadAnimation();
                }).delay(.8).call(function() {
                  knight.removeFromParent();
                }).start();
                _this.showKnightKillScore(knight);
                fireball.removeFromParent(true);
                _this.knightRemovedFromGamePlay(knight.name);
                _this.cannonBallRemovedFromGamePlay(fireball.name);
                _this.currentWinningStreak = _this.currentWinningStreak + 1;
                _this.updateStreak();
              } else if (knight.getComponent("Knight").lifeCount > 0) {
                _this.cannonBallRemovedFromGamePlay(fireball.name);
                var fireBallBlastAnimation = cc.callFunc(function() {
                  fireball.stopAllActions();
                  fireball.getComponent("CannonFireball").playBlastAnimation();
                  SoundManager_1.default.getInstance().playEffect(_this.audioClips[11], false, 1);
                }, fireball);
                fireball.runAction(fireBallBlastAnimation);
                knight.getComponent("Knight").updatePowerOfKnight();
                _this.topBarControllerScript.changeKnightInTopBar(knight.name);
              }
            } else knightBg.active && knight.getComponent("Knight").isOnPath && knightRect.intersects(fireballCollider.getBoundingBoxToWorld()) && knight.getComponent("Knight").path == fireball.getComponent("CannonFireball").currentPath && knight.getComponent("Knight").color != fireball.getComponent("CannonFireball").type && _this.onLifeLost(fireball);
          });
        });
      };
      GamePlay.prototype.onLifeLost = function(fireball) {
        var _this = this;
        SoundManager_1.default.getInstance().playEffect(this.audioClips[4], false, 1);
        this.lifeLineLost.active = true;
        var callBack = cc.callFunc(function() {
          _this.lifeLineLost.active = false;
        });
        this.lifeLineLost.runAction(cc.sequence(cc.delayTime(1), callBack));
        this.maxLife = this.maxLife - 1 >= 0 ? this.maxLife - 1 : 0;
        this.updateLifeCounter();
        this.currentWinningStreak > 0 && this.userStreaks.push(this.currentWinningStreak);
        this.currentWinningStreak = 0;
        this.stopLightingAnimation();
        this.updateStreak();
        var leftFooterBarControllerScript = this.footerLeft.getParent().getComponent("FooterBarController");
        var rightFooterBarControllerScript = this.footerRight.getParent().getComponent("FooterBarController");
        this.topBarControllerScript.stopLightAnimation();
        leftFooterBarControllerScript.stopLightAnimation();
        rightFooterBarControllerScript.stopLightAnimation();
        fireball.destroy();
        this.cannonBallRemovedFromGamePlay(fireball.name);
      };
      GamePlay.prototype.knightRemovedFromGamePlay = function(withKey) {
        delete this.knightRecord[withKey];
        this.topBarControllerScript.removeKnight(withKey);
      };
      GamePlay.prototype.itemRemovedFromGamePlay = function(itemKey) {
        this.itemsRecord[itemKey].removeFromParent();
        delete this.itemsRecord[itemKey];
      };
      GamePlay.prototype.cannonBallRemovedFromGamePlay = function(key) {
        delete this.cannonFireballRecord[key];
      };
      GamePlay.prototype.stopActionOfKnights = function() {
        var _this = this;
        this.clearFireBall();
        Object.keys(this.knightRecord).forEach(function(knightKey) {
          var knight = _this.knightRecord[knightKey];
          knight.stopAllActions();
          knight.getComponent(cc.Animation).stop();
        });
      };
      GamePlay.prototype.gameOver = function() {
        if (!this.isGameEnd) {
          SoundManager_1.default.getInstance().stopAllSounds();
          SoundManager_1.default.getInstance().playEffect(this.audioClips[10], false, 1);
          this.isGameEnd = true;
          this.stopActionOfKnights();
          this.node.getChildByName("PopUp").getComponent("PopUp").showLosePopUp();
          GameManager_1.default.getInstance().updateLoseCount();
          this.logLevelFailedEvent();
        }
      };
      GamePlay.prototype.logLevelFailedEvent = function() {
        var levelNumber = GameManager_1.default.getInstance().getUserCurrentLevel().toString();
        cc.sys.isMobile && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameAnalyticsManager", "levelFailedEvent", "(Ljava/lang/String;)V", levelNumber) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("GameAnalyticsManager", "levelFailedEvent:", levelNumber));
      };
      GamePlay.prototype.pauseGame = function(event, customEventData) {
        if (this.isPause) {
          this.topBarControllerScript.changeStatusOfPlayButton(true);
          this.topBarControllerScript.changeStatusOfPauseButton(false);
          cc.director.resume();
          this.isPause = false;
        } else {
          this.isPause = true;
          this.topBarControllerScript.changeStatusOfPauseButton(true);
          this.topBarControllerScript.changeStatusOfPlayButton(false);
          cc.director.pause();
        }
      };
      GamePlay.prototype.backButtonCallback = function(event, customEventData) {
        if (this.isPause) {
          this.topBarControllerScript.changeStatusOfPlayButton(true);
          this.topBarControllerScript.changeStatusOfPauseButton(false);
          cc.director.resume();
          this.isPause = false;
        }
        SoundManager_1.default.getInstance().stopAllSounds();
        SoundManager_1.default.getInstance().stopMusic();
        cc.director.loadScene("LevelSelection");
      };
      GamePlay.prototype.playFireworkConfetti = function() {
        SoundManager_1.default.getInstance().playEffect(this.audioClips[18], false, 1);
        this.node.getChildByName("Fireworks").getComponent(cc.Animation).play();
      };
      GamePlay.prototype.updateItemsInGamePlay = function() {
        var _this = this;
        if (this.isPause) return;
        var itemLayout = this.node.getChildByName("ItemLayout");
        itemLayout.children.forEach(function(item, index) {
          var itemCount = item.getChildByName("CountBG").getChildByName("Count").getComponent(cc.Label);
          switch (item.name) {
           case "LandMine":
            itemCount.string = GameManager_1.default.getInstance().getInGameLandMineItem().toString();
            break;

           case "MonkeyCanon":
            itemCount.string = GameManager_1.default.getInstance().getInGameMonkeyCannonItem().toString();
            break;

           case "DragonFire":
            itemCount.string = GameManager_1.default.getInstance().getInGameDragonItem().toString();
            break;

           case "MagicHeart":
            itemCount.string = GameManager_1.default.getInstance().getInGameHeartItem().toString();
          }
          if ("0" == itemCount.string) {
            item.getComponent(cc.Button).interactable = false;
            item.getChildByName("CountBG").active = false;
            item.getChildByName("Background").opacity = 120;
          } else {
            item.getChildByName("CountBG").active = true;
            item.getChildByName("Background").opacity = 255;
          }
          if ("MagicHeart" != item.name && "0" != itemCount.string) {
            item.on(cc.Node.EventType.TOUCH_START, _this.itemTouchStartCallback, _this);
            item.on(cc.Node.EventType.TOUCH_MOVE, _this.itemTouchMoveCallback, _this);
            item.on(cc.Node.EventType.TOUCH_END, _this.itemTouchEndCallback, _this);
            item.on(cc.Node.EventType.TOUCH_CANCEL, _this.itemTouchEndCallback, _this);
          }
        });
      };
      GamePlay.prototype.itemTouchStartCallback = function(event, customEventData) {
        if (this.isPause || this.isGameEnd) return;
        this.item = cc.instantiate(this.itemPrefab);
        switch (event.target.name) {
         case "LandMine":
          this.item.getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[0];
          this.item.width = 40;
          this.item.height = 30;
          break;

         case "MonkeyCanon":
          this.item.getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[1];
          this.item.width = 60;
          this.item.height = 50;
          break;

         case "DragonFire":
          this.item.getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[2];
          this.item.width = 60;
          this.item.height = 50;
        }
        var eventLocation = event.getLocation();
        this.path.addChild(this.item, this.maxLocalZOrder);
        this.item.position = this.path.convertToNodeSpaceAR(cc.v3(eventLocation.x, eventLocation.y, 0));
        this.item.name = event.target.name + "_" + ++this.itemCounter;
      };
      GamePlay.prototype.itemTouchMoveCallback = function(event, customEventData) {
        if (this.isPause || this.isGameEnd) return;
        var eventLocation = event.getLocation();
        this.item.position = this.path.convertToNodeSpaceAR(cc.v3(eventLocation.x, eventLocation.y, 0));
      };
      GamePlay.prototype.itemTouchEndCallback = function(event, customEventData) {
        var _this = this;
        if (this.isPause || this.isGameEnd) return;
        var eventLocation = event.getStartLocation();
        eventLocation = this.path.convertToNodeSpaceAR(cc.v3(eventLocation.x, eventLocation.y, 0));
        var pathInfo = this.checkIfItemIsOnPath(this.item);
        if (!pathInfo.isItemOnPath || this.isGameEnd) this.moveItemToBag(eventLocation, this.item); else {
          var path = pathInfo.path;
          this.item.name = "Path_" + path + this.item.name;
          if (this.item.name.includes("LandMine")) {
            var pathLandMineData = Object.keys(this.itemsRecord).filter(function(knightItemKey) {
              return knightItemKey.includes("Path_" + path + "LandMine");
            });
            for (var i = 0; i < pathLandMineData.length; ++i) {
              var landMineKey = pathLandMineData[i];
              cc.Intersection.rectRect(this.itemsRecord[landMineKey].getBoundingBox(), this.item.getBoundingBox()) && this.moveItemToBag(eventLocation, this.item);
            }
            cc.tween(this.item).to(.1, {
              position: cc.v3(pathInfo.position.x, pathInfo.position.y, 0)
            }).start();
            this.item.width += 10;
            this.item.height += 10;
            this.item.zIndex = -1;
          } else {
            var pathData = this.getCurrentPathData(path);
            cc.tween(this.item).to(.1, {
              position: cc.v3(pathInfo.position.x, pathInfo.position.y, 0)
            }).start();
            var pathDirection = pathData[pathData.length - (pathInfo.turnNo + 1)].pathDirection;
            switch (pathDirection) {
             case 1:
              if (0 == pathData[pathData.length - (pathInfo.turnNo + 1)].turnType) ; else {
                if (this.item.name.includes("MonkeyCanon")) {
                  this.item.getChildByName("MonkeyCanonBar").x = -this.item.getChildByName("MonkeyCanonBar").x;
                  this.item.getChildByName("MonkeyCanonRange").scale = -1;
                  this.item.getComponent(cc.Sprite).spriteFrame = this.monkeyCanonBackSpriteFrame;
                } else this.item.name.includes("Dragon") && (this.item.getComponent(cc.Sprite).spriteFrame = this.dragonBackSpriteFrame);
                this.item.getComponent("Item").isBackside = true;
              }
              break;

             case 0:
              if (0 == pathData[pathData.length - (pathInfo.turnNo + 1)].turnType) {
                if (this.item.name.includes("MonkeyCanon")) {
                  this.item.getChildByName("MonkeyCanonBar").x = -this.item.getChildByName("MonkeyCanonBar").x;
                  this.item.getChildByName("MonkeyCanonRange").scale = -1;
                  this.item.getComponent(cc.Sprite).spriteFrame = this.monkeyCanonBackSpriteFrame;
                } else this.item.name.includes("Dragon") && (this.item.getComponent(cc.Sprite).spriteFrame = this.dragonBackSpriteFrame);
                this.item.getComponent("Item").isBackside = true;
                this.item.scaleX = -1;
              } else this.item.scaleX = -1;
            }
            this.item.width = 70;
            this.item.height = 60;
            if (this.item.name.includes("MonkeyCanon")) {
              this.item.getChildByName("MonkeyCanonField").active = true;
              this.item.getChildByName("MonkeyCanonBar").active = true;
              this.item.getChildByName("MonkeyCanonRange").active = true;
              this.item.zIndex = this.item.parent.zIndex;
              for (var i = 0; i < pathInfo.turnNo; ++i) pathData.pop();
              this.item.getComponent("Item").setPathData(pathData);
              this.setPositionOfMonkeyCanonRange(this.item, pathInfo);
              this.getActionForMonkeyCanonRange(this.item);
            }
            if (this.item.name.includes("DragonFire")) {
              var dragonItem = this.item;
              var pathData_1 = this.getCurrentPathData(path);
              dragonItem.getComponent(cc.Sprite).enabled = false;
              if (dragonItem.getComponent("Item").isBackside) {
                dragonItem.getChildByName("Animation").scale = .75;
                dragonItem.getChildByName("Animation").getComponent(cc.Animation).play("DragonFireRight");
              } else {
                dragonItem.getChildByName("Animation").scale = .75;
                dragonItem.getChildByName("Animation").getComponent(cc.Animation).play("DragonFireLeft");
              }
              for (var i = 0; i < pathInfo.turnNo; ++i) pathData_1.pop();
              SoundManager_1.default.getInstance().playEffect(this.audioClips[16], false, 1);
              cc.tween(this.node).delay(.5).call(function() {
                _this.dragonParticle = cc.instantiate(_this.dragonParticlePrefab);
                _this.path.addChild(_this.dragonParticle);
                _this.dragonParticle.getComponent("DragonParticle").updateProperties(dragonItem.position, dragonItem.name);
                _this.dragonParticle.runAction(_this.dragonParticle.getComponent("DragonParticle").dragonParticleMoveAction(pathData_1, dragonItem.position, dragonItem.name));
              }).start();
            }
          }
          this.decreaseItemCount(event.target, eventLocation);
          this.itemsRecord[this.item.name] = this.item;
        }
      };
      GamePlay.prototype.itemButtonCallback = function(event, customEventData) {};
      GamePlay.prototype.moveItemToBag = function(eventLocation, item) {
        cc.tween(item).to(.3, {
          position: eventLocation
        }).call(function() {
          item.removeFromParent();
        }).start();
      };
      GamePlay.prototype.decreaseItemCount = function(item, eventLocation) {
        var itemCount = item.getChildByName("CountBG").getChildByName("Count").getComponent(cc.Label);
        if (parseInt(itemCount.string) >= 1) {
          switch (item.name) {
           case "LandMine":
            GameManager_1.default.getInstance().decrementInGameLandMineItem(1);
            itemCount.string = GameManager_1.default.getInstance().getInGameLandMineItem();
            break;

           case "MonkeyCanon":
            GameManager_1.default.getInstance().decrementInGameMonkeyCannonItem(1);
            itemCount.string = GameManager_1.default.getInstance().getInGameMonkeyCannonItem();
            break;

           case "DragonFire":
            GameManager_1.default.getInstance().decrementInGameDragonItem(1);
            itemCount.string = GameManager_1.default.getInstance().getInGameDragonItem();
            break;

           case "MagicHeart":
            GameManager_1.default.getInstance().decrementInGameHeartItem(1);
            itemCount.string = GameManager_1.default.getInstance().getInGameHeartItem();
          }
          if ("MagicHeart" != item.name && "0" == itemCount.string) {
            item.off(cc.Node.EventType.TOUCH_START, this.itemTouchStartCallback, this);
            item.off(cc.Node.EventType.TOUCH_MOVE, this.itemTouchMoveCallback, this);
            item.off(cc.Node.EventType.TOUCH_END, this.itemTouchEndCallback, this);
            item.off(cc.Node.EventType.TOUCH_CANCEL, this.itemTouchEndCallback, this);
          }
        } else "MagicHeart" != item.name && "0" == itemCount.string && this.moveItemToBag(eventLocation, item);
        if ("0" == itemCount.string) {
          item.getComponent(cc.Button).interactable = false;
          item.getChildByName("CountBG").active = false;
          item.getChildByName("Background").opacity = 120;
        }
      };
      GamePlay.prototype.magicHeartButtonCallback = function(event, customEventData) {
        if (this.isPause) return;
        SoundManager_1.default.getInstance().playEffect(this.audioClips[15], false, 1);
        this.decreaseItemCount(event.target, event.getLocation());
        this.maxLife += 1;
        this.updateLifeCounter();
        var magicHeart = this.node.getChildByName("MagicHeart");
        magicHeart.active = true;
        var heartPos = this.tower.getChildByName("Tower").getChildByName("heartPosition");
        var magicHeartPos = this.node.convertToNodeSpaceAR(this.tower.getChildByName("Tower").convertToWorldSpaceAR(new cc.Vec2(heartPos.x, heartPos.y)));
        magicHeart.x = magicHeartPos.x;
        magicHeart.y = magicHeartPos.y + 40;
        magicHeart.getComponent(cc.Animation).play("MagicHeart");
      };
      GamePlay.prototype.checkIfItemIsOnPath = function(item) {
        var pointA = new cc.Vec2(item.x, item.y - .5 * item.height);
        var pointB = new cc.Vec2(item.x, item.y + .5 * item.height);
        for (var i = 0; i < this.maxNumberOfPath; ++i) {
          var pathData = this.getCurrentPathData(i + 1);
          for (var j = 0; j < pathData.length - 2; ++j) if (!pathData[j + 1].pathFromCave) {
            var initialPosition1 = this.path.convertToNodeSpaceAR(this.map.node.convertToWorldSpaceAR(new cc.Vec2(pathData[j].x - .5 * this.map.node.width, pathData[j].y - .5 * this.map.node.height)));
            var initialPosition2 = this.path.convertToNodeSpaceAR(this.map.node.convertToWorldSpaceAR(new cc.Vec2(pathData[j + 1].x - .5 * this.map.node.width, pathData[j + 1].y - .5 * this.map.node.height)));
            var pos = this.getLineLineCollision(pointA, pointB, initialPosition1, initialPosition2);
            if (pos && pathData[j].pathFromCave) var dist = initialPosition1.sub(pos).mag();
            var distanceFromEndPoint = initialPosition1.sub(pos).mag();
            if (pos && item.name.includes("MonkeyCanon") && distanceFromEndPoint && Math.ceil(distanceFromEndPoint) <= 60) {
              var randomPos = initialPosition1;
              var n = .15;
              randomPos.x = (1 - n) * initialPosition1.x + n * initialPosition2.x;
              randomPos.y = (1 - n) * initialPosition1.y + n * initialPosition2.y;
            }
            if (pos && dist && Math.ceil(dist) >= 45) return {
              isItemOnPath: true,
              path: i + 1,
              position: pos,
              turnNo: pathData.length - (j + 1) - 1,
              distanceFromEndPoint: initialPosition1.sub(pos).mag()
            };
            if (pos && !dist) return {
              isItemOnPath: true,
              path: i + 1,
              position: pos,
              turnNo: pathData.length - (j + 1) - 1,
              distanceFromEndPoint: initialPosition1.sub(pos).mag()
            };
          }
        }
        return {
          isItemOnPath: false,
          path: 0,
          position: null,
          turnNo: null
        };
      };
      GamePlay.prototype.getActionForMonkeyCanonRange = function(item) {
        var monkeyCanonRange = item.getChildByName("MonkeyCanonRange");
        for (var i = 0; i < monkeyCanonRange.childrenCount; ++i) {
          monkeyCanonRange.children[i].active = true;
          var arrowAction = cc.tween(monkeyCanonRange.children[i]).delay(.1 * i).to(.1, {
            opacity: 255
          }).delay(.1 * (monkeyCanonRange.childrenCount - i)).to(.2, {
            opacity: 0
          });
          cc.tween(monkeyCanonRange.children[i]).then(arrowAction).repeatForever().start();
        }
      };
      GamePlay.prototype.setPositionOfMonkeyCanonRange = function(item, pathInfo) {
        var monkeyCanonRange = item.getChildByName("MonkeyCanonRange");
        var pathData = item.getComponent("Item").getPathData();
        pathData.pop();
        var index = pathData.length - 1;
        var lengthOfCannonRange = Math.sqrt(this.item.getChildByName("MonkeyCanonRange").width * this.item.getChildByName("MonkeyCanonRange").width + this.item.getChildByName("MonkeyCanonRange").height * this.item.getChildByName("MonkeyCanonRange").height);
        if (lengthOfCannonRange > pathInfo.distanceFromEndPoint && pathData.length >= 2) {
          var initialPosition1 = item.getChildByName("MonkeyCanonRange").convertToNodeSpaceAR(this.map.node.convertToWorldSpaceAR(new cc.Vec2(pathData[index].x - .5 * this.map.node.width, pathData[index].y - .5 * this.map.node.height)));
          var initialPosition2 = item.getChildByName("MonkeyCanonRange").convertToNodeSpaceAR(this.map.node.convertToWorldSpaceAR(new cc.Vec2(pathData[index - 1].x - .5 * this.map.node.width, pathData[index - 1].y - .5 * this.map.node.height)));
          if (pathData[index].pathFromCave) {
            index -= 1;
            initialPosition1 = item.getChildByName("MonkeyCanonRange").convertToNodeSpaceAR(this.map.node.convertToWorldSpaceAR(new cc.Vec2(pathData[index].x - .5 * this.map.node.width, pathData[index].y - .5 * this.map.node.height)));
            initialPosition2 = item.getChildByName("MonkeyCanonRange").convertToNodeSpaceAR(this.map.node.convertToWorldSpaceAR(new cc.Vec2(pathData[index - 1].x - .5 * this.map.node.width, pathData[index - 1].y - .5 * this.map.node.height)));
          }
          var distanceToPlaceArrow = 22;
          var slope = (initialPosition2.y - initialPosition1.y) / (initialPosition2.x - initialPosition1.x);
          var indexOfArrowToChangePos = Math.round(pathInfo.distanceFromEndPoint / 32);
          for (var i = indexOfArrowToChangePos; i < monkeyCanonRange.childrenCount; ++i) {
            var randomPos = initialPosition1;
            var dx = distanceToPlaceArrow / Math.sqrt(1 + slope * slope);
            var dy = slope * dx;
            var pathDirection = pathData[index].pathDirection;
            switch (pathDirection) {
             case 1:
              if (0 == pathData[index].turnType) if (monkeyCanonRange.scale > 0 && pathData[index + 1] && pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x - dx;
                randomPos.y = initialPosition1.y - dy;
              } else if (monkeyCanonRange.scale < 0 && pathData[index + 1] && 0 == pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scale = -1;
              } else if (monkeyCanonRange.scale > 0) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scaleX = -1;
              } else {
                randomPos.x = initialPosition1.x - dx;
                randomPos.y = initialPosition1.y - dy;
                monkeyCanonRange.children[i].scaleY = -1;
              } else if (monkeyCanonRange.scale > 0 && pathData[index + 1] && pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scale = -1;
              } else if (monkeyCanonRange.scale < 0 && pathData[index + 1] && 0 == pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
              } else if (monkeyCanonRange.scale > 0) {
                randomPos.x = initialPosition1.x - dx;
                randomPos.y = initialPosition1.y - dy;
                monkeyCanonRange.children[i].scaleY = -1;
              } else {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scaleX = -1;
              }
              break;

             case 0:
              if (0 == pathData[index].turnType) if (monkeyCanonRange.scale > 0 && pathData[index + 1] && 0 == pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scale = -1;
              } else if (monkeyCanonRange.scale < 0 && pathData[index + 1] && 0 == pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
              } else if (monkeyCanonRange.scale > 0) {
                randomPos.x = initialPosition1.x - dx;
                randomPos.y = initialPosition1.y - dy;
                monkeyCanonRange.children[i].scaleY = -1;
              } else {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scaleX = -1;
              } else if (monkeyCanonRange.scale > 0 && pathData[index + 1] && 0 == pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x - dx;
                randomPos.y = initialPosition1.y - dy;
              } else if (monkeyCanonRange.scale < 0 && pathData[index + 1] && 0 == pathData[index + 1].pathDirection) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scale = -1;
              } else if (monkeyCanonRange.scale > 0) {
                randomPos.x = initialPosition1.x + dx;
                randomPos.y = initialPosition1.y + dy;
                monkeyCanonRange.children[i].scaleX = -1;
              } else {
                randomPos.x = initialPosition1.x - dx;
                randomPos.y = initialPosition1.y - dy;
                monkeyCanonRange.children[i].scaleY = -1;
              }
            }
            monkeyCanonRange.children[i].position = cc.v3(randomPos.x, randomPos.y, 0);
          }
        }
      };
      GamePlay.prototype.clearFireBall = function() {
        var _this = this;
        if (this.isPause) return;
        Object.keys(this.cannonFireballRecord).forEach(function(fireballKey) {
          var fireball = _this.cannonFireballRecord[fireballKey];
          if (fireball.getComponent("CannonFireball").currentPath == _this.currentSelectedPath) {
            _this.cannonBallRemovedFromGamePlay(fireballKey);
            var fireBallBlastAnimation = cc.callFunc(function() {
              fireball.stopAllActions();
              fireball.getComponent("CannonFireball").playBlastAnimation();
            }, fireball);
            fireball.runAction(fireBallBlastAnimation);
          }
        });
      };
      GamePlay.prototype.showKnightKillScore = function(knight) {
        this.score++;
        var tower = this.map.getObjectGroup("Tower");
        var scorekill = cc.instantiate(this.killScore);
        var path = knight.getComponent("Knight").path;
        var scorePointPos = new cc.Vec2(this.tower.getChildByName("ScorePointDirection" + this.getPathDirection(path)).x, this.tower.getChildByName("ScorePointDirection" + this.getPathDirection(path)).y);
        var finalPosition = this.node.convertToNodeSpaceAR(this.tower.convertToWorldSpaceAR(new cc.Vec2(scorePointPos.x, scorePointPos.y)));
        var position = knight.getPosition();
        scorekill.setPosition(position.x, position.y);
        scorekill.zIndex = knight.zIndex;
        this.node.addChild(scorekill);
        scorekill.getComponent("KillScore").changeColor(knight.getComponent("Knight").color);
        var initialPos = scorekill.getPosition();
        var distace = Math.sqrt(Math.pow(finalPosition.x - initialPos.x, 2) + Math.pow(finalPosition.y - initialPos.y, 2));
        var time = distace / 1e3;
        var move = cc.moveTo(time, finalPosition.x, finalPosition.y);
        var bounce = cc.jumpTo(.5, cc.v2(scorekill.x, scorekill.y), 50, 1).easing(cc.easeBounceInOut());
        var playCoinAnimation = cc.callFunc(function() {
          scorekill.getComponent(cc.Animation).play("CoinAnimation");
        }, scorekill);
        scorekill.runAction(cc.sequence(bounce, cc.delayTime(.2), cc.spawn(move, playCoinAnimation), cc.hide(), cc.callFunc(this.playFireworks, this), cc.delayTime(1), cc.removeSelf()));
      };
      GamePlay.prototype.playFireworks = function() {
        SoundManager_1.default.getInstance().playEffect(this.audioClips[3], false, 1);
        var firework = this.tower.getChildByName("Fireworks");
        firework.active = true;
        for (var i = 0; i < firework.childrenCount; i++) firework.children[i].getComponent(cc.Animation).play();
      };
      GamePlay.prototype.playTowerStreakAnimation = function(level) {
        var towerBottomAnimationBase = this.tower.getChildByName("BottomStreak");
        towerBottomAnimationBase.active = true;
        var towerBaseAnimation = this.tower.getChildByName("TopStreak");
        towerBaseAnimation.active = true;
        var animationClips = towerBaseAnimation.getComponent(cc.Animation);
        this.towerLightingAnimation(level);
        animationClips.on("finished", this.towerStreakAnimationCompleted, this);
        towerBaseAnimation.getComponent(cc.Animation).play(Constant_1.LIGHTING_SELECTED[level] + "Top");
        towerBottomAnimationBase.getComponent(cc.Animation).play(Constant_1.LIGHTING_SELECTED[level] + "Bottom");
      };
      GamePlay.prototype.towerStreakAnimationCompleted = function() {
        this.tower.getChildByName("BottomStreak").active = false;
        this.tower.getChildByName("TopStreak").active = false;
      };
      GamePlay.prototype.towerLightingAnimation = function(level) {
        this.towerGlow.color = Constant_1.LIGHTING_COLOR[Constant_1.LIGHTING_SELECTED[level]];
        this.towerGlow.active = true;
        this.towerGlow.getComponent(cc.Animation).play(this.towerGlowAnimationClip);
      };
      GamePlay.prototype.update = function(dt) {
        var _this = this;
        0 == this.maxLife && this.gameOver();
        this.knightCounter == this.maximumKnight && 0 == Object.keys(this.knightRecord).length && cc.tween(this.node).delay(2).call(function() {
          _this.moveToNextLevel();
        }).start();
        if (!this.isFinalRush && this.knightCounter == Math.floor(.85 * this.maximumKnight)) {
          this.isFinalRush = true;
          this.increaseKnightsSpeed();
        }
        this.detectCollision();
        this.knightMovement();
        -1 == this.timer ? this.timer += 2 : this.timer = this.timer + 1;
        if (this.isGameStart && !this.isGameEnd && null != this.map.tmxAsset && this.timer % this.timeForKnightSpawning == 0 && this.knightCounter < this.maximumKnight) {
          var knightInfo = LevelManager_1.default.getInstance().getRandomKnight();
          Knight_1.KNIGHT_TYPE[knightInfo.type] == Knight_1.KNIGHT_TYPE.Large || Knight_1.KNIGHT_TYPE[knightInfo.type] == Knight_1.KNIGHT_TYPE.Flying || Knight_1.KNIGHT_TYPE[knightInfo.type] == Knight_1.KNIGHT_TYPE.Dark ? this.timer = -(this.timeForKnightSpawning - 5) : this.timer = 0;
          this.addKnightInGame(knightInfo.color, knightInfo.path, knightInfo.type, knightInfo.speed);
        }
      };
      GamePlay.prototype.stopLightingAnimation = function() {
        this.towerGlow.getComponent(cc.Animation).stop(this.towerGlowAnimationClip);
        this.towerGlow.active = false;
        this.towerStreakAnimationCompleted();
      };
      GamePlay.prototype.getCurrentPathData = function(pathNo) {
        var path = this.map.getObjectGroup("Path" + pathNo);
        var pathData = path.getObjects().filter(function(item) {
          return item.name.includes("turn");
        });
        pathData = pathData.sort(function(obj1, obj2) {
          if (obj1.name < obj2.name) return -1;
          if (obj1.name > obj2.name) return 1;
          return 0;
        });
        return __spreadArrays(pathData);
      };
      GamePlay.prototype.getCurrentBezierPathData = function(pathNo) {
        var path = this.map.getObjectGroup("BezierPath" + pathNo);
        var pathData = path.getObjects().filter(function(item) {
          return item.name.includes("point");
        });
        pathData = pathData.sort(function(obj1, obj2) {
          if (obj1.name < obj2.name) return -1;
          if (obj1.name < obj2.name) return 1;
          return 0;
        });
        return __spreadArrays(pathData);
      };
      GamePlay.prototype.getFlyDirection = function(pathNo) {
        var pathInfo = this.map.getObjectGroup("BezierPath" + pathNo);
        var direction = pathInfo._properties.direction;
        return direction;
      };
      GamePlay.prototype.getPathDirection = function(pathNo) {
        var pathInfo = this.map.getObjectGroup("Path" + pathNo);
        var direction = pathInfo._properties.direction;
        switch (direction) {
         case 0:
          return 4;

         case 1:
          return 3;

         case 2:
          return 2;

         case 3:
          return 1;
        }
      };
      GamePlay.prototype.playSheildAppearSound = function() {
        SoundManager_1.default.getInstance().playEffect(this.audioClips[12], false, 1);
      };
      GamePlay.prototype.moveToNextLevel = function() {
        if (!this.isGameEnd) {
          this.logLevelCompleteEvent();
          this.currentWinningStreak > 0 && this.userStreaks.push(this.currentWinningStreak);
          this.userStreaks.sort(function(a, b) {
            return a - b;
          });
          var highestStreak = this.userStreaks.pop();
          var bestStreak = 0;
          if (this.userStreaks.length > 0) {
            var totalStreakSum = this.userStreaks.reduce(function(sum, value) {
              return sum + value;
            }, 0);
            var averageStreak = totalStreakSum / this.userStreaks.length;
            bestStreak = (highestStreak + averageStreak) / this.maximumKnight * 100;
          } else bestStreak = highestStreak / this.maximumKnight * 100;
          SoundManager_1.default.getInstance().playEffect(this.audioClips[9], false, 1);
          this.stopActionOfKnights();
          this.isGameEnd = true;
          var levelInfo = GameManager_1.default.getInstance().getLevelData();
          this.updatePlayerStats();
          levelInfo[this.currentLevel - 1].totalScore = this.maximumKnight;
          if (levelInfo[this.currentLevel - 1].difficulty < this.difficulty || levelInfo[this.currentLevel - 1].achievedScore <= Math.round(bestStreak) && levelInfo[this.currentLevel - 1].difficulty <= this.difficulty) {
            levelInfo[this.currentLevel - 1].achievedScore = Math.round(bestStreak);
            levelInfo[this.currentLevel - 1].difficulty = this.difficulty;
          }
          GameManager_1.default.getInstance().setLevelData(levelInfo);
          this.playFireworkConfetti();
          this.node.getChildByName("PopUp").getComponent("PopUp").showWinPopUp(Math.round(bestStreak));
          GameManager_1.default.getInstance().setConsequitiveLevelLose("0");
        }
      };
      GamePlay.prototype.logLevelCompleteEvent = function() {
        var levelNumber = GameManager_1.default.getInstance().getUserCurrentLevel().toString();
        cc.sys.isMobile && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameAnalyticsManager", "levelCompleteEvent", "(Ljava/lang/String;)V", levelNumber) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("GameAnalyticsManager", "levelCompleteEvent:", levelNumber));
      };
      GamePlay.prototype.updatePlayerStats = function() {
        GameManager_1.default.getInstance().setLastLevelPlayed(this.currentLevel);
        var unlockLevel = GameManager_1.default.getInstance().getLevelUnlocked();
        var totalLevels = GameManager_1.default.getInstance().getTotalLevels();
        var currentLevel = GameManager_1.default.getInstance().getUserCurrentLevel();
        var lastPlayedLevel = GameManager_1.default.getInstance().getLastLevelPlayed();
        if (unlockLevel + 1 <= totalLevels && unlockLevel <= this.currentLevel) {
          GameManager_1.default.getInstance().setLevelUnlocked(this.currentLevel + 1);
          unlockLevel = this.currentLevel + 1;
        }
        GameManager_1.default.getInstance().setUserCurrentLevel(lastPlayedLevel == unlockLevel ? unlockLevel : this.currentLevel + 1);
      };
      GamePlay.prototype.drawLine = function(ax, ay, bx, by, color) {
        var ddawing = this.path.getComponent(cc.Graphics);
        ddawing.lineWidth = 5;
        ddawing.moveTo(ax, ay);
        ddawing.lineTo(bx, by);
        ddawing.strokeColor = color;
        ddawing.stroke();
      };
      GamePlay.prototype.getLineLineCollision = function(p0, p1, p2, p3) {
        var s1, s2;
        s1 = {
          x: p1.x - p0.x,
          y: p1.y - p0.y
        };
        s2 = {
          x: p3.x - p2.x,
          y: p3.y - p2.y
        };
        var s10_x = p1.x - p0.x;
        var s10_y = p1.y - p0.y;
        var s32_x = p3.x - p2.x;
        var s32_y = p3.y - p2.y;
        var denom = s10_x * s32_y - s32_x * s10_y;
        if (0 == denom) return false;
        var denom_positive = denom > 0;
        var s02_x = p0.x - p2.x;
        var s02_y = p0.y - p2.y;
        var s_numer = s10_x * s02_y - s10_y * s02_x;
        if (s_numer < 0 == denom_positive) return false;
        var t_numer = s32_x * s02_y - s32_y * s02_x;
        if (t_numer < 0 == denom_positive) return false;
        if (s_numer > denom == denom_positive || t_numer > denom == denom_positive) return false;
        var t = t_numer / denom;
        var p = {
          x: p0.x + t * s10_x,
          y: p0.y + t * s10_y
        };
        return p;
      };
      GamePlay.prototype.enemyTutorialOver = function() {
        this.pauseGame(null, null);
      };
      GamePlay.prototype.showEnemyIntroduction = function() {
        var type = this.getEnemyType();
        if (-1 == type) return;
        var data = GameManager_1.default.getInstance().getEnemyTutorialStatus();
        var status = data[Utility_1.Utility.getEnemyStatusTutKey(type)];
        if (status) {
          this.pauseGame(null, null);
          this.loadEnemyIntroPrefab(type);
        }
      };
      GamePlay.prototype.getEnemyType = function() {
        var type = -1;
        switch (this.currentLevel) {
         case 4:
          type = Constant_1.ENEMY_TYPE.LARGE_KNIGHT;
          break;

         case 12:
          type = Constant_1.ENEMY_TYPE.DARK_KNIGHT;
          break;

         case 19:
          type = Constant_1.ENEMY_TYPE.FLYING_KNIGHT;
          break;

         case 23:
          type = Constant_1.ENEMY_TYPE.WIZARD;
          break;

         default:
          type = -1;
        }
        return type;
      };
      __decorate([ property(cc.Node) ], GamePlay.prototype, "topBarController", void 0);
      __decorate([ property(cc.Node) ], GamePlay.prototype, "footerLeft", void 0);
      __decorate([ property(cc.Node) ], GamePlay.prototype, "footerMiddle", void 0);
      __decorate([ property(cc.Node) ], GamePlay.prototype, "footerRight", void 0);
      __decorate([ property(cc.TiledMap) ], GamePlay.prototype, "map", void 0);
      __decorate([ property(cc.Prefab) ], GamePlay.prototype, "knight", void 0);
      __decorate([ property(cc.Prefab) ], GamePlay.prototype, "cannonFireBall", void 0);
      __decorate([ property(cc.Prefab) ], GamePlay.prototype, "killScore", void 0);
      __decorate([ property(cc.Prefab) ], GamePlay.prototype, "heartLose", void 0);
      __decorate([ property(cc.AnimationClip) ], GamePlay.prototype, "portalAnimationClip", void 0);
      __decorate([ property([ cc.AudioClip ]) ], GamePlay.prototype, "audioClips", void 0);
      __decorate([ property(cc.Node) ], GamePlay.prototype, "path", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "oneLaneFooterBgButton", void 0);
      __decorate([ property(cc.Prefab) ], GamePlay.prototype, "itemPrefab", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], GamePlay.prototype, "itemSpriteFrames", void 0);
      __decorate([ property(cc.Prefab) ], GamePlay.prototype, "dragonParticlePrefab", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "monkeyCanonBackSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "dragonBackSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "blueTowerSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "purpleTowerSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "greenTowerSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "fireCastleTowerSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "khakiTankTowerSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "khakiTankCannonPath1SpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "khakiTankCannonPath3SpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "pinkBugTowerSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "pinkBugCannonPath1SpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], GamePlay.prototype, "pinkBugCannonPath3SpriteFrame", void 0);
      GamePlay = __decorate([ ccclass ], GamePlay);
      return GamePlay;
    }(Base_1.default);
    exports.default = GamePlay;
    cc._RF.pop();
  }, {
    "./Base/Base": "Base",
    "./Constant": "Constant",
    "./Knight": "Knight",
    "./Manager/AdManager": "AdManager",
    "./Manager/GameManager": "GameManager",
    "./Manager/LevelManager": "LevelManager",
    "./Manager/SoundManager": "SoundManager",
    "./Utilities/MessageCenter": "MessageCenter",
    "./Utilities/Utility": "Utility"
  } ],
  GemsPanelItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8ac1fXH6pdIoqYQzLdbSBTS", "GemsPanelItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GemsPanelItem = function(_super) {
      __extends(GemsPanelItem, _super);
      function GemsPanelItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gemsCount = 1500;
        _this.gemsLabel = null;
        _this.icon = null;
        return _this;
      }
      GemsPanelItem.prototype.onLoad = function() {
        this.gemsLabel.string = this.gemsCount.toString();
      };
      GemsPanelItem.prototype.onBtnCallback = function(event, customData) {
        var frame = this.icon.spriteFrame;
        var data = {
          frame: frame,
          gemsCount: this.gemsCount,
          purchaseID: customData
        };
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.GEMS_PURCHASED_EVENT, data);
      };
      __decorate([ property(cc.Integer) ], GemsPanelItem.prototype, "gemsCount", void 0);
      __decorate([ property(cc.Label) ], GemsPanelItem.prototype, "gemsLabel", void 0);
      __decorate([ property(cc.Sprite) ], GemsPanelItem.prototype, "icon", void 0);
      GemsPanelItem = __decorate([ ccclass ], GemsPanelItem);
      return GemsPanelItem;
    }(cc.Component);
    exports.default = GemsPanelItem;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter"
  } ],
  GeneralPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ef2e9mJYtATptgKmLXmiI+", "GeneralPopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SoundManager_1 = require("../Manager/SoundManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GeneralPopup = function(_super) {
      __extends(GeneralPopup, _super);
      function GeneralPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.message = null;
        _this.okButton = null;
        return _this;
      }
      GeneralPopup.prototype.showPopup = function(data) {
        this.title.string = data.title;
        this.message.string = data.message;
      };
      GeneralPopup.prototype.closeButtonCB = function(evenType, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.node.removeFromParent(true);
      };
      __decorate([ property(cc.Label) ], GeneralPopup.prototype, "title", void 0);
      __decorate([ property(cc.Label) ], GeneralPopup.prototype, "message", void 0);
      __decorate([ property(cc.Button) ], GeneralPopup.prototype, "okButton", void 0);
      GeneralPopup = __decorate([ ccclass ], GeneralPopup);
      return GeneralPopup;
    }(cc.Component);
    exports.default = GeneralPopup;
    cc._RF.pop();
  }, {
    "../Manager/SoundManager": "SoundManager"
  } ],
  HUD: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8b40I3Jh5JK49J0pWnIDpy", "HUD");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var MessageCenter_1 = require("./Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HUD = function(_super) {
      __extends(HUD, _super);
      function HUD() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.energyTimer = null;
        _this.energyPoints = null;
        _this.coinsCount = null;
        _this.gemsCount = null;
        _this.sceneName = null;
        _this.backButton = null;
        _this.activeRoundButton = null;
        _this.inactiveRoundButton = null;
        _this.soundButton = null;
        _this.musicButton = null;
        _this.settingPanel = null;
        _this.lastPlayedMusic = null;
        _this.lastScene = "";
        _this.gemsCounter = 0;
        _this.coinsCounter = 0;
        _this.energyCounter = 0;
        _this.energyCountdownTimer = 12780;
        _this.energyRewardTimeoutRef = null;
        _this.energyRemainingTimeInSec = null;
        return _this;
      }
      HUD.prototype.onLoad = function() {
        this.gemsCounter = GameManager_1.default.getInstance().getGameGems();
        this.coinsCounter = GameManager_1.default.getInstance().getGameCoins();
        this.energyCounter = GameManager_1.default.getInstance().getGameEnergy();
        this.switchTimerLabel();
        this.gemsCount.getComponent(cc.Label).string = this.gemsCounter.toString();
        this.coinsCount.getComponent(cc.Label).string = this.coinsCounter.toString();
        this.energyPoints.getComponent(cc.Label).string = this.energyCounter.toString();
        var soundActiveRoundButton = this.soundButton.getChildByName("Background").getChildByName("active");
        var musicActiveRoundButton = this.musicButton.getChildByName("Background").getChildByName("active");
        if (SoundManager_1.default.getInstance().getSoundSettingData()) {
          soundActiveRoundButton.x = 10;
          soundActiveRoundButton.getComponent(cc.Sprite).spriteFrame = this.activeRoundButton;
        } else {
          soundActiveRoundButton.x = -10;
          soundActiveRoundButton.getComponent(cc.Sprite).spriteFrame = this.inactiveRoundButton;
        }
        if (SoundManager_1.default.getInstance().getMusicSettingData()) {
          SoundManager_1.default.getInstance().playMusic(this.lastPlayedMusic, true);
          musicActiveRoundButton.x = 10;
          musicActiveRoundButton.getComponent(cc.Sprite).spriteFrame = this.activeRoundButton;
        } else {
          musicActiveRoundButton.x = -10;
          musicActiveRoundButton.getComponent(cc.Sprite).spriteFrame = this.inactiveRoundButton;
        }
      };
      HUD.prototype.enableRestoreButton = function() {};
      HUD.prototype.setGameGems = function(gems) {
        GameManager_1.default.getInstance().setGameGems(gems);
        this.gemsCounter = GameManager_1.default.getInstance().getGameGems();
      };
      HUD.prototype.updateInGameGems = function(gems) {
        var count = 1;
        gems < 0 && (count = -1);
        var time = this.getTimeForAnimation(Math.abs(gems));
        GameManager_1.default.getInstance().setGameGems(GameManager_1.default.getInstance().getGameGems() + gems);
        var counterIncAction = cc.sequence(cc.delayTime(time), cc.callFunc(this.updateGemsCount, this, count));
        this.gemsCount.runAction(cc.sequence(cc.repeat(counterIncAction, Math.abs(gems)), cc.callFunc(this.gemsCounterAnimationCompleted, this)));
      };
      HUD.prototype.gemsCounterAnimationCompleted = function() {
        this.gemsCounter = GameManager_1.default.getInstance().getGameGems();
        this.gemsCount.getComponent(cc.Label).string = this.gemsCounter.toString();
      };
      HUD.prototype.updateGemsCount = function(ref, count) {
        this.gemsCounter = this.gemsCounter + count;
        this.gemsCount.getComponent(cc.Label).string = this.gemsCounter.toString();
      };
      HUD.prototype.setGameCoins = function(coins) {
        GameManager_1.default.getInstance().setGameCoins(coins);
        this.coinsCounter = GameManager_1.default.getInstance().getGameCoins();
      };
      HUD.prototype.updateInGameCoins = function(coins) {
        var count = 1;
        coins < 0 && (count = -1);
        var time = this.getTimeForAnimation(Math.abs(coins));
        GameManager_1.default.getInstance().setGameCoins(GameManager_1.default.getInstance().getGameCoins() + coins);
        var counterIncAction = cc.sequence(cc.delayTime(time), cc.callFunc(this.updateCoinsCount, this, count));
        this.coinsCount.runAction(cc.sequence(cc.repeat(counterIncAction, Math.abs(coins)), cc.callFunc(this.coinsCounterAnimationCompleted, this)));
      };
      HUD.prototype.coinsCounterAnimationCompleted = function() {
        this.coinsCounter = GameManager_1.default.getInstance().getGameCoins();
        this.coinsCount.getComponent(cc.Label).string = this.coinsCounter.toString();
        this.switchTimerLabel();
      };
      HUD.prototype.updateCoinsCount = function(ref, count) {
        this.coinsCounter = this.coinsCounter + count;
        this.coinsCount.getComponent(cc.Label).string = this.coinsCounter.toString();
      };
      HUD.prototype.setGameEngergy = function(energy) {
        GameManager_1.default.getInstance().setGameEnergy(energy);
        this.energyCounter = GameManager_1.default.getInstance().getGameEnergy();
      };
      HUD.prototype.updateInGameEnergy = function(energy) {
        var count = 1;
        energy < 0 && (count = -1);
        var time = this.getTimeForAnimation(Math.abs(energy));
        GameManager_1.default.getInstance().setGameEnergy(GameManager_1.default.getInstance().getGameEnergy() + energy);
        var counterIncAction = cc.sequence(cc.delayTime(time), cc.callFunc(this.updateEnergyCount, this, count));
        this.energyPoints.active = true;
        this.switchTimerLabel();
        this.energyPoints.runAction(cc.sequence(cc.repeat(counterIncAction, Math.abs(energy)), cc.callFunc(this.energyCounterAnimationCompleted, this)));
      };
      HUD.prototype.energyCounterAnimationCompleted = function() {
        this.energyCounter = GameManager_1.default.getInstance().getGameEnergy();
        this.energyPoints.getComponent(cc.Label).string = this.energyCounter.toString();
      };
      HUD.prototype.switchTimerLabel = function() {
        this.energyPoints && (this.energyPoints.active = true);
        this.energyTimer && (this.energyTimer.active = true);
        if (this.energyCounter > 0) {
          this.energyTimer && (this.energyTimer.active = false);
          GameManager_1.default.getInstance().setEnergyStatus(0);
          this.energyPoints && (this.energyPoints.getComponent(cc.Label).string = this.energyCounter.toString());
          this.removeEnergyTimeoutRef();
        } else {
          this.energyPoints && (this.energyPoints.active = false);
          if (!GameManager_1.default.getInstance().getEnergyStatus()) {
            GameManager_1.default.getInstance().setEnergyStatus(1);
            var currentTime = new Date().getTime();
            GameManager_1.default.getInstance().setEnergyRewardTimer(currentTime.toString());
            this.updateEnergyTimer();
          }
          this.energyRewardTimeoutRef || (this.energyRewardTimeoutRef = setInterval(this.updateEnergyTimer.bind(this), 1e3));
        }
      };
      HUD.prototype.updateEnergyTimer = function() {
        this.energyRemainingTimeInSec = this.energyCountdownTimer - GameManager_1.default.getInstance().getEnergyRewardTimeInSec();
        this.energyRemainingTimeInSec = this.energyRemainingTimeInSec > 0 ? this.energyRemainingTimeInSec : 0;
        if (this.energyRemainingTimeInSec > 1) {
          this.energyRemainingTimeInSec = this.energyRemainingTimeInSec - 1;
          var timeFormat = GameManager_1.default.getInstance().getTimerData(this.energyRemainingTimeInSec);
          this.updateTimeInSplit(timeFormat);
        } else {
          this.setGameEngergy(25);
          this.switchTimerLabel();
          this.removeEnergyTimeoutRef();
        }
      };
      HUD.prototype.updateTimeInSplit = function(time) {
        this.energyTimer && (this.energyTimer.getComponent(cc.Label).string = GameManager_1.default.getInstance().getTimeInTwoDigit(time.hour) + " : " + GameManager_1.default.getInstance().getTimeInTwoDigit(time.minute) + " : " + GameManager_1.default.getInstance().getTimeInTwoDigit(time.seconds));
      };
      HUD.prototype.removeEnergyTimeoutRef = function() {
        if (this.energyRewardTimeoutRef) {
          clearInterval(this.energyRewardTimeoutRef);
          this.energyRewardTimeoutRef = null;
        }
      };
      HUD.prototype.updateEnergyCount = function(ref, count) {
        this.energyCounter = this.energyCounter + count;
        this.energyPoints.getComponent(cc.Label).string = this.energyCounter.toString();
        this.switchTimerLabel();
      };
      HUD.prototype.getTimeForAnimation = function(count) {
        return .7 / count;
      };
      HUD.prototype.openShopScreen = function() {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        cc.director.loadScene("Shop");
      };
      HUD.prototype.energyBarCB = function(event, customData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.OPEN_OUT_OF_ENERGY_POPUP);
      };
      HUD.prototype.openSettingScreen = function() {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.settingPanel.active = !this.settingPanel.active;
      };
      HUD.prototype.closeSettingScreen = function() {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.settingPanel.active = false;
      };
      HUD.prototype.backButtonCallback = function(pref) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        cc.director.loadScene(this.lastScene);
      };
      HUD.prototype.updateSceneTitle = function(title) {
        this.sceneName.string = title;
      };
      HUD.prototype.updateBackButtonStatus = function(status) {
        this.backButton.node.active = status;
      };
      HUD.prototype.updateLastScene = function(scene) {
        this.lastScene = scene;
      };
      HUD.prototype.soundButtonCallback = function(event, customEventData) {
        var soundValue = SoundManager_1.default.getInstance().getSoundSettingData();
        var activeRoundButton = this.soundButton.getChildByName("Background").getChildByName("active");
        activeRoundButton.x = activeRoundButton.x > 0 ? -10 : 10;
        if (soundValue) {
          activeRoundButton.getComponent(cc.Sprite).spriteFrame = this.inactiveRoundButton;
          soundValue = 0;
        } else {
          activeRoundButton.getComponent(cc.Sprite).spriteFrame = this.activeRoundButton;
          soundValue = 1;
        }
        SoundManager_1.default.getInstance().setSoundSettingData(soundValue);
      };
      HUD.prototype.musicButtonCallback = function(event, customEventData) {
        var musicValue = SoundManager_1.default.getInstance().getMusicSettingData();
        var toggleMusicValue = 0 == musicValue ? 1 : 0;
        SoundManager_1.default.getInstance().setMusicSettingData(toggleMusicValue);
        var activeRoundButton = this.musicButton.getChildByName("Background").getChildByName("active");
        activeRoundButton.x = activeRoundButton.x > 0 ? -10 : 10;
        if (musicValue) {
          activeRoundButton.getComponent(cc.Sprite).spriteFrame = this.inactiveRoundButton;
          SoundManager_1.default.getInstance().stopMusic();
        } else {
          activeRoundButton.getComponent(cc.Sprite).spriteFrame = this.activeRoundButton;
          SoundManager_1.default.getInstance().playMusic(this.lastPlayedMusic, true);
        }
      };
      HUD.prototype.restoreButtonPressed = function(eventType, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
      };
      HUD.prototype.onDestroy = function() {};
      HUD.prototype.onPrivacyPolicyLinkClick = function(event, customData) {
        jsb.reflection.callStaticMethod("RootViewController", "openPrivacyPolicyURL:", "https://dswgaming.com/privacy-policy/");
      };
      HUD.prototype.onTermsAndServiceClick = function(event, customData) {
        jsb.reflection.callStaticMethod("RootViewController", "openPrivacyPolicyURL:", "https://dswgaming.com/terms-of-service/");
      };
      __decorate([ property(cc.Node) ], HUD.prototype, "energyTimer", void 0);
      __decorate([ property(cc.Node) ], HUD.prototype, "energyPoints", void 0);
      __decorate([ property(cc.Node) ], HUD.prototype, "coinsCount", void 0);
      __decorate([ property(cc.Node) ], HUD.prototype, "gemsCount", void 0);
      __decorate([ property(cc.Label) ], HUD.prototype, "sceneName", void 0);
      __decorate([ property(cc.Button) ], HUD.prototype, "backButton", void 0);
      __decorate([ property(cc.SpriteFrame) ], HUD.prototype, "activeRoundButton", void 0);
      __decorate([ property(cc.SpriteFrame) ], HUD.prototype, "inactiveRoundButton", void 0);
      __decorate([ property(cc.Node) ], HUD.prototype, "soundButton", void 0);
      __decorate([ property(cc.Node) ], HUD.prototype, "musicButton", void 0);
      __decorate([ property(cc.Node) ], HUD.prototype, "settingPanel", void 0);
      __decorate([ property(cc.AudioClip) ], HUD.prototype, "lastPlayedMusic", void 0);
      HUD = __decorate([ ccclass ], HUD);
      return HUD;
    }(cc.Component);
    exports.default = HUD;
    cc._RF.pop();
  }, {
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager",
    "./Manager/SoundManager": "SoundManager",
    "./Utilities/MessageCenter": "MessageCenter"
  } ],
  IAPManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8592cuI4Y5FgZz+elSn1pku", "IAPManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var IAPManager = function() {
      function IAPManager() {
        this.IAP_ENABLED = true;
      }
      IAPManager_1 = IAPManager;
      IAPManager.getInstance = function() {
        IAPManager_1.instance || (IAPManager_1.instance = new IAPManager_1());
        return IAPManager_1.instance;
      };
      IAPManager.prototype.initialiseSDK = function() {
        cc.sys.isMobile && this.IAP_ENABLED && sdkbox.IAP.init();
      };
      IAPManager.prototype.purchaseProduct = function(productName) {
        cc.sys.isMobile && this.IAP_ENABLED && sdkbox.IAP.purchase(productName);
      };
      IAPManager.prototype.setListener = function(callback) {
        if (cc.sys.isMobile && this.IAP_ENABLED) {
          var self = this;
          sdkbox.IAP.setListener({
            onSuccess: function(product) {
              sdkbox.IAP.finishTransaction(product.id);
              callback(product, null);
            },
            onFailure: function(product, msg) {
              cc.log("product: Failure : IAP: " + product + "  =====msg: " + msg);
              callback(null, product);
            },
            onCanceled: function(product) {
              cc.log("product: onCanceled : product: " + product);
              callback(null, product);
            },
            onRestored: function(product) {
              sdkbox.IAP.finishTransaction(product.id);
              callback(product, null);
            },
            onProductRequestSuccess: function(products) {
              for (var i = 0; i < products.length; i++) {
                cc.log("================");
                cc.log("name: " + products[i].name);
                cc.log("price: " + products[i].price);
                cc.log("priceValue: " + products[i].priceValue);
                cc.log("================");
              }
            },
            onProductRequestFailure: function(msg) {
              cc.log("product: onRestored : msg: " + msg);
            }
          });
        }
      };
      var IAPManager_1;
      IAPManager = IAPManager_1 = __decorate([ ccclass ], IAPManager);
      return IAPManager;
    }();
    exports.default = IAPManager;
    cc._RF.pop();
  }, {} ],
  ItemLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1e72lqRiFBVoD9xfWysVf4", "ItemLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var Utility_1 = require("../../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var ItemPanelOffer = function(_super) {
      __extends(ItemPanelOffer, _super);
      function ItemPanelOffer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.item = null;
        _this.itemName = null;
        _this.buttonText = null;
        _this.glowImg = null;
        _this.itemType = Constant_1.ITEM_LAYER_TYPE.LAND_MINE;
        _this.isSelected = false;
        return _this;
      }
      ItemPanelOffer.prototype.onLoad = function() {
        this.updateItemDetails();
        this.isSelected = false;
        this.updateButtonText();
      };
      ItemPanelOffer.prototype.start = function() {};
      ItemPanelOffer.prototype.updateItemDetails = function() {
        var _this = this;
        this.items.forEach(function(element) {
          var elementIndex = _this.items.indexOf(element);
          if (elementIndex == _this.itemType) {
            _this.item.spriteFrame = element;
            _this.itemName.string = Utility_1.Utility.getItemName(elementIndex);
            return;
          }
        });
      };
      ItemPanelOffer.prototype.updateButtonText = function() {
        this.buttonText.string = this.isSelected ? "SELECTED" : " SELECT";
        this.glowImg.node.active = !!this.isSelected;
      };
      ItemPanelOffer.prototype.itemSelectedCallback = function(event, customEvent) {
        var data = {
          itemType: this.itemType
        };
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_SELECTED_EVENTS, data);
      };
      __decorate([ property(cc.SpriteFrame) ], ItemPanelOffer.prototype, "items", void 0);
      __decorate([ property(cc.Sprite) ], ItemPanelOffer.prototype, "item", void 0);
      __decorate([ property(cc.Label) ], ItemPanelOffer.prototype, "itemName", void 0);
      __decorate([ property(cc.Label) ], ItemPanelOffer.prototype, "buttonText", void 0);
      __decorate([ property(cc.Sprite) ], ItemPanelOffer.prototype, "glowImg", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.ITEM_LAYER_TYPE),
        visible: function() {
          this.updateItemDetails();
          return true;
        }
      }) ], ItemPanelOffer.prototype, "itemType", void 0);
      ItemPanelOffer = __decorate([ ccclass ], ItemPanelOffer);
      return ItemPanelOffer;
    }(cc.Component);
    exports.default = ItemPanelOffer;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter",
    "../../Utilities/Utility": "Utility"
  } ],
  ItemPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e8489GZpqdH14UxL258yczk", "ItemPanel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var Utility_1 = require("../../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ItemPanel = function(_super) {
      __extends(ItemPanel, _super);
      function ItemPanel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemList = [];
        _this.selectedItemPanel = null;
        _this.purchaseCostLabel = null;
        _this.selectedItem = Constant_1.ITEM_LAYER_TYPE.LAND_MINE;
        _this.quantity = 1;
        _this.purchaseCost = 0;
        _this.frame = null;
        return _this;
      }
      ItemPanel.prototype.onLoad = function() {
        this.registerEvents();
      };
      ItemPanel.prototype.start = function() {
        this.resetPreviousSelection(this.selectedItem);
      };
      ItemPanel.prototype.onDestroy = function() {
        this.unregisterEvents();
      };
      ItemPanel.prototype.registerEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_SELECTED_EVENTS, this.itemSelectedCallback.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_QUANTITY_CHANGED_EVENT, this.itemQuantityUpdated.bind(this), this.node);
      };
      ItemPanel.prototype.unregisterEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_SELECTED_EVENTS, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_QUANTITY_CHANGED_EVENT, this.node);
      };
      ItemPanel.prototype.itemSelectedCallback = function(data) {
        this.selectedItem = data.itemType;
        this.resetPreviousSelection(this.selectedItem);
      };
      ItemPanel.prototype.resetPreviousSelection = function(selectedItemType) {
        var _this = this;
        this.itemList.forEach(function(element) {
          var itemScript = element.getComponent("ItemLayer");
          if (itemScript.itemType != selectedItemType) itemScript.isSelected = false; else {
            itemScript.isSelected = true;
            _this.frame = itemScript.item.spriteFrame;
          }
          itemScript.updateButtonText();
        });
        var itemName = Utility_1.Utility.getItemName(this.selectedItem);
        this.selectedItemPanel.getComponent("SelectedItemPanel").resetSelectedItem(this.frame, this.selectedItem, itemName);
      };
      ItemPanel.prototype.itemQuantityUpdated = function(itemData) {
        this.quantity = itemData.quantity;
        this.purchaseCost = parseInt(itemData.quantity) * parseInt(itemData.basePrice);
        this.purchaseCostLabel.string = this.purchaseCost.toString();
      };
      ItemPanel.prototype.onPurchaseButonCB = function(eventType, customData) {
        var itemData = {
          cost: this.purchaseCost,
          quantity: this.quantity,
          type: this.selectedItem,
          frame: this.frame
        };
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_PURCHASE_EVENTS, itemData);
      };
      __decorate([ property(cc.Node) ], ItemPanel.prototype, "itemList", void 0);
      __decorate([ property(cc.Node) ], ItemPanel.prototype, "selectedItemPanel", void 0);
      __decorate([ property(cc.Label) ], ItemPanel.prototype, "purchaseCostLabel", void 0);
      ItemPanel = __decorate([ ccclass ], ItemPanel);
      return ItemPanel;
    }(cc.Component);
    exports.default = ItemPanel;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter",
    "../../Utilities/Utility": "Utility"
  } ],
  ItemPurcahsePopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec798RtIOZARbUMlRbOTo2j", "ItemPurcahsePopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var SoundManager_1 = require("../Manager/SoundManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ItemPurcahsePopup = function(_super) {
      __extends(ItemPurcahsePopup, _super);
      function ItemPurcahsePopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.confirmButton = null;
        _this.cancelButton = null;
        _this.itemContainer = null;
        _this.quantityNode = null;
        _this.quantityLabel = null;
        _this.item = null;
        return _this;
      }
      ItemPurcahsePopup.prototype.start = function() {};
      ItemPurcahsePopup.prototype.showPopup = function(popupMsgData) {
        popupMsgData.messageType == Constant_1.SHOW_POPUP_TYPE.TOWER_PURCHASE_POPUP ? this.quantityNode.active = false : this.quantityLabel.string = popupMsgData.itemCount.toString();
        this.confirmRef = popupMsgData.sureCallback;
        this.cancelRef = popupMsgData.cancelCallback;
        this.title.string = popupMsgData.title;
        var ratio = this.item.node.width / popupMsgData.frame.getRect().width;
        var newWidth = popupMsgData.frame.getRect().width * ratio;
        var newHeight = popupMsgData.frame.getRect().height * ratio;
        this.item.spriteFrame = popupMsgData.frame;
        this.item.node.setContentSize(cc.size(newWidth, newHeight));
        this.item.node.setScale(popupMsgData.messageType == Constant_1.SHOW_POPUP_TYPE.TOWER_PURCHASE_POPUP ? 1.2 : .8);
      };
      ItemPurcahsePopup.prototype.okButtonCB = function(eventType, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.confirmRef();
        this.node.removeFromParent();
      };
      ItemPurcahsePopup.prototype.cancelButtonCB = function(eventType, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.cancelRef();
        this.node.removeFromParent();
      };
      __decorate([ property(cc.Label) ], ItemPurcahsePopup.prototype, "title", void 0);
      __decorate([ property(cc.Node) ], ItemPurcahsePopup.prototype, "confirmButton", void 0);
      __decorate([ property(cc.Node) ], ItemPurcahsePopup.prototype, "cancelButton", void 0);
      __decorate([ property(cc.Node) ], ItemPurcahsePopup.prototype, "itemContainer", void 0);
      __decorate([ property(cc.Node) ], ItemPurcahsePopup.prototype, "quantityNode", void 0);
      __decorate([ property(cc.Label) ], ItemPurcahsePopup.prototype, "quantityLabel", void 0);
      __decorate([ property(cc.Sprite) ], ItemPurcahsePopup.prototype, "item", void 0);
      ItemPurcahsePopup = __decorate([ ccclass ], ItemPurcahsePopup);
      return ItemPurcahsePopup;
    }(cc.Component);
    exports.default = ItemPurcahsePopup;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/SoundManager": "SoundManager"
  } ],
  Item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4de0Ao9ARMAJmoOf3Oh+vk", "Item");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Item = function(_super) {
      __extends(Item, _super);
      function Item() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pathData = [];
        _this.isBackside = false;
        _this.maxBallsToFire = 15;
        _this.alreadyCollideKnights = [];
        _this.arrowTurnSpriteFrame = null;
        return _this;
      }
      Item.prototype.setPathData = function(pathData) {
        this.node.scaleX < 0 && (this.node.getChildByName("MonkeyCanonBar").scaleX = -1);
        this.pathData = pathData;
      };
      Item.prototype.getPathData = function() {
        return __spreadArrays(this.pathData);
      };
      Item.prototype.updateBallsOfMonkeyCanon = function() {
        this.maxBallsToFire = this.maxBallsToFire - 1;
        this.maxBallsToFire < 10 && this.maxBallsToFire > 0 && (this.node.getChildByName("MonkeyCanonBar").getChildByName("Shot" + (this.maxBallsToFire + 1)).active = false);
      };
      Item.prototype.checkIfMonkeyCanonHasAnyBallLeft = function() {
        0 == this.maxBallsToFire && this.node.parent.parent.getComponent("GamePlay").itemRemovedFromGamePlay(this.node.name);
      };
      Item.prototype.changeSpriteFrameOfArrow = function(sprite) {};
      Item.prototype.detectCollisionWithKnightAndCannonRange = function(knightBoundingBox) {
        var monkeyCanonRange = this.node.getChildByName("MonkeyCanonRange");
        for (var i = 0; i < monkeyCanonRange.childrenCount; ++i) {
          var arrowCollider1 = monkeyCanonRange.children[i].getChildByName("MonkeyCanonCollider1").getBoundingBoxToWorld();
          var arrowCollider2 = monkeyCanonRange.children[i].getChildByName("MonkeyCanonCollider2").getBoundingBoxToWorld();
          if (cc.Intersection.rectRect(arrowCollider1, knightBoundingBox)) return true;
          if (cc.Intersection.rectRect(arrowCollider2, knightBoundingBox)) return true;
        }
        return false;
      };
      __decorate([ property(cc.SpriteFrame) ], Item.prototype, "arrowTurnSpriteFrame", void 0);
      Item = __decorate([ ccclass ], Item);
      return Item;
    }(cc.Component);
    exports.default = Item;
    cc._RF.pop();
  }, {} ],
  KillScore: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7154345r1Nd6XXBdoTbDFU", "KillScore");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MaterialInfo = [ {
      u_dH: 0,
      u_dS: 0,
      u_dL: 0
    }, {
      u_dH: 298.57,
      u_dS: -.14,
      u_dL: -.12
    }, {
      u_dH: 0,
      u_dS: 0,
      u_dL: 0
    }, {
      u_dH: 63.48,
      u_dS: -.14,
      u_dL: -.12
    }, {
      u_dH: 169.73,
      u_dS: -.14,
      u_dL: -.12
    } ];
    var KillScore = function(_super) {
      __extends(KillScore, _super);
      function KillScore() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.material = null;
        return _this;
      }
      KillScore.prototype.onLoad = function() {
        this.material = this.getComponent(cc.Sprite).getMaterial(0);
      };
      KillScore.prototype.start = function() {};
      KillScore.prototype.changeColor = function(color) {
        this.material.setProperty("u_dH", MaterialInfo[color].u_dH);
        this.material.setProperty("u_dS", MaterialInfo[color].u_dS);
        this.material.setProperty("u_dL", MaterialInfo[color].u_dL);
      };
      KillScore = __decorate([ ccclass ], KillScore);
      return KillScore;
    }(cc.Component);
    exports.default = KillScore;
    cc._RF.pop();
  }, {} ],
  Knight: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56b25k6oGZMRK45iNNw26LY", "Knight");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.KNIGHT_TYPE = void 0;
    var Constant_1 = require("./Constant");
    var LevelManager_1 = require("./Manager/LevelManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var TurnInfo_1 = require("./TurnInfo");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.KNIGHT_TYPE = cc.Enum({
      Regular: 0,
      Large: 1,
      Dark: 2,
      Flying: 3,
      Wizard: 4
    });
    var KNIGHT_ACTION_TAG = cc.Enum({
      Walking: 1,
      Flying: 2,
      Landing: 3
    });
    var MaterialInfo = [ {
      u_dH: 0,
      u_dS: 0,
      u_dL: 0
    }, {
      u_dH: 298.57,
      u_dS: -.14,
      u_dL: -.12
    }, {
      u_dH: 0,
      u_dS: 0,
      u_dL: 0
    }, {
      u_dH: 63.48,
      u_dS: -.14,
      u_dL: -.12
    }, {
      u_dH: 169.73,
      u_dS: -.14,
      u_dL: -.12
    }, {
      u_dH: 700,
      u_dS: .1,
      u_dL: .12
    } ];
    var Knight = function(_super) {
      __extends(Knight, _super);
      function Knight() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.color = 0;
        _this.tag = 0;
        _this.path = 0;
        _this.totalDistanceMoved = 0;
        _this.totalDistanceMovedInPer = 0;
        _this.initialPosition = new cc.Vec2(0, 0);
        _this.previousPosition = new cc.Vec2(0, 0);
        _this.time = 0;
        _this.distace = 0;
        _this.speed = 0;
        _this.maximumDistanceToMove = 100;
        _this.pathData = [];
        _this.bezierPathData = [];
        _this.offset = new cc.Size(0, 0);
        _this.mapPath = null;
        _this.positionDiff = 0;
        _this.isKnightLanded = false;
        _this.knightMaterial = null;
        _this.shieldFrontMaterial = null;
        _this.lifeCount = null;
        _this.previousZIndex = null;
        _this.actionCount = 0;
        _this.timer = 0;
        _this.randomPos = new cc.Vec2(0, 0);
        _this.randomNumber = 0;
        _this.shieldBack = null;
        _this.shieldArc = null;
        _this.shieldFront = null;
        _this.shieldInitPosition = new cc.Vec2(0, 0);
        _this.flyingAudioNo = 0;
        _this.finalRushIncrementInSpeed = 10;
        _this.animationSpeed = .4;
        _this.knightShield = null;
        _this.knightShieldArc = null;
        _this.coloredKnight = null;
        _this.largeKnight = null;
        _this.darkKnight = null;
        _this.regularKnight = null;
        _this.flyingKnight = null;
        _this.wizards = null;
        _this.knightType = exports.KNIGHT_TYPE.Regular;
        return _this;
      }
      Knight.prototype.onLoad = function() {
        this.knightMaterial = this.getComponent(cc.Sprite).getMaterial(0);
      };
      Knight.prototype.updateKnightProperties = function(knightColor, path, knightTag, pathData, type, map, knightSpeed, difficulty, isFinalRush, bezierPathData, flyDirection) {
        this.pathData = pathData;
        this.color = knightColor;
        this.tag = knightTag;
        this.path = path;
        this.offset = map.node.getContentSize();
        this.knightType = exports.KNIGHT_TYPE[type];
        this.mapPath = map.node;
        this.setInitialPosition();
        this.previousZIndex = this.node.zIndex;
        this.maximumDistanceToMove = this.getKnightMaxDistance();
        this.getComponent(cc.Sprite).spriteFrame = this.getKnightSpriteFrame();
        this.lifeCount = this.getKnightLifeCount();
        this.node.setScale(.6);
        difficulty == Constant_1.DIFFICULTY_SELECTED.HARD && this.knightType != exports.KNIGHT_TYPE.Dark && (this.animationSpeed = .6);
        this.speed = isFinalRush ? knightSpeed + this.finalRushIncrementInSpeed : knightSpeed;
        this.knightType == exports.KNIGHT_TYPE.Dark ? this.changeKnightColor(5, this.knightMaterial) : this.changeKnightColor(knightColor, this.knightMaterial);
        this.updateKnightPosition(flyDirection, bezierPathData, map);
      };
      Knight.prototype.setInitialPosition = function() {
        this.initialPosition = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[0].x - .5 * this.offset.width, this.pathData[0].y - .5 * this.offset.height)));
        this.previousPosition = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[0].x - .5 * this.offset.width, this.pathData[0].y - .5 * this.offset.height)));
        this.node.x = this.initialPosition.x;
        this.node.y = this.initialPosition.y;
        if (this.knightType != exports.KNIGHT_TYPE.Flying && (this.node.x < -.52 * cc.winSize.width || this.node.x > .52 * cc.winSize.width) || this.node.y < -.52 * cc.winSize.height || this.node.y > .52 * cc.winSize.height) {
          this.previousPosition = this.updatePrevPosOfKnight({
            width: .52 * cc.winSize.width,
            height: .52 * cc.winSize.height
          });
          this.initialPosition.x = this.previousPosition.x;
          this.initialPosition.y = this.previousPosition.y;
          this.node.x = this.initialPosition.x;
          this.node.y = this.initialPosition.y;
        }
      };
      Knight.prototype.updateKnightPosition = function(flyDirection, bezierPathData, map) {
        var _this = this;
        if (this.knightType == exports.KNIGHT_TYPE.Large) {
          this.initialPosition.x += this.initialPosition.x < -70 ? -10 : 10;
          this.initialPosition.y += this.initialPosition.y < -70 ? -10 : 10;
          this.node.x = this.initialPosition.x;
          this.node.y = this.initialPosition.y;
        } else if (this.knightType == exports.KNIGHT_TYPE.Dark) {
          this.initialPosition.x += this.initialPosition.x < 50 ? -30 : 30;
          this.node.x = this.initialPosition.x;
          this.node.y = this.initialPosition.y;
        } else if (this.knightType == exports.KNIGHT_TYPE.Flying) {
          this.flyDirection = flyDirection;
          this.initialPosition = this.node.parent.convertToNodeSpaceAR(map.node.convertToWorldSpaceAR(new cc.Vec2(bezierPathData[0].x - .5 * this.offset.width, bezierPathData[0].y - .5 * this.offset.height)));
          this.node.x = this.initialPosition.x;
          this.node.y = this.initialPosition.y;
          this.node.zIndex = 1e3;
          bezierPathData.forEach(function(point) {
            var posOfPoint = _this.node.parent.convertToNodeSpaceAR(map.node.convertToWorldSpaceAR(new cc.Vec2(point.x - .5 * _this.offset.width, point.y - .5 * _this.offset.height)));
            _this.bezierPathData.push(posOfPoint);
          });
          for (var i = 0; i < 2; ++i) {
            var randomNumber = Math.round(Math.random() * (this.bezierPathData.length - 2 - 1) + 1);
            this.bezierPathData.splice(randomNumber, 1);
          }
          this.bezierPathData.splice(0, 1);
          this.node.getChildByName("Bg").active = false;
          this.node.runAction(this.getFlyingKnightBezierAction());
          this.playFlyAnimation(this.flyDirection);
        }
      };
      Knight.prototype.setShieldLifeCount = function() {
        var randomNumber = Math.round(2 * Math.random() + 2);
        var shieldBackLifeCount = this.shieldBack.getChildByName("LifeCount").getComponent(cc.Label);
        this.shieldBack.getComponent("Shield").color = this.color;
        this.shieldBack.getComponent("Shield").totalLifeCount = randomNumber;
        shieldBackLifeCount.node.color = this.getKnightColor();
        shieldBackLifeCount.string = randomNumber.toString();
      };
      Knight.prototype.move = function() {
        if (this.knightType == exports.KNIGHT_TYPE.Dark) {
          var speedData = this.getSpeedOfKnight();
          this.speed = speedData["knightSpeed"];
        }
        this.node.runAction(this.getKnightAction());
        this.playLeftWalkAnimation();
      };
      Knight.prototype.playLeftWalkAnimation = function() {
        var animationClips = this.getComponent(cc.Animation);
        this.knightType == exports.KNIGHT_TYPE.Regular ? animationClips.play("RegularKnightLeftWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Large ? animationClips.play("LargeKnightLeftWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Dark ? animationClips.play("YellowKnightLeftWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Flying ? animationClips.play("FlyingKnightLeftWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Wizard ? animationClips.play("WizardKnightFrontLeftWalk").speed = this.animationSpeed : this.changeKnightColor(this.color, this.knightMaterial);
      };
      Knight.prototype.PlayRightWalkAnimation = function() {
        var animationClips = this.getComponent(cc.Animation);
        this.knightType == exports.KNIGHT_TYPE.Regular ? animationClips.play("RegularKnightRightWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Large ? animationClips.play("LargeKnightRightWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Dark ? animationClips.play("YellowKnightRightWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Flying ? animationClips.play("FlyingKnightRightWalk").speed = this.animationSpeed : this.knightType == exports.KNIGHT_TYPE.Wizard && (animationClips.play("WizardKnightFrontRightWalk").speed = this.animationSpeed);
      };
      Knight.prototype.PlayDeadAnimation = function() {
        this.changeKnightColor(0, this.knightMaterial);
        var animationClips = this.getComponent(cc.Animation);
        this.color == Constant_1.KNIGHT_SELECTED.BLUE_KNIGHT_SELECTED ? animationClips.play("BlueKnightDeath") : this.color == Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED ? animationClips.play("YellowKnightDeath") : this.color == Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? animationClips.play("GreenKnightDeath") : this.color == Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED && animationClips.play("RedKnightDeath");
        this.knightType != exports.KNIGHT_TYPE.Wizard && this.knightType != exports.KNIGHT_TYPE.Dark || LevelManager_1.default.getInstance().deleteknightOfPath(this.path);
        this.knightType == exports.KNIGHT_TYPE.Flying && LevelManager_1.default.getInstance().deleteFlyingKnightOfPath(this.path);
      };
      Knight.prototype.playShieldAnimation = function(direction) {
        var _this = this;
        var boundingBoxAngle = this.shieldBack.getChildByName("BoundingBox").angle;
        var lifeCountAngle = this.shieldBack.getChildByName("LifeCount").angle;
        var lifeLostAngle = this.shieldBack.getChildByName("LifeLost").angle;
        if (direction == TurnInfo_1.TURN_TYPE.Right) {
          cc.tween(this.shieldBack).call(function() {
            _this.shieldBack.getComponent(cc.Animation).play("GenerateRightShield");
            cc.tween(_this.shieldBack.getChildByName("LifeCount")).to(.65, {
              opacity: 255
            }).start();
          }).delay(.65).call(function() {
            _this.shieldArc.opacity = 255;
            _this.shieldBack.getComponent(cc.Animation).play("RightShield");
            _this.shieldBack.getChildByName("BoundingBox").active = true;
          }).start();
          this.shieldBack.getChildByName("BoundingBox").angle = boundingBoxAngle < 0 ? boundingBoxAngle : -boundingBoxAngle;
          this.shieldBack.getChildByName("LifeCount").angle = lifeCountAngle < 0 ? lifeCountAngle : -lifeCountAngle;
          this.shieldBack.getChildByName("LifeLost").angle = lifeLostAngle < 0 ? lifeLostAngle : -lifeLostAngle;
        } else {
          cc.tween(this.shieldBack).call(function() {
            _this.shieldBack.getComponent(cc.Animation).play("GenerateLeftShield");
            cc.tween(_this.shieldBack.getChildByName("LifeCount")).to(.65, {
              opacity: 255
            }).start();
          }).delay(.65).call(function() {
            _this.shieldArc.opacity = 255;
            _this.shieldBack.getComponent(cc.Animation).play("LeftShield");
            _this.shieldBack.getChildByName("BoundingBox").active = true;
          }).start();
          this.shieldBack.getChildByName("BoundingBox").angle = boundingBoxAngle > 0 ? boundingBoxAngle : -boundingBoxAngle;
          this.shieldBack.getChildByName("LifeCount").angle = lifeCountAngle > 0 ? lifeCountAngle : -lifeCountAngle;
          this.shieldBack.getChildByName("LifeLost").angle = lifeLostAngle > 0 ? lifeLostAngle : -lifeLostAngle;
        }
      };
      Knight.prototype.playFlyAnimation = function(direction) {
        direction == TurnInfo_1.TURN_TYPE.Right ? this.getComponent(cc.Animation).play("FlyingKnightRightFly") : this.getComponent(cc.Animation).play("FlyingKnightLeftFly");
      };
      Knight.prototype.playLandAnimation = function(direction) {
        direction == TurnInfo_1.TURN_TYPE.Right ? this.getComponent(cc.Animation).play("FlyingKnightRightLand") : this.getComponent(cc.Animation).play("FlyingKnightLeftLand");
      };
      Knight.prototype.update = function(dt) {
        if (this.node.active) {
          var knightCurrentPosition = this.node.getPosition();
          if (this.isInsideMap && this.isOnPath) {
            var distanceMoved = Math.sqrt(Math.pow(knightCurrentPosition.x - this.previousPosition.x, 2) + Math.pow(knightCurrentPosition.y - this.previousPosition.y, 2));
            this.totalDistanceMoved = this.totalDistanceMoved + distanceMoved;
            this.totalDistanceMovedInPer = (this.totalDistanceMoved - this.positionDiff) / this.maximumDistanceToMove;
            this.previousPosition = knightCurrentPosition;
          } else if (!this.isOnPath && this.knightType == exports.KNIGHT_TYPE.Flying && this.isInsideMap) this.landFlyingKnight(); else if (!this.isInsideMap && this.node.x >= -cc.winSize.width / 2 && this.node.x <= cc.winSize.width / 2 && this.node.y >= -cc.winSize.height / 2 && this.node.y <= cc.winSize.height / 2) {
            this.isInsideMap = true;
            if (this.knightType != exports.KNIGHT_TYPE.Flying) {
              this.node.parent.parent.getComponent("GamePlay").addKnightInProgressBar(this.knightType, this.path, this.node.name, this.color);
              this.isOnPath = true;
              this.previousPosition = knightCurrentPosition;
            } else {
              this.previousPosition = this.updatePrevPosOfKnight({
                width: .52 * cc.winSize.width,
                height: .52 * cc.winSize.height
              });
              this.initialPosition.x = this.previousPosition.x;
              this.initialPosition.y = this.previousPosition.y;
              this.randomPos = this.getRandomPositionForKnight(0, this.pathData.length - 2);
              this.landFlyingKnight();
            }
          }
          this.timer++;
          if (this.timer % 25 == 0) {
            this.checkIfFrontKnightIsNear();
            this.generateShieldForKnight();
            this.timer = 0;
          }
        }
      };
      Knight.prototype.changeSpeedOfKnight = function() {
        this.speed += this.finalRushIncrementInSpeed;
        if (this.knightType != exports.KNIGHT_TYPE.Flying || this.knightType == exports.KNIGHT_TYPE.Flying && this.isOnPath) {
          this.initialPosition.x = this.node.x;
          this.initialPosition.y = this.node.y;
          var knightActions = this.getKnightAction();
          this.node.stopActionByTag(this.actionCount - 1);
          this.node.runAction(knightActions);
        }
      };
      Knight.prototype.updatePrevPosOfKnight = function(winSize) {
        var pointA = new cc.Vec2(0, 0);
        var pointB = new cc.Vec2(0, 0);
        var initialPosition = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[0].x - .5 * this.offset.width, this.pathData[0].y - .5 * this.offset.height)));
        var initialPosition2 = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[1].x - .5 * this.offset.width, this.pathData[1].y - .5 * this.offset.height)));
        switch (this.pathData[0].boundary) {
         case 0:
         case 2:
          pointA.x = 0 == this.pathData[0].boundary ? -winSize.width : winSize.width;
          pointA.y = winSize.height;
          pointB.x = pointA.x;
          pointB.y = -pointA.y;
          break;

         case 1:
         case 3:
          pointA.x = winSize.width;
          pointA.y = 1 == this.pathData[0].boundary ? -winSize.height : winSize.height;
          pointB.x = -pointA.x;
          pointB.y = pointA.y;
        }
        var previousPos = this.getLineLineCollision(pointA, pointB, initialPosition, initialPosition2);
        var count = 0;
        while (false == previousPos && this.pathData.length - 1 > 0) {
          this.knightType != exports.KNIGHT_TYPE.Flying ? this.pathData.shift() : count++;
          initialPosition = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[count].x - .5 * this.offset.width, this.pathData[count].y - .5 * this.offset.height)));
          initialPosition2 = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[count + 1].x - .5 * this.offset.width, this.pathData[count + 1].y - .5 * this.offset.height)));
          previousPos = this.getLineLineCollision(pointA, pointB, initialPosition, initialPosition2);
          if ((this.pathData.length - 1 == 0 || this.pathData.length <= 3 || count == this.pathData.length - 2) && false == previousPos) break;
        }
        if (false != previousPos || void 0 != previousPos) var Pos = cc.v2(previousPos.x, previousPos.y); else Pos = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[0].x - .5 * this.offset.width, this.pathData[0].y - .5 * this.offset.height)));
        return Pos;
      };
      Knight.prototype.landFlyingKnight = function() {
        this.timer++;
        var distance = Math.floor(Math.sqrt(Math.pow(this.bezierPathData[this.bezierPathData.length - 1].x - this.node.x, 2) + Math.pow(this.bezierPathData[this.bezierPathData.length - 1].y - this.node.y, 2)));
        if (this.checkIfAnyKnightIsNear(this.randomPos) && this.timer % 25 == 0) {
          this.randomPos = this.getRandomPositionForKnight(0, this.pathData.length - 2);
          this.timer = 0;
          if (distance <= 10) {
            this.node.stopActionByTag(KNIGHT_ACTION_TAG.Flying);
            this.node.runAction(this.getFlyingKnightBezierAction());
          }
        } else if (distance <= 30 && !this.checkIfAnyKnightIsNear(this.randomPos) && !this.isKnightLanded) {
          for (var i = 0; i < this.randomNumber; ++i) {
            this.pathData.shift();
            var knightPos = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[0].x - .5 * this.offset.width, this.pathData[0].y - .5 * this.offset.height)));
            var distanceMoved = Math.sqrt(Math.pow(knightPos.x - this.previousPosition.x, 2) + Math.pow(knightPos.y - this.previousPosition.y, 2));
            this.totalDistanceMoved = this.totalDistanceMoved + distanceMoved;
            this.previousPosition = knightPos;
          }
          this.isKnightLanded = true;
          this.getFlyingKnightLandAction();
          this.timer = 0;
        }
      };
      Knight.prototype.getFlyingKnightBezierAction = function() {
        var actions = [];
        for (var index = 0; index < this.bezierPathData.length; ++index) if (index > 0 && (index + 1) % 3 == 0) {
          var distance = Math.sqrt(Math.pow(this.bezierPathData[index].x - this.bezierPathData[index - 2].x, 2) + Math.pow(this.bezierPathData[index].y - this.bezierPathData[index - 2].y, 2));
          var time = distance / 48;
          actions.push(cc.bezierTo(time, [ this.bezierPathData[index - 2], this.bezierPathData[index - 1], this.bezierPathData[index] ]));
        }
        var action = cc.sequence(__spreadArrays(actions));
        action.setTag(KNIGHT_ACTION_TAG.Flying);
        return action;
      };
      Knight.prototype.getFlyingKnightLandAction = function() {
        var _this = this;
        var actions = [];
        var time = .9;
        actions.push(cc.callFunc(function() {
          _this.initialPosition.x = _this.randomPos.x;
          _this.initialPosition.y = _this.randomPos.y;
        }, this), cc.moveTo(time, this.randomPos), cc.callFunc(function() {
          _this.playLandAnimation(_this.pathData[1].turnType);
          1 == _this.pathData[1].zIndex ? _this.node.zIndex = 0 : 0 == _this.pathData[1].zIndex && (_this.node.zIndex = _this.previousZIndex);
          _this.stopFlyingAudioEffect();
        }, this), cc.delayTime(.54), cc.callFunc(function() {
          _this.node.parent.parent.getComponent("GamePlay").addKnightInProgressBar(_this.knightType, _this.path, _this.node.name, _this.color);
          _this.isOnPath = true;
          _this.node.getChildByName("Bg").active = true;
          _this.node.runAction(_this.getKnightAction());
        }, this));
        this.node.stopActionByTag(KNIGHT_ACTION_TAG.Flying);
        var action = cc.sequence(__spreadArrays(actions));
        action.setTag(KNIGHT_ACTION_TAG.Landing);
        this.node.runAction(action);
      };
      Knight.prototype.checkIfAnyKnightIsNear = function(pos) {
        var _this = this;
        var knightRecord = this.node.parent.parent.getComponent("GamePlay").getKnightRecord();
        var pathKnightData = Object.keys(knightRecord).filter(function(knightKey) {
          return knightKey.includes("Path_" + _this.path);
        });
        var totalDistanceMoved = 0;
        var prevPos = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[0].x - .5 * this.offset.width, this.pathData[0].y - .5 * this.offset.height)));
        (prevPos.x <= -.52 * cc.winSize.width || prevPos.x >= .52 * cc.winSize.width || prevPos.y <= -.52 * cc.winSize.height || prevPos.y >= .52 * cc.winSize.height) && (prevPos = this.updatePrevPosOfKnight({
          width: .52 * cc.winSize.width,
          height: .52 * cc.winSize.height
        }));
        for (var i = 1; i < this.randomNumber; ++i) if (this.pathData[i] && !this.pathData[i].pathFromCave) {
          var knightPos = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[i].x - .5 * this.offset.width, this.pathData[i].y - .5 * this.offset.height)));
          var distanceMoved = Math.sqrt(Math.pow(knightPos.x - prevPos.x, 2) + Math.pow(knightPos.y - prevPos.y, 2));
          totalDistanceMoved += distanceMoved;
          prevPos = knightPos;
        }
        distanceMoved = Math.sqrt(Math.pow(pos.x - prevPos.x, 2) + Math.pow(pos.y - prevPos.y, 2));
        totalDistanceMoved += distanceMoved;
        for (var knightKey = 0; knightKey < pathKnightData.length; ++knightKey) {
          var knight = knightRecord[pathKnightData[knightKey]];
          if (knight && knight.name != this.node.name) {
            var distance = Math.abs(knight.getComponent("Knight").totalDistanceMoved - totalDistanceMoved);
            if (knight.getComponent("Knight").isOnPath && distance < 220) return true;
          }
        }
        return false;
      };
      Knight.prototype.getRandomPositionForKnight = function(minRange, maxRange) {
        this.randomNumber = Math.round(Math.random() * (maxRange - minRange) + minRange);
        this.randomNumber == maxRange && (this.randomNumber = minRange);
        var posA = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[this.randomNumber].x - .5 * this.offset.width, this.pathData[this.randomNumber].y - .5 * this.offset.height)));
        var posB = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[this.randomNumber + 1].x - .5 * this.offset.width, this.pathData[this.randomNumber + 1].y - .5 * this.offset.height)));
        while (this.pathData[this.randomNumber + 1].pathFromCave && this.randomNumber < this.pathData.length - 3) {
          this.randomNumber++;
          posA = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[this.randomNumber].x - .5 * this.offset.width, this.pathData[this.randomNumber].y - .5 * this.offset.height)));
          posB = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[this.randomNumber + 1].x - .5 * this.offset.width, this.pathData[this.randomNumber + 1].y - .5 * this.offset.height)));
        }
        (posA.x <= -.52 * cc.winSize.width || posA.x >= .52 * cc.winSize.width || posA.y <= -.52 * cc.winSize.height || posA.y >= .52 * cc.winSize.height) && this.randomNumber < this.pathData.length - 3 && (posA = this.previousPosition);
        var randomPos = posA;
        var n = Math.random() * (.7 - .4) + .4;
        randomPos.x = (1 - n) * posA.x + n * posB.x;
        randomPos.y = (1 - n) * posA.y + n * posB.y;
        return randomPos;
      };
      Knight.prototype.playFlyingAudioEffect = function(audioClip) {
        this.flyingAudioNo = SoundManager_1.default.getInstance().playEffect(audioClip, true, 1);
      };
      Knight.prototype.stopFlyingAudioEffect = function() {
        SoundManager_1.default.getInstance().stopEffect(this.flyingAudioNo);
      };
      Knight.prototype.getKnightAction = function() {
        var _this = this;
        var action = null;
        var actions = [];
        for (var counter = 1; counter < this.pathData.length; counter++) {
          var changePosition = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[counter].x - .5 * this.offset.width, this.pathData[counter].y - .5 * this.offset.height)));
          this.distace = Math.sqrt(Math.pow(changePosition.x - this.initialPosition.x, 2) + Math.pow(changePosition.y - this.initialPosition.y, 2));
          this.time = this.distace / this.speed;
          this.initialPosition = changePosition;
          this.pathData[counter].pathFromCave && (this.time = 0);
          var moveAction = cc.moveTo(this.time, changePosition.x, changePosition.y + .1 * this.node.height);
          this.pathData[counter].turnType == TurnInfo_1.TURN_TYPE.Right ? actions.push(cc.callFunc(this.PlayRightWalkAnimation, this)) : actions.push(cc.callFunc(this.playLeftWalkAnimation, this));
          var knightZIndex = 0;
          1 == this.pathData[counter].zIndex ? knightZIndex = 0 : 0 == this.pathData[counter].zIndex && (knightZIndex = this.previousZIndex);
          actions.push(cc.sequence(cc.callFunc(function(target, knightZIndex) {
            _this.node.zIndex = knightZIndex;
          }, this, knightZIndex), moveAction, cc.callFunc(function() {
            _this.pathData.shift();
          }, this)));
        }
        action = cc.sequence(__spreadArrays(actions, [ cc.callFunc(this.removedFromGame, this), cc.delayTime(.01), cc.removeSelf() ]));
        action.setTag(++this.actionCount);
        return action;
      };
      Knight.prototype.checkIfFrontKnightIsNear = function() {
        if (this.knightType == exports.KNIGHT_TYPE.Dark) {
          var speedData = this.getSpeedOfKnight();
          var knightSpeedInLevel = LevelManager_1.default.getInstance().getSpeedOfKnights();
          if (true == speedData["isFrontKnightNear"] && this.speed > knightSpeedInLevel + this.finalRushIncrementInSpeed) {
            this.initialPosition.x = this.node.x;
            this.initialPosition.y = this.node.y;
            this.speed = speedData["knightSpeed"];
            var knightActions = this.getKnightAction();
            this.node.stopActionByTag(this.actionCount - 1);
            this.node.runAction(knightActions);
          } else if (false == speedData["isFrontKnightNear"] && this.speed <= knightSpeedInLevel + this.finalRushIncrementInSpeed) {
            this.initialPosition.x = this.node.x;
            this.initialPosition.y = this.node.y;
            this.speed += 15;
            var knightActions = this.getKnightAction();
            this.node.stopActionByTag(this.actionCount - 1);
            this.node.runAction(knightActions);
          }
        }
      };
      Knight.prototype.generateShieldForKnight = function() {
        var _this = this;
        if (this.knightType == exports.KNIGHT_TYPE.Wizard && !this.shieldBack && this.isInsideMap) {
          var shieldRecord = this.node.parent.parent.getComponent("GamePlay").getShieldRecord();
          var pathShieldData = Object.keys(shieldRecord).filter(function(shieldKey) {
            return shieldKey.includes("Path_" + _this.path);
          });
          var shield = cc.instantiate(this.knightShield);
          this.shieldArc = cc.instantiate(this.knightShieldArc);
          this.shieldBack = shield.getChildByName("Shield");
          this.node.parent.addChild(shield);
          this.node.parent.addChild(this.shieldArc);
          this.shieldBack.name = this.node.name + "Shield";
          this.shieldArc.name = this.node.name + "ShieldArc";
          this.setShieldLifeCount();
          this.shieldBack.getComponent("Shield").changeColor(this.color);
          this.shieldArc.getComponent("Shield").changeColor(this.color);
          shield.getChildByName("ShieldThunder").getComponent("Shield").changeColor(this.color);
          if (pathShieldData.length < 1) {
            this.randomNumber = 2;
            this.shieldInitPosition = this.getShieldPosition(1.1, this.pathData.length - this.randomNumber + 1, this.pathData.length - this.randomNumber);
          } else {
            var pathNumber = Math.ceil(pathShieldData.length / 5);
            var distanceFromPreviousShield = pathShieldData.length % 5 * .2;
            this.randomNumber = 2 + pathNumber;
            this.shieldInitPosition = this.getShieldPosition(distanceFromPreviousShield, this.pathData.length - this.randomNumber + 1, this.pathData.length - this.randomNumber);
            pathShieldData.forEach(function(shield) {
              if (Math.floor(_this.shieldInitPosition.x) == Math.floor(shieldRecord[shield].parent.x) && Math.floor(_this.shieldInitPosition.y) == Math.floor(shieldRecord[shield].parent.y)) {
                _this.randomNumber = 2;
                _this.shieldInitPosition = _this.getShieldPosition(1.1, _this.pathData.length - _this.randomNumber + 1, _this.pathData.length - _this.randomNumber);
              }
            });
          }
          shield.position = cc.v3(this.shieldInitPosition.x, this.shieldInitPosition.y, 0);
          this.shieldArc.position = cc.v3(this.shieldInitPosition.x, this.shieldInitPosition.y + 17, 0);
          shield.zIndex = -10;
          this.shieldArc.zIndex = 1e3;
          if (pathShieldData.length > 0 && this.pathData[this.pathData.length - this.randomNumber + 1].zIndex != TurnInfo_1.TURN_TYPE.Right) {
            shield.zIndex = shieldRecord[pathShieldData[pathShieldData.length - 1]].parent.zIndex - 1;
            this.shieldArc.zIndex = 1e3 - 1 * pathShieldData.length;
          }
          this.node.parent.parent.getComponent("GamePlay").shieldRecord[this.shieldBack.name] = this.shieldBack;
          cc.tween(shield).call(function() {
            shield.getChildByName("ShieldThunder").getComponent(cc.Animation).play("ShieldThunderEffect");
            _this.node.parent.parent.getComponent("GamePlay").playSheildAppearSound();
          }).delay(1.25).call(function() {
            shield.getChildByName("ShieldThunder").active = false;
            _this.shieldBack.opacity = 255;
            _this.shieldArc.getComponent("Shield").setShieldArcSpriteFrame(_this.pathData[_this.pathData.length - _this.randomNumber + 1].pathDirection);
            _this.playShieldAnimation(_this.pathData[_this.pathData.length - _this.randomNumber + 1].pathDirection);
          }).start();
        }
      };
      Knight.prototype.getShieldPosition = function(num, pointA, pointB) {
        var n = num;
        var posA = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[pointA].x - .5 * this.offset.width, this.pathData[pointA].y - .5 * this.offset.height)));
        var posB = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[pointB].x - .5 * this.offset.width, this.pathData[pointB].y - .5 * this.offset.height)));
        var randomPos = posA;
        var distance = Math.sqrt(Math.pow(posB.x - posA.x, 2) + Math.pow(posB.y - posA.y, 2));
        distance > 250 && (n /= 2.5);
        randomPos.x = (1 - n) * posA.x + n * posB.x;
        randomPos.y = (1 - n) * posA.y + n * posB.y;
        return randomPos;
      };
      Knight.prototype.getSpeedOfKnight = function() {
        var _this = this;
        var knightKey = this.node.name;
        var knightRecord = this.node.parent.parent.getComponent("GamePlay").getKnightRecord();
        var pathKnightData = Object.keys(knightRecord).filter(function(knightKey) {
          return knightKey.includes("Path_" + _this.path);
        });
        pathKnightData = pathKnightData.sort(function(obj1, obj2) {
          if (knightRecord[obj1].getComponent("Knight").totalDistanceMoved > knightRecord[obj2].getComponent("Knight").totalDistanceMoved) return -1;
          if (knightRecord[obj1].getComponent("Knight").totalDistanceMoved < knightRecord[obj2].getComponent("Knight").totalDistanceMoved) return 1;
          return 0;
        });
        var knightSpeed = 0;
        var isFrontKnightNear = false;
        if (pathKnightData.length > 0) for (var index = 0; index < pathKnightData.length; index++) {
          var frontKnightKey = pathKnightData[index];
          var frontKnight = knightRecord[frontKnightKey];
          var distance = Math.sqrt(Math.pow(this.node.x - frontKnight.x, 2) + Math.pow(this.node.y - frontKnight.y, 2));
          if (knightKey != frontKnightKey && distance < 70 && frontKnight.getComponent("Knight").totalDistanceMoved > this.totalDistanceMoved) {
            isFrontKnightNear = true;
            knightSpeed = frontKnight.getComponent("Knight").knightType == exports.KNIGHT_TYPE.Dark && frontKnight.getComponent("Knight").speed > LevelManager_1.default.getInstance().getSpeedOfKnights() ? this.knightType == exports.KNIGHT_TYPE.Dark ? frontKnight.getComponent("Knight").speed : this.speed : frontKnight.getComponent("Knight").speed;
            break;
          }
          isFrontKnightNear = false;
          knightSpeed = this.speed;
        } else {
          isFrontKnightNear = false;
          knightSpeed = this.speed;
        }
        return {
          knightSpeed: knightSpeed,
          isFrontKnightNear: isFrontKnightNear
        };
      };
      Knight.prototype.getKnightMaxDistance = function() {
        var pointA = new cc.Vec2(0, 0);
        var pointB = new cc.Vec2(0, 0);
        var initialPosition = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[0].x - .5 * this.offset.width, this.pathData[0].y - .5 * this.offset.height)));
        var initialPosition2 = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[1].x - .5 * this.offset.width, this.pathData[1].y - .5 * this.offset.height)));
        switch (this.pathData[0].boundary) {
         case 0:
         case 2:
          pointA.x = 0 == this.pathData[0].boundary ? .5 * -cc.winSize.width : .5 * cc.winSize.width;
          pointA.y = .5 * cc.winSize.height;
          pointB.x = pointA.x;
          pointB.y = -pointA.y;
          break;

         case 1:
         case 3:
          pointA.x = .5 * cc.winSize.width;
          pointA.y = 1 == this.pathData[0].boundary ? .5 * -cc.winSize.height : .5 * cc.winSize.height;
          pointB.x = -pointA.x;
          pointB.y = pointA.y;
        }
        var xpo = this.getLineLineCollision(pointA, pointB, initialPosition, initialPosition2);
        if (xpo) var difference = Math.sqrt(Math.pow(xpo.x - initialPosition.x, 2) + Math.pow(xpo.y - initialPosition.y, 2)); else difference = 0;
        var maxDistance = 0;
        for (var counter = 1; counter < this.pathData.length; counter++) {
          var changePosition = this.node.parent.convertToNodeSpaceAR(this.mapPath.convertToWorldSpaceAR(new cc.Vec2(this.pathData[counter].x - .5 * this.offset.width, this.pathData[counter].y - .5 * this.offset.height)));
          var distace = Math.sqrt(Math.pow(changePosition.x - initialPosition.x, 2) + Math.pow(changePosition.y - initialPosition.y, 2));
          initialPosition = changePosition;
          maxDistance += distace;
        }
        return maxDistance - difference;
      };
      Knight.prototype.removedFromGame = function() {
        this.knightType != exports.KNIGHT_TYPE.Wizard && this.knightType != exports.KNIGHT_TYPE.Dark || LevelManager_1.default.getInstance().deleteknightOfPath(this.path);
        this.knightType == exports.KNIGHT_TYPE.Flying && LevelManager_1.default.getInstance().deleteFlyingKnightOfPath(this.path);
        this.node.parent.parent.getComponent("GamePlay").knightAttackedTower();
        this.node.parent.parent.getComponent("GamePlay").knightRemovedFromGamePlay(this.node.name);
      };
      Knight.prototype.getKnightSpriteFrame = function() {
        switch (this.knightType) {
         case exports.KNIGHT_TYPE.Regular:
          return this.regularKnight;

         case exports.KNIGHT_TYPE.Dark:
          return this.darkKnight;

         case exports.KNIGHT_TYPE.Large:
          return this.largeKnight;

         case exports.KNIGHT_TYPE.Wizard:
          return this.wizards;

         case exports.KNIGHT_TYPE.Flying:
          return this.flyingKnight;
        }
      };
      Knight.prototype.getKnightColor = function() {
        return this.color == Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? Constant_1.KNIGHT_COLOR.GREEN : this.color == Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED ? Constant_1.KNIGHT_COLOR.YELLOW : this.color == Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED ? Constant_1.KNIGHT_COLOR.RED : Constant_1.KNIGHT_COLOR.BLUE;
      };
      Knight.prototype.removeKnight = function() {
        this.node.removeFromParent();
      };
      Knight.prototype.changeKnightColor = function(color, material) {
        material.setProperty("u_dH", MaterialInfo[color].u_dH);
        material.setProperty("u_dS", MaterialInfo[color].u_dS);
        material.setProperty("u_dL", MaterialInfo[color].u_dL);
      };
      Knight.prototype.getLineLineCollision = function(p0, p1, p2, p3) {
        var s1, s2;
        s1 = {
          x: p1.x - p0.x,
          y: p1.y - p0.y
        };
        s2 = {
          x: p3.x - p2.x,
          y: p3.y - p2.y
        };
        var s10_x = p1.x - p0.x;
        var s10_y = p1.y - p0.y;
        var s32_x = p3.x - p2.x;
        var s32_y = p3.y - p2.y;
        var denom = s10_x * s32_y - s32_x * s10_y;
        if (0 == denom) return false;
        var denom_positive = denom > 0;
        var s02_x = p0.x - p2.x;
        var s02_y = p0.y - p2.y;
        var s_numer = s10_x * s02_y - s10_y * s02_x;
        if (s_numer < 0 == denom_positive) return false;
        var t_numer = s32_x * s02_y - s32_y * s02_x;
        if (t_numer < 0 == denom_positive) return false;
        if (s_numer > denom == denom_positive || t_numer > denom == denom_positive) return false;
        var t = t_numer / denom;
        var p = {
          x: p0.x + t * s10_x,
          y: p0.y + t * s10_y
        };
        return p;
      };
      Knight.prototype.getKnightLifeCount = function() {
        switch (this.knightType) {
         case exports.KNIGHT_TYPE.Regular:
         case exports.KNIGHT_TYPE.Wizard:
         case exports.KNIGHT_TYPE.Flying:
          return 1;

         case exports.KNIGHT_TYPE.Dark:
         case exports.KNIGHT_TYPE.Large:
          return 2;
        }
      };
      Knight.prototype.updatePowerOfKnight = function() {
        this.knightType == exports.KNIGHT_TYPE.Dark && this.changeKnightColor(this.color, this.knightMaterial);
      };
      __decorate([ property(cc.Prefab) ], Knight.prototype, "knightShield", void 0);
      __decorate([ property(cc.Prefab) ], Knight.prototype, "knightShieldArc", void 0);
      __decorate([ property(cc.SpriteFrame) ], Knight.prototype, "coloredKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], Knight.prototype, "largeKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], Knight.prototype, "darkKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], Knight.prototype, "regularKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], Knight.prototype, "flyingKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], Knight.prototype, "wizards", void 0);
      __decorate([ property({
        type: exports.KNIGHT_TYPE
      }) ], Knight.prototype, "knightType", void 0);
      Knight = __decorate([ ccclass ], Knight);
      return Knight;
    }(cc.Component);
    exports.default = Knight;
    cc._RF.pop();
  }, {
    "./Constant": "Constant",
    "./Manager/LevelManager": "LevelManager",
    "./Manager/SoundManager": "SoundManager",
    "./TurnInfo": "TurnInfo"
  } ],
  LevelManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a6f5yztptJjZOK5AFOpcft", "LevelManager");
    "use strict";
    var __assign = this && this.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var JSON_KEYS;
    (function(JSON_KEYS) {
      JSON_KEYS["JSON"] = "json";
      JSON_KEYS["LEVEL_COUNT"] = "NumberOfLevels";
      JSON_KEYS["CURRENT_LEVEL"] = "Level_";
      JSON_KEYS["MAX_LEVEL_LIFE"] = "MaxNumberOfLives";
      JSON_KEYS["MAX_KNIGHT"] = "MaximumKnights";
      JSON_KEYS["ENEMY_COLOR_COUNT"] = "NumberOfEnemyColor";
      JSON_KEYS["LEVEL_PATH_COUNT"] = "NumberOfMapPath";
      JSON_KEYS["LEVEL_PATHS"] = "Paths";
      JSON_KEYS["PATH"] = "Path";
      JSON_KEYS["CANNON_FIRE_BALL_COUNT"] = "MaxNumberBallsAvailable";
      JSON_KEYS["ENEMIES"] = "Enemies";
      JSON_KEYS["KNIGHT_SPEED"] = "SpeedOfKnights";
      JSON_KEYS["KNIGHT_SPAWNING_TIME"] = "TimeForSpawningKnights";
    })(JSON_KEYS || (JSON_KEYS = {}));
    var KNIGHT_FREQUNECY = {
      Regular: {
        min: 1,
        max: 5
      },
      Dark: {
        min: 1,
        max: 1
      },
      Flying: {
        min: 1,
        max: 1
      },
      Large: {
        min: 1,
        max: 3
      },
      Wizard: {
        min: 1,
        max: 1
      }
    };
    var Difficulty_Tag = {
      0: "Locked",
      1: "Normal",
      2: "Hard"
    };
    var LevelManager = function() {
      function LevelManager() {
        this.levelData = null;
        this.currentLevelData = null;
        this.currentKnightType = -1;
        this.knightCount = 0;
        this.knightPointer = null;
        this.knightPattern = [];
        this.lastPickedColor = -1;
        this.levelTmx = [];
        this.knightDataInPath = {
          path1: 0,
          path2: 0,
          path3: 0,
          path4: 0
        };
        this.flyingKnightDataInPath = {
          path1: 0,
          path2: 0,
          path3: 0,
          path4: 0
        };
        this.difficulty = 1;
        this.selectedTowerType = Constant_1.TOWER_SUB_TYPE.RED_TOWER;
        this.selectedTower = [];
      }
      LevelManager_1 = LevelManager;
      LevelManager.getInstance = function() {
        LevelManager_1.instance || (LevelManager_1.instance = new LevelManager_1());
        return LevelManager_1.instance;
      };
      LevelManager.prototype.loadLevelsData = function() {
        var target = this;
        return new Promise(function(resolve, reject) {
          target.levelData ? resolve(target.levelData) : cc.resources.load("Levels/Level", function(error, level) {
            if (error) {
              console.log("error while loading json");
              reject(error);
            } else {
              target.levelData = level[JSON_KEYS.JSON];
              resolve(target.levelData);
            }
          });
        });
      };
      LevelManager.prototype.loadLevelMap = function(levelNo) {
        var target = this;
        return new Promise(function(resolve, reject) {
          target.levelTmx[levelNo] ? resolve(target.levelTmx[levelNo]) : cc.resources.load("Maps/gameLevel" + levelNo, cc.TiledMapAsset, function(error, tmx) {
            if (error) {
              console.log("error while loading json");
              reject(error);
            } else {
              target.levelTmx[levelNo] = tmx;
              resolve(target.levelTmx[levelNo]);
            }
          });
        });
      };
      LevelManager.prototype.loadSelectedTower = function() {
        var target = this;
        var prefabUrl = "Towers/RedTower";
        switch (this.selectedTowerType) {
         case Constant_1.TOWER_SUB_TYPE.RED_TOWER:
         case Constant_1.TOWER_SUB_TYPE.BLUE_TOWER:
         case Constant_1.TOWER_SUB_TYPE.PURPLE_TOWER:
         case Constant_1.TOWER_SUB_TYPE.GREEN_TOWER:
          prefabUrl = "Towers/RedTower";
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_DRAGON_TOWER:
         case Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER:
          prefabUrl = "Towers/CastleTower";
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_TANK_TOWER:
         case Constant_1.TOWER_SUB_TYPE.CREATIVE_TANK_TOWER:
          prefabUrl = "Towers/TankTower";
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_BUG_TOWER:
         case Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER:
          prefabUrl = "Towers/BugTower";
        }
        return new Promise(function(resolve, reject) {
          target.selectedTower[target.selectedTowerType] ? resolve(target.selectedTower[target.selectedTowerType]) : cc.assetManager.getBundle("prefab") ? cc.assetManager.getBundle("prefab").load(prefabUrl, cc.Prefab, function(error, tower) {
            if (error) {
              console.log("error while loading prefab folder");
              reject(error);
            } else if (error) {
              console.log("error while loading prefab");
              reject(error);
            } else {
              target.selectedTower[target.selectedTowerType] = tower;
              resolve(target.selectedTower[target.selectedTowerType]);
            }
          }) : cc.assetManager.loadBundle("prefab", function(error, prefabBundle) {
            prefabBundle.load(prefabUrl, cc.Prefab, function(error, tower) {
              if (error) {
                console.log("error while loading prefab folder");
                reject(error);
              } else if (error) {
                console.log("error while loading prefab");
                reject(error);
              } else {
                target.selectedTower[target.selectedTowerType] = tower;
                resolve(target.selectedTower[target.selectedTowerType]);
              }
            });
          });
        });
      };
      LevelManager.prototype.getLevelMap = function(levelNo) {
        return this.levelTmx[levelNo];
      };
      LevelManager.prototype.setDifficultyOfLevel = function(difficulty) {
        this.difficulty = difficulty;
      };
      LevelManager.prototype.setTowerOfLevel = function(towerType) {
        this.selectedTowerType = towerType;
      };
      LevelManager.prototype.loadCurrentLevelData = function(currentLevel) {
        var key = JSON_KEYS.CURRENT_LEVEL + currentLevel.toString();
        this.currentLevelData = this.levelData[key];
      };
      LevelManager.prototype.getNumberOfLevels = function() {
        return JSON.parse(this.levelData[JSON_KEYS.LEVEL_COUNT]);
      };
      LevelManager.prototype.getMaxLifeInLevel = function() {
        return JSON.parse(this.currentLevelData[JSON_KEYS.MAX_LEVEL_LIFE]);
      };
      LevelManager.prototype.getNumberOfColorEnemy = function() {
        return JSON.parse(this.currentLevelData[JSON_KEYS.ENEMY_COLOR_COUNT]);
      };
      LevelManager.prototype.getSpeedOfKnights = function() {
        return JSON.parse(this.currentLevelData[Difficulty_Tag[this.difficulty]][JSON_KEYS.KNIGHT_SPEED]);
      };
      LevelManager.prototype.getMaximumKnights = function() {
        return JSON.parse(this.currentLevelData[Difficulty_Tag[this.difficulty]][JSON_KEYS.MAX_KNIGHT]);
      };
      LevelManager.prototype.getNumberOfPaths = function() {
        return JSON.parse(this.currentLevelData[JSON_KEYS.LEVEL_PATH_COUNT]);
      };
      LevelManager.prototype.getPath = function(selectedPath) {
        var paths = this.currentLevelData[JSON_KEYS.LEVEL_PATHS];
        return paths[selectedPath - 1][JSON_KEYS.PATH];
      };
      LevelManager.prototype.getRandomSelectedPath = function() {
        var maxPathInGame = LevelManager_1.getInstance().getNumberOfPaths();
        return Math.round(Math.random() * (maxPathInGame - 1) + 1);
      };
      LevelManager.prototype.getRandomSelectedKnightColor = function() {
        if (0 == this.knightCount) {
          this.knightCount = Math.round(3 * Math.random() + 2);
          var maxColorInGame = LevelManager_1.getInstance().getNumberOfColorEnemy();
          this.currentKnightType = Math.round(Math.random() * (maxColorInGame - 1) + 1);
          return this.currentKnightType;
        }
        this.knightCount--;
        return this.currentKnightType;
      };
      LevelManager.prototype.getTropInfo = function(knightType, upperLimit) {
        var max = KNIGHT_FREQUNECY[knightType].max;
        var min = KNIGHT_FREQUNECY[knightType].min;
        if (upperLimit < KNIGHT_FREQUNECY[knightType].max) return upperLimit;
        return Math.round(Math.random() * (max - min) + min);
      };
      LevelManager.prototype.getMaximumBallsAvailable = function() {
        var maxBalls = this.currentLevelData[JSON_KEYS.CANNON_FIRE_BALL_COUNT];
        return maxBalls;
      };
      LevelManager.prototype.getPathInfo = function() {
        return this.currentLevelData[JSON_KEYS.LEVEL_PATHS];
      };
      LevelManager.prototype.getEnemeyInfo = function() {
        return this.currentLevelData[Difficulty_Tag[this.difficulty]][JSON_KEYS.ENEMIES];
      };
      LevelManager.prototype.getTimeForKnightSpawning = function() {
        return this.currentLevelData[Difficulty_Tag[this.difficulty]][JSON_KEYS.KNIGHT_SPAWNING_TIME];
      };
      LevelManager.prototype.createAttackPattern = function() {
        this.lastPickedColor = -1;
        this.knightPointer = null;
        var maximumKnight = this.getMaximumKnights();
        this.knightPattern.length = 0;
        var patternIndex = 0;
        var count = 0;
        var enemyInfo = __assign({}, this.getEnemeyInfo());
        while (patternIndex < maximumKnight) for (var type in enemyInfo) if (enemyInfo[type] > 0) {
          var knightCount = this.getTropInfo(type, enemyInfo[type]);
          var color = this.getKnightColor();
          var path = this.getRandomSelectedPath();
          var speed = this.getSpeedOfKnights();
          "Dark" == type && (speed += 15);
          this.knightPattern.push(this.createPatten(type, color, path, speed, knightCount));
          patternIndex += knightCount;
          enemyInfo[type] -= knightCount;
        } else delete enemyInfo[type];
      };
      LevelManager.prototype.getKnightColor = function() {
        var maxColorInGame = LevelManager_1.getInstance().getNumberOfColorEnemy();
        return Math.round(Math.random() * (maxColorInGame - 1) + 1);
      };
      LevelManager.prototype.createPatten = function(type, color, path, speed, count) {
        return {
          type: type,
          color: color,
          path: path,
          speed: speed,
          count: count
        };
      };
      LevelManager.prototype.getRandomKnight = function() {
        var _this = this;
        if (null == this.knightPointer || this.knightPointer.count <= 0) {
          var index = Math.round(Math.random() * (this.knightPattern.length - 1 + 0));
          var count = 0;
          if (this.knightPointer) {
            index = this.knightPattern.findIndex(function(item) {
              return item.color != _this.knightPointer.color;
            });
            if (-1 == index) {
              index++;
              this.knightPattern[index].color == this.knightPointer.color && (this.knightPattern[index].color = this.getRandomSelectedKnightColor());
            }
          }
          "Flying" == this.knightPattern[index].type && this.flyingKnightDataInPath["path" + this.knightPattern[index].path] >= 1 && this.replaceKnights(index);
          while (("Wizard" == this.knightPattern[index].type || "Dark" == this.knightPattern[index].type) && this.knightDataInPath["path" + this.knightPattern[index].path] >= 1) this.replaceKnights(index);
          this.knightPointer = this.knightPattern.splice(index, 1)[0];
          this.lastPickedColor = this.knightPointer.color;
          "Wizard" != this.knightPointer.type && "Dark" != this.knightPointer.type || (this.knightDataInPath["path" + this.knightPointer.path] += this.knightPointer.count);
          "Flying" == this.knightPointer.type && (this.flyingKnightDataInPath["path" + this.knightPointer.path] += this.knightPointer.count);
        }
        this.knightPointer.count--;
        return {
          color: this.knightPointer.color,
          type: this.knightPointer.type,
          path: this.knightPointer.path,
          speed: this.knightPointer.speed
        };
      };
      LevelManager.prototype.replaceKnights = function(index) {
        var largeKnightIndex = this.knightPattern.findIndex(function(item) {
          return "Large" == item.type;
        });
        if (-1 != largeKnightIndex) {
          this.knightPattern[largeKnightIndex].count -= 1;
          var replacedKnight = {
            type: this.knightPattern[index].type,
            color: this.knightPattern[index].color,
            path: this.knightPattern[index].path,
            speed: this.knightPattern[index].speed,
            count: 1
          };
          0 == this.knightPattern[largeKnightIndex].count ? this.knightPattern[largeKnightIndex] = replacedKnight : this.knightPattern.push(replacedKnight);
        }
        "Dark" == this.knightPattern[index].type && (this.knightPattern[index].speed -= 15);
        this.knightPattern[index].type = "Large";
      };
      LevelManager.prototype.deleteknightOfPath = function(pathNumber) {
        this.knightDataInPath["path" + pathNumber] -= 1;
      };
      LevelManager.prototype.deleteFlyingKnightOfPath = function(pathNumber) {
        this.flyingKnightDataInPath["path" + pathNumber] -= 1;
      };
      var LevelManager_1;
      LevelManager = LevelManager_1 = __decorate([ ccclass ], LevelManager);
      return LevelManager;
    }();
    exports.default = LevelManager;
    cc._RF.pop();
  }, {
    "../Constant": "Constant"
  } ],
  LevelProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ecac0In1stFrKv7gG5py0P8", "LevelProgress");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var MessageCenter_1 = require("./Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PATH_INFO = {
      even: {
        path1: [ {
          x: .55,
          y: 0
        }, {
          x: .5,
          y: .5
        }, {
          x: .5,
          y: 0
        }, {
          x: .5,
          y: .4
        }, {
          x: .5,
          y: 0
        }, {
          x: .5,
          y: .3
        }, {
          x: .5,
          y: -.1
        }, {
          x: .7,
          y: 0
        } ],
        path2: [ {
          x: -.3,
          y: -.4
        }, {
          x: -.5,
          y: -.4
        }, {
          x: -.5,
          y: 0
        }, {
          x: -.5,
          y: -.2
        }, {
          x: -.5,
          y: 0
        }, {
          x: -.4,
          y: -.3
        }, {
          x: -.5,
          y: .1
        }, {
          x: -.4,
          y: -.5
        } ],
        path3: [ {
          x: -.4,
          y: -.6
        }, {
          x: .6,
          y: 0
        }, {
          x: .6,
          y: 0
        }, {
          x: .5,
          y: -.4
        }, {
          x: .6,
          y: 0
        }, {
          x: .7,
          y: -.2
        }, {
          x: .7,
          y: 0
        }, {
          x: .5,
          y: 0
        } ]
      },
      odd: {
        path1: [ {
          x: .5,
          y: -.9
        }, {
          x: .5,
          y: 0
        }, {
          x: .4,
          y: -.8
        }, {
          x: .55,
          y: -.2
        }, {
          x: .5,
          y: -.3
        }, {
          x: .5,
          y: -.1
        }, {
          x: .5,
          y: -.3
        }, {
          x: .75,
          y: 0
        } ],
        path2: [ {
          x: -.4,
          y: .45
        }, {
          x: -.5,
          y: -.5
        }, {
          x: -.5,
          y: .2
        }, {
          x: -.45,
          y: -.7
        }, {
          x: -.5,
          y: .5
        }, {
          x: -.7,
          y: -.1
        }, {
          x: -.6,
          y: .4
        }, {
          x: -.4,
          y: -.4
        } ],
        path3: [ {
          x: .5,
          y: 0
        }, {
          x: .5,
          y: 0
        }, {
          x: .5,
          y: .3
        }, {
          x: .5,
          y: 0
        }, {
          x: .5,
          y: .3
        }, {
          x: .5,
          y: 0
        }, {
          x: .45,
          y: 0
        }, {
          x: .45,
          y: 0
        } ]
      }
    };
    var LevelProgress = function(_super) {
      __extends(LevelProgress, _super);
      function LevelProgress() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelItem = null;
        _this.activeSilverLevel = null;
        _this.activeGoldLevel = null;
        _this.activeSilver4StarsLevel = null;
        _this.activeGold4StarsLevel = null;
        _this.levels = {};
        return _this;
      }
      LevelProgress.prototype.onLoad = function() {
        var ratio = cc.sys.windowPixelResolution.width / cc.sys.windowPixelResolution.height;
        if (ratio >= 1.33 && ratio < 1.5) for (var i = 1; i <= 3; ++i) for (var j = 1; j <= 8; ++j) {
          var parent = this.node.getChildByName("path" + i).getChildByName(j.toString());
          parent.children[1].scale = .85;
        } else if (ratio > 1.5 && ratio < 1.7) for (var i = 1; i <= 3; ++i) for (var j = 1; j <= 8; ++j) {
          var parent = this.node.getChildByName("path" + i).getChildByName(j.toString());
          parent.children[1].scale = .9;
        }
      };
      LevelProgress.prototype.start = function() {
        cc.director.preloadScene("GamePlay", function() {});
      };
      LevelProgress.prototype.setUpUI = function(startCount, clearedNo, levelInfo) {
        var _this = this;
        var type = startCount % 2 ? "odd" : "even";
        var pathInfo = PATH_INFO[type];
        Object.keys(pathInfo).forEach(function(key) {
          var path = _this.node.getChildByName(key);
          for (var col = 0; col < pathInfo[key].length; col++) {
            var levelData = levelInfo[startCount];
            var level = {
              index: startCount + 1,
              isUnlock: startCount + 1 <= clearedNo,
              isButtonActive: col != pathInfo[key].length - 1 || "path3" != key
            };
            levelData ? _this.createLevelButton(path, level, col, pathInfo[key][col], levelData.difficulty) : _this.createLevelButton(path, level, col, pathInfo[key][col], Constant_1.DIFFICULTY_SELECTED.LOCKED);
            startCount++;
          }
        });
      };
      LevelProgress.prototype.createLevelButton = function(path, levelInfo, index, position, difficulty) {
        var offset = 0;
        var ratio = cc.sys.windowPixelResolution.width / cc.sys.windowPixelResolution.height;
        ratio >= 2.6 && (offset = position.x > 0 ? 20 : -20);
        var parent = path.getChildByName((index + 1).toString());
        var button = cc.instantiate(this.levelItem);
        parent.userData = levelInfo;
        parent.addChild(button);
        button.setPosition(parent.width * position.x + offset, parent.height * position.y);
        button.angle = -parent.angle;
        button.getChildByName("LevelNo").getComponent(cc.Label).string = levelInfo.index.toString();
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "LevelProgress";
        clickEventHandler.handler = "onLevelSelected";
        clickEventHandler.customEventData = levelInfo;
        button.getComponent(cc.Button).clickEvents.push(clickEventHandler);
        levelInfo.isUnlock ? this.setButtonActive(button, difficulty) : button.getComponent(cc.Button).interactable = false;
        levelInfo.isButtonActive ? button.active = true : button.active = false;
        -1 == levelInfo.star;
        this.levels[levelInfo.index] = button;
      };
      LevelProgress.prototype.onLevelSelected = function(event, levelInfo) {
        var energy = GameManager_1.default.getInstance().getGameEnergy();
        if (energy >= 5) {
          MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.GAME_PLAY_LOADING);
          SoundManager_1.default.getInstance().playButtonClickSoundEffect();
          GameManager_1.default.getInstance().setUserCurrentLevel(levelInfo.index);
        } else MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.OPEN_OUT_OF_ENERGY_POPUP);
      };
      LevelProgress.prototype.updateProgressBar = function(levelNo, unlockLevels, currentLevel) {
        var levelInfo = GameManager_1.default.getInstance().getLevelData();
        for (var i = levelNo - 23; i <= levelNo; i++) {
          var button = this.levels[i];
          if (button) {
            var userData = levelInfo[i - 1];
            var difficulty = userData ? userData.difficulty : Constant_1.DIFFICULTY_SELECTED.LOCKED;
            var stars = userData ? Math.floor(userData.achievedScore / 25) : -1;
            var badge = button.getChildByName("silver");
            i > 1 && i <= unlockLevels && (button.parent.getChildByName("greenBar").scaleX = 1);
            difficulty == Constant_1.DIFFICULTY_SELECTED.LOCKED && i <= unlockLevels && (difficulty = Constant_1.DIFFICULTY_SELECTED.NORMAL);
            i == currentLevel && (button.getChildByName("Glow").active = true);
            if (difficulty == Constant_1.DIFFICULTY_SELECTED.HARD) {
              badge = button.getChildByName("gold");
              badge.getComponent(cc.Sprite).spriteFrame = this.activeGoldLevel;
              badge.active = true;
              button.getChildByName("silver").active = false;
            } else if (difficulty == Constant_1.DIFFICULTY_SELECTED.NORMAL) {
              badge = button.getChildByName("silver");
              badge.getComponent(cc.Sprite).spriteFrame = this.activeSilverLevel;
              badge.active = true;
              button.getChildByName("gold").active = false;
            }
            if (4 == stars) if (difficulty == Constant_1.DIFFICULTY_SELECTED.HARD) {
              badge = button.getChildByName("gold");
              badge.getComponent(cc.Sprite).spriteFrame = this.activeGold4StarsLevel;
              badge.active = true;
              button.getChildByName("silver").active = false;
            } else if (difficulty == Constant_1.DIFFICULTY_SELECTED.NORMAL) {
              badge = button.getChildByName("silver");
              badge.getComponent(cc.Sprite).spriteFrame = this.activeSilver4StarsLevel;
              badge.active = true;
              button.getChildByName("gold").active = false;
            }
            for (var j = 0; j < stars; j++) {
              badge.getChildByName("Star" + (j + 1)).active = true;
              i < levelNo && (button.active = true);
            }
          }
        }
      };
      LevelProgress.prototype.playNextRound = function(lastLevel, unlockLevel) {
        var _this = this;
        var levelInfo = GameManager_1.default.getInstance().getLevelData();
        var button = this.levels[lastLevel];
        var userData = levelInfo[unlockLevel];
        var unlockButton = this.levels[unlockLevel];
        unlockButton && cc.tween(unlockButton.parent.getChildByName("greenBar")).to(.5, {
          scaleX: 1
        }).call(function() {
          _this.setButtonActive(unlockButton, userData.difficulty);
        }).start();
      };
      LevelProgress.prototype.setButtonActive = function(button, difficulty) {
        button.getChildByName("LevelNo").active = true;
        button.getComponent(cc.Button).interactable = true;
        if (difficulty == Constant_1.DIFFICULTY_SELECTED.HARD) {
          var badge = button.getChildByName("gold");
          badge.getComponent(cc.Sprite).spriteFrame = this.activeGoldLevel;
        } else if (difficulty == Constant_1.DIFFICULTY_SELECTED.NORMAL) {
          var badge = button.getChildByName("silver");
          badge.getComponent(cc.Sprite).spriteFrame = this.activeSilverLevel;
        }
      };
      __decorate([ property(cc.Prefab) ], LevelProgress.prototype, "levelItem", void 0);
      __decorate([ property(cc.SpriteFrame) ], LevelProgress.prototype, "activeSilverLevel", void 0);
      __decorate([ property(cc.SpriteFrame) ], LevelProgress.prototype, "activeGoldLevel", void 0);
      __decorate([ property(cc.SpriteFrame) ], LevelProgress.prototype, "activeSilver4StarsLevel", void 0);
      __decorate([ property(cc.SpriteFrame) ], LevelProgress.prototype, "activeGold4StarsLevel", void 0);
      LevelProgress = __decorate([ ccclass ], LevelProgress);
      return LevelProgress;
    }(cc.Component);
    exports.default = LevelProgress;
    cc._RF.pop();
  }, {
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager",
    "./Manager/SoundManager": "SoundManager",
    "./Utilities/MessageCenter": "MessageCenter"
  } ],
  LevelSelection: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c17dzlJoBI9Y3xEmzXI7At", "LevelSelection");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base_1 = require("./Base/Base");
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var MessageCenter_1 = require("./Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TOTAL_LEVELS_IN_PAGE = 23;
    var LevelSelection = function(_super) {
      __extends(LevelSelection, _super);
      function LevelSelection() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.evenLevels = null;
        _this.oddLevels = null;
        _this.content = null;
        _this.scrollView = null;
        _this.childWidth = 0;
        _this.currentPageNo = 0;
        _this.totalPageNo = 0;
        _this.currentPath = null;
        _this.lastUnlockedLevel = null;
        _this.currentPageIndexInScrollview = 0;
        return _this;
      }
      LevelSelection.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        GameManager_1.default.getInstance().setCurrentScene(Constant_1.SCENE_TYPE.LEVEL_SELECTION_SCENE);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.GAME_PLAY_LOADING, this.moveToGamePlay.bind(this), this.node);
        this.addHUDLayerWithData("S E L E C T   L E V E L", true, "SelectTower");
        this.setUpUI();
      };
      LevelSelection.prototype.start = function() {
        cc.director.preloadScene("GamePlay", function() {
          console.log("GamePlay preloaded");
        });
      };
      LevelSelection.prototype.moveToGamePlay = function() {
        var ref = this;
        cc.resources.load("Prefab/Loader", cc.Prefab, function(err, asset) {
          if (ref.node) {
            var prefabNode = cc.instantiate(asset);
            ref.node.addChild(prefabNode);
            cc.director.loadScene("GamePlay");
          }
        });
      };
      LevelSelection.prototype.onDestroy = function() {
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.GAME_PLAY_LOADING, this.moveToGamePlay.bind(this));
        _super.prototype.onDestroy.call(this);
      };
      LevelSelection.prototype.setUpUI = function() {
        this.totalPageNo = GameManager_1.default.getInstance().getTotalLevels() / TOTAL_LEVELS_IN_PAGE;
        this.currentPageNo = Math.ceil(GameManager_1.default.getInstance().getUserCurrentLevel() / TOTAL_LEVELS_IN_PAGE);
        this.createPages();
      };
      LevelSelection.prototype.createPages = function() {
        var _this = this;
        var currentLevel = GameManager_1.default.getInstance().getUserCurrentLevel();
        var unLockedLevel = GameManager_1.default.getInstance().getLevelUnlocked();
        var lastPlayedLevel = GameManager_1.default.getInstance().getLastLevelPlayed();
        this.childWidth = this.node.width;
        var levelInfo = GameManager_1.default.getInstance().getLevelData();
        for (var i = 0; i < this.totalPageNo; i++) {
          var evenPage = cc.instantiate(i % 2 ? this.oddLevels : this.evenLevels);
          evenPage.getComponent("LevelProgress").setUpUI(i * TOTAL_LEVELS_IN_PAGE, unLockedLevel, levelInfo);
          this.content.addChild(evenPage);
          i > 0 && (this.content.width += evenPage.width);
          evenPage.name = i.toString();
        }
        this.updateCoveredPath(unLockedLevel, Math.ceil(unLockedLevel / TOTAL_LEVELS_IN_PAGE), currentLevel);
        if (unLockedLevel != lastPlayedLevel && unLockedLevel < lastPlayedLevel + 1) {
          unLockedLevel = lastPlayedLevel + 1;
          GameManager_1.default.getInstance().setLevelUnlocked(unLockedLevel);
          this.playNextRoundAnimation(lastPlayedLevel, unLockedLevel, Math.floor(unLockedLevel / TOTAL_LEVELS_IN_PAGE).toString());
        }
        cc.tween(this.node).delay(.01).call(function() {
          _this.moveToCurrentLevelPage(_this.currentPageNo, 1);
        }).start();
      };
      LevelSelection.prototype.moveToCurrentLevelPage = function(pageNo, timeForScroll) {
        var offset = this.scrollView.getScrollOffset();
        var offsetPercent = (pageNo - 1) * (1 / (this.content.childrenCount - 1));
        this.currentPageIndexInScrollview = pageNo;
        this.scrollView.scrollToPercentHorizontal(offsetPercent, timeForScroll, false);
      };
      LevelSelection.prototype.scrollviewCallback = function(scrollview) {
        var offsetX = scrollview.getScrollOffset().x;
        var index = Math.round(Math.abs(offsetX) / this.childWidth);
        index + 1 != this.currentPageIndexInScrollview && this.moveToCurrentLevelPage(index + 1, .2);
      };
      LevelSelection.prototype.getIndexFromOffSet = function(offset) {
        var index = Math.abs(offset.x) / this.childWidth;
        return index;
      };
      LevelSelection.prototype.updateCoveredPath = function(unlockLevels, pageNo, currentLevel) {
        for (var i = 0; i < pageNo; i++) {
          var page = this.content.getChildByName(i.toString());
          page.getComponent("LevelProgress").updateProgressBar((i + 1) * TOTAL_LEVELS_IN_PAGE + 1, unlockLevels, currentLevel);
        }
      };
      LevelSelection.prototype.playNextRoundAnimation = function(lastLevel, unlockLevel, pageNo) {
        var page = this.content.getChildByName(pageNo);
        page.getComponent("LevelProgress").playNextRound(lastLevel, unlockLevel);
      };
      __decorate([ property(cc.Prefab) ], LevelSelection.prototype, "evenLevels", void 0);
      __decorate([ property(cc.Prefab) ], LevelSelection.prototype, "oddLevels", void 0);
      __decorate([ property(cc.Node) ], LevelSelection.prototype, "content", void 0);
      __decorate([ property(cc.ScrollView) ], LevelSelection.prototype, "scrollView", void 0);
      LevelSelection = __decorate([ ccclass ], LevelSelection);
      return LevelSelection;
    }(Base_1.default);
    exports.default = LevelSelection;
    cc._RF.pop();
  }, {
    "./Base/Base": "Base",
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager",
    "./Utilities/MessageCenter": "MessageCenter"
  } ],
  MainMenu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efe672P2m9KBoMdu2JL7jeK", "MainMenu");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base_1 = require("./Base/Base");
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var IAPManager_1 = require("./Manager/IAPManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var Utility_1 = require("./Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WORLDS = {
      GrassCastle: 1,
      SnowCastle: 0,
      LavaCastle: 0
    };
    var MainScene = function(_super) {
      __extends(MainScene, _super);
      function MainScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.castleArray = [];
        _this.selectedWorldIndex = 0;
        _this.castleData = Utility_1.Utility.getCastleData();
        _this.emptyNodeWidth = 200;
        _this.castlePanel = null;
        _this.earnedStars = null;
        _this.maxStars = null;
        _this.content = null;
        _this.castleItem = null;
        _this.scrollView = null;
        _this.leftButton = null;
        _this.rightButton = null;
        _this.playButtonContainer = null;
        _this.playButton = null;
        _this.audioClip = null;
        return _this;
      }
      MainScene.prototype.onLoad = function() {
        var _this = this;
        _super.prototype.onLoad.call(this);
        GameManager_1.default.getInstance().setCurrentScene(Constant_1.SCENE_TYPE.MAIN_MENU_SCENE);
        this.addHUDLayerWithData("S E L E C T   W O R L D", false);
        this.addFooterLayer();
        this.leftButton.interactable = false;
        this.updateGameSettingBasedOnDeviceType();
        this.addTowersInScrollView();
        SoundManager_1.default.getInstance().playMusic(this.audioClip, true);
        IAPManager_1.default.getInstance().setListener(function(data, error) {
          _this.removeLoader();
          error || data.name != Constant_1.IAP_PURCHASE_ID.SPECIAL_1 && data.name != Constant_1.IAP_PURCHASE_ID.SPECIAL_2 || _this.specialOfferPurchaseConfirmation(data.name);
        });
      };
      MainScene.prototype.start = function() {
        var earnedStars = 0;
        var levelInfo = GameManager_1.default.getInstance().getLevelData();
        if (levelInfo && levelInfo[0].achievedScore > 0) {
          for (var i = 0; i < levelInfo.length; i++) {
            var userData = levelInfo[i - 1];
            var stars = userData ? Math.floor(userData.achievedScore / 25) : -1;
            stars > 0 && (earnedStars += stars);
          }
          this.earnedStars.getComponent(cc.Label).string = earnedStars.toString();
          this.maxStars.getComponent(cc.Label).string = (4 * levelInfo.length).toString();
        } else this.earnedStars.parent.active = false;
        this.showRewardToUsers();
      };
      MainScene.prototype.showRewardToUsers = function() {
        if (GameManager_1.default.getInstance().getSpecialRewardTimer()) this.showSpecialPurchaseReward(); else if (this.checkRewardAvailability()) {
          if (GameManager_1.default.getInstance().checkIfRewardAvailableForLevelsUnlocked()) GameManager_1.default.getInstance().updateRewardUnlockedOnLevel(); else if (GameManager_1.default.getInstance().getDailyRewardStatus()) {
            var timeStamp = new Date().getTime().toString();
            GameManager_1.default.getInstance().setDailyRewardTimeStamp(timeStamp);
          } else GameManager_1.default.getInstance().getConsequitiveLevelLose() >= 7 && GameManager_1.default.getInstance().setConsequitiveLevelLose("0");
          this.openReward();
        }
      };
      MainScene.prototype.checkRewardAvailability = function() {
        if (GameManager_1.default.getInstance().checkIfRewardAvailableForLevelsUnlocked() || GameManager_1.default.getInstance().getDailyRewardStatus() || GameManager_1.default.getInstance().getConsequitiveLevelLose() >= 7) return true;
        return false;
      };
      MainScene.prototype.openReward = function() {
        var data = {
          type: Constant_1.CHEST_REWARD_TYPE.PLAIN_CHEST
        };
        this.chestPurchaseEvents(data);
      };
      MainScene.prototype.onDestroy = function() {
        _super.prototype.onDestroy.call(this);
      };
      MainScene.prototype.updateGameSettingBasedOnDeviceType = function() {
        GameManager_1.default.getInstance().isDeviceIPad() && (this.playButtonContainer.getComponent(cc.Widget).bottom = 0);
      };
      MainScene.prototype.addTowersInScrollView = function() {
        this.addEmptyCell();
        for (var counter = Constant_1.CASTLE_TYPE.GRASS_CASTLE; counter <= Constant_1.CASTLE_TYPE.LAVA_CASTLE; counter++) {
          var item = cc.instantiate(this.castleItem);
          item.getComponent("Castle").updateCastleInfo(this.castleData[counter]);
          this.content.addChild(item);
        }
        this.addEmptyCell();
        this.scrollView.scrollToLeft();
      };
      MainScene.prototype.addEmptyCell = function() {
        var emptyNode = new cc.Node();
        emptyNode.setContentSize(cc.size(this.emptyNodeWidth, this.content.height));
        this.content.addChild(emptyNode);
      };
      MainScene.prototype.scrollviewCallback = function(scrollview, eventType, customEventData) {
        scrollview.getScrollOffset().x > 0 ? this.selectedWorldIndex = this.castleData[0] : this.getCurrentIndexSelected();
      };
      MainScene.prototype.getCurrentIndexSelected = function() {
        var elementSize = this.getElementSize();
        var index = Math.floor(Math.abs(this.scrollView.getScrollOffset().x) / elementSize);
        if (this.selectedWorldIndex != index) {
          this.selectedWorldIndex = index;
          this.rightButton.interactable = true;
          this.leftButton.interactable = true;
          this.updatePlayButtonStatus(true);
          index > 0 && this.updatePlayButtonStatus(false);
          index >= this.castleData.length - 1 && (this.rightButton.interactable = false);
          0 == index && (this.leftButton.interactable = false);
        }
      };
      MainScene.prototype.getElementSize = function() {
        var maxScrollingIndex = this.scrollView.getMaxScrollOffset().x;
        var elementSize = (maxScrollingIndex + 1 * this.emptyNodeWidth) / this.castleData.length;
        return elementSize;
      };
      MainScene.prototype.shopButtonCallback = function(event, data) {
        cc.director.loadScene("Shop");
      };
      MainScene.prototype.updatePlayButtonStatus = function(status) {
        this.playButton.interactable = status;
      };
      MainScene.prototype.playButtonCallback = function(event, data) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        cc.director.loadScene("SelectTower");
      };
      MainScene.prototype.rightButtonCallback = function(event, data) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        var percentage = .5 * (this.selectedWorldIndex + 1);
        this.scrollView.scrollToPercentHorizontal(percentage, .1);
      };
      MainScene.prototype.leftButtonCallback = function(event, data) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        var percentage = .5 * (this.selectedWorldIndex - 1);
        this.scrollView.scrollToPercentHorizontal(percentage, .1);
      };
      __decorate([ property(cc.Node) ], MainScene.prototype, "castlePanel", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "earnedStars", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "maxStars", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "content", void 0);
      __decorate([ property(cc.Prefab) ], MainScene.prototype, "castleItem", void 0);
      __decorate([ property(cc.ScrollView) ], MainScene.prototype, "scrollView", void 0);
      __decorate([ property(cc.Button) ], MainScene.prototype, "leftButton", void 0);
      __decorate([ property(cc.Button) ], MainScene.prototype, "rightButton", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "playButtonContainer", void 0);
      __decorate([ property(cc.Button) ], MainScene.prototype, "playButton", void 0);
      __decorate([ property(cc.AudioClip) ], MainScene.prototype, "audioClip", void 0);
      MainScene = __decorate([ ccclass ], MainScene);
      return MainScene;
    }(Base_1.default);
    exports.default = MainScene;
    cc._RF.pop();
  }, {
    "./Base/Base": "Base",
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager",
    "./Manager/IAPManager": "IAPManager",
    "./Manager/SoundManager": "SoundManager",
    "./Utilities/Utility": "Utility"
  } ],
  MessageCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c46d5HPF3JCXZeqSg1+UmWv", "MessageCenter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MessageCenter = void 0;
    var msgItem = function() {
      function msgItem() {
        this.callback = null;
        this.object = null;
      }
      return msgItem;
    }();
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MessageCenter = function(_super) {
      __extends(MessageCenter, _super);
      function MessageCenter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._Que = null;
        return _this;
      }
      MessageCenter_1 = MessageCenter;
      MessageCenter.getInstance = function() {
        this.instance || (this.instance = new MessageCenter_1());
        return this.instance;
      };
      MessageCenter.prototype.register = function(msg, callback, object) {
        if (!object || !(object instanceof cc.Node) && "object" !== typeof object) {
          cc.warn("Please pass in the correct registered object");
          return;
        }
        null === this._Que && (this._Que = {});
        this._Que[msg] || (this._Que[msg] = []);
        if (this.isObjectHasRegister(msg, object)) {
          cc.warn("The object has already been registered for the message\uff1a " + msg);
          return;
        }
        var item = new msgItem();
        item.callback = callback;
        item.object = object;
        this._Que[msg].push(item);
      };
      MessageCenter.prototype.isObjectHasRegister = function(msg, object) {
        var item = this._Que[msg];
        var len = item.length;
        for (var i = len - 1; i >= 0; i--) if (item[i].object === object) return true;
        return false;
      };
      MessageCenter.prototype.unregister = function(msg, object) {
        if (null === this._Que) {
          console.log("_Que\u672a\u521d\u59cb\u5316");
          return;
        }
        if (!this._Que[msg]) {
          console.log("\u672a\u6ce8\u518c\u8be5\u6d88\u606f" + msg);
          return;
        }
        var item = this._Que[msg];
        var len = item.length;
        for (var i = len - 1; i >= 0; i--) if (item[i].object === object) {
          item.splice(i, 1);
          break;
        }
      };
      MessageCenter.prototype.send = function(msg, params) {
        void 0 === params && (params = null);
        if (null === this._Que) {
          cc.log("_Que Uninitialized/Empty");
          return;
        }
        if (!this._Que[msg]) {
          cc.log("Message not registered: " + msg);
          return;
        }
        var callbacks = this._Que[msg];
        var len = callbacks.length;
        cc.log("send ===> " + msg + ",Number\uff1a" + len);
        for (var i = len - 1; i >= 0; i--) callbacks[i].callback(params);
      };
      var MessageCenter_1;
      MessageCenter = MessageCenter_1 = __decorate([ ccclass ], MessageCenter);
      return MessageCenter;
    }(cc.Component);
    exports.MessageCenter = MessageCenter;
    cc._RF.pop();
  }, {} ],
  PopUp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b1f6F97NdCUJZbrrmdoloZ", "PopUp");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Difficulty_Tag = {
      0: "Locked",
      1: "Normal",
      2: "Hard"
    };
    var PopUp = function(_super) {
      __extends(PopUp, _super);
      function PopUp() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.difficulty = 0;
        _this.currentLevel = 0;
        _this.normalButtonSpriteFrame = null;
        _this.normalButtonPressedSpriteFrame = null;
        _this.hardButtonSpriteFrame = null;
        _this.hardButtonPressedSpriteFrame = null;
        _this.hardButton = null;
        _this.normalButton = null;
        _this.losePopUp = null;
        _this.winPopUp = null;
        _this.difficultyPopUp = null;
        _this.audioClip = null;
        _this.fireworkAudioClip = null;
        _this.excellentSpriteFrame = null;
        _this.withEnergyPopup = null;
        _this.withoutEnergyPopup = null;
        return _this;
      }
      PopUp.prototype.onLoad = function() {
        this.addTouchEvent();
      };
      PopUp.prototype.addTouchEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, function() {}, this);
      };
      PopUp.prototype.removeTouchEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, function() {}, this);
      };
      PopUp.prototype.cancelButtonCallback = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        cc.director.loadScene("LevelSelection");
      };
      PopUp.prototype.difficultyButtonCallback = function(event, customEventData) {
        if (this.node.parent.getComponent("GamePlay").isPause) return;
        if (1 == customEventData) {
          SoundManager_1.default.getInstance().playButtonClickSoundEffect();
          this.difficulty = Constant_1.DIFFICULTY_SELECTED.NORMAL;
          this.normalButton.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.normalButtonPressedSpriteFrame;
          this.hardButton.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.hardButtonSpriteFrame;
        } else {
          SoundManager_1.default.getInstance().playButtonClickSoundEffect();
          this.difficulty = Constant_1.DIFFICULTY_SELECTED.HARD;
          this.hardButton.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.hardButtonPressedSpriteFrame;
          this.normalButton.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.normalButtonSpriteFrame;
        }
      };
      PopUp.prototype.confirmButtonCallback = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        if (this.node.parent.getComponent("GamePlay").isPause) return;
        this.node.parent.getComponent("GamePlay").gameStart(this.difficulty);
        this.node.active = false;
        this.removeTouchEvent();
      };
      PopUp.prototype.homeButtonCallback = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        if (this.node.parent.getComponent("GamePlay").isPause) return;
        cc.director.loadScene("MainMenu");
      };
      PopUp.prototype.replayButtonCallback = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        if (this.node.parent.getComponent("GamePlay").isPause) return;
        GameManager_1.default.getInstance().setUserCurrentLevel(this.node.parent.getComponent("GamePlay").currentLevel);
        cc.director.loadScene("GamePlay");
      };
      PopUp.prototype.nextButtonCallback = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        if (this.node.parent.getComponent("GamePlay").isPause) return;
        cc.director.loadScene("GamePlay");
      };
      PopUp.prototype.showDifficultyPopUp = function(levelNo, isDemoLevel) {
        void 0 === isDemoLevel && (isDemoLevel = false);
        this.currentLevel = levelNo;
        SoundManager_1.default.getInstance().playMusic(this.audioClip, true);
        this.node.active = true;
        this.winPopUp.active = false;
        this.difficultyPopUp.active = true;
        this.losePopUp.active = false;
        this.withoutEnergyPopup.active = false;
        this.withEnergyPopup.active = false;
        isDemoLevel ? this.withoutEnergyPopup.active = true : this.withEnergyPopup.active = true;
        this.addTouchEvent();
        this.difficultyButtonCallback(null, 1);
        this.difficultyPopUp.getChildByName("LevelNoTitle").getChildByName("Label").getComponent(cc.Label).string = "Level " + levelNo;
        cc.tween(this.node.getChildByName("DifficultyPopUp")).delay(.15).to(.1, {
          scale: 1
        }).start();
      };
      PopUp.prototype.showLosePopUp = function() {
        this.node.active = true;
        this.winPopUp.active = false;
        this.difficultyPopUp.active = false;
        this.losePopUp.active = true;
        this.losePopUp.getChildByName("ContentPanel").getChildByName("DifficultyLabel").getComponent(cc.Label).string = Difficulty_Tag[this.difficulty];
        this.losePopUp.getChildByName("LevelNoTitle").getChildByName("Label").getComponent(cc.Label).string = "Level " + this.currentLevel;
        this.addTouchEvent();
        cc.tween(this.losePopUp).delay(.1).to(.1, {
          scale: 1
        }).start();
      };
      PopUp.prototype.showWinPopUp = function(bestStreak) {
        this.node.active = true;
        this.winPopUp.active = true;
        this.difficultyPopUp.active = false;
        this.losePopUp.active = false;
        this.winPopUp.getChildByName("LevelInfo").getChildByName("DifficultyContentPanel").getChildByName("DifficultyLabel").getComponent(cc.Label).string = Difficulty_Tag[this.difficulty];
        this.winPopUp.getChildByName("LevelNoTitle").getChildByName("Label").getComponent(cc.Label).string = "Level " + this.currentLevel;
        cc.tween(this.winPopUp).delay(.1).to(.1, {
          scale: 1
        }).start();
        GameManager_1.default.getInstance().setGameEnergy(GameManager_1.default.getInstance().getGameEnergy() + 5);
        this.winPopUp.getChildByName("LevelInfo").getChildByName("AccuracyContentPanel").getChildByName("AccuracyLabel").getComponent(cc.Label).string = bestStreak + " / 100";
        var stars = Math.floor(bestStreak / 25);
        for (var j = 1; j <= stars && j <= 3; j++) {
          var star = this.winPopUp.getChildByName("StarBG").getChildByName("Star" + j);
          star.active = true;
          this.showStarAnimation(star, j);
        }
        if (stars < 4) this.difficulty == Constant_1.DIFFICULTY_SELECTED.HARD ? this.setLevelCompletionRewards(400, 0) : this.difficulty == Constant_1.DIFFICULTY_SELECTED.NORMAL && this.setLevelCompletionRewards(100, 0); else if (4 == stars) {
          this.difficulty == Constant_1.DIFFICULTY_SELECTED.HARD ? this.setLevelCompletionRewards(500, 10) : this.difficulty == Constant_1.DIFFICULTY_SELECTED.NORMAL && this.setLevelCompletionRewards(200, 1);
          this.winPopUp.getChildByName("GoldStarBG").active = true;
          this.winPopUp.getChildByName("StarBG").active = false;
          this.winPopUp.getChildByName("Title").getComponent(cc.Sprite).spriteFrame = this.excellentSpriteFrame;
        }
      };
      PopUp.prototype.setLevelCompletionRewards = function(coins, gems) {
        if (coins > 0) {
          GameManager_1.default.getInstance().setGameCoins(GameManager_1.default.getInstance().getGameCoins() + coins);
          var coinLabel = this.winPopUp.getChildByName("Rewards").getChildByName("CoinReward").getChildByName("CoinLabel");
          coinLabel.getComponent(cc.Label).string = "X " + coins;
          this.showLabelAnimation(coinLabel);
        }
        if (gems > 0) {
          GameManager_1.default.getInstance().setGameGems(GameManager_1.default.getInstance().getGameGems() + gems);
          var gemsLabel = this.winPopUp.getChildByName("Rewards").getChildByName("GemsReward").getChildByName("GemsLabel");
          gemsLabel.getComponent(cc.Label).string = "X " + gems;
          this.showLabelAnimation(gemsLabel);
        }
      };
      PopUp.prototype.showLabelAnimation = function(label) {
        SoundManager_1.default.getInstance().playEffect(this.fireworkAudioClip, false, 1);
        cc.tween(label).to(.2, {
          scale: .2,
          opacity: 55
        }).call(function() {
          label.getComponent(cc.LabelOutline).enabled = true;
        }).to(.5, {
          scale: 1,
          opacity: 255
        }, {
          easing: "elasticOut"
        }).delay(.8).call(function() {
          label.getComponent(cc.LabelOutline).enabled = false;
        }).start();
      };
      PopUp.prototype.showStarAnimation = function(star, count) {
        SoundManager_1.default.getInstance().playEffect(this.fireworkAudioClip, false, 1);
        cc.tween(star).to(0, {
          scale: .1,
          opacity: 10
        }).delay(.3 * count).to(.8, {
          scale: 1,
          opacity: 255
        }, {
          easing: "elasticOut"
        }).start();
      };
      __decorate([ property(cc.SpriteFrame) ], PopUp.prototype, "normalButtonSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], PopUp.prototype, "normalButtonPressedSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], PopUp.prototype, "hardButtonSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], PopUp.prototype, "hardButtonPressedSpriteFrame", void 0);
      __decorate([ property(cc.Node) ], PopUp.prototype, "hardButton", void 0);
      __decorate([ property(cc.Node) ], PopUp.prototype, "normalButton", void 0);
      __decorate([ property(cc.Node) ], PopUp.prototype, "losePopUp", void 0);
      __decorate([ property(cc.Node) ], PopUp.prototype, "winPopUp", void 0);
      __decorate([ property(cc.Node) ], PopUp.prototype, "difficultyPopUp", void 0);
      __decorate([ property(cc.AudioClip) ], PopUp.prototype, "audioClip", void 0);
      __decorate([ property(cc.AudioClip) ], PopUp.prototype, "fireworkAudioClip", void 0);
      __decorate([ property(cc.SpriteFrame) ], PopUp.prototype, "excellentSpriteFrame", void 0);
      __decorate([ property(cc.Node) ], PopUp.prototype, "withEnergyPopup", void 0);
      __decorate([ property(cc.Node) ], PopUp.prototype, "withoutEnergyPopup", void 0);
      PopUp = __decorate([ ccclass ], PopUp);
      return PopUp;
    }(cc.Component);
    exports.default = PopUp;
    cc._RF.pop();
  }, {
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager",
    "./Manager/SoundManager": "SoundManager"
  } ],
  PurchaseConfirmationPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "073a8BwI4xEQZh/vO9CZaHw", "PurchaseConfirmationPopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Constant_1 = require("../Constant");
    var SoundManager_1 = require("../Manager/SoundManager");
    var PurchaseConfirmationPopup = function(_super) {
      __extends(PurchaseConfirmationPopup, _super);
      function PurchaseConfirmationPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.confirmButton = null;
        _this.cancelButton = null;
        _this.title = null;
        _this.itemLabel = null;
        _this.gemsPanelFrame = null;
        _this.itemIcon = null;
        _this.itemPanel = null;
        return _this;
      }
      PurchaseConfirmationPopup.prototype.showPopup = function(popupMsgData) {
        popupMsgData.messageType == Constant_1.SHOW_POPUP_TYPE.PURCHASE_GEMS_POPUP && (this.itemPanel.spriteFrame = this.gemsPanelFrame);
        this.confirmRef = popupMsgData.sureCallback;
        this.cancelRef = popupMsgData.cancelCallback;
        this.title.string = popupMsgData.title;
        this.itemLabel.string = popupMsgData.itemCount.toString();
        this.itemIcon.spriteFrame = popupMsgData.itemFrame;
        this.itemIcon.node.setContentSize(cc.size(popupMsgData.itemFrame.getRect().width, popupMsgData.itemFrame.getRect().height));
        this.itemIcon.node.setScale(.8 * this.itemPanel.node.getContentSize().width / this.itemIcon.node.getContentSize().width * .7);
      };
      PurchaseConfirmationPopup.prototype.okButtonCB = function(eventType, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.confirmRef();
        this.node.removeFromParent();
      };
      PurchaseConfirmationPopup.prototype.cancelButtonCB = function(eventType, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.cancelRef();
        this.node.removeFromParent();
      };
      __decorate([ property(cc.Node) ], PurchaseConfirmationPopup.prototype, "confirmButton", void 0);
      __decorate([ property(cc.Node) ], PurchaseConfirmationPopup.prototype, "cancelButton", void 0);
      __decorate([ property(cc.Label) ], PurchaseConfirmationPopup.prototype, "title", void 0);
      __decorate([ property(cc.Label) ], PurchaseConfirmationPopup.prototype, "itemLabel", void 0);
      __decorate([ property(cc.SpriteFrame) ], PurchaseConfirmationPopup.prototype, "gemsPanelFrame", void 0);
      __decorate([ property(cc.Sprite) ], PurchaseConfirmationPopup.prototype, "itemIcon", void 0);
      __decorate([ property(cc.Sprite) ], PurchaseConfirmationPopup.prototype, "itemPanel", void 0);
      PurchaseConfirmationPopup = __decorate([ ccclass ], PurchaseConfirmationPopup);
      return PurchaseConfirmationPopup;
    }(cc.Component);
    exports.default = PurchaseConfirmationPopup;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/SoundManager": "SoundManager"
  } ],
  SelectTower: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "478ccZFJm9N1J9I3ya/x49q", "SelectTower");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base_1 = require("./Base/Base");
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var LevelManager_1 = require("./Manager/LevelManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var Utility_1 = require("./Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SelectTower = function(_super) {
      __extends(SelectTower, _super);
      function SelectTower() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.towerItem = null;
        _this.scrollContent = null;
        _this.towerPanel = null;
        _this.playButtonContainer = null;
        _this.towerName = null;
        _this.scrollView = null;
        _this.playButton = null;
        _this.leftButton = null;
        _this.rightButton = null;
        _this.emptyNdeWidth = 200;
        _this.towerData = Utility_1.Utility.getItemsWithTowerSubType(Constant_1.TOWER_TYPE.ALL, Constant_1.TOWER_ARRANGEMENT.UNLOCKED_FIRST);
        _this.selectedIndex = Constant_1.TOWER_SUB_TYPE.RED_TOWER;
        return _this;
      }
      SelectTower.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        GameManager_1.default.getInstance().setCurrentScene(Constant_1.SCENE_TYPE.TOWER_SELECTION_SCENE);
        this.addHUDLayerWithData("S E L E C T  T O W E R", true, "MainMenu");
        this.addFooterLayer();
        this.updateGameSettingBasedOnDeviceType();
        this.addTowersInScrollView();
        this.towerName.string = Utility_1.Utility.getTowerName(this.towerData[this.selectedIndex]);
        this.playButton.interactable = true;
      };
      SelectTower.prototype.start = function() {
        this.scrollView.scrollToLeft();
      };
      SelectTower.prototype.updateGameSettingBasedOnDeviceType = function() {
        GameManager_1.default.getInstance().setIsIpad(this.node.width, this.node.height);
        if (GameManager_1.default.getInstance().isDeviceIPad()) {
          this.playButtonContainer.getComponent(cc.Widget).bottom = 0;
          this.emptyNdeWidth = 150;
        }
      };
      SelectTower.prototype.addTowersInScrollView = function() {
        this.addEmptyCell();
        for (var counter = Constant_1.TOWER_SUB_TYPE.RED_TOWER; counter <= Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER; counter++) {
          var item = cc.instantiate(this.towerItem);
          item.getComponent("TowerSelectionItem").updateTowerItem(this.towerData[counter]);
          this.scrollContent.addChild(item);
        }
        this.addEmptyCell();
      };
      SelectTower.prototype.addEmptyCell = function() {
        var emptyNode = new cc.Node();
        emptyNode.setContentSize(cc.size(this.emptyNdeWidth, this.scrollContent.height));
        this.scrollContent.addChild(emptyNode);
      };
      SelectTower.prototype.playButtonCallback = function(event, data) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        var index = this.towerData[this.selectedIndex];
        LevelManager_1.default.getInstance().setTowerOfLevel(index);
        cc.director.loadScene("LevelSelection");
      };
      SelectTower.prototype.shopButtonCallback = function(event, data) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        cc.director.loadScene("Shop");
      };
      SelectTower.prototype.rightButtonCallback = function(event, data) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        var percentage = .112 * (this.selectedIndex + 1);
        this.scrollView.scrollToPercentHorizontal(percentage, .1);
      };
      SelectTower.prototype.leftButtonCallback = function(event, data) {
        if (this.selectedIndex > 0) {
          SoundManager_1.default.getInstance().playButtonClickSoundEffect();
          var percentage = .112 * (this.selectedIndex - 1);
          this.scrollView.scrollToPercentHorizontal(percentage, .1);
        }
      };
      SelectTower.prototype.scrollviewEventCB = function(scrollview, eventType, customEventData) {
        scrollview.getScrollOffset().x > 0 ? this.selectedIndex = Constant_1.TOWER_SUB_TYPE.RED_TOWER : this.getCurrentIndexSelected();
      };
      SelectTower.prototype.getCurrentIndexSelected = function() {
        var elementSize = this.getElementSize();
        var index = Math.floor(Math.abs(this.scrollView.getScrollOffset().x) / elementSize);
        if (this.selectedIndex != index) {
          this.selectedIndex = index;
          this.rightButton.interactable = true;
          this.leftButton.interactable = true;
          0 == this.selectedIndex && (this.leftButton.interactable = false);
          this.selectedIndex == this.towerData.length - 1 && (this.rightButton.interactable = false);
          var towerLockStatus = GameManager_1.default.getInstance().getTowerLockedStatus(this.towerData[this.selectedIndex]);
          Boolean(towerLockStatus) ? this.playButton.interactable = true : this.playButton.interactable = false;
          this.towerName.string = Utility_1.Utility.getTowerName(this.towerData[this.selectedIndex]);
        }
      };
      SelectTower.prototype.getElementSize = function() {
        var maxScrollingIndex = this.scrollView.getMaxScrollOffset().x;
        var elementSize = (maxScrollingIndex + 1.25 * this.emptyNdeWidth) / this.towerData.length;
        return elementSize;
      };
      __decorate([ property(cc.Prefab) ], SelectTower.prototype, "towerItem", void 0);
      __decorate([ property(cc.Node) ], SelectTower.prototype, "scrollContent", void 0);
      __decorate([ property(cc.Node) ], SelectTower.prototype, "towerPanel", void 0);
      __decorate([ property(cc.Node) ], SelectTower.prototype, "playButtonContainer", void 0);
      __decorate([ property(cc.Label) ], SelectTower.prototype, "towerName", void 0);
      __decorate([ property(cc.ScrollView) ], SelectTower.prototype, "scrollView", void 0);
      __decorate([ property(cc.Button) ], SelectTower.prototype, "playButton", void 0);
      __decorate([ property(cc.Button) ], SelectTower.prototype, "leftButton", void 0);
      __decorate([ property(cc.Button) ], SelectTower.prototype, "rightButton", void 0);
      SelectTower = __decorate([ ccclass ], SelectTower);
      return SelectTower;
    }(Base_1.default);
    exports.default = SelectTower;
    cc._RF.pop();
  }, {
    "./Base/Base": "Base",
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager",
    "./Manager/LevelManager": "LevelManager",
    "./Manager/SoundManager": "SoundManager",
    "./Utilities/Utility": "Utility"
  } ],
  SelectedItemPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da6b7m6hmtHkaGdDRPfBwCd", "SelectedItemPanel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SelectedItemPanel = function(_super) {
      __extends(SelectedItemPanel, _super);
      function SelectedItemPanel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.quantity = null;
        _this.title = null;
        _this.item = null;
        _this.itemType = Constant_1.ITEM_LAYER_TYPE.LAND_MINE;
        _this.itemCount = 1;
        _this.price = Constant_1.ITEM_COST.LAND_MINE;
        return _this;
      }
      SelectedItemPanel.prototype.onLoad = function() {
        this.updateItemQuantityLabel();
      };
      SelectedItemPanel.prototype.start = function() {};
      SelectedItemPanel.prototype.incrementButtonCallback = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.itemCount += 1;
        this.updateItemQuantityLabel();
      };
      SelectedItemPanel.prototype.decrementButtonCallback = function(event, customEventData) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.itemCount = 1 == this.itemCount ? 1 : this.itemCount - 1;
        this.updateItemQuantityLabel();
      };
      SelectedItemPanel.prototype.updateItemQuantityLabel = function() {
        this.quantity.string = this.itemCount.toString();
        var itemData = {
          quantity: this.itemCount,
          basePrice: this.price
        };
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_QUANTITY_CHANGED_EVENT, itemData);
      };
      SelectedItemPanel.prototype.resetSelectedItem = function(frame, type, title) {
        if (this.itemType == type) return;
        this.itemType = type;
        this.itemCount = 1;
        this.setPrice();
        this.updateItemQuantityLabel();
        this.title.string = title;
        this.item.spriteFrame = frame;
        this.item.node.setContentSize(cc.size(frame.getRect().width, frame.getRect().height));
        this.item.node.setScale(.8 * this.item.node.parent.width / this.item.node.width);
      };
      SelectedItemPanel.prototype.setPrice = function() {
        this.price = Constant_1.ITEM_COST.LAND_MINE;
        switch (this.itemType) {
         case Constant_1.ITEM_LAYER_TYPE.DRAGON_FIRE:
          this.price = Constant_1.ITEM_COST.DRAGON_FIRE;
          break;

         case Constant_1.ITEM_LAYER_TYPE.MONKEY_CANNON:
          this.price = Constant_1.ITEM_COST.MONKEY_CANNON;
          break;

         case Constant_1.ITEM_LAYER_TYPE.HEART:
          this.price = Constant_1.ITEM_COST.HEART;
        }
      };
      SelectedItemPanel.prototype.getPrice = function() {
        return this.price;
      };
      __decorate([ property(cc.Label) ], SelectedItemPanel.prototype, "quantity", void 0);
      __decorate([ property(cc.Label) ], SelectedItemPanel.prototype, "title", void 0);
      __decorate([ property(cc.Sprite) ], SelectedItemPanel.prototype, "item", void 0);
      SelectedItemPanel = __decorate([ ccclass ], SelectedItemPanel);
      return SelectedItemPanel;
    }(cc.Component);
    exports.default = SelectedItemPanel;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter"
  } ],
  SelectedTowerItemPageView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9e0bQ9kKNDN5HRAA2eW7Ch", "SelectedTowerItemPageView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var Utility_1 = require("../../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SelectedTowerItemPageView = function(_super) {
      __extends(SelectedTowerItemPageView, _super);
      function SelectedTowerItemPageView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pageView = null;
        _this.towerType = Constant_1.TOWER_TYPE.NORMAL_TOWER;
        return _this;
      }
      SelectedTowerItemPageView.prototype.onLoad = function() {};
      SelectedTowerItemPageView.prototype.start = function() {};
      SelectedTowerItemPageView.prototype.loadPageView = function(towerType, towerItem) {
        this.pageView.removeAllPages();
        this.towerType = towerType;
        var towerData = Utility_1.Utility.getItemsWithTowerSubType(this.towerType, Constant_1.TOWER_ARRANGEMENT.UNLOCKED_FIRST);
        for (var counter = 0; counter < towerData.length; counter++) {
          var item = cc.instantiate(towerItem);
          item.getComponent("SelectedTowerItem").updateTowerItem(this.towerType, towerData[counter]);
          this.pageView.addPage(item);
        }
        this.pageTurningEvent(null);
      };
      SelectedTowerItemPageView.prototype.pageTurningEvent = function(pageView) {
        var currentPage = this.pageView.getPages()[this.pageView.getCurrentPageIndex()];
        var script = currentPage.getComponent("SelectedTowerItem");
        var towerCost = script.getTowerCost();
        var towerSubType = script.getSubTowerType();
        var frame = script.item.spriteFrame;
        var itemData = {
          cost: towerCost,
          subtype: towerSubType,
          frame: frame
        };
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_UPDATED_COST_EVENTS, itemData);
      };
      SelectedTowerItemPageView.prototype.resetPageViewWithScrollingIndex = function(towerType, subTowerType, towerItem) {
        this.loadPageView(towerType, towerItem);
        var towerData = Utility_1.Utility.getItemsWithTowerSubType(this.towerType, Constant_1.TOWER_ARRANGEMENT.UNLOCKED_FIRST);
        var index = towerData.indexOf(subTowerType);
        this.pageView.setCurrentPageIndex(index);
      };
      __decorate([ property(cc.PageView) ], SelectedTowerItemPageView.prototype, "pageView", void 0);
      SelectedTowerItemPageView = __decorate([ ccclass ], SelectedTowerItemPageView);
      return SelectedTowerItemPageView;
    }(cc.Component);
    exports.default = SelectedTowerItemPageView;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Utilities/MessageCenter": "MessageCenter",
    "../../Utilities/Utility": "Utility"
  } ],
  SelectedTowerItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e8adGbeiBE2L6OMuwojUC4", "SelectedTowerItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var GameManager_1 = require("../../Manager/GameManager");
    var Utility_1 = require("../../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SelectedTowerItem = function(_super) {
      __extends(SelectedTowerItem, _super);
      function SelectedTowerItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.item = null;
        _this.towerIcons = [];
        _this.comingSoon = null;
        _this.towerType = Constant_1.TOWER_TYPE.NORMAL_TOWER;
        _this.towerCost = Constant_1.TOWER_COST.NORMAL_TOWER;
        _this.lockNode = null;
        _this.towerSubType = Constant_1.TOWER_SUB_TYPE.BLUE_TOWER;
        return _this;
      }
      SelectedTowerItem.prototype.onLoad = function() {};
      SelectedTowerItem.prototype.start = function() {};
      SelectedTowerItem.prototype.updateTowerItem = function(towerType, subTowerType) {
        this.towerType = towerType;
        this.towerSubType = subTowerType;
        this.title.string = Utility_1.Utility.getTowerName(this.towerSubType);
        this.item.spriteFrame = this.comingSoon;
        this.towerIcons[this.towerSubType] && (this.item.spriteFrame = this.towerIcons[this.towerSubType]);
        var towerLockStatus = GameManager_1.default.getInstance().getTowerLockedStatus(this.towerSubType);
        this.lockNode.active = !Boolean(towerLockStatus);
        this.setTowerCost();
      };
      SelectedTowerItem.prototype.setTowerCost = function() {
        this.towerCost = Constant_1.TOWER_COST.NORMAL_TOWER;
        switch (this.towerType) {
         case Constant_1.TOWER_TYPE.TANK_TOWER:
          this.towerCost = Constant_1.TOWER_COST.TANK_TOWER;
          break;

         case Constant_1.TOWER_TYPE.DRAGON_TOWER:
          this.towerCost = Constant_1.TOWER_COST.DRAGON_TOWER;
          break;

         case Constant_1.TOWER_TYPE.BUG_TOWER:
          this.towerCost = Constant_1.TOWER_COST.BUG_TOWER;
        }
      };
      SelectedTowerItem.prototype.getTowerCost = function() {
        return this.towerCost;
      };
      SelectedTowerItem.prototype.getSubTowerType = function() {
        return this.towerSubType;
      };
      __decorate([ property(cc.Label) ], SelectedTowerItem.prototype, "title", void 0);
      __decorate([ property(cc.Sprite) ], SelectedTowerItem.prototype, "item", void 0);
      __decorate([ property(cc.SpriteFrame) ], SelectedTowerItem.prototype, "towerIcons", void 0);
      __decorate([ property(cc.SpriteFrame) ], SelectedTowerItem.prototype, "comingSoon", void 0);
      __decorate([ property(cc.Node) ], SelectedTowerItem.prototype, "lockNode", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.TOWER_SUB_TYPE),
        visible: function() {
          this.updateTowerItem(this.towerType, this.towerSubType);
          return true;
        }
      }) ], SelectedTowerItem.prototype, "towerSubType", void 0);
      SelectedTowerItem = __decorate([ ccclass ], SelectedTowerItem);
      return SelectedTowerItem;
    }(cc.Component);
    exports.default = SelectedTowerItem;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/GameManager": "GameManager",
    "../../Utilities/Utility": "Utility"
  } ],
  Shield: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8a75jkMnZMgqnsb1dU825i", "Shield");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TurnInfo_1 = require("./TurnInfo");
    var MaterialInfo = [ {
      u_dH: 0,
      u_dS: 0,
      u_dL: 0
    }, {
      u_dH: 298.57,
      u_dS: -.14,
      u_dL: -.12
    }, {
      u_dH: 0,
      u_dS: 0,
      u_dL: 0
    }, {
      u_dH: 63.48,
      u_dS: -.14,
      u_dL: -.12
    }, {
      u_dH: 169.73,
      u_dS: -.14,
      u_dL: -.12
    } ];
    var Shield = function(_super) {
      __extends(Shield, _super);
      function Shield() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.color = 0;
        _this.totalLifeCount = 0;
        _this.shieldMaterial = null;
        _this.shieldArcRight = null;
        _this.shieldArcLeft = null;
        return _this;
      }
      Shield.prototype.onLoad = function() {
        this.shieldMaterial = this.node.getComponent(cc.Sprite).getMaterial(0);
      };
      Shield.prototype.changeColor = function(color) {
        this.shieldMaterial.setProperty("u_dH", MaterialInfo[color].u_dH);
        this.shieldMaterial.setProperty("u_dS", MaterialInfo[color].u_dS);
        this.shieldMaterial.setProperty("u_dL", MaterialInfo[color].u_dL);
      };
      Shield.prototype.setShieldArcSpriteFrame = function(direction) {
        direction == TurnInfo_1.TURN_TYPE.Right ? this.node.getComponent(cc.Sprite).spriteFrame = this.shieldArcRight : this.node.getComponent(cc.Sprite).spriteFrame = this.shieldArcLeft;
      };
      __decorate([ property(cc.SpriteFrame) ], Shield.prototype, "shieldArcRight", void 0);
      __decorate([ property(cc.SpriteFrame) ], Shield.prototype, "shieldArcLeft", void 0);
      Shield = __decorate([ ccclass ], Shield);
      return Shield;
    }(cc.Component);
    exports.default = Shield;
    cc._RF.pop();
  }, {
    "./TurnInfo": "TurnInfo"
  } ],
  ShopCoinsAndGems: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "afdc48XO6FA74tXjZRN6rmQ", "ShopCoinsAndGems");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var GameManager_1 = require("./Manager/GameManager");
    var MessageCenter_1 = require("./Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopCoinsAndGems = function(_super) {
      __extends(ShopCoinsAndGems, _super);
      function ShopCoinsAndGems() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hudLayer = null;
        return _this;
      }
      ShopCoinsAndGems.prototype.start = function() {
        this.hudLayer = this.node.parent.getChildByName("HUD");
      };
      ShopCoinsAndGems.prototype.closeButtonCallback = function(event, data) {
        this.enableTouch();
        this.node.getChildByName("PopUps").getChildByName("ConfirmationPopUp").active = false;
      };
      ShopCoinsAndGems.prototype.specialOfferCloseButtonCallback = function(event, data) {
        this.enableTouch();
        this.node.getChildByName("PopUps").getChildByName("SpecialOfferConfirmationPopUp").active = false;
      };
      ShopCoinsAndGems.prototype.confirmButtonCallback = function(event, data) {};
      ShopCoinsAndGems.prototype.specialOfferConfirmButtonCallBack = function(event, data) {
        var currencyData = JSON.parse(cc.sys.localStorage.getItem("CURRENCY"));
        var offerItems = this.node.getChildByName("SpecialOffer").getChildByName("ItemsLayout").getChildByName("items");
        offerItems.children.forEach(function(item) {
          var itemValue = parseInt(item.getChildByName("Label").getComponent(cc.Label).string);
          switch (item.name) {
           case "Coins":
            var totalCoins = GameManager_1.default.getInstance().getGameCoins() + itemValue;
            MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.COINS_PURCHASED_EVENT, totalCoins);
            break;

           case "Gems":
            var totalGems = GameManager_1.default.getInstance().getGameGems() + itemValue;
            MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.GEMS_PURCHASED_EVENT, totalGems);
            break;

           case "Revives":
            currencyData.revives += itemValue;
            break;

           case "Energy":
            MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, itemValue);
          }
        });
        cc.sys.localStorage.setItem("CURRENCY", JSON.stringify(currencyData));
        this.node.getChildByName("PopUps").getChildByName("SpecialOfferConfirmationPopUp").active = false;
        this.enableTouch();
      };
      ShopCoinsAndGems.prototype.specialOfferBuyButtonCallBack = function(event, data) {
        this.disableTouch();
        var specialOfferConfirmationPopUp = this.node.getChildByName("PopUps").getChildByName("SpecialOfferConfirmationPopUp");
        specialOfferConfirmationPopUp.active = true;
        var price = specialOfferConfirmationPopUp.getChildByName("ConfirmationPanel").getChildByName("Price");
        price.getComponent(cc.Label).string = this.node.getChildByName("SpecialOffer").getChildByName("Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string;
        var offerItems = this.node.getChildByName("SpecialOffer").getChildByName("ItemsLayout").getChildByName("items");
        offerItems.children.forEach(function(item) {
          var itemValue = parseInt(item.getChildByName("Label").getComponent(cc.Label).string);
          switch (item.name) {
           case "Coins":
            if (item.active) {
              var coinsItem = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("Coins");
              coinsItem.active = true;
              coinsItem.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
            break;

           case "Gems":
            if (item.active) {
              var gemsItem = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("Gems");
              gemsItem.active = true;
              gemsItem.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
            break;

           case "Revives":
            if (item.active) {
              var reviveItem = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("Revives");
              reviveItem.active = true;
              reviveItem.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
            break;

           case "Energy":
            if (item.active) {
              var energyItem = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("Energy");
              energyItem.active = true;
              energyItem.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
          }
        });
      };
      ShopCoinsAndGems.prototype.disableTouch = function() {
        this.node.getChildByName("PopUps").getComponent(cc.Button).enabled = true;
        this.node.parent.getChildByName("TouchDisabled").getComponent(cc.Button).enabled = true;
      };
      ShopCoinsAndGems.prototype.enableTouch = function() {
        this.node.getChildByName("PopUps").getComponent(cc.Button).enabled = false;
        this.node.parent.getChildByName("TouchDisabled").getComponent(cc.Button).enabled = false;
      };
      ShopCoinsAndGems = __decorate([ ccclass ], ShopCoinsAndGems);
      return ShopCoinsAndGems;
    }(cc.Component);
    exports.default = ShopCoinsAndGems;
    cc._RF.pop();
  }, {
    "./Constant": "Constant",
    "./Manager/GameManager": "GameManager",
    "./Utilities/MessageCenter": "MessageCenter"
  } ],
  ShopItems: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7d8cWBZmFOQqcEB5WC/BdC", "ShopItems");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameManager_1 = require("./Manager/GameManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ITEMPRICE = {
      item: 1.99
    };
    var ShopCoinsAndGems = function(_super) {
      __extends(ShopCoinsAndGems, _super);
      function ShopCoinsAndGems() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.selectedItemName = "LandMine";
        _this.selectedItemCount = null;
        _this.totalPriceForSelctedItem = null;
        _this.itemsLayout = null;
        _this.selectedBtnSpriteFrame = null;
        _this.selectBtnSpriteFrame = null;
        return _this;
      }
      ShopCoinsAndGems.prototype.start = function() {};
      ShopCoinsAndGems.prototype.closeButtonCallback = function(event, data) {
        this.enableTouch();
        this.node.getChildByName("PopUps").getChildByName("ConfirmationPopUp").active = false;
      };
      ShopCoinsAndGems.prototype.buyItemButtonCallback = function(event, data) {
        if (parseInt(this.selectedItemCount.getComponent(cc.Label).string) > 0) {
          this.disableTouch();
          var confirmationPopUp = this.node.getChildByName("PopUps").getChildByName("ConfirmationPopUp");
          confirmationPopUp.active = true;
          confirmationPopUp.getChildByName("ConfirmationPanel").getChildByName("Price").getComponent(cc.Label).string = this.totalPriceForSelctedItem.getComponent(cc.Label).string;
          confirmationPopUp.getChildByName("ItemInfoPanel").getChildByName("NoOfItems").getComponent(cc.Label).string = this.selectedItemCount.getComponent(cc.Label).string;
          confirmationPopUp.getChildByName("ItemInfoPanel").getChildByName("ItemName").getComponent(cc.Label).string = this.selectedItemCount.parent.parent.getChildByName("ItemName").getComponent(cc.Label).string;
          confirmationPopUp.getChildByName("ItemInfoPanel").getChildByName("Item").getComponent(cc.Sprite).spriteFrame = this.selectedItemCount.parent.parent.getChildByName("Item").getComponent(cc.Sprite).spriteFrame;
        }
      };
      ShopCoinsAndGems.prototype.specialOfferCloseButtonCallback = function(event, data) {
        this.enableTouch();
        this.node.getChildByName("PopUps").getChildByName("SpecialOfferConfirmationPopUp").active = false;
      };
      ShopCoinsAndGems.prototype.confirmButtonCallback = function(event, data) {
        var itemValue = parseInt(this.node.getChildByName("PopUps").getChildByName("ConfirmationPopUp").getChildByName("ItemInfoPanel").getChildByName("NoOfItems").getComponent(cc.Label).string);
        switch (this.selectedItemName) {
         case "LandMine":
          GameManager_1.default.getInstance().incrementInGameLandMineItem(itemValue);
          break;

         case "MagicHeart":
          GameManager_1.default.getInstance().incrementInGameHeartItem(itemValue);
          break;

         case "MonkeyCannon":
          GameManager_1.default.getInstance().incrementInGameMonkeyCannonItem(itemValue);
          break;

         case "DragonFire":
          GameManager_1.default.getInstance().incrementInGameDragonItem(itemValue);
        }
        this.selectedItemCount.getComponent(cc.Label).string = 1..toString();
        this.node.getChildByName("PopUps").getChildByName("ConfirmationPopUp").active = false;
        this.enableTouch();
      };
      ShopCoinsAndGems.prototype.plusButtonCallback = function(event, customEventData) {
        this.selectedItemCount.getComponent(cc.Label).string = (parseInt(this.selectedItemCount.getComponent(cc.Label).string) + 1).toString();
        this.totalPriceForSelctedItem.getComponent(cc.Label).string = "$" + (parseInt(this.selectedItemCount.getComponent(cc.Label).string) * ITEMPRICE.item).toString();
      };
      ShopCoinsAndGems.prototype.minusButtonCallback = function(event, customEventData) {
        parseInt(this.selectedItemCount.getComponent(cc.Label).string) > 0 && (this.selectedItemCount.getComponent(cc.Label).string = (parseInt(this.selectedItemCount.getComponent(cc.Label).string) - 1).toString());
        this.totalPriceForSelctedItem.getComponent(cc.Label).string = "$" + (parseInt(this.selectedItemCount.getComponent(cc.Label).string) * ITEMPRICE.item).toString();
      };
      ShopCoinsAndGems.prototype.selectButtonCallback = function(event, customEventData) {
        for (var i = 0; i < this.itemsLayout.childrenCount; ++i) if (customEventData == i + 1) {
          this.selectedItemName = this.itemsLayout.children[i].name;
          this.itemsLayout.children[i].getChildByName("SelectButton").getChildByName("Label").getComponent(cc.Label).string = "Selected";
          this.itemsLayout.children[i].getChildByName("SelectButton").getComponent(cc.Sprite).spriteFrame = this.selectedBtnSpriteFrame;
          this.selectedItemCount.parent.parent.getChildByName("Item").getComponent(cc.Sprite).spriteFrame = this.itemsLayout.children[i].getChildByName("Item").getComponent(cc.Sprite).spriteFrame;
          this.selectedItemCount.parent.parent.getChildByName("ItemName").getComponent(cc.Label).string = this.itemsLayout.children[i].getChildByName("ItemName").getComponent(cc.Label).string;
          this.selectedItemCount.getComponent(cc.Label).string = 1..toString();
          this.totalPriceForSelctedItem.getComponent(cc.Label).string = "$" + (parseInt(this.selectedItemCount.getComponent(cc.Label).string) * ITEMPRICE.item).toString();
        } else {
          this.itemsLayout.children[i].getChildByName("SelectButton").getChildByName("Label").getComponent(cc.Label).string = "Select";
          this.itemsLayout.children[i].getChildByName("SelectButton").getComponent(cc.Sprite).spriteFrame = this.selectBtnSpriteFrame;
        }
      };
      ShopCoinsAndGems.prototype.specialOfferConfirmButtonCallBack = function(event, data) {
        var offerItems = this.node.getChildByName("SpecialOffer").getChildByName("ItemsLayout").getChildByName("items");
        offerItems.children.forEach(function(item) {
          var itemValue = parseInt(item.getChildByName("Label").getComponent(cc.Label).string);
          switch (item.name) {
           case "LandMines":
            GameManager_1.default.getInstance().incrementInGameLandMineItem(itemValue);
            break;

           case "MagicHearts":
            GameManager_1.default.getInstance().incrementInGameHeartItem(itemValue);
            break;

           case "MonkeyCannons":
            GameManager_1.default.getInstance().incrementInGameMonkeyCannonItem(itemValue);
            break;

           case "DragonFire":
            GameManager_1.default.getInstance().incrementInGameDragonItem(itemValue);
          }
        });
        this.node.getChildByName("PopUps").getChildByName("SpecialOfferConfirmationPopUp").active = false;
        this.enableTouch();
      };
      ShopCoinsAndGems.prototype.specialOfferBuyButtonCallBack = function(event, data) {
        this.disableTouch();
        var specialOfferConfirmationPopUp = this.node.getChildByName("PopUps").getChildByName("SpecialOfferConfirmationPopUp");
        specialOfferConfirmationPopUp.active = true;
        var price = specialOfferConfirmationPopUp.getChildByName("ConfirmationPanel").getChildByName("Price");
        price.getComponent(cc.Label).string = this.node.getChildByName("SpecialOffer").getChildByName("Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string;
        var offerItems = this.node.getChildByName("SpecialOffer").getChildByName("ItemsLayout").getChildByName("items");
        offerItems.children.forEach(function(item) {
          var itemValue = parseInt(item.getChildByName("Label").getComponent(cc.Label).string);
          switch (item.name) {
           case "LandMines":
            if (item.active) {
              var item_1 = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("LandMines");
              item_1.active = true;
              item_1.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
            break;

           case "MagicHearts":
            if (item.active) {
              var item_2 = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("MagicHearts");
              item_2.active = true;
              item_2.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
            break;

           case "MonkeyCannons":
            if (item.active) {
              item = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("MonkeyCannons");
              item.active = true;
              item.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
            break;

           case "DragonFire":
            if (item.active) {
              var item_3 = specialOfferConfirmationPopUp.getChildByName("OfferDetail").getChildByName("Items").getChildByName("DragonFire");
              item_3.active = true;
              item_3.getChildByName("Label").getComponent(cc.Label).string = itemValue.toString();
            }
          }
        });
      };
      ShopCoinsAndGems.prototype.disableTouch = function() {
        this.node.getChildByName("PopUps").getComponent(cc.Button).enabled = true;
        this.node.parent.getChildByName("TouchDisabled").getComponent(cc.Button).enabled = true;
      };
      ShopCoinsAndGems.prototype.enableTouch = function() {
        this.node.getChildByName("PopUps").getComponent(cc.Button).enabled = false;
        this.node.parent.getChildByName("TouchDisabled").getComponent(cc.Button).enabled = false;
      };
      __decorate([ property(cc.Node) ], ShopCoinsAndGems.prototype, "selectedItemCount", void 0);
      __decorate([ property(cc.Node) ], ShopCoinsAndGems.prototype, "totalPriceForSelctedItem", void 0);
      __decorate([ property(cc.Node) ], ShopCoinsAndGems.prototype, "itemsLayout", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShopCoinsAndGems.prototype, "selectedBtnSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShopCoinsAndGems.prototype, "selectBtnSpriteFrame", void 0);
      ShopCoinsAndGems = __decorate([ ccclass ], ShopCoinsAndGems);
      return ShopCoinsAndGems;
    }(cc.Component);
    exports.default = ShopCoinsAndGems;
    cc._RF.pop();
  }, {
    "./Manager/GameManager": "GameManager"
  } ],
  Shop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22831F1HbxEDqgIGsY4mQUz", "Shop");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base_1 = require("./Base/Base");
    var Constant_1 = require("./Constant");
    var AdManager_1 = require("./Manager/AdManager");
    var GameManager_1 = require("./Manager/GameManager");
    var IAPManager_1 = require("./Manager/IAPManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var MessageCenter_1 = require("./Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var Shop = function(_super) {
      __extends(Shop, _super);
      function Shop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.purchaseSuccessful = null;
        _this.sideIcons = [];
        _this.activeSideIconsFrame = [];
        _this.inActiveSideIconsFrame = [];
        _this.shopLayers = [];
        _this.itemsLayer = Constant_1.SHOP_SCENE_LAYER_TYPE.COINS_AND_GEMS_LAYER;
        _this.purchaseConfirmationNode = null;
        _this.currentPurchaseData = null;
        _this.currentSelectedTab = Constant_1.SHOP_SCENE_LAYER_TYPE.COINS_AND_GEMS_LAYER;
        return _this;
      }
      Shop.prototype.onLoad = function() {
        this.registerEvents();
        this.currentPurchaseData = null;
        GameManager_1.default.getInstance().setCurrentScene(Constant_1.SCENE_TYPE.SHOP_SCENE);
        GameManager_1.default.getInstance().setIsIpad(this.node.width, this.node.height);
        this.addHUDLayerWithData("S H O P", true, "MainMenu");
        this.showRestoreButton();
        this.currentSelectedTab = this.itemsLayer;
        this.updateLayersAndIcon();
        this.addIAPListener();
      };
      Shop.prototype.onDestroy = function() {
        this.unregisterEvents();
      };
      Shop.prototype.sidebarTabCallback = function(event, customEventData) {
        if (this.currentSelectedTab == parseInt(customEventData)) return;
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.currentSelectedTab = parseInt(customEventData);
        this.updateLayersAndIcon();
      };
      Shop.prototype.updateLayersAndIcon = function() {
        var _this = this;
        this.sideIcons.forEach(function(element) {
          var elementIndex = _this.sideIcons.indexOf(element);
          var frame = _this.inActiveSideIconsFrame[elementIndex];
          _this.shopLayers[elementIndex].active = false;
          if (elementIndex == _this.currentSelectedTab) {
            frame = _this.activeSideIconsFrame[elementIndex];
            _this.shopLayers[elementIndex].active = true;
          }
          element.spriteFrame = frame;
        });
      };
      Shop.prototype.registerEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.GEMS_PURCHASED_EVENT, this.gemsPurchaseInitiateEventCallback.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.COINS_PURCHASED_EVENT, this.coinsPurchaseInitiateEventCallback.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_PURCHASE_EVENTS, this.towerPurchasedCallback.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_PURCHASE_EVENTS, this.itemPurchasedCallback.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.SPECIAL_PURCHASE_EVENT, this.specialOfferPurchaseEventCallback.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.OPEN_OUT_OF_ENERGY_POPUP, this.showOutOfEnergyPopup.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, this.onEnergyPurchasedCB.bind(this), this.node);
      };
      Shop.prototype.unregisterEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.GEMS_PURCHASED_EVENT, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.COINS_PURCHASED_EVENT, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_PURCHASE_EVENTS, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.ITEM_PURCHASE_EVENTS, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.SPECIAL_PURCHASE_EVENT, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.OPEN_OUT_OF_ENERGY_POPUP, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.ENERGY_EVENT_CALLBACK, this.node);
      };
      Shop.prototype.specialOfferPurchaseEventCallback = function(data) {
        this.showLoader();
        IAPManager_1.default.getInstance().purchaseProduct(data.purchaseID);
      };
      Shop.prototype.specialOfferPurchaseConfirmation = function(purchaseID) {
        var data = GameManager_1.default.getInstance().getSpecialPurchaseStatus();
        this.removeLoader();
        if (purchaseID == Constant_1.IAP_PURCHASE_ID.SPECIAL_1) {
          GameManager_1.default.getInstance().setTowerLockedStatus(Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER, 1);
          data["PACK_1"] = true;
        } else if (purchaseID == Constant_1.IAP_PURCHASE_ID.SPECIAL_2) {
          GameManager_1.default.getInstance().setTowerLockedStatus(Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER, 1);
          data["PACK_2"] = true;
        }
        GameManager_1.default.getInstance().setSpecialPurchaseStatus(data);
        this.hudLayer.getComponent("HUD").updateInGameGems(600);
        this.hudLayer.getComponent("HUD").updateInGameCoins(2e3);
        this.hudLayer.getComponent("HUD").updateInGameEnergy(50);
        this.specialPurchaseConfirmationReceived();
      };
      Shop.prototype.gemsPurchaseInitiateEventCallback = function(data) {
        this.currentPurchaseData = data;
        this.showLoader();
        IAPManager_1.default.getInstance().purchaseProduct(data.purchaseID);
      };
      Shop.prototype.addIAPListener = function() {
        var _this = this;
        IAPManager_1.default.getInstance().setListener(function(data, error) {
          _this.removeLoader();
          if (!error) {
            data.name == Constant_1.IAP_PURCHASE_ID.SPECIAL_1 || data.name == Constant_1.IAP_PURCHASE_ID.SPECIAL_2 ? _this.specialOfferPurchaseConfirmation(data.name) : _this.userConfirmationReceivedForGems(data.name);
            GameManager_1.default.getInstance().setGameAdsStatus("0");
            AdManager_1.default.getInstance().updateAdsStatus(false);
          }
        });
      };
      Shop.prototype.userConfirmationReceivedForGems = function(productID) {
        SoundManager_1.default.getInstance().playEffect(this.purchaseSuccessful, false, 1);
        var gemsCount = 0;
        switch (productID) {
         case Constant_1.IAP_PURCHASE_ID.Gems_300:
          gemsCount = 300;
          break;

         case Constant_1.IAP_PURCHASE_ID.Gems_1000:
          gemsCount = 1e3;
          break;

         case Constant_1.IAP_PURCHASE_ID.Gems_2500:
          gemsCount = 2500;
          break;

         case Constant_1.IAP_PURCHASE_ID.Gems_7000:
          gemsCount = 7e3;
          break;

         case Constant_1.IAP_PURCHASE_ID.Gems_17000:
          gemsCount = 17e3;
          break;

         case Constant_1.IAP_PURCHASE_ID.Gems_120000:
          gemsCount = 12e4;
        }
        this.hudLayer.getComponent("HUD").updateInGameGems(gemsCount);
      };
      Shop.prototype.coinsPurchaseInitiateEventCallback = function(data) {
        var gems = parseInt(data.gems);
        var coins = parseInt(data.coins);
        if (Number.isNaN(gems) || Number.isNaN(coins)) this.showGeneralPopup(Constant_1.ALERT_TITLE.ALERT_MESSAGE, Constant_1.ALERT_MESSAGES.SOMETHING_WENT_WRONG); else if (gems > GameManager_1.default.getInstance().getGameGems()) this.showGeneralPopup(Constant_1.ALERT_TITLE.ALERT_MESSAGE, Constant_1.ALERT_MESSAGES.INSUFFICIENT_BALANCE); else {
          this.currentPurchaseData = data;
          var message = {
            title: Constant_1.ALERT_TITLE.CONFIRM_PURCHASE_MESSAGE,
            sureCallback: this.userConfirmationReceivedForCoins.bind(this),
            cancelCallback: this.removePopupFromGame.bind(this),
            itemCount: data.coins,
            messageType: Constant_1.SHOW_POPUP_TYPE.PURCHASE_COINS_POPUP,
            itemFrame: data.frame
          };
          this.showCoinsPurchasePopup(message);
        }
      };
      Shop.prototype.removePopupFromGame = function() {
        this.currentPurchaseData = null;
      };
      Shop.prototype.userConfirmationReceivedForCoins = function() {
        SoundManager_1.default.getInstance().playEffect(this.purchaseSuccessful, false, 1);
        this.hudLayer.getComponent("HUD").updateInGameGems(-this.currentPurchaseData.gems);
        this.hudLayer.getComponent("HUD").updateInGameCoins(this.currentPurchaseData.coins);
        this.removePopupFromGame();
        this.showGeneralPopup(Constant_1.ALERT_TITLE.PURCHASE_SUCCESS_MESSAGE, Constant_1.ALERT_MESSAGES.COINS_PURCHASE_SUCCESSFUL);
      };
      Shop.prototype.towerPurchasedCallback = function(data) {
        var gems = data.cost;
        if (Number.isNaN(gems) || Number.isNaN(gems)) this.showGeneralPopup(Constant_1.ALERT_TITLE.ALERT_MESSAGE, Constant_1.ALERT_MESSAGES.SOMETHING_WENT_WRONG); else if (gems > GameManager_1.default.getInstance().getGameGems()) this.showGeneralPopup(Constant_1.ALERT_TITLE.ALERT_MESSAGE, Constant_1.ALERT_MESSAGES.INSUFFICIENT_BALANCE); else {
          this.currentPurchaseData = data;
          var message = {
            title: Constant_1.ALERT_TITLE.CONFIRM_PURCHASE_MESSAGE,
            itemCount: 1,
            messageType: Constant_1.SHOW_POPUP_TYPE.TOWER_PURCHASE_POPUP,
            frame: data.frame,
            sureCallback: this.userConfirmedTowerPurchased.bind(this),
            cancelCallback: this.removePopupFromGame.bind(this)
          };
          this.showItemPurchasePopup(message);
        }
      };
      Shop.prototype.userConfirmedTowerPurchased = function() {
        SoundManager_1.default.getInstance().playEffect(this.purchaseSuccessful, false, 1);
        this.hudLayer.getComponent("HUD").updateInGameGems(-this.currentPurchaseData.cost);
        GameManager_1.default.getInstance().setTowerLockedStatus(this.currentPurchaseData.subtype, 1);
        var towerNode = this.shopLayers[Constant_1.SHOP_SCENE_LAYER_TYPE.TOWERS_LAYER];
        towerNode.getComponent("TowerItemPanel").updatePageViewWithIndex();
        this.removePopupFromGame();
        this.showGeneralPopup(Constant_1.ALERT_TITLE.PURCHASE_SUCCESS_MESSAGE, Constant_1.ALERT_MESSAGES.TOWER_CREDITED_SUCCESSFUL);
      };
      Shop.prototype.itemPurchasedCallback = function(data) {
        var coinsCost = data.cost;
        if (Number.isNaN(coinsCost) || Number.isNaN(coinsCost)) this.showGeneralPopup(Constant_1.ALERT_TITLE.ALERT_MESSAGE, Constant_1.ALERT_MESSAGES.SOMETHING_WENT_WRONG); else if (coinsCost > GameManager_1.default.getInstance().getGameCoins()) this.showGeneralPopup(Constant_1.ALERT_TITLE.ALERT_MESSAGE, Constant_1.ALERT_MESSAGES.INSUFFICIENT_BALANCE); else {
          this.currentPurchaseData = data;
          var message = {
            title: Constant_1.ALERT_TITLE.CONFIRM_PURCHASE_MESSAGE,
            itemCount: data.quantity,
            messageType: Constant_1.SHOW_POPUP_TYPE.ITEM_PURCHASE_POPUP,
            frame: data.frame,
            sureCallback: this.userConfirmedItemPurchased.bind(this),
            cancelCallback: this.removePopupFromGame.bind(this)
          };
          this.showItemPurchasePopup(message);
        }
      };
      Shop.prototype.userConfirmedItemPurchased = function() {
        SoundManager_1.default.getInstance().playEffect(this.purchaseSuccessful, false, 1);
        this.hudLayer.getComponent("HUD").updateInGameCoins(-this.currentPurchaseData.cost);
        var quantity = parseInt(this.currentPurchaseData.quantity);
        this.currentPurchaseData.type == Constant_1.ITEM_LAYER_TYPE.LAND_MINE ? GameManager_1.default.getInstance().incrementInGameLandMineItem(quantity) : this.currentPurchaseData.type == Constant_1.ITEM_LAYER_TYPE.DRAGON_FIRE ? GameManager_1.default.getInstance().incrementInGameDragonItem(quantity) : this.currentPurchaseData.type == Constant_1.ITEM_LAYER_TYPE.HEART ? GameManager_1.default.getInstance().incrementInGameHeartItem(quantity) : this.currentPurchaseData.type == Constant_1.ITEM_LAYER_TYPE.MONKEY_CANNON && GameManager_1.default.getInstance().incrementInGameMonkeyCannonItem(quantity);
        this.removePopupFromGame();
        this.showGeneralPopup(Constant_1.ALERT_TITLE.CONFIRM_PURCHASE_MESSAGE, Constant_1.ALERT_MESSAGES.ITEM_CREDITED_SUCCESSFUL);
      };
      Shop.prototype.specialPurchaseConfirmationReceived = function() {
        var specialPurchasePanel = this.shopLayers[Constant_1.SHOP_SCENE_LAYER_TYPE.SPECIAL_OFFER_LAYER];
        specialPurchasePanel.getComponent("SpecialOfferPanel").updateSpecialPanelStatus();
      };
      __decorate([ property(cc.AudioClip) ], Shop.prototype, "purchaseSuccessful", void 0);
      __decorate([ property(cc.Sprite) ], Shop.prototype, "sideIcons", void 0);
      __decorate([ property(cc.SpriteFrame) ], Shop.prototype, "activeSideIconsFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], Shop.prototype, "inActiveSideIconsFrame", void 0);
      __decorate([ property(cc.Node) ], Shop.prototype, "shopLayers", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.SHOP_SCENE_LAYER_TYPE),
        visible: function() {
          this.currentSelectedTab = this.itemsLayer;
          this.updateLayersAndIcon(this.itemsLayer);
          return true;
        }
      }) ], Shop.prototype, "itemsLayer", void 0);
      Shop = __decorate([ ccclass ], Shop);
      return Shop;
    }(Base_1.default);
    exports.default = Shop;
    cc._RF.pop();
  }, {
    "./Base/Base": "Base",
    "./Constant": "Constant",
    "./Manager/AdManager": "AdManager",
    "./Manager/GameManager": "GameManager",
    "./Manager/IAPManager": "IAPManager",
    "./Manager/SoundManager": "SoundManager",
    "./Utilities/MessageCenter": "MessageCenter"
  } ],
  SoundManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b4f54nZllB3odu5+Bmth45", "SoundManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SOUND_MUSIC_KEY_DATA = {
      MUSIC_KEY: "MUSIC_SETTING",
      SOUND_KEY: "SOUND_SETTING"
    };
    var SoundManager = function() {
      function SoundManager() {
        this.MUSIC_ENABLED = true;
        this.SOUND_ENABLED = true;
        this.audioNo = 0;
        this.audioPool = [];
        this.effectsPriorityPool = [];
        this.priorityList = {};
        this.priorityClips = 6;
        this.musicAudioClipName = null;
      }
      SoundManager.getInstance = function() {
        SoundManager.instance || (SoundManager.instance = new SoundManager());
        return SoundManager.instance;
      };
      SoundManager.prototype.removeAudio = function(id) {
        var index = this.audioPool.indexOf(id);
        if (index > -1) {
          delete this.priorityList[id];
          this.audioPool.splice(index, 1);
        }
      };
      SoundManager.prototype.playEffect = function(clipName, loop, volume) {
        if (this.SOUND_ENABLED) {
          this.maxNum = cc.audioEngine.getMaxAudioInstance();
          if (this.getSoundSettingData()) {
            if (this.audioPool.length >= this.maxNum - 2) {
              var index = 0;
              for (var i = 0; i < this.priorityClips; ++i) if (this.priorityList[this.audioPool[index]]) index++; else {
                var alreadyPlayedAudio = this.audioPool.splice(index, 1);
                delete this.priorityList[alreadyPlayedAudio[0]];
                cc.audioEngine.stopEffect(alreadyPlayedAudio[0]);
              }
            }
            var audioNo = cc.audioEngine.play(clipName, loop, volume);
            this.audioPool.push(audioNo);
            this.priorityList[audioNo] = this.effectsPriorityPool.includes(clipName);
            cc.audioEngine.setFinishCallback(audioNo, this.removeAudio.bind(this, audioNo));
            return audioNo;
          }
        }
      };
      SoundManager.prototype.addEffectToPriorityList = function(effect) {
        this.effectsPriorityPool.push(effect);
      };
      SoundManager.prototype.playMusic = function(clipName, loop) {
        if (this.MUSIC_ENABLED && this.getMusicSettingData() && this.musicAudioClipName != clipName) {
          this.musicAudioClipName = clipName;
          cc.audioEngine.playMusic(clipName, loop);
          cc.audioEngine.setMusicVolume(.6);
        }
      };
      SoundManager.prototype.stopEffect = function(audioNo) {
        cc.audioEngine.stopEffect(audioNo);
        var index = this.audioPool.indexOf(audioNo);
        this.audioPool.splice(index, 1);
        delete this.priorityList[audioNo];
      };
      SoundManager.prototype.stopMusic = function() {
        cc.audioEngine.stopMusic();
        this.musicAudioClipName = null;
      };
      SoundManager.prototype.stopAllSounds = function() {
        cc.audioEngine.stopAllEffects();
        this.audioPool = [];
      };
      SoundManager.prototype.setMusicSettingData = function(musicValue) {
        Number.isInteger(musicValue) || (musicValue = 0);
        this.MUSIC_ENABLED = 1 == musicValue;
        cc.sys.localStorage.setItem(SOUND_MUSIC_KEY_DATA.MUSIC_KEY, musicValue);
      };
      SoundManager.prototype.getMusicSettingData = function() {
        var musicValue = cc.sys.localStorage.getItem(SOUND_MUSIC_KEY_DATA.MUSIC_KEY);
        if (null == musicValue || !Number.isInteger(parseInt(musicValue))) {
          musicValue = 1;
          this.setMusicSettingData(musicValue);
          return musicValue;
        }
        return parseInt(musicValue);
      };
      SoundManager.prototype.setSoundSettingData = function(soundValue) {
        Number.isInteger(soundValue) || (soundValue = 0);
        this.SOUND_ENABLED = 1 == soundValue;
        cc.sys.localStorage.setItem(SOUND_MUSIC_KEY_DATA.SOUND_KEY, soundValue);
      };
      SoundManager.prototype.getSoundSettingData = function() {
        var soundValue = cc.sys.localStorage.getItem(SOUND_MUSIC_KEY_DATA.SOUND_KEY);
        if (null == soundValue || !Number.isInteger(parseInt(soundValue))) {
          soundValue = 1;
          this.setSoundSettingData(soundValue);
          return soundValue;
        }
        return parseInt(soundValue);
      };
      SoundManager.prototype.playButtonClickSoundEffect = function() {
        var ref = this;
        cc.resources.load("Audios/buttonClickSound", cc.AudioClip, function(err, asset) {
          ref.SOUND_ENABLED && ref.getSoundSettingData() && cc.audioEngine.play(asset, false, .8);
        });
      };
      return SoundManager;
    }();
    exports.default = SoundManager;
    cc._RF.pop();
  }, {} ],
  SpecialOfferPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e03fCxaBVDRLzEqPZPQmp8", "SpecialOfferPanel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameManager_1 = require("../../Manager/GameManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpecialOfferPanel = function(_super) {
      __extends(SpecialOfferPanel, _super);
      function SpecialOfferPanel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.comingSoon = null;
        _this.offer1 = null;
        _this.offer2 = null;
        return _this;
      }
      SpecialOfferPanel.prototype.onLoad = function() {};
      SpecialOfferPanel.prototype.start = function() {
        this.updateSpecialPanelStatus();
      };
      SpecialOfferPanel.prototype.updateSpecialPanelStatus = function() {
        var specialPurchaseStats = GameManager_1.default.getInstance().getSpecialPurchaseStatus();
        this.offer1.active = !specialPurchaseStats.PACK_1;
        this.offer2.active = !specialPurchaseStats.PACK_2;
        specialPurchaseStats.PACK_1 && specialPurchaseStats.PACK_2 ? specialPurchaseStats.PACK_1 && specialPurchaseStats.PACK_2 && (this.comingSoon.active = true) : this.comingSoon.active = false;
      };
      __decorate([ property(cc.Node) ], SpecialOfferPanel.prototype, "comingSoon", void 0);
      __decorate([ property(cc.Node) ], SpecialOfferPanel.prototype, "offer1", void 0);
      __decorate([ property(cc.Node) ], SpecialOfferPanel.prototype, "offer2", void 0);
      SpecialOfferPanel = __decorate([ ccclass ], SpecialOfferPanel);
      return SpecialOfferPanel;
    }(cc.Component);
    exports.default = SpecialOfferPanel;
    cc._RF.pop();
  }, {
    "../../Manager/GameManager": "GameManager"
  } ],
  SpecialOffer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0fd9a32ntxLiauEQVXNbKOS", "SpecialOffer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var GameManager_1 = require("../../Manager/GameManager");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var SpecialOffer = function(_super) {
      __extends(SpecialOffer, _super);
      function SpecialOffer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bugTowerFrame = null;
        _this.dragonTowerFrame = null;
        _this.dragonTowerBG = null;
        _this.bugTowerBG = null;
        _this.towerIcon = null;
        _this.bg = null;
        _this.offerDetails = null;
        _this.specialPurchaseTitle = null;
        _this.itemList = [];
        _this.coinsCount = 2e3;
        _this.gemsCount = 600;
        _this.energyCount = 50;
        _this.purchaseID = "Speical_Offer_1";
        _this.type = null;
        _this.specialBugColorCode = cc.color(63, 209, 234, 255);
        _this.specialTowerColorCode = cc.color(112, 46, 140, 255);
        _this.subTowerType = Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER;
        _this.towerType = Constant_1.TOWER_TYPE.DRAGON_TOWER;
        return _this;
      }
      SpecialOffer.prototype.start = function() {
        GameManager_1.default.getInstance().isDeviceIPad() || this.node.setScale(1);
        this.updateOfferDetails();
      };
      SpecialOffer.prototype.updateOfferDetails = function() {
        this.type = this.subTowerType;
        var dragonTitle = "Dragon Tower";
        this.towerIcon.spriteFrame = this.dragonTowerFrame;
        this.bg.spriteFrame = this.dragonTowerBG;
        this.specialPurchaseTitle.string = "SPECIAL PACK 1";
        if (this.type == Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER) {
          dragonTitle = "Bug Tower";
          this.towerType = Constant_1.TOWER_TYPE.BUG_TOWER;
          this.towerIcon.spriteFrame = this.bugTowerFrame;
          this.bg.spriteFrame = this.bugTowerBG;
          this.specialPurchaseTitle.string = "SPECIAL PACK 2";
          this.purchaseID = "Speical_Offer_2";
        }
        this.offerDetails.string = this.coinsCount + " Coins, " + this.gemsCount + " Gems, " + this.energyCount + " Energy Bars, " + dragonTitle + " and NoAds";
        this.updateIconBaseImg();
      };
      SpecialOffer.prototype.updateIconBaseImg = function() {
        var color = this.type == Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER ? this.specialBugColorCode : this.specialTowerColorCode;
        this.itemList.forEach(function(element) {
          element.node.color = color;
        });
      };
      SpecialOffer.prototype.onBtnCB = function(event, customEventData) {
        var data = {
          coinCount: this.coinsCount,
          gemsCount: this.gemsCount,
          engeryCount: this.energyCount,
          towerType: this.towerType,
          subTowerType: this.subTowerType,
          purchaseID: this.purchaseID
        };
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.SPECIAL_PURCHASE_EVENT, data);
      };
      SpecialOffer.prototype.closePopup = function() {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.node.removeFromParent(true);
      };
      __decorate([ property(cc.SpriteFrame) ], SpecialOffer.prototype, "bugTowerFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpecialOffer.prototype, "dragonTowerFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpecialOffer.prototype, "dragonTowerBG", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpecialOffer.prototype, "bugTowerBG", void 0);
      __decorate([ property(cc.Sprite) ], SpecialOffer.prototype, "towerIcon", void 0);
      __decorate([ property(cc.Sprite) ], SpecialOffer.prototype, "bg", void 0);
      __decorate([ property(cc.Label) ], SpecialOffer.prototype, "offerDetails", void 0);
      __decorate([ property(cc.Label) ], SpecialOffer.prototype, "specialPurchaseTitle", void 0);
      __decorate([ property(cc.Sprite) ], SpecialOffer.prototype, "itemList", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.TOWER_SUB_TYPE),
        visible: function() {
          this.updateOfferDetails();
          return true;
        }
      }) ], SpecialOffer.prototype, "subTowerType", void 0);
      SpecialOffer = __decorate([ ccclass ], SpecialOffer);
      return SpecialOffer;
    }(cc.Component);
    exports.default = SpecialOffer;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/GameManager": "GameManager",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter"
  } ],
  SpecialPurchasePopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "83fdd2rMR9DJp0mQyy2xV6B", "SpecialPurchasePopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Constant_1 = require("../Constant");
    var SpecialPurchasePopup = function(_super) {
      __extends(SpecialPurchasePopup, _super);
      function SpecialPurchasePopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.towerIcon = null;
        _this.coinsLabel = null;
        _this.gemsLabel = null;
        _this.energyLabel = null;
        _this.offerDetails = null;
        _this.cancelBtn = null;
        _this.confirmBtn = null;
        _this.coinsCount = 2e3;
        _this.gemsCount = 600;
        _this.energyCount = 50;
        _this.noAds = true;
        _this.specialBugColorCode = cc.color(63, 209, 234, 255);
        _this.specialTowerColorCode = cc.color(112, 46, 140, 255);
        _this.subTowerType = Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER;
        return _this;
      }
      SpecialPurchasePopup.prototype.start = function() {
        this.updateOfferDetails();
      };
      SpecialPurchasePopup.prototype.updateOfferDetails = function() {
        var dragonTitle = "Dragon Tower";
        this.towerIcon.node.color = this.specialTowerColorCode;
        if (this.subTowerType == Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER) {
          dragonTitle = "Bug Tower";
          this.towerIcon.node.color = this.specialBugColorCode;
        }
        this.offerDetails.string = this.coinsCount + " Coins, " + this.gemsCount + " Gems, " + this.energyCount + " Energy Bars, " + dragonTitle + " and NoAds";
      };
      SpecialPurchasePopup.prototype.showPopup = function(message) {
        this.confirmBtn.node.on("click", message.sureCallback);
        this.cancelBtn.node.on("click", message.cancelCallback);
        this.coinsCount = message.coinCount;
        this.gemsCount = message.gemsCount;
        this.energyCount = message.engeryCount;
        this.subTowerType = message.subTowerType;
        this.updateOfferDetails();
      };
      __decorate([ property(cc.Sprite) ], SpecialPurchasePopup.prototype, "towerIcon", void 0);
      __decorate([ property(cc.Label) ], SpecialPurchasePopup.prototype, "coinsLabel", void 0);
      __decorate([ property(cc.Label) ], SpecialPurchasePopup.prototype, "gemsLabel", void 0);
      __decorate([ property(cc.Label) ], SpecialPurchasePopup.prototype, "energyLabel", void 0);
      __decorate([ property(cc.Label) ], SpecialPurchasePopup.prototype, "offerDetails", void 0);
      __decorate([ property(cc.Button) ], SpecialPurchasePopup.prototype, "cancelBtn", void 0);
      __decorate([ property(cc.Button) ], SpecialPurchasePopup.prototype, "confirmBtn", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.TOWER_SUB_TYPE),
        visible: function() {
          this.updateOfferDetails();
          return true;
        }
      }) ], SpecialPurchasePopup.prototype, "subTowerType", void 0);
      SpecialPurchasePopup = __decorate([ ccclass ], SpecialPurchasePopup);
      return SpecialPurchasePopup;
    }(cc.Component);
    exports.default = SpecialPurchasePopup;
    cc._RF.pop();
  }, {
    "../Constant": "Constant"
  } ],
  Splash: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8836dga+C5MyYV/wL90ZaaY", "Splash");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AdManager_1 = require("./Manager/AdManager");
    var GameManager_1 = require("./Manager/GameManager");
    var IAPManager_1 = require("./Manager/IAPManager");
    var SoundManager_1 = require("./Manager/SoundManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Splash = function(_super) {
      __extends(Splash, _super);
      function Splash() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.audioClip = null;
        return _this;
      }
      Splash.prototype.onLoad = function() {
        cc.debug.setDisplayStats(false);
        SoundManager_1.default.getInstance().playMusic(this.audioClip, true);
        GameManager_1.default.getInstance().getAppOpenFirstTimeStatus() ? cc.director.preloadScene("TutorialScene", function() {
          cc.director.loadScene("TutorialScene");
        }) : cc.director.preloadScene("MainMenu", function() {
          cc.director.loadScene("MainMenu");
        });
      };
      Splash.prototype.start = function() {
        cc.log("initialse SDK");
        IAPManager_1.default.getInstance().initialiseSDK();
        AdManager_1.default.getInstance().initialiseSDK();
      };
      __decorate([ property(cc.AudioClip) ], Splash.prototype, "audioClip", void 0);
      Splash = __decorate([ ccclass ], Splash);
      return Splash;
    }(cc.Component);
    exports.default = Splash;
    cc._RF.pop();
  }, {
    "./Manager/AdManager": "AdManager",
    "./Manager/GameManager": "GameManager",
    "./Manager/IAPManager": "IAPManager",
    "./Manager/SoundManager": "SoundManager"
  } ],
  TopBarController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cfabOLv51EOrPPRREWq/kU", "TopBarController");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TopBarController = function(_super) {
      __extends(TopBarController, _super);
      function TopBarController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lifeCounter = null;
        _this.streakCounterRight = null;
        _this.streakCounterLeft = null;
        _this.streakCounterCenter = null;
        _this.knightRedar = null;
        _this.lightingStreak = null;
        _this.knightProgressScript = null;
        return _this;
      }
      TopBarController.prototype.onLoad = function() {
        this.knightProgressScript = this.knightRedar.getComponent("EnemyProgress");
      };
      TopBarController.prototype.start = function() {};
      TopBarController.prototype.updateLifeCounter = function(life) {
        this.lifeCounter.string = life.toString();
      };
      TopBarController.prototype.updateStreakCounter = function(streak) {
        var _this = this;
        var scaleValue = 1.4;
        var scaleTime = .15;
        if (20 == streak || 40 == streak || 60 == streak || 80 == streak) {
          scaleTime = .25;
          scaleValue = 2.1;
        }
        if (streak % 2 == 0) {
          this.streakCounterLeft.string = streak.toString();
          this.streakCounterLeft.node.active = true;
          if (this.streakCounterLeft.string != (0).toString()) cc.tween(this.streakCounterLeft.node).to(0, {
            scale: .7,
            position: cc.v3(-16, 0, 0)
          }).to(.15, {
            scale: scaleValue
          }).call(function() {
            _this.streakCounterLeft.node.getComponent(cc.LabelOutline).enabled = true;
          }).to(scaleTime, {
            scale: 1,
            position: cc.v3(3.39, 0, 0)
          }).call(function() {
            _this.streakCounterLeft.node.getComponent(cc.LabelOutline).enabled = false;
            _this.streakCounterCenter.string = _this.streakCounterLeft.string;
            _this.streakCounterLeft.node.active = false;
          }).start(); else {
            this.streakCounterLeft.node.active = false;
            this.streakCounterRight.node.active = false;
            this.streakCounterCenter.string = this.streakCounterLeft.string;
            this.streakCounterCenter.node.opacity = 255;
            this.streakCounterCenter.node.scale = 1;
            this.streakCounterCenter.node.x = 3.39;
            this.streakCounterCenter.node.getComponent(cc.LabelOutline).enabled = false;
          }
        } else if (streak % 2 == 1) {
          this.streakCounterRight.string = streak.toString();
          this.streakCounterRight.node.active = true;
          cc.tween(this.streakCounterRight.node).to(0, {
            scale: .7,
            position: cc.v3(23, 0, 0)
          }).to(.15, {
            scale: scaleValue
          }).call(function() {
            _this.streakCounterRight.node.getComponent(cc.LabelOutline).enabled = true;
          }).to(scaleTime, {
            scale: 1,
            position: cc.v3(3.39, 0, 0)
          }).call(function() {
            _this.streakCounterRight.node.getComponent(cc.LabelOutline).enabled = false;
            _this.streakCounterCenter.string = _this.streakCounterRight.string;
            _this.streakCounterRight.node.active = false;
          }).start();
        }
      };
      TopBarController.prototype.addKnightToProgressBar = function(knightType, knightPath, color, knightKey) {
        this.knightProgressScript.addKnightInProgressBar(knightType, knightPath, color, knightKey);
      };
      TopBarController.prototype.moveKnightInTopBar = function(originalKnightMovementPercentage, knightKey) {
        this.knightProgressScript.updateKnigtPosition(knightKey, originalKnightMovementPercentage);
      };
      TopBarController.prototype.changeKnightInTopBar = function(knightKey) {
        this.knightProgressScript.changeKnightInProgressBar(knightKey);
      };
      TopBarController.prototype.removeKnight = function(knightKey) {
        this.knightProgressScript.removeKnightFromProgressBar(knightKey);
      };
      TopBarController.prototype.updateCurrentSelectedPath = function(pathSelected) {
        this.knightProgressScript.updateCurrentPathString(pathSelected);
      };
      TopBarController.prototype.changeStatusOfPauseButton = function(status) {
        this.node.getChildByName("playPauseButton").getChildByName("pause").active = status;
      };
      TopBarController.prototype.changeStatusOfPlayButton = function(status) {
        this.node.getChildByName("playPauseButton").getChildByName("play").active = status;
      };
      TopBarController.prototype.update = function(dt) {};
      TopBarController.prototype.lightAnimation = function(level) {
        this.lightingStreak.node.active = true;
        this.lightingStreak.node.color = Constant_1.LIGHTING_COLOR[Constant_1.LIGHTING_SELECTED[level]];
        this.lightingStreak.getComponent(cc.Animation).play("lighting");
      };
      TopBarController.prototype.stopLightAnimation = function() {
        this.lightingStreak.getComponent(cc.Animation).stop();
        this.lightingStreak.node.active = false;
      };
      __decorate([ property(cc.Label) ], TopBarController.prototype, "lifeCounter", void 0);
      __decorate([ property(cc.Label) ], TopBarController.prototype, "streakCounterRight", void 0);
      __decorate([ property(cc.Label) ], TopBarController.prototype, "streakCounterLeft", void 0);
      __decorate([ property(cc.Label) ], TopBarController.prototype, "streakCounterCenter", void 0);
      __decorate([ property(cc.Sprite) ], TopBarController.prototype, "knightRedar", void 0);
      __decorate([ property(cc.Sprite) ], TopBarController.prototype, "lightingStreak", void 0);
      TopBarController = __decorate([ ccclass ], TopBarController);
      return TopBarController;
    }(cc.Component);
    exports.default = TopBarController;
    cc._RF.pop();
  }, {
    "./Constant": "Constant"
  } ],
  TopBarKnight: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5123UDyvdJwr6CjpHa6q0X", "TopBarKnight");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("./Constant");
    var Knight_1 = require("./Knight");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TopBarKnight = function(_super) {
      __extends(TopBarKnight, _super);
      function TopBarKnight() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.key = "";
        _this.type = 0;
        _this.path = 0;
        _this.color = 0;
        _this.blackColorKnight = null;
        _this.blueColorKnight = null;
        _this.redColorKnight = null;
        _this.greenColorKnight = null;
        _this.yellowColorKnight = null;
        _this.largeKnightYellowFull = null;
        _this.largeKnightGreenFull = null;
        _this.largeKnightRedFull = null;
        _this.largeKnightBlueFull = null;
        _this.largeKnightYellowHalf = null;
        _this.largeKnightGreenHalf = null;
        _this.largeKnightRedHalf = null;
        _this.largeKnightBlueHalf = null;
        return _this;
      }
      TopBarKnight.prototype.start = function() {};
      TopBarKnight.prototype.updateKnightProperties = function(knightKey, knightType, color, knightPath, parentHeight) {
        this.key = knightKey;
        this.type = knightType;
        this.color = color;
        this.path = knightPath;
        this.node.scale = .75 * parentHeight / this.node.height;
        this.getComponent(cc.Sprite).spriteFrame = this.getKnightSpriteFrame();
      };
      TopBarKnight.prototype.updateKnightPosition = function(position) {
        this.node.x = position.x;
      };
      TopBarKnight.prototype.removeSelfFromBar = function() {
        this.node.removeFromParent(true);
      };
      TopBarKnight.prototype.getKnightSpriteFrame = function() {
        return this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED ? this.largeKnightYellowFull : this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.BLUE_KNIGHT_SELECTED ? this.largeKnightBlueFull : this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? this.largeKnightGreenFull : this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED ? this.largeKnightRedFull : this.type != Knight_1.KNIGHT_TYPE.Regular && this.type != Knight_1.KNIGHT_TYPE.Flying && this.type != Knight_1.KNIGHT_TYPE.Wizard || this.color != Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED ? this.type != Knight_1.KNIGHT_TYPE.Regular && this.type != Knight_1.KNIGHT_TYPE.Flying && this.type != Knight_1.KNIGHT_TYPE.Wizard || this.color != Constant_1.KNIGHT_SELECTED.BLUE_KNIGHT_SELECTED ? this.type != Knight_1.KNIGHT_TYPE.Regular && this.type != Knight_1.KNIGHT_TYPE.Flying && this.type != Knight_1.KNIGHT_TYPE.Wizard || this.color != Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? this.type != Knight_1.KNIGHT_TYPE.Regular && this.type != Knight_1.KNIGHT_TYPE.Flying && this.type != Knight_1.KNIGHT_TYPE.Wizard || this.color != Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED ? this.type == Knight_1.KNIGHT_TYPE.Dark ? this.blackColorKnight : this.greenColorKnight : this.redColorKnight : this.greenColorKnight : this.blueColorKnight : this.yellowColorKnight;
      };
      TopBarKnight.prototype.changeKnightSpriteFrame = function() {
        this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.largeKnightYellowHalf : this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.BLUE_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.largeKnightBlueHalf : this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.largeKnightGreenHalf : this.type == Knight_1.KNIGHT_TYPE.Large && this.color == Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.largeKnightRedHalf : this.type == Knight_1.KNIGHT_TYPE.Dark && this.color == Constant_1.KNIGHT_SELECTED.YELLOW_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.yellowColorKnight : this.type == Knight_1.KNIGHT_TYPE.Dark && this.color == Constant_1.KNIGHT_SELECTED.BLUE_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.blueColorKnight : this.type == Knight_1.KNIGHT_TYPE.Dark && this.color == Constant_1.KNIGHT_SELECTED.GREEN_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.greenColorKnight : this.type == Knight_1.KNIGHT_TYPE.Dark && this.color == Constant_1.KNIGHT_SELECTED.RED_KNIGHT_SELECTED ? this.getComponent(cc.Sprite).spriteFrame = this.redColorKnight : this.getComponent(cc.Sprite).spriteFrame = this.largeKnightGreenHalf;
      };
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "blackColorKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "blueColorKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "redColorKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "greenColorKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "yellowColorKnight", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightYellowFull", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightGreenFull", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightRedFull", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightBlueFull", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightYellowHalf", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightGreenHalf", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightRedHalf", void 0);
      __decorate([ property(cc.SpriteFrame) ], TopBarKnight.prototype, "largeKnightBlueHalf", void 0);
      TopBarKnight = __decorate([ ccclass ], TopBarKnight);
      return TopBarKnight;
    }(cc.Component);
    exports.default = TopBarKnight;
    cc._RF.pop();
  }, {
    "./Constant": "Constant",
    "./Knight": "Knight"
  } ],
  TowerItemPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8184F3C8pNh5sMcb8Vb84/", "TowerItemPanel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var GameManager_1 = require("../../Manager/GameManager");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TowerItemPanel = function(_super) {
      __extends(TowerItemPanel, _super);
      function TowerItemPanel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.towerItem = null;
        _this.towerList = [];
        _this.selectedItemPanel = null;
        _this.towerCostLabel = null;
        _this.purchasedButton = null;
        _this.selectedTowerType = Constant_1.TOWER_TYPE.NORMAL_TOWER;
        _this.selectedSubTower = Constant_1.TOWER_SUB_TYPE.BLUE_TOWER;
        _this.selectedTowerFrame = null;
        return _this;
      }
      TowerItemPanel.prototype.onLoad = function() {
        this.registerEvents();
      };
      TowerItemPanel.prototype.start = function() {
        this.towerSelectedCallback(this.selectedTowerType);
      };
      TowerItemPanel.prototype.onDestroy = function() {
        this.unregisterEvents();
      };
      TowerItemPanel.prototype.registerEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_SELECTED_EVENTS, this.towerSelectedCallback.bind(this), this.node);
        MessageCenter_1.MessageCenter.getInstance().register(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_UPDATED_COST_EVENTS, this.selectedTowerData.bind(this), this.node);
      };
      TowerItemPanel.prototype.unregisterEvents = function() {
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_SELECTED_EVENTS, this.node);
        MessageCenter_1.MessageCenter.getInstance().unregister(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_UPDATED_COST_EVENTS, this.node);
      };
      TowerItemPanel.prototype.towerSelectedCallback = function(towerType) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        this.selectedTowerType = towerType;
        this.selectedItemPanel.getComponent("SelectedTowerItemPageView").loadPageView(this.selectedTowerType, this.towerItem);
        this.resetPreviousSelection();
      };
      TowerItemPanel.prototype.updatePageViewWithIndex = function() {
        this.selectedItemPanel.getComponent("SelectedTowerItemPageView").resetPageViewWithScrollingIndex(this.selectedTowerType, this.selectedSubTower, this.towerItem);
      };
      TowerItemPanel.prototype.resetPreviousSelection = function() {
        var _this = this;
        this.towerList.forEach(function(element) {
          var script = element.getComponent("TowerItem");
          var itemType = script.itemType;
          script.isSelected = true;
          itemType != _this.selectedTowerType && (script.isSelected = false);
          script.updateButtonText();
        });
      };
      TowerItemPanel.prototype.selectedTowerData = function(towerData) {
        var towerLockStatus = GameManager_1.default.getInstance().getTowerLockedStatus(towerData.subtype);
        this.purchasedButton.active = !Boolean(towerLockStatus);
        this.towerCostLabel.string = towerData.cost;
        this.selectedSubTower = towerData.subtype;
        this.selectedTowerFrame = towerData.frame;
      };
      TowerItemPanel.prototype.onPurchaseButtonCallback = function(event, customData) {
        var towerData = {
          cost: parseInt(this.towerCostLabel.string),
          type: this.selectedTowerType,
          subtype: this.selectedSubTower,
          frame: this.selectedTowerFrame
        };
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_PURCHASE_EVENTS, towerData);
      };
      __decorate([ property(cc.Prefab) ], TowerItemPanel.prototype, "towerItem", void 0);
      __decorate([ property(cc.Node) ], TowerItemPanel.prototype, "towerList", void 0);
      __decorate([ property(cc.Node) ], TowerItemPanel.prototype, "selectedItemPanel", void 0);
      __decorate([ property(cc.Label) ], TowerItemPanel.prototype, "towerCostLabel", void 0);
      __decorate([ property(cc.Node) ], TowerItemPanel.prototype, "purchasedButton", void 0);
      TowerItemPanel = __decorate([ ccclass ], TowerItemPanel);
      return TowerItemPanel;
    }(cc.Component);
    exports.default = TowerItemPanel;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/GameManager": "GameManager",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter"
  } ],
  TowerItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcfd7O9p/FNw4M5OuIl9a7V", "TowerItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var SoundManager_1 = require("../../Manager/SoundManager");
    var MessageCenter_1 = require("../../Utilities/MessageCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var TowerItem = function(_super) {
      __extends(TowerItem, _super);
      function TowerItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.itemBaseFrame = null;
        _this.glowFrame = null;
        _this.item = null;
        _this.itemName = null;
        _this.buttonText = null;
        _this.baseFrame = null;
        _this.itemType = Constant_1.TOWER_TYPE.NORMAL_TOWER;
        _this.isSelected = false;
        return _this;
      }
      TowerItem.prototype.onLoad = function() {
        this.isSelected = false;
        this.updateItemDetails();
        this.updateButtonText();
      };
      TowerItem.prototype.start = function() {};
      TowerItem.prototype.updateItemDetails = function() {
        var _this = this;
        this.items.forEach(function(element) {
          var elementIndex = _this.items.indexOf(element);
          if (elementIndex == _this.itemType) {
            _this.item.spriteFrame = element;
            _this.itemName.string = _this.getItemName(elementIndex);
            return;
          }
        });
      };
      TowerItem.prototype.getItemName = function(index) {
        var itemName = "NORMAL";
        switch (index) {
         case Constant_1.TOWER_TYPE.TANK_TOWER:
          itemName = "TANK";
          break;

         case Constant_1.TOWER_TYPE.DRAGON_TOWER:
          itemName = "DRAGON";
          break;

         case Constant_1.TOWER_TYPE.BUG_TOWER:
          itemName = "BUG";
        }
        return itemName;
      };
      TowerItem.prototype.updateButtonText = function() {
        this.buttonText.string = this.isSelected ? "SELECTED" : " SELECT";
        this.baseFrame.spriteFrame = this.itemBaseFrame;
        this.isSelected && (this.baseFrame.spriteFrame = this.glowFrame);
      };
      TowerItem.prototype.itemSelectedCallback = function(event, customEvent) {
        SoundManager_1.default.getInstance().playButtonClickSoundEffect();
        MessageCenter_1.MessageCenter.getInstance().send(Constant_1.MESSAGE_PASSING_EVENTS.TOWER_SELECTED_EVENTS, this.itemType);
      };
      __decorate([ property(cc.SpriteFrame) ], TowerItem.prototype, "items", void 0);
      __decorate([ property(cc.SpriteFrame) ], TowerItem.prototype, "itemBaseFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], TowerItem.prototype, "glowFrame", void 0);
      __decorate([ property(cc.Sprite) ], TowerItem.prototype, "item", void 0);
      __decorate([ property(cc.Label) ], TowerItem.prototype, "itemName", void 0);
      __decorate([ property(cc.Label) ], TowerItem.prototype, "buttonText", void 0);
      __decorate([ property(cc.Sprite) ], TowerItem.prototype, "baseFrame", void 0);
      __decorate([ property({
        type: cc.Enum(Constant_1.TOWER_TYPE),
        visible: function() {
          this.updateItemDetails();
          return true;
        }
      }) ], TowerItem.prototype, "itemType", void 0);
      TowerItem = __decorate([ ccclass ], TowerItem);
      return TowerItem;
    }(cc.Component);
    exports.default = TowerItem;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/SoundManager": "SoundManager",
    "../../Utilities/MessageCenter": "MessageCenter"
  } ],
  TowerSelectionItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b8b8XCKytJp4p8aRWfWIoY", "TowerSelectionItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../../Constant");
    var GameManager_1 = require("../../Manager/GameManager");
    var Utility_1 = require("../../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TowerSelectionItem = function(_super) {
      __extends(TowerSelectionItem, _super);
      function TowerSelectionItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.UnlockedTowerItems = [];
        _this.lockedTowerItems = [];
        _this.lockNode = null;
        _this.towerSubType = Constant_1.TOWER_SUB_TYPE.RED_TOWER;
        _this.towerName = null;
        return _this;
      }
      TowerSelectionItem.prototype.onLoad = function() {};
      TowerSelectionItem.prototype.start = function() {};
      TowerSelectionItem.prototype.updateTowerItem = function(subTowerType) {
        this.towerSubType = subTowerType;
        this.towerName = Utility_1.Utility.getTowerName(this.towerSubType);
        var towerLockStatus = GameManager_1.default.getInstance().getTowerLockedStatus(this.towerSubType);
        Boolean(towerLockStatus) ? this.item.spriteFrame = this.UnlockedTowerItems[this.towerSubType] : this.item.spriteFrame = this.lockedTowerItems[this.towerSubType];
        this.lockNode.active = !Boolean(towerLockStatus);
      };
      TowerSelectionItem.prototype.getSubTowerType = function() {
        return this.towerSubType;
      };
      TowerSelectionItem.prototype.getTowerName = function() {
        return this.towerName;
      };
      __decorate([ property(cc.Sprite) ], TowerSelectionItem.prototype, "item", void 0);
      __decorate([ property(cc.SpriteFrame) ], TowerSelectionItem.prototype, "UnlockedTowerItems", void 0);
      __decorate([ property(cc.SpriteFrame) ], TowerSelectionItem.prototype, "lockedTowerItems", void 0);
      __decorate([ property(cc.Node) ], TowerSelectionItem.prototype, "lockNode", void 0);
      TowerSelectionItem = __decorate([ ccclass ], TowerSelectionItem);
      return TowerSelectionItem;
    }(cc.Component);
    exports.default = TowerSelectionItem;
    cc._RF.pop();
  }, {
    "../../Constant": "Constant",
    "../../Manager/GameManager": "GameManager",
    "../../Utilities/Utility": "Utility"
  } ],
  TurnInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7eb898zn3FHG61US7Ff/+qS", "TurnInfo");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TURN_TYPE = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.TURN_TYPE = cc.Enum({
      Left: 0,
      Right: 1
    });
    var TurnInfo = function(_super) {
      __extends(TurnInfo, _super);
      function TurnInfo() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.turnType = exports.TURN_TYPE.Left;
        return _this;
      }
      TurnInfo.prototype.start = function() {};
      __decorate([ property({
        type: exports.TURN_TYPE
      }) ], TurnInfo.prototype, "turnType", void 0);
      TurnInfo = __decorate([ ccclass ], TurnInfo);
      return TurnInfo;
    }(cc.Component);
    exports.default = TurnInfo;
    cc._RF.pop();
  }, {} ],
  Tutorial: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d44c2/DBfBKtIbTizt+Up5h", "Tutorial");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Constant_1 = require("../Constant");
    var GameManager_1 = require("../Manager/GameManager");
    var SoundManager_1 = require("../Manager/SoundManager");
    var Utility_1 = require("../Utilities/Utility");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Tutorial = function(_super) {
      __extends(Tutorial, _super);
      function Tutorial() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.items = [];
        _this.tutorialNode = null;
        _this.initialNode = null;
        _this.tutorialText = null;
        _this.title = null;
        _this.buttonText = null;
        _this.pageView = null;
        _this.audioClip = null;
        _this.enableTouchEvent = true;
        return _this;
      }
      Tutorial.prototype.onLoad = function() {
        this.initialNode.active = true;
        this.tutorialNode.active = false;
      };
      Tutorial.prototype.start = function() {
        this.pageView.enabled = false;
        GameManager_1.default.getInstance().setCurrentScene(Constant_1.SCENE_TYPE.TUTORIAL);
        this.content.parent.getComponent(cc.Widget).updateAlignment();
        GameManager_1.default.getInstance().setIsIpad(this.node.width, this.node.height);
        this.content.width = 7 * this.content.parent.width;
        this.updateTutorialCount();
        SoundManager_1.default.getInstance().playMusic(this.audioClip, true);
        cc.director.preloadScene("GamePlay", function() {
          console.log("GamePlay preloaded");
        });
      };
      Tutorial.prototype.continueCB = function(event, customData) {
        if (!this.enableTouchEvent) return;
        if (this.pageView.getCurrentPageIndex() == this.pageView.getPages().length - 1) {
          GameManager_1.default.getInstance().setAppOpenFirstTime(0);
          SoundManager_1.default.getInstance().playButtonClickSoundEffect();
          GameManager_1.default.getInstance().setUserCurrentLevel(1);
          var ref = this;
          cc.resources.load("Prefab/Loader", cc.Prefab, function(err, asset) {
            if (ref.node) {
              var prefabNode = cc.instantiate(asset);
              ref.node.addChild(prefabNode);
              cc.director.loadScene("GamePlay");
            }
          });
        }
        this.enableTouchEvent = false;
        this.pageView.enabled = true;
        this.pageView.setCurrentPageIndex(this.pageView.getCurrentPageIndex() + 1);
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(this.updatePageViewStatus, this)));
        this.updateTutorialCount();
      };
      Tutorial.prototype.updatePageViewStatus = function() {
        this.enableTouchEvent = true;
        this.pageView.enabled = false;
      };
      Tutorial.prototype.updateTutorialCount = function() {
        this.title.string = "TUTORIAL #" + (this.pageView.getCurrentPageIndex() + 1);
        this.tutorialText.string = Utility_1.Utility.getTutorialText(this.pageView.getCurrentPageIndex() + 1);
        this.pageView.getCurrentPageIndex() == this.pageView.getPages().length - 1 && (this.buttonText.string = "Done");
        this.updateItemAlignment();
      };
      Tutorial.prototype.updateItemAlignment = function() {
        if (5 == this.pageView.getCurrentPageIndex()) for (var counter = 0; counter < this.items.length; counter++) {
          this.items[counter].getComponent(cc.Widget).updateAlignment();
          this.items[counter].runAction(cc.repeatForever(cc.sequence(cc.moveBy(.55, new cc.Vec2(0, -10)), cc.moveBy(.55, new cc.Vec2(0, 10)))));
          var scale = counter == this.items.length - 1 ? .3 : .5;
          GameManager_1.default.getInstance().isDeviceIPad() && this.items[counter].setScale(scale);
        }
      };
      Tutorial.prototype.moveToTutorialCB = function(event, customData) {
        this.initialNode.active = false;
        this.tutorialNode.active = true;
      };
      __decorate([ property(cc.Node) ], Tutorial.prototype, "content", void 0);
      __decorate([ property(cc.Node) ], Tutorial.prototype, "items", void 0);
      __decorate([ property(cc.Node) ], Tutorial.prototype, "tutorialNode", void 0);
      __decorate([ property(cc.Node) ], Tutorial.prototype, "initialNode", void 0);
      __decorate([ property(cc.Label) ], Tutorial.prototype, "tutorialText", void 0);
      __decorate([ property(cc.Label) ], Tutorial.prototype, "title", void 0);
      __decorate([ property(cc.Label) ], Tutorial.prototype, "buttonText", void 0);
      __decorate([ property(cc.PageView) ], Tutorial.prototype, "pageView", void 0);
      __decorate([ property(cc.AudioClip) ], Tutorial.prototype, "audioClip", void 0);
      Tutorial = __decorate([ ccclass ], Tutorial);
      return Tutorial;
    }(cc.Component);
    exports.default = Tutorial;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/GameManager": "GameManager",
    "../Manager/SoundManager": "SoundManager",
    "../Utilities/Utility": "Utility"
  } ],
  Utility: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "de8c2YnQMxJWpJc83kgKQuw", "Utility");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Utility = void 0;
    var Constant_1 = require("../Constant");
    var GameManager_1 = require("../Manager/GameManager");
    var ccclass = cc._decorator.ccclass;
    var Utility = function() {
      function Utility() {}
      Utility_1 = Utility;
      Utility.getTowerName = function(subType) {
        var itemName = "Blue Tower";
        switch (subType) {
         case Constant_1.TOWER_SUB_TYPE.RED_TOWER:
          itemName = "Red Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.BLUE_TOWER:
          itemName = "Blue Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.PURPLE_TOWER:
          itemName = "Purple Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.GREEN_TOWER:
          itemName = "Green Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_TANK_TOWER:
          itemName = "Plain TanK Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.CREATIVE_TANK_TOWER:
          itemName = "Creative TanK Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_DRAGON_TOWER:
          itemName = "Plain Dragon Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.PLAIN_BUG_TOWER:
          itemName = "Plain Bug Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER:
          itemName = "Creative Dragon Tower";
          break;

         case Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER:
          itemName = "Creative Bug Tower";
        }
        return itemName;
      };
      Utility.getItemName = function(itemType) {
        var itemName = "Land Mine";
        switch (itemType) {
         case Constant_1.ITEM_LAYER_TYPE.DRAGON_FIRE:
          itemName = "DRAGON FIRE";
          break;

         case Constant_1.ITEM_LAYER_TYPE.MONKEY_CANNON:
          itemName = "MONKEY CANNON";
          break;

         case Constant_1.ITEM_LAYER_TYPE.HEART:
          itemName = "MAGIC HEART";
        }
        return itemName;
      };
      Utility.getEnemyName = function(enemyType) {
        var desc = "DARK KNIGHT";
        switch (enemyType) {
         case Constant_1.ENEMY_TYPE.DARK_KNIGHT:
          desc = "DARK KNIGHT";
          break;

         case Constant_1.ENEMY_TYPE.FLYING_KNIGHT:
          desc = "FLYING KNIGHT";
          break;

         case Constant_1.ENEMY_TYPE.LARGE_KNIGHT:
          desc = "LARGE KNIGHT";
          break;

         case Constant_1.ENEMY_TYPE.WIZARD:
          desc = "WIZARD";
        }
        return desc;
      };
      Utility.getEnemyDescription = function(enemyType) {
        var desc = "Hit once to reveal its true color. Runs fast!";
        switch (enemyType) {
         case Constant_1.ENEMY_TYPE.DARK_KNIGHT:
          desc = "Hit once to reveal its true color. Runs fast!";
          break;

         case Constant_1.ENEMY_TYPE.FLYING_KNIGHT:
          desc = "Hovers around the map and can\u2019t be destroyed until it lands";
          break;

         case Constant_1.ENEMY_TYPE.LARGE_KNIGHT:
          desc = "Destroyed with two hits";
          break;

         case Constant_1.ENEMY_TYPE.WIZARD:
          desc = "Generates a shield in front of your tower. Shield Must be hit the number of times shown. Listen for the shield generation noise";
        }
        return desc;
      };
      Utility.getCompleteTowerList = function() {
        return [ Constant_1.TOWER_SUB_TYPE.RED_TOWER, Constant_1.TOWER_SUB_TYPE.BLUE_TOWER, Constant_1.TOWER_SUB_TYPE.PURPLE_TOWER, Constant_1.TOWER_SUB_TYPE.GREEN_TOWER, Constant_1.TOWER_SUB_TYPE.PLAIN_TANK_TOWER, Constant_1.TOWER_SUB_TYPE.CREATIVE_TANK_TOWER, Constant_1.TOWER_SUB_TYPE.PLAIN_DRAGON_TOWER, Constant_1.TOWER_SUB_TYPE.PLAIN_BUG_TOWER, Constant_1.TOWER_SUB_TYPE.CREATIVE_DRAGON_TOWER, Constant_1.TOWER_SUB_TYPE.CREATIVE_BUG_TOWER ];
      };
      Utility.getItemsWithTowerSubType = function(towerType, arrangement) {
        void 0 === arrangement && (arrangement = Constant_1.TOWER_ARRANGEMENT.NONE);
        var item = [];
        towerType == Constant_1.TOWER_TYPE.NORMAL_TOWER ? item = [ Constant_1.TOWER_SUB_TYPE.RED_TOWER, Constant_1.TOWER_SUB_TYPE.BLUE_TOWER, Constant_1.TOWER_SUB_TYPE.PURPLE_TOWER, Constant_1.TOWER_SUB_TYPE.GREEN_TOWER ] : towerType == Constant_1.TOWER_TYPE.TANK_TOWER ? item = [ Constant_1.TOWER_SUB_TYPE.PLAIN_TANK_TOWER, Constant_1.TOWER_SUB_TYPE.CREATIVE_TANK_TOWER ] : towerType == Constant_1.TOWER_TYPE.DRAGON_TOWER ? item = [ Constant_1.TOWER_SUB_TYPE.PLAIN_DRAGON_TOWER ] : towerType == Constant_1.TOWER_TYPE.BUG_TOWER ? item = [ Constant_1.TOWER_SUB_TYPE.PLAIN_BUG_TOWER ] : towerType == Constant_1.TOWER_TYPE.ALL && (item = this.getCompleteTowerList());
        item.length > 1 && arrangement != Constant_1.TOWER_ARRANGEMENT.NONE && (item = Utility_1.getTowersAccordingToStatus(item, arrangement));
        return item;
      };
      Utility.getTowersAccordingToStatus = function(itemList, towerArrangement) {
        var lockItem = [];
        var unlockedItem = [];
        for (var counter = 0; counter < itemList.length; counter++) {
          var towerLockStatus = GameManager_1.default.getInstance().getTowerLockedStatus(itemList[counter]);
          Boolean(towerLockStatus) ? unlockedItem.push(itemList[counter]) : lockItem.push(itemList[counter]);
        }
        var newItemList = [];
        towerArrangement == Constant_1.TOWER_ARRANGEMENT.LOCKED_FIRST ? newItemList = __spreadArrays(lockItem, unlockedItem) : towerArrangement == Constant_1.TOWER_ARRANGEMENT.UNLOCKED_FIRST && (newItemList = __spreadArrays(unlockedItem, lockItem));
        return newItemList;
      };
      Utility.getCastleData = function() {
        return [ Constant_1.CASTLE_TYPE.GRASS_CASTLE, Constant_1.CASTLE_TYPE.SNOW_CASTLE, Constant_1.CASTLE_TYPE.LAVA_CASTLE ];
      };
      Utility.getRandomNumber = function(maxNumber, minNumber) {
        return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
      };
      Utility.getTimeDifferenceInSec = function(timeStamp) {
        var currTime = new Date().getTime();
        var diff = (currTime - parseInt(timeStamp)) / 1e3;
        return diff;
      };
      Utility.getTimeDifferenceInMin = function(timeStamp) {
        var currTime = new Date().getTime();
        var diff = (currTime - parseInt(timeStamp)) / 6e4;
        return diff;
      };
      Utility.getTimeDifferenceInHours = function(timeStamp) {
        var currTime = new Date().getTime();
        var diff = (currTime - parseInt(timeStamp)) / 36e5;
        return diff;
      };
      Utility.getEnemyStatusTutKey = function(type) {
        var key = "DARK_KNIGHT";
        switch (type) {
         case Constant_1.ENEMY_TYPE.LARGE_KNIGHT:
          key = "LARGE_KNIGHT";
          break;

         case Constant_1.ENEMY_TYPE.FLYING_KNIGHT:
          key = "FLYING_KNIGHT";
          break;

         case Constant_1.ENEMY_TYPE.WIZARD:
          key = "WIZARD";
          break;

         default:
          key = "DARK_KNIGHT";
        }
        return key;
      };
      Utility.getTutorialText = function(counter) {
        var tutorialText;
        switch (counter) {
         case 1:
          tutorialText = "Hello and thank you for playing our game! Lets get started with the basics.";
          break;

         case 2:
          tutorialText = "The objective is to defend your tower from knights coming down the lane!";
          break;

         case 3:
          tutorialText = "Knights are destroyed by hitting them with the same color projectile.";
          break;

         case 4:
          tutorialText = "Earn the highest score possible by not making any mistakes.";
          break;

         case 5:
          tutorialText = "Use the clear button if you make a mistake to pop the projectile before it reaches the knights.";
          break;

         case 6:
          tutorialText = "You are progressing very well!";
          break;

         case 7:
          tutorialText = "Good Luck! We hope you enjoy! Try to get perfect scores on the hardest difficulty to test your skills!";
          break;

         default:
          tutorialText = "Tower, Lanes, and Knights coming down the lanes highlighted. Text Box: \u201cThe objective is to defend your tower from knights coming down the lane!";
        }
        return tutorialText;
      };
      var Utility_1;
      Utility = Utility_1 = __decorate([ ccclass ], Utility);
      return Utility;
    }();
    exports.Utility = Utility;
    cc._RF.pop();
  }, {
    "../Constant": "Constant",
    "../Manager/GameManager": "GameManager"
  } ],
  VideoTutorial: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f97da98Q1OSbk38BS+muat", "VideoTutorial");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var VideoTutorialComponent = function(_super) {
      __extends(VideoTutorialComponent, _super);
      function VideoTutorialComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.videoPlayer = null;
        _this.tutorialSprite = null;
        _this.isReadyToPlay = false;
        return _this;
      }
      VideoTutorialComponent.prototype.start = function() {
        this.videoPlayer.pause();
        this.videoPlayer.node.on("Clicked", this.clickedOnVideo, this);
        this.videoPlayer.node.on("completed", this.onVideoCompleted, this);
      };
      VideoTutorialComponent.prototype.onVideoCompleted = function() {};
      VideoTutorialComponent.prototype.clickedOnVideo = function() {};
      VideoTutorialComponent.prototype.update = function(dt) {
        this.videoPlayer.currentTime > 3 && this.videoPlayer.currentTime < 3.04642 && this.pauseVideoComponent();
        console.log("videoTimer: ", this.videoPlayer.currentTime);
      };
      VideoTutorialComponent.prototype.videoReadyToPlay = function() {
        this.isReadyToPlay = true;
      };
      VideoTutorialComponent.prototype.playVideoComponent = function() {
        this.tutorialSprite.node.active = false;
        this.videoPlayer.stayOnBottom = false;
        this.videoPlayer.play();
      };
      VideoTutorialComponent.prototype.pauseVideoComponent = function() {
        this.videoPlayer.pause();
        this.tutorialSprite.node.active = true;
        this.videoPlayer.stayOnBottom = true;
      };
      VideoTutorialComponent.prototype.continueButtonClick = function() {
        this.playVideoComponent();
      };
      __decorate([ property(cc.VideoPlayer) ], VideoTutorialComponent.prototype, "videoPlayer", void 0);
      __decorate([ property(cc.Sprite) ], VideoTutorialComponent.prototype, "tutorialSprite", void 0);
      VideoTutorialComponent = __decorate([ ccclass ], VideoTutorialComponent);
      return VideoTutorialComponent;
    }(cc.Component);
    exports.default = VideoTutorialComponent;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Base", "Button", "Cannon", "CannonFireball", "Castle", "Challenges", "Constant", "DragonParticle", "EnemyIntroduction", "EnemyProgress", "Footer", "FooterBarController", "GamePlay", "HUD", "Item", "KillScore", "Knight", "LevelProgress", "LevelSelection", "MainMenu", "AdManager", "GameManager", "IAPManager", "LevelManager", "SoundManager", "PopUp", "EnergyPurchase", "GeneralPopup", "ItemPurcahsePopup", "PurchaseConfirmationPopup", "SpecialPurchasePopup", "ChestReward", "SelectTower", "Shield", "Shop", "CoinsPanelItem", "GemsPanelItem", "ItemLayer", "ItemPanel", "SelectedItemPanel", "SpecialOffer", "SpecialOfferPanel", "SelectedTowerItem", "SelectedTowerItemPageView", "TowerItem", "TowerItemPanel", "TowerSelectionItem", "ShopCoinsAndGems", "ShopItems", "Splash", "TopBarController", "TopBarKnight", "TurnInfo", "Tutorial", "APAspectRatioFitter", "MessageCenter", "Utility", "VideoTutorial" ]);