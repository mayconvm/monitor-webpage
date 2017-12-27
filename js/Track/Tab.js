// data tab

class Tab {

  constructor(objTab) {
    this.objTab = objTab;

    this.listFocus = [];
  }

  focus() {
    let objTracker = {
      time: moment().unix(),
      domain: this.getDomain()
    }

    this.listFocus.push(objTracker);
  }

  getDomain() {
    return URI(this.objTab).domain();
  }

  getTracker() {
    return this.listFocus;
  }

  resetTracker(time) {
    // TODO: remove tracker before parameter time
    this.listFocus = [];
  }
}
