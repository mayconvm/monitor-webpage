(function (_global) {

  class MenuFirebase {
    constructor (persistData) {
      this.persistData = persistData;
      this.nameDataBase = "firebase";
    }

    save (objForm) {
      if (!this.validate(objForm)) {
        return false;
      }

      return this.persistData.cleanData(this.nameDataBase).then(() => {
        return this.persistData.writeData(this.nameDataBase, objForm);
      })
      .catch((error) => {
        return Promise.reject(error);
      })

    }

    getData() {
      return this.persistData.readData(this.nameDataBase);
    }

    validate(objForm) {
      // TODO CREATE DATA VALIDATOR
      return true;
    }
  }

  _global.MenuFirebase = MenuFirebase;
})(window);
