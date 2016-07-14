/**
 * Created by wei on 2016/06/28.
 */


/**
 * 统计报表及劳务数据点击展开显示
 * 创建人:邵炜
 * 创建时间:2016年6月28日11:29:36
 */
$(".categoryList> .rows").each(function(index,value){
    value.onclick=function () {
        var rowsListElement=$(this).next()[0],
            display=rowsListElement.style.display;
        statisticsShowOrHide();
        rowsListElement.style.display=display==="block"?"none":"block";
        $(".searchList")[0].style.display="none";
    };
});

/**
 * 页面左部区域搜索按钮事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日12:13:37
 */
$(".leftSearchArea .searchBtn")[0].onclick=function () {
    var postData={};
    $(".searchBottom input").each(function(index,value){
       postData[$(value).attr("name")]=value.value;
    });

    //ajax方法
    // var liHtml="";
    // data.forEach(function (value) {
    //    liHtml+='<li class="rows"> <div class="number"><span class="sortNumber">'+value.Number+'</span></div> <span class="title">'+value.Name+'</span> </li>';
    // });
    // document.querySelector(".searchBottom .searchList").innerHTML=liHtml;
    $(this).next()[0].style.display="block";
    statisticsShowOrHide();
};

/**
 * 城市名称点击展现详细
 * 创建人:邵炜
 * 创建时间:2016年6月28日15:40:37
 */
$(".searchList .rows").each(function (index,value) {
   value.onclick=function () {
       cityAreaShowOrHide(true);
   };
});

/**
 * 城市信息框关闭事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日16:09:56
 */
document.getElementsByClassName("rightClose")[0].onclick=function () {
    cityAreaShowOrHide(false);
};

/**
 * 城市检索区域和城市信息框区域切换
 * 创建人:邵炜
 * 创建时间:2016年6月28日16:11:46
 * @param bo true 城市检索区域切换  false城市信息框关闭
 */
function cityAreaShowOrHide(bo) {
    document.getElementsByClassName("leftSearchArea")[0].style.display=bo?"none":"block";
    document.getElementsByClassName("leftDetail")[0].style.display=bo?"block":"none";
}

/**
 * 进入项目按钮事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日16:16:05
 */
document.getElementsByClassName("enterBtn")[0].onclick=function () {
    alert(1);
};

/**
 * 统计报表及劳务数据隐藏方法
 * 创建人:邵炜
 * 创建时间:2016年6月28日16:42:36
 */
function statisticsShowOrHide() {
    $(".categoryList .rowsList").each(function (index,value) {
        value.style.display="none";
    });
}

/**
 * 省份和城市区域文字选中切换事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日17:42:42
 */
document.getElementsByClassName("citySelect")[0].onclick=function (e) {
    $(this).find("span").each(function (index,value) {
       value.className="";
    });
    var element=e.target;
    element.className="select";
    citySelectSwitch(element.textContent == "按省份");
};

/**
 * 城市切换
 * 创建人:邵炜
 * 创建时间:2016年6月28日17:39:06
 * @param bo true 省份显示, 城市隐藏   false 省份隐藏 城市显示
 */
function citySelectSwitch(bo) {
    document.getElementsByClassName("provinceCityList")[0].style.display=bo?"block":"none";
    document.getElementsByClassName("cityFilterArea")[0].style.display=bo?"none":"block";
}

/**
 * 城市选择地图区域关闭按钮事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日17:50:13
 */
document.getElementsByClassName("closeBtn")[0].onclick=function () {
    rightCityAreaShowOrHide(false);
};

/**
 * 城市区域显示和隐藏事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日17:47:45
 * @param bo true 显示  false隐藏
 */
function rightCityAreaShowOrHide(bo) {
    document.getElementsByClassName("cityListArea")[0].style.display=bo?"block":"none";
}

/**
 * 区域位置点击显示隐藏事件
 * 创建人:邵炜
 * 创建时间:2016年7月11日23:05:45
 */
$("body>.wordDescription>.areaShow").click(function(){
    $("body>.cityListArea").toggle();
});

/**
 * 劳务列表每项点击事件
 */
$(".categoryList .rowsList:eq(1)  span").click(function(){
   location.href="laborManagement.html" ;
});