import React, { useEffect, useState } from 'react';
import { supabase } from '../../client';
import editpic from '../../assets/edit.svg';
import ModalAddItem from '../Modal/Modal';
import styles from './TableItem.module.css'; // Import the CSS module

const TableItem = () => {
    const [fetchError, setFetchError] = useState(null);
    const [items, setItems] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase.from('item_t').select();

            if (error) {
                throw new Error('Could not fetch');
            }

            if (data) {
                console.log(data);
                setItems(data);
                setFetchError(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setFetchError('Could not fetch');
            setItems(null);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const select = (item) => {
        setSelectedItem(item);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredItems = items?.filter(item => {
        const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
        const statusMatch = selectedStatus === 'All' || (selectedStatus === 'Available' && item.status) || (selectedStatus === 'Not Available' && !item.status);
        return categoryMatch && statusMatch;
    });

    return (
        <div className={styles['table-container']}>
            <ModalAddItem selectedItem={selectedItem} refresh={fetchItems} />
            {fetchError && <p>{fetchError}</p>}
            <div className={`d-flex justify-content-start align-items-center ${styles.filters}`}>
                <div className="me-2">
                    <label htmlFor="categoryFilter" className={styles['filter-label']}>Category: </label>
                    <select id="categoryFilter" className="form-select" onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="All">All</option>
                        <option value="tools">Tools</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        <option value="equipment">Equipment</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="statusFilter" className={styles['filter-label']}>Status: </label>
                    <select id="statusFilter" className="form-select" onChange={handleStatusChange} value={selectedStatus}>
                        <option value="All">All</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                </div>
            </div>
            <table className={`table table-bordered ${styles.table}`}>
                <thead>
                    <tr>
                        <th>Item name</th>
                        <th>Category</th>
                        <th>Penalty Price</th>
                        <th>Status</th>
                        <th className={styles.smallsize}></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems && filteredItems.map((item) => (
                        <tr key={item.itemid}>
                            <td>{item.item_name}</td>
                            <td>{item.category}</td>
                            <td>{item.item_cost}</td>
                            <td>{item.status ? 'Not Available' : 'Available'}</td>
                            <td>
                                <button type="button" className={`btn btn-link ${styles.editButton}`} data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => select(item)}>
                                    <img className={styles.editIcon} src={editpic} alt="Edit" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableItem;
