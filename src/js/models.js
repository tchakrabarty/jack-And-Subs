var models = {};

// Submarine Model
models.Submarine = Backbone.Model.extend({

    defaults: {
        id: 0,
        name: 'Submarine',
        state: 'show'
    }
});

// Submarine Collection
models.SubmarineList = Backbone.Collection.extend({
    modelType: "List",
    model: models.Submarine
});

models.submarineList = new models.SubmarineList();