import './product-card.styles.scss';
import Button from '../button/button';
import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({product}) => {
    const{name,price,imageUrl} = product;
    const {addItemToCart} = useContext(CartContext)
    const addProductToCard = () => {
      return addItemToCart(product)
    }
  return (
    <div className='product-card-container'>
    <img src={imageUrl} alt={`${name}`}/>
    <div className='footer'>
    <span className='name' style={{fontSize:"1.5rem"}}>{name}</span>
    <span className='price'>{price}</span>
    </div>
    <Button buttonType="inverted" onClick={addProductToCard}>Add to Cart</Button>
    </div>
  )
}

export default ProductCard