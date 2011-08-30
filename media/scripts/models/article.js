(function() {
    var models = window.app.models,
        views = window.app.views,
        collections = window.app.collections,
        controllers = window.app.controllers;
        
    
    models.Article = Backbone.Model.extend({
        url: function() {
            return 'pages/'+ this.get('id') +'.json';
        }
    });
    
    views.Article = Backbone.View.extend({
        initialize: function() {
            this.model.fetch();
			
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },

        template: _.template($('#article-template').html()),
        
        render: function() { 
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        
    });
    
    
    collections.Articles = Backbone.Collection.extend({
        model: models.Post,
        url: '/articles/titles.json'
    });
})();