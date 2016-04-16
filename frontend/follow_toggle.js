
var FollowToggle = function (el) {
  this.$el = $(el);
  this.$userId = this.$el.data("user-id");
  this.$followState = this.$el.data("initial-follow-state");
  this.render();
  this.$el.click(this.handleClick.bind(this));
};



FollowToggle.prototype.render = function(){
  var self = this;
  if (this.$followState === 'unfollowed'){
    this.$el.text('Follow!');
  }else {
    this.$el.text('Unfollow!');
  }
  if (this.$followState === "following" || this.$followState === "unfollowing"){
    this.$el.prop('disabled', true);
  }else{
    this.$el.prop('disabled', false);
  }
};



FollowToggle.prototype.handleClick = function (event) {
  var self = this;
  event.preventDefault();
  var method;


  if (this.$followState === "unfollowed") {
    method = "POST";
    this.$followState = "following";
  } else {
    method = "DELETE";
    this.$followState = "unfollowing";
  }
  this.render();
  $.ajax({
    url: "/users/" + this.$userId + "/follow",
    type: method,
    // data:
    dataType: "json",
    success: function () {
      if (self.$followState === 'unfollowing'){
        self.$followState = "unfollowed";
      }else{
        self.$followState = 'followed';
      }
      self.render();
    }
  });


};

module.exports = FollowToggle;
