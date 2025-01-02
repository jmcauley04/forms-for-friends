/**
 * @type {Form[]}
 */
let _forms = [];

/**
 * 
 * @returns {Promise<Form[]>}
 */
async function getForms(){
  const response = await fetch(SERVER_URL + FORM_ID);
  const data = await response.json();

  _forms = [];

  for (let i = 0; i < data.length; i++) {
    _forms.push(new Form(FORM_ID, data[i].submitter, data[i].data));
  }
  return _forms;
}

async function onPageLoad() {
  console.log("From index.js");
  await showAllForms();
}

async function showAllForms(){
  const forms = await getForms();
  const dataView = document.getElementById('data-view');
  dataView.innerHTML = '';

  const newForm = document.createElement('div');
  newForm.classList.add('back');
  newForm.innerHTML = "<h1>New</h1>";
  newForm.addEventListener('click', () => {
    window.location.href = 'form.html';
  });
  dataView.appendChild(newForm);

  for (let i = 0; i < forms.length; i++) {
    const form = forms[i];
    const formDiv = document.createElement('div');
    formDiv.addEventListener('click', function() {
        showForm(forms[i]);
    });
    formDiv.classList.add('name-tag');
    formDiv.style.animationDelay = `${Math.random()}s`;
    formDiv.innerHTML = `<h2>${form.submitter}</h2>`;
    dataView.appendChild(formDiv);
  }
  window.scrollTo(0,0);
}

/**
 * 
 * @param {Form} form 
 */
function showForm(form){
  const data = form.data;
  const dataView = document.getElementById('data-view');
  dataView.innerHTML = '';

  addBackToFormsButton(dataView);
  let wrapper = addWrapper(dataView);
  addHeader(wrapper, form.submitter);
  addProperty(wrapper, 'readables', [data.readable1, data.readable2, data.readable3].join(', </br>'));
  addProperty(wrapper, 'munchables', data.munchables);
  // set the y scroll to 0
  window.scrollTo(0,0);
}

function addWrapper(dataView){
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  dataView.appendChild(wrapper);
  return wrapper;
}

function addBackToFormsButton(dataView){
  const backDiv = document.createElement('div');
  backDiv.classList.add('back');
  backDiv.innerHTML = '<h1>Back</h1>';
  backDiv.addEventListener('click', showAllForms);
  dataView.appendChild(backDiv);
}

function addHeader(dataView, key){
  const dataDiv = document.createElement('div');
  dataDiv.classList.add('data');
  dataDiv.innerHTML = `<h1>${key}</h1>`;
  dataView.appendChild(dataDiv);
}

function addProperty(dataView, key, value){
  const dataDiv = document.createElement('div');
  dataDiv.classList.add('data');
  dataDiv.innerHTML = `<h2>${key}</h2><p>${value}</p>`;
  dataView.appendChild(dataDiv);
}