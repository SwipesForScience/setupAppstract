webpackJsonp([1],{"1/oy":function(e,t){},"2+hT":function(e,t){},"9M+g":function(e,t){},"C2u/":function(e,t){},"G+rQ":function(e,t,n){e.exports=n.p+"static/img/whereToSetStorageRules.d942e8d.png"},GfHa:function(e,t){},H6bv:function(e,t){},Id91:function(e,t){},Jmt5:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("7+uW"),a=n("e6fC"),i=(n("Jmt5"),n("9M+g"),n("3kHb")),r=n.n(i);n("2+hT"),n("H6bv");s.a.use(r.a),s.a.use(a.a);var o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("b-container",[t("router-view")],1)],1)},staticRenderFns:[]};var u=n("VU/8")({name:"App"},o,!1,function(e){n("C2u/")},null,null).exports,l=n("/ocq"),c=n("//Fk"),m=n.n(c),p=n("kxiW"),d=n.n(p),f=n("M4fF"),h=n.n(f),b={props:{firebaseIsReady:{type:Boolean},projectname:{type:String}},data:function(){return{fkeys:null}},methods:{parseFirebaseKeys:function(){var e=this,t={};return h.a.map(["apiKey","authDomain","databaseURL","projectId","storageBucket","messagingSenderId"],function(n){t[n]=e.fkeys.split(n+': "')[1].split('"')[0]}),this.$emit("newFirebaseKeys",t),t}}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.firebaseIsReady?n("div",[n("p",[e._v("\n    Your firebase project is "),n("strong",[e._v(e._s(e.projectname))])]),e._v(" "),n("p",[e._v('Click "Next" to continue!')])]):n("div",[n("h5",[e._v("Setting up your database")]),e._v(" "),e._m(0),e._v(" "),n("video",{staticClass:"video",attrs:{src:"https://s3.amazonaws.com/hotdognothotdog/createFirebaseProject.webm",controls:""}}),e._v(" "),n("label",{attrs:{for:"firebase"}},[e._v("Firebase Keys:")]),e._v(" "),n("b-textarea",{attrs:{placeholder:"Copy/paste your firebase API keys from the firebase console in here",rows:5},model:{value:e.fkeys,callback:function(t){e.fkeys=t},expression:"fkeys"}}),e._v(" "),n("b-button",{staticClass:"mt-2 mb-2",attrs:{variant:"secondary",disabled:!e.fkeys},on:{click:e.parseFirebaseKeys}},[e._v("Apply")])],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("ol",{staticClass:"text-left ml-3 pl-3"},[t("li",[this._v("\n      Create a new Firebase project\n      at "),t("a",{attrs:{href:"https://console.firebase.google.com"}},[this._v("console.firebase.google.com")])]),this._v(" "),t("li",[this._v('\n      Copy the API keys to the text box below and hit "Apply"\n    ')])])}]};var g=n("VU/8")(b,v,!1,function(e){n("gjHY")},"data-v-1de7b36f",null).exports,y={name:"Initializer",props:{db:{type:Object,required:!0},userInfo:{type:Object,required:!0}},data:function(){return{admin:!1,sampleCounts:!1,sampleSummary:!1,chats:!1,userSeenSamples:!1,userSettings:!1,votes:!1}},computed:{uid:function(){return this.userInfo.uid},ready:function(){return this.admin&&this.sampleCounts&&this.sampleSummary&&this.chats&&this.userSeenSamples&&this.votes&&this.userSettings}},watch:{ready:function(){this.ready&&(console.log("ready to go"),this.$emit("ready"))}},mounted:function(){h.a.isEmpty(this.db)&&console.log("initing")},methods:{initAdmin:function(){var e=this,t=this.userInfo.displayName;this.db.ref("settings").child("admins").child(t).set(1),this.db.ref("users").child(t).child("admin").set(!0).then(function(){e.admin=!0})},initSampleCounts:function(){var e=this;this.db.ref("sampleCounts").once("value").then(function(t){null===t.val()&&e.db.ref("sampleCounts").set(0)}).then(function(){e.sampleCounts=!0})},initSampleSummary:function(){var e=this;this.db.ref("sampleSummary").once("value").then(function(t){null===t.val()&&e.db.ref("sampleSummary").set(0)}).then(function(){e.sampleSummary=!0})},initChats:function(){var e=this;this.db.ref("chats").once("value").then(function(t){null===t.val()&&e.db.ref("chats").set(0)}).then(function(){e.chats=!0})},initUserSeenSamples:function(){var e=this,t=this.userInfo.displayName;this.db.ref("userSeenSamples").child(t).once("value").then(function(n){null===n.val()&&e.db.ref("userSeenSamples").child(t).set(0)}).then(function(){e.userSeenSamples=!0})},initVotes:function(){var e=this;this.db.ref("votes").once("value").then(function(t){null===t.val()&&e.db.ref("votes").set(0)}).then(function(){e.votes=!0})},initUserSettings:function(){var e=this;this.db.ref("userSettings").once("value").then(function(t){null===t.val()&&e.db.ref("userSettings").set(0)}).then(function(){e.userSettings=!0})},initAll:function(){this.initAdmin(),this.initSampleCounts(),this.initSampleSummary(),this.initChats(),this.initUserSeenSamples(),this.initUserSettings(),this.initVotes(),this.$emit("initialized")}}},_={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"text-left ml-3 pl-3"},[n("b-alert",{attrs:{show:""}},[e._v('\n        Thanks for your keys!\n        Follow the steps on the video above, and then click the "initalize" button\n      ')]),e._v(" "),n("video",{staticClass:"video",attrs:{src:"https://s3.amazonaws.com/hotdognothotdog/setupAuthAndDatabase.webm",controls:""}}),e._v(" "),n("b-row",[n("b-col",{staticClass:"text-center"},[n("b-button",{attrs:{size:"lg",variant:"primary"},on:{click:e.initAll}},[e._v("\n            Initialize Your Database\n          ")])],1)],1),e._v(" "),n("p",[e._v("Admin: "+e._s(e.admin)+" "),e.admin?n("span",[e._v("✅")]):e._e()]),e._v(" "),n("p",[e._v("sampleCounts: "+e._s(e.sampleCounts)+" "),e.sampleCounts?n("span",[e._v("✅")]):e._e()]),e._v(" "),n("p",[e._v("sampleSummary: "+e._s(e.sampleSummary)+" "),e.sampleSummary?n("span",[e._v("✅")]):e._e()]),e._v(" "),n("p",[e._v("chats: "+e._s(e.chats)+" "),e.chats?n("span",[e._v("✅")]):e._e()]),e._v(" "),n("p",[e._v("user seen samples: "+e._s(e.userSeenSamples)+" "),e.userSeenSamples?n("span",[e._v("✅")]):e._e()]),e._v(" "),n("p",[e._v("votes: "+e._s(e.votes)+" "),e.votes?n("span",[e._v("✅")]):e._e()])],1),e._v(" "),e.ready?n("div",[e._v('Great! Please click the "next" button ')]):e._e()])},staticRenderFns:[]};var w=n("VU/8")(y,_,!1,function(e){n("Zrkx"),n("u9X+")},null,null).exports,k={name:"login",props:{user:{type:Object}},computed:{notLoggedIn:function(){return h.a.isEmpty(this.user)}},data:function(){return{form:{username:null,email:null,password:null},errors:{show:!1,message:null}}},methods:{onSubmit:function(e){var t=this;e.preventDefault(),d.a.auth().signInWithEmailAndPassword(this.form.email,this.form.password).then(function(e){t.$emit("login",e),t.errors.show=!1},function(){d.a.auth().createUserWithEmailAndPassword(t.form.email,t.form.password).then(function(e){console.log(e),e.user.updateProfile({displayName:t.form.username}).then(function(){console.log("success",t.user.displayName),t.$emit("displayName",t.user.displayName),t.$forceUpdate()})}).catch(function(e){t.errors.show=!0,t.errors.message=e.message})})},logout:function(){d.a.auth().signOut()}}},S={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"login"}},[n("h1",[e._v(" Log In ")]),e._v(" "),e.notLoggedIn?n("div",{staticClass:"container fluid",attrs:{id:"signupForm"}},[n("b-alert",{attrs:{show:e.errors.show,variant:"danger"}},[e._v(e._s(e.errors.message))]),e._v(" "),n("b-form",{on:{submit:e.onSubmit}},[n("b-form-group",{attrs:{id:"usernameAddressInputGroup",label:"Username:","label-for":"username"}},[n("b-form-input",{attrs:{id:"username",required:"",placeholder:"Enter username"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),n("b-form-group",{attrs:{id:"emailAddressInputGroup",label:"Email address:","label-for":"emailAddress"}},[n("b-form-input",{attrs:{id:"emailAddress",type:"email",required:"",placeholder:"Enter email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),n("b-form-group",{attrs:{id:"passwordInputGroup",label:"Password:","label-for":"passwordInput"}},[n("b-form-input",{attrs:{id:"passwordInput",type:"password",required:"",placeholder:"Password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),n("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1):n("div",[n("p",[e._v("\n      You've signed in as "),n("strong",[e._v(e._s(this.user.displayName))]),e._v(".\n      This is your admin account.\n    ")]),e._v(" "),n("b-button",{on:{click:e.logout}},[e._v("Logout")])],1)])},staticRenderFns:[]};var x=n("VU/8")(k,S,!1,function(e){n("m7VT")},null,null).exports,C=n("mtWM"),F=n.n(C),I=n("fJom"),z=n.n(I),j={name:"metaAnalysis",props:{firebaseKeys:{type:Object},db:{type:Object},config:{type:Object}},data:function(){return{manifestQuery:null,sampleCounts:[],status:null,progress:0,manifestEntries:[],pubmedQueryStore:{}}},watch:{manifestQuery:function(){this.config.manifestQuery=this.manifestQuery},db:function(){h.a.isEmpty(this.db)||this.addFirebaseListener()}},methods:{xmlParser:function(e){return(new DOMParser).parseFromString(e,"text/xml")},getPubmedQueryPreview:function(){var e=this,t="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term="+encodeURI(this.manifestQuery)+"&usehistory=y&retmax=100";return F.a.get(t).then(function(t){var n=e.xmlParser(t.data),s=n.getElementsByTagName("WebEnv")[0],a=n.getElementsByTagName("Count")[0],i=n.getElementsByTagName("IdList")[0].children;e.pubmedQueryStore.webEnv=s.innerHTML,e.pubmedQueryStore.count=a.innerHTML,e.manifestEntries=h.a.map(i,function(e){return e.innerHTML})})},getPubmedQueryFull:function(){var e=this;if(this.pubmedQueryStore.webEnv){var t="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term="+encodeURI(this.manifestQuery)+"&usehistory=y&retmax="+this.pubmedQueryStore.count+"&WebEnv="+this.pubmedQueryStore.webEnv;F.a.get(t).then(function(t){var n=e.xmlParser(t.data).getElementsByTagName("IdList")[0].children;e.manifestEntries=h.a.map(n,function(e){return e.innerHTML})})}else this.getPubmedQueryPreview().then(function(){e.getPubmedQueryFull()})},addFirebaseListener:function(){var e=this;this.db.ref("sampleCounts").once("value",function(t){e.sampleCounts=h.a.map(t.val(),function(e,t){return{".key":t,".value":e}}),e.status="complete"})},syncEntries:function(){var e=this,t=h.a.map(this.sampleCounts,function(e){return e[".key"]}),n=this,s=new z.a;s.postMessage([this.manifestEntries,t,n.firebaseKeys]),s.onmessage=function(e){n.status="complete","done"===e.data?n.addFirebaseListener():n.progress+=1},h.a.map(t,function(t){e.manifestEntries.indexOf(t)<0&&e.db.ref("sampleCounts").child(t).remove()})}}},E={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-form",[n("b-form-group",{attrs:{id:"exampleInputGroup1",label:"Pubmed Query:","label-for":"exampleInput1",description:"Your pubmed query"}},[n("b-form-input",{attrs:{id:"exampleInput1",required:"",placeholder:"Enter your pubmed search"},model:{value:e.manifestQuery,callback:function(t){e.manifestQuery=t},expression:"manifestQuery"}})],1)],1),e._v(" "),n("b-row",{staticClass:"mt-3"},[n("b-col",[n("b-button",{on:{click:e.getPubmedQueryFull}},[e._v("Search")])],1)],1),e._v(" "),e.manifestEntries.length?n("b-row",{staticClass:"mt-3 text-center"},[n("b-col",{staticClass:"text-center"},[e._v("\n    This search has "+e._s(e.manifestEntries.length)+" hits.\n    ")])],1):e._e(),e._v(" "),n("b-row",{staticClass:"mt-3"},[n("b-col",{staticClass:"text-center"},[e._v("\n    You have "+e._s(e.sampleCounts.length)+" entries in your database currently.\n    ")])],1),e._v(" "),e.manifestEntries.length?n("b-row",{staticClass:"mt-3"},[n("b-col",[n("b-button",{attrs:{variant:"primary",size:"lg"},on:{click:e.syncEntries}},[e._v("Upload")])],1)],1):e._e()],1)},staticRenderFns:[]};var U=n("VU/8")(j,E,!1,function(e){n("frv7")},"data-v-3c0cdca7",null).exports,A=n("mvHQ"),P=n.n(A),Q={name:"Final",props:{config:{type:Object}},computed:{s4surl:function(){return"https://dev.swipesforscience.org/#/?config=https://cors-anywhere.herokuapp.com/"+this.finalUrl}},data:function(){return{finalUrl:null,rules:"service firebase.storage {\n  match /b/{bucket}/o {\n    match /{allPaths=**} {\n      allow read\n      allow write: if request.auth != null;\n    }\n  }\n}"}},methods:{uploadConfigFile:function(){var e=this,t=d.a.storage().ref().child("config.json"),n=P()(this.config);t.putString(n).then(function(){t.getDownloadURL().then(function(t){e.finalUrl=t})})}}},R={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.finalUrl?s("div",[s("p",[e._v('Copy paste these rules to your Firebase storage "rules" tab')]),e._v(" "),s("img",{staticClass:"w-75 mb-3",attrs:{src:n("G+rQ")}}),e._v(" "),s("b-textarea",{attrs:{value:e.rules}}),e._v(" "),s("p",{staticClass:"mt-3 lead"},[e._v("You can click on this link to play your game!")]),e._v(" "),s("p",[s("a",{attrs:{href:e.s4surl}},[e._v(e._s(e.s4surl))])])],1):s("div",[s("p",[s("b-alert",{attrs:{show:""}},[e._v('\n        Go to the "storage" tab in your '),s("strong",[e._v("firebase console")]),e._v(" and enable storage.\n      ")])],1),e._v(" "),s("b-row",[s("b-col",[s("img",{staticClass:"w-100",attrs:{src:n("tOe8")}})]),e._v(" "),s("b-col",[s("img",{staticClass:"w-100",attrs:{src:n("d1Y7")}})])],1),e._v(" "),s("p",{staticClass:"mt-3"},[e._v('\n      After you\'ve done that, click "upload":\n    ')]),e._v(" "),s("b-button",{on:{click:e.uploadConfigFile}},[e._v("\n      Upload\n    ")])],1)])},staticRenderFns:[]},T=n("VU/8")(Q,R,!1,null,null,null).exports,$={props:{config:{type:Object,required:!0}},data:function(){return{navbarOptions:["primary","secondary","info","warning","danger"]}}},K={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h5",{staticClass:"mt3 pt-3"},[e._v("Home")]),e._v(" "),n("label",{attrs:{for:"navbarVariant"}},[e._v("Navbar variant:")]),e._v(" "),n("b-form-select",{staticClass:"mb-3",attrs:{id:"navbarVariant",options:e.navbarOptions},model:{value:e.config.app.navbarVariant,callback:function(t){e.$set(e.config.app,"navbarVariant",t)},expression:"config.app.navbarVariant"}}),e._v(" "),n("label",{attrs:{for:"title"}},[e._v("Title")]),e._v(" "),n("b-form-input",{attrs:{type:"text",id:"title",placeholder:"your title here"},model:{value:e.config.home.title,callback:function(t){e.$set(e.config.home,"title",t)},expression:"config.home.title"}}),e._v(" "),n("label",{staticClass:"mt-2",attrs:{for:"tagline"}},[e._v("Tagline")]),e._v(" "),n("b-form-input",{attrs:{type:"text",id:"tagline",placeholder:"your tagline here"},model:{value:e.config.home.tagline,callback:function(t){e.$set(e.config.home,"tagline",t)},expression:"config.home.tagline"}}),e._v(" "),n("label",{staticClass:"mt-2",attrs:{for:"backgroundUrl"}},[e._v("Background URL")]),e._v(" "),n("b-form-input",{attrs:{type:"text",id:"backgroundUrl",placeholder:"url to a picture"},model:{value:e.config.home.backgroundUrl,callback:function(t){e.$set(e.config.home,"backgroundUrl",t)},expression:"config.home.backgroundUrl"}})],1)},staticRenderFns:[]},N=n("VU/8")($,K,!1,null,null,null).exports,V={needsTutorial:!1,manifestQuery:"",manifestType:"pubmed",widgetType:"PubMedNLP",widgetProperties:{template:"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={0}&tool=appstract&email=keshavan@berkeley.edu&retmode=xml",delimiter:null},iconAttribute:{name:"openmoji",url:"http://openmoji.org"},levels:{0:{level:0,min:0,max:100,character:null,img:null,img_grey:null},1:{level:1,min:101,max:350,character:"fish",img:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F41F.svg?sanitize=true",img_grey:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F41F.svg?sanitize=true"},2:{level:2,min:351,max:750,character:"frog",img:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F438.svg?sanitize=true",img_grey:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F438.svg?sanitize=true"},3:{level:3,min:751,max:1e3,character:"duck",img:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F986.svg?sanitize=true",img_grey:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F986.svg?sanitize=true"},4:{level:4,min:1001,max:1500,character:"koala",img:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F428.svg?sanitize=true",img_grey:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F428.svg?sanitize=true"},5:{level:5,min:1501,max:2e3,character:"cat",img:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F408.svg?sanitize=true",img_grey:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F408.svg?sanitize=true"},6:{level:6,min:2001,max:2500,character:"lion",img:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F981.svg?sanitize=true",img_grey:"https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F981.svg?sanitize=true"}},betaMode:!1,firebaseKeys:{},app:{navbarVariant:"danger"},home:{title:"Swipes for Science",tagline:"A citizen science game template",backgroundUrl:"https://raw.githubusercontent.com/akeshavan/appstract/master/src/assets/landingIcon.svg?sanitize=true"},play:{blankImage:"https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/undraw_blank_canvas.svg?sanitize=true"},chats:{blankImage:"https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/undraw_no_data.svg?sanitize=true"},profile:{blankImage:"https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/undraw_chatting.svg?sanitize=true"},tutorial:{customBackgroundAnimation:null,steps:{intro:[],examples:[]}}};window.firebase=d.a;var L={name:"Wizard",components:{FirebaseKeys:g,InitializeDatabase:w,SignIn:x,MetaAnalysis:U,FinalStep:T,Home:N},data:function(){return{msg:"Welcome to Your Vue.js App",firebaseKeys:{},user:{},db:{},firebaseIsReady:!1,projectName:"",initializedDb:!1,config:V}},computed:{isReadyToInitialize:function(){return this.firebaseIsReady&&!h.a.isEmpty(this.user)}},methods:{initialized:function(){this.initializedDb=!0},onComplete:function(){this.msg="Yay. Done!"},validateAsync:function(){return this.setNewFirebaseKeys()},setNewFirebaseKeys:function(e){var t=this;this.firebaseKeys=e;try{d.a.initializeApp(this.firebaseKeys),this.db=d.a.database()}catch(e){d.a.app().delete().then(function(){d.a.initializeApp(t.firebaseKeys),t.db=d.a.database()})}return console.log("hi there",d.a.app()),this.projectname=d.a.app().options.projectId,this.firebaseIsReady=!0,V.firebaseKeys=this.firebaseKeys,d.a.auth().onAuthStateChanged(function(e){t.user=e||{}}),m.a.resolve(1)}}},M={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wizard"},[n("form-wizard",{attrs:{title:"Setup Swipes for Science",subtitle:"Pubmed meta analysis setup"},on:{"on-complete":e.onComplete}},[n("tab-content",{attrs:{title:"Database Setup",icon:"ti-server"}},[n("firebase-keys",{ref:"firebasekeys",attrs:{firebaseIsReady:e.firebaseIsReady,projectname:e.projectname},on:{newFirebaseKeys:e.setNewFirebaseKeys}})],1),e._v(" "),n("tab-content",{attrs:{title:"Sign In",icon:"ti-user"}},[e.firebaseIsReady?n("sign-in",{attrs:{user:e.user}}):n("div",[e._v("Please go back and enter your firebase keys to continue!")])],1),e._v(" "),n("tab-content",{attrs:{title:"Initialize database",icon:"ti-wand"}},[e.isReadyToInitialize?n("initialize-database",{attrs:{db:e.db,userInfo:e.user},on:{ready:function(t){return e.initialized()}}}):n("div",[e._v("Please go back and enter your firebase keys and sign in to continue!")])],1),e._v(" "),n("tab-content",{attrs:{title:"Meta-analysis",icon:"ti-user"}},[n("meta-analysis",{attrs:{firebaseKeys:e.firebaseKeys,db:e.db,config:e.config}})],1),e._v(" "),n("tab-content",{attrs:{title:"Customize",icon:"ti-home"}},[n("home",{attrs:{config:e.config}})],1),e._v(" "),n("tab-content",{attrs:{title:"Last step",icon:"ti-check"}},[n("final-step",{attrs:{config:e.config}})],1)],1)],1)},staticRenderFns:[]};var O=n("VU/8")(L,M,!1,function(e){n("ahx5")},"data-v-2b7f5942",null).exports;s.a.use(l.a);var H=new l.a({routes:[{path:"/",name:"MainWizard",component:O}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:H,components:{App:u},template:"<App/>"})},Zrkx:function(e,t){},ahx5:function(e,t){},d1Y7:function(e,t,n){e.exports=n.p+"static/img/setupStorage02.124524f.png"},fJom:function(e,t,n){e.exports=function(){return new Worker(n.p+"132c5b882c6a69b2004f.worker.js")}},frv7:function(e,t){},gjHY:function(e,t){},m7VT:function(e,t){},tOe8:function(e,t,n){e.exports=n.p+"static/img/setupStorage01.85181c5.png"},"u9X+":function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.975527351746f85066ea.js.map