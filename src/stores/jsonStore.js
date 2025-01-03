import { makeObservable, observable, action, runInAction } from "mobx";

class JsonStore {
  trafficStatisticData = [];
  tooltipData = {};
  isLoadingTooltipData = false;
  isLoadingTrafficStatisticData = false;

  constructor() {
    makeObservable(this, {
      trafficStatisticData: observable.ref,
      tooltipData: observable.ref,
      isLoadingTooltipData: observable.ref,
      isLoadingTrafficStatisticData: observable.ref,

      getTrafficStatisticData: action,
      getTooltipData: action,
      clearTrafficStatisticData: action,
    });
  }

  getTrafficStatisticData = (type) => {
    runInAction(() => {
      this.isLoadingTrafficStatisticData = true;
    });
    fetch("/config/testData.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        runInAction(() => {
          this.trafficStatisticData = res[type];
          this.isLoadingTrafficStatisticData = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.isLoadingTrafficStatisticData = false;
        });
      });
  };

  getTooltipData = (page_id) => {
    runInAction(() => {
      this.isLoadingTooltipData = true;
    });
    fetch("/cfg/information/Information_banners_content.json")
      .then((res) => {
        return res.json();
      })
      .then(({ pages }) => {
        runInAction(() => {
          this.tooltipData = pages[page_id];
          this.isLoadingTooltipData = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.isLoadingTooltipData = false;
        });
      });
  };

  clearTrafficStatisticData = () => {
    this.trafficStatisticData = [];
  };
}

export default new JsonStore();
