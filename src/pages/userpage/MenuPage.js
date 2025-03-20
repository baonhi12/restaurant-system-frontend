// src/pages/MenuPage.js
import React, { useEffect, useState } from 'react';
import MenuTopSection from '../../components/usercomponent/MenuPage/MenuTopSection';
import MenuCategorySection from '../../components/usercomponent/MenuPage/MenuCategorySection';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7115/api/Menu/get_all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "pageIndex": 1,
        "pageSize": 5,
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
        }
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  return (
    <div>
      <MenuTopSection />
      <MenuCategorySection items={menuItems} />
    </div>
  );
}

export default MenuPage;
