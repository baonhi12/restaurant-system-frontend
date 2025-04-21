// src/pages/mobile/HomeScreen.js
import React, { useEffect, useState } from 'react';
import '../../assets/css/OrderFood.css';
import logo from '../../assets/images/logo.png';
import { IoIosSearch } from "react-icons/io";
import Button from '../../components/admincomponent/Button';
import FoodCard from '../../components/mobilecomponent/FoodCard';
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate, useSearchParams } from 'react-router-dom';  // Dùng để lấy query param
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { IoMenu, IoHomeOutline } from 'react-icons/io5'; 

const HomeScreen = () => {
  const navigate = useNavigate();

  // 1) Lấy tableId từ query (nếu người dùng quét QR)
  const [searchParams] = useSearchParams();
  const queryTableId = searchParams.get("tableId");

  // 2) Nếu có tableId mới, reset orderId cũ và lưu tableId vào localStorage
  useEffect(() => {
    if (queryTableId) {
      localStorage.removeItem("orderId");     // Xoá orderId cũ
      localStorage.setItem("tableId", queryTableId);
    }
  }, [queryTableId]);

  // 3) Tính toán tableId để hiển thị: Nếu URL không có, lấy trong localStorage, nếu vẫn không có => "1"
  const tableId = queryTableId || localStorage.getItem("tableId") || "1";

  // ------------- Code sidebar, filter, v.v. của bạn vẫn giữ nguyên ----------------- //

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(open => !open);

  // Filter category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Danh sách món ăn
  const [foods, setFoods] = useState([]);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6; 

  // Mỗi khi currentPage thay đổi => fetchAllMenus
  useEffect(() => {
    fetchAllMenus();
  }, [currentPage]);

  // Fetch tất cả menu (operator=0 => lấy tất cả)
  const fetchAllMenus = async () => {
    try {
      const requestBody = {
        pageIndex: currentPage,
        pageSize: pageSize,
        filterColumns: [
          {
            searchColumns: [],
            searchTerms: [],
            operator: 0
          }
        ],
        sortColumnsDictionary: {},
        filterRangeColumns: [],
        filterOption: 0,
        export: {
          chosenColumnNameList: {},
          pageName: "string"
        }
      };

      const response = await axios.post('https://localhost/api/Menu/get-all-menu', requestBody);
      if (response.data) {
        setFoods(response.data.items || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching all menus:", error);
    }
  };

  // Fetch menu theo 1 category => filter cột "mnuName" LIKE category
  const fetchMenusByCategory = async (category) => {
    try {
      const requestBody = {
        pageIndex: 1,
        pageSize: 10,
        filterColumns: [
          {
            searchColumns: ["mnuName"],
            searchTerms: [category],
            operator: 5
          }
        ],
        sortColumnsDictionary: {},
        filterRangeColumns: [],
        filterOption: 0,
        export: { chosenColumnNameList: {}, pageName: "string" }
      };

      const response = await axios.post('https://localhost/api/Menu/get-all-menu', requestBody);
      if (response.data) {
        setFoods(response.data.items || []);
      }
    } catch (error) {
      console.error("Error fetching menus by category:", error);
    }
  };

  // Toggle filter category
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      fetchAllMenus();
    } else {
      setSelectedCategory(category);
      fetchMenusByCategory(category);
    }
  };

  // Clear filter
  const handleClearFilter = () => {
    setSelectedCategory(null);
    fetchAllMenus();
  };

  // NavItem cho sidebar
  const NavItem = ({ icon, to, label }) => {
    return (
      <div onClick={() => { navigate(to); setSidebarOpen(false); }} className="nav-item">
        {icon}
        <span className="nav-label">{label}</span>
      </div>
    );
  };

  // Khi bấm vào món => sang detailFood
  const handleFoodClick = (foodId) => {
    navigate(`/detail-food-screen/${foodId}`);
  };

  // Thay đổi trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // ------------------ JSX trả về --------------------- //

  return (
    <div className='home-screen-container'>

      {/* Header: Menu icon + Logo + Table ID */}
      <div className='home-screen-header'>
        <div className="hamburger" onClick={toggleSidebar}>
          <IoMenu size={24} />
        </div>
        <img src={logo} alt='logo' />
        <h1>Welcome</h1>
      </div>

      <div className="content">
        {/* Sidebar */}
        <div className={`home-screen-navbar sidebar ${sidebarOpen ? 'open' : ''}`}>
          <NavItem to="/homescreen" icon={<IoHomeOutline size={24} />} label="Home" />
          <NavItem to="/notification" icon={<IoMdNotificationsOutline size={24} />} label="Notification" />
          <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={24} />} label="Cart" />
          <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={24} />} label="History" />
        </div>

        {/* Overlay khi sidebar mở */}
        {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

        {/* Search bar */}
        <div className="home-screen-seacrh input-group rounded">
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

        {/* Filter buttons */}
        <div className='home-screen-categories-filter'>
          <Button
            className='home-screen-categories-btn'
            style={{ backgroundColor: selectedCategory === 'Pizza' ? '#ffc9c9' : '' }}
            onClick={() => handleCategoryClick("Pizza")}
          >
            Pizza
          </Button>
          <Button
            className='home-screen-categories-btn'
            style={{ backgroundColor: selectedCategory === 'Burger' ? '#ffc9c9' : '' }}
            onClick={() => handleCategoryClick("Burger")}
          >
            Burger
          </Button>
          <Button
            className='home-screen-categories-btn'
            style={{ backgroundColor: selectedCategory === 'Dessert' ? '#ffc9c9' : '' }}
            onClick={() => handleCategoryClick("Dessert")}
          >
            Desserts
          </Button>
          <Button
            className='home-screen-categories-btn'
            style={{ backgroundColor: selectedCategory === 'Beverage' ? '#ffc9c9' : '' }}
            onClick={() => handleCategoryClick("Beverage")}
          >
            Beverages
          </Button>
          <Button
            className='home-screen-categories-btn'
            style={{ backgroundColor: selectedCategory === 'Noodles' ? '#ffc9c9' : '' }}
            onClick={() => handleCategoryClick("Noodles")}
          >
            Noodles
          </Button>
          <Button
            className='home-screen-categories-btn'
            style={{ backgroundColor: selectedCategory === 'Salad' ? '#ffc9c9' : '' }}
            onClick={() => handleCategoryClick("Salad")}
          >
            Salad
          </Button>
          {selectedCategory && (
            <Button
              className='home-screen-categories-btn'
              style={{ backgroundColor: '#ff6b6b', color: '#fff', marginRight: '8px' }}
              onClick={handleClearFilter}
            >
              Clear
            </Button>
          )}
        </div>
        
        {/* Danh sách món ăn */}
        <div className='home-screen-food-cards'>
          {foods.map((item) => (
            <div 
              key={item.mnuId} 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => handleFoodClick(item.mnuId)}
            >
              <FoodCard 
                food={{
                  id: item.mnuId,
                  name: item.mnuName,
                  price: `S ${item.mnuPrice} `,
                  description: item.mnuDescription,
                  image: item.mnuImage
                }} 
              />
            </div>
          ))}
        </div>

        {/* Phân trang */}
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
      </div>
    </div>
  );
};

export default HomeScreen;
