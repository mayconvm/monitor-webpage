(function (_global) {

  class MenuFirebase {
    constructor (persisteData) {
      this.persisteData = persisteData;
      this.nameDataBase = "firebase";
    }

    save (objForm) {
      if (!this.validate(objForm)) {
        return false;
      }

      return this.persisteData.cleanData(this.nameDataBase).then(() => {
        return this.persisteData.writeData(this.nameDataBase, objForm);
      })
      .catch((error) => {
        return Promise.reject(error);
      })

    }

    getData() {
      return this.persisteData.readData(this.nameDataBase);
    }

    validate(objForm) {
      // TODO CREATE DATA VALIDATOR
      return true;
    }
  }

  _global.MenuFirebase = MenuFirebase;
})(window);
