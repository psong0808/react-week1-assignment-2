/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function render({
  result, midResult, operator,
}) {
  function handleClickNum(num) {
    if (operator) {
      switch (operator) {
      case '+':
        render({ result: num, midResult: result + num });
        break;
      case '-':
        render({ result: num, midResult: result - num });
        break;
      case '*':
        render({ result: num, midResult: result * num });
        break;
      case '/':
        render({ result: num, midResult: result / num });
        break;
      default:
        render({ result: num });
        break;
      }
      return;
    }
    if (result !== 0) {
      render({ result: result * 10 + num });
      return;
    }
    render({ result: num });
  }

  function handleClickOperator(char) {
    if (typeof midResult === 'number') {
      render({ result: midResult, operator: char });
      return;
    }
    render({ result, operator: char });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNum(i)}>{i}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((char) => (
          <button type="button" onClick={() => handleClickOperator(char)}>{char}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ result: 0 });
