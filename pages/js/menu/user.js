(function (_global) {

  class MenuUser {
    constructor(persistData) {
      this.provider = new firebase.auth.GoogleAuthProvider();
      this.provider.addScope('email');

      this.persistData = persistData;

      this.nameDataBase = "user";

      this.init();
    }

    init() {
      this.persistData.readData('firebase').then((result) => {

        let data = result[0];

        var config = {
          apiKey: data.apiKey,
          authDomain: data.authDomain,
          databaseURL: data.databaseURL,
          projectId: data.projectId,
          storageBucket: data.storageBucket,
          messagingSenderId: data.messagingSenderId,
        };
        firebase.initializeApp(config);
      })

    }

    login() {
      let that = this;

      return new Promise((resolve, reject) => {
        firebase.auth().signInWithPopup(this.provider).then(function(result) {
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
        firebase.auth().signOut().then(() => {
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
