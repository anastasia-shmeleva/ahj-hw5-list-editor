import Table from './components/Table/Table';
import Tooltip from './components/Tooltip/Tooltip';

const table = new Table('.table', document.querySelector('.btn__add'), new Tooltip());
table.render();

window.table = table;
