// ReservationSection.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // cung cấp các matcher như toBeInTheDocument()
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReservationSection from '../components/usercomponent/ReservationPageComponents/ReservationSection';

// 1. Mock axios để kiểm soát kết quả trả về
jest.mock('axios');

// 2. Mock SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('ReservationSection - Step 1: Check Availability', () => {
  beforeEach(() => {
    // Reset lại các mock trước mỗi bài test
    jest.clearAllMocks();
  });

  test('Hiển thị lỗi nếu chưa điền đủ các trường (startDate, endDate, countGuests)', async () => {
    render(
      <MemoryRouter>
        <ReservationSection />
      </MemoryRouter>
    );

    // Click button mà không điền dữ liệu
    const checkBtn = screen.getByRole('button', { name: /CHECK AVAILABILITY/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Error',
        'Please fill all fields: Start time, End time, Number of guests',
        'error'
      );
    });
  });

  test('Hiển thị lỗi nếu endDate <= startDate', async () => {
    render(
      <MemoryRouter>
        <ReservationSection />
      </MemoryRouter>
    );

    // Truy xuất các input thông qua data-testid
    const startDateInput = screen.getByTestId('startDate');
    const endDateInput = screen.getByTestId('endDate');
    const guestsInput = screen.getByTestId('countGuests');

    fireEvent.change(startDateInput, { target: { value: '2025-03-28T20:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-03-28T18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const checkBtn = screen.getByRole('button', { name: /CHECK AVAILABILITY/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Error',
        'End time must be after Start time',
        'error'
      );
    });
  });

  test('Hiển thị lỗi nếu số khách <= 0', async () => {
    render(
      <MemoryRouter>
        <ReservationSection />
      </MemoryRouter>
    );

    const startDateInput = screen.getByTestId('startDate');
    const endDateInput = screen.getByTestId('endDate');
    const guestsInput = screen.getByTestId('countGuests');

    fireEvent.change(startDateInput, { target: { value: '2025-03-28T18:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-03-28T20:00' } });
    fireEvent.change(guestsInput, { target: { value: '0' } });

    const checkBtn = screen.getByRole('button', { name: /CHECK AVAILABILITY/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Error',
        'Number of guests must be > 0',
        'error'
      );
    });
  });

  test('Hiển thị thông báo nếu không có bàn trống (No tables)', async () => {
    // Giả lập API trả về success nhưng data rỗng
    axios.post.mockResolvedValueOnce({
      data: {
        statusCode: 'Success',
        data: {
          data: [], // mảng rỗng => không có bàn
        },
      },
    });

    render(
      <MemoryRouter>
        <ReservationSection />
      </MemoryRouter>
    );

    const startDateInput = screen.getByTestId('startDate');
    const endDateInput = screen.getByTestId('endDate');
    const guestsInput = screen.getByTestId('countGuests');

    fireEvent.change(startDateInput, { target: { value: '2025-03-28T18:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-03-28T20:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const checkBtn = screen.getByRole('button', { name: /CHECK AVAILABILITY/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'No tables',
        'No tables available for this time',
        'info'
      );
    });
  });

  test('Chuyển sang Step 2 nếu có bàn trống', async () => {
    // Giả lập API trả về 2 bàn
    axios.post.mockResolvedValueOnce({
      data: {
        statusCode: 'Success',
        data: {
          data: [
            { tbiId: 'tbl001', tbiTableNumber: 1 },
            { tbiId: 'tbl002', tbiTableNumber: 5 },
          ],
        },
      },
    });

    render(
      <MemoryRouter>
        <ReservationSection />
      </MemoryRouter>
    );

    const startDateInput = screen.getByTestId('startDate');
    const endDateInput = screen.getByTestId('endDate');
    const guestsInput = screen.getByTestId('countGuests');

    fireEvent.change(startDateInput, { target: { value: '2025-03-28T18:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-03-28T20:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const checkBtn = screen.getByRole('button', { name: /CHECK AVAILABILITY/i });
    fireEvent.click(checkBtn);

    // Sau khi gọi API, Step = 2 => hiển thị danh sách bàn (các nút có chứa từ "Table")
    const tableButtons = await screen.findAllByRole('button', { name: /Table/i });
    expect(tableButtons).toHaveLength(2);
    expect(tableButtons[0]).toHaveTextContent('Table 1');
    expect(tableButtons[1]).toHaveTextContent('Table 5');
  });

  test('Hiển thị lỗi nếu API trả về statusCode != "Success"', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        statusCode: 'Error',
        message: 'Cannot get available tables',
      },
    });

    render(
      <MemoryRouter>
        <ReservationSection />
      </MemoryRouter>
    );

    const startDateInput = screen.getByTestId('startDate');
    const endDateInput = screen.getByTestId('endDate');
    const guestsInput = screen.getByTestId('countGuests');

    fireEvent.change(startDateInput, { target: { value: '2025-03-28T18:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-03-28T20:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const checkBtn = screen.getByRole('button', { name: /CHECK AVAILABILITY/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Error',
        'Cannot get available tables',
        'error'
      );
    });
  });

  test('Hiển thị lỗi nếu API bị ném exception (lỗi mạng, v.v.)', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter>
        <ReservationSection />
      </MemoryRouter>
    );

    const startDateInput = screen.getByTestId('startDate');
    const endDateInput = screen.getByTestId('endDate');
    const guestsInput = screen.getByTestId('countGuests');

    fireEvent.change(startDateInput, { target: { value: '2025-03-28T18:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-03-28T20:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const checkBtn = screen.getByRole('button', { name: /CHECK AVAILABILITY/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Error',
        'Error checking table availability',
        'error'
      );
    });
  });
});
