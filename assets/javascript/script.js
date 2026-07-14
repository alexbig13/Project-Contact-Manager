"use strict";
//message ele
const message = document.querySelector(".message");
//the edits
const rating = document.getElementById("star-rating");
const descBookMovie = document.querySelector(".description-book-movie");
const submitReviewBtn = document.querySelector(".submit-review-btn");
const reviewTextArea = document.getElementById("review-text-area");
const bookMovieName = document.querySelector(".book-movie-name");
//the add book or movie modal
const createBookMovieBtn = document.querySelector(".create-book-movie-btn");
const closeAddBookMovieBtn = document.querySelector(
  ".close-btn-add-book-movie",
);
const addBookMovieBtn = document.querySelector(".add-book-movie-btn");
const addBookMovieElement = document.querySelector(".add-book-movie-container");
const bookOrMovieSelect = document.getElementById("book-or-movie-select");
const descOfAddBookOrMovie = document.getElementById("book-movie-desc");
const bookOrMovieName = document.getElementById("book-movie-name");
const yearOfTheBookOrMovie = document.getElementById("book-movie-year");
const categoryOfBookOrMovie = document.getElementById(
  "category-select-book-movie",
);
//the info of each book or movie in the add section
const bookMovieModalItem = document.querySelector(".book-movie-container");
const closeBookInfoBtn = document.querySelector(".close-book-info-btn");
const allBooksMovies = document.querySelector(".books-movies");

let currentBookMovieId = null;

const dataOfBooksAndMovies = [
  {
    name: "catacoms".toLowerCase(),
    type: "movie",
    desc: "",
    year: "1995",
    category: "comedie",
    rating: 4,
    reviews: [],
    id: "",
    isRead: false,
  },
  {
    name: "wall of flame".toLowerCase(),
    type: "movie",
    desc: "",
    year: "1984",
    category: "drama",
    rating: 5,
    reviews: [],
    id: "",
    isRead: false,
  },
  {
    name: "resident evil".toLowerCase(),
    type: "movie",
    desc: "",
    year: "1999",
    category: "horror",
    rating: 5,
    reviews: [],
    id: "",
    isRead: false,
  },
  {
    name: "resident evil 2".toLowerCase(),
    type: "movie",
    desc: "",
    year: "2002",
    category: "horror",
    rating: 5,
    reviews: [],
    id: "",
    isRead: false,
  },
  {
    name: "resident evil apocalyps".toLowerCase(),
    type: "book",
    desc: "",
    year: "2011",
    category: "horror",
    rating: 3,
    reviews: [],
    id: "",
    isRead: false,
  },
  {
    name: "gun men".toLowerCase(),
    type: "book",
    desc: "",
    year: "1985",
    category: "action",
    rating: 2,
    reviews: [],
    id: "",
    isRead: false,
  },
  {
    name: "resident evil apocalyps".toLowerCase(),
    type: "movie",
    desc: "",
    year: "2007",
    category: "drama",
    rating: 3,
    reviews: [],
    id: "",
    isRead: false,
  },
];

//the info elements of each book or movie in the info section
const infoName = document.querySelector(".info-name");
const infoType = document.querySelector(".info-type");
const infoYear = document.querySelector(".info-year");
const infoDesc = document.querySelector(".info-desc");
const infoRating = document.querySelector(".info-rating");
const infoReviews = document.querySelector(".info-reviews");
const infoStatus = document.querySelector(".info-status");

//the search and sort elements
const searchContainerOutPut = document.querySelector(".search-container");
const searchInputField = document.getElementById("search");
const sortSelectElement = document.getElementById("categories");
//functions
{
  dataOfBooksAndMovies.forEach((e) => {
    e.id = createId(dataOfBooksAndMovies);
  });
  displayBooksMovies(dataOfBooksAndMovies);
}
//clears the search area
function clearSearch(ele) {
  displaySideInfo();
  ele.replaceChildren();
  showOrHideElements({ show: [], hide: [ele] });
}
//checks accourding to state if the book or movie watched or read
function readOrWatched(type, isRead) {
  if (isRead) {
    return type === "book" ? "✓ Read" : "✓ watched ";
  } else {
    return type === "book" ? "Mark as read" : "mark as watched";
  }
}

//displays messages
function displayMessages(msg, className) {
  message.innerHTML = msg;
  message.classList.add(className);
}
//removes class name
function removeClassName(ele, className) {
  ele.classList.remove(className);
}
//shows or hides elements
function showOrHideElements({ show: [...ele], hide: [...ele2] }) {
  if (ele.length > 0) {
    ele.forEach((e) => {
      e.classList.remove("hidden");
    });
  }
  if (ele2.length > 0) {
    ele2.forEach((e) => {
      e.classList.add("hidden");
    });
  }
}
//displays messages width a timed events
function appearingMessages(msg, className) {
  displayMessages(msg, className);
  showOrHideElements({ show: [message], hide: [] });
  setTimeout(() => {
    removeClassName(message, className);
    showOrHideElements({ show: [], hide: [message] });
  }, 1500);
}
//create ids
function createId(arr) {
  let id = Math.trunc(Math.random() * 9999) + 1;
  if (!arr || arr.length <= 0) return id;
  while (arr.some((e) => e.id === id)) {
    id = Math.trunc(Math.random() * 9999) + 1;
  }
  return id;
}

//displays the side info
function displaySideInfo(ele) {
  infoName.innerHTML = `Name: ${ele?.name || ""}`;
  infoType.innerHTML = `Type: ${ele?.type || ""}`;
  infoYear.innerHTML = `Realese Date: ${ele?.year || ""}`;
  infoDesc.innerHTML = `Description: ${ele?.desc || ""}`;
  infoRating.innerHTML = `Rating: ${ele?.rating !== undefined ? ele.rating + "/5 stars" : ""}`;
  infoReviews.innerHTML = `Reviews: ${ele?.reviews || ""}`;
  infoStatus.innerHTML = `Status: ${ele ? readOrWatched(ele?.type, ele?.isRead) : ""}`;
}
//get the current obj
function currentBookOrMovie(id) {
  if (!id) return;
  return dataOfBooksAndMovies.find((e) => e.id === id);
}
// add book or movie
function createBookOrMovie(type, desc = "", name, year, category) {
  if (!type) {
    appearingMessages("you need to enter a type!", "error");
    return;
  } else if (!name || name.length < 3) {
    appearingMessages(
      "you need to enter a name that is at least 3 chars!",
      "error",
    );
    return;
  } else if (!year) {
    appearingMessages("you need to enter a year!", "error");
    return;
  } else if (!category || category === "") {
    appearingMessages("you need to choose a category!", "error");
    return;
  } else {
    appearingMessages(`${type} by name ${name} was created !`, "correct");
    return dataOfBooksAndMovies.push({
      name: name.toLowerCase(),
      type: type,
      desc: desc,
      year: year,
      category: category,
      rating: 0,
      reviews: [],
      id: createId(dataOfBooksAndMovies),
      isRead: false,
    });
  }
}
//display books movies

function displayBooksMovies(arr) {
  allBooksMovies.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((e) => {
      const div = document.createElement("div");
      div.classList.add("book-movie");
      const textWrapper = document.createElement("div");
      textWrapper.classList.add("text-wrapper");
      const title = document.createElement("h3");
      const editBtn = document.createElement("button");
      editBtn.classList.add("book-movie-edit-btn");
      editBtn.id = `btn-${e.id}`;
      const icon = document.createElement("i");
      icon.innerHTML = `&#9998;`;
      const btnWrapper = document.createElement("div");
      btnWrapper.classList.add("btn-wrapper");
      const markAsRead = document.createElement("button");
      markAsRead.classList.add("marked-as-read");
      markAsRead.innerHTML = `${readOrWatched(e.type, e.isRead)}`;
      const deleteBookMovieBtn = document.createElement("button");
      deleteBookMovieBtn.classList.add("delete-book-movie-btn");
      deleteBookMovieBtn.innerHTML = "Delete";
      title.innerHTML =
        `${e.type}:${e.name}` +
        "<br>" +
        `category:${e.category} ` +
        "<br>" +
        `came out at:${e.year}`;
      if (e.isRead) {
        markAsRead.disabled = true;
      }
      btnWrapper.append(markAsRead, deleteBookMovieBtn);
      editBtn.appendChild(icon);
      textWrapper.append(title, editBtn);
      div.append(textWrapper, btnWrapper);
      allBooksMovies.appendChild(div);
    });
  }
}

//display the info in the book movie element
function displayInfo() {
  const currentEle = currentBookOrMovie(currentBookMovieId);
  if (!currentEle) return;
  bookMovieName.innerHTML = currentEle.name;
  descBookMovie.innerHTML = currentEle.desc;
}
//the modals events listeners
allBooksMovies.addEventListener("click", (e) => {
  const ele = e.target.closest(".book-movie");
  if (!ele) return;
  const realId = Number(
    ele.querySelector(".book-movie-edit-btn").id.split("-")[1],
  );
  currentBookMovieId = realId;
  const currentEle = currentBookOrMovie(currentBookMovieId);
  if (!currentEle) return;

  const markAsReadBtn = e.target.closest(".marked-as-read");
  const deleteBtn = e.target.closest(".delete-book-movie-btn");
  const editBtn = e.target.closest(".book-movie-edit-btn");
  if (markAsReadBtn) {
    currentEle.isRead = true;
    markAsReadBtn.innerHTML = `${readOrWatched(currentEle.type, currentEle.isRead)}`;
    markAsReadBtn.disabled = true;

    displaySideInfo(currentEle);
    appearingMessages(
      `${currentEle.type} was marked as ${currentEle.type === "book" ? "read" : "watched"}! !`,
      "correct",
    );
    return;
  }

  if (deleteBtn) {
    const index = dataOfBooksAndMovies.findIndex(
      (e) => e.id === currentBookMovieId,
    );
    if (index === -1) return;
    appearingMessages(
      `${currentEle.type} by name ${currentEle.name} was deleted`,
      "warning",
    );
    dataOfBooksAndMovies.splice(index, 1);
    ele.remove();
    displaySideInfo();
    currentBookMovieId = null;
    return;
  }

  if (editBtn) {
    displayInfo();
    showOrHideElements({ show: [bookMovieModalItem], hide: [] });
  }
  displaySideInfo(currentEle);
});

//the submit edits
submitReviewBtn.addEventListener("click", () => {
  const currectEle = currentBookOrMovie(currentBookMovieId);
  if (!currectEle) return;
  if (reviewTextArea.value === "" || rating.value === "") {
    appearingMessages("you need to fill the review and rating!", "warning");
  } else {
    currectEle.rating = Number(rating.value);
    currectEle.reviews.push(reviewTextArea.value);
    displaySideInfo(currectEle);
    appearingMessages(
      `a review and rating was added to ${currectEle.type} by name ${currectEle.name} `,
      "correct",
    );
  }
});
// the add book or movie modal
createBookMovieBtn.addEventListener("click", () => {
  createBookOrMovie(
    bookOrMovieSelect.value,
    descOfAddBookOrMovie.value,
    bookOrMovieName.value,
    Number(yearOfTheBookOrMovie.value),
    categoryOfBookOrMovie.value,
  );

  displayBooksMovies(dataOfBooksAndMovies);
});
addBookMovieBtn.addEventListener("click", () => {
  showOrHideElements({ show: [addBookMovieElement], hide: [] });
});
closeAddBookMovieBtn.addEventListener("click", () => {
  showOrHideElements({ show: [], hide: [addBookMovieElement] });
});

//the info book or movie modal
closeBookInfoBtn.addEventListener("click", () => {
  showOrHideElements({ show: [], hide: [bookMovieModalItem] });
});
//exits the modals
window.addEventListener("click", (e) => {
  if (e.target == bookMovieModalItem) {
    showOrHideElements({ show: [], hide: [bookMovieModalItem] });
  }
  if (e.target == addBookMovieElement) {
    showOrHideElements({ show: [], hide: [addBookMovieElement] });
  }
});
//the search
searchInputField.addEventListener("input", (e) => {
  let foundResult = false;
  if (dataOfBooksAndMovies.length <= 0) {
    clearSearch(searchContainerOutPut);
    return;
  }
  searchContainerOutPut.replaceChildren();
  if (searchInputField.value === "") {
    clearSearch(searchContainerOutPut);
    return;
  }
  const lowerdResult = e.target.value.toLowerCase();
  dataOfBooksAndMovies.forEach((ele) => {
    if (!ele.name.includes(lowerdResult)) {
      return;
    }
    foundResult = true;
    const span = document.createElement("span");
    span.classList.add("search-output");
    span.id = ele.id;
    span.innerHTML = ele.name;
    searchContainerOutPut.appendChild(span);
  });
  if (foundResult)
    showOrHideElements({ show: [searchContainerOutPut], hide: [] });
  if (!foundResult) {
    clearSearch(searchContainerOutPut);
  }
});
searchContainerOutPut.addEventListener("click", (e) => {
  if (dataOfBooksAndMovies.length <= 0) return;
  const child = e.target.closest(".search-output");
  if (!child) return;
  const childId = Number(child.id);
  const ele = currentBookOrMovie(childId);
  if (!ele) return;
  displaySideInfo(ele);
});
sortSelectElement.addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  let result = dataOfBooksAndMovies;
  if (dataOfBooksAndMovies.length <= 0) return;
  switch (selectedValue) {
    case "year":
      result = dataOfBooksAndMovies.toSorted((eleOne, eleTwo) => {
        return eleTwo.year - eleOne.year;
      });
      break;
    case "category":
      result = dataOfBooksAndMovies.toSorted((eleOne, eleTwo) => {
        return eleOne.category.localeCompare(eleTwo.category);
      });
      break;
    case "rating":
      result = dataOfBooksAndMovies.toSorted((eleOne, eleTwo) => {
        return eleTwo.rating - eleOne.rating;
      });
      break;
    case "book":
      result = dataOfBooksAndMovies.filter((eleOne) => {
        return eleOne.type === "book";
      });
      break;
    case "movie":
      result = dataOfBooksAndMovies.filter((eleOne) => {
        return eleOne.type === "movie";
      });
      break;

    default:
      break;
  }
  displayBooksMovies(result);
});
