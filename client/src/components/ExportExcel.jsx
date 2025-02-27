import React from 'react';
import * as XLSX from 'xlsx';

const ExportExcel = () => {
    const handleExport = () => {
        // Sample data similar to the provided schedule
        const data = [
            ["BỘ GIÁO DỤC VÀ ĐÀO TẠO", "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", "", "", ""],
            ["TRƯỜNG CAO ĐẲNG SƯ PHẠM TRUNG ƯƠNG", "Độc lập - Tự do - Hạnh phúc", "", "", ""],
            ["KẾ HOẠCH HỌC TẬP TOÀN KHÓA", "Khóa: 2024 - 2025", "", "", ""],
            ["Ngành: Sư phạm Mầm non", "Trình độ: CĐLT", "", "", ""],
            ["Học kỳ", "STT", "Học phần", "Số tín chỉ", "Thời gian", "Trực tiếp"],
            ["", "", "", "", "", ""],
            ["I", "1", "Tổ chức các hoạt động âm nhạc trong trường MN", "40", "29,31/7; 1,2/8/2024", "28/7; 4,11/8/2024"],
            ["", "2", "Tổ chức trò chơi", "40", "19,21,23/8/2024", "18/8; 8,9/2024"],
            ["", "3", "Tổ chức các hoạt động phát triển ngôn ngữ cho trẻ trong trường MN", "40", "16,18,20/9/2024", ""],
            ["", "4", "Tổ chức các hoạt động phát triển thể chất cho trẻ trong trường MN", "40", "7,9,11/10/2024", "6,13,20/10/2024"],
            ["", "5", "Lý luận chính trị", "40", "28,30/10; 4,6,8/11/2024", "27/10; 3,10/11/2024"],
            ["", "6", "Giáo dục hòa nhập", "40", "13,15,17/12/2024", "1,8,15/12/2024"],
            ["", "7", "Khoa học và trẻ mầm non", "40", "23,25,27/12/2024", "22,29/12/2024; 5/1/2025"],
            ["II", "1", "Ứng dụng công nghệ thông tin trong dạy học mầm non", "40", "17,19,21/2/2025", "16,23/2; 2/3/2025"],
            ["", "2", "Tổ chức các hoạt động làm quen với văn học", "40", "9,11,13/3/2025", "8,15,22/3/2025"],
            ["", "3", "Tiếng Anh", "40", "23,25,27/3/2025", "22,29/3/2025; 5/4/2025"],
            ["", "4", "Toán học cho trẻ mầm non", "40", "31/3; 2,4/4/2025", "30/3; 6,13/4/2025"],
            ["", "5", "Quản sát, đánh giá giáo dục mầm non", "40", "21,23,25/4/2025", "20,27/4; 4/5/2025"],
            ["", "6", "Ứng dụng đổi mới phương pháp trong giáo dục trẻ mầm non", "40", "5,7,9/5/2025", "4,11,18/5/2025"],
            ["", "7", "Giáo dục STEM trong trường mầm non", "40", "12,14,16/5/2025", "11,18,25/5/2025"],
            ["", "8", "Hoạt động thực tế KLTN 2", "40", "7,9,11/4/2025", ""],
            ["", "9", "Hoàn thiện KLTN 1", "40", "15,17,19/5/2025", ""],
            ["", "Dự kiến thi tốt nghiệp", "", "", "23-24/8/2025", ""],
            ["", "Thời gian học trực tiếp: Sáng từ 7h30 đến 12h00; Chiều từ 13h30 đến 18h00", "", "", "", ""],
            ["", "Thời gian thi kết thúc học phần: Tối từ 19h30 đến 22h00", "", "", "", ""],
            ["", "Địa điểm học: Ngõ 212 Hoàng Quốc Việt, Cầu Giấy, Hà Nội", "", "", "", ""],
            ["", "GVCN: Hoàng Thị Hiền", "", "", "", ""],
        ];

        // Create a new workbook and a worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Adjust column widths for better visibility
        worksheet['!cols'] = [
            {wch: 5},   // Column A
            {wch: 5},   // Column B
            {wch: 50},  // Column C
            {wch: 10},  // Column D
            {wch: 25},  // Column E
            {wch: 25}   // Column F
        ];

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Kế hoạch học tập");

        // Write the workbook to a file
        XLSX.writeFile(workbook, "Ke_hoach_hoc_tap_toan_khoa.xlsx");
    };

    return (
        <div>
            <button onClick={handleExport}>Export to Excel</button>
        </div>
    );
};

export default ExportExcel;