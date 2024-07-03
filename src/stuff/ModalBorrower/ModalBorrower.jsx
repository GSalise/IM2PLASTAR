import React, { useState, useEffect } from 'react';
import { supabase } from '../../client';

const ModalBorrower = ({ selectedBorrower }) => {
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
                id: selectedBorrower.id,
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
            window.location.reload();
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
        }).eq('id', borrowerData.id).select();

        if (error) {
            console.log(error, 'something is wrong');
        }
        if (data) {
            console.log('success', data);
            window.location.reload();
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.from('borrower_t').delete().eq('id', borrowerData.id).select();

        if (error) {
            console.log(error, 'something is wrong');
        }
        if (data) {
            console.log('success', data);
            window.location.reload();
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" style={{ marginTop: "10px", marginLeft: "10px" }}>ADD BORROWER</button>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Borrower</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <label>Name</label>
                                    <input
                                        name='name'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Contact</label>
                                    <input
                                        name='contact'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Address</label>
                                    <input
                                        name='address'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Infraction</label>
                                    <input
                                        name='infraction'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <p>Status</p>
                                    <div className="form-check me-3">
                                        <input type="radio" className="form-check-input" id="is_banned_true" name="is_banned" value="true" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="is_banned_true">Banned</label>
                                    </div>
                                    <div className="form-check me-3">
                                        <input type="radio" className="form-check-input" id="is_banned_false" name="is_banned" value="false" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="is_banned_false">Not Banned</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* UPDATE MODAL */}
            <div className="modal" id="updateModalBorrower">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Update Borrower</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <label>Name</label>
                                    <input
                                        name="name"
                                        value={borrowerData.name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Contact</label>
                                    <input
                                        name="contact"
                                        value={borrowerData.contact}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Address</label>
                                    <input
                                        name="address"
                                        value={borrowerData.address}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Infraction</label>
                                    <input
                                        name="infraction"
                                        value={borrowerData.infraction}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <p>Status</p>
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
                                        <label className="form-check-label" htmlFor="is_banned_true_update">
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
                                        <label className="form-check-label" htmlFor="is_banned_false_update">
                                            Not Banned
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
                            <h4 className="modal-title">ARE YOU SURE YOU WANT TO DELETE THIS BORROWER?</h4>
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
    );
};

export default ModalBorrower;