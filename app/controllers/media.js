var args = arguments[0] || {};

var parent_view = args.parent_id;
var media = args.video_data;


console.log($.vid_media.url);
$.vid_media.url = media ;
//console.log("this is video media : "+ $.vid_media.url);

$.video_cont.addEventListener('close', function(){
	console.log(parent_view);
	args = {
		parentid : parent_view
	};
	Alloy.createController("index", args).getView().open();
	
});

// $.container.open();