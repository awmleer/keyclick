var i=-1;
var thisversion="1.1";

result="a";
input="input";
var url=window.location.href;
if(url.match("//www.baidu.com")!=null){
    result="h3.t";
    input="kw";
}else if(url.match("//www.sogou.com")!=null){
    result="div.results h3";
    input="upquery";
}else if(url.match("//cn.bing.com")!=null){
    result="#b_results h2";
    input="sb_form_q";
}else if(url.match("//www.haosou.com")!=null){
    result=".result h3";
    input="keyword";
}else if(url.match("//www.google.com")!=null){
    result="h3.r";
    input="lst-ib";
}

document.onkeydown=function(){
    var key = event.keyCode;

    if(document.activeElement.id==input)return 0;

    //记录使用量
    if(key==39 || key==37){
        if(i==-1){
            $.get("http://121.42.209.162:3031/keyclick/count");
        }
    }

    //right
    if(key==39){
        $(result).eq(i).css("background-color","white");
        i++;
        $(result).eq(i).css("background-color","#FFEEBB");
        $(result).eq(i).children("a")[0].focus();
    }

    //left
    if(key==37){
        $(result).eq(i).css("background-color","white");
        i--;
        $(result).eq(i).css("background-color","#FFEEBB");
        $(result).eq(i).children("a")[0].focus();
    }


};

$(document).ready(function(){
    $.ajax({
        url: "http://121.42.209.162:3031/keyclick/update",
        type: "GET",
        dataType: "json"
    }).done(function(data){
        if(thisversion!=data[0]){
            var htmltemp="<p>发现新版本的keyclick，<a href='" + data[1] + "'>点此下载</a>。</p>";
            $(result).eq(0).before(htmltemp);
        }
    });
});
