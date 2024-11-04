import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";


const UploadForm = () => {
  const [reasons, setReasons] = useState("");
  const [woldLike, setWoldLike] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!woldLike || !reasons) {
      setUploadStatus("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const response = await axiosInstance.post("/add-document", {
        woldLike,
        reasons,
      });

      if (response.data && response.data.error) {
        setUploadStatus(response.data.message);
      } else {
        setUploadStatus("บันทึกข้อมูลสำเร็จ!");
        setWoldLike("");
        setReasons("");
      }
    } catch (error) {
      setUploadStatus(
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง"
      );
      console.log("Sending data:", { woldLike, reasons });
    }
    navigate("/my-documents");
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont("Vazirmatn-VariableFont_wght");
    doc.text("แบบฟอร์มข้อมูลผู้ใช้", 20, 20);

    if (userInfo) {
      doc.setFontSize(12);
      doc.text(`คำนำหน้า: ${userInfo.titleName}`, 20, 30);
      doc.text(`Hello workd`, 20, 30);
      //   doc.text(`ชื่อ: ${userInfo.fullName}`, 20, 40);
      //   doc.text(`รหัสประจำตัว: ${userInfo.studentId}`, 20, 50);
      //   doc.text(`คณะ: ${userInfo.faculty || "N/A"}`, 20, 60);
      //   doc.text(`สาขา: ${userInfo.major || "N/A"}`, 20, 70);
      //   doc.text(`บ้านเลขที่: ${userInfo.address?.homeAddress || "N/A"}`, 20, 80);
      //   doc.text(`หมู่: ${userInfo.address?.moo || "N/A"}`, 20, 90);
      //   doc.text(`ซอย: ${userInfo.address?.soi || "N/A"}`, 20, 100);
      //   doc.text(`ถนน: ${userInfo.address?.street || "N/A"}`, 20, 110);
      //   doc.text(`ตำบล: ${userInfo.address?.subDistrict || "N/A"}`, 20, 120);
      //   doc.text(`อำเภอ: ${userInfo.address?.District || "N/A"}`, 20, 130);
      //   doc.text(`จังหวัด: ${userInfo.address?.province || "N/A"}`, 20, 140);
      //   doc.text(`รหัสไปรษณีย์: ${userInfo.address?.postCode || "N/A"}`, 20, 150);
      //   doc.text(`โทรศัพท์: ${userInfo.mobile || "N/A"}`, 20, 160);
    }

    doc.text("ข้อมูลการกรอกฟอร์ม:", 20, 180);
    doc.text(`มีความประสงค์: ${woldLike}`, 20, 190);
    doc.text(`เนื่องจาก: ${reasons}`, 20, 200);

    const pdfDataUrl = doc.output("dataurlstring");
    setPdfUrl(pdfDataUrl);

    // Save to database
    try {
      await axiosInstance.post("/add-document", {
        pdfData: pdfDataUrl,
        woldLike,
        reasons,
        userId: userInfo?.id, // Assuming userInfo has an id property
      });
      setUploadStatus("PDF saved successfully!");
    } catch (error) {
      setUploadStatus(
        "Failed to save PDF: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-6xl">
          <div className="flex-1 p-4">
            <img
              src="src/assets/แบบคำร้องทั่วไป.jpg"
              alt="แบบฟอร์มทั่วไป"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
          <div className="upload-form bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4">
              แบบฟอร์มข้อมูลผู้ใช้
            </h2>

            {userInfo ? (
              <div className="text-left mb-4">
                <p>
                  <strong>คำนำหน้า:</strong> {userInfo.titleName}
                </p>
                <p>
                  <strong>ชื่อ:</strong> {userInfo.fullName}
                </p>
                <p>
                  <strong>รหัสประจำตัว:</strong> {userInfo.studentId}
                </p>
                <p>
                  <strong>คณะ:</strong> {userInfo.faculty || "N/A"}
                </p>
                <p>
                  <strong>สาขา:</strong> {userInfo.major || "N/A"}
                </p>
                <p>
                  <strong>บ้านเลขที่:</strong>{" "}
                  {userInfo.address?.homeAddress || "N/A"}
                </p>
                <p>
                  <strong>หมู่:</strong> {userInfo.address?.moo || "N/A"}
                </p>
                <p>
                  <strong>ซอย:</strong> {userInfo.address?.soi || "N/A"}
                </p>
                <p>
                  <strong>ถนน:</strong> {userInfo.address?.street || "N/A"}
                </p>
                <p>
                  <strong>ตำบล:</strong>{" "}
                  {userInfo.address?.subDistrict || "N/A"}
                </p>
                <p>
                  <strong>อำเภอ:</strong> {userInfo.address?.District || "N/A"}
                </p>
                <p>
                  <strong>จังหวัด:</strong>{" "}
                  {userInfo.address?.province || "N/A"}
                </p>
                <p>
                  <strong>รหัสไปรษณีย์:</strong>{" "}
                  {userInfo.address?.postCode || "N/A"}
                </p>
                <p>
                  <strong>โทรศัพท์:</strong> {userInfo.mobile || "N/A"}
                </p>
              </div>
            ) : (
              <p className="text-center">กำลังโหลดข้อมูลผู้ใช้...</p>
            )}

            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium text-gray-700">
                มีความประสงค์
              </label>
              <textarea
                value={woldLike}
                onChange={(e) => setWoldLike(e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="กรอกหมายเหตุ..."
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium text-gray-700">
                เนื่องจาก
              </label>
              <textarea
                value={reasons}
                onChange={(e) => setReasons(e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="กรอกความประสงค์..."
              />
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="btn-primary mt-4 p-2 bg-blue-500 text-white rounded-md"
              >
                ส่งแบบฟอร์ม
              </button>

              <button
                onClick={generatePDF}
                className="btn-primary mt-4 p-2 bg-slate-500 text-white rounded-md"
              >
                ดูแบบฟอร์ม
              </button>
            </div>

            {uploadStatus && (
              <p
                className={`text-center mt-4 ${
                  uploadStatus.includes("สำเร็จ")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {uploadStatus}
              </p>
            )}

            {pdfUrl && (
              <div className="mt-4">
                <iframe
                  src={pdfUrl}
                  title="PDF Preview"
                  width="100%"
                  height="600px"
                  className="border border-gray-300 rounded-md"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
