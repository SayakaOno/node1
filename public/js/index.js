let element = document.getElementById('content');
let term = document.body.querySelector('input[name="term"]');
let defined = document.body.querySelector('input[name="defined"]');

$(function() {
  $.ajax({
    type: 'GET',
    url: '/dictionary-api',
    success: function(data) {
      renderDictionary(data);
    }
  });
});

$('button').on('click', function() {
  var newData = {
    term: term.value,
    defined: defined.value
  };

  $.ajax({
    type: 'POST',
    url: '/dictionary-api',
    data: newData,
    success: function(data) {
      renderDictionary(data);
      term.value = '';
      defined.value = '';
    }
  });
});

function renderDictionary(data) {
  let html = '';
  data.forEach(def => {
    html += `<dl><dt>${def.term}</dt><dd>${def.defined}</dd></dl>`;
  });
  element.innerHTML = html;
}
