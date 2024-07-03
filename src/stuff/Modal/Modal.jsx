import React, { useState,useEffect } from 'react'
import { supabase } from '../../client'

const Modal = ({ selectedItem })  => {
    

    const [itemData, setItemData] = useState({
        itemName: '',
        penaltyP: '',
        category: '',
      });

      const [nitemData, setnItemData] = useState({
        nitemid:'',
        nitemName: '',
        npenaltyP: '',
        nstatus: '',
      });
      //console.log(itemData)

   
      useEffect(() => {
        if (selectedItem) {
          setnItemData({
            nitemid: selectedItem.itemid,
            nitemName: selectedItem.item_name,
            npenaltyP: selectedItem.item_cost,
            nstatus: selectedItem.status,
          });
        }
      }, [selectedItem]);
     
      
      const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        setnItemData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

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
        }).select()
  
        if(error){
          console.log(error, 'something is wrong')
        }
        if(data){
          console.log('success',data)
          window.location.reload()
        }
        
  
  
      }

       async function handleUpdate(e){
         e.preventDefault();

         const {data,error} = await supabase.from('item_t').update({
          item_name:nitemData.nitemName, 
          category:nitemData.ncategory,
          item_cost:nitemData.npenaltyP,
          status: nitemData.nstatus === 'true',
         }).eq('itemid',nitemData.nitemid).select();

              if(error){
                console.log(error, 'something is wrong')
              }
              if(data){
                console.log('success',data);
                window.location.reload();
              }
                
       }

       async function handleDelete(e){
        e.preventDefault()

        const {data,error} = await supabase.from('item_t').delete().eq('itemid', nitemData.nitemid).select()
       
        if(error){
          console.log(error, 'something is wrong')
        }
        if(data){
          console.log('success',data);
          window.location.reload();
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
                        <p>Select type</p>
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

     {/* UPDATE MODAL */}
     <div className="modal" id="updateModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <label>Name</label>
                  <input
                    name="nitemName"
                    value={nitemData.nitemName}
                    onChange={handleUpdateChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Item price upon purchase</label>
                  <input
                    name="npenaltyP"
                    value={nitemData.npenaltyP}
                    onChange={handleUpdateChange}
                    className="form-control"
                  />
                </div>
                <div className="d-flex flex-wrap">
                  <p>STATUS</p>
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="Available"
                      name="nstatus"
                      value="true"
                      checked={nitemData.nstatus === 'true'}
                      onChange={handleUpdateChange}
                    />
                    <label className="form-check-label" htmlFor="Available">
                      AVAILABLE
                    </label>
                  </div>
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="NotAvailable"
                      name="nstatus"
                      value="false"
                      checked={nitemData.nstatus === 'false'}
                      onChange={handleUpdateChange}
                    />
                    <label className="form-check-label" htmlFor="NotAvailable">
                      NOT AVAILABLE
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleUpdate}>
                UPDATE
              </button>
              <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="confirmDeleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p>Confirmation</p>
            </div>
            <div className="modal-body">
              <h4 className="modal-title">ARE YOU SURE YOU WANT TO DELETE THIS ITEM?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                YES
              </button>
              <button type='button' className='btn btn-primary' data-bs-dismiss="modal">
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      </div>
  )
}

export default Modal