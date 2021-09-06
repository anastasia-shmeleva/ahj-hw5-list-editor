const itemBtns = () => {
  const toUpdate = (e) => {
    const popup = document.querySelector('.popup');
    const nodes = e.target.closest('.table__group').querySelectorAll('.table__item');

    popup.querySelector('.title__input').value = nodes[0].innerText;
    popup.querySelector('.price__input').value = nodes[1].innerText;

    popup.style.display = 'block';
  };

  const toDelete = (e) => {
    e.target.closest('.table__group').remove();
    localStorage.removeItem(Object.keys(localStorage).find((key) => key === e.target.closest('.table__group').firstElementChild.innerText));
  };

  // Update
  const btnUpdate = document.createElement('button');
  btnUpdate.className = 'btn__update';
  btnUpdate.addEventListener('click', toUpdate);

  // Delete
  const btnDelete = document.createElement('button');
  btnDelete.className = 'btn__delete';
  btnDelete.addEventListener('click', toDelete);

  const btnContainer = document.createElement('td');
  btnContainer.className = 'table__item';
  btnContainer.appendChild(btnUpdate);
  btnContainer.appendChild(btnDelete);

  return btnContainer;
};

export default itemBtns;
