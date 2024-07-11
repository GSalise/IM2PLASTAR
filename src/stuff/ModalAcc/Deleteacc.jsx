import React from 'react';
import { supabase } from '../../client';
const Deleteacc = ({ onDelete }) => {

    return (
      <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#delaccmodal" style={{ marginTop: "10px", marginLeft: "10px" }}>RETIRE</button>
  
        <div className="modal" id="delaccmodal">
          <div className="modal-dialog">
            <div className="modal-content">
  
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">Retire Acc</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
  
              {/* <!-- Modal body --> */}
              <div className="modal-body">
                Sure Ka I Retire ni NIimo?!!!!!
              </div>
  
              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={onDelete} data-bs-dismiss="modal">YES</button>
                <button type='button' className='btn btn-primary' data-bs-dismiss="modal">NO</button>
              </div>
  
            </div>
          </div>
        </div>
  
      </div>
    )
  }

export default Deleteacc
