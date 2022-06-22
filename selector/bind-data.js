var list_templates = readTSV('./list_template.tsv');
var list_etcs = readTSV('./list_etc.tsv');
(() => {
    // テンプレ重複チェック
    list_etcs.forEach((item, i) => {
        let index = _.findIndex(list_templates, { id: item.id });
        if(index >= 0){
            let tmp_css = _.union(list_templates[index].css.split(' '), item.css.split(' '));
            // let tmp_text = list_templates[index].text + '、' + item.text;
            list_templates[index].css = tmp_css.join(' ');
            // list_templates[index].text = tmp_text;
        }
    });
    // 重複チェック
    let tmp_etcs = [];
    list_etcs.forEach((item, i) => {
        let index = _.findIndex(tmp_etcs, { id: item.id });
        if(index < 0) {
            tmp_etcs.push(item);
        } else {
            let tmp_css = _.union(tmp_etcs[index].css.split(' '), item.css.split(' '));
            let tmp_text = tmp_etcs[index].text + '、' + item.text;
            tmp_etcs[index].css = tmp_css.join(' ');
            tmp_etcs[index].text = tmp_text;
        }
    });
    list_etcs = [].concat(tmp_etcs);
})();

const ListEtcData = {
    data() {
        var datas = _.filter(list_etcs, function(item) {
            let index = _.findIndex(list_templates, { id: item.id });
            return index < 0;
        });
        return { lists: datas }
    },
    mounted() { u('#beid-etc section.list-hidden').removeClass('list-hidden'); }
}

const ListTemplateData = {
    data() {
        return { lists: list_templates }
    },
    mounted() { u('#beid-templates section.list-hidden').removeClass('list-hidden'); }
}

Vue.createApp(ListTemplateData).mount('#beid-templates');
Vue.createApp(ListEtcData).mount('#beid-etc');
