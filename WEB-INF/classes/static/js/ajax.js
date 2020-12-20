// 开发
var url1_0 = 'http://192.168.5.18/';
// var pathHeader = 'https://dev';
var pathHeader = 'https://';


var basePath = pathHeader + 'oa.firstcare.com.cn/';
var tzGGUrl = pathHeader + 'oa.firstcare.com.cn:443/news/getDetailedNewsSystemList.action?newsSystemCO.newsId=';
var meetingUrl = pathHeader + 'oa.firstcare.com.cn:443/meeting/getDetailedMeetingList.action?oaMeetingCo.meetingId=';
var askUrl = pathHeader + 'oa.firstcare.com.cn/quora/getAnswerListByQuestionCode.action?questionCode=';
var approveUrl = pathHeader + 'approve.firstcare.com.cn/';
var defaultUrl = pathHeader + 'aph.firstcare.com.cn/';
var loginUrl = pathHeader + 'sso.firstcare.com.cn/login?redirect_url='+pathHeader+'aph.firstcare.com.cn/';
var loginOutUrl = pathHeader + 'sso.firstcare.com.cn/logout?redirect_url='+pathHeader+'aph.firstcare.com.cn';


// var loginUrl = pathHeader + 'sso.firstcare.com.cn/login?redirect_url=http://10.200.19.71';
// var loginOutUrl = pathHeader + 'sso.firstcare.com.cn/logout?redirect_url=http://10.200.19.71';

// 运营管理中心 基础信息管理跳转链接
var masterdataUrl = pathHeader + 'masterdata.firstcare.com.cn/';
// 运营管理中心 crm跳转链接
var crmUrl = pathHeader + 'crm.firstcare.com.cn';
// 运营管理中心 审定跳转链接
var approveUrl = pathHeader + 'approve.firstcare.com.cn/';
// 运营管理中心 审定跳转链接
var oa443 = pathHeader + 'oa.firstcare.com.cn:443/';
// 招投标链接
var tenderUrl = pathHeader+'tender.firstcare.com.cn/';
// 第一物业跳转地址
var chargeUrl = pathHeader + 'charge.firstcare.com.cn/';
// 职员宝
var baoUrl=pathHeader+'bao.firstcare.com.cn';
//人力资源
var hrUrl=pathHeader+"hr.firstcare.com.cn/";
var hrUrl1=url1_0+"mg";
// 出纳管理
var fundUrl=pathHeader+"fund.firstcare.com.cn/"
// 数据填报
var budgetUrl =pathHeader+"budget.firstcare.com.cn/";
// 中台应对
var transferUrl=pathHeader+"tf.firstcare.com.cn/";
// 报销还款
var financemanageU=pathHeader+"fm.firstcare.com.cn/";
// 付款合同
var contractUrl= pathHeader+"contract.firstcare.com.cn/";
// 头像地址
var txUrl = pathHeader + 'hr.firstcare.com.cn/upload/staffHead/';
// 第九专业
var  major=  "https://mbs2.modernland.hk/mbslite_view/apps/banner/index.html";
// 决策凭台
var jt = 'https://finereport.firstcare.com.cn';


function loginIf(realName, imgUrl, imgP) {
	var url = window.location.href;
	var ssoIndex = url.indexOf('sso_sessionid=');
	if(ssoIndex == -1){
		window.location.href = loginUrl;
	} else {
		var sso_sessionid = url.substr(ssoIndex+14);
		sessionStorage.setItem('sso_sessionid', sso_sessionid);
		$.ajax({ 
			url: api.userInfo + sso_sessionid,
			dataType: "json",
			async: false, //true:异步,false:同步 
			type: 'GET',
			contentType: "application/json;charset=UTF-8",
			timeout:10*1000,  //请求时间 
			success: function(res){
				if(res.returnCode == 0){
					realName.html(res.data.realName + '&nbsp;');
					realName.attr('name', res.data.username);
					realName.attr('departmentName', res.data.departmentName);
					if(res.data.shPicture){
						if(res.data.shPicture.indexOf('http') == -1){
							imgUrl.attr('src', txUrl + res.data.shPicture);
						} else {
							imgUrl.attr('src', res.data.shPicture);
						}
						
					} else {
						imgUrl.css('display', 'none');
						imgP.css('display', 'inline-block');
						imgP.text(res.data.realName.substr(0, 1));
					}
					var a = res.data.permissionList;
					var qx = a.join();
					sessionStorage.setItem('qx', qx);
				}
			}, //请求成功
			error: function(xhr,status,error) {
				console.log(xhr,status,error);
			}
		});
	}
	
}
function loginOut() {
	sessionStorage.removeItem('sso_sessionid');
	sessionStorage.removeItem('qx');
	sessionStorage.removeItem('mbsToken');
	sessionStorage.removeItem('staffId');
	window.location.href = loginOutUrl;
}


// 接口集合
var api = {
	// 查询用户登录信息
	userInfo: defaultUrl+'user/userInfo?sso_sessionid=',
	// 修改头像
	updateHeadPic: defaultUrl+'user/updateHeadPic?sso_sessionid=',
	// 待办，流程，任务统计
	getTNACount: defaultUrl+'user/getTNACount?sso_sessionid=',
	// 考勤信息
	getAttendance: defaultUrl+'user/getAttendance?sso_sessionid=',
	// 绩效信息
	getPerformance: defaultUrl+'user/getPerformance?sso_sessionid=',
	// 个人详细信息
	staffInfo: defaultUrl+'user/staffInfo?sso_sessionid=',
	// 修改密码
	pawEdit: defaultUrl+'user/pawEdit?sso_sessionid=',
	// 获取MBSToken
	mbsToken: defaultUrl+'user/mbsToken?sso_sessionid=',
	// 最新，热门，未解决问答查询
	questionList: defaultUrl+'home/questionList?sso_sessionid=',
	// 通知，决定，会议，公告查询
	documentList: defaultUrl+'home/documentList?sso_sessionid=',
	// 1.0待办任务
	mbsNoticeList: defaultUrl+'home/mbsNoticeList?sso_sessionid=',
	// 1.0待审核查询
	mbsApproveList: defaultUrl+'home/mbsApproveList?sso_sessionid=',
	// 待办任务查询
	noticeList: defaultUrl+'home/noticeList?sso_sessionid=',
	// 待审核文件查询
	approveList: defaultUrl+'home/approveList?sso_sessionid=',
	// 我的工作条数查询
	workNum: defaultUrl+'home/workNum?sso_sessionid=',
	// 便捷导航编辑
	menuIconEdit: defaultUrl+'home/menuIconEdit?sso_sessionid=',
	// 便捷导航查询
	menuIconList: defaultUrl+'home/menuIconList?sso_sessionid=',
	// 邮箱登录地址
	emailLoginUrl: defaultUrl+'home/emailLoginUrl?sso_sessionid=',
	// 邮箱未读消息条数
	emailNum: defaultUrl+'home/emailNum?sso_sessionid=',
	// 获取CrmToken
	getCrmToken: defaultUrl+'user/getCrmToken?sso_sessionid=',
	// 修改通知状态
	updateNoticeStatus: defaultUrl+'home/updateNoticeStatus?sso_sessionid=',
}
// ajax
function ajaxObj(Obj,type, otherCs) {
	if(!type){
		type = 'POST';
	}
	var sso_sessionid = sessionStorage.getItem('sso_sessionid');

	if(!otherCs){
		var cs = sso_sessionid;
	} else {
		var cs = sso_sessionid + otherCs;
	}
	var url = api[Obj.url] + cs;
	if(Obj.data){
		var data = JSON.stringify(Obj.data);
	} else {
		var data = ''
	}
	$.ajax({ 
		url: url,
		dataType: "json",
		async: true, //true:异步,false:同步
		data: data, 
		contentType: "application/json;charset=UTF-8",
		type: type,
		timeout:10*1000,  //请求时间 
		beforeSend: Obj.beforeSend, 
		complete: Obj.complete,
		success: Obj.success, //请求成功
		error: function(xhr,status,error) {
		}
	});
}