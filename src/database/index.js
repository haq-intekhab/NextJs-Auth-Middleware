import mongoose from "mongoose";

const connetToDb = async() => {
  const connectionURL = "mongodb://localhost/AuthDatabase";

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Database Connection Established"))
    .catch((err) => console.log("error",err));
}

export default connetToDb;