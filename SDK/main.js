import Fingerprint from "./fingerprint.js";
let Tos;
export default {
  /**
   *
   * @param {*} APPID
   * @returns
   */
  async isAuthorized(APPID) {
    const allAppIds = await this.getAllAppIds();

    if (allAppIds) {
      const isValuePresent = allAppIds.some((obj) => obj.appId === APPID);
      return isValuePresent;
    }
  },
  /**
   *
   * @param {*} VueInstance
   * @param {*} options
   */
  install(VueInstance, options) {
    if (this.isAuthorized(options.APPID)) {
      VueInstance.directive("tracker", async (el, binding) => {
        (function (d, s, id, file) {
          var js,
            fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s);
          js.id = id;
          js.onload = function () {
            var config = {
              trackBy: "seconds",
              callback: async function (activity) {
                console.log(activity);

                var endpoint = "http://localhost:3000/events/";

                if (activity) {
                  if (Tos.verifyData(activity) != "valid") {
                    console.log("Invalid data");
                    return;
                  }

                  var data = {
                    type: "timeSpent",
                    appId: options.APPID,
                    data: activity,
                  };

                  if (navigator && navigator.sendBeacon === "function") {
                    var blob = new Blob([JSON.stringify(data)], {
                      type: "application/json",
                    });
                    navigator.sendBeacon(endpoint, blob);
                    console.log("Beacon sent");
                  } else {
                    try {
                      const response = await fetch(
                        "http://localhost:3000/events/",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(data),
                        }
                      );
                      console.log(response);
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }
              },
            };
            if (TimeOnSiteTracker) {
              Tos = new TimeOnSiteTracker(config);
              Fingerprint.loadFingerPrint().then(async (result) => {
                await Tos.startSession(result);
                //console.log(await Tos.getTimeOnPage());
              });
            }
          };
          js.src = file;
          fjs.parentNode.insertBefore(js, fjs);
        })(
          document,
          "script",
          "TimeOnSiteTracker",
          "//cdn.jsdelivr.net/gh/saleemkce/timeonsite@1.2.1/timeonsitetracker.min.js"
        );

        if (binding.modifiers.click) {
          //* tracker tout les boutons du site-client.
          el.addEventListener("click", async () => {
            const visitorId = await Fingerprint.loadFingerPrint();
            const action = Object.keys(binding.modifiers)[0];
            let data = {
              modifier: binding.modifiers,
              page: window.location.href,
              tag: binding.arg,
              visitor_id: visitorId,
            };
            console.log(action, binding.arg, binding.modifiers);
            this.createEvent(action, options.APPID, data);
          });
        }

        if (binding.modifiers.submit) {
          //* tracker les form submit
          el.addEventListener("submit", async () => {
            const visitorId = await Fingerprint.loadFingerPrint();
            const action = Object.keys(binding.modifiers)[0];
            let data = {
              modifier: binding.modifiers,
              page: window.location.href,
              tag: binding.arg,
              visitor_id: visitorId,
            };
            console.log(action, binding.arg, data);
            this.createEvent(action, options.APPID, data);
          });
        }

        if (binding.modifiers.visited) {
          //* tracker les visites de pages
          const action = Object.keys(binding.modifiers)[0];
          const visitorId = await Fingerprint.loadFingerPrint();
          const startTime = new Date();
          const modifier = binding.modifiers;
          const page = window.location.href;
          const tag = binding.arg;
          window.addEventListener("beforeunload", async () => {
            const endTime = new Date();
            const timeSpent = endTime - startTime;
            let data = {
              modifier: modifier,
              page: page,
              tag: tag,
              visitor_id: visitorId,
              timeSpent: timeSpent,
            };
            console.log(action, binding.arg, data);
            await this.addTimeSpentOnPage(
              visitorId,
              action,
              options.APPID,
              data
            );
          });
        }
      });
    } else {
      alert("Woups ! pas d'autorisation.");
    }
  },

  async getAllAppIds() {
    try {
      const response = await fetch(
        `http://localhost:3000/users?_attributes=appId`
      );
      if (!response.ok) {
        throw new Error(
          `erreur serveur (${response.status} ${response.statusText})`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async createEvent(eventType, appId, otherData = {}) {
    const event = {
      type: eventType,
      appId: appId,
      data: otherData,
    };

    console.log(event);
    if (event) {
      let hasError = false;
      try {
        const response = await fetch("http://localhost:3000/events/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  },

  async addTimeSpentOnPage(visitorId, type, appId, data) {
    const event = {
      type: type,
      appId: appId,
      data: data,
    };
    try {
      const response = await fetch(
        `http://localhost:3000/events/visitor/${visitorId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
};
