let allPurchs = [];
let DateNow = new Date();

const url = 'http://localhost:8000';
window.onload = async () => {
  const place = document.getElementById('place');
  const price = document.getElementById('price');
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
          date: DateNow,
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
    const containerLeft = document.createElement('div');
    const containerRight = document.createElement('div');
    containerLeft.className = 'purch-container';
    containerRight.className = 'purch-containerRight';
    content.appendChild(containerMain);
    const textPlace = document.createElement('p');
    textPlace.className = 'textPlace'
    textPlace.innerText = index + 1 + ') ' + '"' + item.place + '"';
    const textDate = document.createElement('p');
    textDate.className = 'textDate';
    textDate.innerText = item.date.slice(0, 10).split('-').reverse().join('.');
    const textPrice = document.createElement('p');
    textPrice.className = 'textPrice'
    textPrice.innerText = item.price + ' p.';
    const rubl = document.createElement('p');
    rubl.innerText = 'р.'
    rubl.className = 'rubl';
    const containerDatePrice = document.createElement('div');
    const containerChildButtons = document.createElement('div');
    const containerChildPlace = document.createElement('div');
    containerDatePrice.className = 'containerDatePrice';
    containerChildButtons.className = 'containerChildButtons';
    containerChildPlace.appendChild(textPlace);
    containerDatePrice.appendChild(textDate);
    containerDatePrice.appendChild(textPrice);
    containerLeft.appendChild(containerChildPlace);
    containerRight.appendChild(containerDatePrice);
    containerRight.appendChild(containerChildButtons);
    containerMain.appendChild(containerLeft);
    containerMain.appendChild(containerRight);
    textPrice.appendChild(rubl);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'fa-solid fa-pen';
    containerChildButtons.appendChild(imageEdit);
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
      containerMain.removeChild(containerLeft);
      containerMain.removeChild(containerRight);
      onclickEdit(item, containerMain);
    }
    const imageDelete = document.createElement('i');
    imageDelete.className = 'fa-solid fa-trash';
    containerChildButtons.appendChild(imageDelete);
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

const onclickEdit = (item, container) => {
  const {place, date, price, _id} = item;
  const newPlace = document.createElement('input');
  const newDate = document.createElement('input');
  const newPrice = document.createElement('input');
  newPlace.className = 'inp';
  newDate.className = 'inp';
  newDate.type = 'date';
  newPrice.className = 'inp';
  newPlace.value = place;
  newDate.value = date.slice(0, 10).split('-').reverse().join('.');
  newPrice.value = price;
  newPlace.id = `placeId-${_id}`;
  newDate.id = `dateId-${_id}`;
  newPrice.id = `priceId-${_id}`;
  container.appendChild(newPlace);
  container.appendChild(newDate);
  container.appendChild(newPrice);
  const editButton = document.createElement('img');
  editButton.id = 'edit';
  editButton.src = 'img/images.jpeg'
  container.appendChild(editButton);
  editButton.onclick = () => {
    editPurch(_id);
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