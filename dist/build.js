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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);



Fliplet.Widget.instance({
  name: 'Comments',
  render: {
    template: '',
    ready: function () {
      var _ready = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
        var widgetData, DS_COMMENTS, DS_USERS, QUERY, EMAIL_COLUMN, USER_PHOTO_COLUMN, FLAGGED_EMAILS, FLAGGED_MAIL_CONTENT, loggedUser, EMAILS_TO_NOTIFY_FLAGGED, showToastMessage, initVue;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              initVue = function _initVue() {
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
                        var thisy = this;
                        thisy.showToastProgress('Flagging comment...');
                        comment.data.flagged = true;
                        Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
                          return connection.update(comment.id, {
                            Flagged: comment.data.flagged,
                            GUID: comment.data.GUID
                          });
                        }).then(function () {
                          if (EMAILS_TO_NOTIFY_FLAGGED.length) {
                            return thisy.getExistingEmailsToNotifyAboutFlag().then(function (existingEmails) {
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
                              thisy.closeToastProgress();
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
                            where: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, EMAIL_COLUMN, {
                              $in: EMAILS_TO_NOTIFY_FLAGGED
                            }),
                            attributes: [EMAIL_COLUMN, 'User Full Name']
                          });
                        }).then(function (records) {
                          return records;
                        });
                      },
                      getUserData: function getUserData(userEmails) {
                        return Fliplet.DataSources.connect(DS_USERS).then(function (connection) {
                          return connection.find({
                            where: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, EMAIL_COLUMN, {
                              $in: userEmails
                            }),
                            attributes: [EMAIL_COLUMN, 'User Full Name', USER_PHOTO_COLUMN]
                          });
                        }).then(function (records) {
                          return records;
                        });
                      },
                      getComments: function getComments() {
                        var thisy = this;
                        thisy.showToastProgress('Loading comments...');
                        var entryId = '123456'; // Replace with the entry ID from the url

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
                                el.data.userInitials = (currentUser.data['User Full Name'] || '').split(' ').map(function (name) {
                                  return name[0];
                                }).join('');
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
                        // todo add showToastProgress for edit/add comment
                        var thisy = this;
                        if (thisy.commentInput) {
                          thisy.showToastProgress('Adding comment...');
                          if (!thisy.commentState || thisy.commentState.action === 'reply') {
                            Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
                              var toInsert = {
                                Message: thisy.commentInput,
                                'Author Email': loggedUser[EMAIL_COLUMN],
                                Timestamp: new Date().toISOString(),
                                'Entry Id': QUERY.dataSourceEntryId,
                                Likes: []
                              };
                              if (thisy.commentState && thisy.commentState.action === 'reply') {
                                toInsert['Comment GUID'] = thisy.commentState.comment.data['GUID'];
                              }
                              return connection.insert(toInsert).then(function (record) {
                                record.data.userInitials = (loggedUser['User Full Name'] || '').split(' ').map(function (name) {
                                  return name[0];
                                }).join('');
                                record.data.userAvatar = loggedUser[USER_PHOTO_COLUMN] ? Fliplet.Media.authenticate(loggedUser[USER_PHOTO_COLUMN]) : null;
                                record.data.flagged = false;
                                record.data.openDropdown = false;
                                record.showThreads = false;
                                record.threads = [];
                                if (thisy.commentState && thisy.commentState.action === 'reply') {
                                  thisy.comments = thisy.comments.map(function (el) {
                                    if (el.data['GUID'] === thisy.commentState.comment.data['GUID']) {
                                      el.threads.push(record);
                                    }
                                    return el;
                                  });
                                } else {
                                  thisy.comments.unshift(record);
                                }
                                thisy.closeToastProgress();
                                thisy.commentInput = '';
                                thisy.commentState = null;
                              });
                            });
                          } else {
                            Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
                              return connection.update(thisy.commentState.comment.id, {
                                Message: thisy.commentInput,
                                GUID: thisy.commentState.comment.data['GUID']
                              }).then(function () {
                                thisy.comments = thisy.comments.map(function (el) {
                                  if (el.id === thisy.commentState.comment.id) {
                                    el.data.Message = thisy.commentInput;
                                  }
                                });
                                thisy.commentInput = '';
                                thisy.commentState = null;
                                thisy.closeToastProgress();
                              });
                            });
                          }
                        }
                      },
                      deleteComment: function deleteComment(comment) {
                        var isThread = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                        var thisy = this;
                        var options = {
                          title: 'Delete comment?',
                          message: 'Are you sure you want to delete this comment?',
                          labels: ['Agree', 'No'] // Native only (defaults to [OK,Cancel])
                        };
                        Fliplet.Navigate.confirm(options).then(function (result) {
                          if (!result) {
                            return console.log('Not confirmed!');
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
                      } // deleteComment(comment, isThread = false) {
                      //   var thisy = this;
                      //   var options = {
                      //     title: 'Delete comment?',
                      //     message: 'Are you sure you want to delete this comment?',
                      //     labels: ['Agree', 'No'] // Native only (defaults to [OK,Cancel])
                      //   };
                      //   Fliplet.Navigate.confirm(options)
                      //     .then(function(result) {
                      //       if (!result) {
                      //         return console.log('Not confirmed!');
                      //       }
                      //       thisy.showToastProgress('Deleting comment...');
                      //       if (isThread) {
                      //         return Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
                      //           connection
                      //         ) {
                      //           return connection.removeById(comment.id).then(function() {
                      //             thisy.comments = thisy.comments.map(el => {
                      //               if (el.data['GUID'] === comment.data['Comment GUID']) {
                      //                 el.threads = el.threads.filter((el) => el.id !== comment.id);
                      //               }
                      //               return el;
                      //             });
                      //             thisy.closeToastProgress();
                      //           });
                      //         });
                      //       }
                      //       return Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
                      //         connection
                      //       ) {
                      //         return connection.find({ where: { 'Comment GUID': comment.data.GUID } }).then(function(records) {
                      //           return connection.commit({
                      //             delete: records.map((el) => el.id),
                      //             append: true,
                      //             extend: true
                      //           }).then(function() {
                      //             return connection.removeById(comment.id).then(function() {
                      //               thisy.comments = thisy.comments.filter((el) => el.id !== comment.id);
                      //               thisy.closeToastProgress();
                      //             });
                      //           });
                      //         });
                      //       });
                      //     });
                      // }
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
              };
              showToastMessage = function _showToastMessage(message) {
                return Fliplet.UI.Toast(message);
              };
              widgetData = this; // Fliplet.Widget.instance('comments', function(widgetData) {
              if (widgetData.dataSource) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return", showToastMessage('Please select Data source'));
            case 5:
              if (widgetData.columnEmail) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", showToastMessage('Please select column for the email'));
            case 7:
              this.fields = _.assign({
                dataSource: '',
                columnEmail: '',
                columnUserPhoto: '',
                redirectEndScreen: '',
                flaggedEmails: '',
                flaggedMailContent: ''
              }, this.fields);
              debugger;
              DS_COMMENTS = 'Global Comments';
              DS_USERS = widgetData.dataSource.id;
              QUERY = Fliplet.Navigate.query;
              EMAIL_COLUMN = widgetData.columnEmail;
              USER_PHOTO_COLUMN = widgetData.columnUserPhoto;
              FLAGGED_EMAILS = widgetData.flaggedEmails;
              FLAGGED_MAIL_CONTENT = widgetData.flaggedMailContent;
              loggedUser = null;
              EMAILS_TO_NOTIFY_FLAGGED = !FLAGGED_EMAILS ? [] : FLAGGED_EMAILS.split(',').map(function (el) {
                return el.trim();
              }).filter(function (el) {
                return RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(el);
              });
              debugger;
              if (!QUERY.dataSourceEntryId) {
                showToastMessage('No data source entry ID provided');
              }
              Fliplet.Widget.initializeChildren(this.$el, this);
              if (!Fliplet.Env.get('interact')) {
                initVue();
              }
            case 22:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function ready() {
        return _ready.apply(this, arguments);
      }
      return ready;
    }()
  }
});

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

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

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

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

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


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