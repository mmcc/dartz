window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: fb
});

App.Current = DS.Model.extend();
// App.CurrentPlayerAdapter = App.ApplicationAdapter.extend({
//   pathForType: function(type) {
//     return "current-player";
//   }
// });

App.Players = DS.Model.extend();

App.Router.map(function() {
  this.route("scoreCard", { path: "/score" });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('players');
  },

  actions: {
    remove: function(player) {
      player.destroyRecord();
    },

    addPlayer: function(player) {
      addPlayer(player);
    }
  }
});

App.IndexController = Ember.ArrayController.extend({
  needs: ["current"],

  addFormVisible: false,

  actions: {
    showAddForm: function() {
      this.set('addFormVisible', true);
    },

    hideAddForm: function() {
      this.set('addFormVisible', false);
    },

    startPlaying: function() {
      nextPlayer();
      window.location = '/scorecard';
    }
  }
});

App.ScoreCardRoute = Ember.Route.extend({
  model: function() {
    console.log(this.store.all('current'));
    return this.store.all('current');
  }
});

App.ScoreCardController = Ember.ObjectController.extend({

});

App.CurrentController = Ember.ObjectController.extend({
  model: function() {
    return this.store.find('current');
  }
});

App.PlayerController = Ember.ObjectController.extend({
  actions: {
    addPlayer: function(player) {
      console.log(player);
    }
  }
});
