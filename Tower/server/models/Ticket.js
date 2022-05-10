import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema({

    eventId: {type:Schema.Types.ObjectId, required:true, ref:'TowerEvent'},
    accountId: {type:Schema.Types.ObjectId, ref:'Account', required: true}

}, { timestamps: true, toJSON: { virtuals: true } })


TicketSchema.virtual('account',
{
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
    //REVIEW - Do I need a justOne here?? why?
    //NOTE yes I do, I will almost ALWAYS want to use justOne
})
TicketSchema.virtual('event',{

    localField: 'eventId',
    foreignField: '_id',
    ref: 'TowerEvent',
    justOne: true

})