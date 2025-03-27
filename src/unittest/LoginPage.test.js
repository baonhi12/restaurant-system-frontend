// src/unittest/LoginPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/userpage/LoginPage';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate để theo dõi chuyển hướng
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage - Functions and Logic', () => {
  // Reset mock và localStorage trước mỗi test
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test('Xử lý đăng nhập thành công (role Admin)', async () => {
    // Giả lập fetch trả về kết quả thành công với token và role là "Admin"
    const fakeResponse = {
      ok: true,
      json: async () => ({
        statusCode: 'Success',
        data: { token: 'fake-token', role: 'Admin' },
      }),
    };
    global.fetch = jest.fn(() => Promise.resolve(fakeResponse));

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Nhập thông tin đăng nhập
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'admin@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    // Gửi form bằng cách nhấn nút Login
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Đợi cho fetch được gọi và xử lý xong
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Kiểm tra rằng token và role đã được lưu vào localStorage
    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(localStorage.getItem('role')).toBe('Admin');

    // Kiểm tra chuyển hướng đến "/dashboard"
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('Xử lý đăng nhập thất bại và hiển thị thông báo lỗi', async () => {
    // Giả lập fetch trả về kết quả thất bại
    const fakeResponse = {
      ok: false,
      json: async () => ({}),
    };
    global.fetch = jest.fn(() => Promise.resolve(fakeResponse));

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Nhập thông tin đăng nhập không hợp lệ
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'wrongpassword' },
    });

    // Gửi form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Đợi để thông báo lỗi được hiển thị trên giao diện
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password\./i)).toBeInTheDocument();
    });
  });
});
