import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X } from 'lucide-react';

const ManageTheDocter = () => {
    const [doctors, setDoctors] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' หรือ 'edit'
    const [currentDoctor, setCurrentDoctor] = useState({
        first_name: '',
        last_name: '',
        prefix: '',
        hospital_id: '',
        specialty_id: '',
        specialization: ''
    });

    // ดึงข้อมูลรายชื่อแพทย์ โรงพยาบาล และความเชี่ยวชาญจาก API
    const fetchData = async () => {
        try {
            const docRes = await fetch('http://localhost:3000/data/getDoctors');
            const docData = await docRes.json();
            if(docData.doctors) setDoctors(docData.doctors);

            const hosRes = await fetch('http://localhost:3000/data/getHospital');
            const hosData = await hosRes.json();
            if(hosData.hospitals) setHospitals(hosData.hospitals);

            const specRes = await fetch('http://localhost:3000/data/getSpecialties');
            const specData = await specRes.json();
            if(specData.specialties) setSpecialties(specData.specialties);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ฟังก์ชันจัดการฟอร์ม
    const handleInputChange = (e) => {
        setCurrentDoctor({ ...currentDoctor, [e.target.name]: e.target.value });
    };

    // เปิด Modal แบบเพิ่มคนใหม่
    const openAddModal = () => {
        setModalMode('add');
        setCurrentDoctor({
            first_name: '',
            last_name: '',
            prefix: '',
            hospital_id: '',
            specialty_id: '',
            specialization: ''
        });
        setIsModalOpen(true);
    };

    // เปิด Modal แบบแก้ไข
    const openEditModal = (doc) => {
        setModalMode('edit');
        setCurrentDoctor(doc);
        setIsModalOpen(true);
    };

    // ยืนยันการลบแพทย์
    const handleDelete = async (id) => {
        if (!window.confirm('คุณต้องการลบรายชื่อแพทย์ท่านนี้ใช่หรือไม่?')) return;
        try {
            const res = await fetch(`http://localhost:3000/data/doctors/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                alert('ลบรายชื่อสำเร็จ');
                fetchData();
            }
        } catch (err) {
            console.error("Error deleting:", err);
            alert('เกิดข้อผิดพลาดในการลบรายชื่อ');
        }
    };

    // ส่งฟอร์มบันทึก (POST สำหรับเพิ่ม / PUT สำหรับแก้ไข)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = modalMode === 'add' 
                ? 'http://localhost:3000/data/doctors' 
                : `http://localhost:3000/data/doctors/${currentDoctor.id}`;
            const method = modalMode === 'add' ? 'POST' : 'PUT';

            // สร้าง Payload ตรวจสอบให้แน่ใจว่า specialty_id เป็นตัวเลข
            const payload = {
                ...currentDoctor,
                specialty_id: parseInt(currentDoctor.specialty_id, 10)
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(modalMode === 'add' ? 'เพิ่มรายชื่อสำเร็จ' : 'อัปเดตข้อมูลสำเร็จ');
                setIsModalOpen(false);
                fetchData();
            } else {
                const data = await res.json();
                alert('เกิดข้อผิดพลาด: ' + data.message);
            }
        } catch (err) {
            console.error("Error saving:", err);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">จัดการรายชื่อแพทย์</h1>
                        <p className="text-gray-500 text-sm mt-1">ระบบเพิ่ม ลด แก้ไข ข้อมูลรายชื่อแพทย์ในระบบ</p>
                    </div>
                    <button 
                        onClick={openAddModal}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Plus size={20} /> เพิ่มแพทย์ใหม่
                    </button>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ-นามสกุล</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">โรงพยาบาล</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ความเชี่ยวชาญ</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {doctors.length > 0 ? doctors.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {doc.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {doc.prefix || ''} {doc.first_name} {doc.last_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {doc.hospital_name || doc.hospital_id || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {doc.specialty_name || doc.specialty_id || '-'}
                                            {doc.specialization && <span className="block text-xs text-gray-400">({doc.specialization})</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => openEditModal(doc)}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-md transition-colors"
                                                    title="แก้ไข"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(doc.id)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md transition-colors"
                                                    title="ลบ"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">ไม่พบข้อมูลแพทย์</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for Add / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                {modalMode === 'add' ? 'เพิ่มรายชื่อแพทย์ใหม่' : 'แก้ไขข้อมูลแพทย์'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">คำนำหน้าชื่อ</label>
                                    <select 
                                        name="prefix" 
                                        value={currentDoctor.prefix || ''} 
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">เลือกคำนำหน้า</option>
                                        <option value="นพ.">นพ. (นายแพทย์)</option>
                                        <option value="พญ.">พญ. (แพทย์หญิง)</option>
                                        <option value="ทพ.">ทพ. (ทันตแพทย์)</option>
                                        <option value="ทญ.">ทญ. (ทันตแพทย์หญิง)</option>
                                    </select>
                                </div>

                                <div className="space-y-2 hidden md:block"></div> {/* Spacer */}

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">ชื่อ <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="first_name" 
                                        required 
                                        value={currentDoctor.first_name || ''} 
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="ชื่อจริง"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">นามสกุล <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="last_name" 
                                        required 
                                        value={currentDoctor.last_name || ''} 
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="นามสกุล"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">โรงพยาบาลประจำ</label>
                                    <select 
                                        name="hospital_id" 
                                        value={currentDoctor.hospital_id || ''} 
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">เลือกโรงพยาบาล</option>
                                        {hospitals.map(h => (
                                            <option key={h.id} value={h.hospital_id}>{h.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">ความเชี่ยวชาญ <span className="text-red-500">*</span></label>
                                    <select 
                                        name="specialty_id" 
                                        required
                                        value={currentDoctor.specialty_id || ''} 
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">เลือกความเชี่ยวชาญ</option>
                                        {specialties.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">รายละเอียดเฉพาะสาขา (Optional)</label>
                                    <input 
                                        type="text" 
                                        name="specialization" 
                                        value={currentDoctor.specialization || ''} 
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="เช่น ศัลยกรรมกระดูกและข้อ, อายุรกรรมโรคหัวใจ"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-200">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    ยกเลิก
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                                >
                                    {modalMode === 'add' ? 'บันทึกข้อมูล' : 'อัปเดตข้อมูล'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTheDocter;