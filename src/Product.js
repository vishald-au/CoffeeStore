const Product = (props, addCart) => {
    const { item, addToCart } = props
    return (
        <>
            <h4>{item.title} <span>${item.price}</span></h4>
            <h6>{item.desc}</h6>


            <img className='imgPro img-fluid rounded-start small' src={item.img} alt={item.title} />
            <button className='btn btn-success btn-sm' onClick={() => addToCart(item)}>+</button>
        </>
    )
}

export default Product
