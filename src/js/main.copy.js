import "./bootstrap";
import Animal from "./includes/animal";

const tableContainer = document.getElementById("table-container");
let currentCategory = null;
let editIndex = null;
let isEditMode = false;
let tableHtml = "";

tableContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const key = event.target.getAttribute("data-key");
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    const animals = Animal.animalMap.get(key);
    animals.splice(index, 1);
    Animal.animalMap.set(key, animals);
    updateTable();
  }
  if (event.target.classList.contains("dropdown-item")) {
    let table = event.target.getAttribute("data-table");
    let sortBy = event.target.getAttribute("data-sortby");
    if (["name", "location"].includes(sortBy)) {
      Animal.animalMap
        .get(table)
        .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    } else if (sortBy === "size") {
      Animal.animalMap
        .get(table)
        .sort((a, b) => Number.parseInt(a.size) - Number.parseInt(b.size));
    }
    updateTable();
  }
  if (event.target.matches('[data-bs-toggle="modal"]')) {
    isEditMode = false; // Set to "add mode"
    currentCategory = event.target.getAttribute("data-key");
    editIndex = null; // Reset edit index
    document.getElementById("animalForm").reset();
    document.getElementById("animalModalLabel").textContent = "Add Animal"; // Modal title
  }
  if (event.target && event.target.id === "saveAddAnimal") {
    event.preventDefault();

    const name = document.getElementById("name").value;
    let size = Number.parseInt(document.getElementById("size").value);
    const location = document.getElementById("location").value;
    let img = document.getElementById("img").value;

    if (!img) {
      if (currentCategory === "Big Cats") {
        img =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaAaDpIMalBUlDe4i05hUq0ZezyP9LfBhanA&s";
      } else if (currentCategory === "Big Fishes") {
        img =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDVLIIKI6I9TAgLgZfqbWTTnTULhBJsXJPcg&s";
      } else if (currentCategory === "Dogs") {
        img =
          "https://thumbs.dreamstime.com/b/cute-happy-dog-cartoon-running-vector-illustration-cute-happy-dog-cartoon-running-vector-illustration-cute-happy-dog-cartoon-319862825.jpg";
      }
    }

    if (name && location) {
      const animal = {
        species: currentCategory,
        name,
        size,
        location,
        img,
      };

      if (isEditMode) {
        try {
          if (isNaN(size)) {
            throw new Error("Please enter the size in numbers only");
          }
          animal.size = animal.size + "ft";
          const animals = Animal.animalMap.get(currentCategory);
          animals[editIndex] = animal; // Update the existing animal
          Animal.animalMap.set(currentCategory, animals);
        } catch (error) {
          alert(error.message);
          return;
        }
      } else {
        // Add new animal
        try {
          const animals = Animal.animalMap.get(currentCategory);
          if (isNaN(size)) {
            throw new Error("Please enter the size in numbers only");
          }
          animal.size = animal.size + "ft";
          animals.forEach((animal) => {
            if (animal.name === name) {
              throw new Error("Animal Already Exists");
            }
          });
          new Animal(currentCategory, animal);
        } catch (error) {
          alert(error.message);
          return;
        }
      }

      document.querySelector('[data-bs-dismiss="modal"]').click();
      updateTable();
    } else {
      alert("Please fill in all fields.");
    }
  }

  if (event.target.classList.contains("edit-btn")) {
    isEditMode = true; // Set to "edit mode"
    currentCategory = event.target.getAttribute("data-key");
    editIndex = parseInt(event.target.getAttribute("data-index"), 10);

    const animals = Animal.animalMap.get(currentCategory);
    const animal = animals[editIndex];

    document.getElementById("name").value = animal.name;
    document.getElementById("size").value = animal.size;
    document.getElementById("location").value = animal.location;
    document.getElementById("img").value = animal.img;
    document.getElementById("animalModalLabel").textContent = "Edit Animal";
  }
});
const sortTable = new Map([
  ["Big Cats", ["name", "size", "location"]],
  ["Dogs", ["name", "location"]],
  ["Big Fishes", ["size"]],
]);

const bigCats = [
  {
    species: "Big Cats",
    name: "Tiger",
    size: "10ft",
    location: "Asia",
    img: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    species: "Big Cats",
    name: "Lion",
    size: "8ft",
    location: "Africa",
    img: "https://www.chronicle.co.zw/wp-content/uploads/sites/3/2018/10/Cecil-the-Lion-680x380.jpg",
  },
  {
    species: "Big Cats",
    name: "Leopard",
    size: "5ft",
    location: "Africa and Asia",
    img: "https://cdn.britannica.com/30/136130-050-3370E37A/Leopard.jpg?w=300",
  },
  {
    species: "Big Cats",
    name: "Jaguar",
    size: "5ft",
    location: "Amazon",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeQMZQSMfJKDjqTvbTIoSWfzzPP4pxNALc3g&s",
  },
];

const dogs = [
  {
    species: "Dogs",
    name: "Rotwailer",
    size: "2ft",
    location: "Germany",
    img: "https://dogtime.com/wp-content/uploads/sites/12/2023/11/GettyImages-1198147566.jpg?resize=1200,630",
  },
  {
    species: "Dogs",
    name: "German Shepherd",
    size: "2ft",
    location: "Germany",
    img: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
  },
  {
    species: "Dogs",
    name: "Labrodar",
    size: "2ft",
    location: "UK",
    img: "https://hips.hearstapps.com/hmg-prod/images/labrador-puppy-royalty-free-image-1626252338.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=1200:*",
  },
  {
    species: "Dogs",
    name: "Alabai",
    size: "4ft",
    location: "Turkey",
    img: "https://www.lovemydogz.com/wp-content/smush-webp/2023/05/gettyimages-473593410-1-360x540.jpg.webp",
  },
];

const bigFishes = [
  {
    species: "Big Fishes",
    name: "Humpback Whale",
    size: "15ft",
    location: "Atlantic Ocean",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFp2oDIfDAPvH21uUATV9l8g_5oVuzbR36Bw&s",
  },
  {
    species: "Big Fishes",
    name: "Killer Whale",
    size: "12ft",
    location: "Atlantic Ocean",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbCxavNpeEsIXLR2Gz12M42MlPYSijfHapbQ&s",
  },
  {
    species: "Big Fishes",
    name: "Tiger Shark",
    size: "8ft",
    location: "Ocean",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNe74khHi7QuneF-BI6S_EGv4KXufGwqmCjQ&s",
  },
  {
    species: "Big Fishes",
    name: "Hammerhead Shark",
    size: "8ft",
    location: "Ocean",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDdiU4IgSEsqh8vPyAEZ56KzrjJ2nD0aAdA&s",
  },
];

const init = () => {
  bigCats.forEach((value) => {
    new Animal(value.species, value);
  });
  dogs.forEach((value) => {
    new Animal(value.species, value);
  });
  bigFishes.forEach((value) => {
    new Animal(value.species, value);
  });
  updateTable();
};

//  Tried to write the code for the update which will only update the elements which are differing from the old DOM, works but the images in sorting does'nt work
const updateTable = () => {
  const oldDOM = document.createRange().createContextualFragment(tableHtml);
  const oldElements = Array.from(oldDOM.querySelectorAll("*"));
  tableHtml = `<div class="modal fade" id="animalModal" tabindex="-1" aria-labelledby="animalModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="animalModalLabel">Add Animal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Form for adding/editing animal -->
        <form id="animalForm">
          <div class="mb-3">
            <label for="name" class="form-label">Animal Name*</label>
            <input type="text" class="form-control" id="name" required>
          </div>
          <div class="mb-3">
            <label for="size" class="form-label">Size* (add ft after the number)</label>
            <input type="text" class="form-control" id="size" required>
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Location*</label>
            <input type="text" class="form-control" id="location" required>
          </div>
          <div class="mb-3">
            <label for="img" class="form-label">Image URL</label>
            <input type="url" class="form-control" id="img">
          </div>
          <button type="button" class="btn btn-primary" id="saveAddAnimal">Save Animal</button>
        </form>
      </div>
    </div>
  </div>
</div>`;
  for (let key of Animal.animalMap.keys()) {
    if (Animal.animalMap.get(key).length) {
      const animals = Animal.animalMap.get(key);
      tableHtml += `
    <table class="table my-5" style="table-layout: fixed; width: 100%;">
    <colgroup>
    <col style="width: 25%;">
    <col style="width: 25%;">
    <col style="width: 25%;">
    <col style="width: 25%;">
  </colgroup>
          <thead>
            <tr>
              <th scope="col">
              <div class="d-flex align-items-center"><h4>${key}</h4> 
              <div class="dropdown px-4" data-key="${key}">
                  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort
                  </a>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  ${sortTable
                    .get(key)
                    .map((item) => {
                      return `<li><a class="dropdown-item" data-table="${key}" data-sortby="${item}" style="cursor: pointer;">${item}</a></li>`;
                    })
                    .join("")}
                  </ul>
              </div> 
              <!-- Button trigger modal -->
                <button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#animalModal" data-key="${key}">
                  Add animal
                </button>
              </div>
              </th>
            </tr>
          </thead>
          <tbody> `;
      for (let i = 0; i < animals.length; i += 4) {
        tableHtml += `
              <tr> `;
        for (let j = i; j < i + 4 && j < animals.length; j++) {
          const animal = animals[j];

          tableHtml += `
                <td class="text-center" colspan="1">
                <div class="card" style="width:18rem;">
            <img src="${
              animal.img
            }" class="card-img-top card-img-hover w-100" style="height: 200px; object-fit: cover;" alt="card-image" />
            <div class="card-body">
              <h5 class="card-title ${
                key === "Big Fishes"
                  ? "text-primary fst-italic"
                  : key === "Big Cats"
                  ? "fw-light"
                  : ""
              }">${animal.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted ">${animal.size}</h6>
              <h6 class="card-subtitle mb-2 text-muted ">${animal.location}</h6>
              <div class="d-flex justify-content-between align-items-center mt-4">
              <button type="button" class="btn btn-primary edit-btn px-4" data-key="${
                animal.species
              }" data-index="${j}" data-bs-toggle="modal" data-bs-target="#animalModal">Edit</button>
              <button type="button" class="btn btn-danger delete-btn px-3" data-key="${
                animal.species
              }" data-index="${j}">Delete</button>
              </div>
            </div>
          </div>
                </td>
                `;
        }
        tableHtml += "</tr>";
      }
      tableHtml += `</tbody>
                        </table>`;
    }
  }
  const newDOM = document.createRange().createContextualFragment(tableHtml);
  // Recursive function to diff and update
  function updateDOM(oldDOM, newParent) {
    const oldChildren = Array.from(oldDOM.childNodes);
    const newChildren = Array.from(newParent.childNodes);

    newChildren.forEach((newChild, index) => {
      const oldChild = oldChildren[index];

      if (!oldChild) {
        // If the old child doesn't exist, append the new child
        oldDOM.appendChild(newChild);
      } else if (!newChild.isEqualNode(oldChild)) {
        if (newChild.nodeType === Node.ELEMENT_NODE) {
          // If the child is an element, recurse
          updateDOM(oldChild, newChild);
        } else {
          // Replace old text or mismatched node
          oldDOM.replaceChild(newChild, oldChild);
        }
      }
    });

    // Remove extra old children
    oldChildren
      .slice(newChildren.length)
      .forEach((child) => oldDOM.removeChild(child));
  }

  // Perform the DOM diff and update
  updateDOM(oldDOM, newDOM);
};
init();
