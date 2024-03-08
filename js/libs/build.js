Fliplet.Widget.instance('comments', function(widgetData) {
  debugger;

  if (!widgetData.dataSource) {
    return showToastMessage('Please select Data source');
  }

  if (!widgetData.columnEmail) {
    return showToastMessage('Please select column for the email');
  }

  const DS_COMMENTS = 'Global Comments';
  const DS_USERS = widgetData.dataSource.id;
  const QUERY = Fliplet.Navigate.query;
  const EMAIL_COLUMN = widgetData.columnEmail;
  const USER_PHOTO_COLUMN = widgetData.columnUserPhoto;
  const FLAGGED_EMAILS = widgetData.flaggedEmails;
  const FLAGGED_MAIL_CONTENT = widgetData.flaggedMailContent;
  const USER_NAMES = widgetData.userNames;
  let loggedUser = null;

  if (!USER_NAMES) {
    return showToastMessage('Please select user names');
  }

  if (!QUERY.dataSourceEntryId) {
    return showToastMessage('No data source entry ID provided');
  }

  debugger;
  const EMAILS_TO_NOTIFY_FLAGGED = !FLAGGED_EMAILS
    ? []
    : FLAGGED_EMAILS.split(',')
      .map((el) => el.trim())
      .filter((el) => RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(el));

  Fliplet.Widget.initializeChildren(this.$el, this);

  if (!Fliplet.Env.get('interact')) {
    initVue();
  }

  function showToastMessage(message) {
    return Fliplet.UI.Toast(message);
  }

  function initVue() {
    $('[name="comments"]').removeClass('hidden');
    Fliplet().then(() => {
      new Vue({
        el: '#app-comments',
        data: {
          commentInput: '',
          commentState: null,
          message: 'Hello, Vue!',
          comments: []
        },
        computed: {
          commentsData() {
            return this.comments;
          }
        },
        methods: {
          showToastProgress(message = 'Processing') {
            Fliplet.UI.Toast({
              message,
              position: 'center',
              backdrop: true,
              tapToDismiss: false,
              duration: false
            });
          },
          closeToastProgress() {
            Fliplet.UI.Toast.dismiss();
          },
          flagComment(comment) {
            var thisy = this;

            thisy.showToastProgress('Flagging comment...');
            comment.data.flagged = true;

            Fliplet.DataSources.connectByName(DS_COMMENTS)
              .then(function(connection) {
                return connection.update(comment.id, {
                  Flagged: comment.data.flagged,
                  GUID: comment.data.GUID
                });
              })
              .then(() => {
                if (EMAILS_TO_NOTIFY_FLAGGED.length) {
                  return thisy
                    .getExistingEmailsToNotifyAboutFlag()
                    .then((existingEmails) => {
                      var emails = existingEmails.map((user) => {
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
                      setTimeout(() => {
                        comment.data.flagged = false;
                      }, 2000);
                    });
                }
              });
          },
          toggleThreads(comment) {
            comment.showThreads = !comment.showThreads;
          },
          getExistingEmailsToNotifyAboutFlag() {
            return Fliplet.DataSources.connect(DS_USERS)
              .then((connection) =>
                connection.find({
                  where: { [EMAIL_COLUMN]: { $in: EMAILS_TO_NOTIFY_FLAGGED } },
                  attributes: [EMAIL_COLUMN, ...USER_NAMES]
                })
              )
              .then((records) => records);
          },
          getUserData(userEmails) {
            return Fliplet.DataSources.connect(DS_USERS)
              .then((connection) =>
                connection.find({
                  where: { [EMAIL_COLUMN]: { $in: userEmails } },
                  attributes: [
                    EMAIL_COLUMN,
                    ...USER_NAMES,
                    USER_PHOTO_COLUMN
                  ]
                })
              )
              .then((records) => records);
          },
          getComments() {
            var thisy = this;

            thisy.showToastProgress('Loading comments...');

            var entryId = '123456'; // Replace with the entry ID from the url

            return Fliplet.DataSources.connectByName(DS_COMMENTS).then(
              connection => {
                return connection
                  .find({ where: { 'Entry Id': entryId } })
                  .then(records => {
                    var userEmails = records.map(
                      (el) => el.data['Author Email']
                    );

                    return thisy.getUserData(userEmails).then(users => {
                      var comments = [];
                      var threads = [];

                      records.forEach((el) => {
                        var currentUser = users.find(
                          (user) =>
                            user.data[EMAIL_COLUMN] === el.data['Author Email']
                        );

                        var userInitials = '';

                        if (USER_NAMES.length === 1) {
                          userInitials = (
                            currentUser.data[USER_NAMES[0]] || ''
                          )
                            .split(' ')
                            .map((name) => name[0])
                            .join('');
                        } else if (USER_NAMES.length === 2) {
                          userInitials = USER_NAMES.map((el) => currentUser.data[el] ? currentUser.data[el][0] : '').join('');
                        }

                        el.data.userInitials = userInitials;
                        el.data.userAvatar = currentUser.data[USER_PHOTO_COLUMN]
                          ? Fliplet.Media.authenticate(
                            currentUser.data[USER_PHOTO_COLUMN]
                          )
                          : null;
                        el.data.flagged = false;
                        el.data.openDropdown = false;

                        if (el.data['Comment GUID']) {
                          threads.push(el);
                        } else {
                          comments.push(el);
                        }
                      });

                      thisy.comments = comments.map((el) => {
                        el.showThreads = false;
                        el.threads = threads.filter(
                          (thread) =>
                            thread.data['Comment GUID'] === el.data['GUID']
                        );

                        return el;
                      });

                      thisy.closeToastProgress();
                    });
                  });
              }
            );
          },
          likedLoginByUser(likes) {
            return likes.includes(loggedUser.Email);
          },
          isLoggedUserOwnerOfComment(comment) {
            return comment.data['Author Email'] === loggedUser.Email;
          },
          getTimeFromTimestamp: function(timestamp) {
            return moment(timestamp).format('HH:mm');
          },
          getDateFromTimestamp: function(timestamp) {
            return moment(timestamp).format('MM/DD/YYYY');
          },
          manageLike(comment) {
            if (this.likedLoginByUser(comment.data.Likes)) {
              comment.data.Likes = comment.data.Likes.filter(
                (el) => el !== loggedUser[EMAIL_COLUMN]
              );
            } else {
              comment.data.Likes.push(loggedUser[EMAIL_COLUMN]);
            }

            return Fliplet.DataSources.connectByName(DS_COMMENTS).then(
              function(connection) {
                return connection.update(comment.id, {
                  Likes: comment.data.Likes,
                  GUID: comment.data.GUID
                });
              }
            );
          },
          clearState() {
            this.commentState = null;
            this.commentInput = '';
          },
          prepareComment(comment, action) {
            this.commentState = {
              comment,
              action
            };

            if (action === 'edit') {
              this.commentInput = comment.data.Message;
            }
          },
          manageComment() {
            // todo add showToastProgress for edit/add comment
            var thisy = this;

            if (thisy.commentInput) {
              thisy.showToastProgress('Adding comment...');

              if (
                !thisy.commentState
                || thisy.commentState.action === 'reply'
              ) {
                Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
                  connection
                ) {
                  var toInsert = {
                    Message: thisy.commentInput,
                    'Author Email': loggedUser[EMAIL_COLUMN],
                    Timestamp: new Date().toISOString(),
                    'Entry Id': QUERY.dataSourceEntryId,
                    Likes: []
                  };

                  if (
                    thisy.commentState
                    && thisy.commentState.action === 'reply'
                  ) {
                    toInsert['Comment GUID']
                      = thisy.commentState.comment.data['GUID'];
                  }

                  return connection.insert(toInsert).then(function(record) {
                    record.data.userInitials = (
                      loggedUser['User Full Name'] || ''
                    )
                      .split(' ')
                      .map((name) => name[0])
                      .join('');
                    record.data.userAvatar = loggedUser[USER_PHOTO_COLUMN]
                      ? Fliplet.Media.authenticate(
                        loggedUser[USER_PHOTO_COLUMN]
                      )
                      : null;
                    record.data.flagged = false;
                    record.data.openDropdown = false;
                    record.showThreads = false;
                    record.threads = [];

                    if (
                      thisy.commentState
                      && thisy.commentState.action === 'reply'
                    ) {
                      thisy.comments = thisy.comments.map((el) => {
                        if (
                          el.data['GUID']
                          === thisy.commentState.comment.data['GUID']
                        ) {
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
                Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
                  connection
                ) {
                  return connection
                    .update(thisy.commentState.comment.id, {
                      Message: thisy.commentInput,
                      GUID: thisy.commentState.comment.data['GUID']
                    })
                    .then(function() {
                      thisy.comments = thisy.comments.map((el) => {
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
          deleteComment(comment, isThread = false) {
            var thisy = this;
            var options = {
              title: 'Delete comment?',
              message: 'Are you sure you want to delete this comment?',
              labels: ['Agree', 'No'] // Native only (defaults to [OK,Cancel])
            };

            Fliplet.Navigate.confirm(options).then(function(result) {
              if (!result) {
                return console.log('Not confirmed!');
              }

              thisy.showToastProgress('Deleting comment...');

              var deleteCommentPromise;

              if (isThread) {
                deleteCommentPromise = Fliplet.DataSources.connectByName(
                  DS_COMMENTS
                ).then(function(connection) {
                  return connection.removeById(comment.id).then(function() {
                    thisy.comments = thisy.comments.map((el) => {
                      if (el.data['GUID'] === comment.data['Comment GUID']) {
                        el.threads = el.threads.filter(
                          (el) => el.id !== comment.id
                        );
                      }

                      return el;
                    });

                    thisy.closeToastProgress();
                  });
                });
              } else {
                deleteCommentPromise = Fliplet.DataSources.connectByName(
                  DS_COMMENTS
                ).then(function(connection) {
                  return connection
                    .find({ where: { 'Comment GUID': comment.data.GUID } })
                    .then(function(records) {
                      return connection
                        .commit({
                          delete: records.map((el) => el.id),
                          append: true,
                          extend: true
                        })
                        .then(function() {
                          return connection
                            .removeById(comment.id)
                            .then(function() {
                              thisy.comments = thisy.comments.filter(
                                (el) => el.id !== comment.id
                              );
                              thisy.closeToastProgress();
                            });
                        });
                    });
                });
              }

              return deleteCommentPromise;
            });
          }
          // deleteComment(comment, isThread = false) {
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
        mounted() {
          var thisy = this;

          Fliplet.Session.get().then((session) => {
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
