// ----- BEIDスレ立て履歴の検索 -----
// 飴 ◆HACCA.6g7gAV さん、ありがとうそしてごめんなさい
u('article > section div a').handle('click', function() {
    var href = u(this).attr('href');
    window.open(href);
});
// ----------------------------------
// ----- チェックボックスの動作 -----
var result_list = [];
const fnTOGGLE = function(e) {
    let $e = e.currentTarget;
    let val = $e.value;
    let idx = result_list.indexOf(val);
    // console.log(val + '：' + $e.checked);
    if($e.checked === true) {
        result_list.push(val);
    } else if(idx >= 0) {
        result_list.splice(idx, 1);
    }
    let tmp_result = [].concat(result_list);
    result_list = tmp_result.filter((v, i, a) => (a.indexOf(v) == i));
    result_list.sort();
    // console.log(result_list);
    u('input#regexp-result-value').first().value = result_list.join('|');
};
u('article > section label input:not(.checked-all)').handle('change', fnTOGGLE);
u('article > section label input.checked-all').handle('change', function() {
    let $article = u(this).closest('article');
    let $checkboxs = $article.find('section label input:not(.checked-all)');
    $checkboxs.each(node => node.checked = this.checked).trigger('change');
});
// ----------------------------------
// ----------------------------------
(() => {
    // ----- 上に戻る -----
    // picniccss.com/documentation からコピペ
    u('footer button#elevator').handle('click', function() {
        document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
    });
    u([window]).on('scroll', function() {
        var top = this.scrollY || document.documentElement.scrollTop;
        u('footer button#elevator').toggleClass('visible', top > 200);
    }).trigger('scroll');
    // ----------------------------------
    // ----- チェック短縮 -----
    u('button[id^="check-toggle"]').handle('click', function() {
        // 特定トグル
        let class_name = this.id.split('-').pop();
        u('article section label.' + class_name + ' input[type="checkbox"]')
        .each((node, i) => { node.checked = !node.checked; }).trigger('change');
    });
    u('button#check-disabled-all').handle('click', function() {
        // 全クリア
        u('input.checked-all').each((node, i) => { node.checked = false; }).trigger('change');
    });
})();
