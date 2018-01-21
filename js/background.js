const TAG = "[MONITOR]";
console.log(TAG);

const persistData = new PersistData(firebase);


// for each tabs shoud create one class Domain
// for each tabs focus shoud create one classe Tacker

// start monitoring
const monitor = new MonitorTabs(true, persistData);

// backup in IndexDb
setInterval(function __backupTackers() {
  monitor.persistData();
}, 1000 * 10);

// send data firebase
setInterval(function __sendaDataFirebase() {

});
