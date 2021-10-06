
// Function to register a submarine
function registerSubmarine(submarine) {

    var submarineInList = models.submarineList.findWhere({ name: submarine.name });
    //console.log("===> submarineInList : "+submarineInList)
    if(submarineInList) {
        if(submarineInList.attributes.state != "disabled") {
            return true;
        }
        else {
            models.submarineList.remove(submarineInList);
        }
    }
    
    submarineInList = new models.Submarine({
        name: submarine.name,
        id: submarine.uuid
    });

    models.submarineList.add(submarineInList);

    return false;
}

// function to mark the submarine as hidden
function hideSubmarine(submarine) {
    var submarine = models.submarineList.get(submarine.uuid);
    
    models.submarineList.remove(submarine);
}

function showNameAlreadyInUse(submarine) {
    //console.log("---> showNameAlreadyInUse");
    if(submarine.name === $("#name").val() && submarine.uuid === $("#subuuid").val()) {
        submarineRegistrationFailed();
    }
}

function removeSubmarineFromList(submarine) {
    var submarine = models.submarineList.get(submarine.uuid);
    
    models.submarineList.remove(submarine);
}

function displayHideSubmarineControls(submarine) {
    if(submarine.name === $("#name").val() &&  submarine.uuid === $("#subuuid").val()) {
        submarineHiddenSuccessfully();
    }
}

function submarineRegisteredSuccessfully() {
    //console.log("---> submarineRegisteredSuccessfully");

    $("#name").prop("disabled", true);
    $("#error").removeClass("show").addClass("hide");
    $("#success").removeClass("hide").addClass("show");

    $("#registerSubmarine").removeClass("show").addClass("hide");
    $("#hideSubmarine").removeClass("hide").addClass("show");
}

function submarineRegistrationFailed() {
    //console.log("---> submarineRegistrationFailed");

    $("#name").prop("disabled", false);
    $("#error").removeClass("hide").addClass("show");
    $("#success").removeClass("show").addClass("hide");

    $("#registerSubmarine").removeClass("hide").addClass("show");
    $("#hideSubmarine").removeClass("show").addClass("hide");
}

function submarineHiddenSuccessfully() {
    $("#name").prop("disabled", false);

    $("#error").removeClass("show").addClass("hide");
    $("#success").removeClass("show").addClass("hide");
    $("#registerSubmarine").removeClass("hide").addClass("show");
    $("#hideSubmarine").removeClass("show").addClass("hide");
}