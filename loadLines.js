var data;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


function doSearch(word,lang,grade,resultBox) {
    if (data != null) {
        actualSearch(word,lang,grade,resultBox);
    }
    else {
        $.get("input.txt", function(_data) {
            data = [];
            var templist = _data.split("\r\r\r");
            for (var i = 0; i < templist.length; ++i) {
                var templines = templist[i].split("\r");
                while (templines[0] == "") { templines.shift();}
                data.push({meta: templines.shift(), lines: templines});
            }
            actualSearch(word,lang,grade,resultBox);
        });
    }
}

function actualSearch(word,lang,grade,resultBox) {
    $(resultTable).empty();
    var resultCount = 0;
    $.each(data, function(index,entry){
        for (var i = 0; i < entry.lines.length; ++i) {
            if (entry.lines[i].indexOf(word) > -1) {
                if ((getLang(entry.meta.split("-")[2]) == lang || lang == "") && entry.meta.split("-")[1].indexOf(grade) > -1) {
                    $(resultTable).append(generateLine(word,entry,i));
                    resultCount++;
                }
            }
        }
    });
    $(resultTable).append("<p><small>共"+resultCount+"項結果</small></p>");
}

var langTable={"001":"巴基斯坦","002":"巴基斯坦","003":"巴基斯坦","004":"巴基斯坦","005":"巴基斯坦","006":"巴基斯坦","007":"印度","008":"印度","009":"尼泊爾","010":"巴基斯坦","011":"巴基斯坦","012":"巴基斯坦","013":"巴基斯坦","014":"菲律賓","015":"尼泊爾","016":"尼泊爾","017":"尼泊爾","018":"尼泊爾","019":"巴基斯坦","020":"尼泊爾","021":"巴基斯坦","022":"尼泊爾","023":"尼泊爾","024":"尼泊爾","025":"尼泊爾","026":"菲律賓","027":"尼泊爾","028":"巴基斯坦","029":"尼泊爾","030":"尼泊爾","031":"巴基斯坦"}

function getLang(str) {
    return langTable[str]
}

function generateLine(word,entry,line) {
    return "<tr><td class='annotation'>"
        + entry.meta + "<br>第"  + (line+1) + "行" + "</td><td class='annotation'>" + getLang(entry.meta.split("-")[2]) 
        + "</td><td>" + entry.lines[line].replaceAll(word,"<span style='color: blue'>"+word+"</span>").replaceAll("(","<span class='tags'>(").replaceAll(")",")</span>")
        + "</td></tr>";
}