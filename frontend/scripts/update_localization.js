const fs = require("fs");
const path = require("path");

const axios = require("axios");
const csvtojson = require("csvtojson");

function fetchJsonFromSheetUrl(url) {
    return axios.get(url).then(response => csvtojson().fromString(response.data));
}

async function run(data) {
    const supportedLanguages = ["en", "ru"];
    let localizationData = {};

    for (let page of data.pages) {
        const url = `https://docs.google.com/spreadsheets/d/${data.id}/export?format=csv&id=${data.id}&gid=${page.gid}`;
        const pageJson = await fetchJsonFromSheetUrl(url);

        for (let row of pageJson) {
            const id = row["id"].toLowerCase();
            delete row["id"];
            delete row["notes"];

            localizationData[id] = {};

            for (let key in row) if (row.hasOwnProperty(key)) {
                if (supportedLanguages.indexOf(key) !== -1) {
                    localizationData[id][key] = row[key];
                }
            }
        }
    }

    const filePath = path.join(__dirname, "../src/assets/localization.json");
    fs.writeFileSync(filePath, JSON.stringify(localizationData));
}


run({
    id: "1FaTWcttnFJwS0CGUoBq347mEWdKpPOMJh5Kqzbk27j4",
    pages: [
        { gid: "0", name: "Wallet" },
    ],
});
