// data tab

class Tab {

  static COMPLETE() { return "complete" }

  constructor(objTab) {
    this.objTab = objTab;

    this.listFocus = [];
  }

  setTitle(title) {
    this.title = title;
  }

  setUrl(url) {
    this.url = url;
  }

  focus(start = true) {

    if (!this.getUrl()) {
      return;
    }

    if (start) {
      this.focusStart();
    } else {
      this.focusEnd();
    }
  }

  focusStart() {
    let objTracker = {
      start: moment().unix(),
      end: 0,
      domain: this.getDomain(),
      url: this.getUrl()
    }

    this.listFocus.push(objTracker);
  }

  focusEnd() {
    if (!this.listFocus.length) {
      return;
    }

    this.listFocus[this.listFocus.length - 1].end = moment().unix();
  }

  getDomain() {
    return URI(this.getUrl()).domain();
  }

  getTitle() {
    return this.title;
  }

  getUrl() {
    return this.url;
  }

  getTracker() {
    return this.listFocus.filter(item => item.end > 0);
  }

  resetTracker(time) {
    // TODO: remove tracker before parameter time
    this.listFocus = [];
  }
}
