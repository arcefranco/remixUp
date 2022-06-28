const db = require('../database/database')
const review = db.review


const postReview = async (req, res) => {

const {title, 
        reviewText, 
        rating, 
        fav,
        year,
        id,
        img_url
    
    } = req.body
if (!title || !year || !rating || !fav ||!reviewText){ 
    res.status(500).send('You must fill all fields')
}else{
const data = {
    title: title,
    year: year,
    rating: rating,
    reviewText: reviewText,
    img_url: img_url,
    fav: fav
}

const newReview = await review.create(data)
newReview.setUser(id)
if(newReview){
    res.status(201).json({
        id: newReview.reviewId,
        title: newReview.title,
        year: newReview.year,
        rating: newReview.rating,
        fav: newReview.fav,
        img: newReview.img_url, 
        review: newReview.review 
      
    })
   

} else {
    return res.status(500).send('Something wrong!')
} 

}






}
module.exports =  {
  postReview
}