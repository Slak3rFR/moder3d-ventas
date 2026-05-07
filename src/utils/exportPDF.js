import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (ventas) => {

  const doc = new jsPDF();

  doc.text('Reporte Ventas', 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Producto', 'Cantidad', 'Total']],
    body: ventas.map((venta) => [
      venta.producto,
      venta.cantidad,
      venta.total
    ])
  });

  doc.save('ventas.pdf');
};