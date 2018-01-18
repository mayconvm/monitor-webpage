(function (_global) {
  // start menu
  const classMenu = new Menu(
    "#menu",
    "#collection_contents",
  );

  const instPersisteData = new PersisteData();

  // start firebase
  const classMenuFirebase = new MenuFirebase(
    instPersisteData
  );


  // firebase



  // Show data firebase
  classMenuFirebase.getData().then((data) => {
    if (!data.length) {
      return console.error("Data configuration firebase empty");
    }

    let config = data[0];

    for (let inp in config) {
      getElement("#input_" + inp).value = config[inp];
    }

  })
  .catch ((error) => {
    console.error(error);
  });

  // Action save firebase
  getElement("#btn_save_data_firebase").addEventListener('click', (evt) => {
    getElement("#firebase_alert_success").classList.add('d-none');
    getElement("#firebase_alert_danger").classList.add('d-none');

    let objForm = {};

    objForm.apiKey = $("#input_apiKey").val();
    objForm.authDomain = $("#input_authDomain").val();
    objForm.databaseURL = $("#input_databaseURL").val();
    objForm.projectId = $("#input_projectId").val();
    objForm.storageBucket = $("#input_storageBucket").val();
    objForm.messagingSenderId = $("#input_messagingSenderId").val();


    classMenuFirebase.save([objForm]).then(() => {
      getElement("#firebase_alert_success").classList.remove("d-none");
    }).
    catch((error) => {
      getElement("#firebase_alert_danger").classList.remove("d-none");

      console.error(error);
    });

  });


  // firebase


  // user
  const classMenuUser = new MenuUser(instPersisteData);

  getElement("#btn_login_firebase").addEventListener('click', (evt) => {
    classMenuUser.login().then((result) => {
      getElement("#logout_firebase").classList.remove("d-none");
      getElement("#btn_login_firebase").classList.add("d-none");
    })
    .catch((error) => {

      getElement("#login_alert_error").classList.remove("d-none");
      
      console.error(error);
    });
  });

  getElement("#btn_logout_firebase").addEventListener('click', (evt) => {
    classMenuUser.logout().then(() => {
      getElement("#logout_firebase").classList.add("d-none");
      getElement("#btn_login_firebase").classList.remove("d-none");
    }).catch((erro) => {
      getElement("#login_alert_error").classList.remove("d-none");

      console.error(erro);
    })
  });

  // login all ready do
  setTimeout(function() {
    classMenuUser.getData().then((result) => {
      let user1 = result[0];
      if (!user1) {
        return;
      }

      getElement("#logout_firebase").classList.remove("d-none");
      getElement("#btn_login_firebase").classList.add("d-none");
    });
  }, 1 * 1000);

  // user
}) (window);

function getElement(selector) {
  return window.document.querySelector(selector);
}
