// class to record data in indexDB

class PersisteData {

  constructor() {
    this.db = new Dexie("tracker_database");
    this.db.version(1).stores({
        tracker: 'time,domain'
    });
  }

  writeData(store, data) {
    return new Promise((resolve, reject) => {

      if (!data.length) {
        return reject("Data is empty.");
      }

      this.db[store]
      .put(data)
      .then(resolve)
      .catch(reject);
    });

  }
}
