// control all tabs

class MonitorTabs {

  constructor(start = true, classPersiste) {
    this.FLAG = "[MONITOR - MonitorTabs]"

    this.listTabs = {};

    this.instPersiste = classPersiste;

    this.start = start;

    this.lastTab = null;

    if (this.start) {
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

      console.log(that.FLAG, tabId, objChange, objTab);

      that.updateTab(tabId, objChange, objTab);
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
    if (!(tabId in this.listTabs)) {
      return;
    }

    delete this.listTabs[tabId];
  }

  focusTab(tabId) {
    if (!(tabId in this.listTabs)) {
      return;
    }

    if (this.lastTab && this.lastTab in this.listTabs) {
      this.listTabs[this.lastTab].focus(false);
    }

    this.listTabs[tabId].focus();

    this.lastTab = tabId;
  }

  updateTab(tabId, objChange, objTab) {
    if (!(tabId in this.listTabs)) {
      return;
    }

    // valid title
    if ('status' in objChange && objChange.status !== Tab.COMPLETE) {
      return;
    }

    let tab = this.listTabs[tabId];

    tab.setTitle(objTab.title);
    tab.setUrl(objTab.url);
  }

  persisteData() {
    let that = this;
    let data = [];
    let time = moment().unix();
    for (let [key, tab] of Object.entries(this.listTabs)) {
      data = data.concat(tab.getTracker());
    }

    console.log(this.FLAG, "All trackers:", data);

    this.instPersiste.writeData("tracker", data)
      .then(function __thenWriteData() {
        for (let [key, tab] of Object.entries(that.listTabs)) {
          tab.resetTracker(time);
        }

        console.log(that.FLAG, "Persiste success.");
      });
  }
}
