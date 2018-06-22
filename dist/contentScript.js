/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./contentScript/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contentScript/coopraid.js":
/*!***********************************!*\
  !*** ./contentScript/coopraid.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-30 21:58:12 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-22 22:25:56
 * @Description 共斗时的设置
 */
var observer = null;

module.exports = {
    observer: observer,
    roomObserve: function roomObserve(search) {
        var rooms = document.getElementsByClassName('prt-wanted-list')[0];

        if (!observer) {
            var _observer = new MutationObserver(function (mutations) {
                var texts = document.getElementsByClassName('txt-room-comment');
                var selectTexts = [];

                for (var i = 0, roomLen = texts.length; i < roomLen; i++) {
                    var room = texts[i];
                    var innerText = room.innerText;

                    // アル;↑
                    // 获得房名含有文本框内容项的索引
                    var flag = true,
                        searchs = search.split(';');
                    for (var j = 0, searchsLen = searchs.length; j < searchsLen; j++) {
                        var jtem = searchs[j];
                        var isIncludes = innerText.includes(jtem);

                        if (flag && isIncludes && j == searchsLen - 1) {
                            selectTexts.push(i);
                        }
                    }
                }

                // 隐藏不符合搜索项的房间
                for (var _i = 0, _roomLen = rooms.children.length; _i < _roomLen; _i++) {
                    var _room = rooms.children[_i];
                    _room.style.display = 'none';

                    for (var _j = 0, selectTextsLen = selectTexts.length; _j < selectTextsLen; _j++) {
                        if (_i == selectTexts[_j]) {
                            _room.style.display = '';
                        }
                    }
                }
            });

            _observer.observe(rooms, {
                attributes: true,
                childList: true,
                characterData: true
            });
            console.log('observer start');
        }
    },
    roomObserveBreaker: function roomObserveBreaker(observer) {
        observer.disconnect();
        console.log('observer end');
    }
};

/***/ }),

/***/ "./contentScript/index.js":
/*!********************************!*\
  !*** ./contentScript/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _style = __webpack_require__(/*! ./style */ "./contentScript/style.js");

var _coopraid = __webpack_require__(/*! ./coopraid */ "./contentScript/coopraid.js");

// import contextMenus from './contextMenus'

// 修改全局样式
/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-22 22:45:34
 */
(0, _style.initStyles)();

// 右键菜单
// contextMenus();

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    var message = response.message,
        zoom = response.zoom,
        search = response.search;

    var tasks = { error: '', tasks: '' };

    switch (message) {
        case 'init_coopraid_listener':
            // 开启共斗搜索
            (0, _coopraid.roomObserve)(search);
            break;

        case 'close_coopraid_listener':

            break;

        case 'set_zoom':
            console.log(zoom);
            (0, _style.setZoom)(zoom);
            break;

        default:

            break;
    }

    sendResponse({ tasks: tasks });
});

/***/ }),

/***/ "./contentScript/style.js":
/*!********************************!*\
  !*** ./contentScript/style.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 11:13:09 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-22 22:22:29
 * @Description 全局样式设置
 */
/* 修改滚动条样式
    因为容器className不知道是从哪来的，反正是无规律可循的字符串，
    又因为它的子节点名称固定，于是从子节点给容器加上个id，再用css修改容器滚动条属性
*/
module.exports = {
    initStyles: function initStyles() {
        if (!document.getElementById('mobage-game-container')) {
            return;
        }

        var scroll = document.getElementById('mobage-game-container').parentNode;
        scroll.id = 'liver-collection-container';

        // 隐藏左侧侧边栏
        var leftPanel = document.getElementById('mobage-game-container').parentNode.parentNode.firstChild;
        leftPanel.style.display = 'none';
        scroll.style.marginLeft = '';

        // 隐藏右侧侧边栏
        var rightPanel = document.getElementById('submenu');
        rightPanel.style.display = 'none';
    },
    setZoom: function setZoom(zoom) {
        var htmlBody = document.getElementsByTagName('html')[0];

        htmlBody.style.zoom = zoom;
    }
};

/***/ })

/******/ });
//# sourceMappingURL=contentScript.js.map