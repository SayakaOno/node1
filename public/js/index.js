let button = document.querySelector('button');
button.onclick = e => {
  e.preventDefault();
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 200) {
        getData().then(data => {
          renderDictionary(data);
        });
      }
    }
  };
  req.open('POST', '/dictionary-api', true);
  req.setRequestHeader(
    'content-type',
    'application/x-www-form-urlencoded;charset=UTF-8'
  );
  let term = document.body.querySelector('input').value;
  let defined = document.body.querySelectorAll('input')[1].value;
  req.send(`term=${term}&defined=${defined}`);
};

async function getData() {
  let response = await fetch('/dictionary-api');
  let data = await response.json();
  return data;
}

getData().then(data => {
  renderDictionary(data);
});

function renderDictionary(data) {
  let element = document.getElementById('content');
  let fragment = new DocumentFragment();
  data.forEach(def => {
    let dt = document.createElement('dt');
    dt.innerHTML = def.term;
    let dd = document.createElement('dd');
    dd.innerHTML = def.defined;
    let dl = document.createElement('dl');
    dl.append(dt);
    dl.append(dd);
    fragment.append(dl);
  });
  element.textContent = '';
  element.append(fragment);
  document.body.querySelector('input').value = '';
  document.body.querySelectorAll('input')[1].value = '';
}
