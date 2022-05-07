import mongoose from "mongoose";

const Connectiondb = async () => {
  const URL =
    "mongodb+srv://phamducai2009:123123123@cluster0.ngb6z.mongodb.net/Crud?retryWrites=true&w=majority";

  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default Connectiondb;
