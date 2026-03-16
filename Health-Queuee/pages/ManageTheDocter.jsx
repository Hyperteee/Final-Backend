import React, { useState } from 'react';

import { useTranslation } from "react-i18next";

const BookingDetailsPopup = ({ onClose, booking }) => {
    const exampleBookingData = [
        { id: 1, name: "นายคมซาน สายลม", details: "Details" },
        { id: 2, name: "นายคมซาน สายลม", phone: "095-777-8940", time: "16.00-17.00", notes: "ปวดหัว,วิงเวียนศรีษะ" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-xl w-11/12 max-w-lg">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-3xl font-light">
                        X
                    </button>
                </div>
                
                <table className="w-full mt-2 border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-2 text-left w-1/12">ID</th>
                            <th className="py-2 px-2 text-left w-6/12">ชื่อคนไข้</th>
                            <th className="py-2 px-2 text-left w-5/12">รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exampleBookingData.map((item) => (
                            <tr key={item.id} className="border-b last:border-b-0">
                                <td className="py-2 px-2 align-top">{item.id}</td>
                                <td className="py-2 px-2 align-top">
                                    {item.name}
                                    {item.phone && (
                                        <div className="text-sm mt-1 space-y-1">
                                            <p>เบอร์: {item.phone}</p>
                                            <p>เวลา: {item.time}</p>
                                            <p>รายละเอียด: {item.notes}</p>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ManageTheDocter = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
    const calendarRows = 5;
    const calendarData = [
        [null, null, null, null, 
         { slot: 'ว่าง 11:00น', color: 'bg-green-200 text-green-800' }, 
         { slot: 'เต็ม', color: 'bg-red-200 text-green-800' }, 
         { slot: 'ว่าง 17:00น', color: 'bg-green-200 text-green-800' }],
        [null, 
         { slot: 'ว่าง 9:00น', color: 'bg-green-200 text-green-800' }, 
         null, null, null, null, null],
        ...Array(calendarRows - 2).fill(Array(7).fill(null))
    ];

    const handleSlotClick = (slot) => {
        if (slot) {
            setIsPopupOpen(true);
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-center space-x-4 mb-8">
                <button className="px-8 py-2 border border-gray-300 rounded-full shadow-md bg-white flex items-center hover:bg-gray-100">
                    <span className="text-lg font-semibold">แผนก</span>
                    <span className="ml-2 text-sm">&#9660;</span>
                </button>
                <button className="px-8 py-2 border border-gray-300 rounded-full shadow-lg bg-white flex items-center hover:bg-gray-100">
                    <span className="text-lg font-semibold">รายชื่อหมอ</span>
                    <span className="ml-2 text-sm">&#9660;</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
                <div className="flex items-start mb-6 border-b pb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 border border-gray-300">
                    </div>
                    <div className="flex-grow">
                        <p className="text-xl font-bold">ชื่อ - นามสกุลแพทย์</p>
                        <p className="text-gray-600">แผนก</p>
                    </div>
                    <button className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded-full hover:bg-red-50">
                        ปิดรับจองออนไลน์
                    </button>
                </div>

                <h3 className="text-lg font-semibold mb-2">ประวัติการศึกษา</h3>
                <ul className="list-disc ml-5 mb-4 text-gray-700">
                    <li>ปริญญาตรี ทันตแพทยศาสตร์บัณฑิต มหาวิทยาลัยขอนแก่น</li>
                    <li>ปริญญาโท ศิลปศาสตร์ช่องปากและแมกซิสโลเฟเชียล จุฬาลงกรณ์มหาวิทยาลัย</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">ประวัติการทำงาน</h3>
                <ul className="list-disc ml-5 mb-6 text-gray-700">
                    <li>2560 - ปัจจุบัน รพ.--------------</li>
                    <li>2555 - 2560 รพ.--------------</li>
                </ul>

                <div className="bg-gray-100 inline-block px-4 py-1 rounded-md mb-4 text-sm font-semibold">
                    พฤศจิกายน 68
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                {daysOfWeek.map(day => (
                                    <th key={day} className="border border-gray-300 py-3 text-center text-sm font-medium w-1/7">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {calendarData.map((week, weekIndex) => (
                                <tr key={weekIndex}>
                                    {week.map((slot, dayIndex) => (
                                        <td 
                                            key={dayIndex} 
                                            className="border border-gray-300 p-2 h-20 align-top"
                                            onClick={() => handleSlotClick(slot)}
                                        >
                                            {slot && (
                                                <div 
                                                    className={`text-xs p-1 rounded-md cursor-pointer text-center ${slot.color}`}
                                                >
                                                    {slot.slot}
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isPopupOpen && <BookingDetailsPopup onClose={() => setIsPopupOpen(false)} />}
        </div>
    );
}

export default ManageTheDocter;