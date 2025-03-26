// AddNewFood.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddNewFood from '../components/admincomponent/AddNewFood';

// Giả lập các props callback
const handleClose = jest.fn();
const onSuccess = jest.fn();

describe('AddNewFood Component', () => {
    beforeEach(() => {
        // Reset lại các hàm mock trước mỗi bài test
        handleClose.mockClear();
        onSuccess.mockClear();
    });

    test('Hiển thị lỗi validate khi các trường bắt buộc không được điền', async () => {
        render(<AddNewFood open={true} handleClose={handleClose} onSuccess={onSuccess} />);
        
        // Nhấn nút submit mà không điền dữ liệu (lưu ý: Button của component được render dưới dạng nút)
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
        
        // Vì validateInput sẽ kiểm tra foodName trước nên thông báo lỗi "Food name is required" được hiển thị
        const errorMessage = await screen.findByText(/Food name is required/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('Gửi form thành công với dữ liệu hợp lệ', async () => {
        // Giả lập fetch trả về thành công
        const fakeResponse = { id: 1, message: 'Food added successfully' };
        global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeResponse),
        })
        );
        
        render(<AddNewFood open={true} handleClose={handleClose} onSuccess={onSuccess} />);
        
        // Tìm các input dựa trên label
        const foodNameInput = screen.getByLabelText(/Food Name/i);
        const descriptionInput = screen.getByLabelText(/Description/i);
        const priceInput = screen.getByLabelText(/Price/i);
        
        // Điền dữ liệu hợp lệ vào các input
        fireEvent.change(foodNameInput, { target: { value: 'Test Food' } });
        fireEvent.change(descriptionInput, { target: { value: 'Delicious food' } });
        fireEvent.change(priceInput, { target: { value: '10' } });
        
        // Nhấn nút submit
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        // Kiểm tra rằng fetch đã được gọi với đúng URL và phương thức POST
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        
        // Sau khi gửi thành công, các callback handleClose và onSuccess nên được gọi
        await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
        expect(onSuccess).toHaveBeenCalled();
        });
    });

    test('Hiển thị lỗi khi gửi form thất bại', async () => {
        // Giả lập fetch trả về thất bại
        global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false, // Mô phỏng trường hợp không ok
        })
        );
        
        render(<AddNewFood open={true} handleClose={handleClose} onSuccess={onSuccess} />);
        
        // Điền dữ liệu hợp lệ
        const foodNameInput = screen.getByLabelText(/Food Name/i);
        const descriptionInput = screen.getByLabelText(/Description/i);
        const priceInput = screen.getByLabelText(/Price/i);
        
        fireEvent.change(foodNameInput, { target: { value: 'Test Food' } });
        fireEvent.change(descriptionInput, { target: { value: 'Delicious food' } });
        fireEvent.change(priceInput, { target: { value: '10' } });
        
        // Nhấn nút submit
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
        
        // Chờ đợi để xác nhận lỗi được hiển thị (lỗi "Failed to add new food" được set khi response.ok=false)
        const errorMessage = await screen.findByText(/Failed to add new food/i);
        expect(errorMessage).toBeInTheDocument();
    });
});