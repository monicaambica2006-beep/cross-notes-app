let notes =
    JSON.parse(localStorage.getItem("notes"))
    || [];

displayNotes();
function login() {

    let username =
        document.getElementById("username")
        .value.trim();

    let password =
        document.getElementById("password")
        .value.trim();

    if (
        username === "" ||
        password === ""
    ) {

        alert("Please enter username and password");

        return;
    }

    /* SAVE USER */

    localStorage.setItem(
        "username",
        username
    );

    localStorage.setItem(
        "password",
        password
    );

    /* HIDE LOGIN */

    document.getElementById(
        "authContainer"
    ).style.display = "none";

    /* SHOW APP */

    document.querySelector(
        ".container"
    ).style.display = "block";

    showToast(
        "Welcome " + username
    );
}

/* DARK MODE */

let themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});

/* CHARACTER COUNTER */

let noteInput =
    document.getElementById("noteInput");

noteInput.addEventListener("input", () => {

    document.getElementById("charCount")
    .innerText =
        noteInput.value.length +
        " Characters";

});

/* ADD NOTE */

function addNote() {

    let noteText =
        noteInput.value.trim();

    let category =
        document.getElementById("category")
        .value;

    let color =
        document.getElementById("noteColor")
        .value;

    let currentDate =
        new Date().toLocaleString();

    if (noteText === "") {

        alert("Please enter a note");

        return;
    }

    notes.push({

        text: noteText,
        category: category,
        color: color,
        date: currentDate

    });

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    noteInput.value = "";

    displayNotes();

    showToast("Note Added");
}

/* DISPLAY NOTES */

function displayNotes() {

    let notesList =
        document.getElementById("notesList");

    notesList.innerHTML = "";

    notes.forEach((note, index) => {

        let li =
            document.createElement("li");

        li.style.background =
            note.color;

        li.innerHTML = `

            <div class="note-content">

                <strong>
                    [${note.category}]
                </strong>

                <p>${note.text}</p>

                <small>${note.date}</small>

            </div>

            <div class="note-buttons">

                <button
                    class="pin-btn"
                    onclick="pinNote(${index})">
                    📌
                </button>

                <button
                    class="edit-btn"
                    onclick="editNote(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteNote(${index})">
                    Delete
                </button>

            </div>
        `;

        notesList.appendChild(li);
    });
}

/* DELETE NOTE */

function deleteNote(index) {

    notes.splice(index, 1);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();

    showToast("Note Deleted");
}

/* EDIT NOTE */

function editNote(index) {

    let updatedNote =
        prompt(
            "Edit your note",
            notes[index].text
        );

    if (updatedNote !== null) {

        notes[index].text =
            updatedNote;

        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );

        displayNotes();

        showToast("Note Updated");
    }
}

/* PIN NOTE */

function pinNote(index) {

    let pinnedNote =
        notes.splice(index, 1)[0];

    notes.unshift(pinnedNote);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();

    showToast("Note Pinned");
}

/* SEARCH NOTES */

function searchNotes() {

    let searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let noteItems =
        document.querySelectorAll("li");

    noteItems.forEach((item) => {

        let text =
            item.innerText.toLowerCase();

        if (text.includes(searchText)) {

            item.style.display = "flex";

        }
        else {

            item.style.display = "none";
        }
    });
}

/* EXPORT NOTES */

function exportNotes() {

    let data =
        JSON.stringify(notes, null, 2);

    let blob =
        new Blob([data], {
            type: "text/plain"
        });

    let a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download = "notes.txt";

    a.click();

    showToast("Notes Exported");
}

/* TOAST */

function showToast(message) {

    let toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 2000);
}