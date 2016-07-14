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
        var layer=$('<div style="overflow: hidden;position: fixed;top: 50%;left: 50%;box-sizing: border-box;padding: 0;margin: 0;background-color: white;z-index: 101;"></div>');

        var layerHead=$('<div style=" height: 36px; overflow: hidden; box-sizing: border-box; padding: 0; margin: 0; display: block; border-bottom: 1px solid #797979; background: #cacaca; min-width: 200px; "><span style=" display: block; overflow: hidden; padding: 0; margin: 7px 0 0 11px; font-size: 13px; letter-spacing: 1px; float: left; ">'+obj.title+'</span><a href="javascript:void(0);" style=" float: right; width: 15px; height: 17px; display: block; overflow: hidden; padding: 0; box-sizing: border-box; margin: 8px 9px 0 0; background: url(../images/closeBtn.png) no-repeat 50%; "></a></div>')

        $("body").append(mark).append(layer);
        layer.load(obj.url,function(){
            layer.prepend(layerHead);
            layer.find("a:eq(0)").click(function(){
                mark.remove();
                layer.remove();
            });
            layer.css({"margin-top":"-"+(layer.height()/2)+"px","margin-left":"-"+(layer.width()/2)+"px"});
        });

    }
});