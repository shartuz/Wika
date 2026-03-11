let dictionary = [];

// Load dictionary JSON
fetch("dictionary.json")
    .then(response => response.json())
    .then(data => {
        dictionary = data;
    });

// Event listener for search button
document
    .getElementById("translateButton")
    .addEventListener("click", searchWord);

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        searchWord();
    }
}
);

// Search function
function searchWord() {
    const input = document.getElementById("searchInput").value
        .toLowerCase()
        .trim();

    const entry = dictionary.find(item =>
        item.words.some(word =>
            word.toLowerCase() === input
        )
    );

    if (!entry) {
        alert("Word not found");

        // Clear all previous content if word not found
        document.getElementById("translationBox").innerText = "";
        document.getElementById("englishNotes").style.display = "none";
        document.getElementById("finnishNotes").style.display = "none";
        document.getElementById("tableBox").style.display = "none";
        document.getElementById("imageContainer").style.display = "none";
        return;
    }

    displayEntry(entry);
}

// Display dictionary entry
function displayEntry(entry) {
    // Clear previous content first
    document.getElementById("translationBox").innerText = "";
    document.getElementById("englishNotes").innerHTML = "";
    document.getElementById("finnishNotes").innerHTML = "";
    document.getElementById("tableBox").innerHTML = "";
    document.getElementById("imageContainer").style.display = "none";
    document.getElementById("englishNotes").style.display = "none";
    document.getElementById("finnishNotes").style.display = "none";
    document.getElementById("tableBox").style.display = "none";

    // Translation
    document.getElementById("translationBox").innerText = entry.translation;

    // English Notes
    if (entry.englishDefinition) {
        const box = document.getElementById("englishNotes");
        box.style.display = "block";
        box.innerHTML = entry.englishDefinition.join("<br>");
    }

    // Finnish Notes
    if (entry.finnishDefinition) {
        const box = document.getElementById("finnishNotes");
        box.style.display = "block";
        box.innerHTML = entry.finnishDefinition.join("<br>");
    }

    // Table
    if (entry.table && entry.table.length > 0) {
        const box = document.getElementById("tableBox");
        box.style.display = "block";
        let html = "<table>";
        entry.table.forEach(row => {
            html += "<tr>";
            row.forEach(col => {
                html += `<td>${col}</td>`;
            });
            html += "</tr>";
        });
        html += "</table>";
        box.innerHTML = html;
    }

    // Image
    if (entry.imageName) {
        const imgBox = document.getElementById("imageContainer");
        const img = document.getElementById("wordImage");
        imgBox.style.display = "block";
        img.src = "images/" + entry.imageName;
    }
}