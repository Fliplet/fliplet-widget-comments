// var appDataSources = [];

// Fliplet.DataSources.get({
//   appId: Fliplet.Env.get('masterAppId'),
//   attributes: ['id', 'name']
// }).then(function(dataSources) {
//   appDataSources = dataSources.map((el) => {
//     return { value: el.id, label: el.name };
//   });
Fliplet.Widget.generateInterface({
  title: 'Comments',
  fields: [
    {
      name: 'dataSource',
      type: 'provider',
      label: 'Datasource',
      package: 'com.fliplet.data-source-provider',
      // onEvent: function(event, data) {
      //   debugger;
      // var value = 'x';

      // Fliplet.Helper.field('columnName').toggle(value);

      // if (value) {
      //   Fliplet.DataSources.getById(value, {
      //     attributes: ['columns']
      //   }).then(function(columns) {
      //     $('#columnName').html('');
      //     columns.columns.forEach((el) => {
      //       $('#columnName').append(`<option value="${el}">${el}</option>`);
      //     });
      //   });
      // }
      // },
      ready: function(el, value, provider) {
        debugger;

        if (value) {
          Fliplet.DataSources.getById(value.id, {
            attributes: ['columns']
          }).then(function(columns) {
            $('#columnEmail').html('');
            columns.columns.forEach((el) => {
              $('#columnEmail').append(`<option value="${el}">${el}</option>`);
            });
          });
        }
      }
    },
    {
      name: 'columnEmail',
      type: 'dropdown',
      label: 'User email data field (Required)',
      options: [],
      default: '',
      ready: function() {
        Fliplet.Helper.field('columnEmail').toggle(
          Fliplet.Helper.field('dataSource').get()
        );
      }
    }
  ]
});
// });
