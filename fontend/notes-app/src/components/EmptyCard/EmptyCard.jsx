import React, { useState } from "react";
import { MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EmptyCard = ({ onEdit }) => {
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleViewClick = () => {
    setShowImage(true);
  };

  const closeImage = () => {
    setShowImage(false);
  };

  const handleEditClick = () => {
    navigate("/edit-document"); // นำทางไปที่เส้นทาง /upload เมื่อกดปุ่ม MdCreate
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  

  return (
    <div>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-xl text-gray-900">
                ชื่อเอกสาร
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-xl text-gray-900">
                แก้ไขเอกสาร
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                แบบคำร้องทั่วไป(สำหรับนักศึกษาใหม่)
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                <div className="flex justify-center items-center gap-2">
                  <MdCreate
                    className="icon-btn hover:text-green-600"
                    onClick={handleEditClick}
                  />
                  <button
                    onClick={handleViewClick}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    ดูเอกสาร
                  </button>
                </div>
              </td>
            </tr>
          </tbody>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                ใบคำร้อง ลาป่วย ลากิจส่วนตัว
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                <div className="flex justify-center items-center gap-2">
                  <MdCreate
                    className="icon-btn hover:text-green-600"
                    onClick={handleEditClick}
                  />
                  <button
                    onClick={handleViewClick}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    ดูเอกสาร
                  </button>
                </div>
              </td>
            </tr>
          </tbody>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                ใบคำร้องขออนุญาตสอบ
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                <div className="flex justify-center items-center gap-2">
                  <MdCreate
                    className="icon-btn hover:text-green-600"
                    onClick={handleEditClick}
                  />
                  <button
                    onClick={handleViewClick}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    ดูเอกสาร
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Modal for displaying the image */}
        {showImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-4 rounded shadow-lg max-w-2xl">
              <button
                onClick={closeImage}
                className="absolute top-1 right-1 text-gray-600 hover:text-gray-900 text-xl"
              >
                ✕
              </button>
              <img
                src="src/assets/แบบคำร้องทั่วไป.jpg" // เปลี่ยน path ตามที่อยู่ของไฟล์รูปภาพ
                alt="แบบฟอร์มทั่วไป"
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyCard;
