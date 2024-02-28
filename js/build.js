// Register this widget instance
Fliplet.Widget.instance({
  name: 'Comments',
  displayName: 'Comments',
  render: {
    ready: function() {
      // Initialize children components when this widget is ready
      Fliplet.Widget.initializeChildren(this.$el, this);

      var app = new Vue({
        el: '#comments-container',
        data: {
          message: 'Hello, Vue!'
        }
      });
    }
  }
});
