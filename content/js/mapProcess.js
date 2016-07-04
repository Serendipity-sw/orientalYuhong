/**
 * Created by wei on 2016/06/29.
 */

//调用示例
//mapObj.addOverlay([{lng:116.395645,lat:39.929986,city:"北京市",count:15,process:12,noProcess:33,haveProcess:123,type:1,number:1,locationName:'卧牛山',remark:'卧牛山水电培训中心内精装修'},{lng:115.661434,lat:38.61384,city:"河北省",count:10,process:12,noProcess:33,haveProcess:123,type:1,number:2,locationName:'卧牛山',remark:'卧牛山水电培训中心内精装修'},{lng:122.753592,lat:41.6216,city:"辽宁省",count:30,process:12,noProcess:33,haveProcess:123,type:1,number:3,locationName:'卧牛山',remark:'卧牛山水电培训中心内精装修'}],3);

/**
 * 地图实例方法  方法粗糙, 待优化重构
 * 创建人:邵炜
 * 创建时间:2016年6月29日10:33:37
 */
var mapObj=(function () {
    var data={
        scrollWheel:null, //地图是否支持放大缩放事件 true 支持缩放    false 不支持缩放
        doubleClickZoom:null, //地图是否支持双击放大缩小事件 true支持  false不支持
        addOverlay:null, /**将覆盖物添加到地图中事件 data 数据对象格式[{
                                                                     lng:116.123, //经度
                                                                     lat:20.123, //维度
                                                                     city:'北京市', //城市名称
                                                                     city:'北京市', //城市名称
                                                                     count:30, //总数
                                                                     process:1,  //进行中的
                                                                     noProcess:2,  //未开工
                                                                     haveProcess:3, //已开工
                                                                     number:1,   //序号,不允许重复
                                                                     locationName:'卧牛山', //项目区域名称
                                                                     remark:'描述' //描述
                                                                     }]**/
        overlayClick:null, //将省覆盖物单击回调事件 该事件传入参数省名称
        cityOverlayClick:null, //将市覆盖物单击回调事件 该事件传入参数市名称
        areaOverlayClick:null, //将区域覆盖物单击回调事件 该事件传入参数区域名称
        projectOverlayClick:null, //将项目覆盖物单击回调事件 该事件传入参数项目所属名称
        setCenter:null, //设置地图的中心点区域 该事件参数传递经纬度, 第一个参数为lng 经度  第二个参数为lat纬度, 调用方式 setCenter(116.417854, 39.921988);
        reset:null, //地图重置
        length:0 //无用占位符
    };
    var mp=new BMap.Map("mapArea");

    this._mp=mp;
    this._dataS=data;

    /*
     设初始化地图。
     如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。
     如果center类型为字符串时，比如“北京”，zoom可以忽略，地图将自动根据center适配最佳zoom级别。
     */
    mp.centerAndZoom(new BMap.Point(116.417854, 39.921988), 5);

    /**
     * 地图重置方法
     * 创建人:邵炜
     * 创建时间:2016年6月29日14:25:30
     */
    data.reset=function () {
        mp.reset();
    };

    /**
     * 设置地图的中心点
     * 创建人:邵炜
     * 创建时间:2016年6月29日14:22:43
     * @param lng 经度
     * @param lat 维度
     */
    data.setCenter=function (lng, lat) {
        mp.setCenter(new BMap.Point(lng, lat));
    };

    /**
     * 是否启用地图缩放
     * 创建人:邵炜
     * 创建时间:2016年6月29日09:43:30
     * @param bo true启用缩放   false不启用缩放
     */
    data.scrollWheel=function (bo) {
        bo? mp.enableScrollWheelZoom():mp.disableScrollWheelZoom();
    };

    /**
     * 是否启用双击缩放
     * 创建人:邵炜
     * 创建时间:2016年6月29日10:01:46
     * @param bo true启用 false不启用
     */
    data.doubleClickZoom=function (bo) {
    bo?mp.enableDoubleClickZoom():mp.disableDoubleClickZoom();
    };

    /**
     * 将数据覆盖到地图上
     * 创建人:邵炜
     * 创建时间:2016年6月29日10:15:16
     * @param data [{
     *                lng:116.123, //经度
     *                  lat:20.123, //维度
     *                  city:'北京市', //城市名称
     *                  count:30, //总数
     *                  process:1,  //进行中的
     *                  noProcess:2,  //未开工
     *                  haveProcess:3, //已开工
     *                  number:1,   //序号,不允许重复
     *                  locationName:'卧牛山', //项目区域名称
     *                  remark:'描述' //描述
     *                  }]
     *         type 0省级  1市级  2区域
     */
    data.addOverlay=function (data,type) {
        mp.clearOverlays();
        switch (type){
            case 0: //省级
                $.each(data,function (index,value) {
                    mp.addOverlay(new ComplexCustomOverlay(new BMap.Point(value.lng,value.lat), value.city,"("+value.count+")"));
                });
                /**
                 * 省覆盖物单击事件
                 * 创建人:邵炜
                 * 创建时间:2016年6月29日10:50:07
                 */
                $(".mapArea .map_project").each(function (index,value) {
                    $(value).click(function(){
                        if (data.overlayClick) {
                            data.overlayClick($(this).find("div:eq(0)").val());
                        }
                    });
                });
                break;
            case 1://市级
                $.each(data,function (index,value) {
                    mp.addOverlay(new CityComplexCustomOverlay(new BMap.Point(value.lng,value.lat), value.city,"进行中:"+value.process,"未开工:"+value.noProcess,"已开工:"+value.haveProcess));
                });
                /**
                 * 市覆盖物单击事件
                 * 创建人:邵炜
                 * 创建时间:2016年6月29日10:50:07
                 */
                $(".mapArea .map_cityProject").each(function (index,value) {
                    $(value).click(function(){
                        if (data.cityOverlayClick) {
                            data.cityOverlayClick($(this).find("div:eq(0)").val());
                        }
                    });
                });
                break;
            case 2://区域搜索点
                $.each(data,function (index,value) {
                    mp.addOverlay(new areaComplexCustomOverlay(new BMap.Point(value.lng,value.lat),value.number));
                });
                /**
                 * 区域覆盖物单击事件
                 * 创建人:邵炜
                 * 创建时间:2016年6月29日10:50:07
                 */
                $(".mapArea .map_areaProject").each(function (index,value) {
                    $(value).click(function(){
                        if (data.areaOverlayClick) {
                            data.areaOverlayClick($(this).find("div:eq(0)").val());
                        }
                    });
                });
                break;
            case 3://项目覆盖点
                $.each(data,function (index,value) {
                    mp.addOverlay(new projectComplexCustomOverlay(new BMap.Point(value.lng,value.lat),value.locationName,value.remark));
                });
                /**
                 * 项目覆盖物单击事件
                 * 创建人:邵炜
                 * 创建时间:2016年6月29日10:50:07
                 */
                $(".mapArea .map_projectOverLay").each(function (index,value) {
                    $(value).click(function(){
                        $(".map-projectTitle").each(function (index,value) {
                            value.style.display="none";
                        });
                        $(this).find(".map-projectTitle:eq(0)").style.display="block";
                        if (data.areaOverlayClick) {
                            data.areaOverlayClick($(this).find(".map-projectTitle span:eq(0)").textContent);
                        }
                    });
                });
                break;
        }
    };

    /**
     * 省级覆盖物
     * 创建人:邵炜
     * 创建时间:2016年6月29日11:27:35
     */
    function ComplexCustomOverlay(point, text, process_project){
        this._point = point;
        this._text = text;
        this._process_project = process_project;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    //抽象方法，用于初始化覆盖物，当调用map.addOverlay时，API将调用此方法。自定义覆盖物时需要实现此方法。自定义覆盖物时需要将覆盖物对应的HTML元素返回。(自 1.1 新增)
    ComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.className="map_overLay";


        var span = this._span = document.createElement("span");
        div.appendChild(span);
        //span.appendChild(document.createTextNode(this._text));
        span.innerHTML="<div class=\"map_project\"><div class=\"map-title\">"+this._text+"</div><div class=\"map-process-project\">"+this._process_project+"</div></div>";
        var that = this;

        var arrow = this._arrow = document.createElement("div");
        arrow.className="map-location";
        div.appendChild(arrow);

        div.onmouseover = function(){
            //this.style.backgroundColor = "#6BADCA";
            //this.style.borderColor = "#0000ff";
            this.style.zIndex = "9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px 0px";
        };

        div.onmouseout = function(){
            //this.style.backgroundColor = "#EE5D5B";
            //this.style.borderColor = "#BC3B3A";
            this.style.zIndex = "-9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";
        };
        //getPanes()返回地图覆盖物容器列表。
        mp.getPanes().labelPane.appendChild(div);

        return div;
    };
    //抽象方法，当地图状态发生变化时，由系统调用对覆盖物进行绘制。自定义覆盖物需要实现此方法。
    ComplexCustomOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 50 + "px";
        this._div.style.top  = pixel.y - 100 + "px";
    };


    /**
     * 市级覆盖物
     * 创建人:邵炜
     * 创建时间:2016年6月29日11:27:35
     */
    function CityComplexCustomOverlay(point, text, process_project,noprocess,haveprocess){
        this._point = point;
        this._text = text;
        this._process_project = process_project;
        this._notProcess_project = noprocess;
        this._haveprocess_project = haveprocess;
    }
    CityComplexCustomOverlay.prototype = new BMap.Overlay();
    //抽象方法，用于初始化覆盖物，当调用map.addOverlay时，API将调用此方法。自定义覆盖物时需要实现此方法。自定义覆盖物时需要将覆盖物对应的HTML元素返回。(自 1.1 新增)
    CityComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.className="map_cityOverLay";


        var span = this._span = document.createElement("span");
        div.appendChild(span);
        //span.appendChild(document.createTextNode(this._text));
        span.innerHTML='<div class="map_cityProject"><div class="map-title">'+this._text+'</div><div class="map-process-project">'+this._process_project+'</div><div class="map-process-project">'+this._notProcess_project+'</div><div class="map-process-project">'+this._haveprocess_project+'</div></div>';
        var that = this;

        var arrow = this._arrow = document.createElement("div");
        arrow.className="map-cityLocation";
        div.appendChild(arrow);

        div.onmouseover = function(){
            //this.style.backgroundColor = "#6BADCA";
            //this.style.borderColor = "#0000ff";
            this.style.zIndex = "9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px 0px";
        };

        div.onmouseout = function(){
            //this.style.backgroundColor = "#EE5D5B";
            //this.style.borderColor = "#BC3B3A";
            this.style.zIndex = "-9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";
        };
        //getPanes()返回地图覆盖物容器列表。
        mp.getPanes().labelPane.appendChild(div);

        return div;
    };
    //抽象方法，当地图状态发生变化时，由系统调用对覆盖物进行绘制。自定义覆盖物需要实现此方法。
    CityComplexCustomOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 50 + "px";
        this._div.style.top  = pixel.y - 100 + "px";
    };

    /**
     * 区域级覆盖物
     * 创建人:邵炜
     * 创建时间:2016年6月29日11:27:35
     */
    function areaComplexCustomOverlay(point, text, process_project,noprocess,haveprocess){
        this._point = point;
        this._text = text;
        this._process_project = process_project;
        this._notProcess_project = noprocess;
        this._haveprocess_project = haveprocess;
    }
    areaComplexCustomOverlay.prototype = new BMap.Overlay();
    //抽象方法，用于初始化覆盖物，当调用map.addOverlay时，API将调用此方法。自定义覆盖物时需要实现此方法。自定义覆盖物时需要将覆盖物对应的HTML元素返回。(自 1.1 新增)
    areaComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.className="map_areaOverLay";


        var span = this._span = document.createElement("span");
        div.appendChild(span);
        //span.appendChild(document.createTextNode(this._text));
        span.innerHTML='<div class="map_areaProject"><div class="map-title">'+this._text+'</div></div>';
        var that = this;

        var arrow = this._arrow = document.createElement("div");
        arrow.className="map-areaLocation";
        div.appendChild(arrow);

        div.onmouseover = function(){
            //this.style.backgroundColor = "#6BADCA";
            //this.style.borderColor = "#0000ff";
            this.style.zIndex = "9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px 0px";
        };

        div.onmouseout = function(){
            //this.style.backgroundColor = "#EE5D5B";
            //this.style.borderColor = "#BC3B3A";
            this.style.zIndex = "-9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";
        };
        //getPanes()返回地图覆盖物容器列表。
        mp.getPanes().labelPane.appendChild(div);

        return div;
    };
    //抽象方法，当地图状态发生变化时，由系统调用对覆盖物进行绘制。自定义覆盖物需要实现此方法。
    areaComplexCustomOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 50 + "px";
        this._div.style.top  = pixel.y - 100 + "px";
    };


    /**
     * 项目覆盖物
     * 创建人:邵炜
     * 创建时间:2016年6月29日11:27:35
     */
    function projectComplexCustomOverlay(point, text, process_project,noprocess,haveprocess){
        this._point = point;
        this._text = text;
        this._process_project = process_project;
        this._notProcess_project = noprocess;
        this._haveprocess_project = haveprocess;
    }
    projectComplexCustomOverlay.prototype = new BMap.Overlay();
    //抽象方法，用于初始化覆盖物，当调用map.addOverlay时，API将调用此方法。自定义覆盖物时需要实现此方法。自定义覆盖物时需要将覆盖物对应的HTML元素返回。(自 1.1 新增)
    projectComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.className="map_projectOverLay";


        var span = this._span = document.createElement("span");
        div.appendChild(span);
        //span.appendChild(document.createTextNode(this._text));
        span.innerHTML='<div class="map-projectTitle"><span>'+this._text+'</span><span>'+this._process_project+'</span></span></div><div class="map_projectProject"></div>';
        var that = this;

        var arrow = this._arrow = document.createElement("div");
        arrow.className="map-projectLocation";
        div.appendChild(arrow);

        div.onmouseover = function(){
            //this.style.backgroundColor = "#6BADCA";
            //this.style.borderColor = "#0000ff";
            this.style.zIndex = "9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px 0px";
        };

        div.onmouseout = function(){
            //this.style.backgroundColor = "#EE5D5B";
            //this.style.borderColor = "#BC3B3A";
            this.style.zIndex = "-9999999";
            //this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";
        };
        //getPanes()返回地图覆盖物容器列表。
        mp.getPanes().labelPane.appendChild(div);

        return div;
    };
    //抽象方法，当地图状态发生变化时，由系统调用对覆盖物进行绘制。自定义覆盖物需要实现此方法。
    projectComplexCustomOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 50 + "px";
        this._div.style.top  = pixel.y - 100 + "px";
    };
    return data;
})();