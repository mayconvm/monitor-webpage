const TAG = "[MONITOR]";
console.log(TAG);

chrome.tabs.onActivated.addListener((a, b, c, d, e) => {
	console.log(TAG, "--->", a, b, c, d, e);
})