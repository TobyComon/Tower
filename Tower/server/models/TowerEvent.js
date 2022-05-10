import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        coverImg: {type: String},
        location: {type: String},
        capacity: {type: Number, required: true},
        startDate: {type: Date, required: true},
        isCanceled: {type: Boolean, default: false},
        creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
        type: {type: String, enum: ['concert', 'sport', 'convention', 'digital']}
    },
    {
        timestamps: true,
        toJSON: {virtuals: true}
    })
    TowerEventSchema.virtual('creator',
    {
        localField: 'creatorId',
        foreignField: '_id',
        ref: 'Account',
        justOne: true
    })
