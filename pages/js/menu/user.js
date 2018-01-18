(function (_global) {

  class MenuUser {
    constructor(persisteData) {
      this.provider = new firebase.auth.GoogleAuthProvider();
      this.provider.addScope('email');

      this.persisteData = persisteData;

      this.nameDataBase = "user";

      this.init();
    }

    init() {
      var config = {
        apiKey: "AIzaSyDXRHMSJQdhmUlNVE-jCHY0V9tBskPMFQ0",
        authDomain: "monitorwebpage-3e3e8.firebaseapp.com",
        databaseURL: "https://monitorwebpage-3e3e8.firebaseio.com",
        projectId: "monitorwebpage-3e3e8",
        storageBucket: "",
        messagingSenderId: "84138561985"
      };
      firebase.initializeApp(config);
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
          that.persisteData.cleanData(that.nameDataBase).then(resolve).catch(reject);
        }).catch(reject);
      });
    }

    getData() {
      return this.persisteData.readData(this.nameDataBase);
    }

    update(data) {
      let that = this;
      return this.persisteData.readData(this.nameDataBase, {id: data.id}).then((result) => {

        if (_.isEmpty(result)) {
          return that.persisteData.writeData(that.nameDataBase, [data]);
        }

        return result.modify(data);
      })
    }
  }

  _global.MenuUser = MenuUser;
})(window);
