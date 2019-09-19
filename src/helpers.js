const createElement = ({type, text = null, value = null, _class = null}) => {
  const node = document.createElement(type);
  if (text !== null) {
    const textNode = document.createTextNode(text);
    node.appendChild(textNode);
  }
  if (value !== null) {
    node.setAttribute('value', value);
  }
  if (_class !== null) {
    node.classList.add(_class);
  }
  return node;
};

export default createElement;
