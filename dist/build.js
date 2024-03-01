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

Fliplet.Widget.instance('comments', function (widgetData) {
  var DS_COMMENTS = 'Global Comments';
  var QUERY = Fliplet.Navigate.query;
  var loggedUser = null;
  Fliplet.Widget.initializeChildren(this.$el, this);
  if (!QUERY.dataSourceEntryId) {
    showToastMessage('No data source entry ID provided');
  }
  loggedInUser();
  function loggedInUser() {
    Fliplet.Session.get().then(function onCachedSessionRetrieved(session) {
      loggedUser = _.get(session, 'entries.dataSource.data');
      if (loggedUser) {
        initVue();
      } else {
        showToastMessage('You need to be logged in to see the comments');
      }
    });
  }
  function showToastMessage(message) {
    return Fliplet.UI.Toast(message);
  }
  function initVue() {
    $('[name="comments"]').removeClass('hidden');
    new Vue({
      el: '#app-comments',
      data: {
        newComment: '',
        message: 'Hello, Vue!',
        comments: [
          // {
          //   id: 1,
          //   liked: true,
          //   likeCount: 5,
          //   data: {
          //     text: 'Comment 1',
          //     userInitials: 'AB',
          //     userFullName: 'Alicia B',
          //     timestamp: '2020-01-01T00:00:00Z',
          //     userAvatar: 'https://variety.com/wp-content/uploads/2020/12/Brad_Pitt.png'
          //   },
          //   threads: []
          // },
          // {
          //   id: 2,
          //   liked: true,
          //   likeCount: 3,
          //   data: {
          //     text: 'Comment 2',
          //     userInitials: 'CD',
          //     userFullName: 'Cory D',
          //     timestamp: '2020-01-02T00:00:00Z',
          //     userAvatar: null
          //   },
          //   threads: [{
          //     id: 2,
          //     liked: true,
          //     likeCount: 3,
          //     data: {
          //       text: 'Comment 2',
          //       userInitials: 'CD',
          //       userFullName: 'Cory D',
          //       timestamp: '2020-01-02T00:00:00Z',
          //       userAvatar: null
          //     }
          //   }]
          // },
          // {
          //   id: 3,
          //   liked: false,
          //   likeCount: 7,
          //   data: {
          //     text: 'Comment 3',
          //     userInitials: 'EF',
          //     userFullName: 'Evan F',
          //     timestamp: '2020-01-03T00:00:00Z',
          //     userAvatar: null
          //   },
          //   threads: [{
          //     id: 3,
          //     liked: false,
          //     likeCount: 0,
          //     data: {
          //       text: 'Comment 3',
          //       userInitials: 'EF',
          //       userFullName: 'Evan F',
          //       timestamp: '2020-01-03T00:00:00Z',
          //       userAvatar: 'https://variety.com/wp-content/uploads/2020/12/Brad_Pitt.png'
          //     }
          //   }]
          // }
        ]
      },
      computed: {
        commentsLength: function commentsLength() {
          return this.message + ' text';
        }
      },
      methods: {
        getComments: function getComments() {
          var entryId = '123456'; // Replace with the entry ID from the url

          Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
            return connection.find({
              where: {
                'Entry Id': entryId
              }
            }).then(function (records) {
              var comments = [];
              var threads = [];
              records.forEach(function (el) {
                // get after from the user table
                el.userInitials = (el.data['User Full Name'] || 'John Doe').split(' ').map(function (name) {
                  return name[0];
                }).join('');
                el.userAvatar = el.data['User Avatar'] ? Fliplet.Media.authenticate(el.data['User Avatar']) : null;
                if (el.data['Comment GUID']) {
                  threads.push(el);
                } else {
                  comments.push(el);
                }
              });
              this.comments = comments.map(function (el) {
                el.showThreads = false;
                el.threads = threads.filter(function (thread) {
                  return thread.data['Comment GUID'] === el.data['GUID'];
                });
                return el;
              });
            });
          });
        },
        likedLoginByUser: function likedLoginByUser(likes) {
          return likes.include(loggedUser.Email); // logged user email
        },
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
  }
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