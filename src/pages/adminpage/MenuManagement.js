// src/pages/admin/MenuManagement.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import { IoIosAdd } from "react-icons/io";
import cate_pizza from '../../assets/images/cate_pizza.png';
import cate_burger from '../../assets/images/cate_burger.png';
import cate_desserts from '../../assets/images/cate_sweets.png';
import cate_beverages from '../../assets/images/cate_drink.png';
import cate_noodles from '../../assets/images/cate_ramen.png';
import cate_salad from '../../assets/images/cate_salad.png';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Pizza_01 from '../../assets/images/Pizza-01.svg'; // Ảnh placeholder
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import Pagination from '@mui/material/Pagination';
import DetailFoodForm from '../../components/admincomponent/DetailFoodForm';
import AddNewFood from '../../components/admincomponent/AddNewFood';
import DeleteForm from '../../components/admincomponent/DeleteForm';

const MenuManagement = () => {
  // State lưu danh sách món ăn
  const [menuItems, setMenuItems] = useState([]);
  // State loading/error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8; // bạn có thể điều chỉnh

  // State filter giá (demo)
  const [values, setValues] = useState({ numberformat: '' });
  const handlePriceChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // State cho modal Add, View/Edit, Delete
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewEditModal, setOpenViewEditModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenAdd = () => setOpenAddModal(true);
  const handleCloseAdd = () => setOpenAddModal(false);

  const handleOpenView = (item) => {
    setModalMode('view');
    setSelectedItem(item);
    setOpenViewEditModal(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setOpenViewEditModal(true);
  };

  const handleCloseViewEdit = () => {
    setOpenViewEditModal(false);
    setSelectedItem(null);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };
  const handleCloseDelete = () => setOpenDeleteModal(false);
  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      const res = await fetch(`https://localhost:7115/api/Menu/softdelete_item/${selectedItem.mnuId}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error('Failed to delete item');
      }
      console.log('Deleted item:', selectedItem.mnuId);
      fetchMenuItems(); // refresh danh sách sau khi xóa
    } catch (err) {
      console.error(err);
    } finally {
      setOpenDeleteModal(false);
      setSelectedItem(null);
    }
  };

  // Hàm fetch danh sách món ăn với pageIndex và pageSize
  const fetchMenuItems = () => {
    setLoading(true);
    fetch('https://localhost:7115/api/Menu/get_all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "pageIndex": currentPage,
        "pageSize": pageSize,
        "filterColumns": [
          { "searchColumns": [], "searchTerms": [], "operator": 5 }
        ],
        "sortColumnsDictionary": {},
        "filterRangeColumns": [],
        "filterOption": 0,
        "export": {
          "chosenColumnNameList": {
            "additionalProp1": "string",
            "additionalProp2": "string",
            "additionalProp3": "string"
          },
          "pageName": "string"
        }
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch menu items');
        }
        return res.json();
      })
      .then(data => {
        if (data && data.items) {
          setMenuItems(data.items);
          setTotalPages(data.totalPages || 1);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching menu items:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  // Gọi API khi trang load và khi currentPage thay đổi
  useEffect(() => {
    fetchMenuItems();
  }, [currentPage]);

  // Xử lý khi thay đổi trang từ Pagination component
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search here ..."
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span className="input-group-text border-0" id="search-addon">
              <IoIosSearch />
            </span>
          </div>
          <div className="header-center">
            <Badge badgeContent={5}>
              <IoMdSettings className="icon" />
            </Badge>
            <Badge badgeContent={3}>
              <IoMdNotifications className="icon" />
            </Badge>
          </div>
          <div className="header-right">
            <p>Hello Manager</p>
            <FcBusinessman className="icon" />
          </div>
        </div>

        {/* Title + Button add new */}
        <div className="dashboard-title">
          <div className="dashboard-title-content">
            <h2>Menu Management</h2>
            <p>Here is our menu summary with graph view!</p>
          </div>
          <div className="dashboard-title-calendar">
            <Button onClick={handleOpenAdd}>
              <IoIosAdd className="dashboard-title-icon" /> New Food
            </Button>
          </div>
        </div>

        {/* Modals */}
        <AddNewFood open={openAddModal} handleClose={handleCloseAdd} onSuccess={fetchMenuItems} />
        <DetailFoodForm
          open={openViewEditModal}
          handleClose={handleCloseViewEdit}
          mode={modalMode}
          initialData={selectedItem}
          onSuccess={fetchMenuItems}
        />
        <DeleteForm open={openDeleteModal} handleClose={handleCloseDelete} onDelete={handleDelete} />

        {/* Body */}
        <div className="dashboard-content-food">
          {/* Filter cột trái */}
          <div className="dashboard-content-food-filter">
            <div className="dashboard-content-food-filter-content">
              <h3>Category</h3>
              <Button>
                <img src={cate_pizza} alt="cate_pizza" width="21rem" height="21rem" />
                Pizza
              </Button>
              <Button>
                <img src={cate_burger} alt="cate_burger" width="21rem" height="21rem" />
                Burger
              </Button>
              <Button>
                <img src={cate_desserts} alt="cate_desserts" width="21rem" height="21rem" />
                Desserts
              </Button>
              <Button>
                <img src={cate_beverages} alt="cate_beverages" width="21rem" height="21rem" />
                Beverages
              </Button>
              <Button>
                <img src={cate_noodles} alt="cate_noodles" width="21rem" height="21rem" />
                Noodles
              </Button>
              <Button>
                <img src={cate_salad} alt="cate_salad" width="21rem" height="21rem" />
                Salad
              </Button>
            </div>

            {/* Filter giá (demo) */}
            <div className="dashboard-content-food-filter-price">
              <h3>Price</h3>
              <Stack direction="row" spacing={2} className="dashboard-content-food-filter-price-input">
                <NumericFormat
                  value={values.numberformat}
                  onChange={handlePriceChange}
                  customInput={TextField}
                  thousandSeparator
                  valueIsNumericString
                  prefix="$"
                  variant="standard"
                  label="From"
                  name="priceFrom"
                />
              </Stack>
              <Stack direction="row" spacing={2} className="dashboard-content-food-filter-price-input">
                <NumericFormat
                  value={values.numberformat}
                  onChange={handlePriceChange}
                  customInput={TextField}
                  thousandSeparator
                  valueIsNumericString
                  prefix="$"
                  variant="standard"
                  label="To"
                  name="priceTo"
                />
              </Stack>
            </div>
          </div>

          {/* Danh sách món */}
          <div className="dashboard-content-food-list">
            {loading && <div style={{ textAlign: 'center' }}>Loading...</div>}
            {error && <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>}
            {!loading && !error && (
              <>
                <div className="dashboard-content-food-list-content">
                  {menuItems.map((item) => (
                    <div className="dashboard-content-food-list-content-item" key={item.mnuId}>
                      <div className="dashboard-content-food-list-content-item-img">
                        <img src={Pizza_01} alt="food_img" />
                      </div>
                      <div className="dashboard-content-food-list-content-item-info">
                        <h4>{item.mnuName}</h4>
                        <p className="description">{item.mnuDescription}</p>
                        <p className="price">${item.mnuPrice}</p>
                      </div>
                      <div className="dashboard-content-food-list-content-item-action">
                        <Button className="crud-icon" onClick={() => handleOpenView(item)}>
                          <MdOutlineRemoveRedEye />
                        </Button>
                        <Button className="crud-icon" onClick={() => handleOpenEdit(item)}>
                          <FiEdit3 />
                        </Button>
                        <Button className="crud-icon" onClick={() => handleOpenDelete(item)}>
                          <MdDeleteOutline />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phần Pagination */}
                <div className="dashboard-content-food-list-pagination">
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      showFirstButton
                      showLastButton
                      color="primary"
                    />
                  </Stack>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
