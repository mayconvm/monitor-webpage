// class to record data in indexDB

class PersisteData {

  constructor() {
    this.db = new Dexie("tracker_database");
    this.db.version(1).stores({
        tracker: 'end,start,url,domain'
    });

    this.db.open().catch(function(error) {
      console.error('Uh oh : ' + error);
    });
  }

  writeData(store, data) {
    return new Promise((resolve, reject) => {

      if (!data.length) {
        return reject("Data is empty.");
      }

      this.db[store]
      .bulkAdd(data)
      .then(resolve)
      .catch(reject);
    });

  }
}
