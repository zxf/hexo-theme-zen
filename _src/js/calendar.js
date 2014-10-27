/*
* Zen template header controller
* Dependencies: jquery
*/
zen.calendar = (function(zen){
  var i18n = {};
  var solarTerms = {};
  var ggettext = function(language){
    var l = i18n[language] || {};
    return function(text){
      return text in l ? l[text] : text;
    };
  };

  var Timer = function(gettext){
    var solarMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var solarTerms = [
    ];
    var date;
    /*
    * solar terms
    * 0~23
    */
    this.getSolarTerm = function(){
      var y = date.getUTCFullYear(),
          m = date.getUTCMonth(),
          d = date.getUTCDay();
      if(y in solarTerms) {
        if(d < solarTerms[y][2 * m]){
          return m ? 2 * m -1 : 23;
        } else if(d >= solarTerms[y][2 * m + 1]){
          return 2 * m + 1;
        } else {
          return 2 * m;
        }
      } else {
        return 0;
      }
    };
    /*
    * 0:spring
    * 1:summer
    * 2:autumn
    * 3:winter
    */
    this.getSeason = function(){
      return Math.floor(this.getSolarTerm() / 6);
    };
    this.getSolarMonth = function(){
      return gettext(solarMonths[date.getMonth()]);
    };
    this.getLunarMonth = function(){

    };
    this.update = function(){
      date = new Date();
    };
    this.update();
  };

  /*
  * options: {
  *   calendar: solar | lunar,
  *   language: 
  *   imageElem: 
  *   wordElem: 
  *   calendarElem: 
  *   seasonOptions: {},
  *   defaultOption: {}
  *}
  */
  var Calendar = function(options){
    options = $.extend({
      calendar: "lunar",
      language: "en-US",
      seasonOptions: {},
      defaultOption: {}
    }, options);
    var seasons = ["spring", "summer", "autumn", "winter"];
    var gettext = ggettext(options["language"]);
    this.timer = new Timer(gettext);
    this.setSeason = function(){
      var season = seasons[this.timer.getSeason()];
      var opts = options["seasonOptions"][season] || options["defaultOption"];
      if(opts.image) {
        options["imageElem"].attr("src", opts.image);
      }
      if(opts.word) {
        options["wordElem"].text(opts.word);
      }
      if(opts.color) {
        options["wordElem"].css("color", opts.color);
      }
    };

    this.setCalendar = function(){
      if(options.calendar == "solar") {
        options["calendarElem"].text(this.timer.getSolarMonth());
      } else if (options.calendar == "lunar") {
        options["calendarElem"].text(this.timer.getLunarMonth());
      } else {
        throw "Unsupported calendar " + options.calendar;
      }
    };

  };

  var calendar = function(options){
    var c = new Calendar(options);
    c.setSeason();
    c.setCalendar();
  };

  return $.extend(calendar, {
    i18n: function(language, translations){
      i18n[language] = $.extend(i18n[language], translations);
    },
    solarTerms: function(){
      if(arguments.length > 1){
        solarTerms[arguments[0]] = arguments[1];
      } else {
        $.extend(solarTerms, arguments[0]);
      }
    }
  });
})(zen);

zen.calendar.solarTerms({
  
});

zen.calendar.i18n("zh-CN", {
  "Jan": "一月",
  "Feb": "二月",
  "Mar": "三月",
  "Apr": "四月",
  "May": "五月",
  "Jun": "六月",
  "Jul": "七月",
  "Aug": "八月",
  "Sep": "九月",
  "Oct": "十月",
  "Nov": "十一月",
  "Dec": "十二月"
});
