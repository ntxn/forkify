export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    this.likes.splice(this.likes.findIndex(e => e.id === id), 1);
  }

  isLiked(id) {
    return this.likes.findIndex(e => e.id === id) > -1 ? true : false;
  }

  getNumLikes() {
    return this.likes.length;
  }
}