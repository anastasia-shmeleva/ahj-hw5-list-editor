const goodsTemplate = (goods) => ({
  block: 'tr',
  cls: 'table__group',
  content: goods.map((title) => ({
    block: 'td',
    cls: 'table__item',
    content: title,
  })),
});

export default goodsTemplate;
