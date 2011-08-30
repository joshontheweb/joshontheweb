(function() {
    var models = {},
        views = {},
        collections = {},
        controllers = {};
      
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
    
    controllers.App = Backbone.Controller.extend({
        initialize: function() {
        },
        
        routes: {
            'home': 'home',
            'about': 'about',
            'services': 'services',
            'contact': 'contact',
        },
        
        home: function() {
            console.log('Index View');
            this.page.navigate('home');
        },
        
        about: function(something) {
            console.log('about View');
            this.page.navigate('about');
        },
        
        services: function() {
            console.log('Services');
            this.page.navigate('services');
        },
        
        contact: function() {
            console.log('Contact');
            this.page.navigate('contact');
        },
        
        start: function() {
            this.page = new models.Page();
            new views.Page({model: this.page, el: document.body})
            $('body').data({model: this.page});
            
            Backbone.history.start();
        },
    
        models: models,
        views: views,
        collections: collections,
        controllers: controllers
    });
    
    window.app = new controllers.App
})();