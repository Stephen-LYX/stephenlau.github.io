const listItems = document.getElementById("listItems");
const inputBox = document.getElementById("input-box");

function addItems() {
    if (inputBox.value === "") {
        alert("Please write something \u{1F97A}");
    } else {
        const li = document.createElement("li")
        li.innerHTML = inputBox.value;
        listItems.appendChild(li);

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-xmark");
        icon.style.cursor = "pointer";
        li.appendChild(icon);
    }

    inputBox.value = ""
};

listItems.addEventListener("click", function(e) {
    if (e.target.closest("li")) {
    const li = e.target.closest("li");
    if (e.target.tagName === "I") {
        li.remove();
    } else {
        li.classList.toggle("completion");
    }
}}, false);



