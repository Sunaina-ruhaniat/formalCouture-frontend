import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "config/axios";
import { privatePaths } from "config/routes";
import toast from "react-hot-toast";

class AuthStore {
  user = {};
  isLoadingUser = false;

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      isLoadingUser: observable.ref,
      login: action,
      getUser: action,
      logout: action,
    });
  }

  login = ({ payload, navigate, resetForm }) => {
    runInAction(() => {
      this.isLoadingLogin = true;
    });
    console.log("payload", payload);
    axios
      .post("/auth/login", payload, { withCredentials: true })
      .then((res) => {
        if (res.status === 400) {
          resetForm();
          toast.error("Wrong Username or Password");
        } else if (res.status === 200) {
          const data = res.data;
          if (data.success) {
            localStorage.setItem("userClass", data?.user.groups[0]);
            const role = data.user.groups.includes("Admin Users")
              ? "admin"
              : "user";
            localStorage.setItem("role", "admin");
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate &&
              navigate(
                privatePaths["admin"][Object.keys(privatePaths["admin"])[0]],
                {
                  replace: true,
                }
              );
            window.location.reload();
          }
        }

        runInAction(() => {
          this.isLoadingLogin = false;
        });
      })
      .catch((error) => {
        toast.error("Wrong Username or Password");
        runInAction(() => {
          this.isLoadingLogin = false;
        });
      });
  };

  getUser = () => {
    runInAction(() => {
      this.isLoadingUser = true;
    });
    // Assuming your CSRF token is available in a cookie
    const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];

    axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
    axios
      .get("/auth/me", { withCredentials: true })
      .then(({ data }) => {
        runInAction(() => {
          const className = data?.groups[0]?.split(" ")[1];
          if (className) {
            localStorage.setItem("userClass", className);
          }
          this.user = data;
          this.isLoadingUser = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.isLoadingUser = false;
        });
      });
  };

  logout = ({ callback }) => {
    runInAction(() => {
      localStorage.clear();
      this.user = {};
      axios.get("/auth/logout").then((r) => {});
      callback && callback();
    });
  };
}

const authStore = new AuthStore();
export default authStore;
