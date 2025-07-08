const text_input = document.getElementById('text');
const btn_add = document.getElementById('btn_add');
const btn_show_ready = document.getElementById('btn_show_ready');
const btn_show_notready = document.getElementById('btn_show_notready');
const output = document.getElementById('output');
// Получить список всех задач

let id_num;

function getList(){
  fetch('/take_list')
    .then(res => res.json())
    .then(data => {
      output.innerHTML = '';
      data.arr.forEach(t => {
        output.innerHTML += `<p>${t.text}</p>`
      })
      id_num = data.arr.length;
    });
}

btn_add.addEventListener('click', () => {
  const textArea = text_input.value.trim();
  
  fetch('/sendTask', {
    method: 'POST',
    headers: {
      'Content-type':'application/json'
    },
    body: JSON.stringify({
      id: (id_num + 1),
      text: textArea,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    output.innerHTML ='';
    data.arrN.forEach(t => {
      output.innerHTML += `<p>${t.text}</p>`
    });
    getList();
  });
})

document.addEventListener('DOMContentLoaded', () => {
  getList();
})