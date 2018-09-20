!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vue-client-table",[],e):"object"==typeof exports?exports["vue-client-table"]=e():t["vue-client-table"]=e()}(window,function(){return function(t){var e={};function s(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(o,n,function(e){return t[e]}.bind(null,n));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=7)}([function(t,e,s){},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{data:Array,columns:Array,searchQuery:String,loading:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}},defaults:{type:Object,default:function(){return{headings:{},templates:{},search:{},groupBy:!1,toggleGroups:!1,groupMeta:{},uniqueKey:"id",childRow:!1,expandText:"Show details",collapseText:"Hide details",sortable:!0,pagination:!0,perPage:10,pageInterval:9,perPageValues:[1,2,5,10,20,50],editable:!1,noDataMsg:"No data to show",emptyResultsMsg:"No results for this filter",loadingMsg:"Loading ...",sortCollator:new Intl.Collator("en",{numeric:!0,sensitivity:"base"})}}}},data:function(){var t={};return this.columns.forEach(function(e){t[e]=null}),{allSelected:!1,selectedRows:[],sortOrders:t,sortKey:"",searchBy:"",shown:{},expandedRows:{},currentPage:1,perPage:this.options.perPage||this.defaults.perPage}},computed:{opts:function(){var t=Object.assign({},this.defaults,this.options),e={},s={};return this.columns.forEach(function(o){(!0===t.sortable||t.sortable[o])&&(e[o]=t.sortable[o]||!0),void 0===t.search[o]?s[o]=!0:s[o]=t.search[o]}),Object.assign(t,{sortable:e,search:s})},pagesToShow:function(){var t=(this.opts.pageInterval-1)/2,e=Math.max(1,this.currentPage-t),s=Math.min(this.totalPages,this.currentPage+t);if(this.totalPages<=this.opts.pageInterval)e=1,s=this.totalPages;else for(;s-e<this.opts.pageInterval-1;)s=Math.min(this.totalPages,e+this.opts.pageInterval-1),e=Math.max(1,s-this.opts.pageInterval+1);for(var o=[],n=e;n<=s;n+=1)o.push(n);return o},totalPages:function(){return Math.ceil(this.filteredData.length/this.perPage)},startRow:function(){return(this.currentPage-1)*this.perPage},endRow:function(){return Math.min(this.startRow+this.perPage,this.totalRows)},totalRows:function(){return this.filteredData.length},filteredData:function(){var t=this,e=this.data,s=this.searchBy&&this.searchBy.toLowerCase();return s&&(e=e.filter(function(e){return Object.keys(t.opts.search).some(function(o){return"function"==typeof t.opts.search[o]?t.opts.search[o](e,o,s):String(e[o]).toLowerCase().indexOf(s)>-1})})),e},pageData:function(){var t=this,e=this.sortKey,s=this.filteredData,o=null!==this.sortOrders[e]?"ascending"===this.sortOrders[e]?1:-1:0;if(e&&this.opts.sortable&&o){var n=void 0;!0===this.opts.sortable[e]?n=function(s,n){var a=String(s[e]),r=String(n[e]);return t.opts.sortCollator.compare(a,r)*o}:"function"==typeof this.opts.sortable[e]&&(n=function(s,n){return t.opts.sortable[e](s,n)*o}),s=s.slice().sort(n)}return this.opts.pagination&&(s=s.slice(this.startRow,this.endRow)),this.opts.groupBy?s.reduce(function(e,s){return(e[s[t.opts.groupBy]]=e[s[t.opts.groupBy]]||[]).push(s),e},{}):{all:s}}},filters:{heading:function(t,e){return void 0!==e[t]?e[t]:t.charAt(0).toUpperCase()+t.slice(1)}},methods:{search:function(t){this.searchBy=t},sortBy:function(t){var e=this;this.opts.sortable[t]&&(this.sortKey=t,this.columns.forEach(function(t){t!==e.sortKey&&(e.sortOrders[t]=null)}),this.sortOrders[t]=null===this.sortOrders[t]?"ascending":"ascending"===this.sortOrders[t]?"descending":null)},isShown:function(t){return void 0===this.shown[t]||this.shown[t]},toggleGroup:function(t){this.shown[t]=void 0!==this.shown[t]&&!this.shown[t],this.shown=Object.assign({},this.shown)},toggleRow:function(t){this.expandedRows[t]=!this.expandedRows[t],this.expandedRows=Object.assign({},this.expandedRows)},isRowExpanded:function(t){return this.expandedRows[t]},goToPage:function(t){t>=1&&t<=this.totalPages&&(this.currentPage=t)},selectAll:function(){var t=this;this.allSelected?this.selectedRows=[]:this.selectedRows=this.filteredData.reduce(function(e,s){return s.showSelect&&e.push(s[t.opts.uniqueKey]),e},[])},setAllSelected:function(){this.allSelected=this.selectedRows.length>0&&this.selectedRows.length===this.filteredData.filter(function(t){return t.showSelect}).length},getToggleText:function(t){return this.isRowExpanded(t[this.opts.uniqueKey])?this.opts.collapseText:this.opts.expandText}},watch:{searchQuery:function(t){this.searchBy=t},searchBy:function(){this.currentPage=1},filteredData:function(){var t=this;this.selectedRows=this.filteredData.reduce(function(e,s){return s.showSelect&&s.selected&&e.push(s[t.opts.uniqueKey]),e},[])},selectedRows:function(){var t=this;this.setAllSelected();var e=this.selectedRows.reduce(function(t,e){return t[e]=!0,t},{}),s=[];this.filteredData.forEach(function(o){o.showSelect&&(o.selected=e[o[t.opts.uniqueKey]]||!1,o.selected&&s.push(o))}),this.$emit("selectedRows",s)},totalPages:function(){this.currentPage>this.totalPages?this.currentPage=this.totalPages:!this.currentPage&&this.totalPages&&(this.currentPage=1)}}}},function(t,e,s){"use strict";s.r(e);var o=s(1),n=s.n(o);for(var a in o)"default"!==a&&function(t){s.d(e,t,function(){return o[t]})}(a);e.default=n.a},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._t("filter",[s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-2"},[t._t("filters",[s("div",{staticClass:"form-group"},[s("label",[t._v("Search")]),t._v(" "),s("div",{staticClass:"input-group"},[s("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Search by keyword"},on:{input:function(e){t.search(e.target.value)}}}),t._v(" "),t._m(0)])])])],2),t._v(" "),s("div",{staticClass:"col-md-10"},[s("div",{staticClass:"pull-right"},[s("div",{staticClass:"form-group"},[s("label",[t._v(" ")]),t._v(" "),s("div",[t._t("buttons")],2)])])])])])]),t._v(" "),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table"},[s("thead",[s("tr",[t._l(t.columns,function(e){return s("th",{key:e,class:{sortable:t.opts.sortable[e],sorted:t.sortKey===e},on:{click:function(s){t.sortBy(e)}}},[t._t("heading_"+e,["select"===e?[s("div",{staticClass:"checkbox"},[s("label",[s("input",{staticClass:"check-all",attrs:{type:"checkbox",disabled:!t.opts.editable},domProps:{checked:t.allSelected},on:{change:t.selectAll}})])])]:[t._v("\n                "+t._s(t._f("heading")(e,t.opts.headings))+"\n              ")]]),t._v(" "),t.opts.sortable[e]?s("i",{staticClass:"fa",class:{"fa-sort":t.sortKey!==e||null===t.sortOrders[e],"fa-sort-asc":t.sortKey===e&&"ascending"===t.sortOrders[e],"fa-sort-desc":t.sortKey===e&&"descending"===t.sortOrders[e]}}):t._e()],2)}),t._v(" "),t.opts.childRow?s("th",[t._t("heading_actions",[t._v("\n              Actions\n            ")])],2):t._e()],2)]),t._v(" "),t.loading?s("tbody",[s("tr",[s("td",{attrs:{colspan:t.columns.length+(t.opts.childRow?1:0)}},[t._v("\n            "+t._s(t.opts.loadingMsg)+"\n          ")])])]):0===t.data.length?s("tbody",[s("tr",[s("td",{attrs:{colspan:t.columns.length+(t.opts.childRow?1:0)}},[t._v("\n            "+t._s(t.opts.noDataMsg)+"\n          ")])])]):0===t.filteredData.length?s("tbody",[s("tr",[s("td",{attrs:{colspan:t.columns.length+(t.opts.childRow?1:0)}},[t._v("\n            "+t._s(t.opts.emptyResultsMsg)+"\n          ")])])]):t._l(t.pageData,function(e,o){return s("tbody",{key:o},["all"!==o?s("tr",[s("th",{attrs:{colspan:t.columns.length+(t.opts.childRow?1:0)}},[s("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.toggleGroup(o)}}},[s("i",{staticClass:"fa",class:{"fa-chevron-down":t.isShown(o),"fa-chevron-right":!t.isShown(o)}})]),t._v(" "),t._t("__group_meta",[t._v("\n              "+t._s(o)+"\n            ")],{data:t.opts.groupMeta[o]})],2)]):t._e(),t._v(" "),t._l(e,function(e,n){return[t.isShown(o)?s("tr",{key:"row_"+e[t.opts.uniqueKey],attrs:{"data-id":e[t.opts.uniqueKey]}},[t._l(t.columns,function(o){return s("td",{key:"cell_"+o},[t._t("column_"+o,[t.opts.templates[o]?s(t.opts.templates[o],{tag:"component",attrs:{data:e,column:o,index:n}}):"select"===o?[e.showSelect?s("div",{staticClass:"checkbox"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedRows,expression:"selectedRows"}],key:"select-"+e[t.opts.uniqueKey],attrs:{type:"checkbox",name:"selectedRows",disabled:!t.opts.editable},domProps:{value:e[t.opts.uniqueKey],checked:Array.isArray(t.selectedRows)?t._i(t.selectedRows,e[t.opts.uniqueKey])>-1:t.selectedRows},on:{change:function(s){var o=t.selectedRows,n=s.target,a=!!n.checked;if(Array.isArray(o)){var r=e[t.opts.uniqueKey],i=t._i(o,r);n.checked?i<0&&(t.selectedRows=o.concat([r])):i>-1&&(t.selectedRows=o.slice(0,i).concat(o.slice(i+1)))}else t.selectedRows=a}}})])]):t._e()]:[t._v(t._s(e[o]))]],{row:e})],2)}),t._v(" "),t.opts.childRow?s("td",[t._t("column_actions_pre",null,{row:e}),t._v(" "),t._t("column_actions",[s("a",{attrs:{href:"#"},domProps:{innerHTML:t._s(t.getToggleText(e))},on:{click:function(s){s.preventDefault(),t.toggleRow(e[t.opts.uniqueKey])}}})],{row:e}),t._v(" "),t._t("column_actions_post",null,{row:e})],2):t._e()],2):t._e(),t._v(" "),t.opts.childRow&&t.isShown(o)?s("tr",{directives:[{name:"show",rawName:"v-show",value:t.isRowExpanded(e[t.opts.uniqueKey]),expression:"isRowExpanded(entry[opts.uniqueKey])"}],key:"child_row_"+e[t.opts.uniqueKey],attrs:{"data-child":e[t.opts.uniqueKey]}},[s("td",{attrs:{colspan:t.columns.length+(t.opts.childRow?1:0)}},[t._t("child_row",null,{row:e})],2)]):t._e()]})],2)})],2)]),t._v(" "),t.opts.pagination?s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("nav",{attrs:{"aria-label":"Page navigation"}},[s("ul",{staticClass:"pagination"},[s("li",{class:{disabled:1===t.currentPage}},[s("a",{attrs:{href:"#","aria-label":"Firs"},on:{click:function(e){e.preventDefault(),t.goToPage(1)}}},[t._m(1)])]),t._v(" "),s("li",{class:{disabled:1===t.currentPage}},[s("a",{attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){e.preventDefault(),t.goToPage(t.currentPage-1)}}},[t._m(2)])]),t._v(" "),t._l(t.pagesToShow,function(e){return s("li",{key:e,class:{active:e===t.currentPage}},[s("a",{attrs:{href:"#"},on:{click:function(s){s.preventDefault(),t.goToPage(e)}}},[t._v(t._s(e))])])}),t._v(" "),s("li",{class:{disabled:t.currentPage===t.totalPages||0===t.totalPages}},[s("a",{attrs:{href:"#","aria-label":"Next"},on:{click:function(e){e.preventDefault(),t.goToPage(t.currentPage+1)}}},[t._m(3)])]),t._v(" "),s("li",{class:{disabled:t.currentPage===t.totalPages||0===t.totalPages}},[s("a",{attrs:{href:"#","aria-label":"Last"},on:{click:function(e){e.preventDefault(),t.goToPage(t.totalPages)}}},[t._m(4)])])],2)])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-inline recordsInfo"},[t.totalRows?s("div",[s("div",{staticClass:"form-group"},[s("p",{staticClass:"form-control-static"},[t._v("\n              Showing "+t._s(t.startRow+1)+" to "+t._s(t.endRow)+" of "+t._s(t.totalRows)+" rows\n            ")])]),t._v(" "),s("div",{staticClass:"form-group"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.perPage,expression:"perPage"}],staticClass:"perPageSelector form-control",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.perPage=e.target.multiple?s:s[0]}}},t._l(t.opts.perPageValues,function(e){return s("option",{key:e,domProps:{value:e}},[t._v("\n                "+t._s(e)+"\n              ")])}))]),t._v(" "),t._m(5)]):s("div",{staticClass:"form-group"},[s("p",{staticClass:"form-control-static"},[t._v("\n            No rows to display\n          ")])])])])]):t._e()],2)},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"input-group-addon"},[e("i",{staticClass:"fa fa-search"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{attrs:{"aria-hidden":"true"}},[e("i",{staticClass:"fa fa-angle-double-left"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{attrs:{"aria-hidden":"true"}},[e("i",{staticClass:"fa fa-angle-left"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{attrs:{"aria-hidden":"true"}},[e("i",{staticClass:"fa fa-angle-right"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{attrs:{"aria-hidden":"true"}},[e("i",{staticClass:"fa fa-angle-double-right"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-group"},[e("p",{staticClass:"form-control-static"},[this._v("\n              records per page\n            ")])])}];o._withStripped=!0,s.d(e,"a",function(){return o}),s.d(e,"b",function(){return n})},function(t,e,s){"use strict";function o(t,e,s,o,n,a,r,i){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=s,c._compiled=!0),o&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):n&&(l=i?function(){n.call(this,this.$root.$options.shadowRoot)}:n),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}s.d(e,"a",function(){return o})},,function(t,e,s){"use strict";var o=s(0);s.n(o).a},function(t,e,s){"use strict";s.r(e);var o=s(3),n=s(2);for(var a in n)"default"!==a&&function(t){s.d(e,t,function(){return n[t]})}(a);s(6);var r=s(4),i=Object(r.a)(n.default,o.a,o.b,!1,null,null,null);i.options.__file="src\\client-table.vue",e.default=i.exports}])});