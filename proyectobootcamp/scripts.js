fetch('data/energy_transition_clean.json')/* Esta línea usa fetch, una función nativa de JavaScript para obtener archivos o datos de una URL. */
  .then(res => res.json()) // Estaba mal escrito como `.this(res => ...)`;    Una vez que fetch recibe la respuesta (res), esta línea convierte esa respuesta en formato JSON (JavaScript Object Notation), que es un formato de datos estructurado (como objetos o arrays).

    /* Esta línea recibe el JSON ya convertido en un objeto o array de JavaScript.

    Aquí se empieza a trabajar con los datos reales.

    Asumimos que data es un array de objetos. Cada objeto representa datos de un país y tiene al menos los campos: Country y Renewable_Share_percent. */

    /* const countries = [...new Set(data.map(d => d.Country))];
    data.map(d => d.Country) extrae la lista de países desde todos los objetos de data.

    new Set(...) elimina duplicados, porque puede haber muchos datos por país.

    [...Set] convierte el conjunto (Set) de vuelta en un array.

    Resultado: countries es una lista única de países. */
  .then(data => {
    const countries = [...new Set(data.map(d => d.Country))]; // "set" debe ser "Set" con mayúscula

    const paises = [];
    const renovables = [];

    countries.forEach(pais => {
      const datospais = data.filter(d => d.Country === pais); // Filtro corregido

      const promedio = datospais.reduce((a, b) => a + (b.Renewable_Share_percent || 0), 0) / datospais.length;/*  const promedio = datospais.reduce((a, b) => a + (b.Renewable_Share_percent || 0), 0) / datospais.length;
    Aquí se calcula el promedio de energía renovable para ese país:

    reduce(...) suma todos los valores de Renewable_Share_percent (porcentaje de energía renovable).

    b.Renewable_Share_percent || 0: si no hay valor (por ejemplo null o undefined), se usa 0.

    Luego se divide entre el número total de registros (datospais.length) para obtener el promedio.

 */

      paises.push(pais);
      renovables.push(promedio.toFixed(2)); // `toFixed` se debe aplicar al número antes de `push`
    });/*  renovables.push(promedio.toFixed(2));
    Se agrega el promedio al array renovables, limitado a 2 decimales.

    toFixed(2) convierte el número en un string con dos decimales. */

    const ctx1 = document.getElementById('graficaRenovable');

    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: paises,
        datasets: [{
          label: '% renovable',
          data: renovables,
          backgroundColor: 'rgba(46, 204, 113, 0.3)',
        }]
      },
      options: {
        responsive: true,
        plugins: { // Debe ser "plugins", no "Plugins"
          legend: { display: false },
          title: { display: true, text: 'Promedio de energías renovables por país' }
        }
      }
    });
  });
  /* new Chart(ctx1, { ... });
Se crea un nuevo gráfico de barras usando Chart.js, una biblioteca de visualización.

El primer argumento es el contexto (canvas), y el segundo es la configuración.

👇 type: 'bar'
Indica que el tipo de gráfico es de barras verticales.

👇 data: { labels: paises, datasets: [{...}] }
Define los datos del gráfico:

labels: nombres de países (en el eje X).

datasets: la lista de datos a graficar (el porcentaje de energías renovables).

👇 datasets: [{ label: '% renovable', data: renovables, backgroundColor: 'rgba(46, 204, 113, 0.3)' }]
Define el conjunto de datos del gráfico:

label: lo que aparece en la leyenda.

data: los promedios calculados.

backgroundColor: color verde claro semitransparente para las barras.

👇 options: { responsive: true, plugins: {...} }
options: configuración del gráfico.

responsive: true: se ajusta al tamaño del contenedor automáticamente.

👇 plugins: { legend: { display: false }, title: { display: true, text: 'Promedio de energías renovables por país' } }
legend.display: false: no muestra la leyenda (porque solo hay una serie de datos).

title.display: true: sí muestra un título.

title.text: texto del título principal del gráfico.

🔚 ¿Qué hace el código en resumen?
Carga datos desde un archivo JSON.

Agrupa los datos por país.

Calcula el promedio del porcentaje de energías renovables para cada país.

Muestra esos promedios en un gráfico de barras usando Chart.js. */