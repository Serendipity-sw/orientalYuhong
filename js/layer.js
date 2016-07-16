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
        //遮罩层
        var mark=$('<div style="overflow: hidden; position: fixed; top: 0; left: 0; display: block; padding: 0; box-sizing: border-box; margin: 0; bottom: 0; background-color: black; z-index: 100; opacity: 0.5; right: 0;"></div>');
        //弹框显示层
        var layer=$('<div style="overflow: hidden; position: fixed; top: 50%; left: 50%; box-sizing: border-box; padding: 0px; margin: -176px 0px 0px -348px; z-index: 101;"> <div style="min-width: 300px;min-height: 300px;background-color: white;float: left;position: relative;padding: 54px 25px 26px 25px;box-sizing: border-box;"></div> <a href="javascript:void(0);" style="background: url(../images/closeWhite.png) no-repeat 50% red;display: block;float: left;width: 25px;overflow: hidden;height: 43px;box-sizing: border-box;"></a> </div>');

        var layerHead=$('<span style="position: absolute; top: 11px; display: block; width: 94%; left: 3%; height: 31px; box-sizing: border-box; border-bottom: 1px solid #c3c1c1; padding-left: 13px; font-size: 15px; ">' + obj.title+'</span>')

        $("body").append(mark).append(layer);
        layer.find("div").load(obj.url,function(){
            $(this).prepend(layerHead);
            layer.find(" > a:eq(0)").click(function(){
                mark.remove();
                layer.remove();
            });
            layer.css({"margin-top":"-"+(layer.height()/2)+"px","margin-left":"-"+(layer.width()/2)+"px"});
        });

    }
});