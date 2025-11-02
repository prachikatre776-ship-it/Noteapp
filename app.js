const addBtn = document.getElementById("add-btn");
const noteInput = document.getElementById("note-input");
const notesContainer = document.getElementById("notes-container");
const searchInput = document.getElementById("search-input");
const themeBtn = document.getElementById("theme-btn");

// Load notes
let notes = JSON.parse(localStorage.getItem("notes")) || [];
displayNotes();

// Add note
addBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (noteText === "") {
    alert("Please write something!");
    return;
  }

  notes.push(noteText);
  saveNotes();
  noteInput.value = "";
  displayNotes();
});

// Display notes
function displayNotes(filter = "") {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    if (note.toLowerCase().includes(filter.toLowerCase())) {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
      noteDiv.innerHTML = `
        <p>${note}</p>
        <div class="btns">
          <button class="edit-btn" onclick="editNote(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        </div>
      `;
      notesContainer.appendChild(noteDiv);
    }
  });
}

// Edit note
function editNote(index) {
  const newNote = prompt("Edit your note:", notes[index]);
  if (newNote !== null && newNote.trim() !== "") {
    notes[index] = newNote.trim();
    saveNotes();
    displayNotes();
  }
}

// Delete note
function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
  }
}

// Save to local storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Search notes
searchInput.addEventListener("input", () => {
  const filter = searchInput.value;
  displayNotes(filter);
});

// Dark/Light Mode toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
