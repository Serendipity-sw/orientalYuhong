/**
 * Created by gloomysw on 2016/07/06.
 */

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
    $.layer({title:"考勤明细",url:"attendanceDetails.html"});
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
$(document).on("click", ".layer .content>.selectWhere>.addBtn", function () {

    $.fromLayer({
        title: '新增劳务考勤',
        list: [
            { name: "时间", Attributes: "startTime", class: "datetimepicker", value: "" },
            { name: "施工队", Attributes: "title" },
             { name: "出勤数", Attributes: "number" }
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

    $("body>.centerArea>.processArea").find(".progressRows").removeClass("select");
    $(this).parent().addClass("select");

    $("body").append(mark);
    $("body>.processArea").slideToggle("slow");
    $('.dateTime').datetimepicker({
        lang: "ch",           //语言选择中文
        format: "Y-m-d",      //格式化日期
    });
});

/**
 * 进度条弹框关闭按钮
 * 创建人:邵炜
 * 创建时间:2016年7月17日22:55:00
 */
$("body >.processArea>.top>.closeBtn").click(function(){
    $("body>.processArea").slideToggle("slow", function () {
        // $(this).closest(".progressRows").removeClass("select");
        mark.remove();

    });
});

/**
 * 左侧区域显示隐藏事件
 * 创建人:邵炜
 * 创建时间:2016年7月21日21:50:48
 */
$(document).on("click",".goBack",function(){
    $("body>.leftArea").toggle("slow",function(){
        $("body>.centerArea").animate({paddingLeft:$(this).is(":hidden")?"0":"218px"});
    });
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
$("body>.rightArea>div>div>.headTop>.userName").click(function () {
    $(".peopleSelect").toggle();
});