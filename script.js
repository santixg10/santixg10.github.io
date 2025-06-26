function downloadPDF() {
    console.log("Generando PDF...");

    const element = document.querySelector('.container-lg');
    const btn = document.querySelector('button');

    // Guardar estilos originales
    const originalStyle = element.getAttribute("style");

    // Ocultar el botón de descarga
    btn.style.display = 'none';

    // Aplicar estilo temporal para PDF
    element.style.margin = "0 auto";
    element.style.padding = "0";
    element.style.width = "100%";
    element.style.maxWidth = "794px"; // Ancho aproximado A4 en px
    element.style.boxSizing = "border-box";
    element.style.background = "#fff"; // fondo blanco para evitar cortes

    setTimeout(() => {
        const opt = {
            margin: [10, 5, 10, 5], // mm
            filename: 'Hoja_de_Vida_Santiago_Gallego_Henao.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                scrollY: 0
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            // Restaurar estilos
            if (originalStyle) {
                element.setAttribute("style", originalStyle);
            } else {
                element.removeAttribute("style");
            }
            btn.style.display = 'inline-block';
            console.log("PDF generado correctamente.");
        }).catch(err => {
            console.error("Error al generar el PDF:", err);
            btn.style.display = 'inline-block';
            element.removeAttribute("style");
        });

    }, 300);
}
