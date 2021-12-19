import Product from '../models/productModel.js'

export const createProduct = async (req,res,next) => {
  try {
    const {title, imageURL, description, price, quantity, selection, category} = req.body
    const newProduct = await new Product({
      title: title, 
      image: imageURL, 
      description: description,
      price: price,
      quantity: quantity, 
      selection: selection, 
      category: category
    })
    await newProduct.save()
    res.status(201).send({message: 'added succefully '})
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req,res,next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params._id)
    res.status(200).send({message: 'deleted'})
  } catch (err) {
    next(err)
  }
}

// example request: url/category?selection=women&category=shirt&page=1&limit=7
export const category = async (req,res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    const allProducts = await Product.find({selection: req.query.selection, category: req.query.category}).lean()
    if(endIndex < allProducts.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if(startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    const items = await Product.find({selection: req.query.selection, category: req.query.category}).limit(limit).skip(startIndex).exec()
    res.status(200).send({items: items, count: allProducts.length, page: page })
  } catch (err) {
    next(err)
  }
}

export const productDetails = async (req,res, next) => {
  try {
    const {itemId} = req.params
    const item = await Product.findOne({_id: itemId}).lean().orFail()
    res.status(200).send(item)
  } catch (err) {
    next(err)
  }
}

export const suggestions = async (req,res, next) => {
  try {
    const {selection, category, itemId} = req.params
    const items = await Product.find({selection: selection, category: category, _id: {$ne: itemId}}).lean().limit(5)
    res.status(200).send(items)
  } catch (err) {
    next(err)
  }
}