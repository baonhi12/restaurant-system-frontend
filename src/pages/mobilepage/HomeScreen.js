// src/pages/mobile/HomeScreen.js
import React, { useEffect, useState } from 'react';
import '../../assets/css/OrderFood.css';
import logo from '../../assets/images/logo.png';
import { IoIosSearch } from "react-icons/io";
import Button from '../../components/admincomponent/Button';
import FoodCard from '../../components/mobilecomponent/FoodCard';
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

const HomeScreen = () => {
  const navigate = useNavigate();
  // Lưu tên category đang được filter (nếu null => không filter)
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Danh sách món ăn hiển thị
  const [foods, setFoods] = useState([]);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6; // bạn có thể thay đổi

  // Lấy toàn bộ menu khi vừa vào trang
  useEffect(() => {
    fetchAllMenus();
  }, [currentPage]);

  // Hàm fetch tất cả menu (không filter)
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

      const response = await axios.post(
        'https://localhost:7115/api/Menu/get-all-menu',
        requestBody
      );
      if (response.data) {
        setFoods(response.data.items || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching all menus:", error);
    }
  };

  // Hàm fetch menu theo 1 category (filter cột "mnuName" LIKE category)
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
        export: {
          chosenColumnNameList: {},
          pageName: "string"
        }
      };

      const response = await axios.post(
        'https://localhost:7115/api/Menu/get-all-menu',
        requestBody
      );
      if (response.data) {
        setFoods(response.data.items || []);
      }
    } catch (error) {
      console.error("Error fetching menus by category:", error);
    }
  };

  // Toggle khi bấm vào 1 filter
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // Bấm vào cùng category => bỏ filter
      setSelectedCategory(null);
      fetchAllMenus();
    } else {
      // Chọn filter mới
      setSelectedCategory(category);
      fetchMenusByCategory(category);
    }
  };

  // Nút “Clear” để xóa filter
  const handleClearFilter = () => {
    setSelectedCategory(null);
    fetchAllMenus();
  };

  // Nút NavItem
  const NavItem = ({ icon, to }) => {
    return (
      <div onClick={() => navigate(to)} className="nav-icon">
        {icon}
      </div>
    );
  };

  // Khi bấm vào thẻ => chuyển tới trang detailFood
  const handleFoodClick = (foodId) => {
    navigate(`/detail-food-screen/${foodId}`);
  };

  // Thay đổi trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className='home-screen-container'>
      {/* Logo + Table ID */}
      <div className='home-screen-header'>
        <img src={logo} alt='logo' />
        <h1>Table 1</h1>
      </div>

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
        {/* Pizza */}
        <Button
          className='home-screen-categories-btn'
          style={{
            backgroundColor: selectedCategory === 'Pizza' ? '#ffc9c9' : ''
          }}
          onClick={() => handleCategoryClick("Pizza")}
        >
          Pizza
        </Button>

        {/* Burger */}
        <Button
          className='home-screen-categories-btn'
          style={{
            backgroundColor: selectedCategory === 'Burger' ? '#ffc9c9' : ''
          }}
          onClick={() => handleCategoryClick("Burger")}
        >
          Burger
        </Button>

        {/* Desserts */}
        <Button
          className='home-screen-categories-btn'
          style={{
            backgroundColor: selectedCategory === 'Dessert' ? '#ffc9c9' : ''
          }}
          onClick={() => handleCategoryClick("Dessert")}
        >
          Desserts
        </Button>

        {/* Beverages */}
        <Button
          className='home-screen-categories-btn'
          style={{
            backgroundColor: selectedCategory === 'Beverage' ? '#ffc9c9' : ''
          }}
          onClick={() => handleCategoryClick("Beverage")}
        >
          Beverages
        </Button>

        {/* Noodles */}
        <Button
          className='home-screen-categories-btn'
          style={{
            backgroundColor: selectedCategory === 'Noodles' ? '#ffc9c9' : ''
          }}
          onClick={() => handleCategoryClick("Noodles")}
        >
          Noodles
        </Button>

        {/* Salad */}
        <Button
          className='home-screen-categories-btn'
          style={{
            backgroundColor: selectedCategory === 'Salad' ? '#ffc9c9' : ''
          }}
          onClick={() => handleCategoryClick("Salad")}
        >
          Salad
        </Button>

        {/* Nút “Clear” nằm đầu dãy, chỉ hiển thị khi đang có filter */}
        {selectedCategory && (
          <Button
            className='home-screen-categories-btn'
            style={{
              backgroundColor: '#ff6b6b',
              color: '#fff',
              marginRight: '8px'
            }}
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
            {/* Vẫn dùng FoodCard, bấm vào card => sang detail */}
            <FoodCard 
              food={{
                id: item.mnuId,
                name: item.mnuName,
                price: `S ${item.mnuPrice} `,
                description: item.mnuDescription,
                image: item.mnuImage
              }} 
            />

            {/* Icon giỏ hàng ở góc trên đã được xóa 
                (nếu muốn bạn có thể bỏ hoàn toàn hoặc comment lại) 
            */}
            {/* 
            <div 
              onClick={(e) => {
                e.stopPropagation();
                alert(`Thêm món ${item.mnuName} vào giỏ hàng!`);
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <FiShoppingCart size={20} color="#000" />
            </div> 
            */}
          </div>
        ))}
      </div>

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

      {/* Navbar dưới */}
      <div className="home-screen-navbar bottom-navbar">
        <div className="nav-icons-container left-icons">
          <Badge badgeContent={0} color="secondary"> 
            <NavItem to="/homescreen" icon={<IoHomeOutline size={28} />} />
          </Badge>
          <Badge badgeContent={3} color="secondary"> 
            <NavItem to="/detail-food-screen" icon={<IoMdNotificationsOutline size={28} />} />
          </Badge>
        </div>

        <div className="center-button">
          <IoMdQrScanner size={32} color="white" />
        </div>

        <div className="nav-icons-container right-icons">
          <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={28} />} />
          <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={28} />} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
