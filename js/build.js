const isInteract = Fliplet.Env.get('interact');

Fliplet.Widget.instance('comments', function(data) {
  const $rowTemplate = $(this).find('> template[name="row"]');
  let compiledRowTemplate;

  debugger;
  let rowTemplate = ($rowTemplate.html() || '').replace(/<fl-prop data-path="([^"]+)"/g, (match, key) => {
    return `<fl-prop v-html="${key}" data-path="${key}"`;
  });

  debugger;

  $rowTemplate.remove();

  const container = new Promise((resolve) => {
    _.extend(data, {
      rows: []
    });

    function getTemplateForHtml() {
      return `<fl-comment-row :data-row-id="key" :key="key" :class="classes" v-bind="attrs">${rowTemplate}</fl-comment-row>`;
    }

    compiledRowTemplate = Vue.compile(getTemplateForHtml());

    // Row component
    const rowComponent = Vue.component(data.rowView, {
      props: ['row', 'index'],
      data() {
        // const isEditableRow = this.index === 0;

        return {
          key: this.row && this.row.id || Fliplet.guid()
          // classes: {
          //   readonly: isInteract && !isEditableRow
          // },
          // attrs: {
          //   'data-view': isEditableRow ? 'content' : undefined,
          //   'data-node-name': isEditableRow ? 'Content' : undefined
          // }
        };
      },
      render(createElement) {
        return compiledRowTemplate.render.call(this, createElement);
      },
      mounted() {
        Fliplet.Widget.initializeChildren(this.$el, this, '[data-fl-widget-instance], fl-comments');

        if (isInteract) {
          if (this.index === 0) {
            this.$nextTick(() => {
              Fliplet.Studio.emit('update-dom');
            });
          }

          Fliplet.Studio.onEvent((event) => {
            if (event.detail && event.detail.type === 'domUpdated') {
              if (this.index === 0) {
                rowTemplate = this.$el.innerHTML;
                compiledRowTemplate = Vue.compile(getTemplateForHtml());
              }

              this.$forceUpdate();
            }
          });
        }
      },
      beforeDestroy() {
        Fliplet.Widget.destroyChildren(this.$el);
      }
    });

    // Comments
    const vm = new Vue({
      el: $(this).find('> fl-comments')[0],
      data,
      components: {
        row: rowComponent
      }
    });

    vm.rows = [{ id: 1, content: 'Hello world' }, { id: 2, content: 'Hello world 2' }, { id: 3, content: 'Hello world 3' }];
    resolve(vm);
  });
});
