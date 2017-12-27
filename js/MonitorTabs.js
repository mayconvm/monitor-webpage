// control all tabs

class MonitorTabs {

  constructor(start = true, classPersiste) {
    this.FLAG = "[MONITOR - MonitorTabs]"

    this.listTabs = {};

    this.instPersiste = classPersiste;

    this.start = start;

    if (!this.start) {
      this.startListen();
    }
  }

  startListen() {
    const that = this;

    // Tracks
    // - create
    chrome.tabs.onCreated.addListener(function __listenCreated(objTab) {
      that.addTab(objTab);
    });

    chrome.tabs.onUpdated.addListener(function __ListenUpdated(tabId, objChange, objTab) {

      that.removeTab(tabId);

      that.addTab(objTab);
    });

    // - focus
    chrome.tabs.onActivated.addListener(function __listenActivated(obj) {
      that.focusTab(obj.tabId);
    });

    // - close
    chrome.tabs.onRemoved.addListener(function __listenRemove(tabId, objRemove) {
      that.removeTab(tabId);
    });

    this.start = true;
  }

  addTab(objTab) {
    this.listTabs[objTab.id] = new Tab(objTab);
  }

  removeTab(tabId) {
    delete this.listTabs[tabId];
  }

  focusTab(tabId) {
    this.listTabs[tabId].focus();
  }

  persisteData() {
    let that = this;
    let data = [];
    let time = moment().unix();
    for (let [key, tab] of Object.entries(this.listTabs)) {
      data += tab.getTraker();
    }

    console.log(this.FLAG, "All trackers:", data);

    this.instPersiste.writeData("tracker", data)
      .then(function __thenWriteData() {
        for (let [key, tab] of Object.entries(that.listTabs)) {
          tab.resetTraker(time);
        }

        console.log(that.FLAG, "Persiste success.");
      });
  }
}
