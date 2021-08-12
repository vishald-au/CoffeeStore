const Product = (props, addCart) => {
    const { item, addToCart } = props
    return (
        <div className='row'>
            <div className='col-2 p-0'>
        


                <img className='imgPro img-fluid rounded-start small' src={item.img} alt={item.title} />
            
            </div>
            <div className='col-8'>
                <h4>{item.title} <span className='textRight'>${item.price}</span></h4>
                <h6>{item.desc}</h6>

    
                
            </div>
            <div className='col-2 p-0'>
            <button className='btn btn-success btn-sm btnFull' onClick={() => addToCart(item)}>+</button>
                </div>
        </div>
    )
}

export default Product
