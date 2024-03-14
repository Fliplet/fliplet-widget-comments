// var appDataSources = [];

// Fliplet.DataSources.get({
//   appId: Fliplet.Env.get('masterAppId'),
//   attributes: ['id', 'name']
// }).then(function(dataSources) {
//   appDataSources = dataSources.map((el) => {
//     return { value: el.id, label: el.name };
//   });
debugger;
Fliplet.Widget.generateInterface({
  title: 'Comments',
  fields: [
    {
      name: 'dataSource',
      type: 'provider',
      label: 'Datasource',
      package: 'com.fliplet.data-source-provider',
      onEvent: function(event, data) {
        debugger;
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
      },
      ready: function(el, value, provider) {
        debugger;

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

            const key = Object.keys(__widgetData)[0];
            const objValue = __widgetData[key].data;

            Fliplet.Helper.field('columnEmail').set(objValue.columnEmail);
            Fliplet.Helper.field('columnUserPhoto').set(objValue.columnUserPhoto);

            var instance = Fliplet.UI.Typeahead($('#target'), {
              options: columns.columns.map(el => {
                return { value: el, label: el };
              }),
              freeInput: false,
              maxItems: 2
            });

            instance.change(function(value) {
              Fliplet.Helper.field('userNames').set(value);
            });
          });
        }
      }
    },
    {
      name: 'userNames',
      type: 'hidden'
    },
    {
      name: 'columnEmail',
      type: 'dropdown',
      label: 'User email data field (Required)',
      options: [],
      default: '',
      required: true,
      ready: function() {
        Fliplet.Helper.field('columnEmail').toggle(
          Fliplet.Helper.field('dataSource').get()
        );
      }
      // change: function() {
      //   debugger;
      //   const key = Object.keys(__widgetData)[0];
      //   const objValue = __widgetData[key].data;
      //   const value = objValue.columnEmail;

      //   if (value) {
      //     Fliplet.Helper.field('columnEmail').set(value);
      //   }
      // }
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
      // change: function() {
      //   debugger;
      //   const key = Object.keys(__widgetData)[0];
      //   const objValue = __widgetData[key].data;
      //   const value = objValue.columnUserPhoto;

      //   if (value) {
      //     Fliplet.Helper.field('columnUserPhoto').set(value);
      //   }
      // }
    },
    {
      type: 'html',
      html: `
      <div>
        <label for="target">User data fields (Required)</label>
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
    },
    {
      type: 'textarea',
      name: 'flaggedMailContent',
      label: 'Create an email template that will be sent to the admin with a flagged comment',
      description: '',
      placeholder: 'Comment below was flagged. Please take an action on it.',
      rows: 5
    }
  ]
});
// });
