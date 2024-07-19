import React, { useState, useEffect } from 'react';
import { supabase } from '../../client';
import { useRef } from 'react';
import styles from './ModalBorrower.module.css';

const ModalBorrower = ({ selectedBorrower, refresh }) => {
    const [borrowerData, setBorrowerData] = useState({
        name: '',
        contact: '',
        address: '',
        infraction: '',
        is_banned: false,
    });

    useEffect(() => {
        if (selectedBorrower) {
            setBorrowerData({
                id: selectedBorrower.borrowerid,
                name: selectedBorrower.name,
                contact: selectedBorrower.contact,
                address: selectedBorrower.address,
                infraction: selectedBorrower.infraction,
                is_banned: selectedBorrower.is_banned,
            });
        }
    }, [selectedBorrower]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBorrowerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!borrowerData.name || !borrowerData.contact || !borrowerData.address || !borrowerData.infraction) {
            alert('Please fill out all fields');
            return;
        }

        const { data, error } = await supabase.from('borrower_t').insert({
            name: borrowerData.name,
            contact: borrowerData.contact,
            address: borrowerData.address,
            infraction: borrowerData.infraction,
            is_banned: borrowerData.is_banned === 'true',
        }).select();

        if (error) {
            console.log(error, 'something is wrong');
        }
        if (data) {
            console.log('success', data);
            refresh()
          
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.from('borrower_t').update({
            name: borrowerData.name,
            contact: borrowerData.contact,
            address: borrowerData.address,
            infraction: borrowerData.infraction,
            is_banned: borrowerData.is_banned === 'true',
        }).eq('borrowerid', borrowerData.id).select();

        if (error) {
            console.log(error, 'something is wrong');
        }
        if (data) {
            console.log('success', data);
            refresh()
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.from('borrower_t').delete().eq('borrowerid', borrowerData.id).select();

        if (error) {
            console.log(error, 'something is wrong');
        }
        if (data) {
            console.log('success', data);
            refresh()
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '10px', backgroundColor: '#7f00ff', color: 'white',  borderColor: '#7f00ff'}}>ADD BORROWER</button>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className={`modal-content ${styles['modal-content']}`}>
                        <div className={`modal-header ${styles['modal-header']}`}>
                            <h4 className="modal-title">Add Borrower</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={{color:'black'}}>Name</label>
                                    <input
                                        name='name'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={{color:'black'}}>Contact</label>
                                    <input
                                        name='contact'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={{color:'black'}}>Address</label>
                                    <input
                                        name='address'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{marginBottom:"10px", height : "fit-content"}}>
                                    <label style={{color:'black'}}>Infraction</label>
                                    <input
                                        type='number'
                                        name='infraction'
                                        min='1'
                                        max='3'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{marginRight:"150px",marginTop:"10px", height : "fit-content"}}>
                                    <p style={{color:'black'}}>Status</p>
                                    <div className="form-check me-3">
                                       
                                        <label style={{color:'black'}} className="form-check-label" htmlFor="is_banned_true">
                                        <input type="radio" className="form-check-input" id="is_banned_true" name="is_banned" value="true" onChange={handleChange} />
                                        Banned</label>
                                    </div>
                                    <div className="form-check me-3">
                                       
                                        <label style={{color:'black'}} className="form-check-label" htmlFor="is_banned_false"> 
                                        <input type="radio" className="form-check-input" id="is_banned_false" name="is_banned" value="false" onChange={handleChange} />
                                        Not Banned</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`modal-footer ${styles['modal-footer']}`}>
                            <button type="button" className="btn btn-danger" onClick={handleSubmit} data-bs-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* UPDATE MODAL */}
            <div className="modal" id="updateModalBorrower">
                <div className="modal-dialog">
                    <div className={`modal-content ${styles['modal-content']}`}>
                        <div className={`modal-header ${styles['modal-header']}`}>
                            <h4 className="modal-title">Update Borrower</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <label style={{color:'black'}}>Name</label>
                                    <input
                                        name="name"
                                        value={borrowerData.name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label style={{color:'black'}}>Contact</label>
                                    <input
                                        name="contact"
                                        value={borrowerData.contact}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label style={{color:'black'}}>Address</label>
                                    <input
                                        name="address"
                                        value={borrowerData.address}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label style={{color:'black'}}>Infraction</label>
                                    <input
                                        type='number'
                                        min='0'
                                        max='3'
                                        name="infraction"
                                        value={borrowerData.infraction}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <p style={{color:'black'}}>Status</p>
                                    <div className="form-check me-3">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="is_banned_true_update"
                                            name="is_banned"
                                            value="true"
                                            checked={borrowerData.is_banned === 'true'}
                                            onChange={handleChange}
                                        />
                                        <label style={{color:'black'}} className="form-check-label" htmlFor="is_banned_true_update">
                                            Banned
                                        </label>
                                    </div>
                                    <div className="form-check me-3">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="is_banned_false_update"
                                            name="is_banned"
                                            value="false"
                                            checked={borrowerData.is_banned === 'false'}
                                            onChange={handleChange}
                                        />
                                        <label style={{color:'black'}} className="form-check-label" htmlFor="is_banned_false_update">
                                            Not Banned
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`modal-footer ${styles['modal-footer']}`}>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">
                                UPDATE
                            </button>
                            <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="confirmDeleteModal">
                <div className="modal-dialog">
                    <div className={`modal-content ${styles['modal-content']}`}>
                        <div className={`modal-header ${styles['modal-header']}`}>
                            <p style={{color:'black'}}>Confirmation</p>
                        </div>
                        <div className="modal-body">
                            <h4 className="modal-title">ARE YOU SURE YOU WANT TO DELETE THIS BORROWER?</h4>
                        </div>
                        <div className={`modal-footer ${styles['modal-footer']}`}>
                            <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">
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
    );
};

export default ModalBorrower;
