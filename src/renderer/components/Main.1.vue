<template>
    <div>
        <!-- <div class="html-work">
            <div class="html2css">
                <div class="box">
                    <textarea ref="htmlcode" v-model="html"></textarea>
                </div>
                <div class="box">
                    <textarea ref="csscode" v-model="output"></textarea>
                </div>
                <div class="box">
                    <div ref="view" class="html-view"></div>
                </div>
            </div>
        </div> -->
        <div class="html-work">
            <Split v-model="split" class="html2css" on-move-end="moveEnd">
                <div slot="left" class="demo-split-pane no-padding">
                    <Split v-model="split2" mode="vertical" class="html2css">
                        <div slot="top" class="split_box">
                            <textarea ref="htmlcode" v-model="html"></textarea>
                        </div>
                        <div slot="bottom" class="split_box">
                            <textarea ref="csscode" v-model="output"></textarea>
                        </div>
                    </Split>
                </div>
                <div slot="right" class="split_box">
                    <div ref="view" class="html-view"></div>
                </div>
            </Split>
        </div>
    </div>



</template>


<script>
    import "codemirror/theme/cobalt.css";
    import "codemirror/theme/yonce.css"
    import "codemirror/theme/midnight.css"
    import "codemirror/theme/mdn-like.css"
    import "codemirror/theme/lucario.css"
    import "codemirror/addon/dialog/dialog.css"
    import "codemirror/lib/codemirror.css";
    import "codemirror/addon/hint/show-hint.css";
    import {
        setTimeout
    } from 'timers';

    let CodeMirror = require("codemirror/lib/codemirror");
    require("codemirror/addon/edit/matchbrackets");
    require("codemirror/addon/selection/active-line");
    require("codemirror/mode/xml/xml");
    require("codemirror/mode/css/css");
    require("codemirror/addon/hint/show-hint");
    require("codemirror/addon/hint/html-hint");
    require("codemirror/addon/hint/css-hint");
    require("codemirror/addon/edit/closetag");
    require("codemirror/addon/search/search");
    require("codemirror/addon/search/searchcursor");
    require("codemirror/addon/search/jump-to-line");
    require("codemirror/addon/dialog/dialog");
    require("codemirror/addon/display/autorefresh");



    window.htmlEditor = null;
    window.cssEditor = null;
    window.shadow = null;
    export default {
        data() {
            return {
                html: `<div>
	<h2>
		Html<span>2</span>CSS
	</h2>
</div>`,
                output: `div{
	width:100%;
	height:250px;
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	margin:auto;
	text-align:center;
	line-height:100px;
}
div h2{
	font-size:500%;
	color:#111
}
div h2 span{
	color:#F00
}`,
                cssArr: [],
                autoCss: [],
                // inputCss: [],
                split: 0.5,
                split2: 0.5,
                preview: ``
            }
        },
        methods: {
            transform() {
                let _this = this
                try {
                    let dom = _this.egUtils.trim(_this.html, 'side').split('')[0] == '<' ? _this.$(_this.html) : '';
                    _this.cssArr = [];
                    console.log(dom);
                    if (!_this.egUtils.isEmpty(dom)) {
                        for (let i = 0; i < dom.length; i++) {
                            if (dom.eq(i).get(0).tagName) {
                                _this.toCss(_this.eachDom(dom.eq(i), {}));
                                console.log(_this.autoCss);
                                // _this.output = _this.toText(_this.matchEle(_this.autoCss, cssEditor.getTextArea()
                                //     .value))
                                console.log(_this.cssArr);
                                _this.output = _this.cssArr.join('\n')
                            }
                        }
                    } else {
                        _this.output = ``
                    }
                    _this.$nextTick(function () {
                        htmlEditor.refresh();
                        cssEditor.setValue(_this.output);
                        shadow.innerHTML = _this.preview
                    })


                } catch (error) {
                    console.warn('标签输入不完整');
                }
            },
            toCss(data) {
                let _this = this;
                for (let i in data) {
                    if (data[i]) {
                        _this.cssArr.push(`${data[i].result}{\n\n}`)
                        _this.autoCss.push(`${data[i].result}`)
                        _this.toCss(data[i].children);
                    }
                }
            },
            eachDom: function (dom, obj) {
                let tree = [],
                    children;
                for (let i = 0; i < dom.length; i++) {
                    if (dom.length > 0) {
                        let temp = {}
                        temp = {
                            tagName: dom.eq(i).get(0).tagName,
                            className: dom[i].classList[0],
                            index: i,
                            result: ""
                        }
                        if (obj.result) {
                            if (temp.className) {
                                temp.result = `${obj.result} .${temp.className}`
                            } else {
                                temp.result = `${obj.result} ${temp.tagName.toLocaleLowerCase()}`
                            }
                        } else {
                            temp.result = !temp.className ? `${temp.tagName.toLocaleLowerCase()}` :
                                `.${temp.className}`
                        }
                        children = this.eachDom(dom.eq(i).children(), temp);
                        if (children.length > 0) {
                            temp.children = children
                        }
                        tree.push(temp);
                    }
                }
                return tree;
            },
            initEditor() {
                let _this = this
                htmlEditor = CodeMirror.fromTextArea(this.$refs.htmlcode, {
                    mode: 'text/html',
                    indentWithTabs: true,
                    smartIndent: false,
                    matchBrackets: true,
                    theme: 'lucario',
                    styleActiveLine: true,
                    lineNumbers: true,
                    styleSelectedText: false,
                    autoCloseTags: true,
                    line: true,
                    extraKeys: {
                        'Ctrl': 'autocomplete'
                    },
                    hintOptions: {
                        completeSingle: false
                    }
                })

                cssEditor = CodeMirror.fromTextArea(this.$refs.csscode, {
                    mode: 'text/css',
                    indentWithTabs: true,
                    smartIndent: false,
                    matchBrackets: true,
                    theme: 'lucario',
                    styleActiveLine: true,
                    lineNumbers: true,
                    styleSelectedText: false,
                    autoCloseTags: true,
                    line: true,
                    extraKeys: {
                        'Ctrl': 'autocomplete'
                    },
                    hintOptions: {
                        completeSingle: false
                    }
                })

                htmlEditor.on('changes', function (cm, ins) {
                    if (_this.htmlTagCheck(cm.getValue())) {
                        _this.autoCss = [];
                        cm.save();
                        _this.html = cm.getValue();
                        _this.transform();
                    }
                })

                cssEditor.on('changes', function (cm, ins) {
                    cm.save();
                    _this.output = cm.getValue();
                    _this.preview = _this.html + `<style>${_this.output}</style>`;
                    shadow.innerHTML = _this.preview;
                })


            },
            shadowDOM() {
                shadow = this.$refs.view.createShadowRoot();
            },
            welcome() {
                setTimeout(() => {
                    this.$nextTick(function () {
                        htmlEditor.refresh();
                        cssEditor.refresh();
                        this.preview = this.html + `<style>${this.output}</style>`;
                        shadow.innerHTML = this.preview;
                    })
                }, 50);
            },
            clearBr(key) {
                //清除换行符
                key = key.replace(/[\r\n]/g, "");
                return key;
            },
            removeEmptyArrayEle(arr) {
                //清除数组空元素
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == '' || arr[i] == null || arr[i] == undefined) {
                        arr.splice(i, 1);
                        i = i - 1;
                    }
                }
                return arr;
            },
            matchEle(autocss, inputcss) {
                let _this = this;
                let arrInputCss = _this.toArray(inputcss);
                let objInputCss = _this.toObject(inputcss)
                let diff, same = null;
                let result = [];
                if (autocss.length >= arrInputCss.length) {
                    console.log(autocss);
                    console.log(arrInputCss);
                    diff = this.getArrDifference(autocss, arrInputCss)
                    same = this.getArrEqual(autocss, diff)
                    for (let item of same) {
                        objInputCss.splice(i.index, 0, {
                            name: item.name,
                            value: `\n\n`
                        });
                    }
                    result = objInputCss
                } else {
                    for (let item of autocss) {
                        result.push({
                            name: item,
                            value: `\n\n`
                        })
                    }
                }
                return result

            },
            getArrDifference(a, b) {
                return a.concat(b).filter(function (v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v);
                });
            },
            getArrEqual(a, b) {
                //获取数组相同元素
                let newArr = [];
                for (let i = 0; i < b.length; i++) {
                    for (let j = 0; j < a.length; j++) {
                        if (a[j] === b[i]) {
                            newArr.push({
                                name: a[j],
                                index: j
                            });
                        }
                    }
                }
                return newArr;
            },
            toObject(value) {
                var _this = this
                var temp = _this.removeEmptyArrayEle(value.split(/{([\d\D]*?)}/g))
                var obj = []
                for (var i = 0; i < temp.length; i++) {
                    var index = 0;
                    if (i % 2 == 0) {
                        obj.push({
                            name: _this.clearBr(temp[i]),
                            value: temp[i + 1]
                        })
                    } else {
                        index++;
                    }
                }
                return obj
            },
            toArray(value) {
                return this.removeEmptyArrayEle(this.clearBr(value).replace(/{(.*?)}/g, '|').split('|'))
            },
            toText(value) {
                let res = ''
                value.forEach((item, index) => {
                    if (index == value.length - 1) {
                        res += `${item.name}{${item.value}}`;
                    } else {
                        res += `${item.name}{${item.value}}\n`;
                    }
                });
                return res

            },
            htmlTagCheck(value) {
                //标签是否闭合伪检测
                let res = true;
                let temp = value.replace(/<([^<>]*)>/g, '');
                if (temp.includes('<') || temp.includes('>')) {
                    res = false
                }

                return res;
            },
            moveEnd() {

            }
        },
        mounted() {
            this.shadowDOM()
            this.initEditor();
            this.welcome();
        },
        updated() {


        }
    }
</script>
<style>
    body {
        margin: 0;
        padding: 0;

    }

    .html2css {
        height: 100%;
        font-size: 0;
        position: absolute !important;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0
    }

    .split_box {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 14px;
        vertical-align: top;
        background: #fff;
        /* border-right: 1px solid #fff; */
        overflow-y: auto;
    }

    .split_box>* {
        vertical-align: top;
        height: 100%;

    }

    .html-view {
        padding-left: 6px;
    }

    pre {
        width: 100%;
        height: 100%;
        position: absolute;
        padding: 0;
        margin: 0 !important;
        font-size: 14px !important;
        vertical-align: top;
        border: none;
        overflow-y: auto;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace !important
    }

    .ivu-split-trigger-horizontal,
    .ivu-split-trigger-vertical {
        background: #495e73 !important
    }

    .ivu-split-trigger-horizontal .ivu-split-trigger-bar {
        background: #999 !important
    }

    .ivu-split-trigger {
        border: 1px solid #353638 !important
    }
</style>