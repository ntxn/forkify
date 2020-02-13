import axios from 'axios';
import { APIUrlBase } from './base';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${APIUrlBase}get?rId=${this.id}`);
      const recipe = res.data.recipe;

      this.title = recipe.title;
      this.author = recipe.publisher;
      this.img = recipe.image_url;
      this.url = recipe.source_url;
      this.ingredients = recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  calcTime() {
    // Assuming that we need 15min for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon','ounces',  'ounce',  'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lb'];
    const units = [...unitsShort, 'kg', 'g']

    const newIngredients = this.ingredients.map(e => {
      // 1. Uniform units
      let ingredient = e.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i])
      });

      // 2. Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // 3. Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(e2 => units.includes(e2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // Ex: 4 1/2 cup: arrCount is [4, 1/2]
        // Ex: 4 cup: arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex); 

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrCount.join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit but 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // There is no unit and no number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        }
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }

  updateServings(type) {
    // Servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // Ingredients
    this.ingredients.forEach(ing => ing.count *= newServings / this.servings);

    this.servings = newServings;
  }
}