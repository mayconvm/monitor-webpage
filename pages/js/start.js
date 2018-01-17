(function (_global) {
  // start menu
  const classMenu = new Menu(
    "#menu",
    "#collection_contents",
  );

  // start firebase
  const classMenuFirebase = new MenuFirebase(
    new PersisteData()
  );


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

  function getElement(selector) {
    return _global.document.querySelector(selector);
  }
}) (window);
