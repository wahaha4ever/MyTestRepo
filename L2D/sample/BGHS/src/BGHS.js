var thisRef = this;

//function BGHS()
//{
//	console.log("BGHS()");
//	var btnChangeModel = document.getElementById("btnChange");
//    btnChangeModel.addEventListener("click", function(e) {
//        changeModel();
//    });
//}
//
//function changeButton(bEnable)
//{
//	console.log("BGHS.changeButton()");
//	var btnChange = document.getElementById("btnChange");
//	if (!bEnable) 
//	{
//		btnChange.setAttribute("disabled","disabled");
//		btnChange.setAttribute("class", "inactive");
//		btnChange.textContent = "Now Loading...";
//	}
//	else
//	{
//		btnChange.textContent = "Change Model";
//        btnChange.removeAttribute("disabled");
//        btnChange.setAttribute("class", "active");
//	}
//}
//
//function changeModel2(cbShowDialog, path1, path2)
//{
//	console.log("BGHS.changeModel2()");
//	changeButton(false);
//	this.isModelShown = false;    
//	
//	this.live2DMgr.reloadFlg = true;
//	this.live2DMgr.changeModel2(this.gl, cbShowDialog, path1, path2);
//}


function changeModelJ2(arrConfig, cbShowDialog) 
{
	console.log("BGHS.changeModelJ2()");
	changeButton(false);
	this.isModelShown = false;
    
	this.live2DMgr.reloadFlg = true;
	//this.live2DMgr.count++;
	this.live2DMgr.changeModelJ2(this.gl, cbShowDialog, arrConfig, 
		function(config, json){
			if (config.face)
			{
				json.textures.length = 0;
				json.textures.push(config.face);
			}
			if (config.texture) {
				json.textures.push(config.texture);
			}
			else {
				json.textures.push("../"+config.dresscode+"/texture_01.png");
			}
			if (config.moc)
			{
				json.model = config.moc.replace("[dresscode]", config.dresscode);
			}
			else
			{
				json.model = "../"+config.dresscode+".moc";
			}
			if (config.layout) {
				if (!json.layout) {
					json.layout = {};
				}
				if (config.layout.center_x)
					json.layout.center_x = config.layout.center_x;
				if (config.layout.center_y)
					json.layout.center_y = config.layout.center_y;
				if (config.layout.width)
					json.layout.width = config.layout.width;
			}
			
			msgSetting = new MsgSetting(Live2DFramework);
			let voicePath = config.homedir + config.voiceroot + "voice_text.txt";
			msgSetting.setVoiceRoot(config.voiceroot);
			msgSetting.setMotionRoot(config.motionroot);
			msgSetting.load(voicePath).then(function(x) {
				if (config.hitareas) {
					json.hit_areas = [];
					for(var i in config.hitareas) {
						json.hit_areas.push(config.hitareas[i]);
					}
				}
				if (config.motions) {
					for(var tapArea in config.motions) {
						json.motions[tapArea] = [];
						for (var range in config.motions[tapArea]) {	
							//console.log(config.motions[tapArea][range]);
							let setting = config.motions[tapArea][range]
							for (var i = setting.min; i<= setting.max; i++) {
								let obj = msgSetting.getData(i);
								if (obj) {
									let jMotion = {
										name: obj.id,
										file: obj.motionFileName,
										expression : obj.expressionName,
										text : obj.msg,
										sound : obj.voiceFileName,
										priority : 9,
										weight : 1
									}
									if (setting.expcode)
										jMotion.expression = msgSetting.getExpressionName(setting.expcode)
									if (setting.motioncode)
										jMotion.file = msgSetting.getMotionFileName(setting.motioncode)
									json.motions[tapArea].push(jMotion);
								}
							}
						}
					}
					console.log(json);
					return json;
				}
				else{
					console.log(json);
					return json;
				}
			});
		},
		function (config, model) {
			////model.msgSetting = new MsgSetting(Live2DFramework);	
			////let voicePath = model.modelHomeDir + "../../0-girlVoice/voice_text.txt";
			////model.msgSetting.load(voicePath);
			//model.options.msgSetting = new MsgSetting(Live2DFramework);	
			//let voicePath2 = model.modelHomeDir + "../../0-girlVoice/voice_text.txt";
			//model.options.msgSetting.load(voicePath2);
			model.options.msgSetting = msgSetting;
		}
	);
}

function changeModel()
{
	console.log("BGHS.changeModel()");
}

//function customAction(modelix, motionGrp, motionNo, expressionName, msgNo)
//{
//	console.log("BGHS.customAction()");
//	thisRef.live2DMgr.setAction(modelix, motionGrp, motionNo, expressionName, msgNo);
//}
function customAction2(modelix, msgID, motionid, expressionid)
{
	console.log("BGHS.customAction2()");
	let model = thisRef.live2DMgr.getModel(modelix);
	if (model.options.msgSetting) {
		console.log(msgID);
		let data;		
		if (typeof msgID == 'undefined')
		{
			data = model.options.msgSetting.getRandomData();
		}
		else
		{
			data = model.options.msgSetting.getData(msgID);
		}
		console.log(data);
		let motion = 1;
		let exp = 1;
		if (data) {
			motion = data.motionFileName;
			if (motionid)
				motion = model.options.msgSetting.getMotionFileName(motionid);
			
			exp = data.expressionName;
			if (expressionid)
				exp = model.options.msgSetting.getExpressionName(expressionid);
			
			thisRef.live2DMgr.setAction2(modelix, LAppDefine.PRIORITY_NORMAL, motion, exp, data.msg, data.voiceFileName);
		} else {
			if (motionid)
				motion = model.options.msgSetting.getMotionFileName(motionid);			

			if (expressionid)
				exp = model.options.msgSetting.getExpressionName(expressionid);
			
			thisRef.live2DMgr.setAction2(modelix, LAppDefine.PRIORITY_NORMAL, motion, exp, msgID, null);
		}
	}
	//thisRef.live2DMgr.setActionByMsgID(modelix, msgID);
}