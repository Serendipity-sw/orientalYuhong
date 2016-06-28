/**
 * Created by wei on 2016/06/28.
 */

/**
 * 统计报表及劳务数据点击展开显示
 * 创建人:邵炜
 * 创建时间:2016年6月28日11:29:36
 */
document.querySelectorAll(".categoryList> .rows").forEach(function(value){
    value.addEventListener("click",function () {
        var rowsListElement=this.nextElementSibling,
            display=rowsListElement.style.display;
        statisticsShowOrHide();
        rowsListElement.style.display=display==="block"?"none":"block";
        document.getElementsByClassName("searchList")[0].style.display="none";
    });
});

/**
 * 页面左部区域搜索按钮事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日12:13:37
 */
document.querySelector(".leftSearchArea .searchBtn").addEventListener("click",function () {
    var postData={};
    document.querySelectorAll(".searchBottom input").forEach(function(value){
       postData[value.getAttribute("name")]=value.value;
    });

    //ajax方法
    // var liHtml="";
    // data.forEach(function (value) {
    //    liHtml+='<li class="rows"> <div class="number"><span class="sortNumber">'+value.Number+'</span></div> <span class="title">'+value.Name+'</span> </li>';
    // });
    // document.querySelector(".searchBottom .searchList").innerHTML=liHtml;
    this.nextElementSibling.style.display="block";
    statisticsShowOrHide();
});

/**
 * 城市名称点击展现详细
 * 创建人:邵炜
 * 创建时间:2016年6月28日15:40:37
 */
document.querySelectorAll(".searchList .rows").forEach(function (value) {
   value.addEventListener("click",function () {
       cityAreaShowOrHide(true);
   });
});

/**
 * 城市信息框关闭事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日16:09:56
 */
document.getElementsByClassName("rightClose")[0].addEventListener("click",function () {
    cityAreaShowOrHide(false);
});

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
document.getElementsByClassName("enterBtn")[0].addEventListener("click",function () {
    alert(1);
});

/**
 * 统计报表及劳务数据隐藏方法
 * 创建人:邵炜
 * 创建时间:2016年6月28日16:42:36
 */
function statisticsShowOrHide() {
    document.querySelectorAll(".categoryList .rowsList").forEach(function (value) {
        value.style.display="none";
    });
}

/**
 * 省份和城市区域文字选中切换事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日17:42:42
 */
document.getElementsByClassName("citySelect")[0].addEventListener("click",function (e) {
    this.querySelectorAll("span").forEach(function (value) {
       value.className="";
    });
    var element=e.target;
    element.className="select";
    citySelectSwitch(element.textContent == "按省份");
});

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
document.getElementsByClassName("closeBtn")[0].addEventListener("click",function () {
    rightCityAreaShowOrHide(false);
});

/**
 * 城市区域显示和隐藏事件
 * 创建人:邵炜
 * 创建时间:2016年6月28日17:47:45
 * @param bo true 显示  false隐藏
 */
function rightCityAreaShowOrHide(bo) {
    document.getElementsByClassName("cityListArea")[0].style.display=bo?"block":"none";
}