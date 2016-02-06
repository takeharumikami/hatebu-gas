var utils = {
  parseXml: (xml) => {
    // TODO https
    const URL_ATOM = 'http://www.w3.org/2005/Atom';

    var doc = XmlService.parse(xml);
    var root = doc.getRootElement();
    var atom = XmlService.getNamespace(URL_ATOM);

    var entries = doc.getRootElement().getChildren('entry', atom);
    for (var i = 0; i < entries.length; i++) {
      var title = entries[i].getChild('title', atom).getText();
      var categoryElements = entries[i].getChildren('category', atom);
      var labels = [];
      for (var j = 0; j < categoryElements.length; j++) {
        labels.push(categoryElements[j].getAttribute('term').getValue());
      }
      Logger.log('%s (%s)', title, labels.join(', '));
    }
  }

};
