$(function(){
  $(document).pjax('a[data-pjax]', '#container', {
    fragment:'#container',
    timeout: 2000
  });
});
