const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://admin:7325APM@abab0119efd6047bda3c46cf49fadf3b-1770816035.us-east-1.elb.amazonaws.com:27017/ecommerce?authSource=admin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1)
  }
}

module.exports = connectDB
