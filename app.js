const shortenBtn = document.getElementById("gasgas");

const inputTxt = document.getElementById("inputLink");
const section = document.querySelector("main section");

var stored = [];
//localStorage.removeItem('fields');
if (localStorage.getItem("fields") != '' && localStorage.getItem("fields") != null) {
  stored = JSON.parse(localStorage.getItem("fields"));
  console.log(stored);
  stored.forEach(links => {
    section.innerHTML += `
      <div class="shortened">
        <div class="link-short">
          <h5>${links.original}</h5>
          <h5>${links.shorter}</h5>
        </div>
        <div class="copy-link">
          <button class="copy">Copy</button>
        </div>
      </div>
    `;
  });

  var copys = document.querySelectorAll(".copy");

  copys.forEach((copy) => {
    copy.addEventListener("click", function () {
      let link = this.parentElement.parentElement.children[0].children[1];
      const text = link.innerText;
      navigator.clipboard.writeText(text);

      this.innerHTML = "Copied!";
      this.classList.add("copied");
      setTimeout(() => {
        this.innerHTML = "Copy";
        this.classList.remove("copied");
      }, 10000);
    });
  });
} else {
  stored = [];
}

const span = document.getElementById("empty");
span.style.display = "none";
// var gas = shorten('www.w3schools.com').then(gas => console.log(gas));

async function shorten(url) {
  const resp = await fetch("https://api.shrtco.de/v2/shorten?url=" + url);
  const respData = await resp.json();
  var link = respData.result;
  //link = toString(link);

  console.log(link);
  //return link.code;
  const newDiv = document.createElement("div");
  newDiv.classList.add("shortened");
  newDiv.innerHTML = `
        <div class="link-short">
          <h5>${url}</h5>
          <h5>${link.full_short_link}</h5>
        </div>
        <div class="copy-link">
          <button class="copy">Copy</button>
        </div>
        `;
  section.append(newDiv);
  inputTxt.value = "";

  let linksxx = { original: url, shorter: link.full_short_link };
  stored.push(linksxx);
  console.log(stored);
  localStorage.setItem("fields", JSON.stringify(stored));
  const ffddff = localStorage.getItem("fields");
  console.log(JSON.parse(ffddff));

  var copys = document.querySelectorAll(".copy");

  copys.forEach((copy) => {
    copy.addEventListener("click", function () {
      let link = this.parentElement.parentElement.children[0].children[1];
      const text = link.innerText;
      navigator.clipboard.writeText(text);

      this.innerHTML = "Copied!";
      this.classList.add("copied");
      setTimeout(() => {
        this.innerHTML = "Copy";
        this.classList.remove("copied");
      }, 10000);
    });
  });
}

shortenBtn.addEventListener("click", () => {
  var input = inputTxt.value;
  if (input == "" || input == null || typeof input != "string") {
    console.log("empty field");
    span.style.display = "block";
    inputTxt.classList.add('focus');
    setTimeout(() => {
      span.style.display = "none";
      inputTxt.classList.remove('focus');
    }, 10000);
  } else {
    shorten(input);
  }
});

// copys.forEach((copy) => {
//   copy.addEventListener("click", function () {
//     let link = this.parentElement.parentElement.children[0].children[1];
//     const text = link.innerText;
//     navigator.clipboard.writeText(text);

//     this.innerHTML = "Copied!";
//     this.classList.add("copied");
//     setTimeout(() => {
//       this.innerHTML = "Copy";
//       this.classList.remove("copied");
//     }, 10000);
//   });
// });
