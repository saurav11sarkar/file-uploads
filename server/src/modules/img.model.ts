import mongoose from "mongoose";

const imgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Img = mongoose.model("Img", imgSchema);
export default Img;
