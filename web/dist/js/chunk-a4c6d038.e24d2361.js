(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a4c6d038"],{"0532":function(n,o,t){},fc2c:function(n,o,t){"use strict";t.r(o);var e=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("div",{attrs:{id:"dropdown-demo"}},[t("dropdown-default"),t("dropdown-color"),t("dropdown-group-option"),t("dropdown-custom-content"),t("dropdown-button")],1)},s=[],r=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("vx-card",{attrs:{title:"Default","code-toggler":""}},[t("p",[n._v("To add the Dropdown we have three types of components the main "),t("code",[n._v("vs-dropdown")]),n._v(" that contains the element that makes the "),t("code",[n._v("vs-dropdown-menu")]),n._v(" appear and to add each item within it we have the component "),t("code",[n._v("vs-dropdown-item")])]),t("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[n._v("To add an internal link using "),t("a",{attrs:{href:"https://router.vuejs.org/"}},[n._v("vue-router")]),n._v(" you can do them simply by adding the property "),t("a",{attrs:{href:"https://router.vuejs.org/api/#to"}},[n._v("to")]),n._v(" as if it were a "),t("a",{attrs:{href:"https://router.vuejs.org/"}},[n._v("vue-router")]),n._v(" link")]),t("p",[n._v("In case you need an external link or normal html, simply do it with the href property")])]),t("prism",{staticClass:"rounded-lg",attrs:{language:"markup"}},[n._v('\n  \x3c!-- to: internal link --\x3e\n  <vs-dropdown-item to="/myLink">\n    my Link name\n  </vs-dropdown-item>\n\n  \x3c!-- href: external link--\x3e\n  <vs-dropdown-item href="/myLink">\n    my Link name\n  </vs-dropdown-item>\n            ')]),t("div",{staticClass:"mt-5 demo-alignment"},[t("vs-dropdown",[t("a",{staticClass:"flex items-center",attrs:{href:"#"}},[n._v("\n                    Dropdown hover\n                    "),t("i",{staticClass:"material-icons"},[n._v(" expand_more ")])]),t("vs-dropdown-menu",[t("vs-dropdown-item",[n._v("\n                        Option 1\n                    ")]),t("vs-dropdown-item",[n._v("\n                        Option 2\n                    ")]),t("vs-dropdown-item",{attrs:{divider:""}},[n._v("\n                        Option 3\n                    ")])],1)],1),t("vs-dropdown",[t("a",{staticClass:"flex items-center",attrs:{"href.prevent":""}},[n._v("\n                    Dropdown Option Disabled\n                    "),t("i",{staticClass:"material-icons"},[n._v("expand_more")])]),t("vs-dropdown-menu",[t("vs-dropdown-item",[n._v("\n                        Option 1\n                    ")]),t("vs-dropdown-item",{attrs:{disabled:""}},[n._v("\n                        Option 2\n                    ")]),t("vs-dropdown-item",{attrs:{disabled:"",divider:""}},[n._v("\n                        Option 3\n                    ")])],1)],1)],1),t("template",{slot:"codeContainer"},[n._v('\n<div class="demo-alignment">\n\n  <vs-dropdown>\n\n    <a class="flex items-center" href="#">\n      Dropdown hover\n      <i class="material-icons"> expand_more </i>\n    </a>\n\n    <vs-dropdown-menu>\n\n      <vs-dropdown-item>\n        Option 1\n      </vs-dropdown-item>\n\n      <vs-dropdown-item>\n        Option 2\n      </vs-dropdown-item>\n\n      <vs-dropdown-item divider>\n        Option 3\n      </vs-dropdown-item>\n\n    </vs-dropdown-menu>\n  </vs-dropdown>\n\n  <vs-dropdown>\n\n    <a class="flex items-center" href.prevent>\n      Dropdown Option Disabled\n      <i class="material-icons">expand_more</i>\n    </a>\n\n    <vs-dropdown-menu>\n\n      <vs-dropdown-item>\n        Option 1\n      </vs-dropdown-item>\n\n      <vs-dropdown-item disabled>\n        Option 2\n      </vs-dropdown-item>\n      \n      <vs-dropdown-item disabled divider>\n        Option 3\n      </vs-dropdown-item>\n    </vs-dropdown-menu>\n  </vs-dropdown>\n</div>\n        ')])],2)},d=[],i=t("8d51"),a=t.n(i),p={components:{Prism:a.a}},l=p,v=t("2877"),c=Object(v["a"])(l,r,d,!1,null,null,null),m=c.exports,w=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("vx-card",{attrs:{title:"Color","code-toggler":""}},[t("p",[n._v("You can change the color of the component with the property "),t("code",[n._v("color")])]),t("vs-alert",{staticClass:"mt-5",attrs:{icon:"warning",active:"true",color:"warning"}},[t("span",[n._v("Only "),t("strong",[n._v("RGB")]),n._v(" and "),t("strong",[n._v("HEX")]),n._v(" colors are supported.")])]),t("div",{staticClass:"mt-5 demo-alignment"},[t("input",{directives:[{name:"model",rawName:"v-model",value:n.colorx,expression:"colorx"}],attrs:{type:"color"},domProps:{value:n.colorx},on:{input:function(o){o.target.composing||(n.colorx=o.target.value)}}}),t("vs-dropdown",{attrs:{color:n.colorx}},[t("a",{staticClass:"flex items-center",attrs:{href:"#"}},[n._v("\n                    Dropdown hover\n                    "),t("i",{staticClass:"material-icons"},[n._v("expand_more")])]),t("vs-dropdown-menu",[t("vs-dropdown-item",[n._v("\n                        option 1\n                    ")]),t("vs-dropdown-item",[n._v("\n                        option 2\n                    ")]),t("vs-dropdown-item",{attrs:{divider:""}},[n._v("\n                        option 3\n                    ")])],1)],1)],1),t("template",{slot:"codeContainer"},[n._v('\n<template>\n\n    <div class="demo-alignment">\n\n      <input type="color" v-model="colorx">\n\n      <vs-dropdown :color="colorx">\n        <a class="flex items-center" href="#">\n          Dropdown hover\n          <i class="material-icons">expand_more</i>\n        </a>\n\n        <vs-dropdown-menu>\n\n          <vs-dropdown-item>\n            option 1\n          </vs-dropdown-item>\n\n          <vs-dropdown-item>\n            option 2\n          </vs-dropdown-item>\n\n          <vs-dropdown-item divider>\n            option 3\n          </vs-dropdown-item>\n        </vs-dropdown-menu>\n      </vs-dropdown>\n    </div>\n</template>\n\n<script>\nexport default {\n  data: () => ({\n    colorx: \'#c80948\'\n  }),\n}\n<\/script>\n        ')])],2)},u=[],_={data:function(){return{colorx:"#c80948"}}},h=_,b=Object(v["a"])(h,w,u,!1,null,null,null),f=b.exports,g=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("vx-card",{attrs:{title:"Group Option"}},[t("p",[n._v("If you need to group the options you can use the subcomponent "),t("code",[n._v("vs-dropdown-group")]),n._v(" which as a required parameter is "),t("code",[n._v("vs-label")]),n._v(" to define the group title")]),t("vs-alert",{staticClass:"my-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[n._v("The group can be hidden from the user and only open when it is sitting on the property with the "),t("code",[n._v("vs-collapse")]),n._v(" property")]),t("p",[n._v("You can modify the icon with a property "),t("code",[n._v("vs-icon")])])]),t("dropdown-option-group"),t("dropdown-group-collapse"),t("template",{slot:"codeContainer"})],2)},x=[],C=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("vx-card",{attrs:{title:"Option Grouping","code-toggler":"","no-shadow":"","card-border":""}},[t("vs-dropdown",[t("a",{staticClass:"flex items-center",attrs:{"href.prevent":""}},[n._v("\n                Dropdown Option Group\n                "),t("i",{staticClass:"material-icons"},[n._v(" expand_more ")])]),t("vs-dropdown-menu",[t("vs-dropdown-item",[n._v(" Option 1 ")]),t("vs-dropdown-item",[n._v(" Option 2 ")]),t("vs-dropdown-group",[t("vs-dropdown-item",[n._v(" Option 1 ")]),t("vs-dropdown-item",[n._v(" Option 2 ")]),t("vs-dropdown-group",[t("vs-dropdown-item",[n._v(" sub Options 1 ")]),t("vs-dropdown-item",[n._v(" sub Options 2 ")])],1)],1),t("vs-dropdown-item",{attrs:{divider:""}},[n._v(" Option 3 ")])],1)],1),t("template",{slot:"codeContainer"},[n._v('\n<template>\n\n  <div class="demo-alignment">\n\n    <vs-dropdown>\n\n      <a class="flex items-center" href.prevent>\n          Dropdown Option Group\n          <i class="material-icons"> expand_more </i>\n      </a>\n\n      <vs-dropdown-menu>\n\n        <vs-dropdown-item> Option 1 </vs-dropdown-item>\n        <vs-dropdown-item> Option 2 </vs-dropdown-item>\n\n        <vs-dropdown-group>\n\n          <vs-dropdown-item> Option 1 </vs-dropdown-item>\n          <vs-dropdown-item> Option 2 </vs-dropdown-item>\n\n          <vs-dropdown-group>\n\n            <vs-dropdown-item> sub Options 1 </vs-dropdown-item>\n            <vs-dropdown-item> sub Options 2 </vs-dropdown-item>\n\n          </vs-dropdown-group>\n        </vs-dropdown-group>\n\n        <vs-dropdown-item divider> Option 3 </vs-dropdown-item>\n      </vs-dropdown-menu>\n    </vs-dropdown>\n  </div>\n</template>\n\n<template>\n        ')])],2)},y=[],O={},D=Object(v["a"])(O,C,y,!1,null,null,null),k=D.exports,G=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("vx-card",{attrs:{title:"Group Collapse","code-toggler":"","no-shadow":"","card-border":""}},[t("vs-dropdown",[t("a",{staticClass:"flex items-center",attrs:{"href.prevent":""}},[n._v("\n                Dropdown Group Collapse\n                "),t("i",{staticClass:"material-icons"},[n._v("expand_more")])]),t("vs-dropdown-menu",[t("vs-dropdown-item",{attrs:{to:"/components/"}},[n._v(" Option 1 ")]),t("vs-dropdown-item",[n._v(" Option 2 ")]),t("vs-dropdown-group",{attrs:{"vs-collapse":"","vs-label":"Group Collapse","vs-icon":"add"}},[t("vs-dropdown-item",[n._v(" Option Collapse 1 ")]),t("vs-dropdown-item",[n._v(" Option Collapse 2 ")]),t("vs-dropdown-group",[t("vs-dropdown-item",[n._v(" Sub Options 1 ")]),t("vs-dropdown-item",[n._v(" Sub Options 2 ")]),t("vs-dropdown-group",{attrs:{"vs-collapse":""}},[t("vs-dropdown-item",{attrs:{"vs-label":"Sub Collapse"}},[n._v(" Sub Collapse 1 ")]),t("vs-dropdown-item",[n._v(" Sub Collapse 2 ")])],1)],1)],1),t("vs-dropdown-item",{attrs:{divider:""}},[n._v(" Option 3 ")])],1)],1),t("template",{slot:"codeContainer"},[n._v('\n<template>\n\n  <div class="demo-alignment">\n\n    <vs-dropdown>\n\n      <a class="flex items-center" href.prevent>\n          Dropdown Group Collapse\n          <i class="material-icons">expand_more</i>\n      </a>\n\n      <vs-dropdown-menu>\n\n        <vs-dropdown-item to="/components/"> Option 1 </vs-dropdown-item>\n        <vs-dropdown-item> Option 2 </vs-dropdown-item>\n\n        <vs-dropdown-group vs-collapse vs-label="Group Collapse" vs-icon="add">\n\n          <vs-dropdown-item> Option Collapse 1 </vs-dropdown-item>\n          <vs-dropdown-item> Option Collapse 2 </vs-dropdown-item>\n\n          <vs-dropdown-group>\n\n            <vs-dropdown-item> Sub Options 1 </vs-dropdown-item>\n            <vs-dropdown-item> Sub Options 2 </vs-dropdown-item>\n\n            <vs-dropdown-group vs-collapse>\n\n              <vs-dropdown-item vs-label="Sub Collapse"> Sub Collapse 1 </vs-dropdown-item>\n              <vs-dropdown-item> Sub Collapse 2 </vs-dropdown-item>\n\n            </vs-dropdown-group>\n          </vs-dropdown-group>\n        </vs-dropdown-group>\n        \n        <vs-dropdown-item divider> Option 3 </vs-dropdown-item>\n      </vs-dropdown-menu>\n    </vs-dropdown>\n  </div>\n</template>\n        ')])],2)},j=[],S={},E=Object(v["a"])(S,G,j,!1,null,null,null),L=E.exports,z={components:{DropdownOptionGroup:k,DropdownGroupCollapse:L}},I=z,$=Object(v["a"])(I,g,x,!1,null,null,null),B=$.exports,P=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("vx-card",{attrs:{title:"Custom Content","code-toggler":""}},[t("p",[n._v("Sometimes when we need something more personalized and not necessarily a menu for it you can add any content and have the dropdown functionality with the property "),t("code",[n._v("vs-custom-content")])]),t("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[n._v("For better functionality in the user's aspect when doing some interaction with the custom dropdown you can add that it is only activated and deactivated by a click event with the property "),t("code",[n._v("vs-trigger-click")])])]),t("div",{staticClass:"mt-5 demo-alignment"},[t("vs-dropdown",{attrs:{"vs-custom-content":"","vs-trigger-click":""}},[t("a",{staticClass:"flex items-center",attrs:{"href.prevent":""}},[t("span",[n._v("Click me open login")]),t("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4 ml-1"}})],1),t("vs-dropdown-menu",{staticClass:"dropdown-login"},[t("h3",{staticClass:"mb-0"},[n._v("Login")]),t("vs-input",{attrs:{type:"email","label-placeholder":"Email"},model:{value:n.value1,callback:function(o){n.value1=o},expression:"value1"}}),t("vs-input",{attrs:{type:"password","label-placeholder":"Password"},model:{value:n.value2,callback:function(o){n.value2=o},expression:"value2"}}),t("vs-button",{staticClass:"mt-4 w-full",attrs:{width:"100%",color:"success",type:"gradient"}},[n._v("Login")])],1)],1)],1),t("template",{slot:"codeContainer"},[n._v('\n<template>\n\n  <vs-dropdown vs-custom-content vs-trigger-click>\n    <a class="flex items-center" href.prevent>\n      <span>Click me open login</span>\n      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4 ml-1" />\n    </a>\n\n    <vs-dropdown-menu class="dropdown-login">\n      <h3 class="mb-0">Login</h3>\n      <vs-input type="email" label-placeholder="Email" v-model="value1" />\n      <vs-input type="password" label-placeholder="Password" v-model="value2" />\n      <vs-button width="100%" color="success" type="gradient" class="mt-4 w-full">Login</vs-button>\n    </vs-dropdown-menu>\n\n  </vs-dropdown>\n</template>\n\n<script>\nexport default {\n  data: () => ({\n    value1: \'\',\n    value2: \'\',\n  }),\n}\n<\/script>\n        ')])],2)},F=[],T={data:function(){return{value1:"",value2:""}}},Y=T,H=Object(v["a"])(Y,P,F,!1,null,null,null),q=H.exports,A=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("vx-card",{attrs:{title:"Button","code-toggler":""}},[t("p",[n._v("You can customize the component or element that initialize the dropdown in this case, it is a Button that is the most common")]),t("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[n._v("The component or element that initializes the dropdown is the one inside it with the possibility of total customization and flexibility in the required use")])]),t("vs-alert",{staticClass:"my-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[n._v("Vuesax uses the Google Material Icons font library by default. For a list of all available icons, visit the official "),t("a",{attrs:{href:"https://material.io/icons/",target:"_blank"}},[n._v("Material Icons page")]),n._v(".")]),t("p",[n._v("FontAwesome and other fonts library are supported. Simply use the icon-pack with fa or fas. You still need to include the Font Awesome icons in your project.")])]),t("prism",{staticClass:"rounded-lg"},[n._v("\n<vs-dropdown>\n  \x3c!-- element that initializes the dropdown --\x3e\n\n  <vs-dropdown-menu>\n    \x3c!-- items and elements within the menu or custom dropdown --\x3e\n  </vs-dropdown-menu>\n</vs-dropdown>\n        ")]),t("div",{staticClass:"mt-5 demo-alignment"},[t("div",{staticClass:"dropdown-button-container"},[t("vs-button",{staticClass:"btnx",attrs:{type:"filled"}},[n._v("Dropdown")]),t("vs-dropdown",[t("vs-button",{staticClass:"btn-drop",attrs:{type:"filled",icon:"expand_more"}}),t("vs-dropdown-menu",[t("vs-dropdown-item",[n._v(" option 1 ")]),t("vs-dropdown-item",[n._v(" option 2 ")]),t("vs-dropdown-group",[t("vs-dropdown-item",[n._v(" option 1 ")]),t("vs-dropdown-item",[n._v(" option 2 ")])],1),t("vs-dropdown-item",{attrs:{divider:""}},[n._v(" option 3 ")])],1)],1)],1),t("div",{staticClass:"dropdown-button-container"},[t("vs-button",{staticClass:"btnx",attrs:{color:"success",type:"gradient"}},[n._v("Dropdown")]),t("vs-dropdown",[t("vs-button",{staticClass:"btn-drop",attrs:{color:"success",type:"gradient",icon:"more_horiz"}}),t("vs-dropdown-menu",[t("vs-dropdown-item",[n._v(" Home ")]),t("vs-dropdown-item",[n._v(" Contributors ")]),t("vs-dropdown-item",{attrs:{divider:""}},[n._v(" Logout ")])],1)],1)],1),t("div",{staticClass:"dropdown-button-container"},[t("vs-button",{staticClass:"btnx",attrs:{type:"line",color:"danger"}},[n._v("Icons")]),t("vs-dropdown",[t("vs-button",{staticClass:"btn-drop",attrs:{type:"line",color:"danger",icon:"mood"}}),t("vs-dropdown-menu",[t("vs-dropdown-item",[t("i",{staticClass:"material-icons"},[n._v(" mood ")])]),t("vs-dropdown-item",[t("i",{staticClass:"material-icons"},[n._v(" mood_bad ")])]),t("vs-dropdown-item",[t("i",{staticClass:"material-icons"},[n._v(" sentiment_dissatisfied ")])]),t("vs-dropdown-item",[t("i",{staticClass:"material-icons"},[n._v(" sentiment_satisfied ")])]),t("vs-dropdown-item",[t("i",{staticClass:"material-icons"},[n._v(" sentiment_very_dissatisfied ")])]),t("vs-dropdown-item",[t("i",{staticClass:"material-icons"},[n._v(" sentiment_very_satisfied ")])])],1)],1)],1)]),t("template",{slot:"codeContainer"},[n._v('\n<template>\n  <div class="demo-alignment">\n\n    \x3c!-- Dropdown Button 1 --\x3e\n    <div class="dropdown-button-container">\n      <vs-button class="btnx" type="filled">Dropdown</vs-button>\n\n      <vs-dropdown>\n        <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>\n        <vs-dropdown-menu>\n\n          <vs-dropdown-item> option 1 </vs-dropdown-item>\n          <vs-dropdown-item> option 2 </vs-dropdown-item>\n\n          <vs-dropdown-group>\n            <vs-dropdown-item> option 1 </vs-dropdown-item>\n            <vs-dropdown-item> option 2 </vs-dropdown-item>\n          </vs-dropdown-group>\n\n          <vs-dropdown-item divider> option 3 </vs-dropdown-item>\n        </vs-dropdown-menu>\n      </vs-dropdown>\n    </div>\n\n    \x3c!-- Dropdown Button 2 --\x3e\n    <div class="dropdown-button-container">\n      <vs-button class="btnx" color="success" type="gradient">Dropdown</vs-button>\n\n      <vs-dropdown>\n        <vs-button class="btn-drop" color="success" type="gradient" icon="more_horiz"></vs-button>\n        <vs-dropdown-menu>\n\n          <vs-dropdown-item> Home </vs-dropdown-item>\n          <vs-dropdown-item> Contributors </vs-dropdown-item>\n          <vs-dropdown-item divider> Logout </vs-dropdown-item>\n        </vs-dropdown-menu>\n      </vs-dropdown>\n    </div>\n\n    \x3c!-- Dropdown Button 3 --\x3e\n    <div class="dropdown-button-container">\n      <vs-button class="btnx" type="line" color="danger">Icons</vs-button>\n\n      <vs-dropdown>\n        <vs-button class="btn-drop" type="line" color="danger" icon="mood"></vs-button>\n        <vs-dropdown-menu>\n\n          <vs-dropdown-item>\n            <i class="material-icons"> mood </i>\n          </vs-dropdown-item>\n          <vs-dropdown-item>\n            <i class="material-icons"> mood_bad </i>\n          </vs-dropdown-item>\n          <vs-dropdown-item>\n            <i class="material-icons"> sentiment_dissatisfied </i>\n          </vs-dropdown-item>\n          <vs-dropdown-item>\n            <i class="material-icons"> sentiment_satisfied </i>\n          </vs-dropdown-item>\n          <vs-dropdown-item>\n            <i class="material-icons"> sentiment_very_dissatisfied </i>\n          </vs-dropdown-item>\n          <vs-dropdown-item>\n            <i class="material-icons"> sentiment_very_satisfied </i>\n          </vs-dropdown-item>\n        </vs-dropdown-menu>\n      </vs-dropdown>\n    </div>\n  </div>\n</template>\n\n<style lang="scss">\n.dropdown-button-container {\n  display: flex;\n  align-items: center;\n\n  .btnx {\n    border-radius: 5px 0px 0px 5px;\n  }\n\n  .btn-drop {\n    border-radius: 0px 5px 5px 0px;\n    border-left: 1px solid rgba(255, 255, 255, .2);\n  }\n}\n</style>\n        ')])],2)},J=[],M={data:function(){return{value1:"",value2:""}},components:{Prism:a.a}},N=M,R=Object(v["a"])(N,A,J,!1,null,null,null),V=R.exports,X={components:{DropdownDefault:m,DropdownColor:f,DropdownGroupOption:B,DropdownCustomContent:q,DropdownButton:V}},K=X,Q=(t("fd5f"),Object(v["a"])(K,e,s,!1,null,null,null));o["default"]=Q.exports},fd5f:function(n,o,t){"use strict";var e=t("0532"),s=t.n(e);s.a}}]);
//# sourceMappingURL=chunk-a4c6d038.e24d2361.js.map