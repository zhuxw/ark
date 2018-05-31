module.exports = {
  /**
   * Ark版本号
   */
  version: '<%= arkInfo.version %>',

  /**
   * 所采用的框架
   */
  framework: '<%= framework %>',

  /**
   * 自动采用base64编码inline在css里的图片大小限制
   * 默认10K以内的图自动inline
   */
  inlineImgSizeLimit: 10240,

  /**
   * 需要前置在head里的js代码
   */
  preCommon: [
    "./src/_common/rem.js",
    "./src/_common/object.assign.js"
  ],

  /**
   * 其他需要在页面主js之前加载的公共代码
   */
  postCommon: [],

  /**
   * 页面js和css在不同环境下的的CDN路径(不包含文件名/index.js)
   */
  cdn: {
    daily: function(projectName, version, pageName){
      return '';
    },
    product: function(projectName, version, pageName){
      return '';
    }
  }
};
