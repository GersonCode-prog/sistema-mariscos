// Este es el codigo de inventario

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles.css';

const Inventory = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [pricePerPound, setPricePerPound] = useState(0);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const productsCollection = collection(db, 'products');
      const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, {
        productName,
        quantity: parseInt(quantity),
        pricePerPound: parseFloat(pricePerPound)
      });

      setProductName('');
      setQuantity(0);
      setPricePerPound(0);
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const handleEdit = async (productId) => {
    setEditProductId(productId); 
    const productToEdit = products.find(product => product.id === productId);
    if (productToEdit) {
      setProductName(productToEdit.productName);
      setQuantity(productToEdit.quantity);
      setPricePerPound(productToEdit.pricePerPound);
    }
  };

  const handleUpdate = async () => {
    try {
      const productDocRef = doc(db, 'products', editProductId);
      await updateDoc(productDocRef, {
        productName,
        quantity: parseInt(quantity),
        pricePerPound: parseFloat(pricePerPound)
      });

      
      setEditProductId(null);
      setProductName('');
      setQuantity(0);
      setPricePerPound(0);
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

  return (
    <div className="inventory">
      <h2>Inventario</h2>
      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Nombre del Producto:</label>
          <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Cantidad (en libras):</label>
          <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="pricePerPound">Precio por Libra:</label>
          <input type="number" id="pricePerPound" name="pricePerPound" value={pricePerPound} onChange={(e) => setPricePerPound(e.target.value)} required />
        </div>
        
        <div className="button-container">
          {editProductId ? (
            <button className="update-button" type="button" onClick={handleUpdate}>Actualizar Producto</button>
          ) : (
            <button className="add-button" type="submit">Agregar Producto</button>
          )}
        </div>
      </form>
      
     
      <div>
        <h3>Productos Existentes</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-details">
                <div>{product.productName}</div>
                <div>Cantidad: {product.quantity} libras</div>
                <div>Precio por Libra: Q{product.pricePerPound}</div>
              </div>
              <div className="button-container">
                <button className="delete-button" onClick={() => handleDelete(product.id)}>Eliminar</button>
                <button className="edit-button" onClick={() => handleEdit(product.id)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Inventory;
