document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js cargado correctamente");
    const sections = document.querySelectorAll("section");

    // ✅ Forzar que todas las secciones sean visibles al cargar la página
    sections.forEach((section) => {
        section.classList.add("visible");
    });

    // 📌 Función para revelar secciones al hacer scroll
    const revealOnScroll = () => {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("visible");
            }
        });
    };

    // 📌 Ejecutar la función inmediatamente al cargar
    revealOnScroll();

    // 📌 Agregar el evento scroll para seguir revelando secciones
    window.addEventListener("scroll", revealOnScroll);
});

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");

    if (!header) {
        console.error("⚠️ No se encontró el encabezado en el DOM.");
        return;
    }

    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // 📌 Aseguramos que el evento de scroll funcione en móviles y escritorio
    window.addEventListener("scroll", updateHeaderOnScroll);
    window.addEventListener("touchmove", updateHeaderOnScroll); // 📌 Detecta el scroll en pantallas táctiles

    // 📌 Ejecutar la función inmediatamente al cargar
    updateHeaderOnScroll();
});

// ==========================
// 📌 RESALTAR SECCIÓN ACTUAL EN EL MENÚ
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll("nav ul li a");

    const highlightMenu = () => {
        let scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
            let sectionTop = section.offsetTop;
            let sectionHeight = section.offsetHeight;
            let sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", highlightMenu);
    highlightMenu();
});

// ==========================
// 📌 DESPLAZAMIENTO SUAVE EN EL MENÚ
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                console.log(`🔹 Navegando a: #${targetId}`);

                const offsetTop = targetElement.offsetTop - 50;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                history.pushState(null, null, `#${targetId}`);
            } else {
                console.error(`⚠️ Elemento con ID '${targetId}' no encontrado.`);
            }
        });
    });
});

// ==========================
// 📌 BOTÓN "INICIO" CON SCROLL SUAVE (CORREGIDO)
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const homeButton = document.querySelector(".inicio-btn");
    const targetElement = document.getElementById("top"); // Sección de inicio

    if (homeButton && targetElement) {
        homeButton.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("🔹 Regresando al inicio");

            // 📌 Usamos scrollIntoView para una mejor compatibilidad en móviles
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // 📌 Actualizar la URL
            history.pushState(null, null, "#top");
        });
    } else {
        console.error("⚠️ El botón de Inicio o la sección 'hero' no se encontraron en el DOM.");
    }
});

// ==========================
// 📌 MENÚ HAMBURGUESA PARA MÓVILES (CORREGIDO)
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle"); // Botón hamburguesa
    const menu = document.querySelector("nav ul.menu"); // Menú desplegable
    const menuLinks = document.querySelectorAll("nav ul.menu li a"); // Enlaces del menú
    const header = document.querySelector("header"); // Encabezado fijo

    console.log("🔎 Verificando elementos del menú hamburguesa...");
    console.log("📌 Botón menú hamburguesa:", menuToggle);
    console.log("📌 Menú:", menu);
    console.log("📌 Enlaces del menú:", menuLinks.length);

    if (!menuToggle || !menu || menuLinks.length === 0) {
        console.error("⚠️ Error: No se encontraron los elementos del menú en el DOM.");
        return;
    }

    // 📌 Alternar el menú al hacer clic en el botón hamburguesa
    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        console.log("🔹 Menú hamburguesa activado/desactivado");
    });

    // 📌 Cerrar el menú después de hacer clic en una opción y navegar correctamente
    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                console.log(`🔹 Navegando a: #${targetId}`);

                // 📌 Alternativa para móviles: scrollIntoView en lugar de scrollTo
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // 📌 Cerrar el menú después de la animación
                setTimeout(() => {
                    menu.classList.remove("active");
                    console.log("🔹 Menú hamburguesa cerrado después de la animación");
                }, 500);

                // 📌 Actualizar la URL
                history.pushState(null, null, `#${targetId}`);
            } else {
                console.error(`⚠️ Elemento con ID '${targetId}' no encontrado.`);
            }
        });
    });

    // 📌 Cerrar el menú si se toca fuera de él
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove("active");
            console.log("🔹 Menú hamburguesa cerrado al hacer clic fuera");
        }
    });
});

// ==========================
// 📌 MODAL DEL BLOG
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("blogModal");
    const closeModal = document.querySelector(".close-btn");

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    } else {
        console.error("⚠️ Error: No se encontró el botón para cerrar el modal.");
    }
});

// ==========================
// 📌 SECCIÓN DE BLOGS
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js cargado correctamente");

    // 📌 Animación al hacer scroll
    const blogPosts = document.querySelectorAll(".blog-post");
    const revealOnScroll = () => {
        blogPosts.forEach((post) => {
            const postTop = post.getBoundingClientRect().top;
            if (postTop < window.innerHeight - 100) {
                post.classList.add("visible");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // 📌 Datos de los blogs
    const blogData = {
        blog1: {
            title: "📌 De Analista de Datos a Científico de Datos: Claves para Convertir los Datos en Valor Empresarial",
            text: `
                <p>El mundo moderno gira en torno a los datos. Desde las compras en línea hasta las recomendaciones en plataformas de streaming, la información es el recurso más valioso para las empresas. Sin embargo, tener acceso a datos no es suficiente. El verdadero reto está en convertir esa información en conocimiento útil que impulse decisiones estratégicas.</p>
        
                <p>Aquí es donde entran en juego dos perfiles fundamentales en la economía digital: el Analista de Datos y el Científico de Datos. Aunque a menudo se confunden, cada uno tiene un rol distinto en el proceso de transformar datos en valor.</p>
        
                <p>Durante mi trayectoria, he tenido la oportunidad de desempeñarme en ambos roles. Comencé en Análisis de Datos, donde mi labor consistía en estructurar, interpretar y visualizar información para ayudar a los tomadores de decisiones. Con el tiempo, me di cuenta de que podía ir más allá y predecir tendencias a partir de los datos. Así fue como di el salto hacia la Ciencia de Datos, un campo que combina programación, estadística y machine learning para anticipar comportamientos futuros.</p>
        
                <p>Pero, ¿cómo saber cuál de estos roles es el indicado para ti? Y, más importante aún, ¿cómo pueden ambos aportar un valor real en el mercado laboral?</p>
        
                <h3>📊 Análisis de Datos: Transformando Información en Decisiones</h3>
                <p>Imagina que trabajas en una empresa que vende productos electrónicos en diferentes ciudades. De repente, notas que las ventas han caído en una región específica. Como Analista de Datos, tu tarea es investigar qué está ocurriendo.</p>
        
                <p>Para ello, utilizas herramientas como Excel, SQL y Power BI para estructurar la información y generar informes visuales. Analizas tendencias, comparas métricas y presentas hallazgos a la gerencia. Tu objetivo es responder preguntas clave como:</p>
        
                <ul>
                    <li>✅ ¿Qué productos han bajado en ventas y por qué?</li>
                    <li>✅ ¿Existe una relación con el comportamiento del mercado?</li>
                    <li>✅ ¿Cómo pueden optimizarse las estrategias para mejorar los resultados?</li>
                </ul>
        
                <p>Los Analistas de Datos trabajan principalmente con datos estructurados que provienen de bases de datos o archivos ordenados. Su rol es descriptivo, es decir, analizan lo que ha sucedido y generan reportes que permiten comprender mejor la situación actual.</p>
        
                <h3>🛠 Habilidades Claves para un Analista de Datos</h3>
                <ul>
                    <li>✔ SQL y bases de datos relacionales</li>
                    <li>✔ Herramientas de visualización: Power BI, Tableau y Excel</li>
                    <li>✔ Estadística básica: Promedios, medianas, percentiles y gráficos de dispersión</li>
                    <li>✔ Pensamiento crítico y comunicación efectiva</li>
                </ul>
        
                <h3>🤖 Ciencia de Datos: Prediciendo el Futuro con Datos</h3>
                <p>Supongamos que la empresa quiere no solo entender por qué cayeron las ventas en cierta región, sino también anticipar cuándo volverán a subir o si la tendencia negativa se mantendrá. El Científico de Datos utiliza modelos predictivos para responder este tipo de preguntas.</p>
        
                <p>En lugar de limitarse a analizar el pasado, aplica algoritmos de machine learning para detectar patrones ocultos y hacer proyecciones futuras. Mientras el Analista de Datos usa herramientas como SQL y Power BI, el Científico de Datos trabaja con Python, R y técnicas avanzadas de modelado matemático.</p>
        
                <h3>🎬 Ejemplo de Aplicación en el Mundo Real</h3>
                <p>Imagina que una plataforma de streaming quiere recomendar contenido personalizado a sus usuarios. Un Analista de Datos podría revisar qué películas han sido más vistas en cada categoría y crear informes sobre las preferencias generales de la audiencia.</p>
        
                <p>Pero un Científico de Datos podría ir más allá. Entrenaría un modelo de machine learning que analice los hábitos de cada usuario y haga predicciones sobre qué contenido podría gustarle.</p>
        
                <p>Así es como funcionan las recomendaciones de Netflix, Spotify y YouTube: a través de modelos de Ciencia de Datos que personalizan la experiencia del usuario.</p>
        
                <h3>🛠 Habilidades Claves para un Científico de Datos</h3>
                <ul>
                    <li>✔ Python y R</li>
                    <li>✔ Machine Learning: Algoritmos de clasificación, regresión y clustering</li>
                    <li>✔ Big Data: Herramientas como Apache Spark</li>
                    <li>✔ Matemáticas y estadística avanzada</li>
                </ul>
        
                <h3>🚀 ¿Cómo Diferenciarse en el Mercado Laboral?</h3>
                <p>El auge del Data Science ha generado una alta demanda de talento, pero también ha elevado la competencia. Tanto los Analistas de Datos como los Científicos de Datos deben demostrar que pueden aportar valor real a las empresas.</p>
        
                <h3>🔥 Consejos para Destacar en el Mundo de los Datos</h3>
                <ul>
                    <li>✅ Construye un portafolio de proyectos: No importa cuántos cursos hagas, las empresas buscan ver ejemplos concretos de tu trabajo.</li>
                    <li>✅ Aprende a resolver problemas de negocio: No basta con programar bien; debes entender cómo los datos impactan en las decisiones estratégicas.</li>
                    <li>✅ Domina las herramientas clave: SQL, Python, Power BI y modelos estadísticos son el estándar de la industria.</li>
                    <li>✅ Mantente actualizado: El mundo de los datos evoluciona rápidamente. Sigue tendencias, toma cursos y experimenta con nuevas tecnologías.</li>
                </ul>
        
                <h3>🎯 Conclusión: ¿Análisis o Ciencia de Datos? ¿Cuál Elegir?</h3>
                <p>Ambos perfiles son indispensables en la era digital, pero sus funciones son distintas:</p>
                <ul>
                    <li>🔹 El Analista de Datos interpreta datos existentes para mejorar la toma de decisiones.</li>
                    <li>🔹 El Científico de Datos crea modelos avanzados para predecir tendencias futuras y automatizar procesos.</li>
                </ul>
        
                <p>Si te interesa el análisis estratégico y la creación de reportes, el Análisis de Datos es para ti. Si, en cambio, te apasionan la programación, los algoritmos y la estadística avanzada, la Ciencia de Datos puede ser tu camino.</p>
        
                <p>Independientemente de la elección, el mundo de los datos seguirá creciendo y ofreciendo oportunidades para quienes sepan aprovecharlas. 🚀📊</p>
        
                <p>💬 ¿Qué opinas sobre estos roles? ¿Cuál te parece más interesante? Déjamelo saber en los comentarios. ⬇️</p>
            `,      
            image: "assets/img/blog-inteligencia-artificial.webp"
        },
        blog2: {
            title: "🤖 Inteligencia Artificial y Productividad: ¿Hacia una Nueva Era o una Mayor Dependencia?",
            text: `
                <p>Desde los primeros avances tecnológicos hasta la revolución digital actual, la humanidad siempre ha buscado maneras de automatizar tareas y aumentar la eficiencia. Desde la invención de la rueda hasta la aparición de los robots industriales, cada innovación ha cambiado la forma en que trabajamos y vivimos.</p>
        
                <p>Sin embargo, pocas tecnologías han generado tanta expectativa (y temor) como la Inteligencia Artificial (IA). En apenas unas décadas, pasamos de usar calculadoras básicas a tener sistemas inteligentes capaces de tomar decisiones, analizar datos y ejecutar tareas que antes requerían intervención humana.</p>
        
                <p>Pero esto nos lleva a una pregunta fundamental:</p>
        
                <h3>🔍 ¿La IA realmente nos hace más productivos o solo está generando una nueva dependencia tecnológica?</h3>
        
                <h3>📜 Un Poco de Historia: De la Calculadora a la IA</h3>
                <p>Para entender cómo la IA ha transformado la productividad, primero debemos observar cómo ha evolucionado la automatización en la historia.</p>
        
                <ul>
                    <li>📌 <strong>Siglo XVII</strong> – Blaise Pascal crea la primera calculadora mecánica. Su invención reduce los errores en los cálculos matemáticos y acelera los procesos de contabilidad.</li>
                    <li>📌 <strong>Siglo XX</strong> – Se desarrollan las primeras computadoras electrónicas, que permiten realizar cálculos complejos y almacenar información de manera eficiente.</li>
                    <li>📌 <strong>Años 2000</strong> – Con la explosión del Internet y el big data, la automatización alcanza un nuevo nivel. Se crean algoritmos capaces de analizar grandes volúmenes de información en segundos.</li>
                    <li>📌 <strong>Hoy</strong> – La IA está integrada en nuestras vidas a través de asistentes virtuales, algoritmos de recomendación, autos autónomos y sistemas de análisis predictivo.</li>
                </ul>
        
                <p>Cada uno de estos avances ha tenido un impacto significativo en la productividad, reduciendo el tiempo necesario para completar tareas y permitiendo a las personas centrarse en actividades más estratégicas.</p>
        
                <h3>📊 La IA y la Productividad: Beneficios en Diversos Sectores</h3>
                <p>La IA no solo está cambiando cómo trabajamos, sino también cómo pensamos y tomamos decisiones. En prácticamente todos los sectores, la automatización basada en IA ha generado una revolución en la eficiencia y la optimización de recursos.</p>
        
                <ul>
                    <li>🏥 <strong>Salud</strong>
                        <ul>
                            <li>Algoritmos de machine learning pueden analizar radiografías y detectar enfermedades como el cáncer con mayor precisión que los médicos humanos.</li>
                            <li>La IA reduce los tiempos de diagnóstico y ayuda a los profesionales a tomar decisiones más informadas.</li>
                        </ul>
                    </li>
                    <li>💰 <strong>Finanzas</strong>
                        <ul>
                            <li>Los bancos utilizan IA para detectar fraudes en tiempo real, evaluando transacciones sospechosas en cuestión de milisegundos.</li>
                            <li>También se emplean modelos de predicción para analizar riesgos crediticios y ofrecer préstamos personalizados.</li>
                        </ul>
                    </li>
                    <li>🏢 <strong>Empresas y Recursos Humanos</strong>
                        <ul>
                            <li>Sistemas de IA pueden analizar grandes volúmenes de currículums en segundos, identificando candidatos más adecuados para un puesto de trabajo.</li>
                            <li>Plataformas como ChatGPT y herramientas de automatización optimizan la redacción de informes, correos y análisis de datos.</li>
                        </ul>
                    </li>
                    <li>📚 <strong>Educación</strong>
                        <ul>
                            <li>Plataformas de aprendizaje personalizado utilizan IA para adaptar los contenidos a cada estudiante, optimizando su rendimiento y mejorando la retención del conocimiento.</li>
                            <li>Los asistentes virtuales pueden resolver dudas en tiempo real y proporcionar retroalimentación inmediata.</li>
                        </ul>
                    </li>
                    <li>🚛 <strong>Logística y Transporte</strong>
                        <ul>
                            <li>Algoritmos de IA optimizan rutas de transporte, reduciendo tiempos de entrega y costos operativos.</li>
                            <li>Empresas como Amazon han implementado almacenes automatizados, donde los robots gestionan inventarios y distribuyen productos con mayor eficiencia.</li>
                        </ul>
                    </li>
                </ul>
        
                <p>La promesa de la IA es clara: hacer más con menos esfuerzo, reducir errores y permitir que las personas se concentren en actividades estratégicas. Pero esto nos lleva a la otra cara de la moneda.</p>
        
                <h3>⚠️ Los Riesgos de una Dependencia Excesiva en la IA</h3>
                <ul>
                    <li>🔴 <strong>Desplazamiento laboral</strong>
                        <ul>
                            <li>Muchas tareas que antes requerían intervención humana ahora son completamente automatizadas.</li>
                            <li>Sectores como la manufactura, atención al cliente y contabilidad están viendo una reducción en la cantidad de empleos disponibles.</li>
                        </ul>
                    </li>
                    <li>🔴 <strong>Sesgo en los algoritmos</strong>
                        <ul>
                            <li>Si la IA se entrena con datos sesgados, puede perpetuar discriminación y desigualdades sociales.</li>
                            <li>Un claro ejemplo es el uso de IA en procesos de selección de personal, donde algunos algoritmos han mostrado prejuicios contra ciertos grupos.</li>
                        </ul>
                    </li>
                    <li>🔴 <strong>Privacidad y Seguridad</strong>
                        <ul>
                            <li>La recopilación masiva de datos por parte de sistemas de IA plantea serias preocupaciones sobre la privacidad de los usuarios.</li>
                            <li>Empresas como Facebook y Google han sido criticadas por el uso indebido de datos personales con fines comerciales.</li>
                        </ul>
                    </li>
                    <li>🔴 <strong>Dependencia excesiva de la IA</strong>
                        <ul>
                            <li>¿Qué sucede si confiamos tanto en la IA que olvidamos habilidades fundamentales?</li>
                            <li>Un ejemplo es el uso excesivo de GPS: muchas personas ya no pueden navegar sin depender de su celular.</li>
                        </ul>
                    </li>
                </ul>
        
                <h3>🎭 ¿Estamos Caminando Hacia un Futuro Sin Control Humano?</h3>
                <p>El avance de la IA ha sido tan rápido que muchas empresas están adoptándola sin considerar completamente sus implicaciones a largo plazo.</p>
        
                <p>Uno de los mayores peligros es que la IA toma decisiones basadas en datos, pero no comprende el contexto humano.</p>
        
                <p><strong>Por ejemplo:</strong></p>
                <ul>
                    <li>En el ámbito judicial, algunos sistemas de IA han sido utilizados para determinar la probabilidad de reincidencia en delincuentes, pero han demostrado ser sesgados en función de la raza y el nivel socioeconómico.</li>
                    <li>En la conducción autónoma, los coches sin conductor han causado accidentes porque los modelos de IA no pueden anticipar ciertos comportamientos humanos impredecibles.</li>
                </ul>
        
                <p>Si delegamos completamente la toma de decisiones en sistemas de IA sin supervisión humana, podríamos enfrentar consecuencias peligrosas e inesperadas.</p>
        
                <h3>🔍 ¿Cómo Encontrar un Equilibrio entre la IA y la Productividad Humana?</h3>
                <ul>
                    <li>✔ Regulación y ética: Es fundamental establecer normas claras para el desarrollo y uso de la IA.</li>
                    <li>✔ Supervisión humana: La IA puede hacer recomendaciones, pero la decisión final siempre debe estar en manos de los humanos.</li>
                    <li>✔ Educación y adaptación: En lugar de resistirse al cambio, las personas deben adquirir nuevas habilidades que les permitan trabajar junto con la IA.</li>
                </ul>
        
                <h3>🔮 Conclusión: ¿Nos Hará la IA Más Inteligentes o Más Dependientes?</h3>
                <p>La IA es una de las herramientas más poderosas de nuestra era. Puede aumentar la productividad, reducir errores y mejorar la calidad de vida. Pero si no se gestiona con responsabilidad, también puede generar desigualdades, pérdida de empleos y una dependencia tecnológica extrema.</p>
        
                <p>El futuro no está escrito.</p>
        
                <p>🔵 ¿Usaremos la IA para mejorar nuestras vidas o permitiremos que decida por nosotros?</p>
                <p>🔵 ¿Nos ayudará a ser más productivos o nos volverá más cómodos y dependientes?</p>
        
                <p>El debate está abierto, y las respuestas a estas preguntas definirán el rumbo de la humanidad en las próximas décadas. 🚀🤖</p>
            `,
            image: "assets/img/blog-inteligencia-artificial.webp"
        }
    };

    // 📌 Capturar elementos del modal
    const modal = document.getElementById("blogModal");
    const modalTitle = document.getElementById("blogTitle");
    const modalContent = document.getElementById("blogContent");
    const modalImage = document.getElementById("blogImage");
    const closeModal = document.querySelector(".close-btn");

    // 📌 Agregar evento a cada botón "Leer más"
    document.querySelectorAll(".btn-read-more").forEach(button => {
        button.addEventListener("click", function () {
            const blogId = this.getAttribute("data-blog");
            const blogInfo = blogData[blogId];

            if (blogInfo) {
                modalTitle.innerHTML = blogInfo.title;
                modalContent.innerHTML = blogInfo.text;
                modalImage.src = blogInfo.image;
                modalImage.style.display = "block";

                modal.style.display = "flex";
            } else {
                console.error(`❌ Error: No se encontró el blog con ID '${blogId}'`);
            }
        });
    });

    // 📌 Cerrar modal al hacer clic en el botón de cierre
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 📌 Cerrar modal si el usuario hace clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

