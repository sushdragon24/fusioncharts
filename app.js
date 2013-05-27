Notices = new Meteor.Collection("notices");

if (Meteor.isClient) {

  Template.board.events({
    'click .post': function () {
  var val = document.getElementById('tbx').value
	document.getElementById('tbx').value='';
	if(val.length>0)
      Notices.insert({content: val, writer: person, likersNum: 0, likers: [] });
    }
  });
  Template.notice.events({
    'click .btn': function () {
	Session.set("session_post",this._id);
		Notices.update(Session.get("session_post"),{$inc: {likersNum: 1}});
		Notices.update(Session.get("session_post"),{$push: {likers: person}});
	}
  });
  Template.notice.many_likes = function () {
		if(parseInt(this.likersNum) > parseInt(5))
		return 1 ;
		return 0 ;
	};


  Template.notice.print_likers = function () {
  	var len= this.likers.length;
	var a = this.likers[0];
	if(len == 1)
	return a;
	for(var i=1;i<len;++i)
	if(i==len-1)
	a = a+" and "+ this.likers[i];
	else
	a = a+", "+ this.likers[i];
	return a;
	};

  Template.board.notices = function () {
    return Notices.find({});
  };  
   
  
}

