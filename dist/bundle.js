(function(){var name="UtilityPatches";var id="rosie.utilitypatches";var bundle="http://rosies-macbook-air.local:5495/bundle.js";var version="1.0.5";var description="Minor patches/fixes all bundled into a single plugin for convenience.";var authors=[{name:"Rosie<3",id:"581573474296791211"}];var manifest={name:name,id:id,bundle:bundle,version:version,description:description,authors:authors};var _window_unbound$d=window["unbound"],_window_unbound_storage=_window_unbound$d.storage,_get=_window_unbound_storage.get,_set=_window_unbound_storage.set;var get=function(prop){var defaultValue=arguments.length>1&&arguments[1]!==void 0?arguments[1]:false;return _get(manifest.name,prop,defaultValue)};var set=function(prop,value){return _set(manifest.name,prop,value)};var metro=window["unbound"].metro;var BadgableTabBar=metro.findByProps("BadgableTabBar").BadgableTabBar;var TextModule=metro.findByProps("TextStyleSheet","Text");var _metro_findByProps=metro.findByProps("GenericHeaderTitle");var GenericHeaderTitle=_metro_findByProps.GenericHeaderTitle,GenericSubHeaderTitle=_metro_findByProps.GenericSubHeaderTitle;var _window_ReactNative$2=window["ReactNative"];var configureNext=_window_ReactNative$2.LayoutAnimation.configureNext;var Chat=metro.findByName("Chat");function _array_like_to_array$6(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_without_holes(arr){if(Array.isArray(arr))return _array_like_to_array$6(arr)}function _iterable_to_array(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter)}function _non_iterable_spread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _to_consumable_array(arr){return _array_without_holes(arr)||_iterable_to_array(arr)||_unsupported_iterable_to_array$6(arr)||_non_iterable_spread()}function _unsupported_iterable_to_array$6(o,minLen){if(!o)return;if(typeof o==="string")return _array_like_to_array$6(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array$6(o,minLen)}var _window_unbound$c=window["unbound"],_window_unbound_metro$6=_window_unbound$c.metro,findByName=_window_unbound_metro$6.findByName,findByProps$9=_window_unbound_metro$6.findByProps,findInReactTree=_window_unbound$c.utilities.findInReactTree;var Text=TextModule.Text;var SettingsOverviewScreen=findByName("SettingsOverviewScreen",{interop:false});var FormLabel$1=findByName("FormLabel",{interop:false});var getSettingTitle=findByProps$9("getSettingTitle",{lazy:true}).getSettingTitle;var headerPrimary={key:"headerPrimary",title:"Fix Text Labels",subtitle:"Forces all Text Labels to use 'text-normal' instead of the default 'header-primary'.",icon:"ic_add_text",patch:function patch(Patcher){var _this=this;Patcher.after(FormLabel$1,"default",function(_,__,res){if(!get(_this.key))return;res.props.color==="header-primary"&&(res.props.color="text-normal")});var unpatch=Patcher.after(SettingsOverviewScreen,"default",function(_,__,res){unpatch();var sections=findInReactTree(res,function(r){return r.sections}).sections;var settings=sections.map(function(section){return section.settings}).reduce(function(acc,obj){return _to_consumable_array(acc).concat(_to_consumable_array(obj))},[]).map(function(setting){return getSettingTitle(setting)});Patcher.before(Text,"render",function(_,args){if(!get(_this.key))return;if(args[0].variant==="text-md/semibold"&&args[0].color==="header-primary"&&settings.includes(args[0].children))args[0].color="text-normal"})})}};var _window_unbound$b=window["unbound"],findByProps$8=_window_unbound$b.metro.findByProps;var FilesManager=findByProps$8("addFiles","popFirstFile",{lazy:true});var jsonFix={key:"jsonFix",title:"Upload JSON Files",subtitle:"Fixes a long-lasting bug of Discord where JSON files couldn't be sent properly.",icon:"icon-qs-files",patch:function patch(Patcher){var _this=this;Patcher.after(FilesManager,"addFiles",function(_,args){if(!get(_this.key))return;args[0].files.forEach(function(file){file.mimeType==="application/json"&&(file.mimeType="text/plain")})})}};function _array_like_to_array$5(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes$5(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit$5(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _non_iterable_rest$5(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array$5(arr,i){return _array_with_holes$5(arr)||_iterable_to_array_limit$5(arr,i)||_unsupported_iterable_to_array$5(arr,i)||_non_iterable_rest$5()}function _unsupported_iterable_to_array$5(o,minLen){if(!o)return;if(typeof o==="string")return _array_like_to_array$5(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array$5(o,minLen)}var _window_unbound$a=window["unbound"],findByProps$7=_window_unbound$a.metro.findByProps;var MediaManager=findByProps$7("downloadMediaAsset",{lazy:true});var tenorFix={key:"tenorFix",title:"Save Tenor GIFs",subtitle:"Fixes a long-lasting bug of Discord where Tenor GIFs saved as MP4s instead of GIFs.",icon:"ic_download_24px",patch:function patch(Patcher){var _this=this;Patcher.before(MediaManager,"downloadMediaAsset",function(_,args){if(!get(_this.key))return;var _args=_sliced_to_array$5(args,1),uri=_args[0];var prefix=".tenor.com";if(!uri.includes(prefix))return;var path=uri.split("/");var startIndex=path.findIndex(function(item){return item.includes(prefix)});if(startIndex===-1)return;var _path_slice=_sliced_to_array$5(path.slice(startIndex,startIndex+3),4),hostname=_path_slice[1],tenorID=_path_slice[2],fileName=_path_slice[3];tenorID="".concat(tenorID.slice(0,-2),"AC");fileName=fileName.replace(".mp4",".gif");args[0]="https://".concat(hostname,"/").concat(tenorID,"/").concat(fileName);args[1]=args[0].includes(".gif")?1:2})}};var _window_unbound$9=window["unbound"],findByProps$6=_window_unbound$9.metro.findByProps,noop=_window_unbound$9.utilities.noop;var Timeout=findByProps$6("Timeout",{lazy:true}).Timeout;var omitDisconnect={key:"omitDisconnect",title:"Omit Disconnect",subtitle:"Stops Discord from kicking you out of a voice call after 5 minutes of inactivity in it.",icon:"disconnect",patch:function patch(Patcher){var _this=this;Patcher.before(Timeout.prototype,"start",function(_,args){if(!get(_this.key))return;args[1].name==="disconnect"&&(args[1]=noop)})}};var _window_unbound$8=window["unbound"],_window_unbound_metro$5=_window_unbound$8.metro,findByProps$5=_window_unbound_metro$5.findByProps,Users$1=_window_unbound_metro$5.stores.Users;var NSFWManager=findByProps$5("isNSFWInvite",{lazy:true});var bypassNsfwGate={key:"bypassNsfwGate",title:"Bypass NSFW Gate",subtitle:"Allows you to bypass Discord's restrictions (regarding NSFW invites, guilds, etc) on iOS.",icon:"ic_shield_24px",patch:function patch(Patcher){var _this=this;["handleNSFWGuildInvite","isNSFWInvite","shouldNSFWGateGuild"].forEach(function(prop){return Patcher.instead(NSFWManager,prop,function(self,args,orig){return get(_this.key)?false:orig.apply(self,args)})});Patcher.after(Users$1,"getCurrentUser",function(_,__,res){(res===null||res===void 0?void 0:res.hasOwnProperty("nsfwAllowed"))&&(res.nsfwAllowed=true)})}};var _window_unbound$7=window["unbound"],_window_unbound_metro$4=_window_unbound$7.metro,findByProps$4=_window_unbound_metro$4.findByProps,findStore$3=_window_unbound_metro$4.findStore,Forms=_window_unbound_metro$4.components.Forms;var React$5=window["React"];var UserStore=findStore$3("User");var Profile=findByProps$4("getUserProfile",{lazy:true});var earlyPronouns={key:"earlyPronouns",title:"Early Pronouns",subtitle:function(){return"Set your own pronouns to ".concat(get("pronouns","")," early. Keep in mind others will not be able to see this.")},icon:"ic_accessibility_24px",patch:function patch(Patcher){var _this=this;Patcher.after(Profile,"getUserProfile",function(_,args,res){var _res;if(args[0]!==UserStore.getCurrentUser().id||!res||!get(_this.key)||!get("pronouns",""))return;(_res=res).pronouns||(_res.pronouns=get("pronouns",""))})},render:function render(disabled){return React$5.createElement(Forms.FormInput,{placeholder:"Your pronouns go here",title:"Pronouns",value:get("pronouns",""),onChange:function(value){return set("pronouns",value)},disabled:disabled,style:{marginTop:-16}})}};function _array_like_to_array$4(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes$4(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit$4(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _non_iterable_rest$4(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array$4(arr,i){return _array_with_holes$4(arr)||_iterable_to_array_limit$4(arr,i)||_unsupported_iterable_to_array$4(arr,i)||_non_iterable_rest$4()}function _unsupported_iterable_to_array$4(o,minLen){if(!o)return;if(typeof o==="string")return _array_like_to_array$4(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array$4(o,minLen)}var _window_unbound$6=window["unbound"],_window_unbound_metro$3=_window_unbound$6.metro,findByProps$3=_window_unbound_metro$3.findByProps,findStore$2=_window_unbound_metro$3.findStore,Users=_window_unbound_metro$3.stores.Users;var MessageStore$1=findStore$2("Message");var Messages=findByProps$3("sendMessage","startEditMessage",{lazy:true});var Handler$1=new Proxy({unpatch:null},{set:function set(target,prop,value,receiver){var _Reflect_get;(_Reflect_get=Reflect.get(target,prop,receiver))===null||_Reflect_get===void 0?void 0:_Reflect_get();return Reflect.set(target,prop,value,receiver)}});var doubleTap={key:"doubleTap",title:"Double Tap",subtitle:"Allows you to double tap on any of your own messages to start an edit event on them.",icon:"ic_edit_24px",tapIndex:0,patch:function patch(Patcher){var _this=this;Patcher.after(Chat.prototype,"render",function(_,__,res){var _res_props;(res===null||res===void 0?void 0:(_res_props=res.props)===null||_res_props===void 0?void 0:_res_props.onTapMessage)&&(Handler$1.unpatch=Patcher.after(res.props,"onTapMessage",function(_,param){var _param=_sliced_to_array$4(param,1),nativeEvent=_param[0].nativeEvent;var _Users_getCurrentUser;if(!get(_this.key))return;var ChannelID=nativeEvent.channelId;var MessageID=nativeEvent.messageId;_this.tapIndex++;var timeoutTap=setTimeout(function(){return _this.tapIndex=0},300);if(_this.tapIndex!==2)return;clearTimeout(timeoutTap);var _MessageStore_getMessage=MessageStore$1.getMessage(ChannelID,MessageID),id=_MessageStore_getMessage.author.id,content=_MessageStore_getMessage.content;((_Users_getCurrentUser=Users.getCurrentUser())===null||_Users_getCurrentUser===void 0?void 0:_Users_getCurrentUser.id)===id&&Messages.startEditMessage(ChannelID,MessageID,content);_this.tapIndex=0}))})}};function _array_like_to_array$3(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes$3(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit$3(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _non_iterable_rest$3(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array$3(arr,i){return _array_with_holes$3(arr)||_iterable_to_array_limit$3(arr,i)||_unsupported_iterable_to_array$3(arr,i)||_non_iterable_rest$3()}function _unsupported_iterable_to_array$3(o,minLen){if(!o)return;if(typeof o==="string")return _array_like_to_array$3(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array$3(o,minLen)}var _window_unbound$5=window["unbound"],_window_unbound_metro$2=_window_unbound$5.metro,findByProps$2=_window_unbound_metro$2.findByProps,findStore$1=_window_unbound_metro$2.findStore;var ReactNative=window["ReactNative"];var MessageStore=findStore$1("Message");var _findByProps=_sliced_to_array$3(findByProps$2({params:["insertText"],lazy:true},{params:["getLastSelectedChannelId"],lazy:true},{bulk:true}),2),ChatManager=_findByProps[0],getChannelId=_findByProps[1].getChannelId;var Handler=new Proxy({unpatch:null},{set:function set(target,prop,value,receiver){var _Reflect_get;(_Reflect_get=Reflect.get(target,prop,receiver))===null||_Reflect_get===void 0?void 0:_Reflect_get();return Reflect.set(target,prop,value,receiver)}});var usernameMention={key:"usernameMention",title:"Username Mention",subtitle:"Matches behavior on platforms where tapping a username in chat mentions the person.",icon:"ic_mention_user",patch:function patch(Patcher){var _this=this;Patcher.after(Chat.prototype,"render",function(_,__,res){var _res_props;ReactNative.Platform.OS!=="android"&&(res===null||res===void 0?void 0:(_res_props=res.props)===null||_res_props===void 0?void 0:_res_props.onTapUsername)&&(Handler.unpatch=Patcher.instead(res===null||res===void 0?void 0:res.props,"onTapUsername",function(self,args,orig){if(!get(_this.key))return orig.apply(self,args);var messageId=args[0].nativeEvent.messageId;var message=MessageStore.getMessage(getChannelId(),messageId);if(!message)return;var _message_author=message.author,username=_message_author.username,discriminator=_message_author.discriminator;ChatManager.insertText("@".concat(username).concat(Boolean(Number(discriminator))?"#".concat(discriminator):""))}))})}};var _window_ReactNative$1=window["ReactNative"],DCDChatManager=_window_ReactNative$1.NativeModules.DCDChatManager;var roleDots={key:"roleDots",title:"Add Role Dots",subtitle:"Force-enables role-dots aswell as role-colors disregarding your accessibility settings.",icon:"ic_members",patch:function patch(Patcher){var _this=this;Patcher.before(DCDChatManager,"updateRows",function(_,args){if(!get(_this.key))return;var rows=JSON.parse(args[1]);var _iteratorNormalCompletion=true,_didIteratorError=false,_iteratorError=undefined;try{for(var _iterator=rows[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var row=_step.value;if(row.type===1){row.message.shouldShowRoleDot=true;row.message.shouldShowRoleOnName=true}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}args[1]=JSON.stringify(rows)})}};var _window_unbound$4=window["unbound"],_window_unbound_metro$1=_window_unbound$4.metro,findByProps$1=_window_unbound_metro$1.findByProps,findStore=_window_unbound_metro$1.findStore,_window_unbound_metro_common$1=_window_unbound_metro$1.common,_window_unbound_metro_common_Theme=_window_unbound_metro_common$1.Theme,colors=_window_unbound_metro_common_Theme.colors,meta=_window_unbound_metro_common_Theme.meta,_window_unbound_metro_components$1=_window_unbound_metro$1.components,FormLabel=_window_unbound_metro_components$1.Forms.FormLabel,Slider=_window_unbound_metro_components$1.Slider;var React$4=window["React"];var View$3=window["ReactNative"].View;var ThemeStore=findStore("Theme");var MediaItemManager=findByProps$1("getNumMediaItemsPerRow");var renderLabel=function(text,disabled){return React$4.createElement(FormLabel,{text:text,color:"text-normal",style:{marginHorizontal:24,opacity:disabled?.5:1}})};var mediaItems={key:"mediaItems",title:"Media Items",subtitle:function(){return"Changes the amount of media items per row in media picker to '".concat(get("mediaItemsNumber",2),"' instead of the default '3'.")},icon:"ic_image",patch:function patch(Patcher){var _this=this;Patcher.instead(MediaItemManager,"getNumMediaItemsPerRow",function(self,args,orig){if(!get(_this.key))return orig.apply(self,args);return get("mediaItemsNumber",2)})},render:function render(disabled){var minimum=1;var maximum=8;return React$4.createElement(View$3,{style:{alignItems:"center",flexDirection:"row"}},renderLabel(minimum,disabled),React$4.createElement(Slider,{value:get("mediaItemsNumber",2),minimumValue:minimum,maximumValue:maximum,style:{flex:1},minimumTrackTintColor:meta.resolveSemanticColor(ThemeStore.theme,colors.HEADER_PRIMARY),maximumTrackTintColor:meta.resolveSemanticColor(ThemeStore.theme,colors.BACKGROUND_PRIMARY),step:1,onValueChange:function(value){return set("mediaItemsNumber",value)},disabled:disabled,tapToSeek:true}),renderLabel(maximum,disabled))}};function _array_like_to_array$2(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes$2(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit$2(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _non_iterable_rest$2(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array$2(arr,i){return _array_with_holes$2(arr)||_iterable_to_array_limit$2(arr,i)||_unsupported_iterable_to_array$2(arr,i)||_non_iterable_rest$2()}function _unsupported_iterable_to_array$2(o,minLen){if(!o)return;if(typeof o==="string")return _array_like_to_array$2(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array$2(o,minLen)}var _window_unbound$3=window["unbound"],findByProps=_window_unbound$3.metro.findByProps;var View$2=window["ReactNative"].View;var React$3=window["React"];var SourceManager=findByProps("getAnimatableSourceWithFallback",{lazy:true});var sourceAnimation={key:"sourceAnimation",title:"Source Animation",subtitle:function(){return"".concat(get("shouldAnimate",true)?"Always":"Never"," animates any sourceable assets (such as Profile Pictures or Guild Icons).")},icon:function(){return get("shouldAnimate",true)?"play":"pause"},patch:function patch(Patcher){var _this=this;Patcher.before(SourceManager,"getAnimatableSourceWithFallback",function(_,args){if(!get(_this.key))return;args[0]=get("shouldAnimate",true)})},render:function render(disabled){var _React_useState=_sliced_to_array$2(React$3.useState(String(!!get("shouldAnimate",true))),2),activeTab=_React_useState[0],setActiveTab=_React_useState[1];var tabs=[{id:"true",title:"Animated"},{id:"false",title:"Non-animated"}];return React$3.createElement(View$2,{style:{opacity:disabled?.5:1,marginHorizontal:16,marginBottom:12}},React$3.createElement(BadgableTabBar,{tabs:tabs,activeTab:activeTab,onTabSelected:function(tab){return!disabled&&(set("shouldAnimate",JSON.parse(tab)),setActiveTab(tab))}}))}};function _array_like_to_array$1(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes$1(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit$1(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _non_iterable_rest$1(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array$1(arr,i){return _array_with_holes$1(arr)||_iterable_to_array_limit$1(arr,i)||_unsupported_iterable_to_array$1(arr,i)||_non_iterable_rest$1()}function _unsupported_iterable_to_array$1(o,minLen){if(!o)return;if(typeof o==="string")return _array_like_to_array$1(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array$1(o,minLen)}var React$2=window["React"];var View$1=window["ReactNative"].View;var _window_unbound$2=window["unbound"],find=_window_unbound$2.metro.find;var _find=find(function(x){var _x_default,_x_default_render;return(x===null||x===void 0?void 0:(_x_default=x.default)===null||_x_default===void 0?void 0:(_x_default_render=_x_default.render)===null||_x_default_render===void 0?void 0:_x_default_render.name)==="ActionSheet"}),ActionSheet=_find.default;var expandableSheet={key:"expandableSheet",title:"Expandable ActionSheets",subtitle:function(){return"Forces any User-Profile Action Sheets to always initially render as ".concat(get("shouldExpand",false)?"":"non-","expanded.")},icon:function(){return"ic_chevron_".concat(get("shouldExpand",false)?"up":"down","_24px")},patch:function patch(Patcher){var _this=this;Patcher.before(ActionSheet,"render",function(_,args){if(!args[0].startExpanded||!get(_this.key))return;args[0].startExpanded=get("shouldExpand",false)})},render:function render(disabled){var _React_useState=_sliced_to_array$1(React$2.useState(String(!!get("shouldExpand",false))),2),activeTab=_React_useState[0],setActiveTab=_React_useState[1];var tabs=[{id:"false",title:"Non-expanded"},{id:"true",title:"Expanded"}];return React$2.createElement(View$1,{style:{opacity:disabled?.5:1,marginHorizontal:16,marginBottom:12}},React$2.createElement(BadgableTabBar,{tabs:tabs,activeTab:activeTab,onTabSelected:function(tab){return!disabled&&(set("shouldExpand",JSON.parse(tab)),setActiveTab(tab))}}))}};var sections={recommended:{icon:"img_nitro_star",patches:{headerPrimary:headerPrimary,jsonFix:jsonFix,tenorFix:tenorFix,omitDisconnect:omitDisconnect,bypassNsfwGate:bypassNsfwGate}},utilities:{icon:"debug",patches:{earlyPronouns:earlyPronouns,doubleTap:doubleTap,usernameMention:usernameMention}},preferences:{icon:"ic_pencil_24px",patches:{roleDots:roleDots,mediaItems:mediaItems,sourceAnimation:sourceAnimation,expandableSheet:expandableSheet}}};var patchAll=function(Patcher){return Object.values(sections).forEach(function(section){Object.values(section.patches).forEach(function(value){try{value.patch(Patcher)}catch(e){var _e_message;console.error("Patch '".concat(value.title,"' (").concat(value.key,") errored with '").concat((_e_message=e.message)!==null&&_e_message!==void 0?_e_message:e,"'."))}})})};function _array_like_to_array(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes(arr){if(Array.isArray(arr))return arr}function _define_property(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _iterable_to_array_limit(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _non_iterable_rest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))}ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}function _object_without_properties(source,excluded){if(source==null)return{};var target=_object_without_properties_loose(source,excluded);var key,i;if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++){key=sourceSymbolKeys[i];if(excluded.indexOf(key)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(source,key))continue;target[key]=source[key]}}return target}function _object_without_properties_loose(source,excluded){if(source==null)return{};var target={};var sourceKeys=Object.keys(source);var key,i;for(i=0;i<sourceKeys.length;i++){key=sourceKeys[i];if(excluded.indexOf(key)>=0)continue;target[key]=source[key]}return target}function _sliced_to_array(arr,i){return _array_with_holes(arr)||_iterable_to_array_limit(arr,i)||_unsupported_iterable_to_array(arr,i)||_non_iterable_rest()}function _unsupported_iterable_to_array(o,minLen){if(!o)return;if(typeof o==="string")return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}var _window_unbound$1=window["unbound"],utilities=_window_unbound$1.utilities,_window_unbound_metro=_window_unbound$1.metro,_window_unbound_metro_common=_window_unbound_metro.common,StyleSheet=_window_unbound_metro_common.StyleSheet,Theme=_window_unbound_metro_common.Theme,_window_unbound_metro_components=_window_unbound_metro.components,_window_unbound_metro_components_Forms=_window_unbound_metro_components.Forms,FormDivider=_window_unbound_metro_components_Forms.FormDivider,FormRow=_window_unbound_metro_components_Forms.FormRow,FormSection=_window_unbound_metro_components_Forms.FormSection,FormSwitch=_window_unbound_metro_components_Forms.FormSwitch,getIDByName=_window_unbound$1.assets.getIDByName,useSettingsStore=_window_unbound$1.storage.useSettingsStore;var _window_ReactNative=window["ReactNative"],ScrollView=_window_ReactNative.ScrollView,TouchableOpacity=_window_ReactNative.TouchableOpacity,View=_window_ReactNative.View;var React$1=window["React"];var styles=StyleSheet.createThemedStyleSheet({view:{backgroundColor:Theme.colors.BACKGROUND_SECONDARY_ALT},titles:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",marginTop:25,marginBottom:-15},section:{marginHorizontal:16,shadowColor:"#000",shadowOffset:{width:1,height:4},shadowOpacity:.15,shadowRadius:4.65,elevation:8},icon:{width:16,height:16,marginHorizontal:4},space:{marginBottom:50}});var ToggleableSection=function(_param){var icon=_param.icon,children=_param.children,rest=_object_without_properties(_param,["icon","children"]);var _React_useState=_sliced_to_array(React$1.useState(false),2),hidden=_React_useState[0],setHidden=_React_useState[1];return React$1.createElement(FormSection,_object_spread({icon:React$1.createElement(View,{style:{flexDirection:"row"}},icon,React$1.createElement(TouchableOpacity,{onPress:function(){setHidden(function(previous){return!previous});configureNext({duration:300,create:{type:"keyboard",property:"scaleXY"},update:{type:"easeInEaseOut",property:"scaleY"},delete:{type:"easeInEaseOut",property:"opacity"}})}},React$1.createElement(FormRow.Icon,{source:getIDByName("ic_arrow".concat(hidden?"":"_down")),style:styles.icon})))},rest),hidden||children)};function Settings(){var settings=useSettingsStore(manifest.name);return React$1.createElement(ScrollView,{style:styles.view},React$1.createElement(View,{style:styles.titles},React$1.createElement(GenericHeaderTitle,{title:"Customize your ideal experience."}),React$1.createElement(GenericSubHeaderTitle,{subtitle:manifest.description})),React$1.createElement(View,{style:styles.section},Object.entries(sections).map(function(param){var _param=_sliced_to_array(param,2),title=_param[0],_param_=_param[1],icon=_param_.icon,patches=_param_.patches;return React$1.createElement(ToggleableSection,{title:utilities.capitalize(title),icon:React$1.createElement(FormRow.Icon,{style:styles.icon,source:getIDByName(icon)}),inset:true,sectionBodyStyle:{borderRadius:12},uppercaseTitle:false},Object.entries(patches).map(function(param,index,array){var _param=_sliced_to_array(param,2),name=_param[0],value=_param[1];var title=value.title,subtitle=value.subtitle,icon=value.icon,render=value.render;var _render;return React$1.createElement(React$1.Fragment,null,React$1.createElement(FormRow,{label:title,subLabel:typeof subtitle==="function"?subtitle===null||subtitle===void 0?void 0:subtitle():subtitle,leading:icon&&React$1.createElement(FormRow.Icon,{source:getIDByName(typeof icon==="function"?icon===null||icon===void 0?void 0:icon():icon)}),trailing:function(){return React$1.createElement(FormSwitch,{value:!!get(name,true),onValueChange:function(value){return settings.set(name,!!value)}})},disabled:!get(name,true)}),(_render=render===null||render===void 0?void 0:render(!get(name,true)))!==null&&_render!==void 0?_render:React$1.createElement(React$1.Fragment,null),index<array.length-1&&React$1.createElement(FormDivider,null))}))})),React$1.createElement(View,{style:styles.space}))}function _class_call_check(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _create_class(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var React=window["React"];var _window_unbound=window["unbound"],createPatcher=_window_unbound.patcher.createPatcher;var Patcher=createPatcher(manifest.name);var Plugin=function(){function Plugin(){_class_call_check(this,Plugin)}_create_class(Plugin,[{key:"start",value:function start(){patchAll(Patcher)}},{key:"stop",value:function stop(){Patcher.unpatchAll()}},{key:"settings",value:function settings(){return React.createElement(Settings,null)}}]);return Plugin}();var index=new Plugin;return index})();
