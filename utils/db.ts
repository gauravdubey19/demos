import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: "TSKEcommerce",
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000, // increasing timeout to 30 seconds
    });

    isConnected = true;
    console.log("MongoDB connected");

    // Call addNewFields after the connection is established
    // await addNewFields();
    // await updateProducts();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

// Function to add new fields to the productCollection array
async function addNewFields() {
  try {
    if (!mongoose.connection.db) {
      console.log("No database connection");
      return;
    }

    const result = await mongoose.connection.db
      .collection("Outfits")
      .updateMany(
        {},
        {
          $set: {
            "productCollection.$[].productId": "", // Add default value for productId
            "productCollection.$[].price": 0, // Add default value for price
          },
        }
      );

    console.log("Update result:", result);
    console.log(`Updated documents: ${result.modifiedCount}`);
  } catch (error) {
    console.error("Error updating products:", error);
  }
}
async function updateProducts() {
  try {
    if(!mongoose.connection.db) {
      console.log("No database connection");
      return;
    }
    const result = await mongoose.connection.db
      .collection("Outfits")
      .updateMany({}, { $rename: { image_link: "image_link" } });

    console.log("Update result:", result);

    console.log(`Updated documents: ${result.modifiedCount}`);
  } catch (error) {
    console.error("Error updating products:", error);
  } finally {
    await mongoose.connection.close();
  }
}

// async function removeFullNameField() {
//   try {
//     // Log existing documents to check if fullName exists
//     const existingDocuments = await Testimonial.find({});
//     // console.log("Existing documents before removal:", existingDocuments);

//     const result = await mongoose.connection.db
//       .collection("testimonials")
//       .updateMany(
//         {}, // Select all documents
//         { $unset: { fullName: "" } } // Remove the fullName field
//       );
//     // const result = await Testimonial.updateMany(
//     //   {}, // Select all documents
//     //   { $unset: { fullName: "" } } // Remove the fullName field
//     // );

//     // Log the result of the update operation
//     console.log("Update result:", result);

//     // Check for errors
//     if (result.acknowledged) {
//       return result.modifiedCount; // Return the modified count
//     } else {
//       console.error(
//         "Update operation not acknowledged. Possible issue with the query."
//       );
//       return 0; // Return 0 if not acknowledged
//     }
//   } catch (error) {
//     console.error("Error removing 'fullName' field:", error);
//     return 0; // Return 0 in case of an error
//   }
// }
