import Fingerprint from "./fingerprint.js";
import detectUrlChange from "detect-url-change";

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
        if (binding.modifiers.click) {
          //* tracker tout les boutons du site-client.
          el.addEventListener("click", async () => {
            const visitorId = (await Fingerprint.loadFingerPrint()).visitorId;
            const timezone = (await Fingerprint.loadFingerPrint()).components
              .timezone.value;
            const action = Object.keys(binding.modifiers)[0];
            let data = {
              modifier: binding.modifiers,
              page: window.location.href,
              tag: binding.arg,
              visitor_id: visitorId,
              timezone: timezone,
            };
            console.log(action, binding.arg, binding.modifiers);
            this.createEvent(action, options.APPID, data);
          });
        }

        if (binding.modifiers.submit) {
          //* tracker les form submit
          el.addEventListener("submit", async () => {
            const visitorId = (await Fingerprint.loadFingerPrint()).visitorId;
            const timezone = (await Fingerprint.loadFingerPrint()).components
              .timezone.value;

            const action = Object.keys(binding.modifiers)[0];
            let data = {
              modifier: binding.modifiers,
              page: window.location.href,
              tag: binding.arg,
              visitor_id: visitorId,
              timezone: timezone,
            };
            console.log(action, binding.arg, data);
            this.createEvent(action, options.APPID, data);
          });
        }

        if (binding.modifiers.visited) {
                    //* tracker les visites de pages
          const action = Object.keys(binding.modifiers)[0];
          const visitorId = (await Fingerprint.loadFingerPrint()).visitorId;
          const timezone = (await Fingerprint.loadFingerPrint()).components
            .timezone.value;

          const startTime = new Date();
          const modifier = binding.modifiers;
          const page = window.location.href;
          const tag = binding.arg;
          detectUrlChange.on("change", async () => {
            const endTime = new Date();
            const timeSpent = endTime - startTime;
            let data = {
              modifier: modifier,
              page: page,
              tag: tag,
              visitor_id: visitorId,
              timeSpent: timeSpent,
              timezone: timezone,
            };
            await Fingerprint.addTimeSpentOnPage(
              visitorId,
              action,
              timezone,
              modifier,
              options
            );
          });
          window.addEventListener("unload", async () => {
            this.eventMaker(
              startTime,
              page,
              tag,
              visitorId,
              action,
              timezone,
              modifier,
              options
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

  async eventMaker(
    startTime,
    page,
    tag,
    visitorId,
    action,
    timezone,
    modifier,
    options
  ) {
    const endTime = new Date();
    const timeSpent = endTime - startTime;
    let data = {
      modifier: modifier,
      page: page,
      tag: tag,
      visitor_id: visitorId,
      timeSpent: timeSpent,
      timezone: timezone,
    };
    await Fingerprint.addTimeSpentOnPage(
      visitorId,
      action,
      options.APPID,
      data
    );
  },
};
