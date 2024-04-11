import React, { createContext, useState, useEffect } from 'react';

// สร้าง Context
export const AuthContext = createContext();

// AuthProvider คือ component ที่จะใช้ในการเก็บ state และฟังก์ชันสำหรับการล็อกอิน
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ตรวจสอบสถานะการล็อกอินเมื่อ App โหลด
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // ฟังก์ชันเช็คสถานะการล็อกอิน
  const checkLoginStatus = () => {
    // ตรวจสอบ Local Storage เพื่อดูว่ามีข้อมูลการล็อกอินอยู่หรือไม่
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // ฟังก์ชันสำหรับการล็อกอิน
  const login = () => {
    // บันทึกสถานะการล็อกอินใน Local Storage
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  // ฟังก์ชันสำหรับการล็อกเอาท์
  const logout = () => {
    // ลบข้อมูลการล็อกอินใน Local Storage
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
