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
  var DS_USERS = 'Users'; // Replace from the component settings
  var QUERY = Fliplet.Navigate.query;
  var loggedUser = null;
  if (!QUERY.dataSourceEntryId) {
    showToastMessage('No data source entry ID provided');
  }
  Fliplet.Widget.initializeChildren(this.$el, this);
  initVue();
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
            var thisy = this;
            thisy.showToastProgress('Flagging comment...');
            comment.data.flagged = true;
            Fliplet.DataSources.connectByName(DS_COMMENTS).then(function (connection) {
              return connection.update(comment.id, {
                Flagged: comment.data.flagged,
                GUID: comment.data.GUID
              });
            }).then(function () {
              thisy.closeToastProgress();
              setTimeout(function () {
                comment.data.flagged = false;
              }, 2000);
            });
          },
          toggleThreads: function toggleThreads(comment) {
            comment.showThreads = !comment.showThreads;
          },
          getUserData: function getUserData(userEmails) {
            return Fliplet.DataSources.connectByName(DS_USERS).then(function (connection) {
              return connection.find({
                where: {
                  Email: {
                    $in: userEmails
                  }
                },
                attributes: ['Email', 'User Full Name', 'User Avatar']
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
                      return user.data['Email'] === el.data['Author Email'];
                    });
                    el.data.userInitials = (currentUser.data['User Full Name'] || '').split(' ').map(function (name) {
                      return name[0];
                    }).join('');
                    el.data.userAvatar = currentUser.data['User Avatar'] ? Fliplet.Media.authenticate(currentUser.data['User Avatar']) : null;
                    el.data.flagged = false;
                    el.data.openDropdown = false;
                    if (el.data['Comment GUID']) {
                      threads.push(el);
                    } else {
                      comments.push(el);
                    }
                  });
                  debugger;
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
                return el !== loggedUser.Email;
              });
            } else {
              comment.data.Likes.push(loggedUser.Email);
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
                    'Author Email': loggedUser.Email,
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
                    record.data.userAvatar = loggedUser['User Avatar'] ? Fliplet.Media.authenticate(loggedUser['User Avatar']) : null;
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