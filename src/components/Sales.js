// este es el codigo de ventas

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [pricePerPound, setPricePerPound] = useState(0);
  const [isCombo, setIsCombo] = useState('false');
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [sellingPricePerPound, setSellingPricePerPound] = useState(0);
  const [editSaleId, setEditSaleId] = useState(null); 

  useEffect(() => {
    const fetchSales = async () => {
      const salesCollection = collection(db, 'sales');
      const unsubscribeSales = onSnapshot(salesCollection, (snapshot) => {
        setSales(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      const productsCollection = collection(db, 'products');
      const unsubscribeProducts = onSnapshot(productsCollection, (snapshot) => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => {
        unsubscribeSales();
        unsubscribeProducts();
      };
    };

    fetchSales();
  }, []);

  useEffect(() => {
    const fetchProductInfo = async () => {
      if (selectedProduct) {
        const productDocRef = doc(db, 'products', selectedProduct);
        const productSnapshot = await getDoc(productDocRef);
        const productData = productSnapshot.data();
        if (productData) {
          setAvailableQuantity(productData.quantity);
          setSellingPricePerPound(productData.pricePerPound);
        }
      }
    };

    fetchProductInfo();
  }, [selectedProduct]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const salesCollection = collection(db, 'sales');
      await addDoc(salesCollection, {
        productId: selectedProduct,
        quantity: parseInt(quantity),
        pricePerPound: parseFloat(pricePerPound),
        isCombo: isCombo === 'true' ? true : false
      });

      console.log("Venta registrada exitosamente.");
      setSelectedProduct('');
      setQuantity(0);
      setPricePerPound(0);
      setIsCombo('false');
    } catch (error) {
      console.error('Error adding sale: ', error);
    }
  };

  const handleDelete = async (saleId) => {
    try {
      await deleteDoc(doc(db, 'sales', saleId));
      console.log("Sale deleted successfully.");
    } catch (error) {
      console.error('Error deleting sale: ', error);
    }
  };

  const handleEdit = async (saleId) => {
    setEditSaleId(saleId); 
    const saleToEdit = sales.find(sale => sale.id === saleId);
    if (saleToEdit) {
      setSelectedProduct(saleToEdit.productId);
      setQuantity(saleToEdit.quantity);
      setPricePerPound(saleToEdit.pricePerPound);
      setIsCombo(saleToEdit.isCombo ? 'true' : 'false');
    }
  };

  const handleUpdate = async () => {
    try {
      const saleDocRef = doc(db, 'sales', editSaleId);
      await updateDoc(saleDocRef, {
        productId: selectedProduct,
        quantity: parseInt(quantity),
        pricePerPound: parseFloat(pricePerPound),
        isCombo: isCombo === 'true' ? true : false
      });

      // Limpiar los estados después de la actualización
      setEditSaleId(null);
      setSelectedProduct('');
      setQuantity(0);
      setPricePerPound(0);
      setIsCombo('false');
    } catch (error) {
      console.error('Error updating sale: ', error);
    }
  };

  return (
    <div className="sales">
      <h2>Registrar Venta</h2>
      <form className="sales-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product">Producto:</label>
          <select id="product" name="product" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
            <option value="">Seleccionar producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.productName}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Cantidad (en libras):</label>
          <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="pricePerPound">Precio por Libra:</label>
          <input type="number" id="pricePerPound" name="pricePerPound" value={pricePerPound} onChange={(e) => setPricePerPound(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="isCombo">¿Es un combo?</label>
          <select id="isCombo" name="isCombo" value={isCombo} onChange={(e) => setIsCombo(e.target.value)} required>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <div className="button-container">
          {editSaleId ? (
            <button className="update-button" type="button" onClick={handleUpdate}>Actualizar Venta</button>
          ) : (
            <button className="add-button" type="submit">Registrar Venta</button>
          )}
        </div>
      </form>

      <div className="sales-list">
        <h3>Lista de Ventas Realizadas</h3>
        <ul>
          {sales.map((sale) => {
            // Busca el producto correspondiente en la lista de productos
            const product = products.find((product) => product.id === sale.productId);
            // Verifica si se encontró el producto
            const productName = product ? product.productName : "Producto no encontrado";
            
            return (
              <li key={sale.id}>
                Producto: {productName} - Cantidad: {sale.quantity} libras - Precio por libra: Q{sale.pricePerPound} - {sale.isCombo ? 'Combo' : 'No combo'}
                <button className="delete-button" onClick={() => handleDelete(sale.id)}>Eliminar</button>
                <button className="edit-button" onClick={() => handleEdit(sale.id)}>Editar</button>
              </li>
            );
          })}
        </ul>
      </div>

      {selectedProduct && (
        <div className="product-info">
          <h3>Información del Producto</h3>
          <p>Cantidad Disponible: {availableQuantity} libras</p>
          <p>Precio de Venta por Libra: Q{sellingPricePerPound}</p>
        </div>
      )}
    </div>
  );
}

export default Sales;