function toggleFields(value = false) {
  Fliplet.Helper.field('columnUserPhoto').toggle(value);
  Fliplet.Helper.field('columnEmail').toggle(value);
  $('#typeaheadUserName').closest('span').toggle(value);
}

function manageDataSourceChange(dataSourceId) {
  if (dataSourceId) {
    toggleFields(true);

    return Fliplet.DataSources.getById(dataSourceId, {
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

      var instance = Fliplet.UI.Typeahead($('#typeaheadUserName'), {
        // options: columns.columns.map(el => {
        //   return { value: el, label: el };
        // }),
        freeInput: false,
        maxItems: 2
      });

      instance.options(columns.columns.map(el => {
        return { value: el, label: el };
      }));

      const key = Object.keys(__widgetData)[0];
      const objValue = __widgetData[key].data;

      instance.set(objValue.userNames, true);
      $('#columnUserPhoto').val(objValue.columnUserPhoto);
      $('#columnEmail').val(objValue.columnEmail);

      instance.change(function(value) {
        Fliplet.Helper.field('userNames').set(value);
      });

      $(document).find('.form-group.fl-typeahead .selectize-input').css('margin', 'auto');
      $(document).find('.form-group.fl-typeahead .selectize-input').css('display', 'block');
      $(document).find('.form-group.fl-typeahead .selectize-input').css('width', 'calc(100% - 30px)');
    });
  }

  toggleFields();
}

const APP_ID = Fliplet.Env.get('appId');
const GLOBAL_COMMENTS_DATA_SOURCE = 'Global Comments';
const DS_DEFINITION = { 'guid': 'GUID' };
const GLOBAL_COMMENTS_DATA_SOURCE_COLUMNS = [
  'GUID', 'Author Email', 'Comment GUID', 'Message', 'Likes', 'Timestamp', 'Flagged', 'Entry Id'
];

// TODO change
const ACCESS_RULES = [{
  'type': ['select', 'insert'],
  'allow': 'loggedIn',
  'enabled': true
},
{
  'type': ['delete'],
  'allow': { 'user': { 'Admin': { 'equals': 'Yes' } } },
  'enabled': true
},
{
  'type': ['update', 'delete'],
  'allow': 'loggedIn',
  // 'allow': { 'user': { 'Author Email': { 'equals': `{{user.[${EMAIL_COLUMN}]}}` } } },
  'enabled': true
}];

Fliplet.DataSources.get({
  attributes: ['id', 'name'],
  where: { APP_ID }
})
  .then(function(dataSources) {
    const dsExist = dataSources.find(el => el.name === GLOBAL_COMMENTS_DATA_SOURCE);

    if (!dsExist) {
      return Fliplet.DataSources.create({
        name: GLOBAL_COMMENTS_DATA_SOURCE,
        appId: APP_ID,
        columns: GLOBAL_COMMENTS_DATA_SOURCE_COLUMNS,
        accessRules: ACCESS_RULES,
        'definition': DS_DEFINITION
      }).then((newDataSource) => {
        return Promise.resolve(newDataSource.id);
      });
    }
  }).then((dsId) => {
    Fliplet.Widget.generateInterface({
      title: 'Comments',
      fields: [
        {
          name: 'commentsDataSourceId',
          type: 'text',
          label: 'Global Social Actions Data Source ID',
          hidden: true,
          default: '',
          ready: function() {
            this.val(dsId);
          }
        },
        {
          name: 'userDataSource',
          type: 'provider',
          package: 'com.fliplet.data-source-provider',
          data: function(value) {
            return {
              dataSourceTitle: 'Datasource',
              dataSourceId: value,
              appId: Fliplet.Env.get('appId'),
              default: {
                name: 'Datasource',
                entries: [],
                columns: []
              },
              accessRules: [
                {
                  allow: 'all',
                  type: [
                    'select'
                  ]
                }
              ]
            };
          },
          beforeSave: function(value) {
            return value && value.id;
          },
          onEvent: function(event, data) {
            if (event === 'dataSourceSelect') {
              return manageDataSourceChange(data.id);
            }

            if (event === 'selected-data-source-loaded') {
              return manageDataSourceChange(data.value);
            }
          },
          ready: function(el, value) {
            return manageDataSourceChange(value);
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
            // Fliplet.Helper.field('columnEmail').toggle(
            //   Fliplet.Helper.field('userDataSource').get()
            // );

            if (Fliplet.Helper.field('userDataSource').get()) {
              setTimeout(() => {
                const key = Object.keys(__widgetData)[0];
                const objValue = __widgetData[key].data;

                $('#columnEmail').val(objValue.columnEmail);
              }, 1000);
            }
          }
        },
        {
          name: 'columnUserPhoto',
          type: 'dropdown',
          label: 'User photo data field',
          options: [],
          default: '',
          ready: function() {
            // Fliplet.Helper.field('columnUserPhoto').toggle(
            //   Fliplet.Helper.field('userDataSource').get()
            // );

            if (Fliplet.Helper.field('userDataSource').get()) {
              setTimeout(() => {
                const key = Object.keys(__widgetData)[0];
                const objValue = __widgetData[key].data;

                $('#columnUserPhoto').val(objValue.columnUserPhoto);
              }, 1000);
            }
          }
        },
        {
          type: 'html',
          html: `
      <div>
        <label for="typeaheadUserName">User data fields (Required)</label>
      </div>
      <div class="form-group fl-typeahead" id="typeaheadUserName">
        <select placeholder="Start typing..."></select>
      </div>`
        },
        {
          type: 'text',
          name: 'flaggedEmails',
          label: 'Enter admin email for flagged comments',
          description: "Note that it's important to have if you're publishing your app to app store",
          placeholder: 'email.com, email.com, email.com'
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
  });
