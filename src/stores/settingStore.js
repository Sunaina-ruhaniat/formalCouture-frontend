import {
    makeObservable,
    observable,
    action,
    runInAction,
} from "mobx";
import axios from "config/axios";
import toast from "react-hot-toast";

class SettingStore {
    isLoadingAddUser = false;
    isUserAdded = false;

    constructor() {
        makeObservable(this, {
            isLoadingAddUser: observable.ref,
            isUserAdded: observable.ref,
            addUser: action,
        });
    }

    addUser = async ({ payload, resetForm, handleClose }) => {
        runInAction(() => {
            this.isLoadingLogin = true;
            this.isAlreadyExist = false;
            this.isUserAdded = false
        });
        await axios
            .post("auth/register", payload)
            .then((res) => {
                if (res.status === 200) {
                    resetForm();
                    const data = res.data;
                    if (data.success) {
                        toast.success(data.message);
                        runInAction(() => {
                            this.isUserAdded = true
                            this.isLoadingAddUser = false;
                            this.isAlreadyExist = false;
                        });
                        handleClose()
                    } else {
                        this.isUserAdded = false
                        this.isLoadingAddUser = false;
                    }
                } else if (res.status === 400) {
                    this.isUserAdded = false
                    this.isLoadingAddUser = false;
                    toast.error(res.data.detail);
                }
            })
            .catch((error) => {
                runInAction(() => {
                    this.isUserAdded = false
                    this.isLoadingAddUser = false;
                });
            });
    };
}

export default new SettingStore();
