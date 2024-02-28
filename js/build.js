Fliplet.Widget.instance("comments", function (widgetData) {
  const selector = `[data-comments-id="${widgetData.id}"]`;
  debugger
  Fliplet().then(function () {
    new Vue({
      el: $(selector)[0],
      data() {
        return {
          containsData: "test data",
        };
      },
      methods: {},
      async mounted() {},
    });
  });
});
