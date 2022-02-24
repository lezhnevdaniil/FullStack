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
    const containerOne = document.createElement('div');
    const containerTwo = document.createElement('div');
    containerOne.className = 'purch-container';
    containerTwo.className = 'purch-containerTwo';
    content.appendChild(containerMain);
    const textPlace = document.createElement('p');
    textPlace.className = 'textPlace'
    textPlace.innerText = index + 1 + ') ' + '"' + item.place + '"';
    const textDate = document.createElement('p');
    textDate.className = 'textDate'
    textDate.innerText = item.date.slice(0, 10).split('-').reverse().join('.');
    const textPrice = document.createElement('p');
    textPrice.className = 'textPrice'
    textPrice.innerText = item.price + ' p.';
    const rubl = document.createElement('p');
    rubl.innerText = 'р.'
    rubl.className = 'rubl';
    const containerChild = document.createElement('div');
    const containerChildTwo = document.createElement('div');
    const containerChildThree = document.createElement('div');
    containerChild.className = 'containerChildThree';
    containerChild.className = 'containerChild';
    containerChildTwo.className = 'containerChildTwo';
    containerChildThree.appendChild(textPlace);
    containerChild.appendChild(textDate);
    containerChild.appendChild(textPrice);
    containerOne.appendChild(containerChildThree);
    containerTwo.appendChild(containerChild);
    containerTwo.appendChild(containerChildTwo);
    containerMain.appendChild(containerOne);
    containerMain.appendChild(containerTwo);
    textPrice.appendChild(rubl);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'fa-solid fa-pen';
    containerChildTwo.appendChild(imageEdit);
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
      containerMain.removeChild(containerOne);
      containerMain.removeChild(containerTwo);
      onclickEdit(item, containerMain);
    }
    const imageDelete = document.createElement('i');
    imageDelete.className = 'fa-solid fa-trash';
    containerChildTwo.appendChild(imageDelete);
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
  const newPlace = document.createElement('input');
  const newDate = document.createElement('input');
  const newPrice = document.createElement('input');
  newPlace.className = 'inp';
  newDate.className = 'inp';
  newDate.type = 'date'
  newPrice.className = 'inp';
  newPlace.value = item.place;
  newDate.value = item.date;
  newPrice.value = item.price;
  newPlace.id = `placeId-${item._id}`;
  newDate.id = `dateId-${item._id}`;
  newPrice.id = `priceId-${item._id}`;
  container.appendChild(newPlace);
  container.appendChild(newDate);
  container.appendChild(newPrice);
  const editButton = document.createElement('img');
  editButton.id = 'edit';
  editButton.src = 'img/images.jpeg'
  container.appendChild(editButton);
  editButton.onclick = () => {
    editPurch(item._id);
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