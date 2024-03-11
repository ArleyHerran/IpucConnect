<template>
  <PanelControl>
    <div class="pl-4 pr-4" style="text-align: justify;">
      <section class="about-section">
        <h1 class="about-title" style="text-align: left;">Acerca de la Aplicación de Gestión de Membresía SgmIpuc</h1>
        <div class="about-content">
          <p >Bienvenidos a la Aplicación de Gestión de Membresía SgmIpuc de la Iglesia Pentecostal Unida de Colombia. Esta aplicación ha sido desarrollada por Arley Herran, un apasionado desarrollador de software con una sólida formación en el análisis y desarrollo de software, quien completó sus estudios en el programa del SENA el 26 de septiembre de 2023.</p>
        </div>
      </section>

      <section class="developer-section">
        <h2 class="section-title">El Desarrollador</h2>
        <div class="developer-details">
          <p>Arley Herran es miembro activo de la Iglesia Pentecostal Unida de Colombia y un profesional experimentado en el campo del desarrollo de software. Con una amplia trayectoria empírica, ha perfeccionado sus habilidades y conocimientos en tecnología a lo largo de los años. Su dedicación y pasión por la programación lo llevaron a completar su educación formal en el programa "Análisis y Desarrollo de Software" del SENA.</p>

          <p>Arley Herran es el fundador y CEO de Unicode Colombia, la empresa detrás de esta aplicación. Con una visión clara de facilitar la gestión de membresía para la comunidad de la Iglesia Pentecostal Unida de Colombia, lideró el desarrollo de esta solución innovadora.</p>
        </div>

        <div class="developer-contact">
          <h3 class="contact-title">Contacto</h3>
          <ul>
            <li>Email: <a href="mailto:unicodecolombia@gmail.com">unicodecolombia@gmail.com</a></li>
            <li>Teléfono celular: <a href="tel:3134878371">313-487-8371</a></li>
          </ul>
        </div>
      </section>

      <section class="app-section">
        <h2 class="section-title">Sobre la Aplicación</h2>
        <div class="app-description">
          <p>Nuestra aplicación de gestión de membresía SgmIpuc está diseñada para brindar una experiencia completa y eficiente a la administración pastoral de modo individual por sedes de la Iglesia Pentecostal Unida de Colombia. Ofrecemos una gama de características avanzadas y una interfaz amigable que simplifica la administración de la membresía, el seguimiento de eventos como los traslados de personas, y la gestión estadística simplificada de la congregación Ipuc.</p>

          <p>Esta aplicación es el resultado de un esfuerzo conjunto de desarrolladores y miembros de la iglesia que comprenden las necesidades únicas de la comunidad. Estamos comprometidos a mejorar constantemente la aplicación y brindar un excelente servicio de atención al cliente.</p>
        </div>
      </section>

      <section class="thanks-section">
        <h2 class="section-title">Agradecimientos</h2>
        <div class="thanks-content">
          <p>Queremos expresar nuestro sincero agradecimiento por confiar en nuestra aplicación. La Iglesia Pentecostal Unida de Colombia es una parte fundamental de nuestra comunidad, y estamos dedicados a servirte de la mejor manera posible.</p>

          <p>Esperamos que esta aplicación simplifique y mejore la gestión de la membresía, permitiéndote centrarte en lo que realmente importa: la fe y la comunidad. Tu apoyo y retroalimentación son invaluables para nosotros mientras continuamos desarrollando y mejorando esta aplicación.</p>
        </div>
      </section>
    </div>
  </PanelControl>
</template>
 
   <script setup>
     import PanelControl from '@/layouts/PanelControl.vue'
   
  const name= 'AcercaDe'

   </script>

   <!-- Agrega estilos CSS personalizados según sea necesario -->
<style scoped>
/* Estilos CSS personalizados aquí */
/* Puedes agregar estilos específicos para cada sección y título */
.about-section {
  margin-bottom: 30px;
}

.about-title {
  font-size: 28px;
}

.section-title {
  font-size: 24px;
}

/* Agrega más estilos según tus preferencias */
</style>