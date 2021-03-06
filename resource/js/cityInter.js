/**
 * Created by luocheng on 14-10-31.
 * v 1.2.0
 * modify: 城市三字码检索顺序修改为 指定三字码->附带三字码->汉字、拼音、缩写拼音
 *         自动在起始城市input后面添加input[name='cityObj']表单，每次赋值放在input上面不放在当前attr
 *         自动在结束城市input后面添加input[name='cityObjEnd']表单，每次赋值放在input上面不放在当前attr
 */
;
(function ($) {
    var global = {};
    var globalEnd = {};
    $.fn.cityContentInter = function (cityName, cityFlightArr, cityType) {
        var self = $(this),
            cityArr = "", //手动设置热门城市
            hotCityArr = new Array(),
            x, //弹出层的x坐标
            y; //弹出层的y坐标
        if (cityType === 1) {
            Init();
            if (cityFlightArr !== "" && cityFlightArr !== null && cityFlightArr !== undefined) {
                global.citysFlightNew = cityFlightArr;
            }
            else {
                global.citysFlightNew = citysFlight;
            }
        } else if (cityType === 0) {
            InitEnd();
            if (cityFlightArr !== "" && cityFlightArr !== null && cityFlightArr !== undefined) {
                globalEnd.citysFlightNew = cityFlightArr;
            }
            else {
                globalEnd.citysFlightNew = citysFlight;
            }
        }
        if (cityName !== "" && cityName !== null && cityName !== undefined) {
            cityArr = cityName.split(',')
        }
        if (cityType === 1) {
            $(self).after(global.AddInput);

            if (self.val() !== "") {
                var cityLength = global.citysFlightNew.length, //城市总数
                    cityObj = global.citysFlightNew;
                for (var i = 0; i < cityLength; i++) {
                    var $firstThis = cityObj[i][1];
                    if ($firstThis === self.val()) {
                        var tmp = cityObj[i][0].toUpperCase() + " | " + cityObj[i][1] + " | " + cityObj[i][2] + " | " + cityObj[i][3];
                        self.next("input[name='cityObj']").val(tmp);
                    }
                }
            }

            $(self).click(function () {
                $("#popCityEnd").remove();
                x = $(self).offset().left;
                y = $(self).offset().top + $(self).outerHeight();
                global.cityChoose = $(this);
                global.inputvalue = $(this).val();
                /*global.citysFlightNew.sort(function(x, y){
                 return x[0].localeCompare(y[0]);
                 });*/

                global.citysFlightNew.sort(function (x, y) {
                    return y[4] - x[4];
                });
                if ($("#popCity").length <= 0) {
                    var citysLigth = global.citysFlightNew.length, //城市总数
                        inputObj = { A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "", L: "", M: "", N: "", O: "", P: "", Q: "", R: "", S: "", T: "", U: "", V: "", W: "", X: "", Y: "", Z: "" },
                        hotCity = "", //热门城市
                        AGCity = "", //A-G开始的城市
                        HLCity = "", //H-L开始的城市
                        MTCity = "", //M-T开始的城市
                        WZCity = "", //W-Z开始的城市
                        interCity = "",// 国际港澳台城市
                        titleLi = "",
                        divInput = $("<div id='popCity' class='popWidth popCity-hide'></div> "),
                        divHead = $('<div id="popCity_head" class="popWidth"><span style="float: left;">请选择城市</span></div>'),
                        divTitle = $('<div id="popCity_title"></div>'),
                        divContent = $('<div id="popCity_content"> </div>'),
                        divContentContent = $('<div class="popCity_Content_Content"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div>');
                    titleLi = $('<ul><li class="active" >热门城市</li><li>ABCDEFG</li><li>HIJKL</li><li>MNPQRST</li><li>WXYZ</li><li>国际·港澳台</li></ul>'),
                        divTitle.append(titleLi);
                    divContent.append(divContentContent);
                    divInput.append(divHead);
                    divInput.append(divTitle);
                    divInput.append(divContent);
                    $("body").append(divInput);
                    //遍历城市数组，并将数据放入拼接字符串中
                    for (var i = 0; i < citysLigth; i++) {
                        for (var j in cityArr) {
                            if (cityArr[j].indexOf(global.citysFlightNew[i][1]) > -1) {
                                if (i < 55) {
                                    hotCityArr.push(i);
                                }
                                hotCity = hotCity + "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                            }
                        }
                    }

                    var num = 0;
                    for (var i = 0; i < citysLigth; i++) {
                        if (global.citysFlightNew[i][5] === "国内") {
                            if (num < (30 - cityArr.length)) {//热门城市
                                var bool = false;
                                for (var j in hotCityArr) {
                                    if (hotCityArr[j] === i) {
                                        bool = true;
                                    }
                                    else {
                                        bool = true;
                                        hotCity = hotCity + "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                                        num++;
                                        break;
                                    }
                                }
                                if (bool == false) {
                                    hotCity = hotCity + "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                                    num++;
                                }
                            }
                        }
                    }
                    var interNum = 0;
                    for (var i = 0; i < citysLigth; i++) {
                        if (global.citysFlightNew[i][5] !== "国内") {
                            if (interNum < 30) {
                                interCity = interCity + "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                                interNum++;
                            }
                        }
                    }

                    for (var i = 0; i < citysLigth; i++) {
                        if (global.citysFlightNew[i][5] === "国内") {
                            var letter = global.citysFlightNew[i][2].substr(0, 1).toUpperCase();
                            if (letter.match(/^[A,B,C,D,E,F,G]+$/)) {
                                inputObj[letter] += "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                            }
                            if (letter.match(/^[H,J,K,L]+$/)) {
                                inputObj[letter] += "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                            }
                            if (letter.match(/^[M,N,P,Q,R,S,T]+$/)) {
                                inputObj[letter] += "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                            }
                            if (letter.match(/^[W,X,Y,Z]+$/)) {
                                inputObj[letter] += "<a href='javascript:void(0)' title=' " + global.citysFlightNew[i][1] + "(" + global.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + global.citysFlightNew[i][0].toUpperCase() + " | " + global.citysFlightNew[i][1] + " | " + global.citysFlightNew[i][2] + " | " + global.citysFlightNew[i][3] + "'>" + global.citysFlightNew[i][1] + "</a>";
                            }
                        }
                    }

                    AGCity = "";
                    HLCity = "";
                    MTCity = "";
                    WZCity = "";
                    for (var item in inputObj) {
                        if (item.match(/^[A,B,C,D,E,F,G]+$/)) {
                            AGCity += "<b>" + item + "</b> <div>" + inputObj[item] + "</div>";
                        }
                        if (item.match(/^[H,J,K,L]+$/)) {
                            HLCity += "<b>" + item + "</b> <div>" + inputObj[item] + "</div>";
                        }
                        if (item.match(/^[M,N,P,Q,R,S,T]+$/)) {
                            MTCity += "<b>" + item + "</b> <div>" + inputObj[item] + "</div>";
                        }
                        if (item.match(/^[W,X,Y,Z]+$/)) {
                            WZCity += "<b>" + item + "</b> <div>" + inputObj[item] + "</div>";
                        }
                    }
                    AGCity += "<div class='clear'></div><div class='clear'></div>";
                    HLCity += "<div class='clear'></div><div class='clear'></div>";
                    MTCity += "<div class='clear'></div><div class='clear'></div>";
                    WZCity += "<div class='clear'></div><div class='clear'></div>";
                    var content = $("#popCity_content .popCity_Content_Content");
                    $(content[0]).append(hotCity);
                    $(content[1]).append(AGCity);
                    $(content[2]).append(HLCity);
                    $(content[3]).append(MTCity);
                    $(content[4]).append(WZCity);
                    $(content[5]).append(interCity);
                }
                if ($("#resultCity").length > 0) {
                    $("#resultCity").remove();
                }

                //显示div
                $("#popCity").show();
                $("#popCity").css({ "left": x, "top": y });
                $("#cancelDiv").click(function () {
                    global.cancel();
                });
                //设置li的切换事件
                $("#popCity_title ul li").each(function () {
                    $(this).click(function () {
                        global.liClick(this);
                    });
                });
                //a标签的点击事件
                $("#popCity_content a").each(function () {
                    $(this).click(function () {
                        global.chooseClick(this);
                    });
                });
                global.ReShow($.trim($(this).val())); //拼音 三字码  汉字  拼音简写 搜索
                return false;
            });
            $(self).blur(function () {
                global.cancelBody();
                if ($("#resultCity li:hover").html() !== null) {
                    $("#resultCity li.selected").removeClass();
                    $("#resultCity li:hover").addClass("selected");
                }
                var select = $("#resultCity li.selected").attr("cityObj");
                if (select) {
                    global.cityChoose.val($.trim(select.split('|')[1]));
                    global.cityChoose.next("input[name='cityObj']").val(select);
                }
                if ($("#resultCity li.selected").html() === "无条件符合") {
                    global.cityChoose.val("");
                    global.cityChoose.next("input[name='cityObj']").val("");
                }
                $("#resultCity").remove();
            });
            $(self).focus(function () {
                $(self).click();
            });
            //按键操作
            $(self).live("keyup", function (evt) {
                switch (evt.which) {
                    case 38: //上
                        global.keydownUp();
                        break;
                    case 40: //下
                        global.keydownDown();
                        break;
                    case 13: //enter键选中
                        var select = $("#resultCity li.selected").attr("cityObj");
                        if (select) {
                            global.cityChoose.val($.trim(select.split('|')[1]));
                            global.cityChoose.after(global.AddInput);
                            global.cityChoose.next("input[name='cityObj']").val(select);
                        }
                        $("#resultCity").remove();
                        break;
                    case 9: //tab键
                        var select = $("#resultCity li.selected").attr("cityObj");
                        if (select) {
                            global.cityChoose.val($.trim(select.split('|')[1]));
                            global.cityChoose.after(global.AddInput);
                            global.cityChoose.next("input[name='cityObj']").val(select);
                            $("#resultCity").remove();
                            $("#popCity").remove();
                        }
                        break;
                    default:
                        $("#popCity").remove();
                        $("#resultCity").remove();
                        global.SpellSearch(self, x, y);
                        break;
                }
                return;
            });
        } else if (cityType === 0) {
            $(self).after(globalEnd.AddInput);

            if (self.val() !== "") {
                var cityEndLength = globalEnd.citysFlightNew.length, //城市总数
                    cityEndObj = globalEnd.citysFlightNew;
                for (var i = 0; i < cityEndLength; i++) {
                    var $firstThis1 = cityEndObj[i][1];
                    if ($firstThis1 === self.val()) {
                        var tmp1 = cityEndObj[i][0].toUpperCase() + " | " + cityEndObj[i][1] + " | " + cityEndObj[i][2] + " | " + cityEndObj[i][3];
                        self.next("input[name='cityObj']").val(tmp1);
                    }
                }
            }

            $(self).click(function () {
                $("#popCity").remove();
                x = $(self).offset().left;
                y = $(self).offset().top + $(self).outerHeight();
                globalEnd.cityChoose = $(this);
                globalEnd.inputvalue = $(this).val();
                /*globalEnd.citysFlightNew.sort(function(x, y){
                 return x[0].localeCompare(y[0]);
                 });*/

                globalEnd.citysFlightNew.sort(function (x, y) {
                    return y[4] - x[4];
                });
                if ($("#popCityEnd").length <= 0) {
                    var citysLigth = globalEnd.citysFlightNew.length, //城市总数
                        hotCity = "", //热门城市
                        yaZhouCity = "", //亚洲、大洋洲的城市
                        meiZhouCity = "", //美洲的城市
                        ouZhouCity = "", //欧洲的城市
                        feiZhouCity = "", //非洲的城市
                        interCity = "",// 国际港澳台城市
                        titleLi = "",
                        divInput = $("<div id='popCityEnd' class='popWidth popCity-hide'></div> "),
                        divHead = $('<div id="popCityEnd_head" class="popWidth"><span style="float: left;">请选择城市</span></div>'),
                        divTitle = $('<div id="popCityEnd_title"></div>'),
                        divContent = $('<div id="popCityEnd_content"> </div>'),
                        divContentContent = $('<div class="popCity_Content_Content"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div><div class="popCity_Content_Content popCity-hide"> </div>');
                    titleLi = $('<ul><li class="active" >热门城市</li><li>亚洲/大洋洲</li><li>美洲</li><li>欧洲</li><li>非洲</li><li>国内</li></ul>');
                    divTitle.append(titleLi);
                    divContent.append(divContentContent);
                    divInput.append(divHead);
                    divInput.append(divTitle);
                    divInput.append(divContent);
                    $("body").append(divInput);
                    //遍历城市数组，并将数据放入拼接字符串中
                    for (var i = 0; i < citysLigth; i++) {
                        for (var j in cityArr) {
                            if (cityArr[j].indexOf(globalEnd.citysFlightNew[i][1]) > -1) {
                                if (i < 55) {
                                    hotCityArr.push(i);
                                }
                                hotCity = hotCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                            }
                        }
                    }
                    var hotNum = 0;
                    for (var i = 0; i < citysLigth; i++) {
                        if (globalEnd.citysFlightNew[i][5] !== "国内") {
                            if (hotNum < (30 - cityArr.length)) {//热门城市
                                var bool = false;
                                for (var j in hotCityArr) {
                                    if (hotCityArr[j] === i) {
                                        bool = true;
                                    }
                                    else {
                                        bool = true;
                                        hotCity = hotCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                                        hotNum++;
                                        break;
                                    }
                                }
                                if (bool == false) {
                                    hotCity = hotCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                                    hotNum++;
                                }
                            }
                        }
                    }
                    var countA = 0;
                    var countB = 0;
                    var countC = 0;
                    var countD = 0;
                    var countE = 0;
                    for (var i = 0; i < citysLigth; i++) {
                        if (globalEnd.citysFlightNew[i][5] === "国内") {
                            if (countA < 30) {
                                interCity = interCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                                countA++;
                            }
                        }
                    }
                    for (var i = 0; i < citysLigth; i++) {
                        if (globalEnd.citysFlightNew[i][5] !== "国内" && globalEnd.citysFlightNew[i][5] === "亚洲" || globalEnd.citysFlightNew[i][5] === "大洋洲" || globalEnd.citysFlightNew[i][5] === "港澳台") {
                            if (countB < 30) {
                                yaZhouCity = yaZhouCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                                countB++;
                            }
                        }
                    }
                    for (var i = 0; i < citysLigth; i++) {
                        if (globalEnd.citysFlightNew[i][5] !== "国内" && globalEnd.citysFlightNew[i][5] === "南美洲" || globalEnd.citysFlightNew[i][5] === "北美洲") {
                            if (countC < 30) {
                                meiZhouCity = meiZhouCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                                countC++;
                            }
                        }
                    }
                    for (var i = 0; i < citysLigth; i++) {
                        if (globalEnd.citysFlightNew[i][5] !== "国内" && globalEnd.citysFlightNew[i][5] === "欧洲") {
                            if (countD < 30) {
                                ouZhouCity = ouZhouCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                                countD++;
                            }
                        }
                    }
                    for (var i = 0; i < citysLigth; i++) {
                        if (globalEnd.citysFlightNew[i][5] !== "国内" && globalEnd.citysFlightNew[i][5] === "非洲") {
                            if (countE < 30) {
                                feiZhouCity = feiZhouCity + "<a href='javascript:void(0)' title=' " + globalEnd.citysFlightNew[i][1] + "(" + globalEnd.citysFlightNew[i][0].toUpperCase() + ")' cityObj = '" + globalEnd.citysFlightNew[i][0].toUpperCase() + " | " + globalEnd.citysFlightNew[i][1] + " | " + globalEnd.citysFlightNew[i][2] + " | " + globalEnd.citysFlightNew[i][3] + "'>" + globalEnd.citysFlightNew[i][1] + "</a>";
                                countE++;
                            }
                        }
                    }
                    var content = $("#popCityEnd_content .popCity_Content_Content");
                    $(content[0]).append(hotCity);
                    $(content[1]).append(yaZhouCity);
                    $(content[2]).append(meiZhouCity);
                    $(content[3]).append(ouZhouCity);
                    $(content[4]).append(feiZhouCity);
                    $(content[5]).append(interCity);
                }
                if ($("#resultCityEnd").length > 0) {
                    $("#resultCityEnd").remove();
                }

                //显示div
                $("#popCityEnd").show();
                $("#popCityEnd").css({ "left": x, "top": y });
                $("#cancelDiv").click(function () {
                    globalEnd.cancel();
                });
                //设置li的切换事件
                $("#popCityEnd_title ul li").each(function () {
                    $(this).click(function () {
                        globalEnd.liClick(this);
                    });
                });
                //a标签的点击事件
                $("#popCityEnd_content a").each(function () {
                    $(this).click(function () {
                        globalEnd.chooseClick(this);
                    });
                });
                globalEnd.ReShow($.trim($(this).val())); //拼音 三字码  汉字  拼音简写 搜索
                return false;
            });

            $(self).blur(function () {
                globalEnd.cancelBody();
                if ($("#resultCityEnd li:hover").html() !== null) {
                    var selectli = $("#resultCityEnd li");
                    $("#resultCityEnd li.selected").removeClass();
                    $("#resultCityEnd li:hover").addClass("selected");
                }
                var select = $("#resultCityEnd li.selected").attr("cityObj");
                if (select) {
                    globalEnd.cityChoose.val($.trim(select.split('|')[1]));
                    globalEnd.cityChoose.attr("cityObj", select);
                }
                if ($("#resultCityEnd li.selected").html() === "无条件符合") {
                    globalEnd.cityChoose.val("");
                    globalEnd.cityChoose.attr("cityObj", "");
                }
                $("#resultCityEnd").remove();
            });
            $(self).focus(function () {
                $(self).click();
            });
            //按键操作
            $(self).live("keyup", function (evt) {
                switch (evt.which) {
                    case 38: //上
                        globalEnd.keydownUp();
                        break;
                    case 40: //下
                        globalEnd.keydownDown();
                        break;
                    case 13: //enter键选中
                        var select = $("#resultCityEnd li.selected").attr("cityObj");
                        if (select) {
                            globalEnd.cityChoose.val($.trim(select.split('|')[1]));
                            global.cityChoose.next("input[name='cityObjEnd']").val(select);
                        }
                        $("#resultCityEnd").remove();
                        break;
                    case 9: //tab键
                        var select = $("#resultCityEnd li.selected").attr("cityObj");
                        if (select) {
                            globalEnd.cityChoose.val($.trim(select.split('|')[1]));
                            global.cityChoose.next("input[name='cityObjEnd']").val(select);
                            $("#resultCityEnd").remove();
                            $("#popCityEnd").remove();
                        }
                        break;
                    default:
                        $("#popCityEnd").remove();
                        $("#resultCityEnd").remove();
                        globalEnd.SpellSearch(self, x, y);
                        break;
                }
                return;
            });
        }
        return false;
    };
    //初始化
    function Init() {
        //查询结果选中
        global.inputvalue = '';
        global.cityChoose = '';
        global.citysFlightNew = '';
        global.AddInput = $("<input name='cityObj' type='hidden' />");
        global.searchLiClick = function (obj) {
            global.cityChoose.val($.trim($(obj).attr("cityObj").split('|')[1]));
            global.cityChoose.next("input[name='cityObj']").val($(obj).attr("cityObj"));
            $("#resultCity").remove();
        };
        //选中城市
        global.chooseClick = function (astr) {
            global.cityChoose.val($.trim($(astr).html()));
            global.cityChoose.next("input[name='cityObj']").val($(astr).attr("cityObj"));
            $("#popCity").remove();
        };
        //点击body的其他地方
        global.cancelBody = function () {
            $(document).on("click", function (e) {
                var target = $(e.target);
                //判断是否点击在input或者弹出层上，若不是，则隐藏弹出层
                if (target.closest("#popCity").length === 0 && target.closest(self).length === 0 && target.closest("#resultCity").length === 0) {
                    $("#popCity").remove();
                    if ($("#resultCity").is(":visible")) {
                        var cityObjSelect = $("#resultCity li.selected").attr("cityObj");
                        if (cityObjSelect) {
                            var select = $("#resultCity li.selected").attr("cityObj").split('|')[1];
                            global.cityChoose.val($.trim(select));
                            global.cityChoose.append(global.AddInput);
                            global.cityChoose.next("input[name='cityObj']").val($.trim($("#resultCity li.selected").attr("cityObj")));
                        }
                    }
                    $("#resultCity").remove();
                }
            });
        };
        //根据input的内容，显示对应的块
        global.ReShow = function (obj) {
            var cityLength = global.citysFlightNew.length,
                spell = "";
            for (var i = 0; i < cityLength; i++) {
                if (obj === global.citysFlightNew[i][1] && i >= 26) {
                    spell = global.citysFlightNew[i][2].substr(0, 1).toUpperCase();
                    break;
                }
            }
            if (spell !== "") {
                $('#popCity_title li').each(function () {
                    var ht = $(this).html();
                    if (ht.indexOf(spell) !== -1) {
                        global.liClick($(this));
                    }
                });
            }
        };
        //26个英文字母的li切换
        global.liClick = function (obj) {
            var index2 = $(obj).index();
            $(obj).siblings().removeClass("active");
            $(obj).addClass("active");
            var content = $("#popCity_content").find(".popCity_Content_Content");
            $(content[index2]).siblings().hide().end().show();
        };
        //获取鼠标的点击位置
        global.mousePos = function (e) {
            var x,
                y,
                e = e || window.event;
            return {
                x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
            };
        };
        //取消按钮的点击
        global.cancel = function () {
            global.cityChoose.val(global.inputvalue);
            $("#popCity").remove();
        };
        //根据输入框的内容显示列表
        global.SpellSearch = function (obj, x, y) {
            if ($(obj).val() === "") {
                return;
            }
            $("#popCity").remove();
            if ($("#resultCity").length <= 0) {
                var divSearch = '<div id="resultCity" class="popCity-hide"></div>';
                $("body").append(divSearch);
            }
            $("#resultCity").html("");

            var cityLength = global.citysFlightNew.length, //城市总数
                cityName = $(obj).val().toUpperCase(),
                bl = false,
                number = 0,
                searchString = '<ul>',
                cityObj = global.citysFlightNew;

            // 缩写三字码 如果又符合加进去
            for (var first = 0; first < cityLength; first++) {
                if (number > 10) {
                    break;
                }
                var $firstThis = cityObj[first][0].toUpperCase();
                if ($firstThis.indexOf(cityName) !== -1) {
                    bl = true;
                    searchString += "<li cityObj = '" + cityObj[first][0].toUpperCase() + " | " + cityObj[first][1] + " | " + cityObj[first][2] + " | " + cityObj[first][3] + "'>" + cityObj[first][1] + "(" + cityObj[first][6] + ")(" + cityObj[first][0].toUpperCase() + ")</li>";
                    number++;
                }
            }

            // 缩写后面的三字码 如果又符合加进去
            for (var second = 0; second < cityLength; second++) {
                if (number > 10) {
                    break;
                }
                var $this = cityObj[second][3];
                if ($this.indexOf("|") !== -1) {
                    var shortPylen = $this.split("|").length;
                    if (shortPylen > 1) {
                        for (var item = 1; item < shortPylen; item++) {
                            var $shortCode = $this.split("|")[item].toUpperCase();
                            if ($shortCode.indexOf(cityName) !== -1 && $shortCode !== cityObj[second][0].toUpperCase()) {
                                bl = true;
                                searchString += "<li cityObj = '" + cityObj[second][0].toUpperCase() + " | " + cityObj[second][1] + " | " + cityObj[second][2] + " | " + cityObj[second][3] + "'>" + cityObj[second][1] + "(" + cityObj[second][6] + ")(" + cityObj[second][0].toUpperCase() + ")</li>";
                                number++;
                            }
                        }
                    }
                }
            }

            // 缩写 如果又符合加进去
            for (var third = 0; third < cityLength; third++) {
                if (number > 10) {
                    break;
                }
                var $cityName = cityObj[third][1],
                    $CityPY = cityObj[third][2].toUpperCase(),
                    $CityShortPy = cityObj[third][3].split("|")[0].toUpperCase();
                if ($cityName.indexOf(cityName) !== -1 || $CityPY.indexOf(cityName) !== -1 || $CityShortPy.indexOf(cityName) !== -1) {
                    var tmp = "<li cityObj = '" + cityObj[third][0].toUpperCase() + " | " + cityObj[third][1] + " | " + cityObj[third][2] + " | " + cityObj[third][3] + "'>" + cityObj[third][1] + "(" + cityObj[third][6] + ")(" + cityObj[third][0].toUpperCase() + ")</li>";
                    if (searchString.indexOf(tmp) !== -1) {
                        continue
                    }
                    bl = true;
                    searchString += "<li cityObj = '" + cityObj[third][0].toUpperCase() + " | " + cityObj[third][1] + " | " + cityObj[third][2] + " | " + cityObj[third][3] + "'>" + cityObj[third][1] + "(" + cityObj[third][6] + ")(" + cityObj[third][0].toUpperCase() + ")</li>";
                    number++;
                }
            }

            searchString += '</ul>';
            if (!bl) {
                $("#resultCity").append("<ul><li>无条件符合</li></ul>");
            }
            $("#resultCity").append(searchString);
            $("#resultCity li:first").addClass("selected");

            //显示div
            $("#resultCity").show();
            $("#resultCity").css("position", "absolute");
            $("#resultCity").css({ "left": x, "top": y + 5 });
            $("#resultCity li").each(function () {
                $(this).click(function () {
                    global.searchLiClick(this);
                });
            });
        };


        //按键下键的移动选择被选中的项
        global.keydownDown = function () {
            var select = $("#resultCity li.selected");
            $("#resultCity li.selected").removeClass();
            if ($(select).next().length !== 0) {
                $(select).next().addClass("selected");
            }
            else {
                $("#resultCity li:eq(0)").addClass("selected");
            }
            return;
        };

        //按键上键的移动选择被选中的项
        global.keydownUp = function () {
            var select = $("#resultCity li.selected");
            $(select).removeClass();
            if ($(select).prev().length !== 0) {
                $(select).prev().addClass("selected");
            }
            else {
                $("#resultCity li:last").addClass("selected");
            }
            return;
        }
    }

    function InitEnd() {
        //查询结果选中
        globalEnd.inputvalue = '';
        globalEnd.cityChoose = '';
        globalEnd.citysFlightNew = '';
        globalEnd.AddInput = $("<input name='cityObjEnd' type='hidden' />");
        globalEnd.searchLiClick = function (obj) {
            globalEnd.cityChoose.val($.trim($(obj).attr("cityObj").split('|')[1]));
            global.cityChoose.next("input[name='cityObjEnd']").val($(obj).attr("cityObj"));
            $("#resultCityEnd").remove();
        };
        //选中城市
        globalEnd.chooseClick = function (astr) {
            globalEnd.cityChoose.val($.trim($(astr).html()));
            global.cityChoose.next("input[name='cityObjEnd']").val($(astr).attr("cityObj"));
            $("#popCityEnd").remove();
        };
        //点击body的其他地方
        globalEnd.cancelBody = function () {
            $(document).on("click", function (e) {
                var target = $(e.target);
                //判断是否点击在input或者弹出层上，若不是，则隐藏弹出层
                if (target.closest("#popCityEnd").length === 0 && target.closest(self).length === 0 && target.closest("#resultCityEnd").length === 0) {
                    $("#popCityEnd").remove();
                    if ($("#resultCityEnd").is(":visible")) {
                        var cityObjSelect = $("#resultCityEnd li.selected").attr("cityObj");
                        if (cityObjSelect) {
                            var select = $("#resultCityEnd li.selected").attr("cityObj").split('|')[1];
                            globalEnd.cityChoose.val($.trim(select));
                            global.cityChoose.next("input[name='cityObjEnd']").val($.trim($("#resultCityEnd li.selected").attr("cityObj")));
                        }
                        $("#resultCityEnd").remove();
                    }
                }
            });
        };
        //根据input的内容，显示对应的块
        globalEnd.ReShow = function (obj) {
            var cityLength = globalEnd.citysFlightNew.length,
                spell = "";
            for (var i = 0; i < cityLength; i++) {
                if (obj === globalEnd.citysFlightNew[i][1] && i >= 26) {
                    spell = globalEnd.citysFlightNew[i][2].substr(0, 1).toUpperCase();
                    break;
                }
            }
            if (spell !== "") {
                $('#popCityEnd_title li').each(function () {
                    var ht = $(this).html();
                    if (ht.indexOf(spell) !== -1) {
                        globalEnd.liClick($(this));
                    }
                });
            }
        };
        //26个英文字母的li切换
        globalEnd.liClick = function (obj) {
            var index2 = $(obj).index();
            $(obj).siblings().removeClass("active");
            $(obj).addClass("active");
            var content = $("#popCityEnd_content").find(".popCity_Content_Content");
            $(content[index2]).siblings().hide().end().show();
        };
        //获取鼠标的点击位置
        globalEnd.mousePos = function (e) {
            var x,
                y,
                e = e || window.event;
            return {
                x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
            };
        };
        //取消按钮的点击
        globalEnd.cancel = function () {
            globalEnd.cityChoose.val(globalEnd.inputvalue);
            $("#popCityEnd").remove();
        };
        //根据输入框的内容显示列表
        globalEnd.SpellSearch = function (obj, x, y) {
            if ($(obj).val() === "") {
                return;
            }
            $("#popCityEnd").remove();
            if ($("#resultCityEnd").length <= 0) {
                var divSearch = '<div id="resultCityEnd" class="popCityEnd-hide"></div>';
                $("body").append(divSearch);
            }
            $("#resultCityEnd").html("");

            var cityLength = globalEnd.citysFlightNew.length, //城市总数
                cityName = $(obj).val().toUpperCase(),
                bl = false,
                number = 0,
                searchString = '<ul>',
                cityObj = globalEnd.citysFlightNew;

            // 缩写三字码 如果又符合加进去
            for (var first = 0; first < cityLength; first++) {
                if (number > 10) {
                    break;
                }
                var $firstThis = cityObj[first][0].toUpperCase();
                if ($firstThis.indexOf(cityName) !== -1) {
                    bl = true;
                    searchString += "<li cityObj = '" + cityObj[first][0].toUpperCase() + " | " + cityObj[first][1] + " | " + cityObj[first][2] + " | " + cityObj[first][3] + "'>" + cityObj[first][1] + "(" + cityObj[first][6] + ")(" + cityObj[first][0].toUpperCase() + ")</li>";
                    number++;
                }
            }

            // 缩写后面的三字码 如果又符合加进去
            for (var second = 0; second < cityLength; second++) {
                if (number > 10) {
                    break;
                }
                var $this = cityObj[second][3];
                if ($this.indexOf("|") !== -1) {
                    var shortPylen = $this.split("|").length;
                    if (shortPylen > 1) {
                        for (var item = 1; item < shortPylen; item++) {
                            var $shortCode = $this.split("|")[item].toUpperCase();
                            if ($shortCode.indexOf(cityName) !== -1 && $shortCode !== cityObj[second][0].toUpperCase()) {
                                bl = true;
                                searchString += "<li cityObj = '" + cityObj[second][0].toUpperCase() + " | " + cityObj[second][1] + " | " + cityObj[second][2] + " | " + cityObj[second][3] + "'>" + cityObj[second][1] + "(" + cityObj[second][6] + ")(" + cityObj[second][0].toUpperCase() + ")</li>";
                                number++;
                            }
                        }
                    }
                }
            }

            // 缩写 如果又符合加进去
            for (var third = 0; third < cityLength; third++) {
                if (number > 10) {
                    break;
                }
                var $cityName = cityObj[third][1],
                    $CityPY = cityObj[third][2].toUpperCase(),
                    $CityShortPy = cityObj[third][3].split("|")[0].toUpperCase();
                if ($cityName.indexOf(cityName) !== -1 || $CityPY.indexOf(cityName) !== -1 || $CityShortPy.indexOf(cityName) !== -1) {
                    var tmp = "<li cityObj = '" + cityObj[third][0].toUpperCase() + " | " + cityObj[third][1] + " | " + cityObj[third][2] + " | " + cityObj[third][3] + "'>" + cityObj[third][1] + "(" + cityObj[third][6] + ")(" + cityObj[third][0].toUpperCase() + ")</li>";
                    if (searchString.indexOf(tmp) !== -1) {
                        continue
                    }
                    bl = true;
                    searchString += "<li cityObj = '" + cityObj[third][0].toUpperCase() + " | " + cityObj[third][1] + " | " + cityObj[third][2] + " | " + cityObj[third][3] + "'>" + cityObj[third][1] + "(" + cityObj[third][6] + ")(" + cityObj[third][0].toUpperCase() + ")</li>";
                    number++;
                }
            }

            searchString += '</ul>';

            if (!bl) {
                $("#resultCityEnd").append("<ul><li>无条件符合</li></ul>");
            }
            $("#resultCityEnd").append(searchString);
            $("#resultCityEnd li:first").addClass("selected");

            //显示div
            $("#resultCityEnd").show();
            $("#resultCityEnd").css("position", "absolute");
            $("#resultCityEnd").css({ "left": x, "top": y + 5 });
            $("#resultCityEnd li").each(function () {
                $(this).click(function () {
                    globalEnd.searchLiClick(this);
                });
            });
        };

        //按键下键的移动选择被选中的项
        globalEnd.keydownDown = function () {
            var select = $("#resultCityEnd li.selected");
            $("#resultCityEnd li.selected").removeClass();
            if ($(select).next().length !== 0) {
                $(select).next().addClass("selected");
            }
            else {
                $("#resultCityEnd li:eq(0)").addClass("selected");
            }
            return;
        };

        //按键上键的移动选择被选中的项
        globalEnd.keydownUp = function () {
            var select = $("#resultCityEnd li.selected");
            $(select).removeClass();
            if ($(select).prev().length !== 0) {
                $(select).prev().addClass("selected");
            }
            else {
                $("#resultCityEnd li:last").addClass("selected");
            }
            return;
        }
    }
})(jQuery);
