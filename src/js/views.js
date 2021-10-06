var views = {};

// Submarine view
views.SubmarineView = Backbone.View.extend({

    tagName: 'div',

    // Set classname and id based upon the model state
    className: function(){
        return "col-md-3 "+this.model.attributes.state;
    },
    id: function(){
        return "submarine_"+this.model.attributes.id;
    },

    // Handle view events
    events: {
        "click .btn": 'onHideButtonClick'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);

        this.template = _.template(
            '<h2><%= name %></h2>'
            + '<input type="hidden" id="subuuid" value="<%= id %>"></input>'
            +  '<p><a class="btn btn-primary" href="#" role="button">Hide Submarine</a></p>'
        );
    },

    // Disable the view when clicked on hide
    onHideButtonClick: function() {
        var submarine = this.model;
      
        submarine.set({"state": "disabled"});
        $("#submarine_"+submarine.id).removeClass("show").addClass("disabled");

        publishRequestToHideSubmarine({name: submarine.attributes.name, uuid: submarine.id});
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));

        return this;
    }

});

// Submarine list view
views.SubmarineListView = Backbone.View.extend({
    el: "#submarines",

    initialize: function() {
        
        if (!("collection" in this)) {
            this.collection = new models.Submarine();
        }
        
        this.listenTo(this.collection,'add',this.onSubmarineAdded,this);
        this.listenTo(this.collection,'remove',this.onSubmarineRemoved,this);

        this._submarineViews = [];
    },

    // Add submarine to view when new one is registered
    onSubmarineAdded: function(submarine){
        this._submarineViews[submarine.id] = new views.SubmarineView({model:submarine,container:this});
        
        var submarineView = this._submarineViews[submarine.id];
        this.$el.append(submarineView.render().el);
    },

    // Remove submarine when event is received to hide it from submarine control page
    onSubmarineRemoved: function(submarine) {
        submarine.set({"state": "hide"});
        $("#submarine_"+submarine.id).remove();
    },

    getSubmarineView:function(submarine){
        var id = _.isObject(submarine) ? submarine.id : submarine;
        return id in this._submarineViews ? this._submarineViews[id] : null;
    },

    render: function() {
        
        // This invokes whe there is an initial set of submarines available in the list
        $("#submarines").empty();

        var that = this;
        if(this.collection.length > 0) {
            this.collection.each(function(submarine){
                that.$el.append(that.getSubmarineView(submarine).render().el);
            });
        }        
        return this;
    }

});

views.SubmarineListView = new views.SubmarineListView({
    collection: models.submarineList
});