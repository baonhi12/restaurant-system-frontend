describe('Quy trình đặt món trên mobile', () => {
    // --- 1. Kiểm thử HomeScreen ---
    context('HomeScreen', () => {
        it('Hiển thị đúng thông tin và chuyển sang trang chi tiết khi click vào thẻ món ăn', () => {
            // Truy cập trang HomeScreen
            cy.visit('http://localhost:3000/homescreen');
    
            // Kiểm tra header có logo và Table ID
            cy.get('.home-screen-header').should('contain', 'Table 1');
    
            // Kiểm tra search bar có placeholder "Search here ..."
            cy.get('.home-screen-seacrh input')
            .should('have.attr', 'placeholder', 'Search here ...');
    
            // Kiểm tra các nút filter xuất hiện (ví dụ: Pizza, Burger, Desserts, …)
            cy.get('.home-screen-categories-btn').contains('Pizza');
            cy.get('.home-screen-categories-btn').contains('Burger');
            cy.get('.home-screen-categories-btn').contains('Desserts');
            cy.get('.home-screen-categories-btn').contains('Beverages');
            cy.get('.home-screen-categories-btn').contains('Noodles');
            cy.get('.home-screen-categories-btn').contains('Salad');
    
            // Kiểm tra danh sách món ăn hiển thị (Food Cards)
            cy.get('.home-screen-food-cards').within(() => {
            // Mỗi card có class "food-card"
            cy.get('.food-card').its('length').should('be.gt', 0);
            });
    
            // Giả lập click vào hình ảnh của thẻ món ăn đầu tiên để chuyển sang trang chi tiết
            cy.get('.home-screen-food-cards .food-card').first().within(() => {
            cy.get('.food-card-img img').click();
            });
            // Sau khi click, URL phải chứa chuỗi "/detail-food-screen/"
            cy.url().should('include', '/detail-food-screen/');
        });
    });
  
    // --- 2. Kiểm thử DetailFood ---
    context('DetailFood', () => {
        it('Hiển thị thông tin chi tiết món ăn, cho phép tăng giảm số lượng và thêm vào giỏ hàng', () => {
            // Bước 1: Gọi API lấy danh sách menu (điều chỉnh requestBody nếu cần)
            cy.request({
                method: 'POST',
                url: 'https://localhost:7115/api/Menu/get-all-menu',
                body: {
                    pageIndex: 1,
                    pageSize: 10,
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
                }
            }).then((response) => {
              // Giả sử dữ liệu trả về nằm ở response.body.items và mỗi item có trường mnuId
                expect(response.status).to.eq(200);
                const items = response.body.items;
                expect(items).to.be.an('array').and.have.length.greaterThan(0);
                
                // Lấy id của món ăn đầu tiên
                const foodId = items[0].mnuId;
            
                // Bước 2: Dùng foodId để truy cập trang chi tiết của món ăn
                cy.visit(`http://localhost:3000/detail-food-screen/${foodId}`);
            
                // Kiểm tra header có nút back và tiêu đề "Detail Food"
                cy.get('.detail-food-header').should('be.visible');
                cy.get('.detail-food-header-title').should('contain', 'Detail Food');
            
                // Kiểm tra thông tin chi tiết món ăn được hiển thị (tùy chỉnh theo giao diện của bạn)
                cy.get('.detail-food-card-info').within(() => {
                    cy.get('h3').should('exist');
                    cy.get('p').should('exist');
                });
            
                // Kiểm tra khu vực điều chỉnh số lượng
                cy.get('.detail-food-card-action-quantity').within(() => {
                    // Số lượng ban đầu là 1
                    cy.get('p').first().should('contain', '1');
                    // Nhấn nút tăng số lượng
                    cy.get('.detail-food-card-action-quantity-icon').last().click();
                    // Kiểm tra số lượng tăng lên 2
                    cy.get('p').first().should('contain', '2');
                });
            
                // Giả lập bắt sự kiện alert khi thêm vào giỏ hàng
                cy.window().then((win) => {
                    cy.stub(win, 'alert').as('alertStub');
                });
                // Click vào nút "Add to Cart"
                cy.get('.detail-food-card-action-btn').contains('Add to Cart').click();
                // Kiểm tra alert thông báo món đã được thêm vào giỏ hàng
                cy.get('@alertStub').should('have.been.calledWithMatch', /Đã thêm món/);
            });
        });
    });
  
    // --- 3. Kiểm thử OrderCart ---
    context('OrderCart', () => {
      it('Hiển thị giỏ hàng, cho phép chỉnh sửa số lượng và tiến hành đặt món', () => {
        cy.visit('http://localhost:3000/order-cart-screen');
  
        // Kiểm tra header hiển thị tiêu đề "Order Cart"
        cy.get('.order-cart-header-title').should('contain', 'Order Cart');
  
        // Kiểm tra xem nếu có món trong giỏ, chúng xuất hiện dưới dạng OrderCard
        cy.get('.order-cart-card').then(($container) => {
            if ($container.find('.order-cart').length > 0) {
                // Kiểm tra thông tin của món đầu tiên trong giỏ
                cy.wrap($container).find('.order-cart').first().within(() => {
                    cy.get('.order-cart-info').should('be.visible');
                    // Lấy số lượng hiện tại
                    cy.get('.order-cart-action-quantity-number').then(($num) => {
                        const currentQuantity = parseInt($num.text());
                        // Nếu số lượng > 1, giảm số lượng
                        if (currentQuantity > 1) {
                            cy.get('.order-cart-action-quantity-icon').first().click();
                            cy.get('.order-cart-action-quantity-number')
                                .should(($newNum) => {
                                expect(parseInt($newNum.text())).to.eq(currentQuantity - 1);
                                }
                            );
                        } else {
                            // Nếu số lượng bằng 1, nhấn nút giảm sẽ yêu cầu xóa (modal delete xuất hiện)
                            cy.get('.order-cart-action-quantity-icon').first().click();
                            // Kiểm tra modal xác nhận xóa (giả sử có component DeleteForm hiển thị nút confirm hoặc text nào đó)
                            cy.contains('Are you sure').should('exist');
                            // Sau đó đóng modal (giả lập hành động người dùng)
                            cy.get('button').contains('Cancel').click();
                        }
                    });
                });
                // Giả lập bắt alert khi đặt món (Order Now)
                cy.window().then((win) => {
                    cy.stub(win, 'alert').as('orderAlert');
                });
                // Click vào nút "Order Now" (nút có class "detail-food-card-action-btn" và text "Order Now")
                cy.get('.detail-food-card-action-btn').contains('Order Now').click();
                cy.get('@orderAlert').should('have.been.calledWithMatch', /Đặt món thành công/);
            } else {
                // Nếu giỏ hàng trống, hiển thị text "No order food"
                cy.get('.order-cart-card').should('contain', 'No order food');
            }
        });
      });
    });
  
    // --- 4. Kiểm thử OrderedList ---
    context('OrderedList', () => {
        it('Hiển thị lịch sử đặt món', () => {
            cy.visit('http://localhost:3000/ordered-list-cart-screen');
    
            // Kiểm tra header tiêu đề "Ordered List"
            cy.get('.order-cart-header-title').should('contain', 'Ordered List');
    
            // Kiểm tra danh sách đơn hàng: nếu có đơn thì các OrderCard (class "order-cart") xuất hiện
            cy.get('.ordered-list-card').then(($list) => {
                if ($list.find('.order-cart').length > 0) {
                    cy.wrap($list)
                    .find('.order-cart')
                    .its('length')
                    .should('be.gt', 0);
                } else {
                    // Nếu không có đơn, hiển thị thông báo "No orders yet."
                    cy.get('.ordered-list-card').should('contain', 'No orders yet.');
                }
            });
        });
    });
});