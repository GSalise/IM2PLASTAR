import React, { useState } from 'react'
import { supabase } from '../../client'

const Modal = () => {
    

    const [itemData, setItemData] = useState({
        itemName: '',
        penaltyP: '',
        category: '',
      });
  
      console.log(itemData)
  
      function handleChange(event) {
        setItemData((prevItemData) => {
          return {
            ...prevItemData,
            [event.target.name]: event.target.value,
          };
        });
      }

    async function handleSubmit(e) {
        e.preventDefault();
    
        if(!itemData.itemName ||!itemData.category ||!itemData.penaltyP){
         
          alert('way sud amaw')
          return
        }
  
        const { data, error } = await supabase.from('item_t').insert({
          item_name:itemData.itemName, 
          category:itemData.category,
          item_cost:itemData.penaltyP
        })
  
        if(error){
          console.log(error, 'something is wrong')
        }
        if(data){
          console.log(data)
        }
  
  
      }


  return (
    <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" style={{marginTop: "10px", marginLeft: "10px"}}>ADD ITEM</button>
          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">

                  {/* <!-- Modal Header --> */}
                  <div className="modal-header">
                    <h4 className="modal-title">Add Item</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  {/* <!-- Modal body --> */}
                  <div className="modal-body">
                    <form>
                      <div>
                        <label>Name</label>
                        <input
                          name='itemName'
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Item price upon purchase</label>
                        <input
                          name='penaltyP'
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Select type</label>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="furniture" name="category" value="furniture" onChange={handleChange} />
                          <label className="form-check-label" htmlFor="furniture">Furniture</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="misc" name="category" value="misc" onChange={handleChange} />
                          <label className="form-check-label" htmlFor="misc">Misc</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="tools" name="category" value="tools" onChange={handleChange} />
                          <label className="form-check-label" htmlFor="tools">Tools</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="equipment" name="category" value="equipment" onChange={handleChange} />
                          <label className="form-check-label" htmlFor="equipment">Equipment</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="electronics" name="category" value="electronics" onChange={handleChange} />
                          <label className="form-check-label" htmlFor="electronics">Electronics</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="vehicle" name="category" value="vehicle" onChange={handleChange} />
                          <label className="form-check-label" htmlFor="vehicle">Vehicle</label>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* <!-- Modal footer --> */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={handleSubmit}>Submit</button>
                  </div>

          </div>
        </div>
      </div>


      </div>
  )
}

export default Modal
