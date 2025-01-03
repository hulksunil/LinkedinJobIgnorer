// Is received from index.js and is injected into the LinkedIn page
const companiesToIgnore = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "findTiles") {
        console.log("Looking for LinkedIn tiles...");
        const tiles = document.querySelectorAll("#main > div > div.scaffold-layout__list-detail-inner.scaffold-layout__list-detail-inner--grow > div.scaffold-layout__list > div > ul > li");



        if (tiles.length > 0) {
            console.log(`Found ${tiles.length} tiles.`);
            const companyNames = [];
            tiles.forEach((tile, index) => {

                var companyName = tile.querySelector("div.artdeco-entity-lockup__subtitle.ember-view");
                // We want to look at the ones that were currently loaded
                if (companyName != null) {
                    companyName = companyName.innerText;
                    console.log(companyName);
                    console.log(tile)
                    companyNames.push(companyName);

                    // Check if the company name is in the ignore list
                    if (companiesToIgnore.includes(companyName)) {
                        console.log(`Ignoring ${companyName}`);
                        tile.style.display = "none";
                    }
                }
            });
        } else {
            console.log("No tiles found.");
        }
    } else if (message.action === "companiesToIgnoreList") {
        console.log("Updating companies to ignore list...");
        companiesToIgnore.length = 0;
        companiesToIgnore.push(...message.data);
    }
});
