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
}