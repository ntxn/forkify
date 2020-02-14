export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // Persist data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    this.likes.splice(this.likes.findIndex(e => e.id === id), 1);

    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex(e => e.id === id) > -1 ? true : false;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // Restoring likes in localStorage to likes
    this.likes = storage ? storage : [];
  }
}