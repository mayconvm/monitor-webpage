// class to record data in indexDB

class PersistData {

  constructor() {
    this.db = new Dexie("tracker_database");
    this.db.version(1).stores({
      tracker: 'end,start,url,domain',
      firebase: 'apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId',
      user: 'id,email,token,displayName,photoURL'
    });

    this.db.open().catch(function(error) {
      console.error('Uh oh : ' + error);
    });
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
}
