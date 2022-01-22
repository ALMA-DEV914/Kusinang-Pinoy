const $addIngredientBtn = document.querySelector('#add-ingredient');
const $recipeForm = document.querySelector('#recipe-form');
const $customIngredientsList = document.querySelector('#custom-ingredients-list');

const handleAddIngredient = event => {
  event.preventDefault();

  const ingredientValue = document.querySelector('#new-ingredient').value;

  if (!ingredientValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'ingredient';
  checkbox.value = ingredientValue;
  checkbox.id = ingredientValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = ingredientValue;
  label.htmlFor = ingredientValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customIngredientsList.appendChild(divWrapper);

  ingredientValue.value = '';
};

const handleRecipeSubmit = event => {
  event.preventDefault();

  const recipeName = $recipeForm.querySelector('#recipe-name').value;
  const createdBy = $recipeForm.querySelector('#created-by').value;
  const size = $recipeForm.querySelector('#recipe-size').value;
  const ingredients = [...$recipeForm.querySelectorAll('[name=ingredient]:checked')].map(ingredient => {
    return ingredient.value;
  });

  if (!recipeName || !createdBy || !ingredients.length) {
    return;
  }

  const formData = { recipeName, createdBy, size, ingredients };
  fetch('/api/recipes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      alert('Recipe created successfully!');
      console.log(postResponse);
    })
    .catch(err => {
      console.log(err);
      saveRecord(formData);
    });
};

$recipeForm.addEventListener('submit', handleRecipeSubmit);
$addIngredientBtn.addEventListener('click', handleAddIngredient);
