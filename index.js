let allPurchs = [];
let now = new Date();
now = String(now.getDate()).padStart(2, '0') + '.' + String(now.getMonth() + 1).padStart(2, '0') + '.' + now.getFullYear();
const url = 'http://localhost:8000';
window.onload = async function init () {
  place = document.getElementById('place');
  price = document.getElementById('price');
  place.addEventListener('change', updatePlace);
  price.addEventListener('change', updatePrice);
  
  render();
}

const updatePlace = (event) => {
  valuePlace = event.target.value;
}
const updatePrice = (event) => {
  valuePrice = event.target.value;
}

const clickAddButton = async () => {
  if (place.value && price.value) {
    if (price.value <= 0) {
      alert('Должно быть положительное число');
    } else {
      const resp = await fetch(`${url}/createPurch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          place: valuePlace,
          date: now,
          price: valuePrice
        })
      });
    
      const result = await resp.json();
      allPurchs.push(result);
      place.value = '';
      price.value = '';
      
      render();
    }
  } else {
    alert('Введите значения');
  }
}

const render = async () => {

  const resp = await fetch(`${url}/allPurchs`, {
    method: 'GET'
  });
  const result = await resp.json();
  allPurchs = result;
  const content = document.getElementById('info');

  while(content.firstChild) {
    content.removeChild(content.firstChild);
  }

  let initValue = 0;

  allPurchs.map((item, index) => {
    initValue += Number(allPurchs[index].price)
    const containerMain = document.createElement('div');
    containerMain.className = 'containerMain';
    const container1 = document.createElement('div');
    const container2 = document.createElement('div');
    container1.className = 'purch-container';
    container2.className = 'purch-container2';
    content.appendChild(containerMain);
    const textPlace = document.createElement('p');
    textPlace.className = 'textPlace'
    textPlace.innerText = index + 1 + ') Магазин ' + '"' + item.place + '"';
    const textDate = document.createElement('p');
    textDate.className = 'textDate'
    textDate.innerText = item.date;
    const textPrice = document.createElement('p');
    textPrice.className = 'textPrice'
    textPrice.innerText = item.price + ' p.';
    const rubl = document.createElement('p');
    rubl.innerText = 'р.'
    rubl.className = 'rubl';
    const containerChild = document.createElement('div');
    const containerChild2 = document.createElement('div');
    const containerChild3 = document.createElement('div');
    containerChild.className = 'containerChild3';
    containerChild.className = 'containerChild';
    containerChild2.className = 'containerChild2';
    //containerMain.appendChild(container2);
    //containerMain.appendChild(container1);
    containerChild3.appendChild(textPlace);
    containerChild.appendChild(textDate);
    containerChild.appendChild(textPrice);
    container1.appendChild(containerChild3);
    container2.appendChild(containerChild);
    container2.appendChild(containerChild2);
    containerMain.appendChild(container1);
    containerMain.appendChild(container2);
    textPrice.appendChild(rubl);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'fa-solid fa-pen';
    containerChild2.appendChild(imageEdit);
    const sum = document.getElementById('sum');
    while(sum.firstChild) {
      sum.removeChild(sum.firstChild);
    }
    const total = document.createElement('p');
    total.className = 'total';
    total.innerText = 'Итого:';
    const sumP = document.createElement('p');
    sumP.innerText = initValue;
    sum.appendChild(total);
    sum.appendChild(sumP);
    sum.appendChild(rubl);
    imageEdit.onclick = () => { 
      containerMain.removeChild(container1);
      containerMain.removeChild(container2);
      //container2.removeChild(textPrice);
      //container2.removeChild(imageEdit);
      //container2.removeChild(imageDelete);
      onclickEdit(item.place, item.date, item.price, containerMain, item._id);
    }
    const imageDelete = document.createElement('i');
    imageDelete.className = 'fa-solid fa-trash';
    //container1.appendChild(imageDelete);
    containerChild2.appendChild(imageDelete);
    imageDelete.onclick = () => {
      onclickDelete(item._id);
    }
  });
}

const onclickDelete = async (id) => {
  const resp = await fetch(`${url}/deletePurch?id=${id}`, {
    method: 'DELETE'
  });

  render();
}

const onclickEdit = (place, date, price, container, id) => {
  const newPlace = document.createElement('input');
  const newDate = document.createElement('input');
  const newPrice = document.createElement('input');
  newPlace.className = 'inp';
  newDate.className = 'inp';
  newPrice.className = 'inp';
  newPlace.value = place;
  newDate.value = date;
  newPrice.value = price;
  newPlace.id = `placeId-${id}`;
  newDate.id = `dateId-${id}`;
  newPrice.id = `priceId-${id}`;
  container.appendChild(newPlace);
  container.appendChild(newDate);
  container.appendChild(newPrice);
  const editButton = document.createElement('img');
  editButton.id = 'edit';
  editButton.src = 'img/images.jpeg'
  container.appendChild(editButton);
  editButton.onclick = () => {
    editPurch(id);
  }
};

const editPurch = async (id) => {
  const newPlace = document.getElementById(`placeId-${id}`);
  const newDate = document.getElementById(`dateId-${id}`);
  const newPrice = document.getElementById(`priceId-${id}`);
  const resp = await fetch(`${url}/updatePurch`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      _id: id,
      place: newPlace.value,
      date: newDate.value,
      price: newPrice.value
    })
  })

  render();
}

