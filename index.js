const app = require("./app");
const PORT = process.env.PORT || 1037;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
