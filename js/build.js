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


Fliplet.Widget.instance('comments', function(widgetData) {
  // Fliplet.Widget.initializeChildren(this.$el, this);

  const selector = `[data-comments-id="${widgetData.id}"]`;

  debugger;
  Fliplet().then(function() {
    new Vue({
      el: $(selector)[0],
      data: {
        message: 'Hello, Vue!'
      }
    });
  });
});

