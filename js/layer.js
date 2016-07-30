/**
 * Created by wei on 2016/07/12.
 */
$.extend({
    /**
     * 弹框插件
     * @param data
     */
    layer:function (data) {
        var obj={
            url:data.url, //需要显示的页面地址
            title:data.title //显示名称
        };
        //弹框显示层
        var layer=$('<div style="overflow: hidden; position: fixed; top: 50%; left: 50%; box-sizing: border-box; padding: 0px; margin: -176px 0px 0px -348px; z-index: 1001;"> <div style="min-width: 950px;min-height: 560px;background-color: white;float: left;position: relative;padding: 72px 25px 26px 25px;box-sizing: border-box;"></div> <a href="javascript:void(0);" style="background: url(../images/closeWhite.png) no-repeat 50% red;display: block;float: left;width: 25px;overflow: hidden;height: 43px;box-sizing: border-box;"></a> </div>');
        var mark = $('<div style="overflow: hidden; position: fixed; top: 0; left: 0; display: block; padding: 0; box-sizing: border-box; margin: 0; bottom: 0; background-color: black; z-index: 1000; opacity: 0.5; right: 0;"></div>');

        
        var layerHead = $('<span style="position: absolute;top: 25px;display: block;width: 94%;left: 3%;height: 40px;box-sizing: border-box;border-bottom: 1px solid #c3c1c1;font-size: 18px; ">' + obj.title + '</span>');

        $("body").append(mark).append(layer);
        layer.find("div").load(obj.url, function () {
            $(this).prepend(layerHead);
            layer.find(" > a:eq(0)").click(function(){
                mark.remove();
                layer.remove();
            });
            layer.css({"margin-top":"-"+(layer.height()/2)+"px","margin-left":"-"+(layer.width()/2)+"px"});
        });

    },
    //在layer后 再次调用的弹出框控件。。
    layer_two: function (data) {
        var obj = {
            url: data.url, //需要显示的页面地址
            title: data.title //显示名称
        };
        //弹框显示层
        var layer = $('<div style="overflow: hidden; position: fixed; top: 50%; left: 50%; box-sizing: border-box; padding: 0px; margin: -176px 0px 0px -348px; z-index: 1018;"> <div style="min-width: 950px;min-height: 560px;background-color: white;float: left;position: relative;padding: 72px 25px 26px 25px;box-sizing: border-box;"></div> <a href="javascript:void(0);" style="background: url(../images/closeWhite.png) no-repeat 50% red;display: block;float: left;width: 25px;overflow: hidden;height: 43px;box-sizing: border-box;"></a> </div>');
        var markTwo = $('<div style="overflow: hidden; position: fixed; top: 0; left: 0; display: block; padding: 0; box-sizing: border-box; margin: 0; bottom: 0; background-color: black; z-index: 1017; opacity: 0.5; right: 0;"></div>');

        var layerHead = $('<span style="position: absolute;top: 25px;display: block;width: 94%;left: 3%;height: 40px;box-sizing: border-box;border-bottom: 1px solid #c3c1c1;font-size: 18px; ">' + obj.title + '</span>');

        $("body").append(markTwo).append(layer);
        layer.find("div").load(obj.url, function () {
            $(this).prepend(layerHead);
            layer.find(" > a:eq(0)").click(function () {
                markTwo.remove();
                layer.remove();
            });
            layer.css({ "margin-top": "-" + (layer.height() / 2) + "px", "margin-left": "-" + (layer.width() / 2) + "px" });
        });

    },
    fromLayer:function(data){
        var obj={
            callback:data.callback, //回调函数
            title:data.title,  //标题
            list: data.list, //数组对象    type: data.type, //input 类似（默认 input ，支持select）selectOption: data.selectOption,//select的值，如果 type=select，则需要传递 selectOption: [{ "text": "视频", "value": "0" }, { "text": "图片", "value": "1" }]
            saveCallBack: data.saveCallBack, //保存按钮回调事件
            cancelCallBack: data.cancelCallBack ,//取消按钮回调事件
            loadCallBack: data.loadCallBack //生成表单后执行的方法

        };

      
        var rows = "";
        $.each(obj.list, function (index, value) {
            var value_class = '';
            if (value.class != undefined) {
                value_class=value.class;
            }
            if (value.type == "select" && value.selectOption!= undefined ) {
                rows += '<div class="rows"><span>' + value.name + ':</span> <div class="inputGroup"> <select class="' + value_class + '" name="' + value.Attributes + '" >';
                
                $.each(value.selectOption, function (index, value) {
                    rows += '<option value ="' + value.value + '">' + value.text + '</option>';
                });
                rows += '</select></div></div> ';
            }
            else {
                rows += '<div class="rows"><span>' + value.name + ':</span><div class="inputGroup"><input type="txt"  class="' + value_class + '" name="' + value.Attributes + '" placeholder="' + value.name + '"></div></div>';
            }
        });

        //默认居中
        var layer = $('<div style="overflow: hidden; position: fixed; top: 50%; left: 50%; box-sizing: border-box; padding: 0px; margin: -176px 0px 0px -348px; z-index: 1160;"> <div style="min-width: 450px;background-color: white;float: left;position: relative;padding: 72px 25px 26px 25px;box-sizing: border-box;"></div> <a href="javascript:void(0);" style="background: url(../images/closeWhite.png) no-repeat 50% red;display: block;float: left;width: 25px;overflow: hidden;height: 43px;box-sizing: border-box;"></a> </div>');
        var layerHead = $('<span style="position: absolute;top: 25px;display: block;width: 94%;left: 3%;height: 40px;box-sizing: border-box;border-bottom: 1px solid #c3c1c1;font-size: 18px; ">' + obj.title + '</span>');
        var fromLayer = $('<div class="fromLayerArea"> ' + rows + '<div class = "bottom"><a href = "javascript:void(0);" class="save">保存</a> <a href = "javascript:void(0);" class="cancel">取消</a> </div></div>');
        var mark=$('<div style="overflow: hidden; position: fixed; top: 0; left: 0; display: block; padding: 0; box-sizing: border-box; margin: 0; bottom: 0; background-color: black; z-index: 1159; opacity: 0.5; right: 0;"></div>');
        $("body").append(mark).append(layer);
        layer.find("div").append(fromLayer).prepend(layerHead);
        layer.css({"margin-top":"-"+(layer.height()/2)+"px","margin-left":"-"+(layer.width()/2)+"px"});
        $.each(obj.list,function(index,value){
            if (value.value) {
                fromLayer.find('[name="'+value.Attributes+'"]').val(value.value);
            }
        });

        if (obj.loadCallBack) {
            obj.loadCallBack();
        }
 
       
        /**
         * 关闭事件
         * 创建人:邵炜
         * 创建时间:2016年7月21日21:13:42
         */
       var  closeFunc=function () {
            mark.remove();
            layer.remove();
        };
        layer.find(" > a:eq(0),.cancel").click(function(){
            closeFunc();
        });
        fromLayer.find(".save").click(function(){
            var dataObj={};
            fromLayer.find("[name]").each(function(index,value){
                var itemElement=$(value);
                dataObj[itemElement.attr("name")]=itemElement.val();
            });
            if (obj.saveCallBack) {
                obj.saveCallBack(dataObj,closeFunc)
            }else{
                closeFunc();
            }
        }).next().click(function(){
            if (obj.cancelCallBack) {
                obj.cancelCallBack(closeFunc);
            }else{
                closeFunc();
            }
        });
    }
});