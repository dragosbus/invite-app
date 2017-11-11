const form = document.querySelector('#registrar');
const input = document.querySelector('#invite-name');
const ul = document.querySelector('#invitedList');
const hideCheck = document.querySelector('#hide');

//Create element function
function createElement(element, type, value) {
  var el = document.createElement(element);
  el[type] = value;

  return el;
}

//Append to parent the element
function appendElement(parent, element, type, value) {
  var el = createElement(element, type, value);
  parent.appendChild(el);
}

//Create list handler
function createLi(text) {
  var li = createElement('li');
  appendElement(li, 'span', 'textContent', text);
  appendElement(li, 'input', 'type', 'checkbox');
  appendElement(li, 'button', 'textContent', 'edit');
  appendElement(li, 'button', 'textContent', 'remove');

  return li;
}

//Form event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = input.value;
  var li = createLi(text);
  localStorage.setItem(localStorage.length, text);
  ul.appendChild(li);
  input.value = '';
});

//Add class reponded to the element list which have the checkbox selected
ul.addEventListener('change', function (e) {
  const checkbox = event.target;
  var isCheck = checkbox.checked;
  var listItem = checkbox.parentNode;
  if (isCheck) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

//Buttons inside list element event
ul.addEventListener('click', function (e) {
  /*If target is button declare the variables btn target,
  parent li,ul parent and array with all lists*/
  if (e.target.tagName == 'BUTTON') {
    const btn = e.target;
    const list = btn.parentNode;
    const ul = list.parentNode;
    var lists = ul.getElementsByTagName('li');
    /*If target btn have the text remove,clear localStorage and remove
    li parent from the DOM*/
    if (btn.textContent == 'remove') {
      localStorage.clear();
      ul.removeChild(list);
      /*If target btn has text edit select the span,create an input,
      the the value for the input,append the input to DOM,remove from
      the DOM the span and set the text for btn to save*/
    } else if (btn.textContent == 'edit') {
      const span = list.firstElementChild;
      var input = createElement('input', 'type', 'text');
      input.value = span.textContent;
      list.insertBefore(input, span);
      list.removeChild(span);
      btn.textContent = 'save';
      /*If target btn has text save select the input,create an span,
      the the value for the span,append the span to DOM,remove from
      the DOM the input and set the text for btn to edit*/
    } else if (btn.textContent == 'save') {
      const input = list.firstElementChild;
      const span = createElement('span', 'textContent', input.value);
      list.insertBefore(span, input);
      list.removeChild(input);
      btn.textContent = 'edit';
      /*Iterate thourough lists for getting the index of the 
      curent list for change the value in the localStorage*/
      for (let i = 0; i < lists.length; i++) {
        if (lists[i] === list) {
          localStorage[i] = input.value;
        }
      }

    }
    //Iterate through all lists for sorting the keys in localStorage
    for (let i = 0; i < lists.length; i++) {
      localStorage.setItem(i, lists[i].firstElementChild.textContent);
    }
  }
});

//Hide list wich hadn't been checked
hideCheck.addEventListener('change', function (e) {
  var isChecked = e.target.checked;
  var lis = document.getElementsByTagName('li');
  if (isChecked) {
    for (let i = 0; i < lis.length; i++) {
      if (lis[i].className !== 'responded') {
        lis[i].style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.display = 'block';
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  input.value = '';
  //When the DOM is loaded create the lists with the text from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    var li = createLi(localStorage.getItem(i));
    ul.appendChild(li);
  }
})