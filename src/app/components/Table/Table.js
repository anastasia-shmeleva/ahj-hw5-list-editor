/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import engine from '../../lib/engine/engine';
import template from '../Goods/Goods.template';
import itemBtns from '../Goods/itemBtns';

export default class Table {
  constructor(table, addBtn, tooltip) {
    if (typeof table === 'string') {
      table = document.querySelector(table);
    }

    this.table = table;
    this.popup = document.querySelector('.popup');
    this.tooltip = tooltip;

    this.addBtn = addBtn;
    this.saveBtn = this.popup.querySelector('.btn__save');
    this.cancelBtn = this.popup.querySelector('.btn__cancel');

    this.onAdd = this.onAdd.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.addBtn.addEventListener('click', this.onAdd);
    this.saveBtn.addEventListener('click', this.onSave);
    this.cancelBtn.addEventListener('click', this.onCancel);
  }

  render() {
    if (localStorage.length > 1) {
      this.table.style.display = 'table';
      const tbody = document.createElement('tbody');
      this.table.appendChild(tbody);

      Object.entries(localStorage).forEach((item) => {
        if (item[0] === 'loglevel:webpack-dev-server') return;
        const good = engine(template([item[0], item[1]]));
        this.table.querySelector('tbody').appendChild(good);
        const btns = itemBtns();
        this.table.querySelector('tbody').lastElementChild.appendChild(btns);
      });
    }
  }

  onAdd() {
    this.popup.style.display = 'block';
  }

  onSave() {
    const title = this.popup.querySelector('.title__input').value;
    const price = this.popup.querySelector('.price__input').value;

    if (this.popup.querySelector('.title__input').validity.valueMissing) {
      this.tooltip.addTooltip('Введите название');
      return;
    }

    if (this.popup.querySelector('.price__input').validity.valueMissing) {
      this.tooltip.addTooltip('Введите стоимость');
      return;
    }

    if (this.popup.querySelector('.price__input').value < 1) {
      this.tooltip.addTooltip('Стоимость должна быть больше нуля');
      return;
    }

    if (this.table.children.length === 1) {
      this.table.style.display = 'table';
      const tbody = document.createElement('tbody');
      this.table.appendChild(tbody);
    }

    const good = engine(template([title, price]));
    this.table.querySelector('tbody').appendChild(good);

    const btns = itemBtns();
    this.table.querySelector('tbody').lastElementChild.appendChild(btns);

    this.onCancel();

    localStorage.setItem(title, price);
  }

  onCancel() {
    this.popup.style.display = 'none';
    this.popup.querySelector('.title__input').value = '';
    this.popup.querySelector('.price__input').value = '';
  }
}
