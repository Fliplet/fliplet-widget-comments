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
        if (value) {
          Fliplet.DataSources.getById(value.id, {
            attributes: ['columns']
          }).then(function(columns) {
            $('#columnEmail').html('');
            $('#columnUserPhoto').html('');
            $('#columnEmail').append('<option value="">Select an option</option>');
            $('#columnUserPhoto').append('<option value="">Select an option</option>');
            columns.columns.forEach((el) => {
              $('#columnEmail').append(`<option value="${el}">${el}</option>`);
              $('#columnUserPhoto').append(`<option value="${el}">${el}</option>`);
            });

            // Fliplet.UI.Typeahead($('#target'), {
            //   options: columns.columns,
            //   freeInput: false,
            //   maxItems: 2
            // });
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
    },
    {
      name: 'columnUserPhoto',
      type: 'dropdown',
      label: 'User photo data field',
      options: [],
      default: '',
      ready: function() {
        Fliplet.Helper.field('columnUserPhoto').toggle(
          Fliplet.Helper.field('dataSource').get()
        );
      }
    },
    {
      type: 'html',
      html: `
      <div>
        <label for="tokenfield">User data fields (Required)</label>
      </div>
      <div class="form-group fl-typeahead" id="target">
        <select placeholder="Start typing..."></select>
      </div>`
    },
    {
      type: 'text',
      name: 'flaggedEmails',
      label: 'Enter admin email for flagged comments',
      description: "Note that it's important to have if you're publishing your app to app store",
      placeholder: 'email.com, email.com, email.com',
      required: true
    }
  ]
});
// });
