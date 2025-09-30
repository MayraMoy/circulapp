# 🤝 Guía de Contribución - Circulapp

¡Gracias por tu interés en contribuir a Circulapp! Este documento te guiará a través del proceso para hacer contribuciones efectivas al proyecto.

---

## 📋 Tabla de contenidos

- [🌟 Formas de contribuir](#-formas-de-contribuir)
- [🚀 Primeros pasos](#-primeros-pasos)
- [💻 Configuración del entorno de desarrollo](#-configuración-del-entorno-de-desarrollo)
- [🔄 Flujo de trabajo](#-flujo-de-trabajo)
- [✍️ Convenciones de commits](#️-convenciones-de-commits)
- [🐛 Reportar bugs](#-reportar-bugs)
- [💡 Sugerir mejoras](#-sugerir-mejoras)
- [👥 Código de conducta](#-código-de-conducta)
- [❓ ¿Tienes dudas?](#-tienes-dudas)

---

## 🌟 Formas de contribuir

Hay muchas maneras de contribuir a Circulapp, incluso si no eres desarrollador:

### 👨‍💻 **Contribuciones de código**
- Implementar nuevas funcionalidades
- Corregir bugs
- Mejorar el rendimiento
- Refactorizar código existente
- Añadir tests

### 📚 **Documentación**
- Mejorar el README
- Escribir tutoriales
- Traducir documentación
- Crear guías de usuario
- Documentar APIs

### 🐛 **Reporte de issues**
- Reportar bugs
- Sugerir nuevas funcionalidades
- Mejorar UX/UI
- Reportar problemas de seguridad

### 🎨 **Diseño**
- Mejorar la interfaz de usuario
- Crear iconos e ilustraciones
- Diseñar mockups
- Mejorar accesibilidad

### 🌍 **Comunidad**
- Ayudar a otros usuarios
- Participar en discusiones
- Promocionar el proyecto
- Organizar eventos

---

## 🚀 Primeros pasos

### 1. **Fork del repositorio**
```bash
# En GitHub, haz click en "Fork" en la esquina superior derecha
# Luego clona tu fork localmente:
git clone https://github.com/MayraMoy/circulApp.git
cd circulapp
```

### 2. **Configurar remote upstream**
```bash
git remote add upstream https://github.com/MayraMoy/circulApp.git
git remote -v  # Verificar que tienes origin y upstream
```

### 3. **Mantener tu fork actualizado**
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## 💻 Configuración del entorno de desarrollo

### **Prerrequisitos**
- Node.js v18.0 o superior
- Git
- Editor de código (recomendamos VS Code)

### **Instalación**

1. **Instalar dependencias**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

```

2. **Configurar variables de entorno**
```bash
# Copia los archivos de ejemplo
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edita los archivos .env con tus configuraciones locales
```

3. **Ejecutar en modo desarrollo**
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm start

```

### **Extensiones recomendadas para VS Code**
- ESLint
- Prettier
- GitLens
- Thunder Client (para testing de APIs)
- ES7+ React/Redux/React-Native snippets

---

## 🔄 Flujo de trabajo

### **1. Crear una nueva rama**
```bash
git checkout main
git pull upstream main
git checkout -b tipo/descripcion-breve

# Ejemplos:
git checkout -b feat/sistema-validacion-materiales
git checkout -b fix/error-login-usuarios
git checkout -b docs/guia-instalacion
```

### **2. Desarrollar tu funcionalidad**
- Escribe código siguiendo los estándares establecidos
- Añade tests para tu funcionalidad
- Actualiza documentación si es necesario
- Commit frecuentemente con mensajes descriptivos

### **3. Sincronizar con upstream**
```bash
git fetch upstream
git rebase upstream/main
```

### **4. Push y crear Pull Request**
```bash
git push origin tu-rama-feature

# Ve a GitHub y crea un Pull Request
# Usa el template proporcionado
```

### **5. Revisión y merge**
- Responde a comentarios de revisión
- Realiza cambios solicitados
- Una vez aprobado, tu PR será merged

---

**Estructura de archivos:**
```
circulapp-backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── tests/
├── .env.example
├── package.json
└── README.md

circulapp-frontend/
│
src/
│
├── components/       # Componentes reutilizables
├── pages/            # Vistas principales
├── services/         # Lógica para consumo de APIs
├── assets/           # Imágenes, estilos, fuentes
├── App.jsx           # Componente raíz de la aplicación
└── main.jsx          # Punto de entrada
```

**Convenciones de nomenclatura:**
- **Archivos:** `kebab-case` (ej: `user-profile.component.tsx`)
- **Componentes:** `PascalCase` (ej: `UserProfile`)
- **Variables/Funciones:** `camelCase` (ej: `getUserData`)
- **Constantes:** `UPPER_SNAKE_CASE` (ej: `API_BASE_URL`)

### **CSS/Styling**
- Usar **Tailwind CSS** como principal
- Componentes de estilo en `styled-components` cuando sea necesario
- Seguir principios de diseño responsivo (mobile-first)

---

## ✍️ Convenciones de commits

Seguimos la especificación [Conventional Commits](https://www.conventionalcommits.org/).


### **Tipos permitidos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Solo cambios en documentación
- `style`: Cambios que no afectan el significado del código (espacios, formato, etc.)
- `refactor`: Cambio de código que no corrige un bug ni añade funcionalidad
- `perf`: Cambio que mejora el rendimiento
- `test`: Añadir tests faltantes o corregir tests existentes
- `chore`: Cambios en el proceso de build o herramientas auxiliares

### **Ejemplos:**
```bash
feat(auth): añadir autenticación con JWT
fix(validation): corregir validación de materiales fardados
docs(readme): actualizar instrucciones de instalación
style(components): aplicar formato consistente
refactor(api): simplificar estructura de respuestas
perf(database): optimizar consultas de materiales
test(users): añadir tests para registro de usuarios
chore(deps): actualizar dependencias de seguridad
```

---

## 🐛 Reportar bugs

### **Antes de reportar**
1. Busca en [issues existentes](https://github.com/MayraMoy/CirculApp2/issues)
2. Verifica que estés usando la última versión
3. Prueba en diferentes navegadores/dispositivos si es aplicable

### **Template de bug report**
```markdown
**Descripción del bug**
Descripción clara y concisa del problema.

**Pasos para reproducir**
1. Ve a '...'
2. Haz click en '...'
3. Desplázate hasta '...'
4. Ver error

**Comportamiento esperado**
Descripción clara de lo que esperabas que pasara.

**Capturas de pantalla**
Si es aplicable, añade capturas para ayudar a explicar el problema.

**Información del entorno:**
- OS: [ej. iOS, Android, Windows, macOS]
- Navegador: [ej. Chrome, Safari, Firefox]
- Versión: [ej. 22]
- Versión de Circulapp: [ej. 2.0.1]

**Información adicional**
Cualquier otro contexto sobre el problema.
```

---

## 💡 Sugerir mejoras

### **Template de feature request**
```markdown
**¿Tu solicitud está relacionada con un problema?**
Descripción clara del problema. Ej: "Es frustrante cuando [...]"

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas consideradas**
Descripción de soluciones o funcionalidades alternativas consideradas.

**Información adicional**
Cualquier otro contexto o capturas sobre la solicitud.

**Impacto esperado**
- [ ] Mejora la experiencia de usuario
- [ ] Aumenta la eficiencia
- [ ] Resuelve problema crítico
- [ ] Funcionalidad solicitada por usuarios
```

---

## 👥 Código de conducta

### **Nuestros valores**
- **Respeto:** Tratamos a todos con dignidad y consideración
- **Inclusión:** Buscamos diversidad y diferentes perspectivas
- **Colaboración:** Trabajamos juntos hacia objetivos comunes
- **Transparencia:** Comunicamos abierta y honestamente
- **Calidad:** Nos esforzamos por la excelencia en todo lo que hacemos

### **Comportamientos esperados**
- Usar lenguaje inclusivo y respetuoso
- Respetar diferentes puntos de vista y experiencias
- Dar y recibir feedback constructivo
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros

### **Comportamientos inaceptables**
- Lenguaje o imágenes sexualizadas
- Comentarios insultantes, despectivos o ataques personales
- Acoso público o privado
- Publicar información privada sin consentimiento
- Conducta que sea inapropiada en un entorno profesional

### **Consecuencias**
Los mantenedores del proyecto tienen derecho a remover, editar o rechazar contribuciones que no se alineen con este código de conducta.

---

## 🎯 Prioridades del proyecto

### **Alta prioridad**
- Corrección de bugs críticos
- Funcionalidades del MVP
- Problemas de seguridad
- Mejoras de rendimiento

### **Media prioridad**
- Nuevas funcionalidades
- Mejoras de UX/UI
- Refactorización de código
- Documentación

### **Baja prioridad**
- Optimizaciones menores
- Funcionalidades experimentales
- Mejoras estéticas menores

---

## 📊 Métricas de contribución

Valoramos estas métricas en las contribuciones:

### **Calidad del código**
- Tests incluidos
- Documentación actualizada
- Cumple estándares de código
- No introduce regresiones

### **Impacto**
- Resuelve problemas importantes
- Mejora experiencia de usuario
- Beneficia a múltiples usuarios
- Alinea con objetivos del proyecto

### **Proceso**
- Sigue el flujo de trabajo establecido
- Comunicación clara en PR
- Responde a feedback oportunamente
- Commits bien estructurados

---

## 🏆 Reconocimiento de contributors

### **Tipos de contribución reconocidos**
- 💻 Código
- 📖 Documentación
- 🎨 Diseño
- 🐛 Reportes de bug
- 💡 Ideas
- 🔍 Revisiones
- ❓ Responder preguntas
- 📢 Promoción
- 💬 Comunidad

### **Contributors destacados**
- Aparición en README principal
- Mención en releases
- Invitación a reuniones de equipo
- Acceso a versiones beta

---

## ❓ ¿Tienes dudas?

### **Horarios de respuesta**
- **Issues críticos:** 24-48 horas
- **Pull Requests:** 2-5 días laborales
- **Preguntas generales:** 1 semana

### **Equipo de mantenedores**
- **👩‍💻 Mayra Moyano** - Líder técnico
- **👩‍💼 Marilen Cornejo** - QA Testing
- **👨‍💻 Mayra Moyano** - Backend specialist
- **👩‍🎨 Mayra Moyano** - UX/UI Designer

---

## 📋 Checklist antes de contribuir

Antes de enviar tu Pull Request, verifica:

### **Código**
- [ ] El código compila sin errores
- [ ] Todos los tests pasan
- [ ] Linting pasa sin warnings
- [ ] No hay console.log() o debugger statements
- [ ] Variables y funciones tienen nombres descriptivos

### **Tests**
- [ ] Nuevas funcionalidades tienen tests
- [ ] Tests existentes siguen pasando
- [ ] Coverage se mantiene o mejora

### **Documentación**
- [ ] README actualizado si es necesario
- [ ] Comentarios en código complejo
- [ ] API documentada si aplica
- [ ] Changelog actualizado

### **Git**
- [ ] Commits siguen convención establecida
- [ ] Branch está actualizada con main
- [ ] No hay archivos innecesarios committeados
- [ ] Mensaje de PR es descriptivo

---

**¡Gracias por contribuir a Circulapp! Tu ayuda hace que este proyecto sea posible.** 🌱🤝

*Última actualización: Septiembre 2025*
