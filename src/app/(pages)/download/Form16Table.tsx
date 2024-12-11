// components/Form16Table.tsx
import React from "react";

const Form16Table = () => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Particulars</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Amount (₹)</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {/* Example Data - You can replace these with dynamic values */}
        <tr>
          <td className="px-6 py-3 text-sm text-gray-800">Salary Paid</td>
          <td className="px-6 py-3 text-sm text-gray-800">₹10,00,000</td>
          <td className="px-6 py-3 text-sm text-gray-800">Income from salary</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-3 text-sm text-gray-800">Tax Deducted at Source</td>
          <td className="px-6 py-3 text-sm text-gray-800">₹1,50,000</td>
          <td className="px-6 py-3 text-sm text-gray-800">TDS deducted by employer</td>
        </tr>
        <tr>
          <td className="px-6 py-3 text-sm text-gray-800">Net Taxable Salary</td>
          <td className="px-6 py-3 text-sm text-gray-800">₹8,50,000</td>
          <td className="px-6 py-3 text-sm text-gray-800">After exemptions and deductions</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-3 text-sm text-gray-800">Tax Payable</td>
          <td className="px-6 py-3 text-sm text-gray-800">₹2,00,000</td>
          <td className="px-6 py-3 text-sm text-gray-800">Calculated based on income</td>
        </tr>
        <tr>
          <td className="px-6 py-3 text-sm text-gray-800">Total Tax Paid</td>
          <td className="px-6 py-3 text-sm text-gray-800">₹1,50,000</td>
          <td className="px-6 py-3 text-sm text-gray-800">TDS paid by employer</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-3 text-sm text-gray-800">Balance Tax Payable</td>
          <td className="px-6 py-3 text-sm text-gray-800">₹50,000</td>
          <td className="px-6 py-3 text-sm text-gray-800">Pending tax payment</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
};

export default Form16Table;
