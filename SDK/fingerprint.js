import FingerPrintjs from "@fingerprintjs/fingerprintjs";

export default {
  async hasAlreadyVisited(visitorId) {
    const allVisitorIds = await this.getAllVisitorIds();

    if (allVisitorIds) {
      const isValuePresent = allVisitorIds.some(
        (obj) => obj.visitorId === visitorId
      );
      return isValuePresent;
    }
  },

  async loadFingerPrint() {
    const fpPromise = await FingerPrintjs.load();
    const fp = await fpPromise;
    const result = await fp.get();
    return result.visitorId;
  },

  async getAllVisitorIds() {
    try {
      const response = await fetch(
        "http://localhost:3000/events?_attributes=visitorId"
      );
      if (!response.ok) {
        throw new Error("Error in service:", response);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error retrieving events", error);
      throw error;
    }
  },

  async timeSpent(d, s, id, file) {
    var Tos;
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.onload = function () {
      var config = {
        trackBy: "seconds",
      };
      if (TimeOnSiteTracker) {
        Tos = new TimeOnSiteTracker(config);
      }
    };
    js.src = file;
    fjs.parentNode.insertBefore(js, fjs);
    return Tos;
  },

  // timeSpent(document, 'script', 'TimeOnSiteTracker', '//cdn.jsdelivr.net/gh/saleemkce/timeonsite@1.2.1/timeonsitetracker.min.js');
};
