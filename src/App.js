import Product from "./Product";
import data from "./data";
import { useRef, useState, useEffect } from 'react'


function App() {

  const searchFocus = useRef();
  const [cartItems, setCartItems] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    return data.filter(
      (item) => (
        item.title.toLowerCase().includes(search) ||
        item.desc.toLowerCase().includes(search)
      )
    )
  }

  const addToCart = (item) => {
    const exist = cartItems.find(x => x.id === item.id)
    if (exist) {
      setCartItems(cartItems.map(x => x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x))
    } else (
      setCartItems([...cartItems, { ...item, qty: 1 }])
    )
  }

  const removeCart = (item) => {
    const exist = cartItems.find(x => x.id === item.id)
    if (exist.qty === 1) {
      setCartItems(cartItems.filter(x => x.id !== item.id))
    } else {
      setCartItems(cartItems.map(x => x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x))
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalCart = Math.round(cartItems.reduce((a, b) => a + b.qty * b.price, 0))
  const totalTax = Math.round(totalCart * 0.15)
  const totalShipping = totalCart > 1000 ? 0 : 50

  useEffect(() => {
    searchFocus.current.focus()
  }, [])


  return (
    <div className='container-fluid '>
      <div className='row'>

        <div className='col-sm-12 col-md-8 col-lg-9 home'>
          <div className='row'>

            <div className='col-12'>
              <input ref={searchFocus} className='searchBox' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search searchIcon" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
            </div>
          </div>
          <div className='row p-4'>
            <div className='col-12'>
              <div className='row'>
                {handleSearch(data).map(item => (
                  <div className='col-sm-12 col-md-12 col-lg-4 p-4'>
                    <Product key={item.id} item={item} addToCart={addToCart} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-4 col-lg-3 p-2 bg-success text-light home sidebar'>
          <div className='row'>
            <div className='col-6'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
</svg> ({cartItems.length})</div>
            <div className='col-6 floatRightTotal'>Due ${Math.round(totalCart + totalShipping + totalTax)}</div>
            <hr />
          </div>
          <div className='row p-3'>
            {cartItems.length === 0 && 'Cart is empty'}
            {cartItems.map(item => (
              <div key={item.id} className='card bg-dark p-2' >
                <div className='row g-0'>
                  
                  
                  
                  <div className='col-md-12'>
                    <img src={item.img} className='imgPro2 imgLeft' alt={item.title} />

                    <div className='card-body'>
                      <div className='row p-0'>
                        <div className='col-sm-12 col-md-6  p-0'>
                          <p className='card-text'>
                          <small>Price: ${item.price}</small><br />
                          <small>Qty: {item.qty}</small><br />

                         
                        </p>
                        </div>
                        <div className='col-sm-12 col-md-6  p-0'>
                        <p className='card-text'>
                   

                          <button className='btn btn-light m-1 btn-sm btnBig' onClick={() => addToCart(item)}>+</button>
                          <button className='btn btn-light btn-sm btnBig' onClick={() => removeCart(item)}>-</button>
                        </p>
                        </div>
                      </div>
                      

                    </div>
                  </div>



                </div>
              </div>
            ))}


          </div>
          <div className='row'>
            <hr />
            <div className='col-12 py-3'>
              <p className='text-right'>
                <small>Total: ${totalCart}<br />
                  Shipping:  ${cartItems.length && totalShipping}<br />
                  Tax (15%):  ${totalTax}<br /></small>
                <hr />
                <span>Grand Total ${Math.round(totalCart + totalShipping + totalTax)}</span><br />

                <button onClick={() => clearCart()} className='btn btn-light'>RESET</button>
              </p>
            </div>


          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
