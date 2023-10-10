const API = "https://pokeapi.co/api/v2/pokemon";
let arrUsers = [];
let filterUsers = [];

const $input = document.querySelector(".search__input");
const $table = document.querySelector(".list__table");

function listBuilder(list) {
  let template = "";
  if (!list.length) {
    template = "<tr><td>Pokémon not found</td></tr>";
  } else {
    list.forEach((element, i) => {
      template +=
        "<tr class='list__row'><td class='list__cell list__cell-name'><span>" +
        element.name +
        "</span></td>" +
        "<td class='list__cell'><span>" +
        element.url +
        "</span></td>" +
        "<td><button class='list__button' element-index='" +
        i +
        "'>Delete</button></td></tr>";
    });
  }
  $table.innerHTML = template;
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

if (!getLocalStorage("data") || getLocalStorage("data").length == 0) {
  fetch(API)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      arrUsers = data.results;
      setLocalStorage("data", arrUsers);
      listBuilder(arrUsers);
    });
} else {
  arrUsers = getLocalStorage("data");
  listBuilder(arrUsers);
}

function filterControl(q) {
  filterUsers = arrUsers.filter((e) => {
    return ~e.name.toLowerCase().indexOf(q.toLowerCase());
  });
  listBuilder(filterUsers);
}

$input.addEventListener("input", (e) => {
  let query = e.target.value;
  filterControl(query);
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("list__cell-name")) {
    let target = e.target.innerText;
    $input.value = target;
    filterControl(target);
  }

  if (e.target.classList.contains("list__button")) {
    let i = e.target.getAttribute("element-index");
    arrUsers.splice(i, 1);
    setLocalStorage("data", arrUsers);
    listBuilder(arrUsers);
  }
});
