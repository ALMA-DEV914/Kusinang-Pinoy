const $recipeList = document.querySelector('#recipe-list');

const getRecipeList = () => {
  fetch('/api/recipes')
    .then(response => response.json())
    .then(recipeListArr => {
      recipeListArr.forEach(printRecipe);
    })
    .catch(err => {
      console.log(err);
    });
};


const printRecipe = ({ _id, recipeName, ingredients, size, commentCount, createdBy, createdAt }) => {
  const recipeCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${recipeName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-light">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-light">Suggested Size: ${size}
          <h5 class="text-light">Ingredients</h5>
          <ul>
            ${ingredients
              .map(ingredient => {
                return `<li>${ingredient}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/recipe?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $recipeList.innerHTML += recipeCard;
};
getRecipeList();
