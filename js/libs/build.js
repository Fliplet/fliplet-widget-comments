Fliplet.Widget.instance('comments', function(widgetData) {
  const DS_COMMENTS = 'Global Comments';
  const DS_USERS = 'Users';
  const QUERY = Fliplet.Navigate.query;
  let loggedUser = null;

  Fliplet.Widget.initializeChildren(this.$el, this);

  if (!QUERY.dataSourceEntryId) {
    showToastMessage('No data source entry ID provided');
  }

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
          }
          // comments() {
          //   return this.commentsData;
          // }
        },
        methods: {
          consoleComments() {
            // console.log(this.commentsData);
            console.log(this.comments);
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
            var entryId = '123456'; // Replace with the entry ID from the url

            return Fliplet.DataSources.connectByName(DS_COMMENTS).then(
              function(connection) {
                return connection
                  .find({ where: { 'Entry Id': entryId } })
                  .then(function(records) {
                    var userEmails = records.map(
                      (el) => el.data['Author Email']
                    );

                    thisy.getUserData(userEmails).then(function(users) {
                      var comments = [];
                      var threads = [];

                      records.forEach((el) => {
                        var currentUser = users.find(
                          (user) => user.data['Email'] === el.data['Author Email']
                        );

                        el.userInitials = (currentUser.data['User Full Name'] || '')
                          .split(' ')
                          .map((name) => name[0])
                          .join('');
                        el.userAvatar = currentUser.data['User Avatar']
                          ? Fliplet.Media.authenticate(currentUser.data['User Avatar'])
                          : null;
                        el.flagged = false;

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
                    });
                  });
              }
            );
          },
          likedLoginByUser(likes) {
            return likes.includes(loggedUser.Email); // logged user email
          },
          getTimeFromTimestamp: function(timestamp) {
            return moment(timestamp).format('HH:mm:ss');
          },
          getDateFromTimestamp: function(timestamp) {
            return moment(timestamp).format('MM/DD/YYYY');
          },
          manageComment() {
            if (this.commentInput) {
              this.comments.push({
                id: this.commentsLength + 1,
                data: {
                  text: this.commentInput,
                  userInitials: 'AB',
                  userFullName: 'Alicia B',
                  timestamp: new Date().toISOString(),
                  userAvatar:
                    'https://variety.com/wp-content/uploads/2020/12/Brad_Pitt.png'
                }
              });
              this.commentInput = '';
            }
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
