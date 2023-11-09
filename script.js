const API_URL =
  "https://api.github.com/repos/The-Penguins-Club/bd-blockade/issues?state=open&labels=approved";

fetch(API_URL)
  .then((resp) => resp.json())
  .then((resp) => {
    if (resp.length <= 0) {
      let header = document.createElement("h1");
      header.classList.add("is-size-2");
      header.innerText = "No Hartal Bro.";
      let nohartal = document.querySelector(".nohartal");
      nohartal.appendChild(header);
      console.log("No Hartal Bro.");
    } else {
      let fromdate = resp[0].title.split("|")[0].trim().split("-");
      fromdate = new Date(
        `${fromdate[2]}-${fromdate[1]}-${fromdate[0]}`
      ).toDateString();
      let todate = resp[0].title.split("|")[1].trim().split("-");
      todate = new Date(
        `${todate[2]}-${todate[1]}-${todate[0]}`
      ).toDateString();

      title = `Hartal From ${fromdate} to ${todate}`;
      console.log(title);
      let header = document.createElement("h1");
      header.classList.add("is-size-2");
      header.innerText = title;
      let hartal = document.querySelector(".hartal");

      let regex = /(https:\/\/[^\s]+)/;
      source = resp[0].body.match(regex)[0];
      console.log(source);

      hartal.appendChild(header);
      let passage = document.createElement("p");
      passage.classList.add("is-size-6");

      passage.innerHTML = resp[0].body.replace(source, "");
      hartal.appendChild(passage);

      let sourcehtml = document.createElement("a");
      sourcehtml.setAttribute("href", source);
      sourcehtml.innerText = "Source";
      hartal.appendChild(sourcehtml);
    }

    // console.log(resp);
  });
