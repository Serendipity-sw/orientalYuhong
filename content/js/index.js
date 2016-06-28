$(function () {
    $('.progress .progress-bar').progressbar({ display_text: 'fill', use_percentage: false });
    $(".yh-prolist>.col-md-12").each(evtOnClickProduct);
    $("#proinfo").click(evtOnChange);
    $("#scenepic").click(evtOnChange);
    $("#expandleft").click(evtOnExpand);
    $("#shrinkleft").click(evtOnShrink);

    // 项目信息
    $("#proinfoshrink").click(evtOnBlockShrink);
    $("#procontractshrink").click(evtOnBlockShrink);
    $("#procostshrink").click(evtOnBlockShrink);
    $("#promoneyshrink").click(evtOnBlockShrink);
    $("#visashrink").click(evtOnBlockShrink);

    // 现场图片
    $("#visashrink").click(sceneflowshrink);

    //右侧
    $("#rightinfoshrink").click(evtOnRightShrink);
    $("#rightmaterialshrink").click(evtOnRightShrink);
    $("#rightcontrollshrink").click(evtOnRightShrink);
    $("#rightdatashrink").click(evtOnRightShrink);
    $("#rightlabourshrink").click(evtOnRightShrink);

});

// 点击左侧项目列表
function evtOnClickProduct(index, ele) {
    $(this).on('click', function () {
        if (!$(this).hasClass("bkred white")) {
            $(this).siblings().removeClass("bkred white").end().addClass("bkred white");
            var img = $(this).children(":first-child").children();
            var src = img.attr("src");
            var str = src.substr(src.lastIndexOf('/') + 1).split(".")[0];
            if (str.indexOf("-") != -1) {
                img.attr("src", "../res/left/" + str.split("-")[0] + ".png");
            } else {
                img.attr("src", "../res/left/" + str + "-selected" + ".png");
            }

            var otherimg = $(this).siblings().children(":first-child").children();
            if (otherimg.length > 0) {
                for (var i = 0; i < otherimg.length; i++) {
                    var othersrc = $(otherimg[i]).attr("src");
                    var otherstr = othersrc.substr(othersrc.lastIndexOf('/') + 1).split(".")[0];
                    if (otherstr.indexOf("-") != -1) {
                        $(otherimg[i]).attr("src", "../res/left/" + otherstr.split("-")[0] + ".png");
                    }
                }
            }

            var text = $(this).children(".col-md-10").text().trim();
            $(".word").text(text);
        }
    });
}

// 现场图片\项目信息切换
function evtOnChange() {
    $(this).siblings().first().css("color", "#000");
    $(this).css("color", "#f93440");

    if ("项目信息" == $(this).text().trim()) {
        $("#sceneline").css("background-color", "#fff");
        $("#infoline").css("background-color", "#f93440");
        $("#scenepic-container").hide();
        $("#proinfo-container").show();
    } else if ("现场图片" == $(this).text().trim()) {
        $("#infoline").css("background-color", "#fff");
        $("#sceneline").css("background-color", "#f93440");
        $("#proinfo-container").hide();
        $("#scenepic-container").show();
    }
}

// 展开左侧
function evtOnExpand() {
    $(".yh-left").animate({ "left": 0 }, 200).show();
    $(".yh-middle").removeClass("col-md-8").addClass("col-md-7");
    $(".yh-right").removeClass("col-md-4").addClass("col-md-3");
    $("#expandleft").hide();
    $("#shrinkleft").show();
}

// 收缩左侧
function evtOnShrink() {
    $(".yh-left").animate({ "left": -300 }, 500).hide();
    $(".yh-middle").removeClass("col-md-7").addClass("col-md-8");
    $(".yh-right").removeClass("col-md-3").addClass("col-md-4");
    $("#shrinkleft").hide();
    $("#expandleft").show();
}

// 收缩 项目基本信息
function evtOnBlockShrink() {
    $(this).siblings()
}


// 收缩 右侧
function evtOnRightShrink() {
    var text = $(this).attr("data-text");
    if (text == "") {
        return;
    }

    switch (text) {
        case "项目基本信息":
            $(".right-info>div:nth-child(1)").show();
            $(".right-info>div").not(":nth-child(1)").hide();
            break;
        case "项目材料":
            $(".right-material>div:nth-child(1)").show();
            $(".right-material>div").not(":nth-child(1)").hide();
            break;
        case "项目质量控制":
            $(".right-controll>div:nth-child(1)").show();
            $(".right-controll>div").not(":nth-child(1)").hide();
            break;
        case "项目资料":
            $(".right-data>div:nth-child(1)").show();
            $(".right-data>div").not(":nth-child(1)").hide();
            break;
        case "劳务管理":
            $(".right-labour>div:nth-child(1)").show();
            $(".right-labour>div").not(":nth-child(1)").hide();
            break;
    }
}