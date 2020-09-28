module.exports = [
    {
      type: 'text',
      name: 'rootFolder',
      message: 'Enter a name for your project (small cases)? 🗂',
      default: 'testproject',
    },
    {
        type: 'text',
        name: 'version',
        message: 'Version? 🆚',
        default: '1.0.0',
    },
    {
        type: 'text',
        name: 'description',
        message: 'Description? ⿳',
        default: 'Some test Project',
    },
    {
        type: 'text',
        name: 'entry',
        message: 'Entry point? 📝',
        default: 'index.js',
    },
    {
        type: 'text',
        name: 'repository',
        message: `Git repository? 🗃`,
        default: '',
    },
    {
        type: 'text',
        name: 'authorsName',
        message: `Enter author's name ? 🧐`,
        default: '',
    },
    {
        type: 'text',
        name: 'license',
        message: 'License?',
        default: '',
    },
  ];