module.exports = {
  addToList: function(list, area) {
    area.each(function (i, elem) {
      list.push(elem.attribs.href)
    })
  },
  normalize: function(list) {
    return list.reduce(function (newList, link) {
      var split = link.split('/');
      newList[split[2]] = {name: split[3], url: link};
      return newList
    }, {})
  }
}
