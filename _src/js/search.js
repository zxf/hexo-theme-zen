$(function(){
  $("#search").submit(function(){
    var $h = $(this).find("input[type=hidden]:not([name=site])");
    var $s = $(this).find("input[name=site]");
    var $i = $(this).find("input[type=text]");
    $h.val($s.val() + " " + $i.val());
  });
});