//Aca esta el codifo de Reportes 

import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Reports = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesCollection = collection(db, 'sales');
      const unsubscribeSales = onSnapshot(salesCollection, (snapshot) => {
        setSales(snapshot.docs.map(doc => doc.data()));
      });

      return () => {
        unsubscribeSales();
      };
    };

    fetchSales();
  }, []);

  const calculateTotalSales = () => {
    return sales.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const calculateTotalRevenue = () => {
    return sales.reduce((acc, curr) => acc + (curr.quantity * curr.pricePerPound), 0);
  };

  return (
    <div className="reports">
      <h2>Reportes</h2>
      <div className="report-section">
        <h3>Reporte de Ventas Totales</h3>
        <p>Total de Ventas: {calculateTotalSales()}</p>
        <h3>Reporte de Ganancias Totales</h3>
        <p>Total Vendido: Q{calculateTotalRevenue()}</p>
      </div>
    </div>
  );
}

export default Reports;
