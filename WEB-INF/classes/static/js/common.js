// 距离明年还有多少天
function getDay(argument) {
	var nowDay = new Date();
	var str = (nowDay.getFullYear()+1) + '-01-01';
	var nextYear = new Date(str);
	var date=nextYear.getTime()-nowDay.getTime();
　　var days=Math.floor(date/(24*3600*1000));
	return days;
}

// 首页所有需要时间差的
function getDayCha(date) {
	var nowDay = new Date();
	var cha=nowDay.getTime()-date;
　var days=cha/(24*3600*1000);
  if(days < 1){
    var h = cha/(1000*3600);
    if(h < 1){
      var m = cha/(1000*60);
      if(m < 1){
        var s = cha/1000;
        return Math.floor(s) + '秒前';
      } else {
        return Math.floor(m) + '分钟前';
      }
    } else {
      return Math.floor(h) + '小时前';
    }
  } else {
    return Math.floor(days) + '天前';
  }
}


// 根据状态显示不同标签
function getBg(type){
	if(type == 'approve'){
		return '审'
	} else if(type == 'consult'){
		return '咨'
	} else if(type == 'notice'){
		return '知'
	}
}
function getClass(type){
	if(type == 'approve'){
		return 'label-primary'
	} else if(type == 'consult'){
		return 'label-success'
	} else if(type == 'notice'){
		return 'label-info'
	}
}
function getBqTitle(type){
	if(type == 'approve'){
		return '审批'
	} else if(type == 'consult'){
		return '咨询'
	} else if(type == 'notice'){
		return '通知'
	}
}
function getTaskSubTitle(v){
  if(v){
    return 'taskSubTitle';
  } else {
    return 'taskSubTitleNone';
  }
}

// 获取长度
function getLen(len){
	if(len<7){
		return len;
	} else {
		return 6;
	}
}

// 截取时间字符串
function strDate(date, type){
	if(!date){
		// alert('错误');
	} else if(!type){
		var str = date.substr(0, 10);
		return str;
	}
}

// 通知公告填充
function appendFn(len, arr, $Div, tzGGUrl){
	for(var i=0; i<len; i++){
      var $a = '<a href="'+tzGGUrl+arr[i].documentId+'" target="_blank" class="list-group-item">'+
          '<span class="badge noBack">'+strDate(arr[i].documentReleaseDateStr)+'</span>'+
          '<span class="bqStyle '+ifShow(arr[i].documentTop)+' label " title="置顶">顶</span>'+
          // '<span class="bqStyle '++' label " title="未读">未</span>'+
          '<p class="overSis p-r-10 m-0 '+ifBig(arr[i].readNum)+'" title="'+arr[i].documentTitle+'">'+arr[i].documentTitle+'</p>'+
        '</a>';
      $Div.find('.list-group').append($a);
    }
}
// 最新热门填充
function appendHot(len, arr, $Div, askUrl){
	for(var i=0; i<len; i++){
        var $a = '<a href="'+askUrl+arr[i].questionCode+'" target="_blank" class="list-group-item">'+
            '<span class="badge noBack">'+getDayCha(arr[i].createdDate)+'</span>'+
            '<p class="overSis p-r-10 m-0" title="'+arr[i].questionTitle+'">'+arr[i].questionTitle+'</p>'+
          '</a>';
        $Div.find('.list-group').append($a);
    }
}
// 是否未读
function ifBig(type){
	if(type == '0'){
		return 'showLabel2'
	} else {
		return 'showLabel1';
	}
}
// 是否置顶
function ifShow(type){
	if(type == 'Y'){
		return 'showLabel'
	} else {
		return 'showLabelD';
	}
}


// 1.0渲染
function append1_0(len, arr, $Div, $tab){
    for(var i=0; i<len; i++){
	    if(arr[i].type == 'TOTAL'){
        if(arr[i].content == 0){
          $tab.find('.badgeMain').hide();
        } else {
          if(arr[i].content>99){
            $tab.find('.badgeMain').show().text(99);
          } else {
            $tab.find('.badgeMain').show().text(arr[i].content);
          }
        }
	      
	    } else {
	      if (i>5) {
	        return false;
	      } else {
	        var $a = '<a href="'+arr[i].href+'" target="_blank" class="list-group-item">'+
	        '<span class="badge noBack">'+arr[i].date+'</span>'+
	        '<p class="overSis p-r-10 m-0" title="'+arr[i].title+'">'+arr[i].title+'</p>'+
	        '</a>';
	        $Div.find('.list-group').append($a);
	      }
	      
	    }
	}
}


function menuIconList(type, bjBody){
    var obj = {
        url: 'menuIconList',
        data: '',
        success: function(res){
          console.log(res);
          if(res.returnCode == 0){
            var ygl = [], wgl = [];
            bjBody.empty();
            for (var i = 0; i < res.data.length; i++) {
              if(res.data[i].isRelation == 'Y'){
                ygl.push(res.data[i]);
                if(res.data[i].iconName == 'MBS'){
                  var url = res.data[i].iconLink + '?token=' + sessionStorage.getItem('mbsToken');
                } else {
                  var url = res.data[i].iconLink;
                }
                var dl = '<dl class="col-md-3" title="'+res.data[i].iconName+'">'+
                          '<a href="'+url+'" target="_blank">'+
                          '<img src="../'+res.data[i].iconImges+'">'+
                          '<dd class="overTwoSis" style="margin-top: 8px;">'+res.data[i].iconName+'</dd>'+
                          '</a>'+
                        '</dl>';
                bjBody.append(dl);
              } else {
                wgl.push(res.data[i]);
              }
            }
            if(type == 'click'){
              if(ygl){
                var a = JSON.stringify(ygl);
              } else{
                var a = '';
              }
              if(wgl){
                var b = JSON.stringify(wgl);
              } else{
                var b = '';
              }
              window.parent.showpopup(a, b);
            }
          } else {
            lightyear.notify(res.message, 'danger', 2000);
          }
        }
      }
      ajaxObj(obj, 'GET');
  }

var qxArr = sessionStorage.getItem('qx').toString().split(',');
function qxYz(qx, arr){
  if(arr){
    var qxArr1 = arr;
  } else {
    var qxArr1 = qxArr;
  };
  var isHas = $.inArray(qx, qxArr1);
	if(isHas == -1){
		return false;
	} else {
		return true;
	}
}


// 子菜单渲染
function xrCard(arr, $eachLine) {
    if(arr.length>0){
      for(var i=0;i<arr.length; i++){
        var divBig = $('<div class="col-sm-6 col-md-3"></div>');
        var divCard = $('<div class="card zcdCard"></div>');
        var divCardHeader = $('<div class="card-header zcdHeader"></div>');
        var divCardBody = $('<div class="card-body p-0 zcdBody"></div>');
        var divCardFooter = $('<div class="card-footer p-0 zcdFooter"></div>');
        var bqI = $('<i class="btIcon"></i>');
        var h6 = $('<h6></h6>');
        var zcdUl = $('<ul class="zcdUl"></ul>');
        var bqSpan = $('<span class="clickOpen">》</span>');
        h6.text(arr[i].ht);
        divCardHeader.append(bqI);
        divCardHeader.append(h6);
        divCardFooter.append(bqSpan);
        if(arr[i].children.length>0){
          for(var j=0;j<arr[i].children.length; j++){
            var $li = $('<li></li>');
            var $a = $('<a target="_blank"></a>');
            var $i = $('<i></i>');
            var $p = $('<p></p>');
            $p.text(arr[i].children[j].name);
            $a.append($i).append($p);
            if(arr[i].children[j].secondTitle){
            	$li.addClass('secondTitle');
            	$a.attr('href', 'javascript:void(0)').attr('target', '');
            } else {
            	if(arr[i].children[j].qxV){
                if(arr[i].children[j].qxV == 'zbcl'){
                  var a = 0;
                  var zbcl = [
                    'aph2_tender_ZBWJSD-QX-M10',
                    'aph2_tender_ZBSD-QX-M10',
                    'aph2_tender_ZHPGBG-QX-M10',
                    'aph2_tender_FCZBWJ-QX-M10',
                    'aph2_tender_ZBWJDY-QX-M10',
                    'aph2_tender_ZTBHB-QX-M10',
                    'aph2_tender_BZJJNQR-QX-M10',
                    'aph2_tender_PSWB-QX-M10',
                    'aph2_tender_KSWB-QX-M10',
                    'aph2_tender_PJSB-QX-M10',
                    'aph2_tender_KJSB-QX-M10',
                    'aph2_tender_ZBHXRSD-QX-M10',
                  ];
                  for(var k = 0; k<zbcl.length; k++){
                    if(qxYz(zbcl[k]) != -1){
                      a++;
                    }
                  }
                  if(a> 0){
                    var isTo = true;
                  } else {
                    var isTo = false;
                  }
                } else {
                  var isTo = qxYz(arr[i].children[j].qxV);
                }
	              if(!isTo){
	                $li.addClass('notQx');
	                $a.attr('href', 'javascript:void(0)').attr('target', '');
	              } else {
	                $a.attr('href', arr[i].children[j].url);
	              }
	            } else {
	              $a.attr('href', arr[i].children[j].url);
	            }
            }
            
            $li.append($a);
            zcdUl.append($li);
          }
        }
        divCardBody.append(zcdUl);
        divCard.append(divCardHeader);
        divCard.append(divCardBody);
          divCard.append(divCardFooter);
        divBig.append(divCard);
        $eachLine.append(divBig);
      }
    }
  }