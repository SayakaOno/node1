let button = document.querySelector('button');
let element = document.getElementById('content');
let term = document.body.querySelector('input[name="term"]');
let defined = document.body.querySelector('input[name="defined"]');

button.onclick = e => {
  e.preventDefault();
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 200) {
        renderDictionary(JSON.parse(req.response));
        term.value = '';
        defined.value = '';
      }
    }
  };
  req.open('POST', '/dictionary-api', true);
  req.setRequestHeader(
    'content-type',
    'application/x-www-form-urlencoded;charset=UTF-8'
  );

  req.send(`term=${term.value}&defined=${defined.value}`);
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
  let html = '';
  data.forEach(def => {
    html += `<dl><dt>${def.term}</dt><dd>${def.defined}</dd></dl>`;
  });
  element.innerHTML = html;
}
