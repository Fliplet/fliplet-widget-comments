// This function is used to generate the interface for the widget
Fliplet.Widget.generateInterface({
  title: 'Comments',
  fields: [
    {
      name: 'showArrows',
      type: 'radio',
      label: 'Show navigation arrows',
      options: [
        { value: true, label: 'Mobile & Desktop' },
        { value: false, label: 'Only Desktop' }
      ],
      default: true
    }
  ]
});
