setTimeout(() => {
  let definition = document.getElementById('content');

  function getData(url) {
    return fetch(url).then(response => response.json());
  }

  getData('/dictionary-api').then(data => {
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
  });
}, 0);
