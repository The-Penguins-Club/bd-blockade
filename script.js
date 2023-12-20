const vred = document.getElementsByClassName("vredict")[0];
const subTitle = document.getElementById("subtitle");
const caller = document.getElementById("caller");
const reporter = document.getElementById("reporter");
const sourceLink = document.getElementById("sourceLink");

const API_URL =
  "https://api.github.com/repos/The-Penguins-Club/bd-blockade/issues?state=open&labels=approved";

fetch(API_URL)
  .then((resp) => resp.json())
  .then((resp) => {
    if (resp.length <= 0) {
      vred.innerText = "No";
      subTitle.innerText = "No blockade is around; But stay alert";
      caller.innerText = "NoBody";

      [subTitle, caller, reporter, sourceLink.parentElement].forEach(
        (element) => {
          element.style.display = "none";
        }
      );
    } else {
      let fromdate = resp[0].title.split("|")[0].trim().split("-");
      fromdate = new Date(
        `${fromdate[2]}-${fromdate[1]}-${fromdate[0]}`
      ).toDateString();
      let todate = resp[0].title.split("|")[1].trim().split("-");
      todate = new Date(
        `${todate[2]}-${todate[1]}-${todate[0]}`
      ).toDateString();

      vred.innerText = "Yes";
      title = `🗓️ It seems there is a call for hartal from ${fromdate} to ${todate}`;
      if (fromdate == todate) {
        title = `🗓️ It seems there is a call for a hartal on ${fromdate}`;
      }
      console.log(title);
      subTitle.innerText = title;

      let regex = /(https:\/\/[^\s]+)/;
      source = resp[0].body.match(regex)[0];
      console.log(source);
      sourceLink.href = resp[0].body.match(regex)[0];

      const searchString = "Called By: ";
      if (resp[0].body.toLowerCase().includes(searchString.toLowerCase())) {
        let calledByText = resp[0].body
          .split(new RegExp(searchString, "i"))[1]
          ?.split("\n")[0]
          ?.trim();
        caller.innerHTML = `<h3 >📢 Called By: ${calledByText}</h3>`;
      }

      const setReporter = resp[0].user.login;
      reporter.innerHTML = `<h4>🦆 Reported By: ${setReporter}</h4>`;
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
