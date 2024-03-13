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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);


Fliplet.Widget.instance('comments', function (widgetData) {
  var DS_COMMENTS = 'Global Comments';
  var DS_USERS = widgetData.dataSource.id;
  var QUERY = Fliplet.Navigate.query;
  var EMAIL_COLUMN = widgetData.columnEmail;
  var USER_PHOTO_COLUMN = widgetData.columnUserPhoto;
  var FLAGGED_EMAILS = widgetData.flaggedEmails;
  var FLAGGED_MAIL_CONTENT = widgetData.flaggedMailContent;
  var USER_NAMES = widgetData.userNames;
  var loggedUser = null;
  if (!widgetData.dataSource) {
    return showToastMessage('Please select Data source');
  }
  if (!widgetData.columnEmail) {
    return showToastMessage('Please select column for the email');
  }
  if (!USER_NAMES) {
    return showToastMessage('Please select user names');
  }
  if (!QUERY.dataSourceEntryId) {
    return showToastMessage('No data source entry ID provided');
  }
  debugger;
  var EMAILS_TO_NOTIFY_FLAGGED_COMMENT = !FLAGGED_EMAILS ? [] : FLAGGED_EMAILS.split(',').map(function (el) {
    return el.trim();
  }).filter(function (el) {
    return RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(el);
  });
  Fliplet.Widget.initializeChildren(this.$el, this);
  if (!Fliplet.Env.get('interact')) {
    initVue();
  }
  function showToastMessage(message) {
    return Fliplet.UI.Toast(message);
  }
  function initVue() {
    $('[name="comments"]').removeClass('hidden');
    Fliplet().then(function () {
      new Vue({
        el: '#app-comments',
        data: {
          commentInput: '',
          commentState: null,
          message: 'Hello, Vue!',
          comments: []
        },
        computed: {
          commentsData: function commentsData() {
            return this.comments;
          }
        },
        methods: {
          showToastProgress: function showToastProgress() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Processing';
            Fliplet.UI.Toast({
              message: message,
              position: 'center',
              backdrop: true,
              tapToDismiss: false,
              duration: false
            });
          },
          closeToastProgress: function closeToastProgress() {
            Fliplet.UI.Toast.dismiss();
          },
          flagComment: function flagComment(comment) {
            var _this = this;
            this.showToastProgress('Flagging comment...');
            comment.data.flagged = true;
            Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
              return connection.update(comment.id, {
                Flagged: comment.data.flagged,
                GUID: comment.data.GUID
              });
            }).then(function () {
              if (EMAILS_TO_NOTIFY_FLAGGED_COMMENT.length) {
                return _this.getExistingEmailsToNotifyAboutFlag().then(function (existingEmails) {
                  var emails = existingEmails.map(function (user) {
                    return {
                      options: {
                        email: user.data[EMAIL_COLUMN],
                        name: user.data['User Full Name'],
                        type: 'to',
                        html: FLAGGED_MAIL_CONTENT,
                        subject: 'Comment flagged'
                        // from_name: 'Example Name'
                      }
                    };
                  });
                  Fliplet.Communicate.batchSendEmail(emails);
                  _this.closeToastProgress();
                  setTimeout(function () {
                    comment.data.flagged = false;
                  }, 2000);
                });
              }
            });
          },
          toggleThreads: function toggleThreads(comment) {
            comment.showThreads = !comment.showThreads;
          },
          getExistingEmailsToNotifyAboutFlag: function getExistingEmailsToNotifyAboutFlag() {
            return Fliplet.DataSources.connect(DS_USERS).then(function (connection) {
              return connection.find({
                where: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, EMAIL_COLUMN, {
                  $in: EMAILS_TO_NOTIFY_FLAGGED_COMMENT
                }),
                attributes: [EMAIL_COLUMN].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(USER_NAMES))
              });
            }).then(function (records) {
              return records;
            });
          },
          getUserData: function getUserData(userEmails) {
            return Fliplet.DataSources.connect(DS_USERS).then(function (connection) {
              return connection.find({
                where: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, EMAIL_COLUMN, {
                  $in: userEmails
                }),
                attributes: [EMAIL_COLUMN].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(USER_NAMES), [USER_PHOTO_COLUMN])
              });
            }).then(function (records) {
              return records;
            });
          },
          getComments: function getComments() {
            var _this2 = this;
            var thisy = this;
            thisy.showToastProgress('Loading comments...');
            var entryId = QUERY.dataSourceEntryId;
            return Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
              return connection.find({
                where: {
                  'Entry Id': entryId
                }
              }).then(function (records) {
                var userEmails = records.map(function (el) {
                  return el.data['Author Email'];
                });
                return thisy.getUserData(userEmails).then(function (users) {
                  var comments = [];
                  var threads = [];
                  records.forEach(function (el) {
                    var currentUser = users.find(function (user) {
                      return user.data[EMAIL_COLUMN] === el.data['Author Email'];
                    });
                    el.data.userInitials = _this2.getUserInitials(currentUser.data);
                    el.data.userAvatar = currentUser.data[USER_PHOTO_COLUMN] ? Fliplet.Media.authenticate(currentUser.data[USER_PHOTO_COLUMN]) : null;
                    el.data.flagged = false;
                    el.data.openDropdown = false;
                    if (el.data['Comment GUID']) {
                      threads.push(el);
                    } else {
                      comments.push(el);
                    }
                  });
                  thisy.comments = comments.map(function (el) {
                    el.showThreads = false;
                    el.threads = threads.filter(function (thread) {
                      return thread.data['Comment GUID'] === el.data['GUID'];
                    });
                    return el;
                  });
                  thisy.closeToastProgress();
                });
              });
            });
          },
          getUserInitials: function getUserInitials(userData) {
            var userInitials = '';
            if (USER_NAMES.length === 1) {
              userInitials = (userData[USER_NAMES[0]] || '').split(' ').map(function (name) {
                return name[0];
              }).join('');
            } else if (USER_NAMES.length === 2) {
              userInitials = USER_NAMES.map(function (el) {
                return userData[el] ? userData[el][0] : '';
              }).join('');
            }
            return userInitials;
          },
          likedLoginByUser: function likedLoginByUser(likes) {
            return likes.includes(loggedUser.Email);
          },
          isLoggedUserOwnerOfComment: function isLoggedUserOwnerOfComment(comment) {
            return comment.data['Author Email'] === loggedUser.Email;
          },
          getTimeFromTimestamp: function getTimeFromTimestamp(timestamp) {
            return moment(timestamp).format('HH:mm');
          },
          getDateFromTimestamp: function getDateFromTimestamp(timestamp) {
            return moment(timestamp).format('MM/DD/YYYY');
          },
          manageLike: function manageLike(comment) {
            if (this.likedLoginByUser(comment.data.Likes)) {
              comment.data.Likes = comment.data.Likes.filter(function (el) {
                return el !== loggedUser[EMAIL_COLUMN];
              });
            } else {
              comment.data.Likes.push(loggedUser[EMAIL_COLUMN]);
            }
            return Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
              return connection.update(comment.id, {
                Likes: comment.data.Likes,
                GUID: comment.data.GUID
              });
            });
          },
          clearState: function clearState() {
            this.commentState = null;
            this.commentInput = '';
          },
          prepareComment: function prepareComment(comment, action) {
            this.commentState = {
              comment: comment,
              action: action
            };
            if (action === 'edit') {
              this.commentInput = comment.data.Message;
            }
          },
          manageComment: function manageComment() {
            var _this3 = this;
            if (this.commentInput) {
              if (!this.commentState || this.commentState.action === 'reply') {
                this.showToastProgress('Adding comment...');
                Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
                  var toInsert = {
                    Message: _this3.commentInput,
                    'Author Email': loggedUser[EMAIL_COLUMN],
                    Timestamp: new Date().toISOString(),
                    'Entry Id': QUERY.dataSourceEntryId,
                    Likes: []
                  };
                  if (_this3.commentState && _this3.commentState.action === 'reply') {
                    toInsert['Comment GUID'] = _this3.commentState.comment.data['GUID'];
                  }
                  return connection.insert(toInsert).then(function (record) {
                    record.data.userInitials = _this3.getUserInitials(loggedUser);
                    record.data.flagged = false;
                    record.data.openDropdown = false;
                    record.showThreads = false;
                    record.threads = [];
                    if (_this3.commentState && _this3.commentState.action === 'reply') {
                      _this3.comments = _this3.comments.map(function (el) {
                        if (el.data['GUID'] === _this3.commentState.comment.data['GUID']) {
                          el.threads.push(record);
                        }
                        return el;
                      });
                    } else {
                      _this3.comments.unshift(record);
                    }
                    _this3.closeToastProgress();
                    _this3.commentInput = '';
                    _this3.commentState = null;
                  });
                });
              } else {
                this.showToastProgress('Updating comment...');
                Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
                  return connection.update(_this3.commentState.comment.id, {
                    Message: _this3.commentInput,
                    GUID: _this3.commentState.comment.data['GUID']
                  }).then(function () {
                    _this3.comments = _this3.comments.map(function (el) {
                      if (el.id === _this3.commentState.comment.id) {
                        el.data.Message = _this3.commentInput;
                      }
                    });
                    _this3.commentInput = '';
                    _this3.commentState = null;
                    _this3.closeToastProgress();
                  });
                });
              }
            }
          },
          deleteComment: function deleteComment(comment) {
            var isThread = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var message = 'Are you sure you want to delete this comment? Note that all the threads and likes will be deleted as well.';
            if (isThread) {
              message = 'Are you sure you want to delete this thread? Note that all the likes will be deleted as well.';
            }
            var thisy = this;
            var options = {
              title: 'Delete comment?',
              message: message,
              labels: ['Agree', 'No'] // Native only (defaults to [OK,Cancel])
            };
            Fliplet.Navigate.confirm(options).then(function (result) {
              if (!result) {
                return Promise.reject(''); // Not confirmed!
              }
              thisy.showToastProgress('Deleting comment...');
              var deleteCommentPromise;
              if (isThread) {
                deleteCommentPromise = Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
                  return connection.removeById(comment.id).then(function () {
                    thisy.comments = thisy.comments.map(function (el) {
                      if (el.data['GUID'] === comment.data['Comment GUID']) {
                        el.threads = el.threads.filter(function (el) {
                          return el.id !== comment.id;
                        });
                      }
                      return el;
                    });
                    thisy.closeToastProgress();
                  });
                });
              } else {
                deleteCommentPromise = Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
                  return connection.find({
                    where: {
                      'Comment GUID': comment.data.GUID
                    }
                  }).then(function (records) {
                    return connection.commit({
                      "delete": records.map(function (el) {
                        return el.id;
                      }),
                      append: true,
                      extend: true
                    }).then(function () {
                      return connection.removeById(comment.id).then(function () {
                        thisy.comments = thisy.comments.filter(function (el) {
                          return el.id !== comment.id;
                        });
                        thisy.closeToastProgress();
                      });
                    });
                  });
                });
              }
              return deleteCommentPromise;
            });
          }
        },
        mounted: function mounted() {
          var thisy = this;
          Fliplet.Session.get().then(function (session) {
            loggedUser = _.get(session, 'entries.dataSource.data');
            if (loggedUser) {
              thisy.getComments();
            } else {
              showToastMessage('You need to be logged in to see the comments');
            }
          });
        }
      });
    });
  }
});

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

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