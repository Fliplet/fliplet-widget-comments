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

Fliplet.Widget.instance({
  name: 'comments',
  render: {
    template: [
      '<div id="comments-container">',
      '</div>'
    ].join(''),
    ready: async function() {
      await Fliplet.Widget.initializeChildren(this.$el, this);

      debugger;
      Fliplet().then(function() {
        new Vue({
          el: '#comments-container',
          data: {
            message: 'Hello, Vue!'
          }
        });
      });
    },
    views: [
      // {
      //   name: 'slides',
      //   displayName: 'Slides',
      //   placeholder:
      //     '<div class="well text-center">Add Slide components to build your slider</div>',
      //   allow: ['slide']
      // }
    ]
  }
});

