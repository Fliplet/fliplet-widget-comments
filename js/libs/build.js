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


Fliplet.Widget.instance('comments', function(widgetData) {
  // Fliplet.Widget.initializeChildren(this.$el, this);
  // const selector = `[data-comments-id="${widgetData.id}"]`;

  debugger;
  Fliplet().then(function() {
    new Vue({
      el: '#app-comments',
      data: {
        newComment: '',
        message: 'Hello, Vue!',
        comments: [
          {
            id: 1,
            data: {
              text: 'Comment 1',
              userInitials: 'AB',
              userFullName: 'Alicia B',
              timestamp: '2020-01-01T00:00:00Z',
              userAvatar: 'https://variety.com/wp-content/uploads/2020/12/Brad_Pitt.png'
            },
            threads: []
          },
          {
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
          },
          {
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
          }
        ]
      },
      computed: {
        commentsLength: function() {
          return this.message + ' text';
        }
      },
      methods: {
        getTimeFromTimestamp: function(timestamp) {
          return moment(timestamp).format('HH:mm:ss');
        },
        getDateFromTimestamp: function(timestamp) {
          return moment(timestamp).format('MM/DD/YYYY');
        },
        addComment() {
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
