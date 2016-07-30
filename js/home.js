/**
 * Created by gloomysw on 2016/07/06.
 */
//右侧弹出框zindex初始化值，点击添加。达到每次点击都会盖在上面一层。
var leftAreaPopupZindex = 100;
function setLeftAreaPopoupZindex(_this) {

    $(_this).css("z-index", leftAreaPopupZindex);
    leftAreaPopupZindex++;
}
/**
 * 左部搜索区域点击选中事件  冒泡事件
 * 创建人:邵炜
 * 创建时间:2016年7月6日22:06:44
 */
$(document).on("click",".projectList > .rows",function(){
   var selectClick=$(this);
    selectClick.parent().find("li").removeClass("select");
    selectClick.addClass("select");
});

/**
 * 项目信息与现场图片切换事件
 * 创建人:邵炜
 * 创建时间:2016年7月6日23:01:00
 */
$(".projectInfoSwitch> span").click(function(){
    var selectClick=$(this);
    selectClick.parent().find("span").removeClass("select");
    selectClick.addClass("select");

    $(".centerArea>[data-src]").hide();
    $('.centerArea>[data-src="'+selectClick.attr("data-src")+'"]').show();
});

/**
 * 中间区域 底部列表显示隐藏事件
 * 创建人:邵炜
 * 创建时间:2016年7月6日23:17:38
 */
$(".centerArea  .foldExpansion").click(function(){
    var clickThis=$(this);
    if (clickThis.is(".select")) {
        clickThis.removeClass("select");
    }else{
        clickThis.addClass("select");
    }
    clickThis.parent().parent().nextAll().toggle();
});

/**
 * 右部区域显示隐藏事件
 * 创建人:邵炜
 * 创建时间:2016年7月6日23:20:43
 */
$(".rightArea .foldExpansion").click(function(){
    var clickThis=$(this);
    if (clickThis.is(".select")) {
        clickThis.removeClass("select");
    }else{
        clickThis.addClass("select");
    }
    clickThis.parent().nextAll().toggle();
});

/**
 * 中间区域进度条展开关闭事件
 * 创建人:邵炜
 * 创建时间:2016年7月8日09:54:21
 */
$(".moreDown").click(function () {
    $(".progressRows:gt(4)").toggle();

    if ($(this).hasClass("progressDown")) {
        $(this).removeClass("progressDown");
        $(this).addClass("progressUp");
    }
    else {
        $(this).removeClass("progressUp");
        $(this).addClass("progressDown");
    }
    
});

/**
 * 考勤按钮点击事件
 * 创建人:邵炜
 * 创建时间:2016年7月12日21:35:40
 */
$(".checkAttendance").click(function(){
    $.layer({title:"劳务考勤",url:"laborAttendance.html"});
});

/**
 * 考勤明细按钮点击事件
 * 创建人:邵炜
 * 创建时间:2016年7月12日21:38:35
 */
$(".attendanceDetails").click(function(){
    $.layer({title:"考勤明细",url:"attendanceDetailsPopup.html"});
});

/**
 * 分页控件脚本事件
 * 创建人:邵炜
 * 创建时间:2016年7月14日21:06:29
 */
$('.M-box1').pagination({
    totalData:100,
    showData:5,
    coping:true
});

/**
 * 进度条前面选项点击事件
 * 创建人:邵炜
 * 创建时间:2016年7月14日21:06:29
 */
$('.processArea [data-src]:not(ul)').click(function(){
    var titleClick = $(this);
    $('.processArea ul[data-src]:not([data-src="'+titleClick.attr("data-src")+'"])').hide();
    $('.processArea ul[data-src="'+titleClick.attr("data-src")+'"]').toggle();
});

/**
 * 进度条下拉框点击事件
 * 创建人:邵炜
 * 创建时间:2016年7月14日21:06:29
 */
$(".processArea ul[data-src] li").click(function(){
    var clickThis=$(this);
    clickThis.parent().hide().prev().html(clickThis.html());
});

/**
 * 项目基本信息进度状态点击事件
 * 创建人:邵炜
 * 创建时间:2016年7月14日21:06:29
 */
$(".startState>.state").click(function(){
    $(".showDilog").toggle();
});

/**
 * 项目基本信息状态弹框选择事件
 */
$(".showDilog > li").click(function(){
    $(".startState>.state").html(this.innerHTML);
    $(".showDilog").toggle();
});

/**
 * 新增或编辑按钮事件
 * 创建人:邵炜
 * 创建时间:2016年7月14日22:40:52
 */

/*
    标准化施工流程  点击弹出框事件
*/
$(document).on("click", "body>.centerArea>.sitePhoto>.flowChartArea>.photoStep>.rows", function () {
    $.fromLayer({
        title: '标准化施工流程-合同确认',
        position:"right",
        list: [{ name: "开始日期", Attributes: "startTime", class: "datetimepicker", value: "" }, { name: "完成日期", class: "datetimepicker", Attributes: "endTime" }],
        saveCallBack: function (obj, closeFunc) {
            $.each(obj, function (index, value) {
                alert(index + ":" + value);
                closeFunc();
            });
        },
        cancelCallBack: function (closeFunc) {
            alert("关闭按钮!");
            closeFunc();
        },
        loadCallBack: function (closeFunc) {
            $('.datetimepicker').datetimepicker({
                lang: "ch",           //语言选择中文
                format: "Y-m-d",      //格式化日期
            });
        }
    });
});

/*
新增考勤
*/
$(document).on("click", ".laborAttendance  .selectWhereRows>.selectBtn>.add", function () {

    $.fromLayer({
        title: '新增劳务考勤',
        list: [
            { name: "时间", Attributes: "startTime", class: "datetimepicker", value: "" },
            { name: "施工队", Attributes: "title" },
            { name: "出勤数", Attributes: "number" }
        ],
        saveCallBack: function (obj, closeFunc) {

            $("input[name='title']").after("<span class='success'>验证通过！</span>");
            $("input[name='startTime']").after("<span class='error'>不能为空！</span>");

            $.each(obj, function (index, value) {
                alert(index + ":" + value);
                //closeFunc();
            });
        },
        cancelCallBack: function (closeFunc) {
            alert("关闭按钮!");
            closeFunc();
        },
        loadCallBack: function (closeFunc) {
            $('.datetimepicker').datetimepicker({
                lang: "ch",           //语言选择中文
                format: "Y-m-d",      //格式化日期
            });
        }
    });
});
/**
 * 进度条弹框事件
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:49:24
 */
$(document).on("click", "body>.centerArea>.processArea>.progressRows>.processArea", function () {
    //当前部位 赋值
    var parent = $(this).closest('.progressRows').find('a').first().html();
    $(".processSelectTitle").html(parent);

    //进度条添加选中样式
    $("body>.centerArea>.processArea").find(".progressRows").removeClass("select");
    $(this).parent().addClass("select");

//    $("body").append(mark);
    var  processAreaOb=$("body>.processArea");
    rightAreaCommonShow(processAreaOb);
});

/**
 * 进度条弹框关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body >.processArea>.top>.closeBtn").click(function(){
    var processAreaOb = $("body>.processArea");
    rightAreaCommonHide(processAreaOb);
});



$(function(){
    /**
     * 进度条效果
     * 创建人:邵炜
     * 创建时间:2016年7月21日23:04:36
     */
    setTimeout(function(){
        $(".progressBar,body>.centerArea>.processArea>.progressRows>.processArea>.number").animate({
            width:"90%"
        },2000);
    },1000);
});

/*
2016-07-27
城市下拉框切换
*/
$("body>.centerArea>.head>.right>.mapTitle").click(function () {
    $(".citySelect").toggle();
});
/*
2016-07-27
用户下拉框切换
*/
$("body>.rightArea .headTop>.userName").click(function () {
    $(".peopleSelect").toggle();
});

/**
 * 项目资料 点击打开弹出框
 */
$(".rightArea  .projectRecords").click(function () {
    $.layer({ title: "项目资料", url: "projectInfoPopup.html" });
});

/**
* 项目资料  新增按钮事件
*/
$(document).on("click", ".projectInfoPopup  .selectWhereRows>.selectBtn>.add", function () {
    $.fromLayer({
        title: '新增',
        list: [
            { name: "资料名称", Attributes: "fileName", value: "" },
            { name: "文件类型", Attributes: "fileType", type:"select", selectOption: [{ "text": "视频", "value": "0" }, { "text": "图片", "value": "1" }] },
            { name: "文件大小", Attributes: "size" },
            { name: "创建时间", Attributes: "time", class: "projectRecordsDatetimepicker" }
        ],
        saveCallBack: function (obj, closeFunc) {
            $.each(obj, function (index, value) {
                alert(index + ":" + value);
                closeFunc();
            });
        },
        cancelCallBack: function (closeFunc) {
            alert("关闭按钮!");
            closeFunc();
        },
        loadCallBack: function (closeFunc) {
            $('.projectRecordsDatetimepicker').datetimepicker({
                lang: "ch",           //语言选择中文
                format:"Y-m-d",      //格式化日期
                timepicker:false,     //关闭时间选项
                todayButton:false    //关闭选择今天按钮
            });
        }
    });


});

/**
 * 扣分记录 点击打开弹出框
 */
$(".rightArea  .markingRecords").click(function () {
    $.layer({ title: "扣分记录", url: "markingRecordsPopup.html" });
});

/* 编辑项目图片文本*/
$("body > .centerArea > .projectContent .contentArea .contentAreaEdit input").click(function () {
    $.layer({ title: "编辑项目图片文本", url: "contentAreaEditPopup.html" });
});

//图片插件
$(document).ready(function () {
    $('.centerArea>.projectContent>.rows>.content>.photo').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });
});

//左侧菜单按钮显示
function leftAreaToggleIconOpen() {
    $("body > .centerArea > .head > .left > .leftAreaToggleIcon").show();
}
//左侧菜单按钮隐藏
function leftAreaToggleIconClose() {
    $("body > .centerArea > .head > .left > .leftAreaToggleIcon").hide();
}



/**
 * 项目物料弹框事件
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body>.centerArea>.projectInfo .table4_2 .btn-green", function () {
  
    var processAreaOb = $("body>.projectMaterialsRightArea");
    rightAreaCommonShow(processAreaOb);
});
/**
 * 项目物料弹框事件
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body > .rightArea  .rightArea1>.headTop > .shoppingCart", function () {

    var processAreaOb = $("body>.projectMaterialsRightArea");
    rightAreaCommonShow(processAreaOb);
});
/**
 * 项目物料弹框关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body>.projectMaterialsRightArea .closeBtn").click(function () {
    var processAreaOb = $("body>.projectMaterialsRightArea");
    rightAreaCommonHide(processAreaOb);
});


/**
物料申请  数量减
*/
$(".numberOperating .numberOperatingMinus").click(function () {
    var _input = $(this).closest(".numberOperating").find("input");
    var v = _input.val();
    if(v >1)
    {
        v--;
        _input.val(v);
    }
});
/**
物料申请  数量加
*/
$(".numberOperating .numberOperatingPlus").click(function () {
    var _input = $(this).closest(".numberOperating").find("input");
    var v = _input.val();
    v++;
    _input.val(v);
    
});
/**
物料申请  全选
*/
$(".R-Table .checkboxAll").click(function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).closest("table").find("input[type=checkbox]").prop("checked", false);
    }
    else {
        $(this).addClass("active");
        $(this).closest("table").find("input[type=checkbox]").prop("checked", true);
    }
});



/**
 * 项目物料 已申请 右侧弹出框
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body>.rightArea .projectMaterial .selectArea .alreadyApplied", function () {
    var processAreaOb = $("body>.alreadyAppliedRightArea");
    rightAreaCommonShow(processAreaOb);
});

/**
 *项目物料 已申请 右侧弹出框 关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body>.alreadyAppliedRightArea .closeBtn").click(function () {
    var processAreaOb = $("body>.alreadyAppliedRightArea");
    rightAreaCommonHide(processAreaOb);
});

/**
 * 项目物料 待收货 右侧弹出框
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body>.rightArea .projectMaterial .selectArea .inbound", function () {
    var processAreaOb = $("body>.inboundRightArea");
    rightAreaCommonShow(processAreaOb);
});

/**
 *项目物料 待收货 右侧弹出框 关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body>.inboundRightArea .closeBtn").click(function () {
    var processAreaOb = $("body>.inboundRightArea");
    rightAreaCommonHide(processAreaOb);
});

/**
 * 项目物料 收货变更 右侧弹出框
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body>.rightArea .projectMaterial .selectArea .updateReceipt", function () {
    var processAreaOb = $("body>.updateReceiptRightArea");
    rightAreaCommonShow(processAreaOb);
});

/**
 *项目物料 收货变更 右侧弹出框 关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body>.updateReceiptRightArea .closeBtn").click(function () {
    var processAreaOb = $("body>.updateReceiptRightArea");
    rightAreaCommonHide(processAreaOb);
});


/**
 * 项目物料 待消耗 右侧弹出框
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body>.rightArea .projectMaterial .selectArea .beConsumed", function () {
    var processAreaOb = $("body>.beConsumedRightArea");
    rightAreaCommonShow(processAreaOb);
});

/**
 *项目物料 待消耗 右侧弹出框 关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body>.beConsumedRightArea .closeBtn").click(function () {
    var processAreaOb = $("body>.beConsumedRightArea");
    rightAreaCommonHide(processAreaOb);
});

/**
 * 项目物料 已消耗 右侧弹出框
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body>.rightArea .projectMaterial .selectArea .consumed", function () {
    var processAreaOb = $("body>.consumedRightArea");
    rightAreaCommonShow(processAreaOb);
});

/**
 *项目物料 已消耗 右侧弹出框 关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body>.consumedRightArea .closeBtn").click(function () {
    var processAreaOb = $("body>.consumedRightArea");
    rightAreaCommonHide(processAreaOb);
});

/**
 * 项目物料 收货人管理 右侧弹出框
 * 创建人:徐建华
 * 创建时间:2016年7月30日22:49:24
 */
$(document).on("click", "body>.rightArea .projectMaterial .selectArea .manReceiver", function () {
    var processAreaOb = $("body>.manReceiverRightArea");
    rightAreaCommonShow(processAreaOb);
});

/**
 *项目物料 收货人管理 右侧弹出框 关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body>.manReceiverRightArea .closeBtn").click(function () {
    var processAreaOb = $("body>.manReceiverRightArea");
    rightAreaCommonHide(processAreaOb);
});
/**
 * 左侧区域显示事件
 */
$(document).on("click", ".leftAreaToggleIcon", function () {
    //var processAreaOb = $("body>.processArea");
    //var projectMaterialsRightAreaOb = $("body>.projectMaterialsRightArea");
    $("body>.rightAreaCommonToggle").each(function () {
        $(this).animate({ right: "-393px" });
    });
    
    var centerArea = $("body>.centerArea");
    var rightArea = $("body>.rightArea");
    var leftArea = $("body>.leftArea");
    //processAreaOb.animate({ right: "-393px" });
    //projectMaterialsRightAreaOb.animate({ right: "-393px" });

    centerArea.animate({ paddingRight: "301px", paddingLeft: "225px" });
    rightArea.animate({ width: "301px" });
    leftArea.animate({ left: "0" });

    leftAreaToggleIconClose();

});

/*
右侧区域显示公共方法
*/
function rightAreaCommonShow(_this) {
   
    var processAreaOb = _this;
    var centerArea = $("body>.centerArea");
    var rightArea = $("body>.rightArea");
    var leftArea = $("body>.leftArea");
    if (processAreaOb.css("right") == "-393px") {

        processAreaOb.animate({ right: "0" });
        //设置z-index
        setLeftAreaPopoupZindex(processAreaOb);

        centerArea.animate({ paddingRight: "393px", paddingLeft: "0" });
        rightArea.animate({ width: "403px" });
        leftArea.animate({ left: "-224px" });

    } else {
        //设置z-index
        setLeftAreaPopoupZindex(processAreaOb);

        /*
        processAreaOb.animate({right:"-393px"});
        centerArea.animate({paddingRight:"301px",paddingLeft:"225px"});
        rightArea.animate({width:"301px"});
        leftArea.animate({left:"0"});
         */
    }

    leftAreaToggleIconOpen();
}
/*
右侧区域隐藏公共方法
*/
function rightAreaCommonHide(_this) {
    var processAreaOb = _this;
    var centerArea = $("body>.centerArea");
    var rightArea = $("body>.rightArea");
    if (processAreaOb.css("right") == "-393px") {
        processAreaOb.animate({ right: "0" });
        // centerArea.animate({paddingRight:"393px"});
        //rightArea.animate({width:"403px"});
    } else {
        processAreaOb.animate({ right: "-393px" });
        // centerArea.animate({paddingRight:"301px"});
        //rightArea.animate({width:"301px"});
    }
}