//code for TO-DO-LIST
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".plant").forEach(function(plantCheck) {
        plantCheck.addEventListener("click", function() {
            console.log("This is working");

            if(plantCheck.classList.contains("wiltplant")) {
                plantCheck.src = "../Icons/sunflower.png";
                plantCheck.classList.remove("wiltplant");
                plantCheck.classList.add("sunflower");
            } else {
                plantCheck.src = "../Icons/wiltplant.png";
                plantCheck.classList.remove("sunflower");
                plantCheck.classList.add("wiltplant");
            }
        });
    });
});

// To add/check/uncheck items from the list
const inputText = document.getElementById("input-box");
const listItems = document.getElementById("listItems");

function addItems() {
    if (inputText.value === "") {
        alert("Please write something \u{1F97A}")
    } else {
        let li = document.createElement("li")
        li.innerHTML = inputText.value;
        listItems.appendChild(li);
    }
}
