// src/pages/MenuPage.js
import React, { useEffect, useState } from 'react';
import MenuTopSection from '../../components/usercomponent/MenuPage/MenuTopSection';
import MenuCategorySection from '../../components/usercomponent/MenuPage/MenuCategorySection';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8; // Số item trên 1 trang (có thể thay đổi)

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Tính chỉ số hiển thị của item theo trang hiện tại
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  // Sử dụng menuItems thay cho items
  const currentItems = menuItems.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý khi người dùng chuyển trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Hàm fetch dữ liệu, áp dụng filter nếu có
  const fetchMenus = async (page = 1, category = null) => {
    try {
      const requestBody = {
        pageIndex: page,
        pageSize: pageSize,
        filterColumns: category
          ? [
              {
                searchColumns: ["mnuName"],
                searchTerms: [category],
                operator: 5,
              },
            ]
          : [
              {
                searchColumns: [],
                searchTerms: [],
                operator: 5,
              },
            ],
        sortColumnsDictionary: {},
        filterRangeColumns: [],
        filterOption: 0,
        export: {
          chosenColumnNameList: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
          pageName: "string",
        },
      };

      const response = await axios.post(
        'https://localhost/api/Menu/get-all-menu',
        requestBody
      );
      if (response.data) {
        setMenuItems(response.data.items || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };
  
  useEffect(() => {
    fetch('https://localhost/api/Menu/get-all-menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "pageIndex": currentPage,
        "pageSize": pageSize,
        "filterColumns": [
          {
            "searchColumns": [],
            "searchTerms": [],
            "operator": 5
          }
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
      .then(response => response.json())
      .then(data => {
        if (data && data.items) {
          setMenuItems(data.items);
          // Sử dụng data.totalPages thay vì response.data.totalPages
          setTotalPages(data.totalPages || 1);
        }
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, [currentPage]);

  useEffect(() => {
    fetchMenus(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  // Xử lý khi người dùng click vào một category
  const handleCategoryClick = (category) => {
    // Nếu click lại category đã chọn thì bỏ filter
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setCurrentPage(1);
    } else {
      setSelectedCategory(category);
      setCurrentPage(1);
    }
  };

  // Xử lý nút "Clear" để xóa filter
  const handleClearFilter = () => {
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <div>
      <MenuTopSection />
      <MenuCategorySection 
        items={menuItems} 
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        onClearFilter={handleClearFilter}
      />

      {/* Phần phân trang */}
      <div style={styles.pagination}>
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
  );
}

export default MenuPage;

const styles = {
  pagination: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
};