function LAppLive2DManager()
{
    // console.log("--> LAppLive2DManager()");
    
    
    this.models = [];  
    
    
    //this.count = -1;
    this.reloadFlg = false;     
    Live2D.init();
    Live2DFramework.setPlatformManager(new PlatformManager);
    
}

LAppLive2DManager.prototype.createModel = function()
{
    
    
    var model = new LAppModel();
    this.models.push(model);
    
    return model;
}

LAppLive2DManager.prototype.changeModel2 = function(gl, callBackShowDialog, modelJsonPath1, modelJsonPath2) 
{
	if (this.reloadFlg)
    {
        this.reloadFlg = false;
		var thisRef = this;
		
		for (var i = this.models.length - 1; i >= 0 ; i--) {
			this.releaseModel(i, gl);	
		}		
		console.log(modelJsonPath1);
		thisRef.addModel(gl, modelJsonPath1, function(model1) {	
			model1.showDialog = callBackShowDialog;
			model1.modelMatrix.centerX(0);
			
			
			if (modelJsonPath2) {
				thisRef.addModel(gl, modelJsonPath2, function(model2) {
					model2.showDialog = callBackShowDialog;
					
					model1.modelMatrix.centerX(-0.5);
					model2.modelMatrix.centerX(0.5);
				})
			}
		});
	}
}

LAppLive2DManager.prototype.addModel = function(gl, modelJsonPath, callback) 
{
	let model = this.createModel();

	model.load(gl, modelJsonPath, null, null, function(model1) {
		if (callback)
			callback(model1);
	});
}

//LAppLive2DManager.prototype.addModelJ = function(gl, modelJsonPath, homeDir, callbackJsonModel, callback) 
//{
//	let model = this.createModel();
//	model.loadx(gl, modelJsonPath, homeDir, 
//		function(json) {
//			if (callbackJsonModel)
//				callbackJsonModel(json);
//		},
//		function() {
//			if (callback)
//				callback(model);
//		}
//	);
//}
//
//LAppLive2DManager.prototype.changeModelJ = function(gl, cbShowDialog, arrConfig, callbackEachJsonModel) 
//{
//	if (this.reloadFlg)
//    {
//        this.reloadFlg = false;
//		var thisRef = this;
//		
//		for (var i = this.models.length - 1; i >= 0 ; i--) {
//			this.releaseModel(i, gl);	
//		}	
//		
//		let config1 = arrConfig[0];
//		thisRef.addModelJ(gl, config1.path, config1.homedir, 
//			function(json) {
//				if (callbackEachJsonModel)
//					callbackEachJsonModel(config1, json);
//			},		
//			function(model1) {
//				model1.showDialog = cbShowDialog;
//				model1.modelMatrix.centerX(0);
//				
//				if (arrConfig.length > 1)
//				{
//					model1.modelMatrix.centerX(-0.5);
//					
//					let config2 = arrConfig[1]
//					thisRef.addModelJ(gl, config2.path, config2.homedir, 
//						function(json) {
//							if (callbackEachJsonModel)
//								callbackEachJsonModel(config2, json);
//						},		
//						function(model2) {
//							model2.showDialog = cbShowDialog;				
//							model2.modelMatrix.centerX(0.5);
//						}
//					);
//				}
//			}	
//		);		
//	}
//}

LAppLive2DManager.prototype.addModelJ2 = function(gl, modelJsonPath, homeDir, callbackJsonModel, callbackModel) 
{
	let model = this.createModel();
	model.load(gl, modelJsonPath, homeDir, 
		function(json) {
			if (callbackJsonModel)
				callbackJsonModel(json);
		},
		function(model) {
			if (callbackModel)
				callbackModel(model);
		}
	);
}

LAppLive2DManager.prototype.changeModelJ2 = function(gl, cbShowDialog, arrConfig, callbackEachJsonModel, callbackEachModel) 
{
	if (this.reloadFlg)
    {
        this.reloadFlg = false;
		var thisRef = this;
		
		for (var i = this.models.length - 1; i >= 0 ; i--) {
			this.releaseModel(i, gl);	
		}	
		
		let config1 = arrConfig[0];
		thisRef.addModelJ2(gl, config1.path, config1.homedir, 
			function(json) {
				if (callbackEachJsonModel)
					callbackEachJsonModel(config1, json);
			},		
			function(model1) {
				model1.showDialog = cbShowDialog;
				//model1.modelMatrix.centerX(0);
				//model1.modelMatrix.centerY(-0.4);
				if (callbackEachModel)
					callbackEachModel(config1, model1);
				
				if (arrConfig.length > 1)
				{
					//model1.modelMatrix.centerX(-0.5);
					//model1.modelMatrix.centerY(-0.4);
					let config2 = arrConfig[1]
					thisRef.addModelJ2(gl, config2.path, config2.homedir, 
						function(json) {
							if (callbackEachJsonModel)
								callbackEachJsonModel(config2, json);
						},		
						function(model2) {
							model2.showDialog = cbShowDialog;				
							//model2.modelMatrix.centerX(0.5);
							//model2.modelMatrix.centerY(-0.4);
							if (callbackEachModel)
								callbackEachModel(config2, model2);
						}
					);
				}
			}	
		);		
	}
}


//LAppLive2DManager.prototype.changeModel = function(gl)
//{
//    // console.log("--> LAppLive2DManager.update(gl)");
//    
//    if (this.reloadFlg)
//    {
//        
//        this.reloadFlg = false;
//        var no = parseInt(this.count % 5);
//
//        var thisRef = this;
//        switch (no)
//        {
//            case 0: 
//                this.releaseModel(1, gl);
//                this.releaseModel(0, gl);
//                
//                this.createModel();
//                this.models[0].load(gl, LAppDefine.MODEL_HARU);
//                break;
//            case 1: 
//                this.releaseModel(0, gl);
//                this.createModel();
//                this.models[0].load(gl, LAppDefine.MODEL_SHIZUKU);
//                break;
//            case 2: 
//                this.releaseModel(0, gl);
//                this.createModel();
//                this.models[0].load(gl, LAppDefine.MODEL_WANKO);
//                break;
//            case 3: 
//                this.releaseModel(0, gl);
//                this.createModel();
//                this.models[0].load(gl, LAppDefine.MODEL_EPSILON);
//                break;
//            case 4: 
//                this.releaseModel(0, gl);
//                // 一体目のモデル
//                this.createModel();
//                this.models[0].load(gl, LAppDefine.MODEL_HARU_A, function() {
//                    // 二体目のモデル
//                    thisRef.createModel();
//                    thisRef.models[1].load(gl, LAppDefine.MODEL_HARU_B);
//                });
//                break;
//            default:
//                break;
//        }
//    }
//};


LAppLive2DManager.prototype.getModel = function(no)
{
    // console.log("--> LAppLive2DManager.getModel(" + no + ")");
    
    if (no >= this.models.length) return null;
    
    return this.models[no];
};



LAppLive2DManager.prototype.releaseModel = function(no, gl)
{
    // console.log("--> LAppLive2DManager.releaseModel(" + no + ")");
    
    if (this.models.length <= no) return;

    this.models[no].release(gl);
    
    delete this.models[no];
    this.models.splice(no, 1);
};



LAppLive2DManager.prototype.numModels = function()
{
    return this.models.length;
};



LAppLive2DManager.prototype.setDrag = function(x, y)
{
    for (var i = 0; i < this.models.length; i++)
    {
        this.models[i].setDrag(x, y);
    }
}



LAppLive2DManager.prototype.maxScaleEvent = function()
{
    if (LAppDefine.DEBUG_LOG)
        console.log("Max scale event.");
    for (var i = 0; i < this.models.length; i++)
    {
        this.models[i].startRandomMotion(LAppDefine.MOTION_GROUP_PINCH_IN,
                                         LAppDefine.PRIORITY_NORMAL);
    }
}



LAppLive2DManager.prototype.minScaleEvent = function()
{
    if (LAppDefine.DEBUG_LOG)
        console.log("Min scale event.");
    for (var i = 0; i < this.models.length; i++)
    {
        this.models[i].startRandomMotion(LAppDefine.MOTION_GROUP_PINCH_OUT,
                                         LAppDefine.PRIORITY_NORMAL);
    }
}



LAppLive2DManager.prototype.tapEvent = function(x, y)
{    
    if (LAppDefine.DEBUG_LOG)
        console.log("tapEvent view x:" + x + " y:" + y);

	let bHitArea = false;
    for (var i = 0; i < this.models.length; i++)
    {
		let hitAreaMotion = this.models[i].tapMotion(x, y)
		if (hitAreaMotion) {
			if (LAppDefine.DEBUG_LOG)
				this.models[i].log(hitAreaMotion);
            this.models[i].startRandomMotion(hitAreaMotion,
                                             LAppDefine.PRIORITY_NORMAL);
			bHitArea = true;
		}
    }
	
	if (!bHitArea)
	{
		for (var i = 0; i < this.models.length; i++)
		{
			if (LAppDefine.DEBUG_LOG)
				this.models[i].log("Tap somewhere");
			this.models[i].setRandomExpression();
		}
	}
    return true;
};

LAppLive2DManager.prototype.flickEvent = function(x, y) 
{
    if (LAppDefine.DEBUG_LOG)
        console.log("flickEvent view x:" + x + " y:" + y);
}

LAppLive2DManager.prototype.setAction = function(ix, motionGrp, motionNo, expressionName, strMessage, soundPath)
{
	//for (var i = 0; i < this.models.length; i++)
	//{
		this.models[ix].withIdleMotion = false;
		this.models[ix].startMotion(motionGrp, motionNo, LAppDefine.PRIORITY_NORMAL, expressionName, strMessage, soundPath);
	//}
}
LAppLive2DManager.prototype.setAction2 = function(ix, priority, motionName, expressionName, strMessage, soundPath) {
		this.models[ix].withIdleMotion = false;
		this.models[ix].startMotion2(priority, motionName, expressionName, strMessage, soundPath);	
}
//LAppLive2DManager.prototype.setActionByMsgID = function(ix, msgID)
//{
//	//for (var i = 0; i < this.models.length; i++)
//	//{
//		this.models[ix].withIdleMotion = false;
//		this.models[ix].startMotionByMsgID(msgID);
//	//}
//}

LAppLive2DManager.prototype.setIdleMotion = function(allowIdleMotion) {
	for (var i = 0; i < this.models.length; i++)
	{
		this.models[i].withIdleMotion = allowIdleMotion;
	}
}