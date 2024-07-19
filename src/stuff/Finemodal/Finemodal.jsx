import React, { useState,useEffect } from 'react'
import { supabase } from '../../client'
import { useRef } from 'react';
import TableLogsBorrow from '../TableLogs/TableLogs';
const Finemodal = ({ refresh, selectedFine }) => {

   const [LOG, setLOG] = useState(null);
  
   const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    console.log(selectedFine)

    const [fineData,setFineData]=useState({
        fineamount:"",
        reason:"",
        status:"",
        date: formattedDate,
    })
    console.log(fineData);

    const [existingFineData, setExistingFineData] = useState({
      EFineID:'',
      EFineAmount:'',
      EFineStatus:'',
      EReason:'',
    })
    

    useEffect(() => {
      if(selectedFine){
        setExistingFineData({
          EFineID: selectedFine.fineid,
          EFineAmount: selectedFine.fine,
          EFineStatus: selectedFine.status, 
          EReason: selectedFine.reason,
        })
      }
    }, [selectedFine])

    console.log(existingFineData)

   const finefunc =async()=>{
     
    if (!fineData.fineamount || !fineData.reason || !fineData.status || !LOG) {
      alert('Please fill in all fields');
      
    }else{
        const{ data:f, error} = await supabase.from('fines_t').insert([{
            fine:fineData.fineamount,
            reason:fineData.reason,
            date_imposed:fineData.date,
            status:fineData.status,
        }]).select();

        if(error){
            console.log(error);

        }else{
            console.log(f);
            const FID = f[0].fineid;
            console.log(FID);
               
              const{ data:binfo, error} = await supabase.from('borrowinfo_t').update([{fineid:FID,}])
              .eq('borrowid',LOG.borrowid).select();
              if(error){
                  console.log(error);
              }else{
                console.log(binfo);
                refresh();
              }
        }
   }
    }

    async function handleUpdate(e){
      e.preventDefault();

      const {data,error} = await supabase.from('fines_t').update({
        reason: existingFineData.EReason,
        status: existingFineData.EFineStatus,
      }).eq('fineid',existingFineData.EFineID).select();

           if(error){
             console.log(error, 'something is wrong')
           }
           if(data){
             console.log('success',data);
             refresh()
           }
             
    }

    function handleChange(event){
        setFineData((prevFineData)=>{
            return{
                ...prevFineData,
                [event.target.name]:event.target.value,
            }
        })
    }

    function handleEditChange(event){
      const { name, value } = event.target;
      setExistingFineData((prevData)=>({
          ...prevData,
          [name]:value,
      }))
    }

    console.log(LOG);

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#fine"
          style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '10px', backgroundColor: '#7f00ff', color: 'white',  borderColor: '#7f00ff'}}
        >
          CREATE NEW FINE
        </button>
  
        <div className="modal" id="fine" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content">
  
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Create Fine</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
  
              {/* Modal Body */}
              <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <form className="row g-3 justify-content-center">
                  <div className="col-md-6">
                    <label className="form-label" style={{ color: "black" }} name='fineamount' >Fine Amount</label>
                    <input  className="form-control" name="fineamount" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" style={{ color: "black" }} >Reason</label>
                    <textarea name='reason' className="form-control" rows="3" onChange={handleChange} required></textarea>
                  </div>
                  <center><label className="form-label" style={{ color: "black" }}>STATUS</label></center>
                  <div className="col-md-12 d-flex justify-content-center">
                  
                    <div className="form-check me-3">
                      <label className="form-check-label" htmlFor="paid" style={{ color: 'black'}}>
                        <input className="form-check-input" type="radio" id="paid" name="status" value="paid" onChange={handleChange} required/>Paid
                        </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor="unpaid" style={{ color: 'black' }}>Unpaid
                      <input className="form-check-input" type="radio" id="unpaid" name="status" value="unpaid" onChange={handleChange} required/>
                      </label>
                    </div>
                  </div>
                </form>
                <TableLogsBorrow mode="Fines" style={{ width: '100%' }} onselectLog={setLOG}/>
              </div>
  
              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => finefunc()} data-bs-dismiss="modal">
                  Submit
                </button>
              </div>
  
            </div>
          </div>
        </div>

        <div className="modal" id="fineEDIT" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content">
  
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Edit Fine</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
  
              {/* Modal Body */}
              <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <form className="row g-3 justify-content-center">
                  <div className="col-md-6">
                    <label className="form-label" style={{ color: "black" }} >Reason</label>
                    <textarea name='EReason' className="form-control" rows="3" value={existingFineData.EReason} onChange={handleEditChange} required></textarea>
                  </div>
                  <center><label className="form-label" style={{ color: "black" }}>STATUS</label></center>
                  <div className="col-md-12 d-flex justify-content-center">
                  
                    <div className="form-check me-3">
                      <label className="form-check-label" htmlFor="paid" style={{ color: 'black'}}>
                        <input className="form-check-input" type="radio" id="paid" name="EFineStatus" value="paid" onChange={handleEditChange} checked={existingFineData.EFineStatus === 'paid'} required/>Paid
                        </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor="unpaid" style={{ color: 'black' }}>Unpaid
                      <input className="form-check-input" type="radio" id="unpaid" name="EFineStatus" value="unpaid" onChange={handleEditChange} checked={existingFineData.EFineStatus === 'unpaid'} required/>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
  
              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleUpdate} data-bs-dismiss="modal">
                  Submit
                </button>
              </div>
  
            </div>
          </div>
        </div>
  
      </div>
    );
  };
  
  export default Finemodal;