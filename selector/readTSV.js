const createObject = function(txt) {
    var cols = txt.split(/\t/);
    var obj = {
        id: cols[0],
        css: cols[1].trim(),
        text: cols[2].trim()
    }
    return Object.assign({}, obj);
}

const readTSV = function(filename) {
    var t = '';
    (() => {
        var r = new XMLHttpRequest();
        r.open('GET', filename, false);
        r.addEventListener('load', function() { t = this.responseText; });
        r.send();
    })();
    var lines = t.split(/\n/).filter(val => val.length > 0);
    var lists = [];
    lines.forEach((item, i) => {
        let obj = createObject(item);
        lists.push(obj);
    });
    lists = _.reject(lists, obj => (obj.css.split('').indexOf('remove') >= 0));
    lists = _.sortBy(lists, 'id');
    return lists;
}
