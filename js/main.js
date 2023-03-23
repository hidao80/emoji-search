import emoji2HTMLEntity from './emoji2htmlCode.js';

window.onload = e => {
    var dirs = location.href.split("/");
    const jsonUrl = dirs[dir.length -2] + "../assets/emojilist.json";

    // loading emojis
    fetch(jsonUrl)
    .then( response => response.json())
    .then(emojis => {
        // Set emoji categories as search candidates.
        const items = emojis.filter(
            (element, index, self) => self.findIndex((e) => e.category === element.category) === index
        );
        const datalist = document.querySelector("datalist");
        for (const item of items) {
            const categoryOption = document.createElement("Option");
            categoryOption.value = item.category;

            datalist.appendChild(categoryOption);
        }

        // Display of pictogram list
        const container = document.querySelector('container');
        for (const emoji of emojis) {
            const containerDiv = document.createElement("div");
            containerDiv.classList.add("item");
            containerDiv.style = "margin:5px;width:calc(12.5% - 6px)";
            containerDiv.dataset.keywords = emoji.keywords.join(",");

            const emojiDiv = document.createElement("div");
            emojiDiv.textContent = emoji.char;

            const nameDiv = document.createElement("div");
            nameDiv.textContent = emoji.name;

            const htmlCodeDiv = document.createElement("div");
            htmlCodeDiv.textContent = emoji2HTMLEntity(emoji.char);

            const hexDiv = document.createElement("div");
            hexDiv.textContent = emoji2HTMLEntity(emoji.char).replace(/(&#x|;)/ig, "");

            containerDiv.appendChild(emojiDiv);
            containerDiv.appendChild(nameDiv);
            containerDiv.appendChild(htmlCodeDiv);
            containerDiv.appendChild(hexDiv);

            container.appendChild(containerDiv);
        }
    });

    // Hide items that are not included in the search
    const searchButton = document.querySelector('button');

    // Search button action
    searchButton.addEventListener('click', e => {
        const query = document.querySelector('#emojiSearch').value;

        const items = document.querySelectorAll(".item");
        for (const item of items) {
            if (item.dataset.keywords.indexOf(query) == -1) {
                item.classList.add("d-none");
            } else {
                item.classList.remove("d-none");
            }
        }
    });

    // Search textbox action
    document.querySelector('#emojiSearch').addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
        return false;
    });
}
