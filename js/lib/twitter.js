
/**
 * TwitterのoAuthのコールバック処理用の関数
 */
function authCallbackByTwitter(request) {
  var service = twitter.getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}

/**
 * Googleのライブラリを使用した、Twitterクライアント
 * https://github.com/googlesamples/apps-script-oauth1
 */
var twitter = {

  _service: null, // Object


  /**
   * twitterに投稿する
   * また、アプリが認証されていない場合は、oAuth認証を行う
   * @param {string} text - 投稿内容のテキスト
   * @return {Object} レスポンス
   */
  update: function(text) {
    var service = this.getService();

    if (service.hasAccess()) {
      var url = 'https://api.twitter.com/1.1/statuses/update.json';
      var payload = {
        status: text
      };
      var response = service.fetch(url, {
        method: 'post',
        payload: payload
      });
      var result = JSON.parse(response.getContentText());
    } else {
      var authorizationUrl = service.authorize();
      Logger.log('このURLにアクセスしてTwitterのアプリとして許可をする : %s', authorizationUrl);
    }
  },

  /**
   * 認証をリセットする
   */
  reset: function() {
    var service = this.getService();
    service.reset();
  },

  /**
   * サービスを構成する
   */
  getService: function(consumerKey, consumerSecret) {
    if (this._service) {
      return this._service;
    }

    this._service = OAuth1.createService('Twitter')
      .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
      .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
      .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')

      .setConsumerKey(TWITTER_CONSUMER_KEY)
      .setConsumerSecret(TWITTER_CONSUMER_SECRET)

      // コールバックの関数を指定する
      .setCallbackFunction('authCallbackByTwitter')

      // トークンは永続化するため、プロパティストアにセットする。
      .setPropertyStore(PropertiesService.getUserProperties());

    return this._service;
  },
};
