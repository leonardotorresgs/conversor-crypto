import mongoose from "mongoose"
const { Schema } = mongoose

const conversionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    crypto: { type: String, required: true },
    amount: { type: Number, required: true },
    brl: { type: Number, required: true},
    usd: { type: Number, required: true},
    date: { type: Date, default: Date.now }
})

export default mongoose.model("Conversion", conversionSchema)
