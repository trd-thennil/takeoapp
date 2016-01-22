var args = arguments[0] || {};

var parent_view = args.parent_id;
var vi_media = args.video_data;



console.log("parent source: "+parent_view);
console.log($.vid_media.url);
$.vid_media.url = vi_media ;
