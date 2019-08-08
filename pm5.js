var PM5 = new Monitor();

let messagePM5 = function(o) {
    if (o.data.hasOwnProperty('currentPace')) {
        pace = o.data.currentPace;
    }
};

function disconnectPM5() {
    buttonState.name('Connect PM5');
    let b = { add: connectPM5 };
    buttonState.object = b;

    PM5.disconnect();
    PM5 = new Monitor();
}

function connectPM5() {
     PM5.connect()
     .then(() => {
         buttonState.name('Disconnect PM5');
         let b = { add: disconnectPM5 };
         buttonState.object = b;

         return PM5.addEventListener('multiplexed-information', messagePM5)
         .then(() => {
             return PM5.addEventListener('disconnect', disconnectPM5);
         })
         .catch(error => {
             console.log(error);
         });
     })
     .catch(error => {
         console.log(error);
     });
}

function startGUI() {
    var gui = new dat.GUI({ width: 300 });
    let concept2Folder = gui.addFolder('Concept2');
    let connectPM5Button = { add: connectPM5 };
    buttonState = concept2Folder.add(connectPM5Button, 'add').name('Connect PM5');
    concept2Folder.open();
}

if (!navigator.bluetooth) {
    alert("Your browser does not support Web Bluetooth! " +
        "This application only runs on Chrome on the desktop.");
} else {
    startGUI();
}
