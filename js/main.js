/*global utils */

var main = {

  /**
   * はてぶで取得された最新記事をシートに出力する
   */
  exportLatestArticles: () => {

  },

  _fetchLatestArticles: () => {
    const URL_HOTENTRY = 'https://b.hatena.ne.jp/hotentry/it.rss';
    const URL_ENTRYLIST = 'https://b.hatena.ne.jp/entrylist/it?mode=rss';

    var xml =  UrlFetchApp.fetch(URL_HOTENTRY).getContentText();
    utils.parseXml(xml);

  }
};
