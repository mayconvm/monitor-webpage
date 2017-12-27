const TAG = "[MONITOR]";
console.log(TAG);


var config = {
  apiKey: "AIzaSyDXRHMSJQdhmUlNVE-jCHY0V9tBskPMFQ0",
  authDomain: "monitorwebpage-3e3e8.firebaseapp.com",
  databaseURL: "https://monitorwebpage-3e3e8.firebaseio.com",
  projectId: "monitorwebpage-3e3e8",
  storageBucket: "",
  messagingSenderId: "84138561985"
};
firebase.initializeApp(config);

// for each tabs shoud create one class Domain
// for each tabs focus shoud create one classe Tacker



// start monitoring
const monitor = new MonitorTabs(true, new PersisteData());

// backup in IndexDb
setTimeout(function __backupTackers() {

  monitor.persisteData();

}, 1000 * 10);
