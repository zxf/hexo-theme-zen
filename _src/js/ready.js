$(function(){
  $(document).pjax('[data-pjax] a, a[data-pjax]', '#container', {
    fragment:'#container',
    timeout: 2000
  });

  $("#search").submit(function(){
    var $h = $(this).find("input[type=hidden]:not([name=site])");
    var $s = $(this).find("input[name=site]");
    var $i = $(this).find("input[type=text]");
    $h.val($s.val() + " " + $i.val());
  });
});
