import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/Dashboard.css';
import '../assets/css/MenuManagement.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../components/Button';
import { IoIosAdd } from "react-icons/io";
import cate_pizza from '../assets/images/cate_pizza.png';
import cate_burger from '../assets/images/cate_burger.png';
import cate_desserts from '../assets/images/cate_sweets.png';
import cate_beverages from '../assets/images/cate_drink.png';
import cate_noodles from '../assets/images/cate_ramen.png';
import cate_salad from '../assets/images/cate_salad.png';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Pizza_01 from '../assets/images/Pizza-01.svg';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import Pagination from '@mui/material/Pagination';
import DetailFoodForm from '../components/DetailFoodForm';

const MenuManagement = () => {
    const [values, setValues] = React.useState({
        numberformat: '',
      });
    
      const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
    };

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search here ..." aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>
                    <div className="header-center">
                        <Badge badgeContent={5} >
                            <IoMdSettings className="icon" />
                        </Badge>
                        <Badge badgeContent={3} >
                            <IoMdNotifications className="icon" />
                        </Badge>
                    </div>

                    <div className="header-right">
                        <p>Hello Manager</p>
                        <FcBusinessman className="icon" />
                    </div>
                </div>

                <div className="dashboard-title">
                    <div className='dashboard-title-content'>
                        <h2>Menu Management</h2>
                        <p>Here is our menu summary with graph view!</p>
                    </div>
                    <div className='dashboard-title-calendar'>
                        <Button onClick={handleOpen}><IoIosAdd className='dashboard-title-icon' /> New Food</Button>
                    </div>
                </div>

                <DetailFoodForm open={openModal} handleClose={handleClose} />

                <div className='dashboard-content-food'> 
                    <div className='dashboard-content-food-filter'> 
                        <div className='dashboard-content-food-filter-content'>
                            <h3>Category</h3>
                            <Button><img src={cate_pizza} alt='cate_pizza' width='21rem' height='21rem' />Pizza</Button>
                            <Button><img src={cate_burger} alt='cate_burger' width='21rem' height='21rem' />Burger</Button>
                            <Button><img src={cate_desserts} alt='cate_desserts' width='21rem' height='21rem' />Desserts</Button>
                            <Button><img src={cate_beverages} alt='cate_beverages' width='21rem' height='21rem' />Beverages</Button>
                            <Button><img src={cate_noodles} alt='cate_noodles' width='21rem' height='21rem' />Noodles</Button>
                            <Button><img src={cate_salad} alt='cate_salad' width='21rem' height='21rem' />Salad</Button>
                        </div>
                        <div className='dashboard-content-food-filter-price'>
                            <h3>Price</h3>
                            <Stack direction="row" spacing={2} className='dashboard-content-food-filter-price-input'>
                                <NumericFormat
                                    value={values.numberformat}
                                    onChange={handleChange}
                                    customInput={TextField}
                                    thousandSeparator
                                    valueIsNumericString
                                    prefix="$"
                                    variant="standard"
                                    label="From"
                                />
                            </Stack>
                            <Stack direction="row" spacing={2} className='dashboard-content-food-filter-price-input'>
                                <NumericFormat
                                    value={values.numberformat}
                                    onChange={handleChange}
                                    customInput={TextField}
                                    thousandSeparator
                                    valueIsNumericString
                                    prefix="$"
                                    variant="standard"
                                    label="To"
                                />
                            </Stack>
                        </div>
                    </div>

                    <div className='dashboard-content-food-list'>
                        {/* <h3>Menu List</h3> */}
                        <div className='dashboard-content-food-list-content'> 
                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>

                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>

                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>

                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>

                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>

                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>

                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>

                            <div className='dashboard-content-food-list-content-item'>
                                <div className='dashboard-content-food-list-content-item-img'>
                                    <img src={Pizza_01} alt='Pizza_01' />

                                </div>

                                <div className='dashboard-content-food-list-content-item-info'>
                                    <h4>Pepperoni Pizza</h4>
                                    <p className='description'>pepperoni, cheese, tomato sauce, olive oil, garlic, basil</p>
                                    <p className='price'>$12.99</p>
                                </div>

                                <div className='dashboard-content-food-list-content-item-action'>
                                    <Button className='crud-icon'><MdOutlineRemoveRedEye /></Button>
                                    <Button className='crud-icon'><FiEdit3 /></Button>
                                    <Button className='crud-icon'><MdDeleteOutline /></Button>
                                </div>
                            </div>
                        </div>

                        <div className='dashboard-content-food-list-pagination'>
                            <Stack spacing={2}>
                                <Pagination count={10} showFirstButton showLastButton color='primary'
                                    // sx={{
                                    //     '& .MuiPaginationItem-root': {
                                    //       color: '#909090',
                                    //     },
                                    //     '& .Mui-selected': {
                                    //       backgroundColor: '#FF5B5B',
                                    //       color: '#ffffff',
                                    //     },
                                    // }}
                                />
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuManagement;