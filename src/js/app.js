var pubnub;

var controlRoomChannel = 'control-room-channel';
var callBackChannel = 'callback-channel';

// Register PubNub with publish & subscriber keys
function registerPubNub() {

    pubnub = new PubNub({
        publishKey : 'pub-c-931f3cfd-f7e6-4041-a048-fdcd8157dcf3',
        subscribeKey : 'sub-c-dc9b7878-2a23-11e8-ae0d-3a0cea6ae1c4'
    });
}

function handleControlRoomOperations() {

    pubnub.addListener({
        message: function(message) {
            var payload = message.message;

            if(payload.action === "REGISTER") {
                var nameInUse = registerSubmarine(payload.submarine);
                //console.log('==> nameInUse : '+nameInUse+ " "+new Date());
                if(nameInUse) {
                    //console.log("----> in If condition");
                    publishNameAlreadyExists(payload.submarine);
                }
            }
            else if(payload.action === "HIDE") {
                removeSubmarineFromList(payload.submarine);
            }
        }
    });  
    
    pubnub.subscribe({
        channels: [controlRoomChannel] 
    });
}

function handleCallbackOperations() {

    pubnub.addListener({
        message: function(message) {
            var payload = message.message;
            console.log("========> payload message Action :: "+payload.action+ " "+new Date());
            if(payload.action === "NAMEINUSEE") {
                //console.log("----> When payload action is - NAMEINUSE");
                showNameAlreadyInUse(payload.submarine);
            }
            else if(payload.action === "HIDE") {
                displayHideSubmarineControls(payload.submarine);
            }
        }
    });

    pubnub.subscribe({
        channels: [callBackChannel] 
    });
}

// Publish to control room channel to register the submarine 
function publishToRegisterSubmarine(submarine) {

    pubnub.publish({
        message: {
            submarine: submarine,
            action: "REGISTER"
        },
        channel: controlRoomChannel
    }).then((response) => {
        submarineRegisteredSuccessfully();
    }).catch((error) => {
        console.log("======> Error occurred while registering the submarine :: ");
        console.dir(error);
    });
}

// Publish to callback channel for the submarines to show name already exists message if registering with name that is alreay present.
function publishNameAlreadyExists(submarine) {
    //console.log("--> publishNameAlreadyExists");
    pubnub.publish({
        message: {
            submarine: submarine,
            action: "NAMEINUSEE"
        },
        channel: callBackChannel
    }).then((response) => {
        // Do Nothing
    }).catch((error) => {
        console.log("======> Error occurred whie publishing name already exists error  :: ");
        console.dir(error);
    });
}

// Publish to control room channel to hide the submarine 
function publishToHideSubmarine(submarine) {

    pubnub.publish({
        message: {
            submarine: submarine,
            action: "HIDE"
        },
        channel: controlRoomChannel
    }).then((response) => {
        submarineHiddenSuccessfully();
    }).catch((error) => {
        console.log("======> Error occurred while publishing to hide submarine from submarine page :: ");
        console.dir(error);
    });
}

// Publish request from control room to submarine to hide it
function publishRequestToHideSubmarine(submarine) {
    pubnub.publish({
        message: {
            submarine: submarine,
            action: "HIDE"
        },
        channel: callBackChannel
    }).then((response) => {
        submarineHiddenSuccessfully();
    }).catch((error) => {
        console.log("======> Error occurred while requseting to hide the submarine from control room :: ");
        console.dir(error);
    });
}