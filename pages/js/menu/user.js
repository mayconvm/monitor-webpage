(function (_global) {

  class MenuUser {
    constructor(persistData) {
      this.persistData = persistData;
      this.provider = new this.persistData.firebase.auth.GoogleAuthProvider();
      this.provider.addScope('email');


      this.nameDataBase = "user";
    }


    login() {
      let that = this;

      return new Promise((resolve, reject) => {
        that.persistData.firebase.auth().signInWithPopup(this.provider).then(function(result) {
          let dataSave = {
            id: result.additionalUserInfo.profile.id,
            email: result.additionalUserInfo.profile.email,
            token: result.credential.accessToken,
            displayName: result.additionalUserInfo.profile.name,
            photoURL: result.additionalUserInfo.profile.picture
          };

          console.log("[MenuUser.login]", dataSave);
          that.update(dataSave).then(resolve).catch(reject);
          
        }).catch(function(error) {

          console.error("-->", error);
          return reject(error);
        });
      });
    }

    logout() {
      let that = this;
      return new Promise((resolve, reject) => {
        that.persistData.firebase.auth().signOut().then(() => {
          that.persistData.cleanData(that.nameDataBase).then(resolve).catch(reject);
        }).catch(reject);
      });
    }

    getData() {
      return this.persistData.readData(this.nameDataBase);
    }

    update(data) {
      let that = this;
      return this.persistData.readData(this.nameDataBase, {id: data.id}).then((result) => {

        if (_.isEmpty(result)) {
          return that.persistData.writeData(that.nameDataBase, [data]);
        }

        return result.modify(data);
      })
    }
  }

  _global.MenuUser = MenuUser;
})(window);
