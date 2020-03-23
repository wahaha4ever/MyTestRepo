//Revealing Constructor Pattern
var MsgSetting = (function (l2df) {	
    'use strict';
	var constructorA = function (l2df) {
		// private variable
		let _arrMsg = [];	
		let _homePath = "";			
		let _voiceRoot = "";
		let _motionRoot = "";
		
	
		// private function
		var loadTextFile = function (path, callback)
		{   
			return new Promise( function (resolve, reject) {
				let that = this;
				_homePath = path.substring(0, path.lastIndexOf("/") + 1); 		
				if (LAppDefine.DEBUG_LOG)
					console.log(_homePath);
				var pm = l2df.getPlatformManager();
				pm.loadBytes(path, function(buf) {
					_arrMsg = pm.textParseFromBytes(buf).split("\n")
					if (callback) {
						callback(_arrMsg);
					}
					resolve(null);
				});
			}, null, xhr => reject(xhr));
			
		};
		
		//var getMsg = function(id, bPlayVoice) {
		//	if (_homePath) {
		//		let result = _arrMsg.find(function(e) {
		//			return e.startsWith('' + id + ',');
		//		});
		//		
		//		if (result)
		//		{
		//			getVoice(id, bPlayVoice);
		//		}
		//		return result;
		//	}
		//	return null;
		//}
		//
		//var getVoice = function(id, bPlayVoice) {
		//	if (_homePath) {
		//		let voiceFileName = _homePath + "voice_" + id.padStart(3, '0') + ".mp3";
		//		
		//		if (bPlayVoice){
		//			let snd = document.createElement("audio");
		//			snd.src = voiceFileName;
		//			
		//			if (LAppDefine.DEBUG_LOG)
		//				console.log("Start sound : " + voiceFileName);				
		//			snd.play();
		//		}
		//		
		//		return voiceFileName;
		//	}
		//	return null;
		//}	
		
		var setVoiceRoot = function(root) {
			_voiceRoot = root;
		}
		var setMotionRoot = function(root) {
			_motionRoot = root;
		}

		var getMsg = function(id) {
			if (_homePath) {
				let result = _arrMsg.find(function(e) {
					return e.startsWith('' + id + ',');
				});
				return result;
			}
			return null;
		}
		
		var getVoice = function(id) {
			if (_homePath) {
				let voiceFileName = _homePath + "voice_" + id.padStart(3, '0') + ".mp3";
				return voiceFileName;
			}
			return null;
		}
		
		var getRandomData = function(){
			var idx = parseInt(Math.random() * (_arrMsg.length - 1));
			return getDataByStr(_arrMsg[idx]);
		}
		
		var getDataByStr = function(str) {
			let result = {};
			let arr = str.split(',');
			result.id = arr[0];
			result.msg = arr[1];
			result.voice = arr[0].padStart(3, '0');
			result.voiceFile = "voice_" + result.voice + ".mp3";//getVoice(id);
			result.voiceFileName = _voiceRoot + result.voiceFile;
			//result.voiceFile = "voice_" + arr[0].padStart(3, '0') + ".mp3";//getVoice(id);
			//result.voiceFileName = _voiceRoot + "voice_" + arr[0].padStart(3, '0') + ".mp3";//getVoice(id);
			//result.voiceFileWithPath = _homePath + result.voiceFile;
			result.expression = "f" + arr[2].padStart(2, '0');
			result.expressionName = "" + result.expression + ".exp.json";
			result.motion = "m" + arr[3].padStart(2, '0');		
			result.motionFileName = _motionRoot + result.motion + ".mtn";	
			return result;
		}
		
		var getData = function(id) {
			let str = getMsg(id);
			if (str) {
				return getDataByStr(str);
			}
			else {
				return null;
			}
		}
		
		var getExpressionName = function(no){
			return "" + "f" + no.padStart(2, '0') + ".exp.json";
		}
		
		var getMotionFileName = function(no){
			return _motionRoot + "m" + no.padStart(2, '0') + ".mtn";
		}
		
		// public object declaration
		let publicApis = {};
		publicApis.load = loadTextFile;
		publicApis.getData = getData;
		publicApis.getRandomData = getRandomData;
		publicApis.setVoiceRoot = setVoiceRoot;
		publicApis.setMotionRoot = setMotionRoot;
		publicApis.getExpressionName = getExpressionName;
		publicApis.getMotionFileName = getMotionFileName;
		return publicApis;
	};
	return constructorA;
	
})(l2df = Live2DFramework);