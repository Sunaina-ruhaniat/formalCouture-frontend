import {
  makeObservable,
  observable,
  action,
  runInAction,
  computed,
} from "mobx";
import axios from "config/axios";
import toast from "react-hot-toast";

class MapStore {
  address = [];
  intersections = [];
  selectedIntersection = null;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      address: observable.ref,
      intersections: observable.ref,
      selectedIntersection: observable.ref,
      isLoading: observable.ref,

      intersectionOptions: computed,

      getAddressFromCoordinates: action,
      getCallbackAddressFromCoordinates: action,
    });
  }

  fetchIntersections = async () => {
    if (this.intersections.length) return;
    try {
      const response = await axios.get("/maps/intersections");
      this.intersections = response.data.intersections;
      this.selectedIntersection = this.intersections[0];
    } catch (error) {
      toast("Error fetching intersections");
    }
  };

  get intersectionOptions() {
    return this.intersections.map((i) => ({ value: i, label: i.name }));
  }

  setSelectedIntersection(intersection) {
    this.selectedIntersection = intersection;
  }

  getAddressFromCoordinates = ({ latlng, callback }) => {
    runInAction(() => {
      this.isLoading = true;
    });
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyAOTHUL6pBPpzbR5pDfBFsdUU8zqnykqgA&language=en`
      )
      .then(({ data: { results } }) => {
        runInAction(() => {
          this.address = results[0].formatted_address;
          this.isLoading = false;
          callback && callback(results[0].formatted_address);
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  };

  getCallbackAddressFromCoordinates = ({
    latlng,
    callback,
    addressCallback,
  }) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyAOTHUL6pBPpzbR5pDfBFsdUU8zqnykqgA&language=en`
      )
      .then(({ data: { results } }) => {
        runInAction(() => {
          callback && callback(results[0].formatted_address);
          addressCallback &&
            addressCallback({
              city: results[0].address_components.find(
                (item) => item.types[0] === "locality"
              )?.long_name,
              country: results[0].address_components.find(
                (item) => item.types[0] === "country"
              )?.long_name,
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default new MapStore();
