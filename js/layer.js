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
        var layer=$('<div style="overflow: hidden; position: fixed; top: 50%; left: 50%; box-sizing: border-box; padding: 0px; margin: -176px 0px 0px -348px; z-index: 101;"> <div style="min-width: 300px;min-height: 300px;background-color: white;float: left;position: relative;padding: 54px 25px 26px 25px;box-sizing: border-box;"></div> <a href="javascript:void(0);" style="background: url(../images/closeWhite.png) no-repeat 50% red;display: block;float: left;width: 25px;overflow: hidden;height: 43px;box-sizing: border-box;"></a> </div>');

        var layerHead=$('<span style="position: absolute; top: 11px; display: block; width: 94%; left: 3%; height: 31px; box-sizing: border-box; border-bottom: 1px solid #c3c1c1; padding-left: 13px; font-size: 15px; ">' + obj.title+'</span>');

        $("body").append(mark).append(layer);
        layer.find("div").load(obj.url,function(){
            $(this).prepend(layerHead);
            layer.find(" > a:eq(0)").click(function(){
                mark.remove();
                layer.remove();
            });
            layer.css({"margin-top":"-"+(layer.height()/2)+"px","margin-left":"-"+(layer.width()/2)+"px"});
        });

    },
    fromLayer:function(data){
        var obj={
            callback:data.callback, //回调函数
            title:data.title,  //标题
            list: data.list, //数组对象
            position: data.position, // 弹出框位置 right
            saveCallBack: data.saveCallBack, //保存按钮回调事件
            cancelCallBack: data.cancelCallBack ,//取消按钮回调事件
            loadCallBack: data.loadCallBack //生成表单后执行的方法

        };
        var rows="";
        $.each(obj.list, function (index, value) {
            var value_class = '';
            if (value.class != undefined) {
                value_class=value.class;
            }
            rows += '<div class="rows"><span>' + value.name + ':</span><input type="txt"  class="' + value_class + '" name="' + value.Attributes + '" placeholder="' + value.name + '"></div>';
        });
        if (obj.position == "right") {
            var layer = $('<div style="overflow: hidden; position: fixed; top: 50%; right: 0%; box-sizing: border-box; padding: 0px; margin: -176px 0px 0px -348px; z-index: 106;"> <div style="min-width: 300px;background-color: white;float: left;position: relative;padding: 54px 25px 26px 25px;box-sizing: border-box;"></div> <a href="javascript:void(0);" style="background: url(../images/closeWhite.png) no-repeat 50% red;display: block;float: left;width: 25px;overflow: hidden;height: 43px;box-sizing: border-box;"></a> </div>');
        }
        else {
            //默认居中
            var layer = $('<div style="overflow: hidden; position: fixed; top: 50%; left: 50%; box-sizing: border-box; padding: 0px; margin: -176px 0px 0px -348px; z-index: 106;"> <div style="min-width: 300px;background-color: white;float: left;position: relative;padding: 54px 25px 26px 25px;box-sizing: border-box;"></div> <a href="javascript:void(0);" style="background: url(../images/closeWhite.png) no-repeat 50% red;display: block;float: left;width: 25px;overflow: hidden;height: 43px;box-sizing: border-box;"></a> </div>');

        }
        var layerHead=$('<span style="position: absolute; top: 11px; display: block; width: 94%; left: 3%; height: 31px; box-sizing: border-box; border-bottom: 1px solid #c3c1c1; padding-left: 13px; font-size: 15px; ">' + obj.title+'</span>');
        var fromLayer=$('<div class="fromLayerArea"> '+rows+'<div class = "bottom"><a href = "javascript:void(0);" class="save">保存</a> <a href = "javascript:void(0);" class="cancel">取消</a> </div></div>');
        var mark=$('<div style="overflow: hidden; position: fixed; top: 0; left: 0; display: block; padding: 0; box-sizing: border-box; margin: 0; bottom: 0; background-color: black; z-index: 105; opacity: 0.5; right: 0;"></div>');
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