(function(){
	// Geolocation APIに対応している
	if( navigator.geolocation )
	{
		// 現在位置を取得できる場合の処理
		// 現在位置を取得する
		var watchid = navigator.geolocation.watchPosition( successFunc , errorFunc , optionObj) ;
	}

	// Geolocation APIに対応していない
	else
	{
		// 現在位置を取得できない場合の処理
		alert('非対応の端末です');
	}
})();

// 成功処理
function successFunc(position){
	document.getElementById('location').innerText = 'lat: ' + position.coords.latitude + ' , ' + 'lng: ' + position.coords.longitude;
	Map.update(position.coords.latitude,position.coords.longitude);
}

// 失敗処理
function errorFunc(error){
	// エラーコードのメッセージを定義
	var errorMessage = {
		0: "原因不明のエラーが発生しました" ,
		1: "位置情報の取得が許可されませんでした" ,
		2: "電波状況などで位置情報が取得できませんでした" ,
		3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました" ,
	} ;

	// エラーコードに合わせたエラー内容をアラート表示
	alert( errorMessage[error.code] ) ;
}

// オプション・オブジェクト
var optionObj = {
	"enableHighAccuracy": false ,
	"timeout": 1000000 ,
	"maximumAge": 0 ,
} ;