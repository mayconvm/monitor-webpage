// class to record data in indexDB

class PersistData {

  constructor(firebase) {
    this.db = new Dexie("tracker_database");
    this.db.version(1).stores({
      tracker: 'end,start,url,domain',
      firebase: 'apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId',
      user: 'id,email,token,displayName,photoURL'
    });

    this.firebase = firebase;

    this.dbFirebase = null;

    this.db.open().catch(function(error) {
      console.error('Uh oh : ' + error);
    });

    this.initFirebase();
  }

  writeData(store, data) {
    return new Promise((resolve, reject) => {

      if (_.isEmpty(data)) {
        return reject("Data is empty.");
      }

      this.db[store]
      .bulkAdd(data)
      .then(resolve)
      .catch(reject);
    });
  }

  readData(store, condition) {
      let data = this.db[store];

      if (condition) {
        data = data.where(condition);
      }

      return data.toArray();
  }

  cleanData(store) {
    return this.db[store].clear();
  }

  initFirebase() {
    let that = this;
    this.readData('firebase').then((result) => {

      let data = result[0];

      var config = {
        apiKey: data.apiKey,
        authDomain: data.authDomain,
        databaseURL: data.databaseURL,
        projectId: data.projectId,
        storageBucket: data.storageBucket,
        messagingSenderId: data.messagingSenderId,
      };
      
      that.firebase.initializeApp(config);
    }).then(() => { 
      // start persist database
      that.initPersistDataFirebase();
    });
  }

  initPersistDataFirebase() {
    this.dbFirebase = this.firebase.database();
  }

  writeDataFirebase(store, data) {
    if (!this.dbFirebase) {
      throw new Error("Db Firebase not definded");
    }

    if (!data.length) {
      return;
    }

    return new Promise((resolve, reject) => {
      let promises = [];

      for (let content of data) {
        promises.push(this.dbFirebase.ref(store + "/" + this.getRandomId(5, 5)).set(content));
      }

      return Promise.all(promises);
    })
  }

  getRandomId(length = 5, split = 1, separator = "-") {

    let getRandomHash = function (length) {
      let dataRandom = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890";
      let r = '';
      for(let i=0; length > i; i++) {
        r += dataRandom[parseInt(Math.random() * 62)];
      }

      return r;
    }

    let r = '';
    for (let i=0; split > i; i++) {
      if (i) r += separator;
      r += getRandomHash(length);
    }

    return r;
  }
}
