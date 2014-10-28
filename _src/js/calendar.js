/*
* Zen template header controller
* Dependencies: jquery
*/
zen.calendar = (function(zen){
  var i18n = {},
      solarTerms = {};
  var ggettext = function(language){
    var l = i18n[language] || {};
    return function(text){
      return text in l ? l[text] : text;
    };
  };

  var Dater = function(){
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
      var y = date.getUTCFullYear(),
          m = date.getUTCMonth(),
          d = date.getUTCDate();
      if(y in solarTerms) {
        if(d < (15 - (solarTerms[y][m] >> 4))){
          return m ? 2 * m - 1 : 23;
        } else if(d >= (15 + (solarTerms[y][m] & 0xF))){
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
      var s = this.getSolarTerm() - 5;
      s = s < 0 ? s + 24 : s;
      return Math.floor(s / 6);
    };
    this.getSpecialDay = function(){

    };
    this.getSolarMonth = function(specialDay){
        return solarMonths[date.getMonth()];
    };
    this.getLunarMonth = function(specialDay){

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
  *   specialDayOptions: {},
  *   defaultOption: {}
  *}
  */
  var Calendar = function(options){
    options = $.extend({
      calendar: "lunar",
      language: "en-US",
      seasonOptions: {},
      specialDayOptions: {},
      defaultOption: {}
    }, options);
    var seasons = ["spring", "summer", "autumn", "winter"];
    var gettext = ggettext(options["language"]);
    this.dater = new Dater();
    
    this.getSeason = function(){
      return seasons[this.dater.getSeason()];
    };

    this.getMonth = function() {
      if(options.calendar == "solar") {
        return this.dater.getSolarMonth();
      } else if (options.calendar == "lunar") {
        return this.dater.getLunarMonth();
      } else {
        throw "Unsupported calendar " + options.calendar;
      }
    };

    this.setSeason = function(opts){
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

    this.setCalendar = function(m){
      options["calendarElem"].text(gettext(m));
    };

    this.init = function(){
      var d = this.dater.getSpecialDay(),
          seasonOptions = options["specialDayOptions"][d] || options[this.getSeason()] || options["defaultOption"],
          calendarText = d === false ? this.getMonth() : d;
      this.setSeason(seasonOptions);
      this.setCalendar(calendarText);
    };
  };

  var calendar = function(options){
    var c = new Calendar(options);
    c.init();
  };

  var defineSolarTerms = function(){
    if(arguments.length > 1){
      solarTerms[arguments[0]] = arguments[1];
    } else {
      $.extend(solarTerms, arguments[0]);
    }
  };

  var defineSpecialDay = function(days){
    days.forEach(function(day){

    });
  };

  return $.extend(calendar, {
    i18n: function(language, translations){
      if(typeof translations == "string"){
        i18n[translations] = i18n[translations] || {};
        i18n[language] = i18n[translations];
      } else {
        i18n[language] = $.extend(i18n[language], translations);
      }
    },
    solarTerms: $.extend(defineSolarTerms, {
      compile: function(d1, d2){
        return ((15 - d1) << 4) + (d2 - 15);
      }
    })
  });
})(zen);

