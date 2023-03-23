if (location.pathname.indexOf("index.html") >= 0) {
    location.href = location.pathname.replace(/index.html.*/, "")
}

window.onload = e => {
    const jsonUrl = location.pathname + "assets/emojilist_merged.json";

    // loading emojis
    fetch(jsonUrl)
    .then(response => response.json())
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
            containerDiv.dataset.name = emoji.name;

            const emojiDiv = document.createElement("div");
            emojiDiv.textContent = emoji.char;

            const nameDiv = document.createElement("div");
            nameDiv.textContent = emoji.name;

            const codePoint = emoji.char.codePointAt(0).toString(16);

            const htmlCodeDiv = document.createElement("div");
            htmlCodeDiv.textContent = `&#x${codePoint};`;

            const utfHexDiv = document.createElement("div");
            utfHexDiv.textContent = `\\u{${codePoint}}`;

            const hexDiv = document.createElement("div");
            hexDiv.textContent = codePoint;

            containerDiv.appendChild(emojiDiv);
            containerDiv.appendChild(nameDiv);
            containerDiv.appendChild(htmlCodeDiv);
            containerDiv.appendChild(utfHexDiv);
            containerDiv.appendChild(hexDiv);

            container.appendChild(containerDiv);
        }
    });

    // Hide items that are not included in the search
    const searchButton = document.querySelector('button');

    // Search button action
    searchButton.addEventListener('click', e => {
        const queries = document.querySelector('#emojiSearch').value.split(/[\x20\u3000]/);

        const items = document.querySelectorAll(".item");
        for (const item of items) {
            for (const query of queries) {
                if (item.dataset.keywords.indexOf(query) == -1 && item.dataset.name.indexOf(query) == -1) {
                    item.classList.add("d-none");
                    break;
                } else {
                    item.classList.remove("d-none");
                }
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
