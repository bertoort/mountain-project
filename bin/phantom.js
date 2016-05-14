var phantom = require('phantom');

module.exports = function (info) {
  var sitepage, phInstance;
  var url = 'https://mountainproject.com/'
  if (info) {
    url += "v/" + info.name + "/" + info.id
  }
  return phantom.create()
    .then(instance => {
      phInstance = instance;
      return instance.createPage();
    })
    .then(page => {
      sitepage = page;
      return page.open(url);
    })
    .then(status => {
      console.log(status);
      return sitepage.property('content').then(function (content) {
        return {
          content: content,
          sitepage: sitepage,
          phInstance: phInstance
        };
      })
    })
    .catch(error => {
      console.log(error);
      phInstance.exit();
    });
}
