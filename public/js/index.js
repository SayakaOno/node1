setTimeout(() => {
  let definition = document.getElementById('content');

  async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();
    data.forEach(def => {
      let dt = document.createElement('dt');
      dt.innerHTML = def.term;
      let dd = document.createElement('dd');
      dd.innerHTML = def.defined;
      let dl = document.createElement('dl');
      dl.appendChild(dt);
      dl.appendChild(dd);
      definition.appendChild(dl);
    });
    return data;
  }

  getData('/dictionary-api');
}, 0);
