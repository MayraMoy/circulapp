# **ESPECIFICACIÓN DE REQUISITOS DE SOFTWARE**

## **Proyecto: Circulapp \- Plataforma de Economía Colaborativa**

**Revisión:** 2.0  
**Fecha:** 14 de septiembre de 2025

## **FICHA DEL DOCUMENTO**

| Fecha | Revisión | Autor | Verificado dep. calidad |
| ----- | :---: | ----- | ----- |
| 14/09/2025 | 2.0 | Mayra Moyano | Marilen Cornejo |

## **1\. INTRODUCCIÓN**

### **1.1 Propósito**

Este documento tiene como propósito especificar de forma clara, completa y sin ambigüedades los requisitos funcionales y no funcionales del software correspondiente a la plataforma de economía colaborativa denominada "Circulapp", incluyendo las funcionalidades específicas para gestión de materiales, procesamiento y validación según estándares de la Comuna.

Está dirigido a desarrolladores, diseñadores, testers, gerentes de proyecto y stakeholders de la Comuna.

### **1.2 Alcance**

Circulapp es una plataforma web y móvil que permite a personas donar productos con otros miembros de su comunidad con el fin de promover la economía circular y la reducción de residuos. El sistema incluye funcionalidades avanzadas como:

* Gestión de agendas de recolección coordinadas  
* Sistema de contabilidad y archivo histórico de materiales  
* Módulo educativo con instrucciones para procesamiento de materiales  
* Sistema de validación de materiales fardados  
* Integración con planos oficiales de estaciones de procesamiento  
* Buscador avanzado de usuarios por especialización

### **1.3 Personal involucrado**

| Nombre | Rol | Categoría profesional | Responsabilidades | Contacto |
| ----- | ----- | ----- | ----- | ----- |
| Mayra Moyano | Líder del proyecto | Full Stack Developer | Coordinación del equipo, desarrollo | [mayrayazminmoyano@gmail.com](mailto:mayrayazminmoyano@gmail.com)  |
| Mayra Moyano | Analista de requisitos | Analista de sistemas | Recolección de requisitos, validación | [mayrayazminmoyano@gmail.com](mailto:mayrayazminmoyano@gmail.com)  |
| \[Especialista Comuna\] | Consultor en gestión de residuos | Ingeniero Ambiental | Validación de procesos de materiales | ... |
| Marilen Cornejo | QA Tester | Tester | Validación y verificación de requisitos | [marilencornejo12@gmail.com](mailto:marilencornejo12@gmail.com)  |

### **1.4 Definiciones, acrónimos y abreviaturas**

* **MVP:** Producto Mínimo Viable  
* **UX:** Experiencia de Usuario  
* **JWT:** JSON Web Token  
* **CRUD:** Create, Read, Update, Delete  
* **EPA:** Estación de Procesamiento y Compactado  
* **SMV:** Sistema de Validación de Materiales  
* **SHAM:** Sistema Histórico y de Archivo de Materiales

### **1.5 Referencias**

| Referencia | Título | Ruta | Fecha | Autor |
| ----- | ----- | ----- | ----- | ----- |
| IEEE 830 | IEEE Std 830-1998 | Estándar IEEE | 1998-10-06 | IEEE |
| Manual Comuna | Metodología de Procesamiento de Materiales v2.1 |  |  | Comuna |

### **1.6 Resumen**

Este documento está estructurado en secciones que incluyen una descripción general del sistema, los requisitos funcionales y no funcionales, así como aspectos relacionados con interfaces, restricciones y dependencias. Se incorporan funcionalidades específicas para la gestión integral de materiales y coordinación comunitaria.

## **2\. DESCRIPCIÓN GENERAL**

### **2.1 Perspectiva del producto**

Circulapp es un sistema independiente que se ejecutará como aplicación web y móvil, integrado con sistemas de la Comuna para gestión de residuos y materiales. Incluye módulos especializados para:

* Procesamiento y validación de materiales  
* Gestión de estaciones de compactado  
* Coordinación de recolecciones programadas  
* Archivo histórico de transacciones de materiales

### **2.2 Funcionalidad del producto**

#### **Funcionalidades principales:**

* Registro e inicio de sesión de usuarios con perfiles especializados  
* Publicación de productos con categorización avanzada de materiales  
* **Agendas de recolección** coordinadas entre usuarios y puntos de acopio  
* **Buscador de usuarios** por especialización y ubicación  
* **Sistema de contabilidad de materiales** con trazabilidad completa  
* **Instrucciones interactivas** para procesamiento de materiales  
* **Validación de materiales fardados** según metodología estandarizada  
* **Visualización de planos oficiales** de estaciones de procesamiento  
* Chat privado entre usuarios con templates para coordinación  
* Sistema de calificaciones especializado por tipo de material  
* Panel de administración con métricas ambientales

### **2.3 Características de los usuarios**

| Tipo de usuario | Formación | Habilidades | Actividades principales |
| ----- | ----- | ----- | ----- |
| Ofertante Individual | General | Básicas en tecnología | Publicar, gestionar y donar productos |
| Demandante Individual | General | Básicas en tecnología | Buscar, solicitar y calificar productos/usuarios |
| Gestor de Materiales | Técnica especializada | Conocimiento en reciclaje | Validar materiales, coordinar recolecciones, gestionar fardos |
| Coordinador de Estación | Técnica avanzada | Manejo de equipos industriales | Supervisar procesamiento, validar compactados, generar reportes |
| Administrador Sistema | Técnica en sistemas | Avanzadas en TI | Gestión integral del sistema y usuarios |

### **2.4 Restricciones**

* Desarrollo multiplataforma (web y mobile)  
* Uso de tecnologías open source  
* Cumplimiento con normativas ambientales locales  
* Integración obligatoria con sistemas de la Comuna  
* Implementación de estándares de seguridad para protección de datos personales  
* El sistema debe funcionar en dispositivos Android 8+ y navegadores web modernos  
* Compatibilidad con equipos industriales de las estaciones de procesamiento

### **2.5 Suposiciones y dependencias**

* Se asumirá disponibilidad de conexión a internet para todas las funciones  
* Se dependerá de servicios externos como Google Maps.  
* Disponibilidad de APIs de la Comuna para validación de materiales  
* Acceso a bases de datos oficiales de metodologías de procesamiento  
* Conectividad en estaciones de procesamiento para validación en tiempo real

### **2.6 Evolución previsible del sistema**

* Incorporación de inteligencia artificial para sugerencias personalizadas de materiales  
* Expansión a servicios especializados (no solo productos)  
* Integración con IoT para monitoreo automático de estaciones  
* Desarrollo de app móvil específica para gestores de estaciones  
* Sistema de blockchain para trazabilidad completa de materiales  
* Integración con sistemas municipales o institucionales para comunidades específicas

## **3\. REQUISITOS ESPECÍFICOS**

### **3.1 Requisitos comunes de los interfaces**

#### **3.1.1 Interfaces de usuario**

**Interfaces principales:**

* Interfaz intuitiva y responsiva para web y móvil  
* Registro/Login mediante email, redes sociales y credenciales institucionales de la Comuna  
* Panel de usuario diferenciado por tipo:  
  * Panel Gestor de Materiales: con validación de fardos, agenda de recolecciones  
  * Panel Coordinador de Estación: con acceso a planos oficiales y métricas  
  * Panel Usuario General: gestión de publicaciones e historial

**Nuevas interfaces específicas:**

* Calendario integrado para agendas de recolección  
* Buscador avanzado de usuarios con filtros por especialización  
* Visualizador de planos técnicos con zoom y anotaciones  
* Dashboard de contabilidad de materiales con gráficos y reportes  
* Módulo educativo interactivo con videos y guías paso a paso

#### **3.1.2 Interfaces de hardware**

* Compatible con dispositivos móviles (Android/iOS) y computadoras de escritorio  
* Soporte para cámara (captura de imágenes para publicar productos)  
* Soporte para lectores de códigos QR/barras para identificación de materiales  
* Compatibilidad con básculas digitales para pesaje de materiales  
* Integración con sensores de compactado en estaciones de procesamiento

#### **3.1.3 Interfaces de software**

**Integraciones existentes:**

* Google Maps API (ubicación de productos y estaciones)  
* Cloudinary (almacenamiento de imágenes)

**Nuevas integraciones:**

* API Sistema Comuna para validación de materiales  
* Base de datos oficial de metodologías de procesamiento  
* Sistema de gestión documental para planos técnicos  
* API de contabilidad para trazabilidad de materiales

#### **3.1.4 Interfaces de comunicación**

* API RESTful para comunicación entre frontend y backend  
* Protocolo HTTPS para seguridad en transferencia de datos  
* Protocolo MQTT para comunicación con equipos IoT de estaciones  
* Integración con sistemas de comunicación de la Comuna para alertas

### **3.2 Requisitos funcionales**

#### **Requisitos funcionales:**

| ID | Nombre | Tipo | Fuente | Descripción | Prioridad |
| ----- | ----- | ----- | ----- | ----- | ----- |
| RF01 | Registro de usuario mejorado | Requisito | Usuario Final | El sistema debe validar credenciales, incluyendo verificación institucional para roles especializados, y generar un token JWT para sesiones seguras. | ALTA |
| RF02 | Inicio de sesión y autenticación | Requisito | Usuario Final | Autenticación diferenciada por tipo de usuario con permisos específicos según rol. | ALTA |
| RF03 | Publicación de productos con categorización | Requisito | Ofertante | Los usuarios deben poder crear publicaciones incluyendo categorización específica de materiales, estado de procesamiento, y coordenadas GPS precisas. | ALTA |
| RF04 | Búsqueda y filtrado avanzado | Requisito | Demandante | Búsquedas por material específico, estado de procesamiento, disponibilidad en estaciones, y proximidad a puntos de recolección. | ALTA |
| RF05 | Sistema de mensajería con templates | Requisito | Usuario final | Chat con templates predefinidos para coordinación de recolecciones y validación de materiales. | MEDIA |
| RF06 | Calificaciones especializadas | Requisito | Usuario final | Sistema de calificación diferenciado: calidad de materiales, puntualidad en recolecciones, y cumplimiento de estándares. | ALTA |
| RF07 | Panel de administración avanzado | Requisito | Administrador | Panel con métricas ambientales, trazabilidad de materiales, y reportes para la Comuna. | MEDIA |

#### **Nuevos requisitos funcionales específicos:**

| ID | Nombre | Tipo | Fuente | Descripción | Prioridad |
| :---- | :---- | :---- | :---- | :---- | :---- |
| RF08 | Agendas de recolección | Requisito | Gestor de Materiales | El sistema debe permitir crear, modificar y coordinar agendas de recolección con fechas, rutas optimizadas, tipos de materiales y responsables asignados. | ALTA |
| RF09 | Buscador de usuarios especializado | Requisito | Coordinador | Funcionalidad para buscar usuarios por especialización en materiales, ubicación, calificaciones y disponibilidad para coordinación. | MEDIA |
| RF10 | Módulo educativo de procesamiento | Requisito | Usuario Final | Sistema de instrucciones interactivas con videos, diagramas y pasos detallados para procesamiento y compactación de diferentes tipos de materiales. | ALTA |
| RF11 | Sistema de contabilidad de materiales | Requisito | Administrador | Registro y seguimiento completo de materiales: entrada, procesamiento, salida, con reportes de volúmenes, tipos y trazabilidad histórica. | ALTA |
| RF12 | Archivo histórico de transacciones | Requisito | Gestor | Base de datos histórica de todas las transacciones de materiales con capacidad de búsqueda, filtrado y generación de reportes temporales. | MEDIA |
| RF13 | Listados dinámicos de bienes y servicios | Requisito | Usuario Final | Sistema de listados categorizados que incluya tanto productos físicos como servicios relacionados con procesamiento de materiales, con filtros avanzados. | ALTA |
| RF14 | Visualizador de planos oficiales | Requisito | Coordinador de Estación | Módulo para visualizar, ampliar y anotar planos técnicos oficiales de estaciones de procesamiento y compactado, con control de versiones. | MEDIA |
| RF15 | Sistema de validación de materiales fardados | Requisito | Gestor de Materiales | Funcionalidad para validar materiales procesados según metodología estandarizada, con checklist digital, captura de evidencias y certificación automática. | ALTA |

### **3.3 Requisitos no funcionales**

#### **3.3.1 Requisitos de rendimiento**

* El sistema debe soportar hasta 500 usuarios simultáneos considerando gestores y coordinadores  
* El 95% de las transacciones deben procesarse en menos de 2 segundos  
* Las validaciones de materiales deben completarse en menos de 30 segundos  
* Chat en tiempo real debe tener latencia \< 1s  
* La carga de planos técnicos debe completarse en menos de 10 segundos  
* Las consultas al archivo histórico deben responder en menos de 5 segundos

#### **3.3.2 Seguridad**

* Autenticación segura (JWT) con roles y permisos diferenciados  
* Almacenamiento cifrado de contraseñas (bcrypt)  
* Cifrado específico para datos de materiales sensibles  
* Control de acceso basado en roles (RBAC) para funciones especializadas  
* Validación de entrada de datos  
* Protección contra XSS y CSRF  
* Auditoría completa de acciones en sistema de validación  
* Backup automático de datos críticos de materiales

#### **3.3.3 Fiabilidad**

* Disponibilidad del sistema: mínimo 99.5% mensual  
* Sistema de respaldo para validaciones críticas de materiales  
* Soporte para recuperación automática ante errores comunes  
* Redundancia en almacenamiento de planos oficiales  
* Logs de errores y alertas automatizadas  
* Notificaciones automáticas para fallos en estaciones de procesamiento

#### **3.3.4 Disponibilidad**

* El sistema debe estar disponible 24/7  
* Disponibilidad prioritaria durante horarios de operación de estaciones (6:00-18:00)  
* Soporte para mantenimiento sin caída crítica  
* Modo offline para validaciones de emergencia

#### **3.3.5 Mantenibilidad**

* Código documentado y modular  
* **Documentación específica para módulos de validación de materiales**  
* Uso de control de versiones (Git)  
* **Versionado específico para metodologías de validación**  
* Separación clara entre frontend y backend  
* **API separada para integraciones con sistemas de la Comuna**

#### **3.3.6 Portabilidad**

* Compatible con navegadores modernos: Chrome, Firefox, Safari  
* Compatible con dispositivos móviles Android 8+ y iOS 12+  
* **Compatibilidad con sistemas operativos industriales de estaciones**  
* **Exportación de datos en formatos estándar (CSV, PDF, JSON)**

### **3.4 Otros requisitos**

#### **Requisitos legales**

* Cumplimiento con la Ley de Protección de Datos Personales (GDPR o equivalente local)  
* Cumplimiento con normativas ambientales específicas de la Comuna  
* Certificación de procesos de validación de materiales según estándares ISO

#### **Requisitos éticos**

* Moderación de contenido ofensivo o fraudulento  
* **Transparencia en procesos de validación de materiales**  
* **Acceso equitativo a información educativa sobre procesamiento**

#### **Requisitos culturales**

* Interfaz adaptable a idioma español como principal  
* **Terminología técnica específica del sector de gestión de residuos**  
* Posibilidad de internacionalización (i18n) futura  
* **Adaptación a procesos culturales locales de la Comuna**

## **4\. APÉNDICES**

### **Apéndice A: Diagramas de flujo de procesos de validación**

*\[Incluir diagramas específicos para validación de materiales a entregar\]*

### **Apéndice B: Especificaciones técnicas de integración con sistemas de la Comuna**

*\[Documentación detallada de APIs y protocolos a entregar\]\]*

### **Apéndice C: Metodología estandarizada de validación de materiales**

*\[Referencia completa a procedimientos oficiales a entregar\]\]*

### **Apéndice D: Catálogo de materiales procesables**

*\[Lista completa con códigos y especificaciones\] a entregar\]*

**Documento validado por las partes**

| Por el cliente (Comuna) | Por la empresa suministradora |
| ----- | ----- |
| Fdo. \[Representante Comuna\] | Fdo. Mayra Moyano |
| Fecha: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | Fecha: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
