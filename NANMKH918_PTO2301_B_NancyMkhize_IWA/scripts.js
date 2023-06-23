range = [1, 2];

matches = books;
matches_authors = authors;
page = 1;

if (!books || !Array.isArray(books)) throw new Error("Source required");
if (!range || range.length < 2)
  throw new Error("Range must be an array with two numbers");

day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

let fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

function createPreview({ author, id, image, title,summary,published }
   = new_view) {
  const preview = document.createElement("div");
  preview.classList.add("preview");
  preview.setAttribute("data-preview", id);

  preview.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

  return preview;
}

for (let i = 0; i < extracted.length; i++) {
  const { author, image, title, id } = extracted[i];
  const preview = createPreview({
    author,
    id,
    image,
    title,
  });

  fragment.appendChild(preview);
}

document.querySelector("[data-list-items]").appendChild(fragment);


  // Update code to display genres in data search form
  const genreSelect = document.querySelector("[data-search-genres]");

  // Clear existing options
  genreSelect.innerHTML = "";
  
  // Create "All Genres" option
  let allGenresOption = document.createElement("option");
  allGenresOption.value = "any";
  allGenresOption.innerText = "All Genres";
  genreSelect.appendChild(allGenresOption);
  
  // Iterate over genres and create options
  for (const [id, name] of Object.entries(genres)) {
    let genreOption = document.createElement("option");
    genreOption.value = id;
    genreOption.innerText = name;
    genreSelect.appendChild(genreOption);
  }
  
  // Update code to display authors in data search form
  const authorSelect = document.querySelector("[data-search-authors]");
  
  // Clear existing options
  authorSelect.innerHTML = "";
  
  // Create "All Authors" option
  let allAuthorsOption = document.createElement("option");
  allAuthorsOption.value = "any";
  allAuthorsOption.innerText = "All Authors";
  authorSelect.appendChild(allAuthorsOption);
  
  // Iterate over authors and create options
  for (const [id, name] of Object.entries(authors)) {
    let authorOption = document.createElement("option");
    authorOption.value = id;
    authorOption.innerText = name;
    authorSelect.appendChild(authorOption);
  
  }
const css =
  document.querySelector("[data-header-settings]").value ===
  (window.matchMedia("( data-settings-theme: dark)").matches ? "night" : "day");
document.documentElement.style.setProperty("--color-dark", css.dark);
document.documentElement.style.setProperty("--color-light", css.light);

document.querySelector("[data-list-button]").textContent = `Show more (${
  matches.length - page * BOOKS_PER_PAGE > 0
    ? matches.length - page * BOOKS_PER_PAGE
    : 0
})`;

document.querySelector("[data-list-button]").disabled = !(
  matches.length - page * BOOKS_PER_PAGE >
  0
);

document.querySelector(
  "[data-list-button]"
).innerHTML = `<span>Show more</span><span class="list__remaining"> (${
  matches.length - page * BOOKS_PER_PAGE > 0
    ? matches.length - page * BOOKS_PER_PAGE
    : 0
})</span>`;

// event listener for to close the search overlay

document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  const searchOverlay = document.querySelector("[data-search-overlay]");
  if (searchOverlay.open === true) {
    searchOverlay.open = false;
  }
});



// event listener for to open the search overlay
document.querySelector("[data-header-search]").addEventListener("click", () => {
  const searchOverlay = document.querySelector("[data-search-overlay]");
  if (!searchOverlay.open) {
    searchOverlay.open = true;
    document.querySelector("[data-search-title]").focus();
  }
});





//open settings overlay
document.querySelector("[data-header-settings]").addEventListener("click", (event) => {
  const settingsOverlay = document.querySelector("[data-settings-overlay]");
  if (!settingsOverlay.getAttribute("open")) {
    settingsOverlay.setAttribute("open", "true");
  }
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = Object.fromEntries(formData);
  
  if (result.theme === "dark") {
    document.documentElement.setAttribute("data-settings-theme", "dark");

  } else {
    document.documentElement.setAttribute("data-settings-theme", "light");

  }
});

  
//close theme overlay 
document.querySelector("[data-settings-cancel]").addEventListener("click", () => {
  const settingsOverlay = document.querySelector("[data-settings-overlay]");
  if (settingsOverlay.open === true) {
    settingsOverlay.open = false;
  }
});



  //document.querySelector("[data-settings-overlay]").open = false;
  document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    actions.settings.submit();
  });
//edit
// event listener for to close the data-list overlay

document.querySelector("[data-list-close]").addEventListener("click", () => {
  const searchOverlay = document.querySelector("[data-list-active]");
  if (searchOverlay.open === true) {
    searchOverlay.open = false;
  }
});



function createPreviewsFragment(matches, offset, limit) {
  const new_view = matches.slice(offset, limit);
  const new_previews = [];

  for (let i = 0; i < new_view.length; i++) {
    const { author, image, title, id } = new_view[i];

    const preview = document.createElement("div");
    preview.classList.add("preview");
    preview.setAttribute("data-preview", id);

    preview.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${matches_authors[author]}</div>
      </div>
    `;

    new_previews.push(preview);
  }

  return new_previews;
}

document.querySelector("[data-list-button]").addEventListener("click", () => {
  const previewsFragment = createPreviewsFragment(
    matches,
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  );

  const listItemsElement = document.querySelector("[data-list-items]");

  previewsFragment.forEach((preview) => {
    listItemsElement.appendChild(preview);
  });

  actions.list.updateRemaining();
  page = page + 1;
});


document.querySelector("[data-header-search]").addEventListener("click", () => {
  if (document.querySelector("[data-search-overlay]").open === true) {
    document.querySelector("[data-search-title]").focus();
  }
});

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of booksList) {
      const titleMatch =
        filters.title.trim() === "" &&
        book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch =
        filters.author === "any" || book.author === filters.author;
      let genreMatch = false;

      if (filters.genre === "any") {
        for (const genre of book.genres) {
          if (genre === filters.genre) {
            genreMatch = true;
            break;
          }
        }
      } else {
        genreMatch = true;
      }

      if (titleMatch && authorMatch && genreMatch) {
        result.push(book);
      }
    }

    if (result.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
    }

    document.querySelector("[data-list-items]").innerHTML = "";

    const fragment = document.createDocumentFragment();
    const extracted = result.slice(range[0], range[1]);

    for (const { author, image, title, id } of extracted) {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

      fragment.appendChild(element);
    }

    document.querySelector("[data-list-items]").appendChild(fragment);

    const initial = matches.length - page * BOOKS_PER_PAGE;
    const remaining = hasRemaining ? initial : 0;

    document.querySelector("[data-list-button]").disabled = initial > 0;

    document.querySelector(
      "[data-list-button]"
    ).innerHTML = `<span>Show more</span><span class="list__remaining"> (${remaining})</span>`;

    window.scrollTo({ top: 0, behavior: "smooth" });

    document.querySelector("[data-search-overlay]").open = false;
  });

document
  .querySelector("[data-search-overlay]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty(
      "--color-dark",
      css[result.theme].dark
    );
    document.documentElement.style.setProperty(
      "--color-light",
      css[result.theme].light
    );
    document.querySelector("[data-search-overlay]").open = false;
  });


  // Search for books based on text phrases
function searchBooks(searchTerm) {
  const filteredBooks = books.filter((book) => {
    const bookTitle = book.title.toLowerCase();
    const bookAuthor = authors[book.author].toLowerCase();
    return bookTitle.includes(searchTerm) || bookAuthor.includes(searchTerm);
  });

  displayPreviews(filteredBooks);
}

  document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;
      const previewId = node?.dataset?.preview;

      for (const singleBook of books) {
        if (singleBook.id === previewId) {
          active = singleBook;
          break;
        }
      }

    }
if (!active) return;

    document.querySelector("[data-list-active]").open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    // added he data list image
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").textContent = active.title;
    document.querySelector("[data-list-subtitle]").textContent = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;
    document.querySelector("[data-list-description]").textContent =
      active.description;
  });



   