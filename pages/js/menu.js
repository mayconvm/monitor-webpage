(function(_global) {

  class Menu {

    constructor(divMenu, divContener) {
      this.divMenu = _global.document.querySelector(divMenu);
      this.divContener = _global.document.querySelector(divContener);

      this.listenOptionsMenu();
    }

    listenOptionsMenu() {
      let options = this.divMenu.querySelectorAll("a");

      for (let link of options) {
        link.addEventListener('click', (evt) => {
          this.click(evt.target.id);
        });
      }
    }

    click(menu) {
      let idMenu = menu.replace(/.*([0-9]+)/, "$1");

      this.hiddeAllContents();
      this.showContent(idMenu);
    }

    showContent(id) {
      let content = this.divContener.querySelector("#menu_" + id);

      if (!content) {
        throw new Error("Content not found.");
      }

      content.classList.remove("d-none");
    }

    hiddeAllContents () {
      let listContents = this.divContener.querySelectorAll(".menus");
      for (let content of listContents) {
        content.classList.add("d-none");
      }
    }
  }

  _global.Menu = Menu;

})(window)
