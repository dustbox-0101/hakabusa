const readTEXT = function(filename) {
    var t = '';
    (() => {
        let r = new XMLHttpRequest();
        r.open('GET', filename, false);
        r.addEventListener('load', function() { t = this.responseText; });
        r.send();
    })();
    return t;
}

// ---------- テンプレート.txtの読み込み ----------
var $areas = u('textarea').array(function(node) { return node; });
var ids = $areas.map(node => u(node).attr('id'));
var values = [];
// console.log(ids);
ids.forEach(function(id) {
    var filename = id.split('-')[1] + '.txt';
    var t = readTEXT(filename);
    values.push(Object.assign({}, {id: id, text: t}));
});
// console.log(values);

(() => {
    values.forEach(item => { u('#'+ item.id).first().value = item.text; });
})();
