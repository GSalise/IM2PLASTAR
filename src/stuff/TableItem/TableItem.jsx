import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'

const TableItem = () => {
    const [fetchError, setFetchError] = useState(null)
    const [items, setItems] = useState(null)

    const [itemData, setItemData] = useState({
      itemName: '',
      penaltyP: '',
    });

    useEffect(() => {
        const fetchItems = async () => {
            const {data, error} = await supabase.from('item_t').select()

            if(error){
                setFetchError('Could not fetch')
                setItems(null)
                console.log(error)
            }

            if(data){
              console.log(data)
                setItems(data)
                setFetchError(null)
            }
        }

        fetchItems()
    }, [])




  return (
    <div>
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
                        />
                      </div>
                      <div>
                        <label>Item price upon purchase</label>
                        <input
                          name='penaltyP'
                        />
                      </div>
                      <div>
                        <label>Select type</label>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="furniture" name="itemType" value="furniture" />
                          <label className="form-check-label" htmlFor="furniture">Furniture</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="misc" name="itemType" value="misc" />
                          <label className="form-check-label" htmlFor="misc">Misc</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="tools" name="itemType" value="tools" />
                          <label className="form-check-label" htmlFor="tools">Tools</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="equipment" name="itemType" value="equipment" />
                          <label className="form-check-label" htmlFor="equipment">Equipment</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="electronics" name="itemType" value="electronics" />
                          <label className="form-check-label" htmlFor="electronics">Electronics</label>
                        </div>
                        <div className="form-check me-3">
                          <input type="radio" className="form-check-input" id="vehicle" name="itemType" value="vehicle" />
                          <label className="form-check-label" htmlFor="vehicle">Vehicle</label>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* <!-- Modal footer --> */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>

          </div>
        </div>
      </div>


      </div>
      {fetchError && (<p>{fetchError}</p>)}
      <table className="table table-bordered" style={{width:"1500px"}}>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Category</th>
            <th>Penalty Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr key={item.item_name}>
              <td>{item.item_name}</td>
              <td>{item.category}</td>
              <td>{item.item_cost}</td>
              <td>{item.status? 'Available' : 'Not Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableItem
