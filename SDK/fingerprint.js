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
    return result;
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
