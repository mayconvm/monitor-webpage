(function (_global) {

  class MenuDashBoard {

    constructor(persistData) {

      this.persistData = persistData;

      this.init();
    }

    init() {

    }

    charTimeline(divChar) {
      let that = this;

      return new Promise((resolve, reject) => {

          try {
            let chart = d3.timeline()
            // .beginning(1355752800000) // we can optionally add beginning and ending times to speed up rendering a little
            // .ending(1355774400000)
            .showTimeAxisTick() // toggles tick marks
            .stack() // toggles graph stacking
            .margin({left:70, right:30, top:0, bottom:0});


            return that.persistData.getDataFirebase("tracker").then((result) => {

              let dataChart = [];

              result.forEach((item) => {
                // console.log("---> TIMELINE-item:", item);

                let _item = item.val();
                let el = _.find(dataChart, {label: _item.domain})

                if (!el) {
                  dataChart.push(
                    {
                      class: _item.domain,
                      label: _item.domain,
                      times: [
                        {"starting_time": _item.start, "ending_time": _item.end},
                      ]
                    }
                  );
                } else {
                  el.times.push(
                    {"starting_time": _item.start, "ending_time": _item.end},
                  );
                }

              });

              // var dataChart = [
                  
              //   {class: "pA", label: "person a", times: [
              //     {"starting_time": 1355752800000, "ending_time": 1355759900000},
              //     {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
                
              //   {class: "pB", label: "person b", times: [
              //     {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
                
              //   {class: "pC", label: "person c", times: [
              //     {"starting_time": 1355761910000, "ending_time": 1355763910000}]}
              // ];

              let r = d3.select(divChar)
                .append("svg")
                // .attr("height", 200)
                .attr("width", 570)
                .datum(dataChart).call(chart);

                return r;
            })


          } catch (exception) {
            return reject(exception);
          }
      });

    } // charTimeline
  }

  _global.MenuDashBoard = MenuDashBoard;
}) (window);
