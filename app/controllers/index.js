var lessons = Alloy.createCollection('lesson');
var videos = Alloy.createCollection('video_lessons');

var lsname = [	
	{ 	
		"parent_id"  : 0,
		"lsn_id"   :  1,
		"lsn_title":"LESSON 1 Whats this ?",
		"video_id" : 0
	},
	{ 	
		"parent_id"  : 0,
		"lsn_id"   :  2,
		"lsn_title":"LESSON 2 I study Japanese.",
		"video_id" : 0
	},
	{ 	
		"parent_id"  : 0,
		"lsn_id"   : 3,
		"lsn_title":"LESSON 3 What would you like?",
		"video_id" : 0
	},
	{ 	
		"parent_id"  : 1,
		"lsn_id"   : 4,
		"lsn_title":"単語予習の動画を再生",
		"video_id" : 2
	},
	{ 	
		"parent_id"  : 1,
		"lsn_id"   : 5,
		"lsn_title":"会話予習の動画を再生",
		"video_id" : 1
	}
];
var vid_data = [
	{
		"video_id" : 1,
		"video_data":"/short_vid.mp4"
	},
	{
		"video_id" : 2,
		"video_data":"/english1.mp4"
	},
];
//static save list of lessons (temp)
function savelesson(){
	lessons.fetch({query: 'select * from '+ lessons.config.adapter.collection_name});
	videos.fetch({query: 'select * from '+ videos.config.adapter.collection_name});
	if (lessons.length == 0 && videos.length == 0 ){
		
		for (var l in lsname ){
			
		var save_lesson = Alloy.createModel('lesson', {
				parent_id : lsname[l].parent_id,
		        lsn_id : lsname[l].lsn_id,
		        lsn_title : lsname[l].lsn_title,
		        video_id : lsname[l].video_id,
		        video_data : lsname[l].video_data
		    });
			
			lessons.add(save_lesson);
			save_lesson.save();
			
		}
		for (var v in vid_data ){
			
		var save_vid = Alloy.createModel('video_lessons', {
		        video_id : vid_data[v].video_id,
		        video_data : vid_data[v].video_data
		    });
			
			videos.add(save_vid);
			save_vid.save();
			
		}
	}else {
		console.log("there are records, no need to save");
	}
		
}

var history = [];
function shw_lessons(parentid){
	lessons.fetch({query:'select * from '+ lessons.config.adapter.collection_name+ ' where parent_id = '+ parentid});

	var less_items = [];
	
	for (var i=0; i < lessons.length; i++){
		
		var e = JSON.parse(JSON.stringify(lessons.at(i)));
		less_items.push({
			template: "lessonlist",
			lesson_listtype: {
				parent_id: e.parent_id,
				lsn_id: e.lsn_id,
				video_id: e.video_id
				},
			lsn_title: {text: e.lsn_title},
			properties: {
            selectionStyle: OS_IOS?Titanium.UI.iPhone.ListViewCellSelectionStyle.NONE:undefined
           	}
		});
	}
	if(less_items.length == 0){
        less_items.push({
            template: "empty"
        });
    }
	try{
		$.lesson_list.sections[0].setItems(less_items);
	}
	catch(e){
		var section = Ti.UI.createListSection();
        $.lesson_list.sections = [section];
        $.lesson_list.sections[0].setItems(less_items);
        console.log(e);
	}
}
savelesson();
shw_lessons(0);
history.push([0,""]);

function select_less(e){
	var section = $.lesson_list.sections[0];
    var lessons = section.getItemAt(e.itemIndex);
    var vid_id = lessons.lesson_listtype.video_id;
    var lsn_sub = lessons.lesson_listtype.lsn_id;
    if (vid_id != 0 ){
    	
    }
    shw_lessons(lsn_sub);
    history.push([lsn_sub,""]);
    
}
$.container.addEventListener('swipe', function(e){
	if (e.direction == "right" && history.length > 1) {
        
        
        
        history.length = history.length-1;
        if(history.length<=0){

        } else {
             shw_lessons(parseInt(history[history.length-1]));
        
            
        }
    }
});

$.container.open();
