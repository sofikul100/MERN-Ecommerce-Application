class apiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //========---------- search functionlity api------------=========//
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  //==========--------- product price,category filtering -------------====//

  filter() {

      let queryCopy = {...this.queryStr};
      //--------- remove some fields ---//
      const removeFiels = ['keyword','page',"limit"];
      removeFiels.forEach((key) => delete queryCopy[key]);
      
      let queryStr = JSON.stringify(queryCopy);
      queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

      this.query = this.query.find(JSON.parse(queryStr));
      return this;

  }


  //========= ------- pagination -----------========// 10 

  pagination(resuptPerPage){
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resuptPerPage * (currentPage - 1);
    

    this.query = this.query.limit(resuptPerPage).skip(skip);
    return this;
  }









}

module.exports = apiFeatures;
