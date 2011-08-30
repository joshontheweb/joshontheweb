(function() {
    var models = window.app.models,
        views = window.app.views,
        collections = window.app.collections,
        controllers = window.app.controllers;
    
    models.Page = Backbone.Model.extend({
        initialize: function(options) {

        },
        
        navigate: function(slug) {
            this.set({slug: slug});
        },
        
        url: function() {
            return 'pages/'+ this.get('slug') +'.json';
        }
    });

    views.Page = Backbone.View.extend({
        initialize: function(el, options) {
            
            this.nav = new collections.Nav([
                            {"id": 1,"title": "Home","slug": "./"},
                            {"id": 2,"title": "Services","slug": "#services"},
                            {"id": 3,"title": "Contact","slug": "#contact"},
                            {"id": 4,"title": "About","slug": "#about"}
                        ]);
            new views.Nav({collection: this.nav, el: $('header nav ul')});
            $('header nav ul').data({collection: this.nav});
            
            this.model.set({slug: 'home'});
            
            _.bindAll(this, 'render', 'fetchArticle');
            this.model.bind('change:slug', this.fetchArticle);
        },
        
        template: _.template($('#main-template').html()),
        
        fetchArticle: function() {
            var model = new models.Article({id: this.model.get('slug')});
            var view = new views.Article({model: model, el: $('.articles')});
        },
        
        render: function() {
            // $(this.el).find('.main').html(this.template(this.model.toJSON()));
        }
    });
    
    models.NavItem = Backbone.Model;
    
    views.NavItem = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'render');
            // this.collection.bind('refresh', this.render);
        },
        
        tagName: 'li',
        
        template: _.template($('#nav-item-template').html()),
        
        events: {
            // 'click a': 'navigate'
        },
        
        navigate: function() {
            window.app.page.set({'slug':  this.model.get('slug').replace('#', '')});
           // this.model.fetch();
        },
        
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    collections.Nav = Backbone.Collection.extend({
        initialize: function() {
            // this.fetch();
        },
        
        model: models.NavItem,
        
        url: 'pages/slugs.json'
    });
    
    views.Nav = Backbone.View.extend({
        initialize: function() {
            var view = this;
            _.bindAll(this, 'render');
            this.collection.bind('refresh', this.render)
            
            this._navViews = [];
            
            this.collection.each(function(nav){
                view._navViews.push(
                    new views.NavItem({model: nav})
                );
            })
            
            // this.render()
        },
        
        tagName: 'ul',
        
        render: function() {
            var self = this;
            $(this.el).empty();
            _(this._navViews).each(function(view) {
                $(self.el).append(view.render().el);
            });
            return this
        }
        
    })
})();