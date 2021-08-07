import Product from "./Product";
import data from "./data";
import { useState } from 'react'


function App() {

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

  const totalCart = cartItems.reduce((a, b) => a + b.qty * b.price, 0)
  const totalTax = Math.round(totalCart * 0.15)
  const totalShipping = totalCart > 1000 ? 0 : 50


  return (
    <div className='container-fluid '>
      <div className='row'>

        <div className='col-8 home'>
          <div className='row'>

            <div className='col-12'>
              <input className='searchBox' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className='row p-4'>
            <div className='col-12'>
              <div className='row'>
                {handleSearch(data).map(item => (
                  <div className='col-4 p-4'>
                    <Product key={item.id} item={item} addToCart={addToCart} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-4 bg-success text-light home'>
          <div className='row'>
            <div className='col-9'>Cart ({cartItems.length})</div>
            <div className='col-3'></div>
            <hr />
          </div>
          <div className='row'>
            {cartItems.length === 0 && 'cart is empty'}
            {cartItems.map(item => (
              <div key={item.id} className='card bg-dark p-2' >
                <div className='row g-0'>
                  <div className='col-md-12'>
                    <img src={item.img} className='imgPro imgLeft' alt={item.title} />

                    <div className='card-body'>
                      <p className='card-text'>
                        <small>Price: ${item.price}</small><br />
                        <small>Qty: {item.qty}</small><br />

                        <button className='btn btn-light m-1 btn-sm' onClick={() => addToCart(item)}>+</button>
                        <button className='btn btn-light btn-sm' onClick={() => removeCart(item)}>-</button>
                      </p>

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
                <small>Total Amount: ${totalCart}<br />
                  Shipping:  ${totalShipping}<br />
                  Tax (15%):  ${totalTax}<br /></small>
                <hr />
                Grand Total ${totalCart + totalShipping + totalTax}<br />

                <button className='btn btn-light'>PAY</button>
              </p>
            </div>


          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
