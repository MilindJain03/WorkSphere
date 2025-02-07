import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import '../styles/EmployeeList.css';
import Pagination from './Pagination';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        role: '',
        phone: '' // Add phone field
    });
    const [modalMode, setModalMode] = useState('add');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await EmployeeService.getAllEmployees();
            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current employees
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCreate = async (employeeData) => {
        try {
            const employeeToCreate = {
                ...employeeData,
                phone: employeeData.phone.replace(/\D/g, '') // Remove any non-digits
            };
            const createdEmployee = await EmployeeService.createEmployee(employeeToCreate);
            setEmployees([...employees, createdEmployee]);
            resetForm();
            return true;
        } catch (error) {
            console.error('Error creating employee:', error);
            return false;
        }
    };

    const handleEdit = async (employee) => {
        setNewEmployee({
            name: employee.name,
            email: employee.email,
            role: employee.role,
            phone: employee.phone || '' // Ensure phone is included with fallback
        });
        setCurrentEmployeeId(employee.id);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleUpdate = async (updatedEmployee) => {
        try {
            const employeeToUpdate = {
                ...updatedEmployee,
                phone: updatedEmployee.phone.replace(/\D/g, '') // Remove any non-digits
            };
            const result = await EmployeeService.updateEmployee(currentEmployeeId, employeeToUpdate);
            setEmployees(employees.map(emp => 
                emp.id === currentEmployeeId ? result : emp
            ));
            resetForm();
            return true;
        } catch (error) {
            console.error('Error updating employee:', error);
            return false;
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            await EmployeeService.deleteEmployee(id);
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    const resetForm = () => {
        setNewEmployee({
            name: '',
            email: '',
            role: '',
            phone: '' 
        });
        setCurrentEmployeeId(null);
        setModalMode('add');
        setIsModalOpen(false);
        setFormErrors({});
    };

    const openModal = (mode, employee = null) => {
        setModalMode(mode);
        if (employee) {
            setNewEmployee({
                name: employee.name,
                email: employee.email,
                role: employee.role,
                phone: employee.phone || ''
            });
            setCurrentEmployeeId(employee.id);
        } else {
            setNewEmployee({ name: '', email: '', role: '', phone: '' }); // Include phone in reset
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewEmployee({ name: '', email: '', role: '', phone: '' }); // Include phone
        setCurrentEmployeeId(null);
    };

    const validateForm = () => {
        const errors = {};
        
        // Name validation
        if (!newEmployee.name.trim()) {
            errors.name = 'Name is required';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newEmployee.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(newEmployee.email)) {
            errors.email = 'Invalid email format';
        }
        
        // Role validation
        if (!newEmployee.role.trim()) {
            errors.role = 'Role is required';
        }

        // Phone validation - only allow 10 digits
        const phoneRegex = /^\d{10}$/;
        if (!newEmployee.phone) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(newEmployee.phone.replace(/\D/g, ''))) {
            errors.phone = 'Please enter a valid 10-digit phone number';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const employeeData = {
                    name: newEmployee.name,
                    email: newEmployee.email,
                    role: newEmployee.role,
                    phone: newEmployee.phone // Add phone field
                };

                if (modalMode === 'add') {
                    const success = await handleCreate(employeeData);
                    if (success) {
                        closeModal();
                    }
                } else {
                    await handleUpdate(employeeData);
                    closeModal();
                }
                setFormErrors({});
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <div className="container">
            <div className="header-section">
                <h2>DashBoard</h2>
                <button className="btn-primary" onClick={() => openModal('add')}>
                    Add Employee
                </button>
            </div>

            {/* Add search input */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or role..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="search-input"
                />
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>  {/* Add ID column header */}
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="id-cell">{employee.id}</td>  {/* Add ID cell */}
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <button className="btn-edit" onClick={() => openModal('edit', employee)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add pagination component */}
            <Pagination 
                employeesPerPage={employeesPerPage}
                totalEmployees={filteredEmployees.length}
                paginate={paginate}
                currentPage={currentPage}
            />

            {/* Add pagination info */}
            <div className="pagination-info">
                Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} entries
            </div>

            {isModalOpen && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal-popup" onClick={e => e.stopPropagation()}>
                        <h3>{modalMode === 'add' ? 'Add New Employee' : 'Edit Employee'}</h3>
                        <div className="modal-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newEmployee.name}
                                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                                    className={formErrors.name ? 'error' : ''}
                                />
                                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newEmployee.email}
                                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                                    className={formErrors.email ? 'error' : ''}
                                />
                                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Role" 
                                    value={newEmployee.role || ''} // Added fallback empty string
                                    onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})} // Changed from jobTitle to role
                                    className={formErrors.role ? 'error' : ''} // Changed from jobTitle to role
                                />
                                {formErrors.role && <span className="error-message">{formErrors.role}</span>}
                            </div>
                            {/* Add phone input field */}
                            <div className="form-group">
                                <input
                                    type="tel"
                                    placeholder="Phone (10 digits)"
                                    value={newEmployee.phone || ''}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                        if (value.length <= 10) { // Only allow up to 10 digits
                                            setNewEmployee(prev => ({
                                                ...prev,
                                                phone: value
                                            }));
                                        }
                                    }}
                                    maxLength={10}
                                    className={formErrors.phone ? 'error' : ''}
                                />
                                {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-primary" onClick={handleSubmit}>
                                {modalMode === 'add' ? 'Add' : 'Update'}
                            </button>
                            <button className="btn-secondary" onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
