Fliplet.Widget.instance("comments", function (widgetData) {
  const selector = `[data-interactive-map-id="${widgetData.id}"]`;

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
