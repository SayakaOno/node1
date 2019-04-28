let element = document.getElementById('content');
let button = document.querySelector('button');
let term = document.body.querySelector('input[name="term"]');
let defined = document.body.querySelector('input[name="defined"]');

getData();

button.onclick = postData;

async function getData() {
  let response = await fetch('/dictionary-api');
  let data = await response.json();
  renderDictionary(data);
}
// jQuery //
// $(function() {
// $.ajax({
//   type: 'GET',
//   url: '/dictionary-api',
//   success: function(data) {
//     renderDictionary(data);
//   }
// });
// });

async function postData() {
  let newData = {
    term: term.value,
    defined: defined.value
  };
  let response = await fetch('/dictionary-api', {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: { 'Content-Type': 'application/json' }
  });
  let data = await response.json();
  renderDictionary(data);
  term.value = '';
  defined.value = '';
}
// jQuery //
// let newData = {
//   term: term.value,
//   defined: defined.value
// };
// $.ajax({
//   type: 'POST',
//   url: '/dictionary-api',
//   data: newData,
//   success: function(data) {
//     renderDictionary(data);
//     term.value = '';
//     defined.value = '';
//   }
// });

function renderDictionary(data) {
  let html = '';
  data.forEach(def => {
    html += `<dl><dt>${def.term}</dt><dd>${def.defined}</dd></dl>`;
  });
  element.innerHTML = html;
}
