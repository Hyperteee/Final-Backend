
// import React, { useState, useEffect, useMemo } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import hospitalData from '../src/data/listhospital';
// import { useNavigate } from 'react-router';
// import { Modal, Button, Form } from 'react-bootstrap';
// export default function ManagePatients() {
//     const [users, setUsers] = useState([]);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [activeTab, setActiveTab] = useState('pending');
//     const [selectedProvince, setSelectedProvince] = useState(null)
//     const [allowHospital, setAllowHospital] = useState([])
//     const [promotingUserId, setPromotingUserId] = useState(null)
//     const [showPromoteModal, setShowPromoteModal] = useState(false)
//     const [scopeType, setScopeType] = useState('all')
//     const navigate = useNavigate()
//     useEffect(() => {
//         const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//         setUsers(storedUsers);
//         const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
//         setCurrentUser(loggedInUser);

//     }, []);

//     const provinceList = useMemo(() => {
//         const provinces = [...new Set(hospitalData.map(h => h.state))];
//         return provinces.sort();
//     }, [])

//     const hospitalList = useMemo(() => {
//         let list = hospitalData;
//         if (selectedProvince) {
//             return list.filter((hospital) => hospital.state === selectedProvince);
//         }
//         return list;
//     }, [selectedProvince])


//     const handleApprove = (id) => {
//         const updatedUsers = users.map((user) => {
//             if (user.userId === id) return { ...user, role: 'user' };
//             return user;
//         });
//         saveUsers(updatedUsers);
//     };

//     const openPromoteModal = (id) => {
//         setPromotingUserId(id);
//         setScopeType('all');

//         setSelectedProvince(null);
//         setAllowHospital(null);

//         setShowPromoteModal(true);
//     }
//     const handleConfirmPromote = () => {
//         const updatedUsers = users.map((user) => {
//             if (user.userId === promotingUserId) {
//                 return {
//                     ...user,
//                     role: 'admin',
//                     adminScope: {
//                         type: scopeType,
//                         value: scopeType === 'province' ? selectedProvince : (scopeType === 'hospital' ? allowHospital : '')
//                     }
//                 };
//             }
//             return user;
//         })

//         saveUsers(updatedUsers);
//         setShowPromoteModal(false);
//     }
//     const renderScopeBadge = (user) => {
//         if (user.role !== 'admin' || !user.adminScope) return null;
//         const { type, value } = user.adminScope;
//         if (type === 'all') return <span className="badge bg-primary ms-1">ทั้งหมด</span>;
//         if (type === 'province') return <span className="badge bg-info text-black ms-1">จ.{value}</span>;
//         if (type === 'hospital') {
//             const hospName = hospitalData.find(h => h.id === value)?.name || value;
//             return <span className="badge bg-warning text-black ms-1">รพ.{hospName}</span>;
//         }
//         return null
//     }


//     const handleDemoteToUser = (id) => {
//         if (window.confirm("ต้องการลดขั้น Admin คนนี้กลับเป็น User หรือไม่?")) {
//             const updatedUsers = users.map((user) => {
//                 if (user.userId === id) return { ...user, role: 'user' };
//                 return user;
//             });
//             saveUsers(updatedUsers);
//         }
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("คุณต้องการลบข้อมูลผู้ใช้งานนี้ใช่หรือไม่?")) {
//             const updatedUsers = users.filter((user) => user.userId !== id);
//             saveUsers(updatedUsers);
//         }
//     };

//     const saveUsers = (data) => {
//         setUsers(data);
//         localStorage.setItem('users', JSON.stringify(data));
//     };

//     const isSuperAdmin = currentUser?.role === 'super_admin';

//     const filteredUsers = users.filter(user => {
//         if (activeTab === 'pending') {
//             return user.role === 'pending';
//         } else {
//             return user.role === 'user' || user.role === 'admin'
//         }
//     });

//     return (
//         <div className="container mt-5">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>จัดการข้อมูลผู้ใช้งาน</h2>
//             </div>

//             <ul className="nav nav-tabs mb-4">
//                 <li className="nav-item">
//                     <button
//                         className={`nav-link ${activeTab === 'pending' ? 'active fw-bold' : ''}`}
//                         onClick={() => setActiveTab('pending')}
//                     >
//                         รออนุมัติ
//                         {users.filter(u => u.role === 'pending').length > 0 && (
//                             <span className="badge bg-danger ms-2 rounded-pill">
//                                 {users.filter(u => u.role === 'pending').length}
//                             </span>
//                         )}
//                     </button>
//                 </li>
//                 <li className="nav-item">
//                     <button
//                         className={`nav-link ${activeTab === 'all' ? 'active fw-bold' : ''}`}
//                         onClick={() => setActiveTab('all')}
//                     >
//                         รายชื่อทั้งหมด
//                     </button>
//                 </li>
//             </ul>

//             <div className="card shadow-sm border-0">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover align-middle mb-0">
//                             <thead className="table-light">
//                                 {activeTab == 'pending' &&
//                                     <tr>
//                                         <th className="py-3 ps-4">ชื่อ-นามสกุล</th>
//                                         <th className="py-3">Email</th>
//                                         <th className="py-3 text-center">สถานะ</th>
//                                         <th className="py-3 text-center">การจัดการ</th>
//                                     </tr>
//                                 }{activeTab == 'all' &&
//                                     <tr>
//                                         <th className="py-3 ps-4">ชื่อ-นามสกุล</th>
//                                         <th className="py-3 ps-4">Email</th>
//                                         <th className="py-3">สถานะ</th>
//                                         <th className="py-3 text-center">การจัดการ</th>
//                                     </tr>
//                                 }

//                             </thead>
//                             <tbody>
//                                 {filteredUsers.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="4" className="text-center py-5 text-muted">
//                                             {activeTab === 'pending' ? 'ไม่มีรายการรออนุมัติ' : 'ไม่พบข้อมูลผู้ใช้'}
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredUsers.map((user) => (
//                                         <tr key={user.userId}>
//                                             <td className="ps-4 fw-medium">
//                                                 {user.name}
//                                                 {user.lastname}
//                                                 {user.role === 'super_admin' && <span className="badge bg-danger ms-2" style={{ fontSize: '0.7em' }}>Super</span>}
//                                                 {user.role === 'admin' && renderScopeBadge(user)}
//                                             </td>
//                                             <td>{user.email}</td>

//                                             <td className="text-center">
//                                                 {user.role === 'pending' ? (
//                                                     <span className="badge bg-warning text-dark">รออนุมัติ</span>
//                                                 ) : (
//                                                     <span className="badge bg-success">อนุมัติแล้ว</span>
//                                                 )}
//                                             </td>

//                                             <td className="text-center">
//                                                 {user.role === 'pending' && (
//                                                     <button
//                                                         className="btn btn-sm btn-success me-2"
//                                                         onClick={() => handleApprove(user.userId)}
//                                                     >
//                                                         ยืนยัน
//                                                     </button>
//                                                 )}

//                                                 {isSuperAdmin && user.role !== 'pending' && user.role !== 'super_admin' && (
//                                                     <>
//                                                         {user.role === 'user' ? (
//                                                             <button
//                                                                 className="btn btn-sm btn-outline-primary me-2"
//                                                                 onClick={() => openPromoteModal(user.userId)}
//                                                             >
//                                                                 ตั้งเป็น Admin
//                                                             </button>
//                                                         ) : (
//                                                             <button
//                                                                 className="btn btn-sm btn-outline-warning me-2"
//                                                                 onClick={() => handleDemoteToUser(user.userId)}
//                                                             >
//                                                                 ปลด Admin
//                                                             </button>
//                                                         )}{user.role !== 'super_admin' && (
//                                                             <button
//                                                                 className="btn btn-sm btn-outline-danger"
//                                                                 onClick={() => handleDelete(user.userId)}
//                                                             >
//                                                                 ลบ
//                                                             </button>
//                                                         )}
//                                                     </>
//                                                 )}



//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <Modal show={showPromoteModal} onHide={() => setShowPromoteModal(false)} centered>
//                 <Modal.Header className='bg-light' closeButton>
//                     <Modal.Title className="text-dark">ตั้งค่าสิทธิ์ Admin</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-bold">ขอบเขตความรับผิดชอบ</Form.Label>
//                             <Form.Select
//                                 value={scopeType}
//                                 onChange={(e) => {
//                                     setScopeType(e.target.value);
//                                     setSelectedProvince(null);
//                                     setAllowHospital(null);
//                                 }}
//                             >
//                                 <option value="global">ดูแลทั้งระบบ</option>
//                                 <option value="province"> ดูแลระดับจังหวัด</option>
//                                 <option value="hospital"> ดูแลเฉพาะโรงพยาบาล</option>
//                             </Form.Select>
//                         </Form.Group>

//                         {(scopeType === 'province' || scopeType === 'hospital') && (
//                             <Form.Group className="mb-3">
//                                 <Form.Label>เลือกจังหวัด {scopeType === 'hospital' && '(เพื่อค้นหา รพ.)'}</Form.Label>
//                                 <Form.Select
//                                     value={selectedProvince || ''}
//                                     onChange={(e) => {
//                                         setSelectedProvince(e.target.value);
//                                         setAllowHospital(null);
//                                     }}
//                                 >
//                                     <option value="">-- กรุณาเลือกจังหวัด --</option>
//                                     {provinceList.map((prov, idx) => (
//                                         <option key={idx} value={prov}>{prov}</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         )}

//                         {scopeType === 'hospital' && (
//                             <Form.Group className="mb-3">
//                                 <Form.Label>เลือกโรงพยาบาล</Form.Label>
//                                 <Form.Select
//                                     value={allowHospital || ''}
//                                     onChange={(e) => setAllowHospital(e.target.value)}
//                                     disabled={!selectedProvince}
//                                 >
//                                     <option value="">-- กรุณาเลือกโรงพยาบาล --</option>
//                                     {hospitalList.map((hosp) => (
//                                         <option key={hosp.id} value={hosp.id}>
//                                             {hosp.name}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         )}
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowPromoteModal(false)}>ยกเลิก</Button>
//                     <Button
//                         variant="primary"
//                         onClick={handleConfirmPromote}
//                     >
//                         บันทึกสิทธิ์
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// }
import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import hospitalData from '../src/data/listhospital';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';


export default function ManagePatients() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('pending');

    const [selectedProvince, setSelectedProvince] = useState(''); // เก็บค่าจังหวัด (String)
    const [promotingUserId, setPromotingUserId] = useState(null);
    const [showPromoteModal, setShowPromoteModal] = useState(false);

    const [scopeType, setScopeType] = useState('all');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users/all');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();

        const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(loggedInUser);
    }, []);

    const provinceList = useMemo(() => {
        if (!hospitalData) return [];
        const provinces = [...new Set(hospitalData.map(h => h.state))];
        return provinces.sort();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role_id: 3, status: 'approved' }) // 3 = user
            });
            if (response.ok) {
                const updatedUsers = users.map((user) => {
                    if (user.userId === id) return { ...user, role: 'user', role_id: 3, status: 'approved' };
                    return user;
                });
                setUsers(updatedUsers);
            }
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
        }
    };

    const openPromoteModal = (id) => {
        setPromotingUserId(id);
        setScopeType("all");
        setSelectedProvince('');
        setShowPromoteModal(true);
    };

    const handleConfirmPromote = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${promotingUserId}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role_id: 2, status: 'approved' }) // 2 = admin
            });
            if (response.ok) {
                const updatedUsers = users.map((user) => {
                    if (user.userId === promotingUserId) {
                        return {
                            ...user,
                            role: 'admin',
                            role_id: 2,
                            status: 'approved',
                            adminScope: scopeType === 'province' ? selectedProvince : 'all'
                        };
                    }
                    return user;
                });
                setUsers(updatedUsers);
                setShowPromoteModal(false);
            }
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการตั้งเป็น Admin');
        }
    };

    const handleDemoteToUser = async (id) => {
        if (window.confirm("ต้องการลดขั้น Admin คนนี้กลับเป็น User หรือไม่?")) {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}/role`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role_id: 3, status: 'approved' })
                });
                if (response.ok) {
                    const updatedUsers = users.map((user) => {
                        if (user.userId === id) {
                            const { adminScope, ...rest } = user;
                            return { ...rest, role: 'user', role_id: 3, status: 'approved' };
                        }
                        return user;
                    });
                    setUsers(updatedUsers);
                }
            } catch (error) {
                alert('เกิดข้อผิดพลาดในการลดขั้น Admin');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("คุณต้องการลบข้อมูลผู้ใช้งานนี้ใช่หรือไม่?")) {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    const updatedUsers = users.filter((user) => user.userId !== id);
                    setUsers(updatedUsers);
                }
            } catch (error) {
                alert('เกิดข้อผิดพลาดในการลบผู้ใช้งาน');
            }
        }
    };

    const isSuperAdmin = currentUser?.role === 'super_admin' || currentUser?.role_id === 1;

    const filteredUsers = users.filter(user => {
        if (activeTab === 'pending') return user.role === 'pending';
        return ['user', 'admin', 'super_admin'].includes(user.role);
    });

    const renderScopeBadge = (user) => {
        if (user.role !== 'admin') return null;

        if (user.adminScope !== 'all') {
            return <span className="badge bg-info text-dark ms-1">จ.{user.adminScope}</span>;
        }
        return <span className="badge bg-dark ms-1">ทั้งหมด</span>;
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>จัดการข้อมูลผู้ใช้งาน</h2>
            </div>

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'pending' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('pending')}>
                        รออนุมัติ {users.filter(u => u.role === 'pending').length > 0 && <span className="badge bg-danger ms-2 rounded-pill">{users.filter(u => u.role === 'pending').length}</span>}
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'all' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('all')}>
                        รายชื่อทั้งหมด
                    </button>
                </li>
            </ul>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="py-3 ps-4">ชื่อ-นามสกุล</th>
                                    <th className="py-3 ps-4">Email</th>
                                    <th className="py-3 text-center">สถานะ</th>
                                    <th className="py-3 text-center">การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center py-5 text-muted">ไม่พบข้อมูล</td></tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.userId}>
                                            <td className="ps-4 fw-medium">
                                                {user.name} {user.lastname}
                                                {user.role === 'super_admin' && <span className="badge bg-danger ms-2" style={{ fontSize: '0.7em' }}>Super</span>}
                                                {renderScopeBadge(user)}
                                            </td>
                                            <td className="ps-4">{user.email}</td>
                                            <td className="text-center">
                                                {user.role === 'pending' ? <span className="badge bg-warning text-dark">รออนุมัติ</span> : <span className="badge bg-success">อนุมัติแล้ว</span>}
                                            </td>
                                            <td className="text-center">
                                                {user.role === 'pending' && (
                                                    <button className="btn btn-sm btn-success me-2" onClick={() => handleApprove(user.userId)}>ยืนยัน</button>
                                                )}
                                                {isSuperAdmin && user.role !== 'pending' && user.role !== 'super_admin' && (
                                                    <>
                                                        {user.role === 'user' ? (
                                                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openPromoteModal(user.userId)}>ตั้งเป็น Admin</button>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleDemoteToUser(user.userId)}>ปลด Admin</button>
                                                        )}
                                                    </>
                                                )}
                                                {isSuperAdmin &&
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.userId)}>ลบ</button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showPromoteModal} onHide={() => setShowPromoteModal(false)} centered>
                <Modal.Header className='bg-light' closeButton>
                    <Modal.Title className="text-dark">ตั้งค่าสิทธิ์ Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">ขอบเขตความรับผิดชอบ</Form.Label>
                            <Form.Select
                                value={selectedProvince}
                                onChange={(e) => {
                                    setScopeType(e.target.value);
                                    setSelectedProvince('');
                                }}
                            >
                                <option value="all"> ดูแลทั้งระบบ</option>
                                <option value="province">ดูแลระดับจังหวัด</option>
                            </Form.Select>
                        </Form.Group>

                        {scopeType === 'province' && (
                            <Form.Group className="mb-3">
                                <Form.Label>เลือกจังหวัด</Form.Label>
                                <Form.Select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                >
                                    <option value="">-- กรุณาเลือกจังหวัด --</option>
                                    {provinceList.map((prov, idx) => (
                                        <option key={idx} value={prov}>{prov}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPromoteModal(false)}>ยกเลิก</Button>
                    <Button
                        variant="primary"
                        onClick={handleConfirmPromote}
                        // ถ้าเลือก Province แต่ยังไม่เลือกจังหวัด -> ปิดปุ่ม
                        disabled={scopeType === 'province' && !selectedProvince}
                    >
                        บันทึกสิทธิ์
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}