'use strict';

const getTasks = () => {
  console.log('chao')
    const ENDPOINT = 'http://localhost/api/misdatos'
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
      
      data.forEach(element => {
      const id = element._id
      // console.log(element._id)
      const ul = document.querySelector('.list')
      const list_item = document.createElement('li')
      list_item.setAttribute('class','item')
      list_item.setAttribute('id', id)
      const text = document.createTextNode(element.task)
      list_item.appendChild(text)
      ul.appendChild(list_item)


      const button = document.createElement('button');
   
      
      const text_button = document.createTextNode('done')
      button.appendChild(text_button)
      list_item.appendChild(button)

      const button_delete = document.createElement('button')
      button_delete.classList.add('btn_delete');
      const text_button_delete = document.createTextNode('delete')
      button_delete.appendChild(text_button_delete)
      list_item.appendChild(button_delete)
      button_delete.addEventListener('click', deleteOneTask)
      button.addEventListener('click', taskDone)
      });
      
    })

    
}

const addTask = () => {
  const newTask = document.querySelector("#input_id").value
  console.log('newTask', newTask)
  const ENDPOINT = 'http://localhost/api/misdatos';
  fetch(ENDPOINT, 
    {
    method: 'POST',
    body: JSON.stringify({task: newTask}), 
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    console.log(res)
    res.json();
    
  })
  
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response))
  

      const ul = document.querySelector('.list')
      const list_item = document.createElement('li')
      list_item.setAttribute('class','item')
      const text = document.createTextNode(newTask)
      list_item.appendChild(text)
      ul.appendChild(list_item)


      const button = document.createElement('button')
      const text_button = document.createTextNode('done')
      button.appendChild(text_button)
      list_item.appendChild(button)

      const button_delete = document.createElement('button')
      
      const text_button_delete = document.createTextNode('delete')
      button_delete.appendChild(text_button_delete)
      list_item.appendChild(button_delete)
}


const clearInputValue = () => {
  document.querySelector("#input_id").value = ''
}

const taskDone = (e) =>{
 
  const trigger = e.currentTarget;
  console.log('done', trigger)
  const parent = trigger.parentElement;
  
  parent.classList.remove('item')
  parent.classList.add('done')

}

const deleteOneTask = (e) => {
  const trigger = e.currentTarget;
  const parent = trigger.parentElement;
  const id = parent.id
  console.log('PARENT ID DEL QUE PULSO', parent.id)
  deleteOneTaskFromData(id);
  parent.remove();
  
 
}



const deleteOneTaskFromData = (id) =>{
  console.log('id que me llega',id)
  const idToDelete = {
    _id: id,
};
console.log('id que se manda al body', idToDelete)

const options = {
    method: 'DELETE',
    body: JSON.stringify(idToDelete),
    headers: {
        'Content-Type': 'application/json'
    }
}
 
fetch('http://localhost/api/misdatos', options)
    .then(res => {
        console.log(`DELETE result: ${res.ok}`)
    });

}









