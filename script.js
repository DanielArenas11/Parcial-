document.addEventListener("DOMContentLoaded", () => {
    let grupos = [
        { nombre: "COMBA I+D", objetivos: "Formar y seleccionar talento humano con las competencias laborales y técnicas requeridas para I+D+I de calidad en las lineas de investigación del grupo - Fortalecer la relación del grupo de investigación en la cuadruple helice Universidad-Empresa-Estado-Sociedad logrando la transferencia directa e indirecta de los productos resultado de las actividades de I+D+i. - Realizar proyectos de I+D+i con impacto social de acuerdo con las lineas de investigación planteadas. - Visibilizar el grupo de investigación en el contexto nacional e internacional. - Lograr la sostenibilidad financiera del grupo mediante la cofinanciación de proyectos de I+D+i. - Mejorar los procesos administrativos misionales del grupo", director: "Claudia Liliana Zuñiga Cañon" },
        { nombre: "GIEIAM", objetivos: "1.Participar activamente en convocatorias internas y externas para la financiación de los proyectos de investigación fomentando el vínculo de cooperación con grupos nacionales e internacionales y la participación en redes científicas. 2.Realizar investigación aplicada y proyectos de desarrollo tecnológico en ingeniería que propendan por el desarrollo tecnológico, económico, ambiental y social del país y la región. 3.Fortalecer los vínculos entre la universidad y la empresa mediante el desarrollo de proyectos de investigación aplicada orientados al mejoramiento de los procesos desde el punto de vista tecnológico, ambiental y social. 4.Generar conocimiento mediante la publicación de artículos científicos que evidencien los desarrollos generados en el grupo y resultados derivados del trabajo investigativo.", director: "Diana Paola Bernal Suarez" }
    ];

    let docentes = JSON.parse(localStorage.getItem('docentes')) || [];
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    let actividades = JSON.parse(localStorage.getItem('actividades')) || []; // Recuperar actividades del localStorage

    // Mostrar Grupos de Investigación
    const listaGrupos = document.getElementById("lista-grupos");
    grupos.forEach((grupo, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = grupo.nombre;
        li.onclick = () => mostrarInfoGrupo(grupo);
        listaGrupos.appendChild(li);
    });

    function mostrarInfoGrupo(grupo) {
        document.getElementById("grupo-nombre").textContent = grupo.nombre;
        document.getElementById("grupo-objetivos").textContent = grupo.objetivos;
        document.getElementById("grupo-director").textContent = grupo.director;
    }

    // Registrar Docente Investigador
    document.getElementById("form-docente").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("docente-nombre").value;
        const formacion = document.getElementById("docente-formacion").value;
        const horario = document.getElementById("docente-horario").value;
        const grupoSeleccionado = document.getElementById("grupo-select").value;

        docentes.push({ nombre, formacion, horario, grupo: grupoSeleccionado });
        localStorage.setItem('docentes', JSON.stringify(docentes));  // Guardamos en localStorage
        alert("Docente registrado con éxito.");
        document.getElementById("form-docente").reset(); // Reseteamos el formulario
    });

    // Vincular Estudiante a Semillero
    document.getElementById("form-estudiante").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("estudiante-nombre").value;
        const codigo = document.getElementById("estudiante-codigo").value;
        const carrera = document.getElementById("estudiante-carrera").value;
        const semillero = document.getElementById("semillero-select").value;

        estudiantes.push({ nombre, codigo, carrera, semillero });
        localStorage.setItem('estudiantes', JSON.stringify(estudiantes));  // Guardamos en localStorage
        alert("Estudiante vinculado al semillero con éxito.");
        document.getElementById("form-estudiante").reset(); // Reseteamos el formulario
    });

    // Agregar Actividad
    document.getElementById("form-actividad").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("actividad-nombre").value;
        const fecha = document.getElementById("actividad-fecha").value;
        const limite = document.getElementById("actividad-limite").value;
        const resumen = document.getElementById("actividad-resumen").value;
        const semillero = document.getElementById("actividad-semillero-select").value;

        const actividad = { nombre, fecha, limite, resumen, semillero };
        actividades.push(actividad);
        localStorage.setItem('actividades', JSON.stringify(actividades));  // Guardamos en localStorage
        alert("Actividad agregada con éxito.");
        document.getElementById("form-actividad").reset(); // Reseteamos el formulario
        mostrarActividades(); // Actualizamos el listado de actividades
    });

    // Mostrar Actividades
    function mostrarActividades() {
        const listaActividades = document.getElementById("lista-actividades");
        listaActividades.innerHTML = "";  // Limpiamos la lista antes de volver a agregar
    
        actividades.forEach(actividad => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${actividad.nombre} - Fecha: ${actividad.fecha} - Semillero: ${actividad.semillero} - Resumen: ${actividad.resumen}`;
            listaActividades.appendChild(li);
        });
    }

    // Cargar actividades al cargar la página
    mostrarActividades();

    // Mostrar Docentes Registrados
    window.mostrarDocentes = function () {
        const listaDocentes = document.getElementById("lista-docentes");
        listaDocentes.innerHTML = ""; // Limpiamos la lista antes de agregar

        docentes.forEach(docente => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${docente.nombre} - Formación: ${docente.formacion} - Horario: ${docente.horario} - Grupo: ${docente.grupo}`;
            listaDocentes.appendChild(li);
        });
    };

    // Mostrar Estudiantes Registrados
    window.mostrarEstudiantes = function () {
        const listaEstudiantes = document.getElementById("lista-estudiantes");
        listaEstudiantes.innerHTML = ""; // Limpiamos la lista antes de agregar

        estudiantes.forEach(estudiante => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${estudiante.nombre} - Código: ${estudiante.codigo} - Carrera: ${estudiante.carrera} - Semillero: ${estudiante.semillero}`;
            listaEstudiantes.appendChild(li);
        });
    };
});