/*
* Zen template header controller
* Dependencies: jquery
*/
zen.calendar = (function(zen){
  var i18n = {};
  var ggettext = function(language){
    var l = i18n[language] || {};
    return function(text){
      return text in l ? text[l] : l;
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
    var date;
    /*
    * solar terms
    * 0~23
    */
    this.getSolarTerm = function(){

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
      return gettext(solarMonths[this.getMonth()]);
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
      var opts = options["seasonOptions"][season] || defaultOption;
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

  return {
    i18n: function(language, translations){
      i18n[language] = $.extend(i18n[language], translations);
    }
  };
})(zen);

zen.calendar.i18n("zh-CN", {
  ""
});