
# Program: Management of submarines in an ocean


```Technologies```: jQuery, plugins, pubnub  (it's not complicated), backbone, twitter bootstrap (or any css or just barebones)


## Task Description

Control room controls all the submarines. For this, it manages the location of all the ships  and sends commands to hide themselves during a war. When there is no threat (again sent by control room), they come back again to the surface. Jack Sparrow (control room's head) decides when for the submarine to come back.

You are consulted to write a program to help Jack sparrow. There are 2 web pages - Control room and Submarines.

One web page - Jack Sparrow's Control Room

- Understand Pubnub. You can register for free. Basically, its a communication platform where clients can listen on a channel and other clients can send or receive updates.
- Write client code which listens for submarines to register. You can use pubnub to listen on a channel and sniff for join and leave events.
- Check if the name is already taken while a submarine registers in the backbone list. The client should be sent an error to reregister with a proper name. Otherwise, it should be added to the list (backbone)
- For each submarine registered, it should show hide button which when clicked will send a message to submarine to hide
- If a submarine hides itself, it should be disabled from the list.

Second Web page for submarines 
- Submarines (new web pages) can register with Jack Sparrow. Web page should take name of the ship (as alphanumeric input with proper validation) and register option. If the name is already registered with Jack Sparrow, Jack Sparrow sends an invalid signal. You should show an error.
- Show status of the submarine (default is shown). When it receives a command from the server, it hides itself by updating the status.
- Submarine can also hide itself while it is undergoing maintenance. A button to hide should be shown. It will then remove from the Jack sparrow's list.


## Steps to Test the app

* Ensure Node JS and NPM are installed and configured accordingly
* Execute the below commands to install Gulp & Live Server
    ```
    npm install -g gulp    
    npm install -g live-server
    ```
* Navigate to the root of the project folder in terminal and execute the below command
    ```
    npm install
    ```
* If everything is successful, run the below command to the start the server
    ```
    gulp
    npm start
    ```
* Browser will be opened with http://127.0.0.1:8081/ loaded. If browser doesnt open, navigate to http://127.0.0.1:8081/ manually.
* Web page displays four sections of iframes. The top is the first web page ```Jack Sparrow Control Room``` and the below are three submarine views.

## Test Cases
* Provide a name in one of the frame and click register. Upon successful, register button changes to hide and the submarine will be displayed in the control room.
* Provide the same name provided in other frame and click on register. It will indicate that name is already registered. Modify the name and click on register.
* Click on Hide in the submarine frame. This will change the state to register and also remove the submarine from the control room.
* Click on hide for a submarine in control room. This will disable the submarine and change the state of submarine from hide to register for it to re-register again.