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
        if(!t.completed){
           output.innerHTML += 
            `<p>
              <input type='checkbox' data-id='${t.id}' ${t.completed ? 'checked' : ''}>
              <span>${t.text}</span>
            </p>`
        }
      })
      id_num = data.arr.length;
      // Обробка подый на зміні checkbox
      checkBoxer();
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
  .then(() => {
    text_input.value = '';
    getList();
  });
})

btn_show_ready.addEventListener('click', () => {
  fetch('/take_list')
    .then(res => res.json())
    .then(data => {
      output.innerHTML = '';
      data.arr.forEach(t => {
        if(t.completed){
           output.innerHTML += 
            `<p>
              <input type='checkbox' data-id='${t.id}' ${t.completed ? 'checked' : ''}>
              <span>${t.text}</span>
            </p>`
        }
      })
      checkBoxer();
    })
})

function checkBoxer(){
  document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const id = Number(checkbox.dataset.id);
          const completed = checkbox.checked;

          fetch('/update', {
            method: 'PUT',
            headers: {
              'Content-type':'application/json'
            },
            body: JSON.stringify({id, completed})
          })
          .then(() => getList())
        })
      })
}
btn_show_notready.addEventListener('click', () => {
  getList();
})



document.addEventListener('DOMContentLoaded', () => {
  getList();
})