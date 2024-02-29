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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/libs/build.js":
/*!**************************!*\
  !*** ./js/libs/build.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Fliplet.Widget.instance("comments", function (widgetData) {
//   const selector = `[data-comments-id="${widgetData.id}"]`;
//   debugger
//   Fliplet().then(function () {
//     new Vue({
//       el: $(selector)[0],
//       data() {
//         return {
//           containsData: "test data",
//         };
//       },
//       methods: {},
//       async mounted() {},
//     });
//   });
// });

// Fliplet.Widget.instance({
//   name: 'comments',
//   render: {
//     template: [
//       '<div id="app-comments">',
//       '</div>'
//     ].join(''),
//     ready: async function() {
//       Fliplet().then(function() {
//         new Vue({
//           el: '#id',
//           data: {
//             message: 'Hello, Vue!'
//           }
//         });
//       });
//     }
//   }

Fliplet.Widget.instance('comments', function (widgetData) {
  // Fliplet.Widget.initializeChildren(this.$el, this);
  // const selector = `[data-comments-id="${widgetData.id}"]`;

  debugger;
  Fliplet().then(function () {
    new Vue({
      el: '#app-comments',
      data: {
        newComment: '',
        message: 'Hello, Vue!',
        comments: [{
          id: 1,
          data: {
            text: 'Comment 1',
            userInitials: 'AB',
            userFullName: 'Alicia B',
            timestamp: '2020-01-01T00:00:00Z',
            userAvatar: 'https://variety.com/wp-content/uploads/2020/12/Brad_Pitt.png'
          },
          threads: []
        }, {
          id: 2,
          data: {
            text: 'Comment 2',
            userInitials: 'CD',
            userFullName: 'Cory D',
            timestamp: '2020-01-02T00:00:00Z',
            userAvatar: null
          },
          threads: [{
            id: 2,
            data: {
              text: 'Comment 2',
              userInitials: 'CD',
              userFullName: 'Cory D',
              timestamp: '2020-01-02T00:00:00Z',
              userAvatar: null
            }
          }]
        }, {
          id: 3,
          data: {
            text: 'Comment 3',
            userInitials: 'EF',
            userFullName: 'Evan F',
            timestamp: '2020-01-03T00:00:00Z',
            userAvatar: null
          },
          threads: [{
            id: 3,
            data: {
              text: 'Comment 3',
              userInitials: 'EF',
              userFullName: 'Evan F',
              timestamp: '2020-01-03T00:00:00Z',
              userAvatar: 'https://variety.com/wp-content/uploads/2020/12/Brad_Pitt.png'
            }
          }]
        }]
      },
      computed: {
        commentsLength: function commentsLength() {
          return this.message + ' text';
        }
      },
      methods: {
        getTimeFromTimestamp: function getTimeFromTimestamp(timestamp) {
          return moment(timestamp).format('HH:mm:ss');
        },
        getDateFromTimestamp: function getDateFromTimestamp(timestamp) {
          return moment(timestamp).format('MM/DD/YYYY');
        },
        addComment: function addComment() {
          if (this.newComment) {
            this.comments.push({
              id: this.commentsLength + 1,
              text: this.newComment
            });
            this.newComment = '';
          }
        }
      }
    });
  });
});

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./js/libs/build.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\shyft\Desktop\comments\js\libs\build.js */"./js/libs/build.js");


/***/ })

/******/ });