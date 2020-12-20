$(document).ready(function(e) {
  -function(){
    var hLen = $('.eachLine').length;
    for(var i = 0; i < hLen; i++){
      var iLen = $('.eachLine').eq(i).find('.zcdCard').length;
      for(var j=0;j<iLen;j++){
        var liLen = $('.eachLine').eq(i).find('.zcdCard').eq(j).find('.zcdUl').height();
        if(liLen>180){
          $('.eachLine').eq(i).find('.zcdCard').eq(j).children('.zcdFooter').show();
        } else {
          $('.eachLine').eq(i).find('.zcdCard').eq(j).children('.zcdFooter').hide();
        }
      }
    }
  }()
  $('.zcdFooter span').click(function() {
    var wh = $(document).height(),//是文档窗口高度
        ot = $(this).offset().top;
    var bh = wh - ot;
    var className = $(this).attr('class');
    if(className == 'clickOpen'){
      $('.eachLine').find('.zcdCard').removeClass('zk_zcdCard');
      $('.eachLine').find('.zcdCard').height('260px');
      $('.eachLine').find('.zcdCard').find('.zcdBody').height('180px');
      $('.eachLine').find('span').removeClass('clickClose').addClass('clickOpen');
      $('.eachLine').find('.zcdCard').css('marginBottom', 10);
      $(this).parents('.zcdCard').height('auto');
      $(this).parents('.zcdCard').find('.zcdBody').height('auto');
      $(this).removeClass('clickOpen').addClass('clickClose');
      $(this).parents('.zcdCard').addClass('zk_zcdCard');
      if(bh<280){
        var marginBottom = 10;
      } else {
        if($(this).parents('.zcdCard').height()>400){
          var marginBottom = 10;
        } else {
          var marginBottom = -($(this).parents('.zcdCard').height()-270);
        }
      }
      $(this).parents('.zk_zcdCard').css('marginBottom', marginBottom);
    } else if(className == 'clickClose'){
      $(this).parents('.zcdCard').removeClass('zk_zcdCard');
      $(this).parents('.zcdCard').height('260px');
      $(this).parents('.zcdCard').find('.zcdBody').height('180px');
      $(this).removeClass('clickClose').addClass('clickOpen');
      $(this).parents('.zcdCard').css('marginBottom', 10);
    }
  })
});