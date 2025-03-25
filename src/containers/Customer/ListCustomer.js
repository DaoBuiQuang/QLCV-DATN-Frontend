import React, { useState } from "react";

function ListCustomer() {
    const [customers, setCustomers] = useState([
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0123 456 789" },
        { id: 2, name: "Trần Thị B", email: "b@gmail.com", phone: "0987 654 321" },
        { id: 3, name: "Lê Văn C", email: "c@gmail.com", phone: "0345 678 910" },
    ]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Danh Sách Khách Hàng</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Tên</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="text-center hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{customer.id}</td>
                            <td className="border border-gray-300 p-2">{customer.name}</td>
                            <td className="border border-gray-300 p-2">{customer.email}</td>
                            <td className="border border-gray-300 p-2">{customer.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListCustomer;
