const { Router } = require('express');
const CartManager = require ('../managers/cartManager.js');

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});


router.put('/:cid', async (req, res) => {
  try {
    const updatedCart = await cartManager.updateCart(req.params.cid, req.body);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;