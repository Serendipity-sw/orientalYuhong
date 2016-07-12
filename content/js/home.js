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
    var projectInfo=$(".centerArea>.projectInfo"),
        sitePhotoAndContent=$(".centerArea>.sitePhoto,.centerArea>.projectContent");
    switch (selectClick.index()){
        case 0:
            projectInfo.show();
            sitePhotoAndContent.hide();
            break;
        case 1:
            projectInfo.hide();
            sitePhotoAndContent.show();
            break;
    }
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

$("#demo3").jqPaginator({
    totalPages: 100,
    visiblePages: 10,
    currentPage: 1,
    prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
    next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
    page: '<a href="javascript:void(0);">{{page}}<\/a>',
    onPageChange: function (n) {

    }
});