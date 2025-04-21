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
import Pizza_01 from '../../assets/images/Pizza-01.png'; 
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import Pagination from '@mui/material/Pagination';
import DetailFoodForm from '../../components/admincomponent/DetailFoodForm';
import AddNewFood from '../../components/admincomponent/AddNewFood';
import DeleteForm from '../../components/admincomponent/DeleteForm';

const MenuManagement = () => {
  // Danh sách món ăn
  const [menuItems, setMenuItems] = useState([]);
  // Loading / Error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8; // bạn có thể thay đổi

  // Filter giá (demo)
  const [values, setValues] = useState({ numberformat: '' });
  const handlePriceChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Tìm kiếm theo tên
  const [searchTerm, setSearchTerm] = useState('');

  // State cho filter category (giống các trang khác)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State cho modal
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewEditModal, setOpenViewEditModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mở/đóng modal thêm món
  const handleOpenAdd = () => setOpenAddModal(true);
  const handleCloseAdd = () => setOpenAddModal(false);

  // Xem chi tiết
  const handleOpenView = (item) => {
    setModalMode('view');
    setSelectedItem(item);
    setOpenViewEditModal(true);
  };
  // Sửa
  const handleOpenEdit = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setOpenViewEditModal(true);
  };
  const handleCloseViewEdit = () => {
    setOpenViewEditModal(false);
    setSelectedItem(null);
  };

  // Xoá
  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };
  const handleCloseDelete = () => setOpenDeleteModal(false);
  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      const res = await fetch(`https://localhost/api/Menu/softdelete-item/${selectedItem.mnuId}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error('Failed to delete item');
      }
      console.log('Deleted item:', selectedItem.mnuId);
      fetchMenuItems(); // refresh
    } catch (err) {
      console.error(err);
    } finally {
      setOpenDeleteModal(false);
      setSelectedItem(null);
    }
  };

  // Hàm fetch danh sách món
  const fetchMenuItems = () => {
    setLoading(true);

    let filterCols = [];
    if (selectedCategory) {
      // Nếu có filter category, sử dụng filter theo mnuName
      filterCols.push({
        searchColumns: ['mnuName'],
        searchTerms: [selectedCategory],
        operator: 5
      });
    } else if (searchTerm.trim() !== '') {
      filterCols.push({
        searchColumns: ['mnuName'],
        searchTerms: [searchTerm.trim()],
        operator: 5
      });
    } else {
      // Mặc định operator=5 => lấy tất cả
      filterCols.push({
        searchColumns: [],
        searchTerms: [],
        operator: 5
      });
    }

    fetch('https://localhost/api/Menu/get-all-menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pageIndex: currentPage,
        pageSize: pageSize,
        filterColumns: filterCols,
        sortColumnsDictionary: {},
        filterRangeColumns: [],
        filterOption: 0,
        export: {
          chosenColumnNameList: {
            additionalProp1: 'string',
            additionalProp2: 'string',
            additionalProp3: 'string'
          },
          pageName: 'string'
        }
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch menu items');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.items) {
          setMenuItems(data.items);
          setTotalPages(data.totalPages || 1);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching menu items:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  // Gọi fetch khi load trang và khi currentPage thay đổi
  useEffect(() => {
    fetchMenuItems();
  }, [currentPage, searchTerm, selectedCategory]);

  // Thay đổi trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Khi user thay đổi ô input search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Khi bấm icon search (hoặc Enter)
  const handleSearch = () => {
    // Mỗi lần search => reset currentPage = 1
    setCurrentPage(1);
    // Gọi fetchMenuItems() => filter theo searchTerm
    fetchMenuItems();
  };

  // Hoặc cho phép user nhấn Enter => handleSearch
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Xử lý click filter category: nếu click vào category đang được chọn thì hủy filter, ngược lại chọn filter mới
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setCurrentPage(1); // reset trang khi filter thay đổi
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
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <span
              className="input-group-text border-0"
              id="search-addon"
              style={{ cursor: 'pointer' }}
              onClick={handleSearch}
            >
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

        {/* Title + Add Button */}
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
        <AddNewFood
          open={openAddModal}
          handleClose={handleCloseAdd}
          onSuccess={fetchMenuItems}
        />
        <DetailFoodForm
          open={openViewEditModal}
          handleClose={handleCloseViewEdit}
          mode={modalMode}
          initialData={selectedItem}
          onSuccess={fetchMenuItems}
        />
        <DeleteForm
          open={openDeleteModal}
          handleClose={handleCloseDelete}
          onDelete={handleDelete}
        />

        {/* Body */}
        <div className="dashboard-content-food">
          {/* Filter cột trái */}
          <div className="dashboard-content-food-filter">
            <div className="dashboard-content-food-filter-content">
              <h3>Category</h3>
              <Button
                style={{
                  backgroundColor: selectedCategory === 'Pizza' ? '#ffc9c9' : ''
                }}
                onClick={() => handleCategoryClick('Pizza')}
              >
                <img src={cate_pizza} alt="cate_pizza" width="21rem" height="21rem" />
                Pizza
              </Button>
              <Button
                style={{
                  backgroundColor: selectedCategory === 'Burger' ? '#ffc9c9' : ''
                }}
                onClick={() => handleCategoryClick('Burger')}
              >
                <img src={cate_burger} alt="cate_burger" width="21rem" height="21rem" />
                Burger
              </Button>
              <Button
                style={{
                  backgroundColor: selectedCategory === 'Desserts' ? '#ffc9c9' : ''
                }}
                onClick={() => handleCategoryClick('Desserts')}
              >
                <img src={cate_desserts} alt="cate_desserts" width="21rem" height="21rem" />
                Desserts
              </Button>
              <Button
                style={{
                  backgroundColor: selectedCategory === 'Beverages' ? '#ffc9c9' : ''
                }}
                onClick={() => handleCategoryClick('Beverages')}
              >
                <img src={cate_beverages} alt="cate_beverages" width="21rem" height="21rem" />
                Beverages
              </Button>
              <Button
                style={{
                  backgroundColor: selectedCategory === 'Noodles' ? '#ffc9c9' : ''
                }}
                onClick={() => handleCategoryClick('Noodles')}
              >
                <img src={cate_noodles} alt="cate_noodles" width="21rem" height="21rem" />
                Noodles
              </Button>
              <Button
                style={{
                  backgroundColor: selectedCategory === 'Salad' ? '#ffc9c9' : ''
                }}
                onClick={() => handleCategoryClick('Salad')}
              >
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
                        {/* <img src={Pizza_01} alt="food_img" />
                         */}
                         <img src={item.mnuImage ? item.mnuImage : Pizza_01} alt="food_img" />
                      </div>
                      <div className="dashboard-content-food-list-content-item-info">
                        <h4>{item.mnuName}</h4>
                        <p className="description">{item.mnuDescription}</p>
                        <p className="price">${item.mnuPrice}</p>
                      </div>
                      <div className="dashboard-content-food-list-content-item-action">
                        {/* Xem chi tiết */}
                        <Button className="crud-icon" onClick={() => handleOpenView(item)}>
                          <MdOutlineRemoveRedEye />
                        </Button>
                        {/* Chỉnh sửa */}
                        <Button className="crud-icon" onClick={() => handleOpenEdit(item)}>
                          <FiEdit3 />
                        </Button>
                        {/* Xoá */}
                        <Button className="crud-icon" onClick={() => handleOpenDelete(item)}>
                          <MdDeleteOutline />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
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
