export default function engine(block) {
  if ((block === false) || (block === undefined) || (block === null)) {
    return document.createTextNode('');
  }

  if ((block === true) || (typeof block === 'string') || (typeof block === 'number')) {
    return document.createTextNode(block);
  }

  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();

    block.forEach((b) => {
      const element = engine(b);

      fragment.appendChild(element);
    });

    return fragment;
  }

  const element = document.createElement(block.block);

  [].concat(block.cls).filter(Boolean).forEach((cls) => element.classList.add(cls));

  const content = engine(block.content);

  element.appendChild(content);

  return element;
}
