module.exports = function (widgetsService, options = {}) {
    return {
        async createWidget(req, res) {
            try {
                const widgetData = req.body;
                const widget = await widgetsService.createWidget(widgetData);
                res.status(201).json(widget);
            } catch (error) {
                res.status(500).json({ error: "[CONTROLLER] = Error while creating the widget" });
            }
        },

        async getAllWidgets(req, res) { // Corrected function name
            try {
                const widgets = await widgetsService.getAllWidgets(); // Corrected function name
                res.status(200).json(widgets);
            } catch (error) {
                res.status(500).json({ error: 'Error while retrieving all widgets' });
            }
        },

        async getWidgetById(req, res) {
            try {
                const widgetId = req.params.id;
                const widget = await widgetsService.getWidgetById(widgetId);
                if (widget) {
                    res.status(200).json(widget);
                } else {
                    res.status(404).json({ error: "widget not found" });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "[Controller] Error while retrieving the widget" });
            }
        },

        async updateWidgetById(req, res) {
            try {
                const widgetId = req.params.id;
                const widgetData = req.body;
                const updatedWidget = await widgetsService.updateWidgetById(
                    widgetId,
                    widgetData,
                );
                if (updatedWidget) {
                    res.status(200).json(updatedWidget);
                } else {
                    res.status(404).json({ error: "widget not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "Error while updating the widget" });
            }
        },

        async deleteWidgetById(req, res) {
            try {
                const widgetId = req.params.id;
                const deletedWidget = await widgetsService.deleteWidgetById(widgetId);
                if (deletedWidget) {
                    res.status(200).json(deletedWidget);
                } else {
                    res.status(404).json({ error: "widget not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "Error while deleting the widget" });
            }
        },

        async getWidgetsByAppId(req, res) {
            const appId = req.params.id; // Corrected variable name
            try {
                const widgets = await widgetsService.getWidgetsByAppId(appId); // Corrected function name
                res.json(widgets);
            } catch (error) {
                console.error("Error in controller:", error);
                res
                    .status(500)
                    .json({ error: "An error occurred while fetching widgets." });
            }
        },
    };
};
