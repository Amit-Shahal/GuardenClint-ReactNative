export default function AddClicksToArea(to, id) {
  const url =
    "http://proj.ruppin.ac.il/bgroup18/prod/api/AddClicks/To" + to + "/" + id;

  fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json; charset=UTF-8",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then(
      (result) => {
        // console.log(result);
      },
      (error) => {
        console.log("err post=", error);
      }
    );
}
