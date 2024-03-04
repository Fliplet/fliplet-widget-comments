Fliplet.Widget.instance('comments', function(widgetData) {
  const DS_COMMENTS = 'Global Comments';
  const DS_USERS = 'Users'; // Replace from the component settings
  const QUERY = Fliplet.Navigate.query;
  let loggedUser = null;

  if (!QUERY.dataSourceEntryId) {
    showToastMessage('No data source entry ID provided');
  }

  Fliplet.Widget.initializeChildren(this.$el, this);

  initVue();
  // loggedInUser();

  // function loggedInUser() {
  //   Fliplet.Session.get().then(function onCachedSessionRetrieved(session) {
  //     loggedUser = _.get(session, 'entries.dataSource.data');

  //     if (loggedUser) {
  //       initVue();
  //     } else {
  //       showToastMessage('You need to be logged in to see the comments');
  //     }
  //   });
  // }

  function showToastMessage(message) {
    return Fliplet.UI.Toast(message);
  }

  function initVue() {
    $('[name="comments"]').removeClass('hidden');
    Fliplet().then(function() {
      new Vue({
        el: '#app-comments',
        data: {
          commentInput: '',
          commentForEditing: null,
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
          commentsLength: function() {
            return this.message + ' text';
          },
          commentData() {
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
          editComment(comment) {
            this.commentForEditing = comment;
          },
          flagComment(comment) {
            var thisy = this;

            thisy.showToastProgress('Flagging comment...');
            // todo notify admin from the component settings
            comment.data.flagged = true;
            Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
              connection
            ) {
              return connection.update(comment.id, {
                Flagged: comment.data.flagged,
                GUID: comment.data.GUID
              }).then(() => {
                thisy.closeToastProgress();
              });
            }).then(() => {
              setTimeout(() => {
                comment.data.flagged = false;
              }, 2000);
            });
          },
          toggleThreads(comment) {
            comment.showThreads = !comment.showThreads;
          },
          getUserData(userEmails) {
            return Fliplet.DataSources.connectByName(DS_USERS).then(function(
              connection
            ) {
              return connection
                .find({
                  where: { Email: { $in: userEmails } },
                  attributes: ['Email', 'User Full Name', 'User Avatar']
                })
                .then(function(records) {
                  return records;
                });
            });
          },
          getComments() {
            var thisy = this;

            thisy.showToastProgress('Loading comments...');

            var entryId = '123456'; // Replace with the entry ID from the url

            return Fliplet.DataSources.connectByName(DS_COMMENTS).then(
              function(connection) {
                return connection
                  .find({ where: { 'Entry Id': entryId } })
                  .then(function(records) {
                    var userEmails = records.map(
                      (el) => el.data['Author Email']
                    );

                    return thisy.getUserData(userEmails).then(function(users) {
                      var comments = [];
                      var threads = [];

                      records.forEach((el) => {
                        var currentUser = users.find(
                          (user) => user.data['Email'] === el.data['Author Email']
                        );

                        el.data.userInitials = (currentUser.data['User Full Name'] || '')
                          .split(' ')
                          .map((name) => name[0])
                          .join('');
                        el.data.userAvatar = currentUser.data['User Avatar']
                          ? Fliplet.Media.authenticate(currentUser.data['User Avatar'])
                          : null;
                        el.data.flagged = false;
                        el.data.openDropdown = false;

                        if (el.data['Comment GUID']) {
                          threads.push(el);
                        } else {
                          comments.push(el);
                        }
                      });
                      debugger;
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
            return likes.includes(loggedUser.Email); // logged user email
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
                (el) => el !== loggedUser.Email
              );
            } else {
              comment.data.Likes.push(loggedUser.Email);
            }

            Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
              connection
            ) {
              return connection.update(comment.id, {
                Likes: comment.data.Likes,
                GUID: comment.data.GUID
              });
            });
          },
          manageComment() {
            // todo add showToastProgress for edit/add comment
            var thisy = this;

            if (thisy.commentInput) {
              thisy.showToastProgress('Adding comment...');

              Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
                connection
              ) {
                var toInsert = {
                  Message: thisy.commentInput,
                  'Author Email': loggedUser.Email,
                  Timestamp: new Date().toISOString(),
                  'Entry Id': QUERY.dataSourceEntryId,
                  Likes: []
                };

                return connection.insert(toInsert).then(function(record) {
                  record.userInitials = (loggedUser['User Full Name'] || '')
                    .split(' ')
                    .map((name) => name[0])
                    .join('');
                  record.userAvatar = loggedUser['User Avatar']
                    ? Fliplet.Media.authenticate(loggedUser['User Avatar'])
                    : null;
                  record.data.flagged = false;
                  record.data.openDropdown = false;
                  record.showThreads = false;
                  record.threads = [];

                  thisy.comments.push(record);
                  thisy.closeToastProgress();
                  thisy.commentInput = '';
                });
              });
            }
          },
          deleteComment(comment, isThread = false) {
            var thisy = this;
            var options = {
              title: 'Delete comment?',
              message: 'Are you sure you want to delete this comment?',
              labels: ['Agree', 'No'] // Native only (defaults to [OK,Cancel])
            };

            Fliplet.Navigate.confirm(options)
              .then(function(result) {
                if (!result) {
                  return console.log('Not confirmed!');
                }

                thisy.showToastProgress('Deleting comment...');

                if (isThread) {
                  return Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
                    connection
                  ) {
                    return connection.removeById(comment.id).then(function() {
                      thisy.comments = thisy.comments.map(el => {
                        if (el.data['GUID'] === comment.data['Comment GUID']) {
                          el.threads = el.threads.filter((el) => el.id !== comment.id);
                        }

                        return el;
                      });

                      thisy.closeToastProgress();
                    });
                  });
                }

                return Fliplet.DataSources.connectByName(DS_COMMENTS).then(function(
                  connection
                ) {
                  return connection.find({ where: { 'Comment GUID': comment.data.GUID } }).then(function(records) {
                    return connection.commit({
                      delete: records.map((el) => el.id),
                      append: true,
                      extend: true
                    }).then(function() {
                      return connection.removeById(comment.id).then(function() {
                        thisy.comments = thisy.comments.filter((el) => el.id !== comment.id);
                        thisy.closeToastProgress();
                      });
                    });
                  });
                });
              });
          }
        },
        mounted() {
          var thisy = this;

          Fliplet.Session.get().then((session) => {
            loggedUser = _.get(session, 'entries.dataSource.data');

            if (loggedUser) {
              //  initVue();
              debugger;
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
