const { pipeline } = require('stream');
const Event = require('../db/models/event');
const { options } = require('mongoose');

module.exports = function () {
    return {
        /**
         * @param {*} eventData 
         * @returns 
         */
        async createEvent(eventData) {
            try {
                const event = new Event(eventData);
                return await event.save();
            } catch (error) {
                throw new Error('Error while creating the event');
            }
        },


        async getAllEvents(options) {

            console.log(options);
            const dateDebut = options.dateDebut;
            const dateFin = options.dateFin;
            const type = options.type;
            const orderDesc = options.orderDesc;
            const appId = options.appId;

            try {

                let pipeline = []
                if (type) {
                    pipeline.push({ $match: { "type": type } })
                }

                if(appId){
                    pipeline.push({ $match: { "appId": appId } })
                }

                if (dateDebut && dateFin) {
                    console.log(new Date(dateFin))
                    pipeline.push({ $match: { createdAt: { "$gte": new Date(dateDebut), "$lte": new Date(dateFin) } } })
                }
                else if (dateDebut) {
                    pipeline.push({ $match: { createdAt: { "$gte": new Date(dateDebut) } } })
                }
                else if (dateFin) {
                    pipeline.push({ $match: { createdAt: { "$lte": new Date(dateFin) } } })
                }

                if (orderDesc) {
                    pipeline.push({ $sort: { createdAt: -1 } })
                }
                else {
                    pipeline.push({ $sort: { createdAt: 1 } })
                }

                console.log(pipeline);

                return Event.aggregate(pipeline).then(resultats => {
                    console.log(typeof (resultats));

                    return resultats;
                }).catch(error => {
                    console.log("here", error);
                    throw new Error('an error has occured');
                });
            } catch (error) {
                console.log(error);
            }

        },

        async getCount(options) {

            const dateDebut = options.dateDebut;
            const dateFin = options.dateFin;
            const type = options.type;
            const periode = options.periode;
            const orderDesc = options.orderDesc;

            console.log(options.periode);

            try {

                let pipeline = []

                if (type) {
                    pipeline.push({ $match: { "type": type } })
                }

                if (dateDebut && dateFin) {
                    console.log(new Date(dateFin))
                    pipeline.push({ $match: { createdAt: { "$gte": new Date(dateDebut), "$lte": new Date(dateFin) } } })
                }
                else if (dateDebut) {
                    pipeline.push({ $match: { createdAt: { "$gte": new Date(dateDebut) } } })
                }
                else if (dateFin) {
                    pipeline.push({ $match: { createdAt: { "$lte": new Date(dateFin) } } })
                }

                if (periode == 'day') {
                    pipeline.push({
                        $group: {
                            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                            count: { $sum: 1 }
                        }
                    })
                }
                else if (periode == 'month') {
                    pipeline.push({
                        $group: {
                            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                            count: { $sum: 1 }
                        }
                    })
                }
                else if (periode == 'year') {
                    pipeline.push({
                        $group: {
                            _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
                            count: { $sum: 1 }
                        }
                    })
                }


                if (orderDesc) {
                    pipeline.push({ $sort: { createdAt: -1 } })
                }
                else {
                    pipeline.push({ $sort: { createdAt: 1 } })
                }

                pipeline.push({
                    $project: {
                        _id: 0,
                        periode: '$_id',
                        count: '$count'
                    }
                })
                console.log(pipeline);

                return Event.aggregate(pipeline).then(resultats => {
                    console.log(typeof (resultats));

                    return resultats;
                }).catch(error => {
                    console.log("here", error);
                    throw new Error('Error');
                });
            } catch (error) {
                console.log(error);
            }

        },



        /**
         * @param {*} eventId 
         * @returns 
         */
        async getEventById(eventId) {
            try {
                return await Event.findOne({ _id: eventId });
            } catch (error) {
                throw new Error('Error while retrieving the event');
            }
        },

        /**
         * @param {*} eventId 
         * @param {*} eventData 
         * @returns 
         */
        async updateEventById(eventId, eventData) {
            try {
                return await Event.findOneAndUpdate({ _id: eventId }, eventData, { new: true });
            } catch (error) {
                throw new Error('Error while updating the event');
            }
        },

        /**
         * @param {*} eventId 
         * @returns 
         */
        async deleteEventById(eventId) {
            try {
                return await Event.findOneAndDelete({ _id: eventId });
            } catch (error) {
                throw new Error('Error while deleting the event');
            }
        },


        async getEventsByAppId(appId) {
            try {
                const events = await Event.find({ appId: appId });
                return events;
            } catch (error) {
                console.error('Error in service:', error);
                throw error;
            }
        }
    }
}
