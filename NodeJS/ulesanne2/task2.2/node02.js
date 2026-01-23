const {nimed, rollid} = require("./data.js");

console.log("Nimed: ", nimed);
console.log("Rollid: ", rollid);

const fs = require("fs");
rollid.forEach((element) => {
    fs.appendFile("./assets/tekst.txt", element + "\n", (err) => {
        if (err) {
            console.error("Faili kirjutamisel viga:", err);
        }
    });
});

fs.readFile("./assets/tekst.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Faili ei eksisteeri või tekkis viga:", err);
        return;
    }
    console.log("Faili sisu:", data);
});