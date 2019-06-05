<template>
    <div class="html-work">
        <div class="group">
            <Button type="success" @click="handle('p2r')" class="conversion">px2rem</Button>
            <Input placeholder="ratio" v-model="ratio" class="ratio" />
            <Button type="success" @click="handle('r2p')" class="conversion">rem2px</Button>
        </div>
        <div class="html2css">
            <div class="split_box" id="html">
                <textarea ref="htmlcode" v-model="source"></textarea>
            </div>
            <div class="split_box" id="css">
                <textarea ref="csscode" v-model="result"></textarea>
            </div>
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
    // import '../ipc/ipc'
    window.sourceEditor = null;
    window.resultEditor = null;
    export default {
        data() {
            return {
                source: ``,
                result: ``,
                ratio: 100
            }
        },
        methods: {
            handle(type) {
                let _this = this;
                _this.converter(type)
            },
            converter(type) {
                let _this = this
                let source = _this.source;
                let ratio = _this.ratio;
                if (source) {
                    source = $.format(source, {
                        method: "css"
                    }); // 都转换成多行来比较
                    let arr = source.split("\n");
                    let len = arr.length;
                    let res = '';
                    if (type == 'p2r') {
                        for (let i = 0; i < len; i++) {
                            let line = arr[i];
                            res += line.replace(/([1-9]\d*.\d*|0.\d*[1-9]\d*|\d*[1-9]\d*)px/g, function (px) {
                                if (!!px) {
                                    if (!/border:/ig.test(line)) {
                                        return (parseFloat(px) / parseInt(ratio)) + "rem";
                                    } else {
                                        return px;
                                    }
                                }else {
                                    return px;
                                }
                            }) + "\n";
                        }
                    } else if (type == 'r2p') {
                        for (let i = 0; i < len; i++) {
                            let line = arr[i];
                            res += line.replace(/([1-9]\d*.\d*|0.\d*[1-9]\d*|\d*[1-9]\d*)rem/g, function (rem) {
                                if (!!rem) {
                                    if (!/border:/ig.test(line)) {
                                        return (parseFloat(rem) * parseInt(ratio)) + "px";
                                    } else {
                                        return rem;
                                    }
                                } else {
                                    return rem;
                                }
                            }) + "\n";
                        }
                    }

                    if (len > 1) {
                        res = $.format(res, {
                            method: "css"
                        });
                    } else {
                        res = $.format(res, {
                            method: "cssmin"
                        });
                    }
                    _this.result = res
                    resultEditor.setValue(_this.result);
                }

            },
            initEditor() {
                let _this = this
                sourceEditor = CodeMirror.fromTextArea(_this.$refs.htmlcode, {
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

                resultEditor = CodeMirror.fromTextArea(_this.$refs.csscode, {
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
                sourceEditor.on('changes', function (cm, ins) {
                    cm.save();
                    _this.source = cm.getValue();
                })

                resultEditor.on('changes', function (cm, ins) {
                    cm.save();
                    _this.result = cm.getValue();
                })
            }
        },
        mounted() {
            this.initEditor();
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
        width: 50%;
        height: 100%;
        font-size: 14px;
        vertical-align: top;
        background: #fff;
        border-right: 1px solid #fff;
        overflow-y: auto;
    }

    .split_box:last-child {
        border: none;
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


    .group {
        position: absolute;
        z-index: 999;
        width: 100px;
        height: 50px;
        cursor: pointer;
        bottom: 0;
        width: 220px;
        font-size: 0;
    }

    .conversion,
    .ratio {
        width: 30% !important;
        display: inline-block !important;
    }
</style>