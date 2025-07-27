const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

const userRoutes = require("./Routes/user.routes");
app.use("/api/users", userRoutes);


app.get('/', (req, res) => {
    res.send('Hello from server!');
});


app.get('/', (req, res) => {
    res.send('Hello from server!');
});

app.post('/api/users', (req, res) => {
    const user = req.body;
    res.status(201).json({
    message: 'User created successfully!',
    user: user
    });
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    res.json({
    message: `User with ID ${userId} updated`,
    updatedData: updatedData
    });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({
    message: `User with ID ${userId} deleted`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
