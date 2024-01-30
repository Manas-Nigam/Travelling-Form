const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

const mongoURI = "mongodb://localhost:27017/your_database_name";


app.use(bodyParser.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;

    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection("your_collection_name");
        const result = await collection.insertOne({
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: password
        });

        console.log(`Document inserted with _id: ${result.insertedId}`);
        res.json({ success: true, message: "Data inserted into MongoDB successfully." });
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
