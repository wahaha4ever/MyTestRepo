//============================================================
//============================================================
//  class LAppModel     extends L2DBaseModel         
//============================================================
//============================================================
function LAppModel()
{
    //L2DBaseModel.apply(this, arguments);
    L2DBaseModel.prototype.constructor.call(this);
    
    this.modelHomeDir = "";
    this.modelSetting = null;
	//this.msgSetting = null;
	this.withIdleMotion = true;
	this.audio = null;
	this.audioBufferSouceNode = null;
	this.audioAnalyser = null;	
    this.tmpMatrix = [];
	this.options = {};
}

LAppModel.prototype = new L2DBaseModel();


//LAppModel.prototype.load = function(gl, modelSettingPath, callbackDone)
//{
//    this.setUpdating(true);
//    this.setInitialized(false);
//
//    this.modelHomeDir = modelSettingPath.substring(0, modelSettingPath.lastIndexOf("/") + 1); 
//
//    this.modelSetting = new ModelSettingJson();
//	
//	this.msgSetting = new MsgSetting(Live2DFramework);	
//	
//    var thisRef = this;
//	
//	
//	// use promises to wait until all resources are loaded
//	var promises = [];	
//	var p1 = new Promise( function (resolve, reject) {
//		let voicePath = thisRef.modelHomeDir + "../../0-girlVoice/voice_text.txt";
//		thisRef.msgSetting.load(voicePath, function(str){
//			resolve(str);
//		});		
//	}, null, xhr => reject(xhr));	
//	promises.push(p1);
//	
//	var p2 = new Promise( function (resolve, reject) {
//		thisRef.modelSetting.loadModelSetting(modelSettingPath, function(){
//				
//			var path = thisRef.modelHomeDir + thisRef.modelSetting.getModelFile();
//			thisRef.loadModelData(path, function(model){
//				
//				for (var i = 0; i < thisRef.modelSetting.getTextureNum(); i++)
//				{
//					
//					var texPaths = thisRef.modelHomeDir + 
//						thisRef.modelSetting.getTextureFile(i);
//					
//					thisRef.loadTexture(i, texPaths, function() {
//						
//						if( thisRef.isTexLoaded ) {
//							
//							if (thisRef.modelSetting.getExpressionNum() > 0)
//							{
//								
//								thisRef.expressions = {};
//								
//								for (var j = 0; j < thisRef.modelSetting.getExpressionNum(); j++)
//								{
//									var expName = thisRef.modelSetting.getExpressionName(j);
//									var expFilePath = thisRef.modelHomeDir + 
//										thisRef.modelSetting.getExpressionFile(j);
//									
//									thisRef.loadExpression(expName, expFilePath);
//								}
//							}
//							else
//							{
//								thisRef.expressionManager = null;
//								thisRef.expressions = {};
//							}
//							
//							
//							
//							if (thisRef.eyeBlink == null)
//							{
//								thisRef.eyeBlink = new L2DEyeBlink();
//							}
//							
//							
//							if (thisRef.modelSetting.getPhysicsFile() != null)
//							{
//								thisRef.loadPhysics(thisRef.modelHomeDir + 
//													thisRef.modelSetting.getPhysicsFile());
//							}
//							else
//							{
//								thisRef.physics = null;
//							}
//							
//							
//							
//							if (thisRef.modelSetting.getPoseFile() != null)
//							{
//								thisRef.loadPose(
//									thisRef.modelHomeDir +
//									thisRef.modelSetting.getPoseFile(),
//									function() {
//										thisRef.pose.updateParam(thisRef.live2DModel);
//									}
//								);
//							}
//							else
//							{
//								thisRef.pose = null;
//							}
//							
//							
//							if (thisRef.modelSetting.getLayout() != null)
//							{
//								var layout = thisRef.modelSetting.getLayout();
//								if (layout["width"] != null)
//									thisRef.modelMatrix.setWidth(layout["width"]);
//								if (layout["height"] != null)
//									thisRef.modelMatrix.setHeight(layout["height"]);
//
//								if (layout["x"] != null)
//									thisRef.modelMatrix.setX(layout["x"]);
//								if (layout["y"] != null)
//									thisRef.modelMatrix.setY(layout["y"]);
//								if (layout["center_x"] != null)
//									thisRef.modelMatrix.centerX(layout["center_x"]);
//								if (layout["center_y"] != null)
//									thisRef.modelMatrix.centerY(layout["center_y"]);
//								if (layout["top"] != null)
//									thisRef.modelMatrix.top(layout["top"]);
//								if (layout["bottom"] != null)
//									thisRef.modelMatrix.bottom(layout["bottom"]);
//								if (layout["left"] != null)
//									thisRef.modelMatrix.left(layout["left"]);
//								if (layout["right"] != null)
//									thisRef.modelMatrix.right(layout["right"]);
//							}
//							
//							for (var j = 0; j < thisRef.modelSetting.getInitParamNum(); j++)
//							{
//								
//								thisRef.live2DModel.setParamFloat(
//									thisRef.modelSetting.getInitParamID(j),
//									thisRef.modelSetting.getInitParamValue(j)
//								);
//							}
//
//							for (var j = 0; j < thisRef.modelSetting.getInitPartsVisibleNum(); j++)
//							{
//								
//								thisRef.live2DModel.setPartsOpacity(
//									thisRef.modelSetting.getInitPartsVisibleID(j),
//									thisRef.modelSetting.getInitPartsVisibleValue(j)
//								);
//							}
//							
//							
//							
//							thisRef.live2DModel.saveParam();
//							// thisRef.live2DModel.setGL(gl);
//							
//							
//							thisRef.preloadMotionGroup(LAppDefine.MOTION_GROUP_IDLE);
//							thisRef.mainMotionManager.stopAllMotions();
//
//							thisRef.setUpdating(false); 
//							thisRef.setInitialized(true); 
//
//							//if (typeof callback == "function") callback();
//							
//							resolve(model);
//							
//						}
//					});
//				}
//			});
//		});
//	}, null, xhr => reject(xhr));	
//	promises.push(p2);
//	
//	Promise.all(promises).then(
//		function(arrayOfObjects) {
//			if (callbackDone)
//				callbackDone();
//		},
//		function (error)  {
//			thisRef.error( "Could not load all object:", error );			
//		}
//	);
//};

LAppModel.prototype.load = function(gl, modelSettingPath, homeDir, callbackLoadJson, callbackDone)
{
	var thisRef = this;
	
	thisRef.setUpdating(true);
	thisRef.setInitialized(false);

	thisRef.modelHomeDir = homeDir || modelSettingPath.substring(0, modelSettingPath.lastIndexOf("/") + 1); 
	thisRef.modelSetting = new ModelSettingJson();	
	

	thisRef.modelSetting.loadModelSetting(modelSettingPath, function(){
		if (callbackLoadJson)
			callbackLoadJson(thisRef.modelSetting.json)
		
		var path = thisRef.modelHomeDir + thisRef.modelSetting.getModelFile();
		
		thisRef.loadModelData(path, function(model){
			
			for (var i = 0; i < thisRef.modelSetting.getTextureNum(); i++)
			{
				
				var texPaths = thisRef.modelHomeDir + 
					thisRef.modelSetting.getTextureFile(i);
				
				thisRef.loadTexture(i, texPaths, function() {
					
					if( thisRef.isTexLoaded ) {
						
						if (thisRef.modelSetting.getExpressionNum() > 0)
						{
							
							thisRef.expressions = {};
							
							for (var j = 0; j < thisRef.modelSetting.getExpressionNum(); j++)
							{
								var expName = thisRef.modelSetting.getExpressionName(j);
								var expFilePath = thisRef.modelHomeDir + 
									thisRef.modelSetting.getExpressionFile(j);
								
								thisRef.loadExpression(expName, expFilePath);
							}
						}
						else
						{
							thisRef.expressionManager = null;
							thisRef.expressions = {};
						}
						
						
						
						if (thisRef.eyeBlink == null)
						{
							thisRef.eyeBlink = new L2DEyeBlink();
						}
						
						
						if (thisRef.modelSetting.getPhysicsFile() != null)
						{
							thisRef.loadPhysics(thisRef.modelHomeDir + 
												thisRef.modelSetting.getPhysicsFile());
						}
						else
						{
							thisRef.physics = null;
						}
						
						
						
						if (thisRef.modelSetting.getPoseFile() != null)
						{
							thisRef.loadPose(
								thisRef.modelHomeDir +
								thisRef.modelSetting.getPoseFile(),
								function() {
									thisRef.pose.updateParam(thisRef.live2DModel);
								}
							);
						}
						else
						{
							thisRef.pose = null;
						}
						
						
						if (thisRef.modelSetting.getLayout() != null)
						{
							var layout = thisRef.modelSetting.getLayout();
							if (layout["width"] != null)
								thisRef.modelMatrix.setWidth(layout["width"]);
							if (layout["height"] != null)
								thisRef.modelMatrix.setHeight(layout["height"]);

							if (layout["x"] != null)
								thisRef.modelMatrix.setX(layout["x"]);
							if (layout["y"] != null)
								thisRef.modelMatrix.setY(layout["y"]);
							if (layout["center_x"] != null)
								thisRef.modelMatrix.centerX(layout["center_x"]);
							if (layout["center_y"] != null)
								thisRef.modelMatrix.centerY(layout["center_y"]);
							if (layout["top"] != null)
								thisRef.modelMatrix.top(layout["top"]);
							if (layout["bottom"] != null)
								thisRef.modelMatrix.bottom(layout["bottom"]);
							if (layout["left"] != null)
								thisRef.modelMatrix.left(layout["left"]);
							if (layout["right"] != null)
								thisRef.modelMatrix.right(layout["right"]);
						}
						
						for (var j = 0; j < thisRef.modelSetting.getInitParamNum(); j++)
						{
							
							thisRef.live2DModel.setParamFloat(
								thisRef.modelSetting.getInitParamID(j),
								thisRef.modelSetting.getInitParamValue(j)
							);
						}

						for (var j = 0; j < thisRef.modelSetting.getInitPartsVisibleNum(); j++)
						{
							
							thisRef.live2DModel.setPartsOpacity(
								thisRef.modelSetting.getInitPartsVisibleID(j),
								thisRef.modelSetting.getInitPartsVisibleValue(j)
							);
						}
						
						
						
						thisRef.live2DModel.saveParam();
						// thisRef.live2DModel.setGL(gl);
						
						
						thisRef.preloadMotionGroup(LAppDefine.MOTION_GROUP_IDLE);
						thisRef.mainMotionManager.stopAllMotions();

						thisRef.setUpdating(false); 
						thisRef.setInitialized(true); 

						if (typeof callbackDone == "function") callbackDone(thisRef);
					}
				});
			}
		});
	});
};

//LAppModel.prototype.loadx = function(gl, modelSettingPath, homeDir, callbackLoadJson, callbackLoadDone)
//{
//	
//	var thisRef = this;
//	
//	
//	// use promises to wait until all resources are loaded
//	var promises = [];	
//	var p1 = new Promise( function (resolve, reject) {
//		thisRef.msgSetting = new MsgSetting(Live2DFramework);	
//		let voicePath = homeDir + "../../0-girlVoice/voice_text.txt";
//		//let voicePath = thisRef.modelHomeDir + "../../0-girlVoice/voice_text.txt";
//		thisRef.msgSetting.load(voicePath, function(str){
//			resolve(str);
//		});		
//	}, null, xhr => reject(xhr));	
//	promises.push(p1);
//	
//	var p2 = new Promise( function (resolve, reject) {
//		thisRef.loadModelSetting(gl, modelSettingPath, homeDir, callbackLoadJson, function(model) {
//			resolve(model);
//		});
//	}, null, xhr => reject(xhr));	
//	promises.push(p2);
//	
//	Promise.all(promises).then(
//		function(arrayOfObjects) {
//			if (callbackLoadDone)
//				callbackLoadDone();
//		},
//		function (error)  {
//			thisRef.error( "Could not load all object:", error );			
//		}
//	);
//};

LAppModel.prototype.release = function(gl)
{
    // this.live2DModel.deleteTextures();
    var pm = Live2DFramework.getPlatformManager();

    gl.deleteTexture(pm.texture);
}



LAppModel.prototype.preloadMotionGroup = function(name)
{
    var thisRef = this;
    
    for (var i = 0; i < this.modelSetting.getMotionNum(name); i++)
    {
        var file = this.modelSetting.getMotionFile(name, i);
        this.loadMotion(file, this.modelHomeDir + file, function(motion) {
            motion.setFadeIn(thisRef.modelSetting.getMotionFadeIn(name, i));
            motion.setFadeOut(thisRef.modelSetting.getMotionFadeOut(name, i));
        });
        
    }
}


LAppModel.prototype.update = function()
{
    // console.log("--> LAppModel.update()");

    if(this.live2DModel == null) 
    {
        if (LAppDefine.DEBUG_LOG) this.error("Failed to update.");
        
        return;
    }
    
    var timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
    var timeSec = timeMSec / 1000.0;
    var t = timeSec * 2 * Math.PI; 
    
    
    if (this.mainMotionManager.isFinished() && this.withIdleMotion && this.audioAnalyser == null)
    {
		//Patrick
		this.showDialog("");
        this.startRandomMotion(LAppDefine.MOTION_GROUP_IDLE, LAppDefine.PRIORITY_IDLE);
    }
    
    //-----------------------------------------------------------------		
    
    
    this.live2DModel.loadParam();
    
    
    
    var update = this.mainMotionManager.updateParam(this.live2DModel); 
    if (!update) {
        
        if(this.eyeBlink != null) {
            this.eyeBlink.updateParam(this.live2DModel);
        }
    }

    
    this.live2DModel.saveParam();
    
    //-----------------------------------------------------------------		
    
    
    if (this.expressionManager != null && 
        this.expressions != null && 
        !this.expressionManager.isFinished())
    {
        this.expressionManager.updateParam(this.live2DModel); 
    }

    
    
    this.live2DModel.addToParamFloat("PARAM_ANGLE_X", this.dragX * 30, 1); 
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", this.dragY * 30, 1);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", (this.dragX * this.dragY) * -30, 1);

    
    
    this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", this.dragX*10, 1); 

    
    
    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1); 
    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1);


    
    this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 
                                     Number((15 * Math.sin(t / 6.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 
                                     Number((8 * Math.sin(t / 3.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", 
                                     Number((10 * Math.sin(t / 5.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 
                                     Number((4 * Math.sin(t / 15.5345))), 0.5);
    this.live2DModel.setParamFloat("PARAM_BREATH", 
                                   Number((0.5 + 0.5 * Math.sin(t / 3.2345))), 1);
    
    
    if (this.physics != null)
    {
        this.physics.updateParam(this.live2DModel); 
    }
    
    
    //if (this.lipSync == null)
    //{
    //    this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y",
    //                                   this.lipSyncValue);
    //}
	
	if (this.audio != null && this.audioAnalyser != null)
	{
		// calculate the voice's average frequence for lip sync
		let audioData = new Uint8Array(this.audioAnalyser.frequencyBinCount);
		this.audioAnalyser.getByteFrequencyData(audioData);
		// take average over all frequency band
		let amp = 0;
		for (var i = 0 ; i < audioData.length ; i++)
		{
			amp += audioData[i] / 255;
		}
		this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", amp / audioData.length);
	}
    
    if( this.pose != null ) {
        this.pose.updateParam(this.live2DModel);
    }
        
    this.live2DModel.update();
};



LAppModel.prototype.setRandomExpression = function()
{
    var tmp = [];
    for (var name in this.expressions)
    {
        tmp.push(name);
    }

    var no = parseInt(Math.random() * tmp.length);

    this.setExpression(tmp[no]);
}



LAppModel.prototype.startRandomMotion = function(name, priority)
{
    var max = this.modelSetting.getMotionNum(name);
    var no = parseInt(Math.random() * max);
    this.startMotion(name, no, priority);
}

//LAppModel.prototype.startMotionByMsgID = function(msgID)
//{
//	let thisRef = this;	
//	let priority = LAppDefine.PRIORITY_NORMAL;
//	let data;
//	if (typeof msgID == 'undefined')
//	{
//		data = this.msgSetting.getRandomData();
//	}
//	else
//	{
//		data = this.msgSetting.getData(msgID);
//	}
//	
//	if (data) {
//		
//		if (priority == LAppDefine.PRIORITY_FORCE) 
//		{
//			this.mainMotionManager.setReservePriority(priority);
//		}
//		else if (!this.mainMotionManager.reserveMotion(priority))
//		{
//			if (LAppDefine.DEBUG_LOG)
//				this.log("Motion is running.")
//				//console.log("Motion is running.")
//				
//			return;
//		}
//		
//		
//		if (LAppDefine.DEBUG_LOG)
//			this.log("Start motion : " + data.motionFileName);
//		
//		let motion = this.motions[data.motionFileName];
//		if (motion == null) 
//		{
//			this.loadMotion(data.motionFileName, this.modelHomeDir + data.motionFileName, function(mtn) {
//				motion = mtn;
//				thisRef.startMotionAs(priority, motion, data.expressionName, data.msg, data.voiceFileWithPath);
//				
//			});
//		}
//		else 
//		{
//			thisRef.startMotionAs(priority, motion, data.expressionName, data.msg, data.voiceFileWithPath);
//		}
//	}
//	else {
//        if (LAppDefine.DEBUG_LOG)
//            this.log("Invalid Message ID : "+ msgID);
//	}
//}

LAppModel.prototype.startMotion = function(name, no, priority, expressionName, message, voiceFile)
{
    // console.log("startMotion : " + name + " " + no + " " + priority);    
    var motionFileName = this.modelSetting.getMotionFile(name, no);    
    if (motionFileName == null || motionFileName == "")
    {
        if (LAppDefine.DEBUG_LOG)
            this.error("Failed to motion.");
        return;
    }

    if (priority == LAppDefine.PRIORITY_FORCE) 
    {
        this.mainMotionManager.setReservePriority(priority);
    }
    else if (!this.mainMotionManager.reserveMotion(priority))
    {
        if (LAppDefine.DEBUG_LOG)
			this.log("Motion is running.")
            //console.log("Motion is running.")
			
        return;
    }

    var thisRef = this;
    var motion = this.motions[motionFileName];
    if (motion == null) 
    {
        this.loadMotion(motionFileName, this.modelHomeDir + motionFileName, function(mtn) {
            motion = mtn;
            
            thisRef.setFadeInFadeOut(name, no, priority, motion, expressionName, message, voiceFile);
            
        });
    }
    else 
    {
        //motion = this.motions[motionFileName];        
        
        thisRef.setFadeInFadeOut(name, no, priority, motion, expressionName, message, voiceFile);
    }
}

LAppModel.prototype.startMotion2 = function(priority, motionName, expressionName, message, voiceFile)
{
	let thisRef = this;
	if (priority == LAppDefine.PRIORITY_FORCE) 
	{
		this.mainMotionManager.setReservePriority(priority);
	}
	else if (!this.mainMotionManager.reserveMotion(priority))
	{
		if (LAppDefine.DEBUG_LOG)
			this.log("Motion is running.")
			//console.log("Motion is running.")
			
		return;
	}
	
	
	if (LAppDefine.DEBUG_LOG)
		this.log("Start motion : " + motionName);
	
	let motion = this.motions[motionName];
	if (motion == null) 
	{
		this.loadMotion(motionName, this.modelHomeDir + motionName, function(mtn) {
			motion = mtn;
			thisRef.startMotionAs(priority, motion, expressionName, message, this.modelHomeDir + voiceFile);
			
		});
	}
	else 
	{
		thisRef.startMotionAs(priority, motion, expressionName, message, this.modelHomeDir + voiceFile);
	}
}


LAppModel.prototype.setFadeInFadeOut = function(name, no, priority, motion, expressionName, message, voiceFile)
{
    motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, no));
    motion.setFadeOut(this.modelSetting.getMotionFadeOut(name, no));
	
    var motionFileName = this.modelSetting.getMotionFile(name, no);
    var motionExpressionName = this.modelSetting.getMotionExpression(name, no) || expressionName;
	var motionText = this.modelSetting.getMotionText(name, no) || message;
	var motionVoice = (this.modelSetting.getMotionSound(name, no) || voiceFile);
	if (motionVoice)
		motionVoice = this.modelHomeDir + motionVoice;
    if (LAppDefine.DEBUG_LOG)
		this.log("Start motion : " + motionFileName);		
	this.startMotionAs(priority, motion, motionExpressionName, motionText, motionVoice);
}

LAppModel.prototype.startMotionAs = function(priority, motion, expressionName, message, voiceFile)
{
	let thisRef = this;
	var showDialogInner = function(msg){
		if (LAppDefine.DEBUG_LOG)
			thisRef.log(msg);
		var modelName = thisRef.modelSetting.getName();
		thisRef.showDialog(modelName + " : <br/>" + msg);
	}
	
	if (message)
		showDialogInner(message);
	if (voiceFile)
		this.playAudio(voiceFile);		
	this.setExpression(expressionName);    
	this.mainMotionManager.startMotionPrio(motion, priority);
}



LAppModel.prototype.setExpression = function(name)
{
    var expression = this.expressions[name];    
    if (LAppDefine.DEBUG_LOG)
		this.log("Expression : " + name);        
    this.expressionManager.startMotion(expression, false);
}



LAppModel.prototype.draw = function(gl)
{
    //console.log("--> LAppModel.draw()");
    
    // if(this.live2DModel == null) return;
    
    
    MatrixStack.push();
    
    MatrixStack.multMatrix(this.modelMatrix.getArray());
    
    this.tmpMatrix = MatrixStack.getMatrix()
    this.live2DModel.setMatrix(this.tmpMatrix);
    this.live2DModel.draw();
    
    MatrixStack.pop();
    
};
        


LAppModel.prototype.hitTest = function(id, testX, testY)
{
    var len = this.modelSetting.getHitAreaNum();
    for (var i = 0; i < len; i++)
    {

        if (id == this.modelSetting.getHitAreaName(i))
        {
            var drawID = this.modelSetting.getHitAreaID(i);
            
            return this.hitTestSimple(drawID, testX, testY);
        }
    }
    
    return false; 
}


LAppModel.prototype.tapMotion = function(testX, testY)
{
    var len = this.modelSetting.getHitAreaNum();
	let bResult = false;
    for (var i = 0; i < len; i++)
    {
		var drawID = this.modelSetting.getHitAreaID(i);
		bResult = this.hitTestSimple(drawID, testX, testY);
		
		if (bResult) {			
			return this.modelSetting.getHitAreaMotion(i) || LAppDefine.MOTION_GROUP_PFX_TAP + this.modelSetting.getHitAreaName(i);
		}
    }    
    return null; 
}

LAppModel.prototype.playAudio = function(path) 
{
	let thisRef = this;
	
    var context = thisRef.audio || new AudioContext() || new webkitAudioContext(),
        request = new XMLHttpRequest();   
	
	thisRef.audio = context;
	
    request.open("GET", path, true);
    request.responseType = "arraybuffer";
    request.onload = function(){
        context.decodeAudioData(request.response, onDecoded);
    }
    
    function onDecoded(buffer){
        //var bufferSource = context.createBufferSource();
        //bufferSource.buffer = buffer;
        //bufferSource.connect(context.destination);
        //bufferSource.start();
		
		//var audioBufferSouceNode = context.createBufferSource();
		//var analyser = context.createAnalyser()
		//audioBufferSouceNode.connect(analyser);
		//analyser.connect(context.destination);
		//audioBufferSouceNode.buffer = buffer;
		//audioBufferSouceNode.start();

		thisRef.audioBufferSouceNode = context.createBufferSource();
		thisRef.audioBufferSouceNode.onended = function(event) {
			//thisRef.log("onended");
			thisRef.audioBufferSouceNode.disconnect(thisRef.audioAnalyser);
			thisRef.audioBufferSouceNode = null;
			thisRef.audioAnalyser = null;
			thisRef.log("End sound : " + path);
		};
		thisRef.audioAnalyser = context.createAnalyser()
		thisRef.audioAnalyser.fftSize = 64;
		thisRef.audioBufferSouceNode.connect(thisRef.audioAnalyser);
		thisRef.audioAnalyser.connect(context.destination);
		thisRef.audioBufferSouceNode.buffer = buffer;
		
		thisRef.log("Start sound : " + path);
		thisRef.audioBufferSouceNode.start();
		
		//thisRef.audioData = new Uint8Array(thisRef.audioAnalyser.frequencyBinCount);
		//thisRef.audioData = new Float32Array(thisRef.audioAnalyser.fftSize);	
    }
    request.send();
}

LAppModel.prototype.showDialog = function(str) 
{
	var modelName = this.modelSetting.getName();
	console.log(modelName + " : " + str);
}

LAppModel.prototype.log = function(str) 
{
	var modelName = this.modelSetting.getName();
	console.log(modelName + " - " + str);
}

LAppModel.prototype.error = function(str)
{
	var modelName = this.modelSetting.getName();
	console.error(modelName + " - " + str);
}