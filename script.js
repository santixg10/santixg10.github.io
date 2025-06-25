function downloadPDF(){
    const element = document.querySelector('.container-lg');
    const opt = {
        margin: 0,
        fileman: 'Hoja_de_vida_Santiago_Gallego_Henao.PDF',
        Image: {type:'jpeg',quality:1},
        html2canvas: {scale:2, useCors:true},
        jsPDF: {unit: 'in', format: 'legal', orientation: 'portrait'}
    };
    html2PDF().set(opt).from(element).save();
}