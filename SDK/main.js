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
            VueInstance.directive('tracker', (el, binding) => {
                console.log(el);
                if (binding.modifiers.click) {
                    //tracker tout les boutons du site-client.
                    el.addEventListener("click", () => {
                        switch (binding.arg) {
                            case 'BUTTONA':
                                console.log("click", binding.arg, binding.modifiers);
                                this.createEvent("click", options.APPID, { "tag": binding.arg })
                                break;
                            case 'BUTTONB':
                                console.log("click", binding.arg, binding.modifiers);
                                this.createEvent("click", options.APPID, { "tag": binding.arg })
                                break;
                            case 'FORMA':
                                console.log("Form A submited", binding.arg, binding.modifiers);
                        }
                    });
                }
            })
        } else {
            alert("Woups ! pas d'autorisation.")
        }
    },

    async getAllAppIds() {
        try {
            const response = await fetch(`http://localhost:3000/users?_attributes=appId`);
            if (!response.ok) {
                throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
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
            "type": eventType,
            "appId": appId,
            "data": otherData
        }

        console.log(event);
        if (event) {
            let hasError = false;
            try {
                const response = await fetch('http://localhost:3000/events/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(event)
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    }
}










