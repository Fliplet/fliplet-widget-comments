Fliplet.Widget.instance('comments', function(widgetData) {
  // Fliplet.Widget.initializeChildren(this.$el, this);

  // const selector = `[data-comments-id="${widgetData.id}"]`;

  debugger;
  Fliplet().then(function() {
    var app = new Vue({
      el: '#app-comments',
      data: {
        message: 'Hello, Vue!'
      }
    });
  });
});
